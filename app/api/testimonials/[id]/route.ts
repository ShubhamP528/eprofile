import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateTestimonialSchema } from '@/lib/validations/testimonial'
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

// GET /api/testimonials/[id] - Get a specific testimonial
export async function GET(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const testimonial = await prisma.testimonial.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: { userId: true }
                }
            }
        })

        if (!testimonial) {
            return createErrorResponse('Testimonial not found', 'TESTIMONIAL_NOT_FOUND', 404)
        }

        if (testimonial.card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        return createSuccessResponse(testimonial)
    } catch (error) {
        return handleApiError(error)
    }
}

// PUT /api/testimonials/[id] - Update a testimonial
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, updateTestimonialSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        // Check if testimonial exists and user owns it
        const existingTestimonial = await prisma.testimonial.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: { userId: true }
                }
            }
        })

        if (!existingTestimonial) {
            return createErrorResponse('Testimonial not found', 'TESTIMONIAL_NOT_FOUND', 404)
        }

        if (existingTestimonial.card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Update the testimonial
        const updatedTestimonial = await prisma.testimonial.update({
            where: { id: resolvedParams.id },
            data: validationResult.data
        })

        return createSuccessResponse(updatedTestimonial)
    } catch (error) {
        return handleApiError(error)
    }
}

// DELETE /api/testimonials/[id] - Delete a testimonial
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        // Check if testimonial exists and user owns it
        const existingTestimonial = await prisma.testimonial.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: { userId: true }
                }
            }
        })

        if (!existingTestimonial) {
            return createErrorResponse('Testimonial not found', 'TESTIMONIAL_NOT_FOUND', 404)
        }

        if (existingTestimonial.card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Delete the testimonial
        await prisma.testimonial.delete({
            where: { id: resolvedParams.id }
        })

        return createSuccessResponse({ message: 'Testimonial deleted successfully' })
    } catch (error) {
        return handleApiError(error)
    }
}