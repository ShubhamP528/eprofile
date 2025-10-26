"use client";

import { cn } from "../../../lib/utils";

interface SkeletonBaseProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  animate?: boolean;
}

export function SkeletonBase({
  className,
  width,
  height,
  rounded = "md",
  animate = true,
}: SkeletonBaseProps) {
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-200/80",
        roundedClasses[rounded],
        animate && "animate-pulse",
        className
      )}
      style={style}
    >
      {animate && (
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)",
          }}
        />
      )}
    </div>
  );
}
