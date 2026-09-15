import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'
import { getCardUrl } from '@/lib/utils/card-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.eprofile.cv'
    const currentDate = new Date()

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
            url: getCardUrl(card.username),
            lastModified: card.updatedAt,
            changeFrequency: 'daily' as const,
            priority: 0.9,
        }))
    } catch (error) {
        console.error('Failed to generate dynamic sitemap routes:', error)
    }

    const routes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/features`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/digital-business-card-india`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/digital-business-card-for-freelancers`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/nfc-business-card`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/digital-vs-paper-business-cards`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/business-info`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/refund`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ]

    return [...routes, ...publicProfiles]
}
