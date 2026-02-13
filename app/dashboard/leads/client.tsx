"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";
import { SkeletonList } from "@/components/ui/skeleton/skeleton-list";

interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  status: string;
  createdAt: string;
  card: {
    id: string;
    username: string;
    title: string;
  };
}

interface LeadsResponse {
  leads: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function LeadsPage() {
  const { data: session, status } = useSession();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [userCards, setUserCards] = useState<any[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserCards();
      fetchLeads();
    }
  }, [status, currentPage, selectedCard, selectedStatus]);

  const fetchUserCards = async () => {
    try {
      const response = await apiClient.getCards();
      if (response.success) {
        setUserCards(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      console.error("Error fetching user cards:", err);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        page: currentPage,
        limit: 10,
      };

      if (selectedCard) {
        params.cardId = selectedCard;
      }

      if (selectedStatus) {
        params.status = selectedStatus;
      }

      const response = await apiClient.getLeads(params);

      if (response.success) {
        const data = response.data as LeadsResponse;
        setLeads(data.leads || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        console.error("Leads API Error:", response.error);
        setError(response.error?.message || "Failed to fetch leads");
      }
    } catch (err) {
      console.error("Error in fetchLeads:", err);
      setError(
        "An error occurred while fetching leads. Please try refreshing the page."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await apiClient.updateLeadStatus(leadId, newStatus);

      if (response.success) {
        setLeads(
          leads.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
      } else {
        setError(response.error?.message || "Failed to update lead status");
      }
    } catch (err) {
      setError("An error occurred while updating lead status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "CONTACTED":
        return "bg-yellow-100 text-yellow-800";
      case "CONVERTED":
        return "bg-green-100 text-green-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">Please sign in to view your leads.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-spacing">
      <div className="mb-6 sm:mb-8">
        <h1 className="responsive-text-2xl font-bold text-gray-900">
          Lead Management
        </h1>
        <p className="mt-2 responsive-text-sm text-gray-600">
          Manage and track leads from your eProfiles
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="responsive-text-sm">{error}</span>
            <button
              onClick={() => {
                setError(null);
                fetchLeads();
              }}
              className="mobile-button bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors touch-target self-start sm:self-auto"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mobile-card bg-white rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mobile-form-label">Filter by Card</label>
            <select
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="mobile-form-input"
            >
              <option value="">All Cards</option>
              {userCards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.title} (@{card.username})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mobile-form-label">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="mobile-form-input"
            >
              <option value="">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="CONVERTED">Converted</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-lg shadow-sm border">
        {loading ? (
          <SkeletonList
            items={5}
            variant="table"
            showAvatar={false}
            showActions={true}
          />
        ) : leads?.length === 0 ? (
          <div className="p-6 sm:p-8 text-center">
            <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📋</div>
            <h3 className="responsive-text-lg font-semibold text-gray-900 mb-2">
              No leads yet
            </h3>
            <p className="responsive-text-sm text-gray-600">
              Leads from your eProfiles will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="block sm:hidden">
              <div className="divide-y divide-gray-200">
                {leads?.map((lead) => (
                  <div key={lead.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="responsive-text-sm font-medium text-gray-900 truncate">
                          {lead.name}
                        </h4>
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
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full shrink-0 ml-2 ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="responsive-text-xs text-gray-600 mb-1">
                        Card: {lead.card.title} (@{lead.card.username})
                      </p>
                      <p className="responsive-text-xs text-gray-900 line-clamp-2">
                        {lead.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="responsive-text-xs text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateLeadStatus(lead.id, e.target.value)
                        }
                        className="responsive-text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="CONVERTED">Converted</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Card
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads?.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900 responsive-text-sm">
                            {lead.name}
                          </div>
                          {lead.email && (
                            <div className="responsive-text-xs text-gray-600">
                              {lead.email}
                            </div>
                          )}
                          {lead.phone && (
                            <div className="responsive-text-xs text-gray-600">
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="responsive-text-sm text-gray-900">
                          {lead.card.title}
                        </div>
                        <div className="responsive-text-xs text-gray-600">
                          @{lead.card.username}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="responsive-text-sm text-gray-900 max-w-xs truncate">
                          {lead.message}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 responsive-text-xs text-gray-600">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateLeadStatus(lead.id, e.target.value)
                          }
                          className="responsive-text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="CONVERTED">Converted</option>
                          <option value="CLOSED">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="responsive-text-sm text-gray-600 text-center sm:text-left">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2 justify-center sm:justify-end">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="mobile-button border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="mobile-button border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
