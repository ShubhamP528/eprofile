"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

interface CompressionOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
}

// Compress image using HTML5 Canvas API to reduce payload size
async function compressImage(
  file: File,
  options: CompressionOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        if (width > options.maxWidth || height > options.maxHeight) {
          const ratio = Math.min(
            options.maxWidth / width,
            options.maxHeight / height
          );
          width *= ratio;
          height *= ratio;
        }

        // Create canvas and draw resized image
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression (JPEG format, 0.85 quality)
        const compressedDataUrl = canvas.toDataURL(
          "image/jpeg",
          options.quality
        );
        resolve(compressedDataUrl);
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function ImageUpload({
  value,
  onChange,
  placeholder = "Upload image",
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    setError(null);
    setCompressedSize(null);

    try {
      // Compress image before converting to base64
      const compressedDataUrl = await compressImage(file, {
        maxWidth: 1200,
        maxHeight: 1200,
        quality: 0.85,
      });

      // Calculate compressed size
      const sizeInBytes = Math.round((compressedDataUrl.length * 3) / 4);
      const sizeInKB = (sizeInBytes / 1024).toFixed(1);
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

      setCompressedSize(
        sizeInBytes > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`
      );

      onChange(compressedDataUrl);
      setUploading(false);
    } catch (error) {
      console.error("Compression error:", error);
      setError("Failed to process image. Please try again.");
      setUploading(false);
      setCompressedSize(null);
    }
  };

  const handleRemove = () => {
    onChange("");
    setCompressedSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Current Image Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Compressing...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>{value ? "Change Image" : placeholder}</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Compressed Size Display */}
      {compressedSize && (
        <p className="text-xs text-green-600">
          ✓ Image compressed to {compressedSize}
        </p>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        Images are automatically compressed to reduce size. Recommended: Square
        image, max 5MB original size.
      </p>
    </div>
  );
}
