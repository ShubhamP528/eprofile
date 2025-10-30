"use client";

import { useState } from "react";
import Link from "next/link";
import { useCards } from "@/hooks/use-cards";
import { SkeletonBase } from "@/components/ui/skeleton/skeleton-base";

export default function CardList() {
  const { cards, loading, error, deleteCard } = useCards();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteCard(id);
      if (!result.success) {
        alert(result.error || "Failed to delete card");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const copyCardUrl = (username: string) => {
    const url = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
    alert("Card URL copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="mobile-grid">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            {/* Header Skeleton */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <SkeletonBase className="h-5 w-32" />
                  <SkeletonBase className="h-6 w-16" rounded="full" />
                </div>
                <SkeletonBase className="h-4 w-24" />
              </div>
            </div>

            {/* Profile Section Skeleton */}
            <div className="flex items-center space-x-4 mb-6">
              <SkeletonBase className="w-16 h-16" rounded="lg" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <SkeletonBase className="h-3 w-16" />
                  <SkeletonBase className="h-6 w-20" rounded="md" />
                </div>
                <div className="flex items-center justify-between">
                  <SkeletonBase className="h-3 w-16" />
                  <SkeletonBase className="h-6 w-24" rounded="md" />
                </div>
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <SkeletonBase className="h-6 w-8 mx-auto mb-1" />
                <SkeletonBase className="h-3 w-10 mx-auto" />
              </div>
              <div className="text-center">
                <SkeletonBase className="h-6 w-8 mx-auto mb-1" />
                <SkeletonBase className="h-3 w-10 mx-auto" />
              </div>
              <div className="text-center">
                <SkeletonBase className="h-6 w-8 mx-auto mb-1" />
                <SkeletonBase className="h-3 w-10 mx-auto" />
              </div>
            </div>

            {/* Actions Skeleton */}
            <div className="flex space-x-2">
              <SkeletonBase className="h-10 flex-1" rounded="lg" />
              <SkeletonBase className="h-10 flex-1" rounded="lg" />
              <SkeletonBase className="h-10 w-10" rounded="lg" />
              <SkeletonBase className="h-10 w-10" rounded="lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md responsive-text-sm">
        {error}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2"
            />
          </svg>
        </div>
        <h3 className="responsive-text-lg font-semibold text-gray-900 mb-2">
          No cards yet
        </h3>
        <p className="responsive-text-sm text-gray-600 mb-6 px-4">
          Create your first eProfile to get started.
        </p>
        <Link
          href="/dashboard/cards/new"
          className="mobile-button bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-target inline-flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Your First Card
        </Link>
      </div>
    );
  }

  return (
    <div className="mobile-spacing">
      <div className="mobile-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-200 p-6 group"
          >
            {/* Card Header with Status Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-base truncate">
                    {card.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${
                      card.isPublic
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {card.isPublic ? "Public" : "Private"}
                  </span>
                </div>
                {card.subtitle && (
                  <p className="text-sm text-gray-600 truncate">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center border-2 border-white shadow-sm">
                  {card.profileImage ? (
                    <img
                      src={card.profileImage}
                      alt={card.title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Username
                    </span>
                    <span className="font-mono text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {card.username}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Template
                    </span>
                    <span className="text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded-md">
                      {card.template.replace("template", "Template ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Link
                href={`/${card.username}`}
                target="_blank"
                className="flex-1 bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-center group-hover:shadow-md"
              >
                View
              </Link>
              <Link
                href={`/dashboard/cards/${card.id}/edit`}
                className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-center"
              >
                Edit
              </Link>
              <button
                onClick={() => copyCardUrl(card.username)}
                className="bg-gray-100 text-gray-700 p-2.5 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors group"
                title="Copy URL"
              >
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(card.id, card.title)}
                disabled={deletingId === card.id}
                className="bg-red-50 text-red-600 p-2.5 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                title="Delete"
              >
                {deletingId === card.id ? (
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                ) : (
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
