"use client";

import { useState } from "react";
import Link from "next/link";
import { useCards } from "@/hooks/use-cards";

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
      <div className="flex items-center justify-center py-8 sm:py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 responsive-text-sm text-gray-600">
            Loading your cards...
          </p>
        </div>
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
          Create your first digital visiting card to get started.
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
            className="mobile-card bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            {/* Card Preview */}
            <div className="text-center mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                {card.profileImage ? (
                  <img
                    src={card.profileImage}
                    alt={card.title}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
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
              <h3 className="responsive-text-sm font-semibold text-gray-900 truncate">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="responsive-text-xs text-gray-600 truncate">
                  {card.subtitle}
                </p>
              )}
            </div>

            {/* Card Info */}
            <div className="space-y-2 responsive-text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Username:</span>
                <span className="font-mono text-blue-600 truncate ml-2">
                  {card.username}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${
                    card.isPublic
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {card.isPublic ? "Public" : "Private"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Template:</span>
                <span className="capitalize text-gray-950 truncate ml-2">
                  {card.template.replace("template", "Template ")}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:flex sm:space-x-2">
              <Link
                href={`/${card.username}`}
                target="_blank"
                className="mobile-button bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-target flex-1 text-center"
              >
                View
              </Link>
              <Link
                href={`/dashboard/cards/${card.id}/edit`}
                className="mobile-button bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 touch-target flex-1 text-center"
              >
                Edit
              </Link>
              <div className="flex space-x-2 sm:space-x-0">
                <button
                  onClick={() => copyCardUrl(card.username)}
                  className="mobile-button bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 touch-target flex-1 sm:flex-none sm:px-3"
                  title="Copy URL"
                >
                  <svg
                    className="w-4 h-4 mx-auto"
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
                  className="mobile-button bg-red-100 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 touch-target flex-1 sm:flex-none sm:px-3"
                  title="Delete"
                >
                  {deletingId === card.id ? (
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent mx-auto"></div>
                  ) : (
                    <svg
                      className="w-4 h-4 mx-auto"
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
          </div>
        ))}
      </div>
    </div>
  );
}
