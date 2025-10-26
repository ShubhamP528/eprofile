"use client";

import { cn } from "../../../lib/utils";
import { SkeletonBase } from "./skeleton-base";

interface SkeletonListProps {
  items?: number;
  variant?: "simple" | "detailed" | "table";
  showAvatar?: boolean;
  showActions?: boolean;
  className?: string;
}

export function SkeletonList({
  items = 5,
  variant = "simple",
  showAvatar = true,
  showActions = true,
  className,
}: SkeletonListProps) {
  const renderSimpleItem = (index: number) => (
    <div
      key={index}
      className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200"
    >
      {showAvatar && <SkeletonBase className="w-10 h-10" rounded="full" />}
      <div className="flex-1 space-y-2">
        <SkeletonBase className="h-4 w-2/3" />
        <SkeletonBase className="h-3 w-1/3" />
      </div>
      {showActions && <SkeletonBase className="h-8 w-20" rounded="md" />}
    </div>
  );

  const renderDetailedItem = (index: number) => (
    <div
      key={index}
      className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-gray-200"
    >
      {showAvatar && <SkeletonBase className="w-12 h-12" rounded="full" />}
      <div className="flex-1 space-y-3">
        <div className="space-y-2">
          <SkeletonBase className="h-5 w-3/4" />
          <SkeletonBase className="h-4 w-1/2" />
        </div>
        <div className="space-y-2">
          <SkeletonBase className="h-3 w-full" />
          <SkeletonBase className="h-3 w-4/5" />
        </div>
        <div className="flex items-center space-x-4">
          <SkeletonBase className="h-4 w-16" />
          <SkeletonBase className="h-4 w-20" />
        </div>
      </div>
      {showActions && (
        <div className="flex space-x-2">
          <SkeletonBase className="h-8 w-8" rounded="md" />
          <SkeletonBase className="h-8 w-8" rounded="md" />
        </div>
      )}
    </div>
  );

  const renderTableRow = (index: number) => (
    <tr key={index} className="border-b border-gray-200">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          {showAvatar && <SkeletonBase className="w-8 h-8" rounded="full" />}
          <SkeletonBase className="h-4 w-24" />
        </div>
      </td>
      <td className="px-6 py-4">
        <SkeletonBase className="h-4 w-32" />
      </td>
      <td className="px-6 py-4">
        <SkeletonBase className="h-4 w-20" />
      </td>
      <td className="px-6 py-4">
        <SkeletonBase className="h-6 w-16" rounded="full" />
      </td>
      {showActions && (
        <td className="px-6 py-4">
          <div className="flex space-x-2">
            <SkeletonBase className="h-8 w-8" rounded="md" />
            <SkeletonBase className="h-8 w-8" rounded="md" />
          </div>
        </td>
      )}
    </tr>
  );

  if (variant === "table") {
    return (
      <div
        className={cn(
          "bg-white rounded-lg border border-gray-200 overflow-hidden",
          className
        )}
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <SkeletonBase className="h-4 w-16" />
              </th>
              <th className="px-6 py-3 text-left">
                <SkeletonBase className="h-4 w-20" />
              </th>
              <th className="px-6 py-3 text-left">
                <SkeletonBase className="h-4 w-16" />
              </th>
              <th className="px-6 py-3 text-left">
                <SkeletonBase className="h-4 w-12" />
              </th>
              {showActions && (
                <th className="px-6 py-3 text-left">
                  <SkeletonBase className="h-4 w-16" />
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: items }).map((_, index) =>
              renderTableRow(index)
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, index) =>
        variant === "detailed"
          ? renderDetailedItem(index)
          : renderSimpleItem(index)
      )}
    </div>
  );
}
