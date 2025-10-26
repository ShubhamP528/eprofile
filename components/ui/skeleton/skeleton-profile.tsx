"use client";

import { cn } from "../../../lib/utils";
import { SkeletonBase } from "./skeleton-base";

interface SkeletonProfileProps {
  variant?: "compact" | "detailed" | "card";
  showAvatar?: boolean;
  showStats?: boolean;
  showBio?: boolean;
  className?: string;
}

export function SkeletonProfile({
  variant = "compact",
  showAvatar = true,
  showStats = true,
  showBio = true,
  className,
}: SkeletonProfileProps) {
  const renderCompact = () => (
    <div
      className={cn(
        "flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200",
        className
      )}
    >
      {showAvatar && <SkeletonBase className="w-12 h-12" rounded="full" />}
      <div className="flex-1 space-y-2">
        <SkeletonBase className="h-5 w-32" />
        <SkeletonBase className="h-4 w-24" />
      </div>
      <SkeletonBase className="h-8 w-20" rounded="md" />
    </div>
  );

  const renderDetailed = () => (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6",
        className
      )}
    >
      <div className="flex items-start space-x-6 mb-6">
        {showAvatar && <SkeletonBase className="w-20 h-20" rounded="full" />}
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <SkeletonBase className="h-6 w-40" />
            <SkeletonBase className="h-4 w-32" />
            <SkeletonBase className="h-4 w-48" />
          </div>

          {showBio && (
            <div className="space-y-2">
              <SkeletonBase className="h-4 w-full" />
              <SkeletonBase className="h-4 w-5/6" />
              <SkeletonBase className="h-4 w-3/4" />
            </div>
          )}
        </div>
      </div>

      {showStats && (
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <SkeletonBase className="h-6 w-12 mx-auto" />
              <SkeletonBase className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCard = () => (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 overflow-hidden",
        className
      )}
    >
      {/* Cover Image */}
      <SkeletonBase className="w-full h-32" rounded="none" />

      <div className="p-6">
        {/* Profile Info */}
        <div className="flex items-start space-x-4 -mt-12 mb-4">
          {showAvatar && (
            <SkeletonBase
              className="w-16 h-16 border-4 border-white"
              rounded="full"
            />
          )}
          <div className="flex-1 mt-8 space-y-2">
            <SkeletonBase className="h-6 w-36" />
            <SkeletonBase className="h-4 w-28" />
          </div>
          <SkeletonBase className="h-8 w-20 mt-8" rounded="md" />
        </div>

        {showBio && (
          <div className="space-y-2 mb-4">
            <SkeletonBase className="h-4 w-full" />
            <SkeletonBase className="h-4 w-4/5" />
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3">
            <SkeletonBase className="w-4 h-4" />
            <SkeletonBase className="h-4 w-32" />
          </div>
          <div className="flex items-center space-x-3">
            <SkeletonBase className="w-4 h-4" />
            <SkeletonBase className="h-4 w-40" />
          </div>
        </div>

        {showStats && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <SkeletonBase className="h-5 w-8" />
                <SkeletonBase className="h-3 w-16" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  switch (variant) {
    case "detailed":
      return renderDetailed();
    case "card":
      return renderCard();
    default:
      return renderCompact();
  }
}
