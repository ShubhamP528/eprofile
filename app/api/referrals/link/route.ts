import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import {
    createSuccessResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

const linkSchema = z.object({
    code: z.string().min(1).max(32),
})

// POST /api/referrals/link - Attach the current user to whoever's referral code
// brought them in. First-touch only: no-ops if this user is already linked.
export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, linkSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        const { code } = validationResult.data

        const referrer = await prisma.user.findUnique({
            where: { referralCode: code },
            select: { id: true },
        })

        if (!referrer || referrer.id === authResult.userId) {
            return createSuccessResponse({ linked: false })
        }

        const existing = await prisma.referral.findUnique({
            where: { referredUserId: authResult.userId },
        })
        if (existing) {
            return createSuccessResponse({ linked: false })
        }

        await prisma.referral.create({
            data: {
                code,
                referrerId: referrer.id,
                referredUserId: authResult.userId,
            },
        })

        return createSuccessResponse({ linked: true })
    } catch (error) {
        return handleApiError(error)
    }
}
