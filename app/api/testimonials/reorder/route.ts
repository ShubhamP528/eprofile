import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { reorderTestimonialsSchema } from '@/lib/validations/testimonial'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

// PUT /api/testimonials/reorder - Reorder testimonials
export async function PUT(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, reorderTestimonialsSchema)
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

        // Update the order of each testimonial
        const updatePromises = validationResult.data.testimonials.map(testimonial =>
            prisma.testimonial.update({
                where: { id: testimonial.id },
                data: { order: testimonial.order }
            })
        )

        await Promise.all(updatePromises)

        // Return updated testimonials
        const testimonials = await prisma.testimonial.findMany({
            where: { cardId },
            orderBy: { order: 'asc' }
        })

        return createSuccessResponse(testimonials)
    } catch (error) {
        return handleApiError(error)
    }
}