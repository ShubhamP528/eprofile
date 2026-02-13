import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Increase body size limit to 10MB to support multiple base64-encoded images
  // Default is 4MB which causes 413 errors when cards have multiple images
  // Typical use case: profile image + gallery (10 images) + testimonials (5 images)
  // Expected payload: 4-6MB, 10MB provides comfortable headroom
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
