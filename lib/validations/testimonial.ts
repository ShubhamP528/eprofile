import { z } from "zod"

export const createTestimonialSchema = z.object({
    customerName: z.string().min(1, "Customer name is required").max(100, "Name must be less than 100 characters"),
    content: z.string().min(1, "Testimonial content is required").max(1000, "Content must be less than 1000 characters"),
    rating: z.number().int().min(1).max(5).default(5),
    order: z.number().int().min(0).default(0),
})

export const updateTestimonialSchema = z.object({
    customerName: z.string().min(1, "Customer name is required").max(100, "Name must be less than 100 characters").optional(),
    content: z.string().min(1, "Testimonial content is required").max(1000, "Content must be less than 1000 characters").optional(),
    rating: z.number().int().min(1).max(5).optional(),
    order: z.number().int().min(0).optional(),
})

export const reorderTestimonialsSchema = z.object({
    testimonials: z.array(z.object({
        id: z.string(),
        order: z.number().int().min(0),
    })),
})

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>
export type ReorderTestimonialsInput = z.infer<typeof reorderTestimonialsSchema>