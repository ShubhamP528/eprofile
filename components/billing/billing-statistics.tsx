"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface BillingStatistics {
  totalSpent: number;
  totalPayments: number;
  averagePayment: number;
  subscriptionDuration: number; // in days
  planBreakdown: {
    [plan: string]: {
      count: number;
      totalAmount: number;
    };
  };
  monthlySpending: Array<{
    month: string;
    amount: number;
    payments: number;
  }>;
  subscriptionTimeline: Array<{
    id: string;
    eventType: string;
    fromPlan?: string;
    toPlan: string;
    description?: string;
    createdAt: string;
  }>;
}

interface BillingStatisticsProps {
  statistics: BillingStatistics | null;
  loading: boolean;
}

export default function BillingStatistics({
  statistics,
  loading,
}: BillingStatisticsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Summary Cards Skeleton */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border p-4 sm:p-6"
          >
            <div className="flex items-center">
              <Skeleton className="w-10 h-10 shrink-0 rounded-lg" />
              <div className="ml-3 sm:ml-4 min-w-0 flex-1 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100).toFixed(2)}`;
  };

  const formatDuration = (days: number) => {
    if (days < 30) {
      return `${days} days`;
    } else if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} month${months > 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(days / 365);
      const remainingMonths = Math.floor((days % 365) / 30);
      return `${years} year${years > 1 ? "s" : ""}${
        remainingMonths > 0
          ? ` ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
          : ""
      }`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Spent */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Spent
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {formatCurrency(statistics.totalSpent)}
              </p>
            </div>
          </div>
        </div>

        {/* Total Payments */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Payments
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {statistics.totalPayments}
              </p>
            </div>
          </div>
        </div>

        {/* Average Payment */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Average Payment
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {formatCurrency(statistics.averagePayment)}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Duration */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Member Since
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {formatDuration(statistics.subscriptionDuration)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Plan Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Plan Breakdown
          </h3>
          <div className="space-y-4">
            {Object.entries(statistics.planBreakdown).map(([plan, data]) => {
              const planName = plan === "PRO" ? "Pro Plan" : "Standard Plan";
              const percentage =
                statistics.totalSpent > 0
                  ? (data.totalAmount / statistics.totalSpent) * 100
                  : 0;

              return (
                <div key={plan}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          plan === "PRO" ? "bg-blue-500" : "bg-purple-500"
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {planName}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(data.totalAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {data.count} payment{data.count !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        plan === "PRO" ? "bg-blue-500" : "bg-purple-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {Object.keys(statistics.planBreakdown).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-sm">No payment data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Spending Trend */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Spending
          </h3>
          <div className="space-y-3">
            {statistics.monthlySpending
              .filter((month) => month.amount > 0)
              .slice(-6) // Show last 6 months with spending
              .map((month, index) => {
                const maxAmount = Math.max(
                  ...statistics.monthlySpending.map((m) => m.amount)
                );
                const percentage =
                  maxAmount > 0 ? (month.amount / maxAmount) * 100 : 0;

                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {month.month}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(month.amount)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {month.payments} payment
                          {month.payments !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}

            {statistics.monthlySpending.filter((m) => m.amount > 0).length ===
              0 && (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <p className="text-sm">No monthly spending data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
