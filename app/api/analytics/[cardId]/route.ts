import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
    createSuccessResponse,
    createErrorResponse,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

interface RouteParams {
    params: Promise<{ cardId: string }>
}

// GET /api/analytics/[cardId] - Get analytics for a specific card
export async function GET(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const { searchParams } = new URL(request.url)
        const days = parseInt(searchParams.get('days') || '30')

        // Verify card ownership
        const card = await prisma.card.findUnique({
            where: { id: resolvedParams.cardId },
            select: { userId: true, title: true }
        })

        if (!card) {
            return createErrorResponse('Card not found', 'CARD_NOT_FOUND', 404)
        }

        if (card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        // Get analytics data
        const [
            totalViews,
            uniqueVisitors,
            buttonClicks,
            leads,
            viewsOverTime,
            topReferrers,
            buttonClickStats,
            recentLeads
        ] = await Promise.all([
            // Total views
            prisma.cardView.count({
                where: {
                    cardId: resolvedParams.cardId,
                    createdAt: { gte: startDate }
                }
            }),

            // Unique visitors
            prisma.cardView.groupBy({
                by: ['visitorId'],
                where: {
                    cardId: resolvedParams.cardId,
                    createdAt: { gte: startDate }
                }
            }).then((result: any[]) => result.length),

            // Button clicks
            prisma.buttonClick.count({
                where: {
                    cardId: resolvedParams.cardId,
                    createdAt: { gte: startDate }
                }
            }),

            // Leads generated
            prisma.lead.count({
                where: {
                    cardId: resolvedParams.cardId,
                    createdAt: { gte: startDate }
                }
            }),

            // Views over time (daily) - Using Prisma native queries for better compatibility
            prisma.cardView.findMany({
                where: {
                    cardId: resolvedParams.cardId,
                    createdAt: { gte: startDate }
                },
                select: {
                    createdAt: true,
                    visitorId: true
                },
                orderBy: { createdAt: 'asc' }
            }).then((views: any[]) => {
                // Group by date in JavaScript to avoid SQL compatibility issues
                const groupedByDate = views.reduce((acc: any, view: any) => {
                    const date = view.createdAt.toISOString().split('T')[0]; // Get YYYY-MM-DD
                    if (!acc[date]) {
                        acc[date] = { views: 0, uniqueVisitors: new Set() };
                    }
                    acc[date].views++;
                    acc[date].uniqueVisitors.add(view.visitorId);
                    return acc;
                }, {});

                return Object.entries(groupedByDate).map(([date, data]: [string, any]) => ({
                    date,
                    views: data.views,
                    unique_visitors: data.uniqueVisitors.size
                })).sort((a, b) => a.date.localeCompare(b.date));
            }),

            // Top referrers
            prisma.cardView.groupBy({
                by: ['referrer'],
                where: {
                    cardId: resolvedParams.cardId,
                    createdAt: { gte: startDate },
                    referrer: { not: null }
                },
                _count: { referrer: true },
                orderBy: { _count: { referrer: 'desc' } },
                take: 10
            }),

            // Button click statistics
            prisma.buttonClick.groupBy({
                by: ['buttonType'],
                where: {
                    cardId: resolvedParams.cardId,
                    createdAt: { gte: startDate }
                },
                _count: { buttonType: true },
                orderBy: { _count: { buttonType: 'desc' } }
            }),

            // Recent leads
            prisma.lead.findMany({
                where: {
                    cardId: resolvedParams.cardId,
                    createdAt: { gte: startDate }
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    createdAt: true
                },
                orderBy: { createdAt: 'desc' },
                take: 5
            })
        ])

        const analytics = {
            summary: {
                totalViews: Number(totalViews),
                totalLeads: Number(leads),
                totalButtonClicks: Number(buttonClicks),
                conversionRate: totalViews > 0 ? Number(((Number(leads) / Number(totalViews)) * 100).toFixed(2)) : 0
            },
            viewsOverTime: (viewsOverTime as any[]).map((v: any) => ({
                date: v.date,
                views: Number(v.views)
            })),
            buttonClicks: buttonClickStats.map((b: any) => ({
                buttonType: b.buttonType,
                clicks: Number(b._count.buttonType)
            })),
            topReferrers: topReferrers.map((r: any) => ({
                referrer: r.referrer || 'Direct',
                views: Number(r._count.referrer)
            })),
            recentLeads: recentLeads.map((lead: any) => ({
                id: lead.id,
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                createdAt: lead.createdAt.toISOString()
            }))
        }

        return createSuccessResponse(analytics)
    } catch (error) {
        return handleApiError(error)
    }
}