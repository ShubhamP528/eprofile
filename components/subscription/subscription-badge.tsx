"use client";

import Link from "next/link";
import { useSubscription } from "@/components/providers/subscription-provider";

export default function SubscriptionBadge({ className }: { className?: string }) {
  const { subscription, loading } = useSubscription();

  if (loading || !subscription) {
    return null;
  }

  const isPaidPlan =
    (subscription.plan === "STANDARD" || subscription.plan === "PRO") &&
    !subscription.isExpired;
  const isStandard =
    subscription.plan === "STANDARD" && !subscription.isExpired;
  const isPro = subscription.plan === "PRO" && !subscription.isExpired;

  return (
    <Link
      href="/dashboard/subscription"
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${isPaidPlan
          ? isPro
            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
            : "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        } ${className}`}
    >
      {isPro ? (
        <>
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Pro
        </>
      ) : isStandard ? (
        <>
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Standard
        </>
      ) : (
        "Free"
      )}
    </Link>
  );
}
