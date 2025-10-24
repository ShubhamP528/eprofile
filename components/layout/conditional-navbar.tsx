"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Don't show navbar on dashboard pages
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  // Don't show navbar on API routes
  if (pathname?.startsWith("/api")) {
    return null;
  }

  // Don't show navbar on card viewing pages (username routes)
  // But allow specific public pages
  const publicPages = ["/", "/features", "/pricing", "/contact"];
  const isAuthPath = pathname?.startsWith("/auth");
  const isPublicPage = publicPages.includes(pathname || "");

  // Show navbar on public pages and auth pages
  if (isPublicPage || isAuthPath) {
    return <Navbar />;
  }

  // Hide navbar on card viewing pages (username routes like /john-doe)
  return null;
}
