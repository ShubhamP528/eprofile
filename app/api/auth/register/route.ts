import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations/auth'
import {
    createSuccessResponse,
    createErrorResponse,
    validateRequest,
    handleApiError
} from '@/lib/api-utils'

export async function POST(request: NextRequest) {
    try {
        const validationResult = await validateRequest(request, registerSchema)
        if (!validationResult.success) {
            return validationResult.error
        }

        const { name, email, password } = validationResult.data

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return createErrorResponse(
                'User with this email already exists',
                'USER_EXISTS',
                400
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        })

        return createSuccessResponse(
            { message: 'User created successfully', user },
            201
        )
    } catch (error) {
        return handleApiError(error)
    }
}