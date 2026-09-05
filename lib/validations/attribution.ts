import { z } from "zod"

const optionalText = z.string().max(255).optional().or(z.literal(""))

export const attributionSchema = z.object({
    utmSource: optionalText,
    utmMedium: optionalText,
    utmCampaign: optionalText,
    utmTerm: optionalText,
    utmContent: optionalText,
    referrer: optionalText,
    landingPage: optionalText,
})

export type AttributionInput = z.infer<typeof attributionSchema>
