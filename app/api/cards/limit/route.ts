import { requireAuth, createSuccessResponse, handleApiError } from '@/lib/api-utils'
import { checkCardLimit } from '@/lib/subscription'

// GET /api/cards/limit - Check card creation limit
export async function GET() {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const cardLimitInfo = await checkCardLimit(authResult.userId)
        return createSuccessResponse(cardLimitInfo)
    } catch (error) {
        return handleApiError(error)
    }
}