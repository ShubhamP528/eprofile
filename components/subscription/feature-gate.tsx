"use client";

import Link from "next/link";
import { useSubscription } from "@/components/providers/subscription-provider";

interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function FeatureGate({
  feature,
  children,
  fallback,
}: FeatureGateProps) {
  const { subscription, loading } = useSubscription();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 sm:w-1/4 mb-4"></div>
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 sm:w-1/2"></div>
        </div>
      </div>
    );
  }

  const isPro = subscription?.plan === "PRO" && !subscription?.isExpired;

  // Define which features require Pro
  const proFeatures = [
    "services",
    "gallery",
    "testimonials",
    "payments",
    "customDomain",
  ];
  const requiresPro = proFeatures.includes(feature);

  if (requiresPro && !isPro) {
    return (
      fallback || (
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600"
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
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              Pro Feature
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
              {getFeatureDescription(feature)} is available with Pro plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard/subscription"
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
              >
                Upgrade to Pro
              </Link>
              <Link
                href="/pricing"
                className="border border-gray-300 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}

function getFeatureDescription(feature: string): string {
  switch (feature) {
    case "services":
      return "Services showcase";
    case "gallery":
      return "Portfolio gallery";
    case "testimonials":
      return "Customer testimonials";
    case "payments":
      return "Payment integration";
    case "customDomain":
      return "Custom domain";
    default:
      return "This feature";
  }
}
