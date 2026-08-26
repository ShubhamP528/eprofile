import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  createSuccessResponse,
  createErrorResponse,
  requireAuth,
  handleApiError,
} from "@/lib/api-utils";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).optional(),
  image: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
});

// GET /api/user/profile - Fetch user profile
export async function GET() {
  try {
    const authResult = await requireAuth();
    if (!authResult.success) {
      return authResult.error;
    }

    const user = await prisma.user.findUnique({
      where: { id: authResult.userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        subscription: true,
        subscriptionExpiry: true,
        createdAt: true,
      },
    });

    if (!user) {
      return createErrorResponse("User not found", "USER_NOT_FOUND", 404);
    }

    const isExpired = user.subscriptionExpiry && user.subscriptionExpiry < new Date();
    const activeSubscription = isExpired ? "FREE" : user.subscription;

    return createSuccessResponse({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      subscription: activeSubscription,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/user/profile - Update user profile
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth();
    if (!authResult.success) {
      return authResult.error;
    }

    const body = await request.json();
    const validationResult = updateProfileSchema.safeParse(body);

    if (!validationResult.success) {
      return createErrorResponse("Invalid input data", "VALIDATION_ERROR", 400, validationResult.error.flatten());
    }

    const { name, image, currentPassword, newPassword } = validationResult.data;

    // Fetch user current data
    const user = await prisma.user.findUnique({
      where: { id: authResult.userId },
    });

    if (!user) {
      return createErrorResponse("User not found", "USER_NOT_FOUND", 404);
    }

    const updateData: any = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (image !== undefined) {
      updateData.image = image;
    }

    // Handle password update if password fields are provided
    if (newPassword) {
      if (!currentPassword) {
        return createErrorResponse(
          "Current password is required to set a new password",
          "PASSWORD_REQUIRED",
          400
        );
      }

      // Check current password (only if user has a password set - OAuth users might not have password)
      if (user.password) {
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
          return createErrorResponse(
            "Incorrect current password",
            "INCORRECT_PASSWORD",
            400
          );
        }
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: authResult.userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        subscription: true,
        subscriptionExpiry: true,
        createdAt: true,
      },
    });

    const isExpired = updatedUser.subscriptionExpiry && updatedUser.subscriptionExpiry < new Date();
    const activeSubscription = isExpired ? "FREE" : updatedUser.subscription;

    return createSuccessResponse({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      subscription: activeSubscription,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
