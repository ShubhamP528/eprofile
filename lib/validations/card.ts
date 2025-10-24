import { z } from "zod"

export const createCardSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be less than 30 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores"),
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    subtitle: z.string().max(150, "Subtitle must be less than 150 characters").optional(),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
    profileImage: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Please enter a valid email address").optional(),
    address: z.string().max(200, "Address must be less than 200 characters").optional(),
    template: z.string().default("template1"),
    isPublic: z.boolean().default(true),
})

export const paymentSchema = z.object({
    paymentEnabled: z.boolean().default(false),
    paymentText: z.string().max(50, "Payment text must be less than 50 characters").optional(),
    upiId: z.string().optional(),
    upiQrCode: z.string().optional(),
    razorpayId: z.string().optional(),
    paytmId: z.string().optional(),
})

export const updateCardSchema = createCardSchema.partial().omit({ username: true }).merge(paymentSchema.partial())

export const socialLinkSchema = z.object({
    platform: z.string().min(1, "Platform is required"),
    url: z.string().url("Please enter a valid URL"),
    order: z.number().int().min(0).default(0),
})

export const serviceSchema = z.object({
    title: z.string().min(1, "Service title is required").max(100, "Title must be less than 100 characters"),
    description: z.string().max(300, "Description must be less than 300 characters").optional(),
    price: z.string().max(50, "Price must be less than 50 characters").optional(),
    isFeatured: z.boolean().default(false),
    order: z.number().int().min(0).default(0),
})

export const galleryItemSchema = z.object({
    type: z.enum(["IMAGE", "VIDEO"]),
    url: z.string().url("Please enter a valid URL"),
    title: z.string().max(100, "Title must be less than 100 characters").optional(),
    order: z.number().int().min(0).default(0),
})

export const testimonialSchema = z.object({
    customerName: z.string().min(1, "Customer name is required").max(100, "Name must be less than 100 characters"),
    content: z.string().min(1, "Testimonial content is required").max(500, "Content must be less than 500 characters"),
    rating: z.number().int().min(1).max(5).default(5),
    order: z.number().int().min(0).default(0),
})

export type CreateCardInput = z.infer<typeof createCardSchema>
export type UpdateCardInput = z.infer<typeof updateCardSchema>
export type PaymentInput = z.infer<typeof paymentSchema>
export type SocialLinkInput = z.infer<typeof socialLinkSchema>
export type ServiceInput = z.infer<typeof serviceSchema>
export type GalleryItemInput = z.infer<typeof galleryItemSchema>
export type TestimonialInput = z.infer<typeof testimonialSchema>