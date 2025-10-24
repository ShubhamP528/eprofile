import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/api-utils'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const subscriptionSchema = z.object({
    plan: z.enum(['FREE', 'PRO']),
    paymentId: z.string().optional(),
})

// GET /api/subscription - Get current subscription
export async function GET() {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const user = await prisma.user.findUnique({
            where: { id: authResult.userId },
            select: {
                subscription: true,
                subscriptionExpiry: true,
            }
        })

        if (!user) {
            return createErrorResponse('User not found', 'USER_NOT_FOUND', 404)
        }

        const isExpired = user.subscriptionExpiry && user.subscriptionExpiry < new Date()
        const currentPlan = isExpired ? 'FREE' : user.subscription

        return createSuccessResponse({
            plan: currentPlan,
            expiry: user.subscriptionExpiry,
            isExpired,
        })
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/subscription - Update subscription
export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const body = await request.json()
        const validationResult = subscriptionSchema.safeParse(body)

        if (!validationResult.success) {
            return createErrorResponse(
                'Invalid subscription data',
                'VALIDATION_ERROR',
                400,
                validationResult.error.issues
            )
        }

        const { plan, paymentId } = validationResult.data

        // Calculate expiry date for Pro plan (30 days from now)
        const subscriptionExpiry = plan === 'PRO'
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
            : null

        // Update user subscription
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

        // In a real app, you would:
        // 1. Verify payment with payment gateway
        // 2. Create subscription record
        // 3. Send confirmation email
        // 4. Handle webhooks for recurring payments

        return createSuccessResponse({
            plan: updatedUser.subscription,
            expiry: updatedUser.subscriptionExpiry,
            paymentId,
            message: plan === 'PRO' ? 'Successfully upgraded to Pro plan!' : 'Subscription updated'
        })
    } catch (error) {
        return handleApiError(error)
    }
}