import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const isAuthorized = await isAdmin();
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalUsers,
      totalCards,
      totalViews,
      freeUsers,
      standardUsers,
      proUsers,
      recentUsers,
      recentCards,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.card.count(),
      prisma.cardView.count(),
      prisma.user.count({ where: { subscription: "FREE" } }),
      prisma.user.count({ where: { subscription: "STANDARD" } }),
      prisma.user.count({ where: { subscription: "PRO" } }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          subscription: true,
        },
      }),
      prisma.card.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          username: true,
          title: true,
          createdAt: true,
          isPublic: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalCards,
        totalViews,
        subscriptionDistribution: {
          FREE: freeUsers,
          STANDARD: standardUsers,
          PRO: proUsers,
        },
      },
      recentUsers,
      recentCards,
    });
  } catch (error) {
    console.error("Admin stats fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
