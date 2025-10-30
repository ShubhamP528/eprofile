import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/api-utils'
import { createSuccessResponse, createErrorResponse, handleApiError } from '@/lib/api-utils'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const billingHistoryQuerySchema = z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 20),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(['all', 'captured', 'failed', 'refunded']).optional().default('all'),
    plan: z.enum(['all', 'STANDARD', 'PRO']).optional().default('all'),
    searchQuery: z.string().optional(),
})

interface PaymentRecord {
    id: string
    paymentId: string
    orderId: string
    amount: number
    currency: string
    status: string
    plan: string
    paymentMethod?: string | null
    cardLast4?: string | null
    description: string
    createdAt: string
    refundAmount?: number | null
    refundedAt?: string | null
    invoiceUrl?: string | null
}

interface BillingSummary {
    totalAmount: number
    totalPayments: number
    successfulPayments: number
    failedPayments: number
    refundedPayments: number
    averagePayment: number
    lastPaymentDate: string | null
}

// GET /api/billing/history - Get user's billing history with filtering and pagination
export async function GET(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const { searchParams } = new URL(request.url)
        const queryParams = Object.fromEntries(searchParams.entries())

        const validationResult = billingHistoryQuerySchema.safeParse(queryParams)
        if (!validationResult.success) {
            return createErrorResponse(
                'Invalid query parameters',
                'VALIDATION_ERROR',
                400,
                validationResult.error.issues
            )
        }

        const { page, limit, startDate, endDate, status, plan, searchQuery } = validationResult.data

        // Build where clause for filtering
        const whereClause: any = {
            userId: authResult.userId,
        }

        // Date range filtering
        if (startDate || endDate) {
            whereClause.createdAt = {}
            if (startDate) {
                whereClause.createdAt.gte = new Date(startDate)
            }
            if (endDate) {
                whereClause.createdAt.lte = new Date(endDate)
            }
        }

        // Status filtering
        if (status !== 'all') {
            whereClause.status = status
        }

        // Plan filtering
        if (plan !== 'all') {
            whereClause.plan = plan
        }

        // Search query filtering (search in paymentId, orderId, or description)
        if (searchQuery) {
            whereClause.OR = [
                { paymentId: { contains: searchQuery, mode: 'insensitive' } },
                { orderId: { contains: searchQuery, mode: 'insensitive' } },
                { description: { contains: searchQuery, mode: 'insensitive' } },
            ]
        }

        // Calculate pagination
        const skip = (page - 1) * limit

        // Get total count for pagination
        const totalCount = await prisma.paymentHistory.count({
            where: whereClause,
        })

        // Fetch payment records
        const payments = await prisma.paymentHistory.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        })

        // Format payment records with user-friendly descriptions
        const formattedPayments: PaymentRecord[] = payments.map(payment => ({
            ...payment,
            description: (payment as any).description || generatePaymentDescription(payment.plan, payment.amount),
            createdAt: payment.createdAt.toISOString(),
            refundedAt: (payment as any).refundedAt?.toISOString() || null,
            paymentMethod: (payment as any).paymentMethod || null,
            cardLast4: (payment as any).cardLast4 || null,
            refundAmount: (payment as any).refundAmount || null,
            invoiceUrl: (payment as any).invoiceUrl || null,
        }))

        // Calculate billing summary
        const allPayments = await prisma.paymentHistory.findMany({
            where: { userId: authResult.userId },
        })

        const summary: BillingSummary = calculateBillingSummary(allPayments)

        const totalPages = Math.ceil(totalCount / limit)

        return createSuccessResponse({
            payments: formattedPayments,
            pagination: {
                page,
                limit,
                total: totalCount,
                totalPages,
            },
            summary,
        })
    } catch (error) {
        console.error('Billing history error:', error)
        return handleApiError(error)
    }
}

function generatePaymentDescription(plan: string, amount: number): string {
    const planName = plan === 'PRO' ? 'Pro' : 'Standard'
    const amountInRupees = (amount / 100).toFixed(2)
    return `${planName} Plan Subscription - ₹${amountInRupees}`
}

function calculateBillingSummary(payments: any[]): BillingSummary {
    const successfulPayments = payments.filter(p => p.status === 'captured')
    const failedPayments = payments.filter(p => p.status === 'failed')
    const refundedPayments = payments.filter(p => p.refundAmount && p.refundAmount > 0)

    const totalAmount = successfulPayments.reduce((sum, p) => sum + p.amount, 0)
    const totalRefunded = refundedPayments.reduce((sum, p) => sum + (p.refundAmount || 0), 0)
    const netAmount = totalAmount - totalRefunded

    const averagePayment = successfulPayments.length > 0 ? totalAmount / successfulPayments.length : 0

    const lastPayment = payments
        .filter(p => p.status === 'captured')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]

    return {
        totalAmount: netAmount,
        totalPayments: payments.length,
        successfulPayments: successfulPayments.length,
        failedPayments: failedPayments.length,
        refundedPayments: refundedPayments.length,
        averagePayment,
        lastPaymentDate: lastPayment ? lastPayment.createdAt.toISOString() : null,
    }
}