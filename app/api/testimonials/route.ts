import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createTestimonialSchema } from '@/lib/validations/testimonial'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

// GET /api/testimonials - Get card's testimonials
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

        const testimonials = await prisma.testimonial.findMany({
            where: { cardId },
            orderBy: { order: 'asc' }
        })

        return createSuccessResponse(testimonials)
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/testimonials - Create a new testimonial
export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, createTestimonialSchema)
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

        // Check testimonial limit (max 10 testimonials)
        const testimonialCount = await prisma.testimonial.count({
            where: { cardId }
        })

        if (testimonialCount >= 10) {
            return createErrorResponse('Maximum 10 testimonials allowed per card', 'TESTIMONIAL_LIMIT_EXCEEDED', 400)
        }

        // Get the next order number
        const lastTestimonial = await prisma.testimonial.findFirst({
            where: { cardId },
            orderBy: { order: 'desc' }
        })

        const nextOrder = lastTestimonial ? lastTestimonial.order + 1 : 0

        const testimonial = await prisma.testimonial.create({
            data: {
                ...validationResult.data,
                cardId,
                order: validationResult.data.order || nextOrder
            }
        })

        return createSuccessResponse(testimonial, 201)
    } catch (error) {
        return handleApiError(error)
    }
}