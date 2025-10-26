"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import SubscriptionBadge from "@/components/subscription/subscription-badge";
import Loading from "@/components/ui/loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/auth/signin");
  }, [session, status, router]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (status === "loading") {
    return (
      <Loading variant="fullscreen" message="Loading dashboard..." size="lg" />
    );
  }

  if (!session) {
    return null;
  }

  const navigation = [
    { name: "Cards", href: "/dashboard", icon: "📇" },
    { name: "Leads", href: "/dashboard/leads", icon: "👥" },
    { name: "Analytics", href: "/dashboard/analytics", icon: "📊" },
    { name: "Subscription", href: "/dashboard/subscription", icon: "💳" },
  ];

  return (
    <div className="h-screen bg-gray-50 safe-area-top lg:overflow-hidden">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
        <div className="mobile-container">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="touch-target flex items-center justify-center text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
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
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2"
                  />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                eProfile
              </span>
            </Link>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user?.name || "User"}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-40">
        <div className="max-w-7xl mx-auto mobile-container">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
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
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">eProfile</span>
            </Link>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user?.name || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700 hidden xl:block">
                  {session.user?.name || session.user?.email}
                </span>
              </div>
              <SubscriptionBadge />
              <button
                onClick={handleSignOut}
                className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors touch-target flex items-center justify-center"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex lg:pt-16 h-full">
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0  bg-opacity-20 backdrop-blur-md"
              onClick={toggleMobileMenu}
            ></div>
            <nav className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user?.name || "User"}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {session.user?.name || "User"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {session.user?.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={toggleMobileMenu}
                    className="touch-target flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-3">
                  <SubscriptionBadge />
                </div>
              </div>
              <div className="p-4">
                <h2 className="responsive-text-lg font-semibold text-gray-900 mb-4">
                  Dashboard
                </h2>
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors touch-target ${
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                        onClick={toggleMobileMenu}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      handleSignOut();
                      toggleMobileMenu();
                    }}
                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors touch-target w-full text-left"
                  >
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* Desktop Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen hidden lg:block lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:overflow-y-auto lg:z-30">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Dashboard
            </h2>
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors touch-target ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 mobile-container py-4 sm:py-6 lg:py-6 lg:ml-64 lg:overflow-y-auto lg:h-full safe-area-bottom">
          <div className="lg:max-w-none lg:mx-0 lg:px-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
