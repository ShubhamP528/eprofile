"use client";

import { cn } from "../../../lib/utils";
import { SkeletonBase } from "./skeleton-base";

interface SkeletonFormProps {
  fields?: number;
  showLabels?: boolean;
  showButtons?: boolean;
  variant?: "vertical" | "horizontal";
  className?: string;
}

export function SkeletonForm({
  fields = 4,
  showLabels = true,
  showButtons = true,
  variant = "vertical",
  className,
}: SkeletonFormProps) {
  const renderVerticalField = (index: number) => (
    <div key={index} className="space-y-2">
      {showLabels && <SkeletonBase className="h-4 w-24" />}
      <SkeletonBase className="h-10 w-full" rounded="md" />
    </div>
  );

  const renderHorizontalField = (index: number) => (
    <div key={index} className="flex items-center space-x-4">
      {showLabels && <SkeletonBase className="h-4 w-24 shrink-0" />}
      <SkeletonBase className="h-10 flex-1" rounded="md" />
    </div>
  );

  const renderTextArea = () => (
    <div className="space-y-2">
      {showLabels && <SkeletonBase className="h-4 w-32" />}
      <SkeletonBase className="h-24 w-full" rounded="md" />
    </div>
  );

  const renderSelectField = () => (
    <div className="space-y-2">
      {showLabels && <SkeletonBase className="h-4 w-20" />}
      <SkeletonBase className="h-10 w-full" rounded="md" />
    </div>
  );

  const renderCheckboxGroup = () => (
    <div className="space-y-3">
      {showLabels && <SkeletonBase className="h-4 w-28" />}
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <SkeletonBase className="w-4 h-4" rounded="sm" />
            <SkeletonBase className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6",
        className
      )}
    >
      <div className="space-y-6">
        {/* Form Title */}
        <div className="space-y-2">
          <SkeletonBase className="h-6 w-48" />
          <SkeletonBase className="h-4 w-64" />
        </div>

        {/* Form Fields */}
        <div
          className={cn("space-y-4", variant === "horizontal" && "space-y-6")}
        >
          {Array.from({ length: Math.max(1, fields - 2) }).map((_, index) =>
            variant === "horizontal"
              ? renderHorizontalField(index)
              : renderVerticalField(index)
          )}

          {/* Special field types */}
          {fields > 2 && renderSelectField()}
          {fields > 3 && renderTextArea()}
          {fields > 4 && renderCheckboxGroup()}
        </div>

        {/* Form Actions */}
        {showButtons && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <SkeletonBase className="h-10 w-20" rounded="md" />
            <div className="flex space-x-3">
              <SkeletonBase className="h-10 w-16" rounded="md" />
              <SkeletonBase className="h-10 w-24" rounded="md" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
