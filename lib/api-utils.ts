import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { ZodSchema } from 'zod'

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: {
        code: string
        message: string
        details?: any
    }
}

export function createSuccessResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
    return NextResponse.json({ success: true, data }, { status })
}

export function createErrorResponse(
    message: string,
    code: string = 'INTERNAL_ERROR',
    status = 500,
    details?: any
): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error: { code, message, details }
        },
        { status }
    )
}

export async function validateRequest<T>(
    request: NextRequest,
    schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: NextResponse<ApiResponse> }> {
    try {
        const body = await request.json()
        const validatedData = schema.parse(body)
        return { success: true, data: validatedData }
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return {
                success: false,
                error: createErrorResponse(
                    'Invalid input data',
                    'VALIDATION_ERROR',
                    400,
                    error.flatten()
                )
            }
        }
        return {
            success: false,
            error: createErrorResponse('Invalid JSON data', 'INVALID_JSON', 400)
        }
    }
}

export async function requireAuth(): Promise<
    { success: true; userId: string } | { success: false; error: NextResponse<ApiResponse> }
> {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return {
                success: false,
                error: createErrorResponse('Authentication required', 'UNAUTHORIZED', 401)
            }
        }

        return { success: true, userId: session.user.id }
    } catch (error) {
        return {
            success: false,
            error: createErrorResponse('Authentication failed', 'AUTH_ERROR', 401)
        }
    }
}

export function handleApiError(error: unknown): NextResponse<ApiResponse> {
    console.error('API Error:', error)

    if (error instanceof Error) {
        return createErrorResponse(error.message, 'INTERNAL_ERROR', 500)
    }

    return createErrorResponse('An unexpected error occurred', 'UNKNOWN_ERROR', 500)
}