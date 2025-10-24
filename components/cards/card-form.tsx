"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TemplateSelector from "../templates/template-selector";
import ServicesManager from "../services/services-manager";
import GalleryManager from "../gallery/gallery-manager";
import TestimonialsManager from "../testimonials/testimonials-manager";
import PaymentManager from "../payments/payment-manager";
import FeatureGate from "../subscription/feature-gate";
import ImageUpload from "../ui/image-upload";

const cardFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, hyphens, and underscores"
    ),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  subtitle: z
    .string()
    .max(150, "Subtitle must be less than 150 characters")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  profileImage: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  template: z.string().default("template1"),
  isPublic: z.boolean().default(true),
});

type CardFormData = z.infer<typeof cardFormSchema>;

interface CardFormProps {
  initialData?: Partial<CardFormData> & { id?: string };
  onSubmit: (
    data: CardFormData
  ) => Promise<{ success: boolean; error?: string }>;
  onCancel?: () => void;
  isEditing?: boolean;
}

export default function CardForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: CardFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      template: "template1",
      isPublic: true,
      subtitle: "",
      bio: "",
      profileImage: "",
      phone: "",
      email: "",
      address: "",
      ...initialData,
    },
  });

  const watchedValues = watch();

  const handleFormSubmit = async (data: CardFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await onSubmit(data);

      if (!result.success) {
        setSubmitError(result.error || "An error occurred");
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mobile-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Form Section */}
        <div className="mobile-spacing">
          <div>
            <h2 className="responsive-text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              {isEditing ? "Edit Your Card" : "Create Your Digital Card"}
            </h2>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 responsive-text-sm">
                {submitError}
              </div>
            )}

            <form
              onSubmit={handleSubmit(handleFormSubmit as any)}
              className="mobile-spacing"
            >
              {/* Basic Information */}
              <div className="mobile-card bg-white rounded-lg shadow-sm border">
                <h3 className="responsive-text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h3>

                <div className="mobile-spacing">
                  <div>
                    <label htmlFor="username" className="mobile-form-label">
                      Username *
                    </label>
                    <div className="relative">
                      <input
                        {...register("username")}
                        type="text"
                        className="mobile-form-input pr-24 sm:pr-28"
                        placeholder="your-username"
                        disabled={isEditing}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="responsive-text-xs text-gray-500">
                          .procard.link
                        </span>
                      </div>
                    </div>
                    {errors.username && (
                      <p className="mt-1 responsive-text-xs text-red-600">
                        {errors.username.message}
                      </p>
                    )}
                    {isEditing && (
                      <p className="mt-1 responsive-text-xs text-gray-500">
                        Username cannot be changed after creation
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="title" className="mobile-form-label">
                      Full Name / Title *
                    </label>
                    <input
                      {...register("title")}
                      type="text"
                      className="mobile-form-input"
                      placeholder="John Doe"
                    />
                    {errors.title && (
                      <p className="mt-1 responsive-text-xs text-red-600">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subtitle" className="mobile-form-label">
                      Professional Title
                    </label>
                    <input
                      {...register("subtitle")}
                      type="text"
                      className="mobile-form-input"
                      placeholder="Senior Software Developer"
                    />
                    {errors.subtitle && (
                      <p className="mt-1 responsive-text-xs text-red-600">
                        {errors.subtitle.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bio" className="mobile-form-label">
                      About Me
                    </label>
                    <textarea
                      {...register("bio")}
                      rows={3}
                      className="mobile-form-input resize-none"
                      placeholder="Tell people about yourself and what you do..."
                    />
                    {errors.bio && (
                      <p className="mt-1 responsive-text-xs text-red-600">
                        {errors.bio.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mobile-form-label">Profile Image</label>
                    <ImageUpload
                      value={watchedValues.profileImage || ""}
                      onChange={(url) => setValue("profileImage", url)}
                      placeholder="Upload profile image"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mobile-card bg-white rounded-lg shadow-sm border">
                <h3 className="responsive-text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>

                <div className="mobile-spacing">
                  <div>
                    <label htmlFor="phone" className="mobile-form-label">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="mobile-form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 responsive-text-xs text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mobile-form-label">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="mobile-form-input"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 responsive-text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="mobile-form-label">
                      Address
                    </label>
                    <input
                      {...register("address")}
                      type="text"
                      className="mobile-form-input"
                      placeholder="123 Main St, City, State 12345"
                    />
                    {errors.address && (
                      <p className="mt-1 responsive-text-xs text-red-600">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Template Selection */}
              <div className="mobile-card bg-white rounded-lg shadow-sm border">
                <TemplateSelector
                  selectedTemplate={watchedValues.template || "template1"}
                  onTemplateChange={(template) =>
                    setValue("template", template)
                  }
                  cardData={watchedValues}
                />
              </div>

              {/* Services Management */}
              {isEditing && initialData?.id && (
                <FeatureGate feature="services">
                  <ServicesManager cardId={initialData.id} />
                </FeatureGate>
              )}

              {/* Gallery Management */}
              {isEditing && initialData?.id && (
                <FeatureGate feature="gallery">
                  <GalleryManager cardId={initialData.id} />
                </FeatureGate>
              )}

              {/* Testimonials Management */}
              {isEditing && initialData?.id && (
                <FeatureGate feature="testimonials">
                  <TestimonialsManager cardId={initialData.id} />
                </FeatureGate>
              )}

              {/* Payment Management */}
              {isEditing && initialData?.id && (
                <FeatureGate feature="payments">
                  <PaymentManager
                    card={initialData as any}
                    onUpdate={(data) => {
                      // Update form data with payment information
                      Object.entries(data).forEach(([key, value]) => {
                        setValue(key as any, value);
                      });
                    }}
                  />
                </FeatureGate>
              )}

              {/* Settings */}
              <div className="mobile-card bg-white rounded-lg shadow-sm border">
                <h3 className="responsive-text-lg font-semibold text-gray-900 mb-4">
                  Privacy Settings
                </h3>
                <div className="flex items-start">
                  <input
                    {...register("isPublic")}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5 shrink-0"
                  />
                  <label
                    htmlFor="isPublic"
                    className="ml-3 block responsive-text-sm text-gray-700 leading-relaxed"
                  >
                    Make this card public (visible to anyone with the link)
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="mobile-button border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-target order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mobile-button bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed touch-target font-medium order-1 sm:order-2"
                >
                  {isSubmitting
                    ? "Saving..."
                    : isEditing
                    ? "Update Card"
                    : "Create Card"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="lg:sticky lg:top-6">
          <div className="mobile-card bg-gray-50 rounded-lg">
            <h3 className="responsive-text-lg font-semibold text-gray-900 mb-4">
              Live Preview
            </h3>
            <div className="bg-white rounded-lg shadow-sm border p-4 overflow-hidden">
              <div className="w-full">
                <CardPreview
                  data={watchedValues}
                  template={watchedValues.template || "template1"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Template-based card preview component
function CardPreview({
  data,
  template,
}: {
  data: Partial<CardFormData>;
  template: string;
}) {
  // Import template components dynamically
  const Template1 = require("../templates/template1").default;
  const Template2 = require("../templates/template2").default;
  const Template3 = require("../templates/template3").default;
  const Template4 = require("../templates/template4").default;
  const Template5 = require("../templates/template5").default;

  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4,
    template5: Template5,
  };

  const SelectedTemplate =
    templates[template as keyof typeof templates] || Template1;

  const cardData = {
    title: data.title || "Your Name",
    subtitle: data.subtitle || "",
    bio: data.bio || "",
    profileImage: data.profileImage || "",
    phone: data.phone || "",
    email: data.email || "",
    address: data.address || "",
    services: [],
  };

  return (
    <div className="w-full">
      <SelectedTemplate data={cardData} isPreview={true} />
    </div>
  );
}
