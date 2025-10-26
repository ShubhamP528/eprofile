"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import CardForm from "@/components/cards/card-form";
import { useCards } from "@/hooks/use-cards";
import { apiClient } from "@/lib/api-client";
import { SkeletonBase } from "@/components/ui/skeleton/skeleton-base";

interface EditCardPageProps {
  params: Promise<{ id: string }>;
}

export default function EditCardPage({ params }: EditCardPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { updateCard } = useCards();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getCard(resolvedParams.id);

        if (response.success) {
          setCard(response.data);
        } else {
          setError(response.error?.message || "Failed to load card");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [resolvedParams.id]);

  const handleSubmit = async (data: any) => {
    const result = await updateCard(resolvedParams.id, data);

    if (result.success) {
      router.push("/dashboard");
    }

    return result;
  };

  if (loading) {
    return (
      <div className="mobile-container mobile-spacing">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <SkeletonBase width="8rem" height="1.5rem" />
          <SkeletonBase width="12rem" height="2rem" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Form Skeleton */}
            <div className="space-y-6">
              <SkeletonBase width="16rem" height="2rem" className="mb-6" />

              {/* Basic Information Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <SkeletonBase width="10rem" height="1.5rem" className="mb-4" />
                <div className="space-y-4">
                  <div>
                    <SkeletonBase width="5rem" height="1rem" className="mb-2" />
                    <SkeletonBase width="100%" height="2.5rem" />
                  </div>
                  <div>
                    <SkeletonBase width="8rem" height="1rem" className="mb-2" />
                    <SkeletonBase width="100%" height="2.5rem" />
                  </div>
                  <div>
                    <SkeletonBase width="7rem" height="1rem" className="mb-2" />
                    <SkeletonBase width="100%" height="2.5rem" />
                  </div>
                  <div>
                    <SkeletonBase width="5rem" height="1rem" className="mb-2" />
                    <SkeletonBase width="100%" height="6rem" />
                  </div>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <SkeletonBase width="11rem" height="1.5rem" className="mb-4" />
                <div className="space-y-4">
                  <div>
                    <SkeletonBase width="7rem" height="1rem" className="mb-2" />
                    <SkeletonBase width="100%" height="2.5rem" />
                  </div>
                  <div>
                    <SkeletonBase width="6rem" height="1rem" className="mb-2" />
                    <SkeletonBase width="100%" height="2.5rem" />
                  </div>
                  <div>
                    <SkeletonBase width="4rem" height="1rem" className="mb-2" />
                    <SkeletonBase width="100%" height="2.5rem" />
                  </div>
                </div>
              </div>

              {/* Template Selection Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <SkeletonBase width="9rem" height="1.5rem" className="mb-4" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonBase key={i} className="aspect-3/4" rounded="md" />
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Skeleton */}
            <div className="lg:sticky lg:top-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <SkeletonBase width="7rem" height="1.5rem" className="mb-4" />
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <SkeletonBase className="w-full aspect-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mobile-container mobile-spacing">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-gray-900 flex items-center touch-target self-start"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="responsive-text-2xl font-bold text-gray-900">
            Edit Card
          </h1>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md responsive-text-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!card) {
    return null;
  }

  return (
    <div className="mobile-container mobile-spacing">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <Link
          href="/dashboard"
          className="text-gray-600 hover:text-gray-900 flex items-center touch-target self-start"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="responsive-text-2xl font-bold text-gray-900 truncate">
          Edit Card: {card.title}
        </h1>
      </div>
      <CardForm
        initialData={card}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard")}
        isEditing={true}
      />
    </div>
  );
}
