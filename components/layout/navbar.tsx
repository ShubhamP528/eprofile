"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/75 backdrop-blur-lg border-b border-slate-200/40 safe-area-top z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto mobile-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2.5 group"
              onClick={closeMobileMenu}
            >
              <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <svg
                  className="w-5.5 h-5.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent">
                eProfile
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className="text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/30 px-3.5 py-2 rounded-xl transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/30 px-3.5 py-2 rounded-xl transition-all duration-200"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/30 px-3.5 py-2 rounded-xl transition-all duration-200"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="flex items-center space-x-3 animate-pulse">
                <div className="w-16 h-8 bg-slate-100 rounded-xl"></div>
                <div className="w-24 h-9 bg-slate-100 rounded-xl"></div>
              </div>
            ) : session ? (
              <div className="flex items-center space-x-5">
                <Link
                  href="/dashboard"
                  className="text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/30 px-3.5 py-2 rounded-xl transition-all duration-200"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center ring-2 ring-slate-100 overflow-hidden">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <svg
                        className="w-5 h-5 text-slate-400"
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
                  <span className="text-base text-slate-700 hidden lg:block">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-base font-medium text-slate-600 hover:text-red-600 hover:bg-red-50/50 border border-slate-200/60 hover:border-red-200 px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/signin"
                  className="text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/30 border border-transparent hover:border-slate-200/60 px-4 py-2 rounded-xl transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-base font-semibold px-5 py-2.5 rounded-xl hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 touch-target flex items-center justify-center"
              aria-label="Toggle mobile menu"
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
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white absolute top-full left-0 right-0 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Navigation Links */}
              <Link
                href="/"
                className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md touch-target"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/features"
                className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md touch-target"
                onClick={closeMobileMenu}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md touch-target"
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>

              {/* Auth Section */}
              {status === "loading" ? (
                <div className="border-t border-slate-100 pt-4 mt-3 space-y-3 animate-pulse px-3">
                  <div className="w-full h-10 bg-slate-100 rounded-xl"></div>
                  <div className="w-full h-10 bg-slate-100 rounded-xl"></div>
                </div>
              ) : session ? (
                <div className="border-t border-slate-100 pt-3 mt-3">
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <svg
                          className="w-5 h-5 text-slate-400"
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
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">
                        {session.user?.name || "User"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {session.user?.email}
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl touch-target"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeMobileMenu();
                    }}
                    className="block w-full text-left px-3 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl touch-target"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t border-slate-100 pt-3 mt-3 space-y-2">
                  <Link
                    href="/auth/signin"
                    className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl touch-target"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block mx-3 py-3 px-4 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl text-center touch-target"
                    onClick={closeMobileMenu}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
