import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateLeadStatusSchema } from '@/lib/validations/lead'
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

// GET /api/leads/[id] - Get a specific lead
export async function GET(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const lead = await prisma.lead.findUnique({
            where: { id: resolvedParams.id },
            include: {
                card: {
                    select: {
                        id: true,
                        username: true,
                        title: true,
                    }
                }
            }
        })

        if (!lead) {
            return createErrorResponse('Lead not found', 'LEAD_NOT_FOUND', 404)
        }

        if (lead.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        return createSuccessResponse(lead)
    } catch (error) {
        return handleApiError(error)
    }
}

// PUT /api/leads/[id] - Update lead status
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, updateLeadStatusSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        // Check if lead exists and user owns it
        const existingLead = await prisma.lead.findUnique({
            where: { id: resolvedParams.id }
        })

        if (!existingLead) {
            return createErrorResponse('Lead not found', 'LEAD_NOT_FOUND', 404)
        }

        if (existingLead.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Update the lead status
        const updatedLead = await prisma.lead.update({
            where: { id: resolvedParams.id },
            data: validationResult.data,
            include: {
                card: {
                    select: {
                        id: true,
                        username: true,
                        title: true,
                    }
                }
            }
        })

        return createSuccessResponse(updatedLead)
    } catch (error) {
        return handleApiError(error)
    }
}

// PATCH /api/leads/[id] - Update lead status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, updateLeadStatusSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        // Check if lead exists and user owns it
        const existingLead = await prisma.lead.findUnique({
            where: { id: resolvedParams.id }
        })

        if (!existingLead) {
            return createErrorResponse('Lead not found', 'LEAD_NOT_FOUND', 404)
        }

        if (existingLead.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Update the lead status
        const updatedLead = await prisma.lead.update({
            where: { id: resolvedParams.id },
            data: validationResult.data,
            include: {
                card: {
                    select: {
                        id: true,
                        username: true,
                        title: true,
                    }
                }
            }
        })

        return createSuccessResponse(updatedLead)
    } catch (error) {
        return handleApiError(error)
    }
}

// DELETE /api/leads/[id] - Delete a lead
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const resolvedParams = await params
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        // Check if lead exists and user owns it
        const existingLead = await prisma.lead.findUnique({
            where: { id: resolvedParams.id }
        })

        if (!existingLead) {
            return createErrorResponse('Lead not found', 'LEAD_NOT_FOUND', 404)
        }

        if (existingLead.userId !== authResult.userId) {
            return createErrorResponse('Access denied', 'ACCESS_DENIED', 403)
        }

        // Delete the lead
        await prisma.lead.delete({
            where: { id: resolvedParams.id }
        })

        return createSuccessResponse({ message: 'Lead deleted successfully' })
    } catch (error) {
        return handleApiError(error)
    }
}