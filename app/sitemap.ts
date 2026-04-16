import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://eprofile.cv'

    let publicProfiles: MetadataRoute.Sitemap = []

    try {
        // Fetch all public cards with caching
        const publicCards = await unstable_cache(
            async () => {
                return await prisma.card.findMany({
                    where: {
                        isPublic: true,
                    },
                    select: {
                        username: true,
                        updatedAt: true,
                    },
                    orderBy: {
                        updatedAt: 'desc'
                    }
                })
            },
            ['sitemap-public-cards'],
            { revalidate: 3600, tags: ['cards'] }
        )()

        publicProfiles = publicCards.map((card) => ({
            url: `${baseUrl}/${encodeURIComponent(card.username)}`,
            lastModified: card.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
    } catch (error) {
        console.error('Failed to generate dynamic sitemap routes:', error)
    }

    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/features`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/business-info`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/refund`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/auth/signin`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/auth/signup`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ]

    return [...routes, ...publicProfiles]
}
