import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;

    try {
        const card = await prisma.card.findUnique({
            where: { username },
            select: { 
                profileImage: true,
                coverImage: true 
            }
        });

        const type = request.nextUrl.searchParams.get('type') || 'profile';
        const imageField = type === 'cover' ? card?.coverImage : card?.profileImage;

        if (!imageField || !imageField.startsWith('data:')) {
            // Return an empty or default image if not found/not base64
            const fallback = type === 'cover' ? '/cover-fallback.png' : '/og-image.png';
            return NextResponse.redirect(new URL(fallback, request.url));
        }

        // Parse base64
        const [header, base64Data] = imageField.split(',');
        const contentType = header.split(':')[1].split(';')[0];
        const buffer = Buffer.from(base64Data, 'base64');

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Content-Length': buffer.length.toString(),
            },
        });
    } catch (error) {
        console.error('Error serving profile image:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
