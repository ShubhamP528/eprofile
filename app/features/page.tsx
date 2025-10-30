"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FeaturesPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signup");
    }
  };
  const features = [
    {
      icon: "🎨",
      title: "Professional Templates",
      description:
        "Choose from 10 beautifully designed templates that make your eProfile stand out.",
      details: [
        "Modern, responsive designs",
        "Mobile-optimized layouts",
        "Customizable color schemes",
        "Professional typography",
      ],
    },
    {
      icon: "📱",
      title: "Interactive Contact Buttons",
      description:
        "Make it easy for visitors to reach you with one-click contact options.",
      details: [
        "Direct phone calling",
        "WhatsApp messaging",
        "Email integration",
        "Google Maps navigation",
      ],
    },
    {
      icon: "💼",
      title: "Services Showcase",
      description:
        "Display your services with pricing and highlight your featured offerings.",
      details: [
        "Up to 5 services per card",
        "Featured service highlighting",
        "Drag-and-drop reordering",
        "Pricing display options",
      ],
    },
    {
      icon: "🖼️",
      title: "Portfolio Gallery",
      description:
        "Showcase your work with images, videos, and documents in a beautiful gallery.",
      details: [
        "Support for images and videos",
        "Document attachments",
        "Up to 10 gallery items",
        "Responsive grid layout",
      ],
    },
    {
      icon: "⭐",
      title: "Customer Testimonials",
      description:
        "Build trust with customer reviews and star ratings on your card.",
      details: [
        "5-star rating system",
        "Customer feedback display",
        "Reorderable testimonials",
        "Social proof integration",
      ],
    },
    {
      icon: "💳",
      title: "Payment Integration",
      description:
        "Accept payments directly through your eProfile with multiple options.",
      details: [
        "UPI QR code support",
        "Razorpay integration",
        "Paytm gateway support",
        "Custom payment buttons",
      ],
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description:
        "Track your card performance with detailed analytics and insights.",
      details: [
        "View count tracking",
        "Button click analytics",
        "Lead generation metrics",
        "Conversion rate analysis",
      ],
    },
    {
      icon: "🔗",
      title: "Easy Sharing",
      description:
        "Share your card effortlessly with QR codes and social media integration.",
      details: [
        "Downloadable QR codes",
        "Social media sharing",
        "Direct link sharing",
        "Embed code generation",
      ],
    },
    {
      icon: "📈",
      title: "Lead Generation",
      description:
        "Capture leads directly from your card with built-in contact forms.",
      details: [
        "Custom contact forms",
        "Lead management dashboard",
        "Email notifications",
        "Lead status tracking",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="text-blue-600"> Digital Success</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create a professional eProfile that
              converts visitors into customers.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your eProfile?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have transformed their
            networking with eProfile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {session ? "Go to Dashboard" : "Get Started Free"}
            </button>
            <Link
              href="/pricing"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Choose eProfile?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for professionals who want to make a lasting impression
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Create your professional eProfile in under 5 minutes. No technical
              skills required.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Always Updated
            </h3>
            <p className="text-gray-600">
              Update your information anytime and it reflects instantly across
              all shared links.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-purple-600"
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Secure & Reliable
            </h3>
            <p className="text-gray-600">
              Your data is protected with enterprise-grade security and 99.9%
              uptime guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
