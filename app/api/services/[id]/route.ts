import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateServiceSchema } from '@/lib/validations/service'
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

// GET /api/services/[id] - Get a specific service
export async function GET(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const service = await prisma.service.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: { userId: true }
                }
            }
        })

        if (!service) {
            return createErrorResponse('Service not found', 'SERVICE_NOT_FOUND', 404)
        }

        if (service.card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        return createSuccessResponse(service)
    } catch (error) {
        return handleApiError(error)
    }
}

// PUT /api/services/[id] - Update a service
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, updateServiceSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        // Check if service exists and user owns it
        const existingService = await prisma.service.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: { userId: true }
                }
            }
        })

        if (!existingService) {
            return createErrorResponse('Service not found', 'SERVICE_NOT_FOUND', 404)
        }

        if (existingService.card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Update the service
        const updatedService = await prisma.service.update({
            where: { id: resolvedParams.id },
            data: validationResult.data
        })

        return createSuccessResponse(updatedService)
    } catch (error) {
        return handleApiError(error)
    }
}

// DELETE /api/services/[id] - Delete a service
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        // Check if service exists and user owns it
        const existingService = await prisma.service.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: { userId: true }
                }
            }
        })

        if (!existingService) {
            return createErrorResponse('Service not found', 'SERVICE_NOT_FOUND', 404)
        }

        if (existingService.card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Delete the service
        await prisma.service.delete({
            where: { id: resolvedParams.id }
        })

        return createSuccessResponse({ message: 'Service deleted successfully' })
    } catch (error) {
        return handleApiError(error)
    }
}