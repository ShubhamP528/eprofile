import { prisma } from './prisma'

export type SubscriptionPlan = 'FREE' | 'PRO'

export interface SubscriptionStatus {
    plan: SubscriptionPlan
    isActive: boolean
    expiry?: Date
    features: {
        maxCards: number
        hasServices: boolean
        hasGallery: boolean
        hasTestimonials: boolean
        hasPayments: boolean
        hasAnalytics: boolean
        hasCustomDomain: boolean
        hasPrioritySupport: boolean
    }
}

export async function getUserSubscription(userId: string): Promise<SubscriptionStatus> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            subscription: true,
            subscriptionExpiry: true,
        }
    })

    if (!user) {
        throw new Error('User not found')
    }

    const now = new Date()
    const isExpired = user.subscriptionExpiry && user.subscriptionExpiry < now
    const currentPlan: SubscriptionPlan = isExpired ? 'FREE' : user.subscription

    return {
        plan: currentPlan,
        isActive: currentPlan === 'PRO' && !isExpired,
        expiry: user.subscriptionExpiry || undefined,
        features: getFeaturesByPlan(currentPlan)
    }
}

export function getFeaturesByPlan(plan: SubscriptionPlan) {
    switch (plan) {
        case 'FREE':
            return {
                maxCards: 1,
                hasServices: false,
                hasGallery: false,
                hasTestimonials: false,
                hasPayments: false,
                hasAnalytics: true, // Basic analytics
                hasCustomDomain: false,
                hasPrioritySupport: false,
            }
        case 'PRO':
            return {
                maxCards: -1, // Unlimited
                hasServices: true,
                hasGallery: true,
                hasTestimonials: true,
                hasPayments: true,
                hasAnalytics: true,
                hasCustomDomain: true,
                hasPrioritySupport: true,
            }
        default:
            return getFeaturesByPlan('FREE')
    }
}

export async function checkFeatureAccess(userId: string, feature: keyof SubscriptionStatus['features']): Promise<boolean> {
    const subscription = await getUserSubscription(userId)
    return subscription.features[feature] as boolean
}

export async function checkCardLimit(userId: string): Promise<{ canCreate: boolean; currentCount: number; maxCards: number }> {
    const subscription = await getUserSubscription(userId)
    const currentCount = await prisma.card.count({
        where: { userId }
    })

    const maxCards = subscription.features.maxCards
    const canCreate = maxCards === -1 || currentCount < maxCards

    return {
        canCreate,
        currentCount,
        maxCards
    }
}