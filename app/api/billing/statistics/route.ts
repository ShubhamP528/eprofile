import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/api-utils'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { prisma } from '@/lib/prisma'

interface BillingStatistics {
    totalSpent: number
    totalPayments: number
    averagePayment: number
    subscriptionDuration: number // in days
    planBreakdown: {
        [plan: string]: {
            count: number
            totalAmount: number
        }
    }
    monthlySpending: Array<{
        month: string
        amount: number
        payments: number
    }>
    subscriptionTimeline: Array<{
        id: string
        eventType: string
        fromPlan?: string
        toPlan: string
        description?: string
        createdAt: string
    }>
}

// GET /api/billing/statistics - Get comprehensive billing statistics for the user
export async function GET(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        // Fetch all payment history for the user
        const payments = await prisma.paymentHistory.findMany({
            where: { userId: authResult.userId },
            orderBy: { createdAt: 'asc' },
        })

        // Fetch subscription events for timeline (handle gracefully if model doesn't exist yet)
        let subscriptionEvents: any[] = []
        try {
            subscriptionEvents = await (prisma as any).subscriptionEvent.findMany({
                where: { userId: authResult.userId },
                orderBy: { createdAt: 'desc' },
                take: 10, // Last 10 events
            })
        } catch (error) {
            console.log('SubscriptionEvent model not available yet:', error)
            subscriptionEvents = []
        }

        // Get user subscription info for duration calculation
        const user = await prisma.user.findUnique({
            where: { id: authResult.userId },
            select: {
                createdAt: true,
                subscription: true,
                subscriptionExpiry: true,
            },
        })

        if (!user) {
            return createErrorResponse('User not found', 'USER_NOT_FOUND', 404)
        }

        // Calculate statistics
        const statistics = calculateBillingStatistics(payments, user, subscriptionEvents)

        return createSuccessResponse(statistics)
    } catch (error) {
        console.error('Billing statistics error:', error)
        return handleApiError(error)
    }
}

function calculateBillingStatistics(payments: any[], user: any, subscriptionEvents: any[]): BillingStatistics {
    // Filter successful payments only for most calculations
    const successfulPayments = payments.filter(p => p.status === 'captured')

    // Calculate total spent (successful payments minus refunds)
    const totalFromPayments = successfulPayments.reduce((sum, p) => sum + p.amount, 0)
    const totalRefunded = payments.reduce((sum, p) => sum + (p.refundAmount || 0), 0)
    const totalSpent = totalFromPayments - totalRefunded

    // Calculate average payment
    const averagePayment = successfulPayments.length > 0 ? totalFromPayments / successfulPayments.length : 0

    // Calculate subscription duration
    const now = new Date()
    const userCreatedAt = new Date(user.createdAt)
    const subscriptionDuration = Math.floor((now.getTime() - userCreatedAt.getTime()) / (1000 * 60 * 60 * 24))

    // Calculate plan breakdown
    const planBreakdown: { [plan: string]: { count: number; totalAmount: number } } = {}

    successfulPayments.forEach(payment => {
        if (!planBreakdown[payment.plan]) {
            planBreakdown[payment.plan] = { count: 0, totalAmount: 0 }
        }
        planBreakdown[payment.plan].count++
        planBreakdown[payment.plan].totalAmount += payment.amount
    })

    // Calculate monthly spending for the last 12 months
    const monthlySpending = calculateMonthlySpending(successfulPayments)

    // Format subscription timeline
    const subscriptionTimeline = subscriptionEvents.map(event => ({
        id: event.id,
        eventType: event.eventType,
        fromPlan: event.fromPlan,
        toPlan: event.toPlan,
        description: event.description,
        createdAt: event.createdAt.toISOString(),
    }))

    return {
        totalSpent,
        totalPayments: payments.length,
        averagePayment,
        subscriptionDuration,
        planBreakdown,
        monthlySpending,
        subscriptionTimeline,
    }
}

function calculateMonthlySpending(payments: any[]): Array<{
    month: string
    amount: number
    payments: number
}> {
    const now = new Date()
    const monthlyData: { [key: string]: { amount: number; payments: number } } = {}

    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthKey = date.toISOString().slice(0, 7) // YYYY-MM format
        monthlyData[monthKey] = { amount: 0, payments: 0 }
    }

    // Aggregate payments by month
    payments.forEach(payment => {
        const paymentDate = new Date(payment.createdAt)
        const monthKey = paymentDate.toISOString().slice(0, 7)

        if (monthlyData[monthKey]) {
            monthlyData[monthKey].amount += payment.amount
            monthlyData[monthKey].payments++
        }
    })

    // Convert to array format with readable month names
    return Object.entries(monthlyData).map(([monthKey, data]) => {
        const date = new Date(monthKey + '-01')
        const monthName = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        })

        return {
            month: monthName,
            amount: data.amount,
            payments: data.payments,
        }
    })
}