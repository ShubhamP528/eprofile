"use client";

import { useState, useRef, useEffect } from "react";

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
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageError(false);
  }, [value]);

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
    <div className={`flex flex-col sm:flex-row items-center gap-5 sm:gap-6 ${className}`}>
      {/* Profile Image / Initials Slot */}
      <div className="relative group shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-indigo-150 bg-slate-50 shadow-sm transition-all duration-300 group-hover:border-indigo-300">
          {value && !imageError ? (
            <img
              src={value}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-violet-100 flex items-center justify-center text-indigo-500 animate-pulse">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Delete button (only if image is active and has no error) */}
        {value && !imageError && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm cursor-pointer z-20"
            title="Remove Photo"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Upload Trigger overlay badge */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 hover:scale-105 transition-all shadow-md cursor-pointer z-10 border-2 border-white"
          title="Upload Photo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Upload Details and Status */}
      <div className="flex-1 space-y-2 text-center sm:text-left">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
          >
            {uploading ? "Compressing..." : value ? "Change Photo" : placeholder}
          </button>

          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 border border-red-200 rounded-xl text-xs font-bold text-red-600 bg-white hover:bg-red-50 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer shadow-sm"
            >
              Remove Photo
            </button>
          )}
        </div>

        {/* Error message */}
        {error && <p className="text-xs font-semibold text-red-600 mt-1">{error}</p>}

        {/* Compressed size verification check */}
        {compressedSize && (
          <p className="text-xs font-semibold text-emerald-600 flex items-center justify-center sm:justify-start gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Processed image size: {compressedSize}</span>
          </p>
        )}

        <p className="text-[10px] text-slate-400 font-medium">
          Images are automatically optimized. Recommended size: Square aspect ratio, under 5MB.
        </p>
      </div>
    </div>
  );
}
