import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/api-utils'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { verifyRazorpaySignature, getPaymentDetails } from '@/lib/razorpay'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const verifyPaymentSchema = z.object({
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
    plan: z.enum(['PRO']),
})

// POST /api/payment/verify - Verify Razorpay payment and update subscription
export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const body = await request.json()
        const validationResult = verifyPaymentSchema.safeParse(body)

        if (!validationResult.success) {
            return createErrorResponse(
                'Invalid payment verification data',
                'VALIDATION_ERROR',
                400,
                validationResult.error.issues
            )
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = validationResult.data

        // Verify payment signature
        const isValidSignature = verifyRazorpaySignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        )

        if (!isValidSignature) {
            return createErrorResponse(
                'Invalid payment signature',
                'INVALID_SIGNATURE',
                400
            )
        }

        // Get payment details from Razorpay
        const paymentResult = await getPaymentDetails(razorpay_payment_id)

        if (!paymentResult.success) {
            return createErrorResponse(
                'Failed to verify payment with Razorpay',
                'PAYMENT_VERIFICATION_FAILED',
                500
            )
        }

        const payment = paymentResult.payment!

        // Check if payment is successful
        if (payment.status !== 'captured') {
            return createErrorResponse(
                'Payment not successful',
                'PAYMENT_NOT_SUCCESSFUL',
                400
            )
        }

        // Calculate subscription expiry (30 days from now for Pro plan)
        const subscriptionExpiry = new Date()
        subscriptionExpiry.setDate(subscriptionExpiry.getDate() + 30)

        // Update user subscription in database
        const updatedUser = await prisma.user.update({
            where: { id: authResult.userId },
            data: {
                subscription: plan,
                subscriptionExpiry,
            },
            select: {
                subscription: true,
                subscriptionExpiry: true,
            }
        })

        // Create payment record (optional - for billing history)
        try {
            await prisma.paymentHistory.create({
                data: {
                    userId: authResult.userId,
                    paymentId: razorpay_payment_id,
                    orderId: razorpay_order_id,
                    amount: typeof payment.amount === 'string' ? parseInt(payment.amount, 10) : payment.amount,
                    currency: payment.currency,
                    status: payment.status,
                    plan: plan,
                }
            })
        } catch (paymentHistoryError) {
            // Log error but don't fail the subscription update
            console.error('Failed to create payment history record:', paymentHistoryError)
        }

        return createSuccessResponse({
            plan: updatedUser.subscription,
            expiry: updatedUser.subscriptionExpiry,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            amount: payment.amount,
            message: 'Payment successful! Your subscription has been activated.'
        })
    } catch (error) {
        console.error('Payment verification error:', error)
        return handleApiError(error)
    }
}