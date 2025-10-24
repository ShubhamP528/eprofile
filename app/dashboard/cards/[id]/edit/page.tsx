"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import CardForm from "@/components/cards/card-form";
import { useCards } from "@/hooks/use-cards";
import { apiClient } from "@/lib/api-client";

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
      <div className="flex items-center justify-center py-8 sm:py-12 mobile-container">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="responsive-text-sm text-gray-600">Loading card...</p>
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
