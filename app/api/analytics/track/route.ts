import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import crypto from 'crypto'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    handleApiError
} from '@/lib/api-utils'

const trackButtonClickSchema = z.object({
    cardId: z.string().min(1, 'Card ID is required'),
    buttonType: z.enum(['PHONE', 'EMAIL', 'WHATSAPP', 'LOCATION', 'WEBSITE']),
})

// POST /api/analytics/track - Track button clicks (public endpoint)
export async function POST(request: NextRequest) {
    try {
        const validationResult = await validateRequest(request, trackButtonClickSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        const { cardId, buttonType } = validationResult.data

        // Verify the card exists and is public
        const card = await prisma.card.findUnique({
            where: {
                id: cardId,
                isPublic: true
            },
            select: { id: true }
        })

        if (!card) {
            return createErrorResponse('Card not found or not public', 'CARD_NOT_FOUND', 404)
        }

        // Generate standard session visitorId based on IP and User-Agent
        const forwarded = request.headers.get('x-forwarded-for')
        const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || '127.0.0.1'
        const userAgent = request.headers.get('user-agent') || ''
        const visitorId = crypto.createHash('sha256').update(`${ip}-${userAgent}`).digest('hex').slice(0, 32)

        // Record the button click (fire and forget for performance)
        prisma.buttonClick.create({
            data: {
                cardId,
                buttonType,
                visitorId,
            }
        }).catch(error => {
            console.error('Failed to record button click:', error)
        })

        return createSuccessResponse({ message: 'Click tracked successfully' })
    } catch (error) {
        return handleApiError(error)
    }
}