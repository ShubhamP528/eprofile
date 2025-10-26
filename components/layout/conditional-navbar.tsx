"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Determine if navbar should be shown
  const shouldShowNavbar = () => {
    // Don't show navbar on dashboard pages
    if (pathname?.startsWith("/dashboard")) {
      return false;
    }

    // Don't show navbar on API routes
    if (pathname?.startsWith("/api")) {
      return false;
    }

    // Don't show navbar on card viewing pages (username routes)
    // But allow specific public pages
    const publicPages = ["/", "/features", "/pricing", "/contact"];
    const isAuthPath = pathname?.startsWith("/auth");
    const isPublicPage = publicPages.includes(pathname || "");

    // Show navbar on public pages and auth pages
    return isPublicPage || isAuthPath;
  };

  const showNavbar = shouldShowNavbar();

  // Add/remove body class based on navbar visibility
  useEffect(() => {
    if (showNavbar) {
      document.body.classList.add("has-navbar");
    } else {
      document.body.classList.remove("has-navbar");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("has-navbar");
    };
  }, [showNavbar]);

  // Show navbar on public pages and auth pages
  if (showNavbar) {
    return <Navbar />;
  }

  // Hide navbar on card viewing pages (username routes like /john-doe)
  return null;
}
