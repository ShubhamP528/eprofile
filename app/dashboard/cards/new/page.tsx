"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import CardForm from "@/components/cards/card-form";
import { useCards } from "@/hooks/use-cards";
import { useSubscription } from "@/components/providers/subscription-provider";
import { apiClient } from "@/lib/api-client";

export default function NewCardPage() {
  const router = useRouter();
  const { createCard, cards } = useCards();
  const { subscription } = useSubscription();
  const [cardLimitInfo, setCardLimitInfo] = useState<{
    canCreate: boolean;
    currentCount: number;
    maxCards: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCardLimit = async () => {
      try {
        const response = await apiClient.checkCardLimit();
        if (response.success) {
          setCardLimitInfo(response.data as any);
        }
      } catch (error) {
        console.error("Failed to check card limit:", error);
      } finally {
        setLoading(false);
      }
    };

    checkCardLimit();
  }, []);

  const handleSubmit = async (data: any) => {
    const result = await createCard(data);

    if (result.success) {
      router.push("/dashboard");
    }

    return result;
  };

  const isPro = subscription?.plan === "PRO" && !subscription?.isExpired;

  if (loading) {
    return (
      <div className="mobile-container mobile-spacing">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (cardLimitInfo && !cardLimitInfo.canCreate) {
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
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Card Limit Reached
          </h3>
          <p className="text-gray-600 mb-4">
            You have reached your card limit ({cardLimitInfo.currentCount}/
            {cardLimitInfo.maxCards} cards).
            {!isPro && " Upgrade to Pro for unlimited cards."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!isPro && (
              <Link
                href="/dashboard/subscription"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Upgrade to Pro
              </Link>
            )}
            <Link
              href="/dashboard"
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
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
        <h1 className="responsive-text-2xl font-bold text-gray-900">
          Create New Card
        </h1>
      </div>

      {/* Card Limit Info */}
      {cardLimitInfo && !isPro && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-yellow-800">
              You're using {cardLimitInfo.currentCount} of{" "}
              {cardLimitInfo.maxCards} cards on the Free plan.
              <Link
                href="/dashboard/subscription"
                className="font-medium underline ml-1"
              >
                Upgrade to Pro for unlimited cards
              </Link>
            </p>
          </div>
        </div>
      )}

      <CardForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard")}
      />
    </div>
  );
}
