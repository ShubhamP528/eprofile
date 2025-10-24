import { z } from "zod"

export const createServiceSchema = z.object({
    title: z.string().min(1, "Service title is required").max(100, "Title must be less than 100 characters"),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
    price: z.string().max(50, "Price must be less than 50 characters").optional(),
    isFeatured: z.boolean().default(false),
    order: z.number().int().min(0).default(0),
})

export const updateServiceSchema = z.object({
    title: z.string().min(1, "Service title is required").max(100, "Title must be less than 100 characters").optional(),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
    price: z.string().max(50, "Price must be less than 50 characters").optional(),
    isFeatured: z.boolean().optional(),
    order: z.number().int().min(0).optional(),
})

export const reorderServicesSchema = z.object({
    services: z.array(z.object({
        id: z.string(),
        order: z.number().int().min(0),
    })),
})

export type CreateServiceInput = z.infer<typeof createServiceSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>
export type ReorderServicesInput = z.infer<typeof reorderServicesSchema>