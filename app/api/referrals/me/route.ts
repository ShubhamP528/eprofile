import { prisma } from '@/lib/prisma'
import { getOrCreateReferralCode, REFERRAL_REWARD_DAYS } from '@/lib/referral'
import {
    createSuccessResponse,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.eprofile.cv"

// GET /api/referrals/me - This user's referral link + stats on people they've referred
export async function GET() {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const code = await getOrCreateReferralCode(authResult.userId)

        const [pending, rewarded] = await Promise.all([
            prisma.referral.count({ where: { referrerId: authResult.userId, status: 'PENDING' } }),
            prisma.referral.count({ where: { referrerId: authResult.userId, status: 'REWARDED' } }),
        ])

        return createSuccessResponse({
            code,
            link: `${APP_URL}/auth/signup?ref=${code}`,
            rewardDays: REFERRAL_REWARD_DAYS,
            stats: {
                pending,
                rewarded,
                total: pending + rewarded,
            },
        })
    } catch (error) {
        return handleApiError(error)
    }
}
