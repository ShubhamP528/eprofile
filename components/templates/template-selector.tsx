"use client";

import { useState } from "react";
import Link from "next/link";
import Template1 from "./template1";
import Template2 from "./template2";
import Template3 from "./template3";
import Template4 from "./template4";
import Template5 from "./template5";
import { useSubscription } from "@/components/providers/subscription-provider";

interface CardData {
  title: string;
  subtitle?: string;
  bio?: string;
  phone?: string;
  email?: string;
  address?: string;
  profileImage?: string;
  coverImage?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  services?: Array<{
    id: string;
    title: string;
    description?: string;
    price?: string;
    isFeatured: boolean;
    order: number;
  }>;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  cardData: CardData;
}

const templates = [
  {
    id: "template1",
    name: "Modern Gradient",
    description: "Vibrant gradient design with glassmorphism effects",
    component: Template1,
    isPro: false,
  },
  {
    id: "template2",
    name: "Creative Designer",
    description: "Colorful and creative with gradient backgrounds",
    component: Template2,
    isPro: true,
  },
  {
    id: "template3",
    name: "Business Executive",
    description: "Dark theme with gold accents for executives",
    component: Template3,
    isPro: true,
  },
  {
    id: "template4",
    name: "Minimalist",
    description: "Clean and simple with minimal design",
    component: Template4,
    isPro: false,
  },
  {
    id: "template5",
    name: "Geometric Pro",
    description: "Modern geometric design with teal gradients",
    component: Template5,
    isPro: true,
  },
];

export default function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
  cardData,
}: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const { subscription } = useSubscription();

  const isPro = subscription?.plan === "PRO" && !subscription?.isExpired;

  const sampleData = {
    title: cardData.title || "John Doe",
    subtitle: cardData.subtitle || "Senior Software Developer",
    bio:
      cardData.bio || "Passionate about creating amazing digital experiences.",
    phone: cardData.phone || "+1 (555) 123-4567",
    email: cardData.email || "john@example.com",
    address: cardData.address || "San Francisco, CA",
    services: cardData.services?.length
      ? cardData.services
      : [
          {
            id: "1",
            title: "Web Development",
            description: "Custom websites and applications",
            price: "$2,500",
            isFeatured: true,
            order: 1,
          },
          {
            id: "2",
            title: "Mobile Apps",
            description: "iOS and Android development",
            price: "$3,500",
            isFeatured: false,
            order: 2,
          },
        ],
  };

  return (
    <div className="mobile-spacing">
      {/* Template Options */}
      <div>
        <h3 className="responsive-text-lg font-semibold text-gray-900 mb-4">
          Choose Template
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {templates.map((template) => {
            const TemplateComponent = template.component;
            const isSelected = selectedTemplate === template.id;
            const isPreview = previewTemplate === template.id;

            const isLocked = template.isPro && !isPro;
            const canSelect = !isLocked;

            return (
              <div
                key={template.id}
                className={`relative border-2 rounded-lg p-4 transition-all duration-200 touch-target ${
                  isLocked
                    ? "border-gray-200 bg-gray-50 opacity-75"
                    : isSelected
                    ? "border-blue-500 bg-blue-50 cursor-pointer"
                    : "border-gray-200 hover:border-gray-300 bg-white cursor-pointer"
                }`}
                onClick={() => canSelect && onTemplateChange(template.id)}
                onMouseEnter={() =>
                  !isLocked && setPreviewTemplate(template.id)
                }
                onMouseLeave={() => setPreviewTemplate(null)}
              >
                <div className="flex items-center space-x-4">
                  {/* Template Preview */}
                  <div className="w-24 h-32 sm:w-32 sm:h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative">
                    <div className="transform scale-20 sm:scale-25 origin-center">
                      <TemplateComponent data={sampleData} isPreview={true} />
                    </div>
                    {isLocked && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4
                        className={`text-lg font-semibold ${
                          isSelected ? "text-blue-700" : "text-gray-900"
                        }`}
                      >
                        {template.name}
                      </h4>
                      {template.isPro && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          PRO
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        isSelected ? "text-blue-600" : "text-gray-600"
                      }`}
                    >
                      {template.description}
                    </p>
                    {isLocked && (
                      <div className="mt-2">
                        <Link
                          href="/dashboard/subscription"
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Upgrade to Pro to unlock →
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Selection Indicator */}
                  <div className="shrink-0">
                    {isSelected && !isLocked && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-blue-500 bg-opacity-5 rounded-lg transition-opacity duration-200 ${
                    isPreview && !isSelected && !isLocked
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Template Features */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <h4 className="responsive-text-sm font-semibold text-gray-900 mb-2">
          Template Features:
        </h4>
        <ul className="responsive-text-xs text-gray-600 space-y-1 leading-relaxed">
          <li>• Responsive design for all devices</li>
          <li>• Professional color schemes</li>
          <li>• Contact information display</li>
          <li>• Services showcase</li>
          <li>• Social media integration</li>
          <li>• One-click contact actions</li>
        </ul>
      </div>
    </div>
  );
}
