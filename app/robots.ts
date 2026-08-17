import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.eprofile.cv'
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/dashboard/',
                    '/add-card/',
                    '/private/',
                    '/auth/',
                    '/_next/static/media/',
                ],
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'ImagesiftBot', 'OAI-SearchBot', 'Amazonbot', 'Applebot-Extended', 'Bytespider'],
                disallow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
