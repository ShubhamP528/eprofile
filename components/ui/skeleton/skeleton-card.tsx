"use client";

import { cn } from "../../../lib/utils";
import { SkeletonBase } from "./skeleton-base";

interface SkeletonCardProps {
  variant?: "default" | "compact" | "detailed";
  showImage?: boolean;
  showActions?: boolean;
  lines?: number;
  className?: string;
}

export function SkeletonCard({
  variant = "default",
  showImage = true,
  showActions = true,
  lines = 3,
  className,
}: SkeletonCardProps) {
  const renderDefault = () => (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6",
        className
      )}
    >
      {showImage && <SkeletonBase className="w-full h-48 mb-4" rounded="lg" />}

      <div className="space-y-3">
        <SkeletonBase className="h-6 w-3/4" />
        <SkeletonBase className="h-4 w-1/2" />

        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBase
            key={i}
            className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")}
          />
        ))}
      </div>

      {showActions && (
        <div className="flex justify-between items-center mt-6">
          <SkeletonBase className="h-6 w-16" />
          <SkeletonBase className="h-8 w-20" rounded="md" />
        </div>
      )}
    </div>
  );

  const renderCompact = () => (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-4",
        className
      )}
    >
      <div className="flex items-center space-x-3">
        {showImage && <SkeletonBase className="w-12 h-12" rounded="full" />}
        <div className="flex-1 space-y-2">
          <SkeletonBase className="h-4 w-3/4" />
          <SkeletonBase className="h-3 w-1/2" />
        </div>
        {showActions && <SkeletonBase className="h-8 w-8" rounded="md" />}
      </div>
    </div>
  );

  const renderDetailed = () => (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 overflow-hidden",
        className
      )}
    >
      {showImage && <SkeletonBase className="w-full h-64" rounded="none" />}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 space-y-2">
            <SkeletonBase className="h-7 w-4/5" />
            <SkeletonBase className="h-4 w-2/3" />
          </div>
          {showActions && (
            <SkeletonBase className="h-8 w-8 ml-4" rounded="md" />
          )}
        </div>

        <div className="space-y-3 mb-6">
          {Array.from({ length: lines + 1 }).map((_, i) => (
            <SkeletonBase
              key={i}
              className={cn("h-4", i === lines ? "w-1/2" : "w-full")}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <SkeletonBase className="h-5 w-12" />
            <SkeletonBase className="h-5 w-16" />
          </div>
          {showActions && (
            <div className="flex space-x-2">
              <SkeletonBase className="h-8 w-16" rounded="md" />
              <SkeletonBase className="h-8 w-20" rounded="md" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case "compact":
      return renderCompact();
    case "detailed":
      return renderDetailed();
    default:
      return renderDefault();
  }
}
