"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { SkeletonBase } from "@/components/ui/skeleton/skeleton-base";

interface GalleryItem {
  id: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT";
  url: string;
  title?: string;
  order: number;
}

interface GalleryManagerProps {
  cardId: string;
}

export default function GalleryManager({ cardId }: GalleryManagerProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    type: "IMAGE" as "IMAGE" | "VIDEO" | "DOCUMENT",
    url: "",
    title: "",
  });

  useEffect(() => {
    fetchGalleryItems();
  }, [cardId]);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getGalleryItems(cardId);
      if (response.success) {
        setItems((response.data as GalleryItem[]) || []);
      } else {
        setError(response.error?.message || "Failed to fetch gallery items");
      }
    } catch (err) {
      setError("An error occurred while fetching gallery items");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    try {
      let response;
      if (editingItem) {
        response = await apiClient.updateGalleryItem(editingItem.id, formData);
      } else {
        response = await apiClient.createGalleryItem(cardId, formData);
      }

      if (response.success) {
        await fetchGalleryItems();
        resetForm();
      } else {
        setError(response.error?.message || "Failed to save gallery item");
      }
    } catch (err) {
      setError("An error occurred while saving the gallery item");
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      url: item.url,
      title: item.title || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      const response = await apiClient.deleteGalleryItem(id);
      if (response.success) {
        await fetchGalleryItems();
      } else {
        setError(response.error?.message || "Failed to delete gallery item");
      }
    } catch (err) {
      setError("An error occurred while deleting the gallery item");
    }
  };

  const resetForm = () => {
    setFormData({
      type: "IMAGE",
      url: "",
      title: "",
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const moveItem = async (itemId: string, direction: "up" | "down") => {
    const currentIndex = items.findIndex((item) => item.id === itemId);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === items.length - 1)
    ) {
      return;
    }

    const newItems = [...items];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Swap the items
    [newItems[currentIndex], newItems[targetIndex]] = [
      newItems[targetIndex],
      newItems[currentIndex],
    ];

    // Update order values
    const reorderData = newItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    try {
      const response = await apiClient.reorderGalleryItems(cardId, reorderData);
      if (response.success) {
        setItems((response.data as GalleryItem[]) || []);
      } else {
        setError(response.error?.message || "Failed to reorder gallery items");
      }
    } catch (err) {
      setError("An error occurred while reordering gallery items");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "IMAGE":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "VIDEO":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        );
      case "DOCUMENT":
        return (
          <svg
            className="w-5 h-5"
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
        );
      default:
        return null;
    }
  };

  const getPreview = (item: GalleryItem) => {
    if (item.type === "IMAGE") {
      return (
        <img
          src={item.url}
          alt={item.title || "Gallery item"}
          className="w-full h-24 object-cover rounded"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      );
    }
    return (
      <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center">
        <div className="text-gray-400">{getTypeIcon(item.type)}</div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="mobile-card bg-white rounded-lg shadow-sm border">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <SkeletonBase width="5rem" height="1.5rem" />
            <SkeletonBase width="6rem" height="2rem" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBase key={i} className="aspect-square" rounded="lg" />
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
          Portfolio Gallery
        </h3>
        <button
          onClick={() => setShowForm(true)}
          disabled={items.length >= 10}
          className="mobile-button bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target w-full sm:w-auto"
        >
          Add Item
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 responsive-text-sm">
          {error}
        </div>
      )}

      {items.length >= 10 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md mb-4 responsive-text-sm">
          Maximum 10 gallery items allowed per card.
        </div>
      )}

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-shadow"
          >
            {/* Preview */}
            <div className="mb-3">{getPreview(item)}</div>

            {/* Item Info */}
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-gray-500 shrink-0">
                {getTypeIcon(item.type)}
              </div>
              <span className="responsive-text-xs font-medium text-gray-700">
                {item.type}
              </span>
            </div>

            {item.title && (
              <h4 className="responsive-text-sm font-medium text-gray-900 mb-2 truncate">
                {item.title}
              </h4>
            )}

            <p className="responsive-text-xs text-gray-500 mb-3 truncate">
              {item.url}
            </p>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => moveItem(item.id, "up")}
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
                  onClick={() => moveItem(item.id, "down")}
                  disabled={index === items.length - 1}
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
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEdit(item)}
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
                  onClick={() => handleDelete(item.id)}
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

      {items.length === 0 && (
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="responsive-text-sm">No gallery items added yet</p>
          <p className="responsive-text-xs">
            Add images, videos, or documents to showcase your work
          </p>
        </div>
      )}

      {/* Gallery Item Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4 safe-area-top safe-area-bottom">
          <div className="bg-white rounded-lg mobile-card w-full max-w-md max-h-full overflow-y-auto">
            <h4 className="responsive-text-lg font-semibold text-gray-900 mb-4">
              {editingItem ? "Edit Gallery Item" : "Add Gallery Item"}
            </h4>

            <div className="mobile-spacing">
              <div>
                <label className="mobile-form-label">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "IMAGE" | "VIDEO" | "DOCUMENT",
                    })
                  }
                  className="mobile-form-input"
                  required
                >
                  <option value="IMAGE">Image</option>
                  <option value="VIDEO">Video</option>
                  <option value="DOCUMENT">Document</option>
                </select>
              </div>

              <div>
                <label className="mobile-form-label">URL *</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="mobile-form-input"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="mobile-form-label">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mobile-form-input"
                  placeholder="Optional title for this item"
                />
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
                  {editingItem ? "Update" : "Add"} Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
