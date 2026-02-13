import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PublicCardClient from "./client";

interface Props {
  params: Promise<{ username: string }>;
}

async function getCard(username: string) {
  try {
    const card = await prisma.card.findUnique({
      where: { username },
      include: {
        socialLinks: true,
        services: {
          orderBy: { order: 'asc' }
        },
        gallery: {
          orderBy: { order: 'asc' }
        },
        testimonials: {
          orderBy: { order: 'asc' }
        },
      }
    });

    // We need to transform the internal DB result to match the client component's expected shape if necessary
    // Fortunately, Prisma result matches closely. However, Date objects need to be serialized if we pass them to client component.
    // The client component doesn't seem to use Dates, but `card` object has createdAt/updatedAt which are Dates.

    if (!card) return null;

    // Convert to plain object to avoid "Date object cannot be passed to client component"
    return JSON.parse(JSON.stringify(card));
  } catch (error) {
    console.error("Error fetching card:", error);
    return null;
  }
}

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
  const image = card.profileImage || "/og-image.png";

  return {
    title: {
      absolute: title // Override template
    },
    description: description,
    openGraph: {
      type: "profile",
      title: title,
      description: description,
      images: [image],
      username: card.username,
      firstName: card.title.split(' ')[0], // Best guess
      lastName: card.title.split(' ').slice(1).join(' '), // Best guess
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
    },
  };
}

import { headers } from "next/headers";

export default async function PublicCardPage({ params }: Props) {
  const resolvedParams = await params;
  const card = await getCard(resolvedParams.username);
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  if (!card) {
    notFound();
  }

  return <PublicCardClient params={params} initialCard={card} baseUrl={baseUrl} />;
}
