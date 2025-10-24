"use client";

import { useState, useEffect } from "react";
import { useCards } from "@/hooks/use-cards";
import { apiClient } from "@/lib/api-client";

interface AnalyticsData {
  summary: {
    totalViews: number;
    totalLeads: number;
    totalButtonClicks: number;
    conversionRate: number;
  };
  viewsOverTime: Array<{ date: string; views: number }>;
  buttonClicks: Array<{ buttonType: string; clicks: number }>;
  topReferrers: Array<{ referrer: string; views: number }>;
  recentLeads: Array<{
    id: string;
    name: string;
    email?: string;
    phone?: string;
    createdAt: string;
  }>;
}

export default function AnalyticsPage() {
  const { cards } = useCards();
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState(30);

  // Set default card when cards load
  useEffect(() => {
    if (cards.length > 0 && !selectedCardId) {
      setSelectedCardId(cards[0].id);
    }
  }, [cards, selectedCardId]);

  // Load analytics when card or date range changes
  useEffect(() => {
    if (selectedCardId) {
      loadAnalytics();
    }
  }, [selectedCardId, dateRange]);

  const loadAnalytics = async () => {
    if (!selectedCardId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getAnalytics(selectedCardId, dateRange);
      if (response.success) {
        setAnalytics(response.data as AnalyticsData);
      } else {
        setError(
          typeof response.error === "string"
            ? response.error
            : "Failed to load analytics"
        );
      }
    } catch (err) {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const selectedCard = cards.find((card) => card.id === selectedCardId);

  if (cards.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 mobile-container">
        <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400"
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
        </div>
        <h3 className="responsive-text-lg font-semibold text-gray-900 mb-2">
          No cards to analyze
        </h3>
        <p className="responsive-text-sm text-gray-600 mb-6 px-4">
          Create your first digital visiting card to start tracking analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="mobile-spacing">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="responsive-text-2xl font-bold text-gray-900">
            Analytics
          </h1>
          <p className="responsive-text-sm text-gray-600">
            Track your card performance and visitor engagement
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Card Selector */}
          <select
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
            className="mobile-form-input"
          >
            {cards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.title} (@{card.username})
              </option>
            ))}
          </select>

          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value))}
            className="mobile-form-input"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 responsive-text-sm text-gray-600">
              Loading analytics...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md responsive-text-sm">
          {error}
        </div>
      )}

      {analytics && !loading && (
        <>
          {/* Summary Cards */}
          <div className="mobile-grid">
            <div className="mobile-card bg-white rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="responsive-text-xs font-medium text-gray-600">
                    Total Views
                  </p>
                  <p className="responsive-text-xl font-bold text-gray-900">
                    {analytics.summary.totalViews.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mobile-card bg-white rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="responsive-text-xs font-medium text-gray-600">
                    Total Leads
                  </p>
                  <p className="responsive-text-xl font-bold text-gray-900">
                    {analytics.summary.totalLeads.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mobile-card bg-white rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
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
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="responsive-text-xs font-medium text-gray-600">
                    Button Clicks
                  </p>
                  <p className="responsive-text-xl font-bold text-gray-900">
                    {analytics.summary.totalButtonClicks.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mobile-card bg-white rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="responsive-text-xs font-medium text-gray-600">
                    Conversion Rate
                  </p>
                  <p className="responsive-text-xl font-bold text-gray-900">
                    {analytics.summary.conversionRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Views Over Time */}
            <div className="mobile-card bg-white rounded-lg shadow-sm border">
              <h3 className="responsive-text-lg font-semibold text-gray-900 mb-4">
                Views Over Time
              </h3>
              <div className="h-64 flex items-end justify-between space-x-1">
                {analytics.viewsOverTime.map((item, index) => {
                  const maxViews = Math.max(
                    ...analytics.viewsOverTime.map((d) => d.views)
                  );
                  const height =
                    maxViews > 0 ? (item.views / maxViews) * 100 : 0;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t min-h-[4px]"
                        style={{ height: `${height}%` }}
                        title={`${item.views} views on ${new Date(
                          item.date
                        ).toLocaleDateString()}`}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Button Clicks */}
            <div className="mobile-card bg-white rounded-lg shadow-sm border">
              <h3 className="responsive-text-lg font-semibold text-gray-900 mb-4">
                Button Clicks
              </h3>
              <div className="space-y-3">
                {analytics.buttonClicks.map((item, index) => {
                  const maxClicks = Math.max(
                    ...analytics.buttonClicks.map((d) => d.clicks)
                  );
                  const percentage =
                    maxClicks > 0 ? (item.clicks / maxClicks) * 100 : 0;
                  return (
                    <div key={index}>
                      <div className="flex justify-between responsive-text-sm mb-1">
                        <span className="capitalize text-gray-700">
                          {item.buttonType.toLowerCase()}
                        </span>
                        <span className="font-medium text-gray-900">
                          {item.clicks}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Top Referrers */}
            <div className="mobile-card bg-white rounded-lg shadow-sm border">
              <h3 className="responsive-text-lg font-semibold text-gray-900 mb-4">
                Top Referrers
              </h3>
              <div className="space-y-3">
                {analytics.topReferrers.length > 0 ? (
                  analytics.topReferrers.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="responsive-text-sm text-gray-700 truncate">
                        {item.referrer || "Direct"}
                      </span>
                      <span className="responsive-text-sm font-medium text-gray-900 flex-shrink-0 ml-2">
                        {item.views} views
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 responsive-text-sm">
                    No referrer data yet
                  </p>
                )}
              </div>
            </div>

            {/* Recent Leads */}
            <div className="mobile-card bg-white rounded-lg shadow-sm border">
              <h3 className="responsive-text-lg font-semibold text-gray-900 mb-4">
                Recent Leads
              </h3>
              <div className="space-y-3">
                {analytics.recentLeads.length > 0 ? (
                  analytics.recentLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="border-b border-gray-100 pb-2"
                    >
                      <div className="flex justify-between items-start">
                        <div className="min-w-0 flex-1">
                          <p className="responsive-text-sm font-medium text-gray-900 truncate">
                            {lead.name}
                          </p>
                          {lead.email && (
                            <p className="responsive-text-xs text-gray-600 truncate">
                              {lead.email}
                            </p>
                          )}
                          {lead.phone && (
                            <p className="responsive-text-xs text-gray-600">
                              {lead.phone}
                            </p>
                          )}
                        </div>
                        <span className="responsive-text-xs text-gray-500 flex-shrink-0 ml-2">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 responsive-text-sm">
                    No leads yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
