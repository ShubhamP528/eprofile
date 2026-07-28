import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const isAuthorized = await isAdmin();
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cards = await prisma.card.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        title: true,
        isPublic: true,
        createdAt: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        _count: {
          select: {
            cardViews: true,
          },
        },
      },
    });

    const formattedCards = cards.map((c) => ({
      id: c.id,
      username: c.username,
      title: c.title,
      isPublic: c.isPublic,
      createdAt: c.createdAt,
      ownerEmail: c.user?.email || "Unknown",
      ownerName: c.user?.name || "Unknown",
      views: c._count.cardViews,
    }));

    return NextResponse.json({ cards: formattedCards });
  } catch (error) {
    console.error("Admin cards fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
