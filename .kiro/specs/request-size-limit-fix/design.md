# Design Document

## Overview

This design addresses the 413 Request Entity Too Large error by implementing a two-pronged approach:

1. Increasing Next.js API route body size limits to accommodate larger payloads
2. Implementing client-side image compression to reduce payload sizes before transmission

The solution maintains the current base64 storage approach while making it more robust and efficient.

## Architecture

### Component Changes

1. **Next.js Configuration** (`next.config.ts`)

   - Add API route body size limit configuration
   - Set limit to 10MB to accommodate multiple compressed images

2. **Image Upload Component** (`components/ui/image-upload.tsx`)

   - Add client-side image compression using HTML5 Canvas API
   - Compress images before converting to base64
   - Display compressed size to user

3. **API Routes** (no changes needed)
   - Will automatically inherit the new body size limit from Next.js config

## Components and Interfaces

### 1. Next.js Configuration

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Increase from default 4mb
    },
  },
  // For App Router (Next.js 13+)
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};
```

### 2. Image Compression Utility

Add a compression function to the ImageUpload component:

```typescript
interface CompressionOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
}

async function compressImage(
  file: File,
  options: CompressionOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > options.maxWidth || height > options.maxHeight) {
          const ratio = Math.min(
            options.maxWidth / width,
            options.maxHeight / height
          );
          width *= ratio;
          height *= ratio;
        }

        // Create canvas and compress
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression
        const compressedDataUrl = canvas.toDataURL(
          "image/jpeg",
          options.quality
        );
        resolve(compressedDataUrl);
      };

      img.onerror = reject;
      img.src = e.target?.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

### 3. Updated ImageUpload Component Flow

```
User selects file
    ↓
Validate file type and size (< 5MB original)
    ↓
Compress image (max 1200px, quality 0.85)
    ↓
Convert to base64 data URL
    ↓
Calculate and display compressed size
    ↓
Call onChange with compressed data URL
```

## Data Models

No database schema changes required. Images continue to be stored as TEXT fields containing base64 data URLs.

## Error Handling

### Client-Side Errors

1. **File too large (> 5MB original)**

   - Display: "Image size must be less than 5MB"
   - Action: Prevent upload

2. **Compression fails**

   - Display: "Failed to process image. Please try again."
   - Action: Reset upload state

3. **Invalid file type**
   - Display: "Please select an image file"
   - Action: Prevent upload

### Server-Side Errors

1. **Payload exceeds 10MB**

   - Status: 413
   - Response: "Request payload too large. Please reduce the number or size of images."
   - Action: Display error to user

2. **Body parser error**
   - Status: 413
   - Response: Clear error message with guidance
   - Action: Log error and display user-friendly message

## Testing Strategy

### Manual Testing

1. **Single large image upload**

   - Upload 4MB image
   - Verify compression reduces size
   - Verify card saves successfully

2. **Multiple images (gallery + testimonials)**

   - Add 5+ images to gallery
   - Add 3+ testimonials with images
   - Verify total payload < 10MB
   - Verify card saves successfully

3. **Edge case: Very large payload**

   - Attempt to add 10+ high-resolution images
   - Verify appropriate error message if limit exceeded

4. **Image quality verification**
   - Upload high-quality image
   - Verify compressed image maintains acceptable quality
   - Check image display on card preview

### Compression Verification

1. Log original and compressed sizes
2. Verify compression ratio (should be 50-70% reduction for typical images)
3. Visual inspection of compressed images

## Implementation Notes

### Why 10MB Limit?

- Default Next.js limit: 4MB
- Typical compressed image: 100-300KB
- Gallery (10 images): ~2-3MB
- Testimonials (5 images): ~1-2MB
- Card data + profile image: ~500KB
- Total typical use: 4-6MB
- 10MB provides comfortable headroom

### Why Client-Side Compression?

- Reduces server bandwidth
- Faster uploads for users
- Immediate feedback on size
- Reduces database storage
- No server-side processing needed

### Compression Settings Rationale

- **Max width 1200px**: Sufficient for modern displays, reduces file size significantly
- **Quality 0.85**: Good balance between quality and size (JPEG standard)
- **Format JPEG**: Better compression than PNG for photos

## Future Enhancements

1. **Cloud storage migration**: Move to Cloudinary/S3 for better scalability
2. **Progressive upload**: Upload images individually rather than in one payload
3. **WebP format**: Better compression than JPEG (when browser support is universal)
4. **Lazy loading**: Load images on-demand rather than all at once
