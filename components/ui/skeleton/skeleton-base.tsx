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
        "relative overflow-hidden bg-slate-100",
        roundedClasses[rounded],
        className
      )}
      style={style}
    >
      {animate && (
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      )}
    </div>
  );
}
