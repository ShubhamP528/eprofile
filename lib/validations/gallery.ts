import { z } from "zod"

export const createGalleryItemSchema = z.object({
    type: z.enum(["IMAGE", "VIDEO"]),
    url: z.string().url("Please enter a valid URL"),
    title: z.string().max(100, "Title must be less than 100 characters").optional(),
    order: z.number().int().min(0).default(0),
})

export const updateGalleryItemSchema = z.object({
    type: z.enum(["IMAGE", "VIDEO"]).optional(),
    url: z.string().url("Please enter a valid URL").optional(),
    title: z.string().max(100, "Title must be less than 100 characters").optional(),
    order: z.number().int().min(0).optional(),
})

export const reorderGallerySchema = z.object({
    items: z.array(z.object({
        id: z.string(),
        order: z.number().int().min(0),
    })),
})

export type CreateGalleryItemInput = z.infer<typeof createGalleryItemSchema>
export type UpdateGalleryItemInput = z.infer<typeof updateGalleryItemSchema>
export type ReorderGalleryInput = z.infer<typeof reorderGallerySchema>