"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/components/ui/loading";
import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { cn } from "@/lib/utils";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/auth/signin");
  }, [session, status, router]);

  // Handle window resize to determine if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Force light background for dashboard and add debugging error listeners
  useEffect(() => {
    document.body.style.backgroundColor = "#f9fafb";
    document.body.style.color = "#111827";

    const showVisualError = (message: string, details?: string) => {
      const errDiv = document.createElement("div");
      errDiv.id = "mobile-debug-error-card";
      errDiv.style.position = "fixed";
      errDiv.style.inset = "0";
      errDiv.style.backgroundColor = "#fef2f2";
      errDiv.style.border = "3px solid #fca5a5";
      errDiv.style.padding = "24px";
      errDiv.style.zIndex = "999999";
      errDiv.style.overflowY = "auto";
      errDiv.style.fontFamily = "monospace";
      errDiv.style.color = "#991b1b";
      
      errDiv.innerHTML = `
        <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">⚠️ Dashboard Mobile Error</h2>
        <p style="font-size: 14px; font-weight: bold; margin-bottom: 16px;">${message}</p>
        <pre style="background-color: #fff; padding: 16px; border-radius: 12px; border: 1px solid #fee2e2; font-size: 11px; white-space: pre-wrap; word-break: break-all; overflow-x: auto; color: #7f1d1d;">${details || ''}</pre>
        <button onclick="window.location.reload()" style="margin-top: 20px; background-color: #dc2626; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2);">Reload Page</button>
      `;
      document.body.appendChild(errDiv);
    };

    const handleError = (event: ErrorEvent) => {
      showVisualError(`Client Error: ${event.message}`, `At: ${event.filename}:${event.lineno}:${event.colno}\n\nStack:\n${event.error?.stack || 'No stack trace'}`);
    };
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reasonDetails = event.reason instanceof Error ? event.reason.stack : String(event.reason);
      showVisualError(`Unhandled Promise Rejection`, `Reason:\n${reasonDetails}`);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      // Reset to default when leaving dashboard
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (status === "loading") {
    return (
      <Loading variant="fullscreen" message="Loading dashboard..." size="lg" />
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:z-30 bg-transparent",
          isMobileMenuOpen ? "translate-x-0 bg-white shadow-xl w-64" : "-translate-x-full lg:translate-x-0",
          !isMobile && isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full min-w-0 overflow-hidden transition-all duration-300">
        <DashboardHeader
          toggleMobileMenu={toggleMobileMenu}
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth relative">
          {/* Ambient Background Glow Blobs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
