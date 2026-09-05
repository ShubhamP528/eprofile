import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
    createSuccessResponse,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/

// GET /api/cards/check-username?username=xxx - Check username availability while typing
export async function GET(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const username = request.nextUrl.searchParams.get('username')?.trim() || ''

        if (username.length < 3 || username.length > 30 || !USERNAME_REGEX.test(username)) {
            return createSuccessResponse({ available: false, reason: 'invalid' })
        }

        const existingCard = await prisma.card.findUnique({
            where: { username },
            select: { id: true }
        })

        return createSuccessResponse({
            available: !existingCard,
            reason: existingCard ? 'taken' : undefined,
        })
    } catch (error) {
        return handleApiError(error)
    }
}
