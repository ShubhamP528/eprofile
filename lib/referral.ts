import { prisma } from './prisma'

export const REFERRAL_REWARD_DAYS = 30

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no 0/O/1/I to avoid confusion
const CODE_LENGTH = 7

function randomCode(): string {
    let code = ''
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
    }
    return code
}

/** Returns the user's existing referral code, generating and persisting one on first request. */
export async function getOrCreateReferralCode(userId: string): Promise<string> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { referralCode: true }
    })

    if (user?.referralCode) {
        return user.referralCode
    }

    // Retry on the rare collision since the code column is globally unique.
    for (let attempt = 0; attempt < 5; attempt++) {
        const code = randomCode()
        try {
            const updated = await prisma.user.update({
                where: { id: userId },
                data: { referralCode: code },
                select: { referralCode: true }
            })
            return updated.referralCode!
        } catch (error: any) {
            if (error?.code === 'P2002') continue // unique violation, try another code
            throw error
        }
    }

    throw new Error('Failed to generate a unique referral code')
}

/**
 * Grants the referral reward for a PENDING referral once the referred user
 * activates (creates their first card). Extends the referrer's Pro access by
 * REFERRAL_REWARD_DAYS - upgrading them from Free if needed - and marks the
 * referral REWARDED so it only ever fires once.
 */
export async function grantReferralRewardIfPending(referredUserId: string): Promise<void> {
    const referral = await prisma.referral.findUnique({
        where: { referredUserId },
    })

    if (!referral || referral.status !== 'PENDING') return

    const referrer = await prisma.user.findUnique({
        where: { id: referral.referrerId },
        select: { subscription: true, subscriptionExpiry: true },
    })
    if (!referrer) return

    const now = new Date()
    const currentlyActive = referrer.subscription !== 'FREE' && (!referrer.subscriptionExpiry || referrer.subscriptionExpiry > now)
    const base = currentlyActive && referrer.subscriptionExpiry ? referrer.subscriptionExpiry : now
    const newExpiry = new Date(base.getTime() + REFERRAL_REWARD_DAYS * 24 * 60 * 60 * 1000)

    await prisma.$transaction([
        prisma.user.update({
            where: { id: referral.referrerId },
            data: {
                subscription: currentlyActive ? undefined : 'PRO',
                subscriptionExpiry: newExpiry,
            },
        }),
        prisma.referral.update({
            where: { id: referral.id },
            data: { status: 'REWARDED', rewardGrantedAt: now },
        }),
        prisma.subscriptionEvent.create({
            data: {
                userId: referral.referrerId,
                eventType: 'REFERRAL_REWARD',
                fromPlan: referrer.subscription,
                toPlan: currentlyActive ? referrer.subscription : 'PRO',
                description: `Referral reward: +${REFERRAL_REWARD_DAYS} days for referring a new active user`,
            },
        }),
    ])
}
