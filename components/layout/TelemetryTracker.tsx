"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function TelemetryTracker() {
  const pathname = usePathname();
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    // Prevent double execution on initial render and ignore admin traffic
    if (pathname.startsWith("/admin") || pathname === lastPathname.current) {
      return;
    }
    lastPathname.current = pathname;

    // Collect telemetry variables safely in standard browser sandbox environment
    const getTelemetryData = () => {
      const data: Record<string, any> = {
        pathname,
        referrer: document.referrer || undefined,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        colorDepth: window.screen.colorDepth,
        language: navigator.language || (navigator as any).userLanguage || "unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        cookiesEnabled: navigator.cookieEnabled,
        touchPoints: navigator.maxTouchPoints || 0,
        pdfViewerEnabled: typeof navigator.pdfViewerEnabled === "boolean" ? navigator.pdfViewerEnabled : undefined,
      };

      // Add Hardware features (RAM & CPU cores)
      if (navigator.hardwareConcurrency) {
        data.hardwareConcurrency = navigator.hardwareConcurrency;
      }
      if ((navigator as any).deviceMemory) {
        data.deviceMemory = (navigator as any).deviceMemory;
      }

      // Add Network parameters if available
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn) {
        data.networkType = conn.effectiveType || undefined;
        data.networkDownlink = conn.downlink || undefined;
        data.networkRtt = conn.rtt || undefined;
        data.networkSaveData = conn.saveData || false;
      }

      // Add User Accessibility Preferences
      try {
        data.prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        data.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        const prefersMoreContrast = window.matchMedia("(prefers-contrast: more)").matches;
        const prefersLessContrast = window.matchMedia("(prefers-contrast: less)").matches;
        data.prefersContrast = prefersMoreContrast ? "more" : prefersLessContrast ? "less" : "no-preference";
      } catch (e) {
        // Fallback for older browsers
      }

      // 5. Visitor Identity Resolution: Check localStorage for any pre-filled profile
      try {
        const storedProfile = localStorage.getItem("eprofile_visitor_profile");
        if (storedProfile) {
          const profile = JSON.parse(storedProfile);
          data.visitorName = profile.name || undefined;
          data.visitorEmail = profile.email || undefined;
          data.visitorPhone = profile.phone || undefined;
        }
      } catch (e) {
        console.warn("Could not read visitor profile from localStorage:", e);
      }

      return data;
    };

    const sendTelemetry = async () => {
      try {
        const payload = getTelemetryData();
        
        // Use Beacon API if navigating away or standard fetch
        const telemetryUrl = "/api/analytics/view";
        if (typeof navigator.sendBeacon === "function") {
          const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
          navigator.sendBeacon(telemetryUrl, blob);
        } else {
          await fetch(telemetryUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            keepalive: true, // ensure request completes even if page closes
          });
        }
      } catch (error) {
        // Fail silently to avoid interrupting the client experience
      }
    };

    // Run asynchronously to not block initial page load rendering
    const timer = setTimeout(sendTelemetry, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
