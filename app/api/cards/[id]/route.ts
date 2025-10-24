import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateCardSchema } from '@/lib/validations/card'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET /api/cards/[id] - Get a specific card
export async function GET(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const card = await prisma.card.findUnique({
            where: { id: resolvedParams.id },
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

        // If card is not public, require authentication and ownership
        if (!card.isPublic) {
            const authResult = await requireAuth()
            if (!authResult.success) {
                return authResult.error
            }

            if (card.userId !== authResult.userId) {
                return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
            }
        }

        return createSuccessResponse(card)
    } catch (error) {
        return handleApiError(error)
    }
}

// PUT /api/cards/[id] - Update a card
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, updateCardSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        // Check if card exists and user owns it
        const existingCard = await prisma.card.findUnique({
            where: { id: resolvedParams.id }
        })

        if (!existingCard) {
            return createErrorResponse('Card not found', 'CARD_NOT_FOUND', 404)
        }

        if (existingCard.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Update the card
        const updatedCard = await prisma.card.update({
            where: { id: resolvedParams.id },
            data: validationResult.data,
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
            }
        })

        return createSuccessResponse(updatedCard)
    } catch (error) {
        return handleApiError(error)
    }
}

// DELETE /api/cards/[id] - Delete a card
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        // Check if card exists and user owns it
        const existingCard = await prisma.card.findUnique({
            where: { id: resolvedParams.id }
        })

        if (!existingCard) {
            return createErrorResponse('Card not found', 'CARD_NOT_FOUND', 404)
        }

        if (existingCard.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Delete the card (cascade will handle related records)
        await prisma.card.delete({
            where: { id: resolvedParams.id }
        })

        return createSuccessResponse({ message: 'Card deleted successfully' })
    } catch (error) {
        return handleApiError(error)
    }
}