"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CardList from "@/components/cards/card-list";
import { useSubscription } from "@/components/providers/subscription-provider";
import { apiClient } from "@/lib/api-client";

export default function DashboardPage() {
  const { subscription } = useSubscription();
  const [cardLimitInfo, setCardLimitInfo] = useState<{
    canCreate: boolean;
    currentCount: number;
    maxCards: number;
  } | null>(null);

  useEffect(() => {
    const checkCardLimit = async () => {
      try {
        const response = await apiClient.checkCardLimit();
        if (response.success) {
          setCardLimitInfo(response.data as any);
        }
      } catch (error) {
        console.error("Failed to check card limit:", error);
      }
    };

    checkCardLimit();
  }, []);

  const isPro = subscription?.plan === "PRO" && !subscription?.isExpired;

  return (
    <div className="mobile-spacing">
      <div className="text-center sm:text-left mb-6 sm:mb-8">
        <h1 className="responsive-text-2xl font-bold text-gray-900">
          My Cards
        </h1>
        <p className="mt-2 responsive-text-sm text-gray-600">
          Manage your digital visiting cards
        </p>
      </div>

      {/* Subscription Status */}
      {!isPro && cardLimitInfo && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <div>
              <h3 className="font-semibold text-blue-900 text-sm sm:text-base">
                Free Plan - {cardLimitInfo.currentCount}/
                {cardLimitInfo.maxCards} cards used
              </h3>
              <p className="text-xs sm:text-sm text-blue-700 mt-1">
                Upgrade to Pro for unlimited cards and premium features
              </p>
            </div>
            <Link
              href="/dashboard/subscription"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      )}

      {/* Quick Action Button */}
      <div className="mb-6 sm:mb-8">
        {cardLimitInfo?.canCreate ? (
          <Link
            href="/dashboard/cards/new"
            className="mobile-button bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors touch-target font-medium inline-flex items-center justify-center w-full sm:w-auto"
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
            Create New Card
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled
              className="mobile-button bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium inline-flex items-center justify-center w-full sm:w-auto"
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Card Limit Reached
            </button>
            {!isPro && (
              <Link
                href="/dashboard/subscription"
                className="mobile-button bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors touch-target font-medium inline-flex items-center justify-center w-full sm:w-auto"
              >
                Upgrade to Pro
              </Link>
            )}
          </div>
        )}
      </div>

      <CardList />
    </div>
  );
}
