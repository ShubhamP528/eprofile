"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CardList from "@/components/cards/card-list";
import { useSubscription } from "@/components/providers/subscription-provider";
import { apiClient } from "@/lib/api-client";
import { SkeletonBase } from "@/components/ui/skeleton/skeleton-base";
import { Plus, CreditCard, Layers } from "lucide-react";

export default function DashboardPage() {
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

  const isPro = subscription?.plan === "PRO" && !subscription?.isExpired;

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <SkeletonBase className="h-10 w-48 mb-2" />
            <SkeletonBase className="h-5 w-64" />
          </div>
          <SkeletonBase className="h-12 w-40 rounded-xl" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonBase className="h-32 rounded-2xl" />
          <SkeletonBase className="h-32 rounded-2xl" />
          <SkeletonBase className="h-32 rounded-2xl" />
        </div>

        {/* Card List Skeleton - will be handled by CardList component */}
        <CardList />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            My Cards
          </h1>
          <p className="mt-2 text-gray-500">
            Manage your digital business cards and track their performance.
          </p>
        </div>

        {/* Quick Action Button */}
        <div>
          {cardLimitInfo?.canCreate ? (
            <Link
              href="/dashboard/cards/new"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Card
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                Limit Reached
              </span>
              {!isPro && (
                <Link
                  href="/dashboard/subscription"
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all"
                >
                  Upgrade to Pro
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats / Limit Overview */}
      {cardLimitInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Cards Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CreditCard className="w-16 h-16 text-blue-600" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Cards</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {cardLimitInfo.currentCount}
                  <span className="text-gray-400 text-lg font-normal">
                    /{cardLimitInfo.maxCards === -1 ? "∞" : cardLimitInfo.maxCards}
                  </span>
                </h3>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 pt-4 border-t border-gray-50">
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((cardLimitInfo.currentCount / (cardLimitInfo.maxCards === -1 ? 100 : cardLimitInfo.maxCards)) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {cardLimitInfo.maxCards === -1
                  ? "Unlimited cards available"
                  : `${cardLimitInfo.maxCards - cardLimitInfo.currentCount} cards remaining`
                }
              </p>
            </div>
          </div>

          {/* Subscription Status Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layers className="w-16 h-16 text-indigo-600" />
            </div>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${isPro ? "bg-indigo-50 text-indigo-600" : "bg-gray-50 text-gray-600"}`}>
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Plan</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {isPro ? "Pro Plan" : "Free Plan"}
                </h3>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
              {!isPro ? (
                <Link href="/dashboard/subscription" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                  Upgrade to unlock more features
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ) : (
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active subscription
                </p>
              )}
            </div>
          </div>

          {/* Quick Tip or Feature Highlight (Optional placeholder) */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-1">Boost Your Reach</h3>
              <p className="text-gray-300 text-sm mb-4">Share your card on social media to get more leads.</p>
              <button className="text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors border border-white/10">
                View Tips
              </button>
            </div>
            {/* Decorative circle */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="mt-8">
        <CardList />
      </div>
    </div>
  );
}
