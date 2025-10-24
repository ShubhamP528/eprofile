import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { reorderServicesSchema } from '@/lib/validations/service'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

// PUT /api/services/reorder - Reorder services
export async function PUT(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, reorderServicesSchema)
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

        // Update the order of each service
        const updatePromises = validationResult.data.services.map(service =>
            prisma.service.update({
                where: { id: service.id },
                data: { order: service.order }
            })
        )

        await Promise.all(updatePromises)

        // Return updated services
        const services = await prisma.service.findMany({
            where: { cardId },
            orderBy: { order: 'asc' }
        })

        return createSuccessResponse(services)
    } catch (error) {
        return handleApiError(error)
    }
}