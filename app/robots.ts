import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'ImagesiftBot', 'OAI-SearchBot', 'Amazonbot', 'Applebot-Extended', 'Bytespider'],
                disallow: '/',
            }
        ],
        sitemap: 'https://eprofile.cv/sitemap.xml',
    }
}
