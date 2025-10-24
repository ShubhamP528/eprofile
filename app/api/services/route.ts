import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createServiceSchema } from '@/lib/validations/service'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

// GET /api/services - Get user's services
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

        const services = await prisma.service.findMany({
            where: { cardId },
            orderBy: { order: 'asc' }
        })

        return createSuccessResponse(services)
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, createServiceSchema)
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

        // Check service limit (max 5 services)
        const serviceCount = await prisma.service.count({
            where: { cardId }
        })

        if (serviceCount >= 5) {
            return createErrorResponse('Maximum 5 services allowed per card', 'SERVICE_LIMIT_EXCEEDED', 400)
        }

        // Get the next order number
        const lastService = await prisma.service.findFirst({
            where: { cardId },
            orderBy: { order: 'desc' }
        })

        const nextOrder = lastService ? lastService.order + 1 : 0

        const service = await prisma.service.create({
            data: {
                ...validationResult.data,
                cardId,
                order: validationResult.data.order || nextOrder
            }
        })

        return createSuccessResponse(service, 201)
    } catch (error) {
        return handleApiError(error)
    }
}