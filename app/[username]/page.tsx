import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PublicCardClient from "./client";
import { extractKeywords } from "@/lib/seo-utils";
import { cache } from "react";
import { unstable_cache } from "next/cache";

interface Props {
  params: Promise<{ username: string }>;
}

/**
 * Cached database query for a card by username.
 */
const getCard = cache(async (username: string) => {
  return unstable_cache(
    async (uname: string) => {
      try {
        const card = await prisma.card.findUnique({
          where: { username: uname },
          include: {
            socialLinks: { orderBy: { order: 'asc' } },
            services: { orderBy: { order: 'asc' } },
            gallery: { orderBy: { order: 'asc' } },
            testimonials: { orderBy: { order: 'asc' } },
          }
        });

        if (!card) return null;

        // Optimization: Replace base64 images with API URLs to reduce HTML size
        // This is critical because base64 strings get serialized multiple times in Next.js HTML
        if (card.profileImage && card.profileImage.startsWith('data:')) {
          card.profileImage = `/api/cards/image/${uname}`;
        }
        
        // Similarly for coverImage if it exists as base64
        if (card.coverImage && card.coverImage.startsWith('data:')) {
          card.coverImage = `/api/cards/image/${uname}?type=cover`;
        }

        return JSON.parse(JSON.stringify(card));
      } catch (error) {
        console.error("Error fetching card:", error);
        return null;
      }
    },
    [`card-${username}`],
    {
      revalidate: 3600,
      tags: [`card-${username}`, 'cards']
    }
  )(username);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const card = await getCard(username);

  if (!card) {
    return {
      title: "eProfile Not Found",
    };
  }

  const title = `${card.title} - Digital Business Card | eProfile`;
  const description = card.bio || `View ${card.title}'s professional digital business card on eProfile. Connect, share, and network efficiently.`;
  
  // Use the optimized URL from card object
  const image = card.profileImage || "/og-image.png";

  const keywords = extractKeywords(card.title, card.subtitle, card.bio, card.services, card.seoDescription || "");

  // Use absolute URL for meta images to ensure crawlers can reach them
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://eprofile.cv";
  const absoluteImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    title: {
      absolute: title
    },
    description: description,
    keywords: keywords,
    openGraph: {
      type: "profile",
      title: title,
      description: description,
      images: [absoluteImageUrl],
      username: card.username,
      firstName: card.title.split(' ')[0],
      lastName: card.title.split(' ').slice(1).join(' '),
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [absoluteImageUrl],
    },
  };
}

/**
 * Pre-generate paths for some cards to improve initial load for crawlers
 */
export async function generateStaticParams() {
  try {
    // We only pre-generate the top 50 cards to keep build times reasonable
    const cards = await prisma.card.findMany({
      where: { isPublic: true },
      take: 50,
      orderBy: { updatedAt: 'desc' },
      select: { username: true }
    });

    return cards.map((card) => ({
      username: card.username,
    }));
  } catch (error) {
    return [];
  }
}

// Revalidate every hour
export const revalidate = 3600;

export default async function PublicCardPage({ params }: Props) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  const card = await getCard(username);

  // Use environment variable for baseUrl or fallback to a default
  // This avoids calling headers() which forces dynamic rendering
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://eprofile.cv";

  if (!card) {
    notFound();
  }

  return <PublicCardClient params={params} initialCard={card} baseUrl={baseUrl} />;
}
