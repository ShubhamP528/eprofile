import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createLeadSchema } from '@/lib/validations/lead'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

// GET /api/leads - Get user's leads
export async function GET(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const { searchParams } = new URL(request.url)
        const cardId = searchParams.get('cardId')
        const status = searchParams.get('status')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const skip = (page - 1) * limit

        const where: any = { userId: authResult.userId }

        if (cardId) {
            where.cardId = cardId
        }

        if (status) {
            where.status = status
        }

        const [leads, total] = await Promise.all([
            prisma.lead.findMany({
                where,
                include: {
                    card: {
                        select: {
                            id: true,
                            username: true,
                            title: true,
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            prisma.lead.count({ where })
        ])

        return createSuccessResponse({
            leads,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/leads - Create a new lead (public endpoint for contact forms)
export async function POST(request: NextRequest) {
    try {
        const validationResult = await validateRequest(request, createLeadSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        const { searchParams } = new URL(request.url)
        const cardId = searchParams.get('cardId')

        if (!cardId) {
            return createErrorResponse('Card ID is required', 'MISSING_CARD_ID', 400)
        }

        // Verify the card exists and is public
        const card = await prisma.card.findUnique({
            where: {
                id: cardId,
                isPublic: true
            },
            select: {
                id: true,
                userId: true,
                title: true,
                user: {
                    select: {
                        email: true,
                        name: true,
                    }
                }
            }
        })

        if (!card) {
            return createErrorResponse('Card not found or not public', 'CARD_NOT_FOUND', 404)
        }

        // Create the lead
        const lead = await prisma.lead.create({
            data: {
                ...validationResult.data,
                cardId: card.id,
                userId: card.userId,
            }
        })

        // TODO: Send email notification to card owner
        // This will be implemented when we add email service integration

        return createSuccessResponse(lead, 201)
    } catch (error) {
        return handleApiError(error)
    }
}