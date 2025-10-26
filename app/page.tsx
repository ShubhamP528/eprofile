"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // Handle the Get Started button click
  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signup");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 prevent-scroll">
      <main className="mobile-container py-8 sm:py-12 lg:py-16 safe-area-bottom">
        <div className="text-center mobile-spacing">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            eProfile
          </h1>
          <p className="responsive-text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Create professional eProfiles in minutes. Share your contact
            information, services, and portfolio with a simple link or QR code.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
            <button
              onClick={handleGetStarted}
              className="mobile-button bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors touch-target w-full sm:w-auto"
            >
              {session ? "Go to Dashboard" : "Get Started Free"}
            </button>
            {!session && (
              <Link
                href="/auth/signin"
                className="mobile-button bg-white hover:bg-gray-50 text-blue-600 rounded-lg font-semibold border-2 border-blue-600 transition-colors touch-target flex items-center justify-center w-full sm:w-auto"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="mobile-grid max-w-6xl mx-auto mb-12 sm:mb-16">
            <div className="mobile-card bg-white rounded-lg shadow-md border border-gray-100">
              <div className="text-blue-600 text-2xl sm:text-3xl mb-3 sm:mb-4">
                ⚡
              </div>
              <h3 className="responsive-text-xl font-semibold mb-2 text-gray-900">
                Quick Setup
              </h3>
              <p className="responsive-text-sm text-gray-700 leading-relaxed">
                Create your professional eProfile in under 5 minutes with our
                intuitive builder.
              </p>
            </div>

            <div className="mobile-card bg-white rounded-lg shadow-md border border-gray-100">
              <div className="text-blue-600 text-2xl sm:text-3xl mb-3 sm:mb-4">
                📱
              </div>
              <h3 className="responsive-text-xl font-semibold mb-2 text-gray-900">
                Mobile Optimized
              </h3>
              <p className="responsive-text-sm text-gray-700 leading-relaxed">
                Your cards look perfect on all devices and can be shared
                instantly via WhatsApp, email, or QR code.
              </p>
            </div>

            <div className="mobile-card bg-white rounded-lg shadow-md border border-gray-100">
              <div className="text-blue-600 text-2xl sm:text-3xl mb-3 sm:mb-4">
                📊
              </div>
              <h3 className="responsive-text-xl font-semibold mb-2 text-gray-900">
                Lead Generation
              </h3>
              <p className="responsive-text-sm text-gray-700 leading-relaxed">
                Capture leads directly from your card with built-in contact
                forms and analytics.
              </p>
            </div>
          </div>

          <div className="text-center px-4">
            <p className="responsive-text-base text-gray-700 mb-4 font-medium">
              Perfect for:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              {[
                "Freelancers",
                "Consultants",
                "Real Estate Agents",
                "Photographers",
                "Lawyers",
                "Sales Professionals",
              ].map((profession) => (
                <span
                  key={profession}
                  className="bg-blue-100 text-blue-800 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium"
                >
                  {profession}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Navigation */}
          <div className="mt-12 sm:mt-20 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Link
              href="/features"
              className="mobile-button bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-200 transition-colors flex items-center justify-center touch-target"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
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
              Explore All Features
            </Link>
            <Link
              href="/pricing"
              className="mobile-button bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-200 transition-colors flex items-center justify-center touch-target"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              View Pricing Plans
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
