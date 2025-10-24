import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/api-utils'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { createRazorpayOrder, subscriptionPlans } from '@/lib/razorpay'
import { z } from 'zod'

const createOrderSchema = z.object({
    plan: z.enum(['PRO']),
})

// POST /api/payment/create-order - Create Razorpay order for subscription
export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const body = await request.json()
        const validationResult = createOrderSchema.safeParse(body)

        if (!validationResult.success) {
            return createErrorResponse(
                'Invalid order data',
                'VALIDATION_ERROR',
                400,
                validationResult.error.issues
            )
        }

        const { plan } = validationResult.data
        const planConfig = subscriptionPlans[plan]

        if (!planConfig) {
            return createErrorResponse(
                'Invalid subscription plan',
                'INVALID_PLAN',
                400
            )
        }

        // Create Razorpay order with short receipt (max 40 chars)
        const shortUserId = authResult.userId.slice(-8) // Last 8 chars of user ID
        const timestamp = Date.now().toString().slice(-8) // Last 8 digits of timestamp
        const receipt = `sub_${shortUserId}_${timestamp}` // Format: sub_12345678_87654321

        const orderResult = await createRazorpayOrder(
            planConfig.amount,
            planConfig.currency,
            receipt
        )

        if (!orderResult.success) {
            return createErrorResponse(
                'Failed to create payment order',
                'ORDER_CREATION_FAILED',
                500,
                orderResult.error
            )
        }

        return createSuccessResponse({
            orderId: orderResult.order!.id,
            amount: orderResult.order!.amount,
            currency: orderResult.order!.currency,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            plan: plan,
            planConfig: {
                name: planConfig.name,
                description: planConfig.description,
                duration: planConfig.duration,
            }
        })
    } catch (error) {
        return handleApiError(error)
    }
}