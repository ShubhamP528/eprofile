/**
 * Lightweight, dependency-free utility to parse basic browser, OS, and device details from a User-Agent string.
 */
export interface ParsedUserAgent {
  browser: string;
  os: string;
  device: string;
}

export function parseUserAgent(userAgent: string): ParsedUserAgent {
  if (!userAgent) {
    return { browser: "Unknown", os: "Unknown", device: "Desktop" };
  }

  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  const ua = userAgent.toLowerCase();

  // 1. Detect Operating System
  if (ua.includes("windows nt 10.0")) {
    os = "Windows 10/11";
  } else if (ua.includes("windows nt 6.3")) {
    os = "Windows 8.1";
  } else if (ua.includes("windows nt 6.2")) {
    os = "Windows 8";
  } else if (ua.includes("windows nt 6.1")) {
    os = "Windows 7";
  } else if (ua.includes("windows")) {
    os = "Windows";
  } else if (ua.includes("macintosh") || ua.includes("mac os x")) {
    os = "macOS";
  } else if (ua.includes("android")) {
    os = "Android";
    device = "Mobile";
  } else if (ua.includes("iphone")) {
    os = "iOS (iPhone)";
    device = "Mobile";
  } else if (ua.includes("ipad")) {
    os = "iOS (iPad)";
    device = "Tablet";
  } else if (ua.includes("linux")) {
    os = "Linux";
  }

  // 2. Detect Device Type (refined)
  if (ua.includes("mobile") || ua.includes("phone")) {
    device = "Mobile";
  } else if (ua.includes("tablet") || ua.includes("ipad") || ua.includes("playbook") || ua.includes("kindle")) {
    device = "Tablet";
  }

  // 3. Detect Browser Name
  if (ua.includes("edg/")) {
    browser = "Edge";
  } else if (ua.includes("opr/") || ua.includes("opera")) {
    browser = "Opera";
  } else if (ua.includes("chrome") && !ua.includes("chromium")) {
    browser = "Chrome";
  } else if (ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium")) {
    browser = "Safari";
  } else if (ua.includes("firefox")) {
    browser = "Firefox";
  } else if (ua.includes("msie") || ua.includes("trident/")) {
    browser = "Internet Explorer";
  }

  return { browser, os, device };
}
