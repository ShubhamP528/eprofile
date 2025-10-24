import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createGalleryItemSchema } from '@/lib/validations/gallery'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

// GET /api/gallery - Get card's gallery items
export async function GET(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const { searchParams } = new URL(request.url)
        const cardId = searchParams.get('cardId')

        if (!cardId) {
            return createErrorResponse('Card ID is required', 'MISSING_CARD_ID', 400)
        }

        // Verify the card belongs to the user
        const card = await prisma.card.findUnique({
            where: { id: cardId, userId: authResult.userId }
        })

        if (!card) {
            return createErrorResponse('Card not found', 'CARD_NOT_FOUND', 404)
        }

        const galleryItems = await prisma.galleryItem.findMany({
            where: { cardId },
            orderBy: { order: 'asc' }
        })

        return createSuccessResponse(galleryItems)
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/gallery - Create a new gallery item
export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, createGalleryItemSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        const { searchParams } = new URL(request.url)
        const cardId = searchParams.get('cardId')

        if (!cardId) {
            return createErrorResponse('Card ID is required', 'MISSING_CARD_ID', 400)
        }

        // Verify the card belongs to the user
        const card = await prisma.card.findUnique({
            where: { id: cardId, userId: authResult.userId }
        })

        if (!card) {
            return createErrorResponse('Card not found', 'CARD_NOT_FOUND', 404)
        }

        // Check gallery limit (max 10 items)
        const itemCount = await prisma.galleryItem.count({
            where: { cardId }
        })

        if (itemCount >= 10) {
            return createErrorResponse('Maximum 10 gallery items allowed per card', 'GALLERY_LIMIT_EXCEEDED', 400)
        }

        // Get the next order number
        const lastItem = await prisma.galleryItem.findFirst({
            where: { cardId },
            orderBy: { order: 'desc' }
        })

        const nextOrder = lastItem ? lastItem.order + 1 : 0

        const galleryItem = await prisma.galleryItem.create({
            data: {
                ...validationResult.data,
                cardId,
                order: validationResult.data.order || nextOrder
            }
        })

        return createSuccessResponse(galleryItem, 201)
    } catch (error) {
        return handleApiError(error)
    }
}