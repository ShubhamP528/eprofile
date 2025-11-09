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
};

export default nextConfig;
