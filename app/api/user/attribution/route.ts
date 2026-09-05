import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { attributionSchema } from '@/lib/validations/attribution'
import {
    createSuccessResponse,
    validateRequest,
    requireAuth,
    handleApiError
} from '@/lib/api-utils'

// POST /api/user/attribution - Record first-touch acquisition attribution for the
// current user. No-ops if attribution was already set, so the earliest touch wins
// regardless of how many times this fires across later sessions/devices.
export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth()
        if (!authResult.success) {
            return authResult.error
        }

        const validationResult = await validateRequest(request, attributionSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        const existing = await prisma.user.findUnique({
            where: { id: authResult.userId },
            select: { attributionSetAt: true }
        })

        if (existing?.attributionSetAt) {
            return createSuccessResponse({ recorded: false })
        }

        const data = validationResult.data
        const hasAnyValue = Object.values(data).some((v) => v && v.length > 0)
        if (!hasAnyValue) {
            return createSuccessResponse({ recorded: false })
        }

        await prisma.user.update({
            where: { id: authResult.userId },
            data: {
                utmSource: data.utmSource || null,
                utmMedium: data.utmMedium || null,
                utmCampaign: data.utmCampaign || null,
                utmTerm: data.utmTerm || null,
                utmContent: data.utmContent || null,
                referrer: data.referrer || null,
                landingPage: data.landingPage || null,
                attributionSetAt: new Date(),
            },
        })

        return createSuccessResponse({ recorded: true })
    } catch (error) {
        return handleApiError(error)
    }
}
