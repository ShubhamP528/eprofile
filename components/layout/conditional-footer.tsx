"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Determine if footer should be shown
  const shouldShowFooter = () => {
    // Don't show footer on dashboard pages
    if (pathname?.startsWith("/dashboard")) {
      return false;
    }

    // Don't show footer on API routes
    if (pathname?.startsWith("/api")) {
      return false;
    }

    // Don't show footer on auth pages
    if (pathname?.startsWith("/auth")) {
      return false;
    }

    // Don't show footer on admin dashboard
    if (pathname?.startsWith("/admin")) {
      return false;
    }

    // Allow public marketing pages
    const publicPages = ["/", "/features", "/pricing", "/about", "/contact"];
    const isPublicPage = publicPages.includes(pathname || "");

    return isPublicPage;
  };

  if (shouldShowFooter()) {
    return <Footer />;
  }

  return null;
}
