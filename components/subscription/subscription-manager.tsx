"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useSubscription } from "@/components/providers/subscription-provider";
import RazorpayCheckout from "@/components/payments/razorpay-checkout";

export default function SubscriptionManager() {
  const {
    subscription,
    loading,
    error: contextError,
    refreshSubscription,
    updateSubscription,
  } = useSubscription();
  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use context error if no local error
  const displayError = error || contextError;

  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      updateSubscription(paymentData);
      await refreshSubscription(); // Refresh the context
      alert("Payment successful! Your Pro subscription has been activated.");
    } catch (err) {
      setError("Failed to update subscription after payment");
    }
  };

  const handlePaymentError = (error: string) => {
    setError(error);
  };

  const handleDowngrade = async () => {
    if (
      !confirm(
        "Are you sure you want to downgrade to the Free plan? You will lose access to Pro features."
      )
    ) {
      return;
    }

    setUpgrading(true);
    setError(null);

    try {
      const response = await apiClient.updateSubscription("FREE");

      if (response.success) {
        updateSubscription(response.data as any);
        await refreshSubscription(); // Refresh the context
        alert("Successfully downgraded to Free plan");
      } else {
        setError(
          typeof response.error === "string"
            ? response.error
            : "Failed to downgrade subscription"
        );
      }
    } catch (err) {
      setError("Failed to downgrade subscription");
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 sm:w-1/4 mb-4"></div>
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 sm:w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full sm:w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 sm:w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        Failed to load subscription information
      </div>
    );
  }

  const isPro = subscription.plan === "PRO" && !subscription.isExpired;
  const expiryDate = subscription.expiry ? new Date(subscription.expiry) : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Subscription Plan
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage your ProCard subscription
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isPro ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {subscription.plan} Plan
          </div>
          <button
            onClick={refreshSubscription}
            disabled={loading}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Refresh subscription status"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {displayError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-md mb-4 text-sm">
          {displayError}
        </div>
      )}

      <div className="space-y-4">
        {isPro ? (
          <div>
            <div className="flex items-center mb-4">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-700 font-medium">
                Pro Plan Active
              </span>
            </div>

            {expiryDate && (
              <p className="text-sm text-gray-600 mb-4">
                Your Pro subscription expires on{" "}
                {expiryDate.toLocaleDateString()}
              </p>
            )}

            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4">
              <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                Pro Features Unlocked:
              </h4>
              <ul className="text-xs sm:text-sm text-blue-800 space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
                <li>• Unlimited digital cards</li>
                <li>• All premium templates</li>
                <li>• Services showcase</li>
                <li>• Portfolio gallery</li>
                <li>• Payment integration</li>
                <li>• Advanced analytics</li>
                <li>• Custom domain support</li>
                <li>• Priority support</li>
              </ul>
            </div>

            <button
              onClick={handleDowngrade}
              disabled={upgrading}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base font-medium"
            >
              {upgrading ? "Processing..." : "Downgrade to Free"}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-4">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700 font-medium">Free Plan</span>
            </div>

            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg mb-4">
              <h4 className="font-medium text-yellow-900 mb-2 text-sm sm:text-base">
                Upgrade to Pro to unlock:
              </h4>
              <ul className="text-xs sm:text-sm text-yellow-800 space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
                <li>• Unlimited digital cards</li>
                <li>• Premium templates</li>
                <li>• Services & portfolio showcase</li>
                <li>• Payment integration</li>
                <li>• Advanced analytics</li>
                <li>• Custom domain support</li>
                <li>• Remove ProCard branding</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Pro Plan
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    ₹299 per month
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    ₹299
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">/month</p>
                </div>
              </div>
            </div>

            <RazorpayCheckout
              plan="PRO"
              amount={29900}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            >
              <div className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium text-center text-sm sm:text-base">
                <span className="hidden sm:inline">
                  Upgrade to Pro - ₹299/month
                </span>
                <span className="sm:hidden">Upgrade to Pro</span>
              </div>
            </RazorpayCheckout>

            <p className="text-xs text-gray-500 text-center mt-2">
              14-day free trial • Cancel anytime • Secure payment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
