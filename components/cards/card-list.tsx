"use client";

import { useState } from "react";
import Link from "next/link";
import { useCards } from "@/hooks/use-cards";
import { SkeletonBase } from "@/components/ui/skeleton/skeleton-base";
import {
  ExternalLink,
  Edit,
  Trash2,
  Copy,
  User,
  Layout,
  MoreHorizontal,
  Share2
} from "lucide-react";
import Image from "next/image";

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            {/* Header Skeleton */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <SkeletonBase className="w-14 h-14" rounded="lg" />
                <div>
                  <SkeletonBase className="h-5 w-32 mb-2" />
                  <SkeletonBase className="h-4 w-24" />
                </div>
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <SkeletonBase className="h-16 rounded-xl" />
              <SkeletonBase className="h-16 rounded-xl" />
            </div>

            {/* Actions Skeleton */}
            <div className="flex space-x-2">
              <SkeletonBase className="h-10 flex-1" rounded="lg" />
              <SkeletonBase className="h-10 flex-1" rounded="lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl responsive-text-sm">
        {error}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <Layout className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No cards created yet
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Create your first digital visiting card to start sharing your professional identity.
        </p>
        <Link
          href="/dashboard/cards/new"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          Create First Card
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group flex flex-col h-full relative"
        >
          {/* Status Badge - Absolute */}
          <div className="absolute top-6 right-6 z-10">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${card.isPublic
                ? "bg-green-50 text-green-700 ring-green-600/20"
                : "bg-gray-50 text-gray-600 ring-gray-500/10"
                }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${card.isPublic ? "bg-green-600" : "bg-gray-500"}`}></span>
              {card.isPublic ? "Public" : "Private"}
            </span>
          </div>

          {/* Header Section */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shadow-xs bg-gray-50">
                {card.profileImage ? (
                  <img
                    src={card.profileImage}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-500">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>
            <div className="min-w-0 flex-1 pr-16">
              <h3 className="font-bold text-gray-900 text-lg truncate" title={card.title}>
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 truncate" title={card.subtitle || "No designation"}>
                {card.subtitle || "No designation"}
              </p>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50/50 rounded-xl p-3 border border-gray-100/50">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1">Username</span>
              <span className="text-sm font-medium text-gray-700 block truncate font-mono">
                @{card.username}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-1">Template</span>
              <span className="text-sm font-medium text-gray-700 block truncate capitalize">
                {card.template.replace(/[^a-zA-Z0-9]/g, " ")}
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-3">
            <Link
              href={`/${card.username}`}
              target="_blank"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow group/btn"
            >
              <ExternalLink className="w-4 h-4 mr-2 opacity-90 group-hover/btn:scale-110 transition-transform" />
              View
            </Link>

            <Link
              href={`/dashboard/cards/${card.id}/edit`}
              className="inline-flex items-center justify-center p-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              title="Edit Card"
            >
              <Edit className="w-4 h-4" />
            </Link>

            <button
              onClick={() => copyCardUrl(card.username)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              title="Copy Link"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleDelete(card.id, card.title)}
              disabled={deletingId === card.id}
              className="inline-flex items-center justify-center p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Delete Card"
            >
              {deletingId === card.id ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
