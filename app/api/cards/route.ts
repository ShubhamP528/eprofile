import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createCardSchema } from '@/lib/validations/card'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

// GET /api/cards - Get user's cards
export async function GET() {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const cards = await prisma.card.findMany({
            where: { userId: authResult.userId },
            select: {
                id: true,
                username: true,
                title: true,
                subtitle: true,
                profileImage: true,
                template: true,
                isPublic: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: 'desc' }
        })

        return createSuccessResponse(cards)
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/cards - Create a new card
export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, createCardSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        const { username, ...cardData } = validationResult.data

        // Check subscription limits
        const { checkCardLimit } = await import('@/lib/subscription')
        const cardLimitCheck = await checkCardLimit(authResult.userId)

        if (!cardLimitCheck.canCreate) {
            return createErrorResponse(
                `Card limit reached. You can create up to ${cardLimitCheck.maxCards} cards on your current plan. Upgrade to Pro for unlimited cards.`,
                'CARD_LIMIT_REACHED',
                403
            )
        }

        // Check if username is already taken
        const existingCard = await prisma.card.findUnique({
            where: { username }
        })

        if (existingCard) {
            return createErrorResponse(
                'Username is already taken',
                'USERNAME_TAKEN',
                400
            )
        }

        // Create the card
        const card = await prisma.card.create({
            data: {
                ...cardData,
                username,
                userId: authResult.userId,
            },
            include: {
                socialLinks: true,
                services: true,
                gallery: true,
                testimonials: true,
            }
        })

        return createSuccessResponse(card, 201)
    } catch (error) {
        return handleApiError(error)
    }
}