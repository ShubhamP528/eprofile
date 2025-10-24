import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
    createSuccessResponse,
    createErrorResponse,
    handleApiError
} from '@/lib/api-utils'

interface RouteParams {
    params: Promise<{ username: string }>
}

// GET /api/cards/username/[username] - Get a card by username (public access)
export async function GET(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const card = await prisma.card.findUnique({
            where: {
                username: resolvedParams.username,
                isPublic: true // Only return public cards
            },
            include: {
                socialLinks: {
                    orderBy: { order: 'asc' }
                },
                services: {
                    orderBy: { order: 'asc' }
                },
                gallery: {
                    orderBy: { order: 'asc' }
                },
                testimonials: {
                    orderBy: { order: 'asc' }
                },
                user: {
                    select: {
                        name: true,
                        image: true,
                    }
                }
            }
        })

        if (!card) {
            return createErrorResponse('Card not found', 'CARD_NOT_FOUND', 404)
        }

        // Track the view for analytics
        const userAgent = request.headers.get('user-agent') || ''
        const referrer = request.headers.get('referer') || ''

        // Generate a simple visitor ID based on IP and user agent
        const forwarded = request.headers.get('x-forwarded-for')
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
        const visitorId = Buffer.from(`${ip}-${userAgent}`).toString('base64').slice(0, 32)

        // Record the view (fire and forget)
        prisma.cardView.create({
            data: {
                cardId: card.id,
                visitorId,
                referrer: referrer || undefined,
                userAgent,
            }
        }).catch(error => {
            console.error('Failed to record card view:', error)
        })

        return createSuccessResponse(card)
    } catch (error) {
        return handleApiError(error)
    }
}