import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateGalleryItemSchema } from '@/lib/validations/gallery'
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

// GET /api/gallery/[id] - Get a specific gallery item
export async function GET(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const galleryItem = await prisma.galleryItem.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: { userId: true }
                }
            }
        })

        if (!galleryItem) {
            return createErrorResponse('Gallery item not found', 'GALLERY_ITEM_NOT_FOUND', 404)
        }

        if (galleryItem.card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        return createSuccessResponse(galleryItem)
    } catch (error) {
        return handleApiError(error)
    }
}

// PUT /api/gallery/[id] - Update a gallery item
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, updateGalleryItemSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        // Check if gallery item exists and user owns it
        const existingItem = await prisma.galleryItem.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: { userId: true }
                }
            }
        })

        if (!existingItem) {
            return createErrorResponse('Gallery item not found', 'GALLERY_ITEM_NOT_FOUND', 404)
        }

        if (existingItem.card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Update the gallery item
        const updatedItem = await prisma.galleryItem.update({
            where: { id: resolvedParams.id },
            data: validationResult.data
        })

        return createSuccessResponse(updatedItem)
    } catch (error) {
        return handleApiError(error)
    }
}

// DELETE /api/gallery/[id] - Delete a gallery item
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        // Check if gallery item exists and user owns it
        const existingItem = await prisma.galleryItem.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: { userId: true }
                }
            }
        })

        if (!existingItem) {
            return createErrorResponse('Gallery item not found', 'GALLERY_ITEM_NOT_FOUND', 404)
        }

        if (existingItem.card.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Delete the gallery item
        await prisma.galleryItem.delete({
            where: { id: resolvedParams.id }
        })

        return createSuccessResponse({ message: 'Gallery item deleted successfully' })
    } catch (error) {
        return handleApiError(error)
    }
}