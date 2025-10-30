"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import PaymentHistoryTable from "./payment-history-table";
import BillingFilters from "./billing-filters";
import BillingStatistics from "./billing-statistics";

interface PaymentRecord {
  id: string;
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  plan: string;
  paymentMethod?: string | null;
  cardLast4?: string | null;
  description: string;
  createdAt: string;
  refundAmount?: number | null;
  refundedAt?: string | null;
  invoiceUrl?: string | null;
}

interface BillingSummary {
  totalAmount: number;
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  refundedPayments: number;
  averagePayment: number;
  lastPaymentDate: string | null;
}

interface BillingStatistics {
  totalSpent: number;
  totalPayments: number;
  averagePayment: number;
  subscriptionDuration: number;
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

interface BillingFilters {
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  status: "all" | "captured" | "failed" | "refunded";
  plan: "all" | "STANDARD" | "PRO";
  searchQuery: string;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function BillingHistoryManager() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<BillingSummary | null>(null);
  const [statistics, setStatistics] = useState<BillingStatistics | null>(null);
  const [statisticsLoading, setStatisticsLoading] = useState(true);

  const [filters, setFilters] = useState<BillingFilters>({
    dateRange: {
      startDate: null,
      endDate: null,
    },
    status: "all",
    plan: "all",
    searchQuery: "",
  });

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  // Load billing history
  const loadBillingHistory = async (resetPage = false) => {
    setLoading(true);
    setError(null);

    const currentPage = resetPage ? 1 : pagination.page;

    try {
      const params = {
        page: currentPage,
        limit: pagination.limit,
        startDate: filters.dateRange.startDate || undefined,
        endDate: filters.dateRange.endDate || undefined,
        status: filters.status,
        plan: filters.plan,
        searchQuery: filters.searchQuery || undefined,
      };

      const response = await apiClient.getBillingHistory(params);

      if (response.success && response.data) {
        const data = response.data as any;
        setPayments(data.payments || []);
        setSummary(data.summary || null);
        setPagination({
          ...pagination,
          page: currentPage,
          total: data.pagination?.total || 0,
          totalPages: data.pagination?.totalPages || 0,
        });
      } else {
        setError(
          typeof response.error === "string"
            ? response.error
            : response.error?.message || "Failed to load billing history"
        );
      }
    } catch (err) {
      setError("Failed to load billing history");
    } finally {
      setLoading(false);
    }
  };

  // Load billing statistics
  const loadBillingStatistics = async () => {
    setStatisticsLoading(true);

    try {
      const response = await apiClient.getBillingStatistics();

      if (response.success && response.data) {
        setStatistics(response.data as BillingStatistics);
      } else {
        console.error("Failed to load billing statistics:", response.error);
      }
    } catch (err) {
      console.error("Failed to load billing statistics:", err);
    } finally {
      setStatisticsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadBillingHistory();
    loadBillingStatistics();
  }, []);

  // Reload history when filters change
  useEffect(() => {
    loadBillingHistory(true);
  }, [filters]);

  // Handle filter changes
  const handleFiltersChange = (newFilters: BillingFilters) => {
    setFilters(newFilters);
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
    loadBillingHistory();
  };

  // Handle invoice download
  const handleInvoiceDownload = async (paymentId: string) => {
    try {
      const blob = await apiClient.downloadInvoice(paymentId);
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${paymentId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError("Failed to download invoice");
      }
    } catch (err) {
      setError("Failed to download invoice");
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    loadBillingHistory();
    loadBillingStatistics();
  };

  return (
    <div className="space-y-6">
      {/* Billing Statistics */}
      <BillingStatistics statistics={statistics} loading={statisticsLoading} />

      {/* Billing History Section */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Billing History
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              View and manage your payment history
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium"
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
            <span>Refresh</span>
          </button>
        </div>

        {/* Filters */}
        <BillingFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          loading={loading}
        />

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-blue-600">
                Total Spent
              </div>
              <div className="text-xl font-bold text-blue-900">
                ₹{(summary.totalAmount / 100).toFixed(2)}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-green-600">
                Successful
              </div>
              <div className="text-xl font-bold text-green-900">
                {summary.successfulPayments}
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-red-600">Failed</div>
              <div className="text-xl font-bold text-red-900">
                {summary.failedPayments}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-purple-600">Average</div>
              <div className="text-xl font-bold text-purple-900">
                ₹{(summary.averagePayment / 100).toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Payment History Table */}
        <PaymentHistoryTable
          payments={payments}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onInvoiceDownload={handleInvoiceDownload}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
}
