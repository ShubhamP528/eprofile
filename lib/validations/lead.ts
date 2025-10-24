import { z } from "zod"

export const createLeadSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address").optional(),
    phone: z.string().max(20, "Phone number must be less than 20 characters").optional(),
    message: z.string().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
    source: z.string().max(100, "Source must be less than 100 characters").optional(),
})

export const updateLeadStatusSchema = z.object({
    status: z.enum(["NEW", "CONTACTED", "CONVERTED", "CLOSED"]),
})

export type CreateLeadInput = z.infer<typeof createLeadSchema>
export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>