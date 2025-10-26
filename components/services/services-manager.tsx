"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { SkeletonBase } from "@/components/ui/skeleton/skeleton-base";

interface Service {
  id: string;
  title: string;
  description?: string;
  price?: string;
  isFeatured: boolean;
  order: number;
}

interface ServicesManagerProps {
  cardId: string;
}

export default function ServicesManager({ cardId }: ServicesManagerProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    isFeatured: false,
  });

  useEffect(() => {
    fetchServices();
  }, [cardId]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getServices(cardId);
      if (response.success) {
        setServices((response.data as Service[]) || []);
      } else {
        setError(response.error?.message || "Failed to fetch services");
      }
    } catch (err) {
      setError("An error occurred while fetching services");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    try {
      let response;
      if (editingService) {
        response = await apiClient.updateService(editingService.id, formData);
      } else {
        response = await apiClient.createService(cardId, formData);
      }

      if (response.success) {
        await fetchServices();
        resetForm();
      } else {
        setError(response.error?.message || "Failed to save service");
      }
    } catch (err) {
      setError("An error occurred while saving the service");
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description || "",
      price: service.price || "",
      isFeatured: service.isFeatured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await apiClient.deleteService(id);
      if (response.success) {
        await fetchServices();
      } else {
        setError(response.error?.message || "Failed to delete service");
      }
    } catch (err) {
      setError("An error occurred while deleting the service");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      isFeatured: false,
    });
    setEditingService(null);
    setShowForm(false);
  };

  const moveService = async (serviceId: string, direction: "up" | "down") => {
    const currentIndex = services.findIndex((s) => s.id === serviceId);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === services.length - 1)
    ) {
      return;
    }

    const newServices = [...services];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Swap the services
    [newServices[currentIndex], newServices[targetIndex]] = [
      newServices[targetIndex],
      newServices[currentIndex],
    ];

    // Update order values
    const reorderData = newServices.map((service, index) => ({
      id: service.id,
      order: index,
    }));

    try {
      const response = await apiClient.reorderServices(cardId, reorderData);
      if (response.success) {
        setServices((response.data as Service[]) || []);
      } else {
        setError(response.error?.message || "Failed to reorder services");
      }
    } catch (err) {
      setError("An error occurred while reordering services");
    }
  };

  if (loading) {
    return (
      <div className="mobile-card bg-white rounded-lg shadow-sm border">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <SkeletonBase width="6rem" height="1.5rem" />
            <SkeletonBase width="5rem" height="2rem" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <SkeletonBase width="8rem" height="1rem" />
                  <SkeletonBase width="12rem" height="0.75rem" />
                </div>
                <div className="flex space-x-2">
                  <SkeletonBase width="2rem" height="2rem" />
                  <SkeletonBase width="2rem" height="2rem" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-card bg-white rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h3 className="responsive-text-lg font-semibold text-gray-900">
          Services
        </h3>
        <button
          onClick={() => setShowForm(true)}
          disabled={services.length >= 5}
          className="mobile-button bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target w-full sm:w-auto"
        >
          Add Service
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 responsive-text-sm">
          {error}
        </div>
      )}

      {services.length >= 5 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md mb-4 responsive-text-sm">
          Maximum 5 services allowed per card.
        </div>
      )}

      {/* Services List */}
      <div className="space-y-3 sm:space-y-4 mb-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h4 className="responsive-text-sm font-medium text-gray-900 truncate">
                    {service.title}
                  </h4>
                  {service.isFeatured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full self-start">
                      Featured
                    </span>
                  )}
                </div>
                {service.description && (
                  <p className="responsive-text-xs text-gray-600 mb-2 line-clamp-2">
                    {service.description}
                  </p>
                )}
                {service.price && (
                  <p className="responsive-text-sm text-blue-600 font-semibold">
                    {service.price}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end space-x-1 sm:space-x-2 shrink-0">
                <button
                  onClick={() => moveService(service.id, "up")}
                  disabled={index === 0}
                  className="touch-target p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  title="Move up"
                >
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
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => moveService(service.id, "down")}
                  disabled={index === services.length - 1}
                  className="touch-target p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  title="Move down"
                >
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleEdit(service)}
                  className="touch-target p-2 text-blue-600 hover:text-blue-700"
                  title="Edit"
                >
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="touch-target p-2 text-red-600 hover:text-red-700"
                  title="Delete"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-6 sm:py-8 text-gray-500">
          <svg
            className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <p className="responsive-text-sm">No services added yet</p>
          <p className="responsive-text-xs">
            Add services to showcase what you offer
          </p>
        </div>
      )}

      {/* Service Form Modal */}
      {showForm && (
        <div className="fixed inset-0   bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4 safe-area-top safe-area-bottom">
          <div className="bg-white rounded-lg mobile-card w-full max-w-md max-h-full overflow-y-auto">
            <h4 className="responsive-text-lg font-semibold text-gray-900 mb-4">
              {editingService ? "Edit Service" : "Add Service"}
            </h4>

            <div className="mobile-spacing">
              <div>
                <label className="mobile-form-label">Service Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mobile-form-input"
                  placeholder="e.g., Web Development"
                  required
                />
              </div>

              <div>
                <label className="mobile-form-label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="mobile-form-input resize-none"
                  placeholder="Brief description of the service"
                />
              </div>

              <div>
                <label className="mobile-form-label">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="mobile-form-input"
                  placeholder="e.g., $500, ₹25,000, Contact for quote"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5 shrink-0"
                />
                <label
                  htmlFor="isFeatured"
                  className="ml-3 block responsive-text-sm text-gray-700 leading-relaxed"
                >
                  Mark as featured service
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="mobile-button border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 touch-target order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="mobile-button bg-blue-600 text-white rounded-md hover:bg-blue-700 touch-target font-medium order-1 sm:order-2"
                >
                  {editingService ? "Update" : "Add"} Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
