"use client";

import { useState, useEffect } from "react";

interface BillingFilters {
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  status: "all" | "captured" | "failed" | "refunded";
  plan: "all" | "STANDARD" | "PRO";
  searchQuery: string;
}

interface BillingFiltersProps {
  filters: BillingFilters;
  onFiltersChange: (filters: BillingFilters) => void;
  loading?: boolean;
}

export default function BillingFilters({
  filters,
  onFiltersChange,
  loading = false,
}: BillingFiltersProps) {
  const [localFilters, setLocalFilters] = useState<BillingFilters>(filters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localFilters.searchQuery !== filters.searchQuery) {
        onFiltersChange(localFilters);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localFilters.searchQuery]);

  const handleFilterChange = (key: keyof BillingFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);

    // Apply immediately for non-search filters
    if (key !== "searchQuery") {
      onFiltersChange(newFilters);
    }
  };

  const handleDateRangeChange = (
    type: "startDate" | "endDate",
    value: string
  ) => {
    const newDateRange = { ...localFilters.dateRange, [type]: value || null };
    const newFilters = { ...localFilters, dateRange: newDateRange };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: BillingFilters = {
      dateRange: { startDate: null, endDate: null },
      status: "all",
      plan: "all",
      searchQuery: "",
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
    setShowAdvanced(false);
  };

  const hasActiveFilters =
    localFilters.dateRange.startDate ||
    localFilters.dateRange.endDate ||
    localFilters.status !== "all" ||
    localFilters.plan !== "all" ||
    localFilters.searchQuery;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4">
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by payment ID, order ID..."
              value={localFilters.searchQuery}
              onChange={(e) =>
                handleFilterChange("searchQuery", e.target.value)
              }
              disabled={loading}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:opacity-50"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="sm:w-40">
          <select
            value={localFilters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            disabled={loading}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          >
            <option value="all">All Status</option>
            <option value="captured">Successful</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        {/* Plan Filter */}
        <div className="sm:w-40">
          <select
            value={localFilters.plan}
            onChange={(e) => handleFilterChange("plan", e.target.value)}
            disabled={loading}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          >
            <option value="all">All Plans</option>
            <option value="STANDARD">Standard</option>
            <option value="PRO">Pro</option>
          </select>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <svg
            className={`w-4 h-4 mr-2 transition-transform ${
              showAdvanced ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={localFilters.dateRange.startDate || ""}
                onChange={(e) =>
                  handleDateRangeChange("startDate", e.target.value)
                }
                disabled={loading}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={localFilters.dateRange.endDate || ""}
                onChange={(e) =>
                  handleDateRangeChange("endDate", e.target.value)
                }
                disabled={loading}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Quick Date Ranges */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Ranges
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Last 7 days", days: 7 },
                { label: "Last 30 days", days: 30 },
                { label: "Last 90 days", days: 90 },
                { label: "This year", days: 365 },
              ].map((range) => (
                <button
                  key={range.label}
                  onClick={() => {
                    const endDate = new Date();
                    const startDate = new Date();
                    startDate.setDate(endDate.getDate() - range.days);

                    const newDateRange = {
                      startDate: startDate.toISOString().split("T")[0],
                      endDate: endDate.toISOString().split("T")[0],
                    };

                    const newFilters = {
                      ...localFilters,
                      dateRange: newDateRange,
                    };
                    setLocalFilters(newFilters);
                    onFiltersChange(newFilters);
                  }}
                  disabled={loading}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters and Reset */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filters applied</span>
          </div>
          <button
            onClick={resetFilters}
            disabled={loading}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
