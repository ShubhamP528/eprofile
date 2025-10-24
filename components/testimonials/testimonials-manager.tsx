"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

interface Testimonial {
  id: string;
  customerName: string;
  content: string;
  rating: number;
  order: number;
}

interface TestimonialsManagerProps {
  cardId: string;
}

export default function TestimonialsManager({
  cardId,
}: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    customerName: "",
    content: "",
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, [cardId]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getTestimonials(cardId);
      if (response.success) {
        setTestimonials((response.data as Testimonial[]) || []);
      } else {
        setError(response.error?.message || "Failed to fetch testimonials");
      }
    } catch (err) {
      setError("An error occurred while fetching testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    try {
      let response;
      if (editingTestimonial) {
        response = await apiClient.updateTestimonial(
          editingTestimonial.id,
          formData
        );
      } else {
        response = await apiClient.createTestimonial(cardId, formData);
      }

      if (response.success) {
        await fetchTestimonials();
        resetForm();
      } else {
        setError(response.error?.message || "Failed to save testimonial");
      }
    } catch (err) {
      setError("An error occurred while saving the testimonial");
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customerName: testimonial.customerName,
      content: testimonial.content,
      rating: testimonial.rating,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await apiClient.deleteTestimonial(id);
      if (response.success) {
        await fetchTestimonials();
      } else {
        setError(response.error?.message || "Failed to delete testimonial");
      }
    } catch (err) {
      setError("An error occurred while deleting the testimonial");
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      content: "",
      rating: 5,
    });
    setEditingTestimonial(null);
    setShowForm(false);
  };

  const moveTestimonial = async (
    testimonialId: string,
    direction: "up" | "down"
  ) => {
    const currentIndex = testimonials.findIndex(
      (testimonial) => testimonial.id === testimonialId
    );
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === testimonials.length - 1)
    ) {
      return;
    }

    const newTestimonials = [...testimonials];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Swap the testimonials
    [newTestimonials[currentIndex], newTestimonials[targetIndex]] = [
      newTestimonials[targetIndex],
      newTestimonials[currentIndex],
    ];

    // Update order values
    const reorderData = newTestimonials.map((testimonial, index) => ({
      id: testimonial.id,
      order: index,
    }));

    try {
      const response = await apiClient.reorderTestimonials(cardId, reorderData);
      if (response.success) {
        setTestimonials((response.data as Testimonial[]) || []);
      } else {
        setError(response.error?.message || "Failed to reorder testimonials");
      }
    } catch (err) {
      setError("An error occurred while reordering testimonials");
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onChange?: (rating: number) => void
  ) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onChange ? () => onChange(star) : undefined}
            className={`${
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
            } transition-transform`}
            disabled={!interactive}
          >
            <svg
              className={`w-5 h-5 ${
                star <= rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Customer Testimonials
        </h3>
        <button
          onClick={() => setShowForm(true)}
          disabled={testimonials.length >= 10}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Testimonial
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {testimonials.length >= 10 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md mb-4">
          Maximum 10 testimonials allowed per card.
        </div>
      )}

      {/* Testimonials List */}
      <div className="space-y-4 mb-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900">
                    {testimonial.customerName}
                  </h4>
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {testimonial.content}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => moveTestimonial(testimonial.id, "up")}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
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
                  onClick={() => moveTestimonial(testimonial.id, "down")}
                  disabled={index === testimonials.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
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
                  onClick={() => handleEdit(testimonial)}
                  className="p-1 text-blue-600 hover:text-blue-700"
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
                  onClick={() => handleDelete(testimonial.id)}
                  className="p-1 text-red-600 hover:text-red-700"
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

      {testimonials.length === 0 && (
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p>No testimonials added yet</p>
          <p className="text-sm">
            Add customer testimonials to build trust with visitors
          </p>
        </div>
      )}

      {/* Testimonial Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <div className="mt-1">
                  {renderStars(formData.rating, true, (rating) =>
                    setFormData({ ...formData, rating })
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your experience working with this professional..."
                  rows={4}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.content.length}/1000 characters
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingTestimonial ? "Update" : "Add"} Testimonial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
