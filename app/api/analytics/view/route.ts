import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseUserAgent } from "@/lib/utils/user-agent";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    
    // Parse JSON body. Since telemetry might send plain text beacon, handle both cases
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json") || contentType.includes("text/plain")) {
      const text = await request.text();
      if (text) {
        body = JSON.parse(text);
      }
    } else {
      body = await request.json();
    }

    const {
      pathname,
      referrer,
      screenResolution,
      viewportSize,
      colorDepth,
      language,
      timezone,
      cookiesEnabled,
      touchPoints,
      pdfViewerEnabled,
      hardwareConcurrency,
      deviceMemory,
      networkType,
      networkDownlink,
      networkRtt,
      networkSaveData,
      prefersDarkMode,
      prefersReducedMotion,
      prefersContrast,
      visitorName,
      visitorEmail,
      visitorPhone,
    } = body;

    // 1. Resolve visitor IP Address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "127.0.0.1";
    
    // Create privacy-safe SHA256 hashed IP for deduplication/session tracking
    const ipAddress = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);

    // 2. Resolve Geolocation using standard hosting/proxy headers
    const country = request.headers.get("x-vercel-ip-country") || 
                    request.headers.get("cf-ipcountry") || 
                    request.headers.get("x-country-code") || 
                    "Unknown";

    const city = request.headers.get("x-vercel-ip-country-city") || 
                 request.headers.get("cf-ipcity") || 
                 request.headers.get("x-real-city") || 
                 null;

    const region = request.headers.get("x-vercel-ip-country-region") || 
                   request.headers.get("cf-region") || 
                   request.headers.get("x-real-region") || 
                   null;

    // 3. Parse User-Agent
    const userAgent = request.headers.get("user-agent") || "";
    const parsedUa = parseUserAgent(userAgent);

    // Generate unique visitorId based on IP and User-Agent
    const visitorId = crypto.createHash("sha256").update(`${ip}-${userAgent}`).digest("hex").slice(0, 32);

    // 4. Resolve Card ID if path belongs to a card username
    let cardId: string | null = null;
    
    // If cardId is sent directly in request
    if (body.cardId) {
      cardId = body.cardId;
    } else if (pathname && pathname.startsWith("/") && pathname.length > 1) {
      // Extract username (excluding common routes)
      const segments = pathname.split("/").filter(Boolean);
      const possibleUsername = segments[0];
      const excludedRoutes = ["about", "pricing", "contact", "dashboard", "admin", "login", "register", "features", "terms", "privacy", "api"];
      
      if (possibleUsername && !excludedRoutes.includes(possibleUsername)) {
        const card = await prisma.card.findUnique({
          where: { username: possibleUsername },
          select: { id: true }
        });
        if (card) {
          cardId = card.id;
        }
      }
    }

    // 5. Structure full raw telemetry payload to save
    const telemetryPayload = {
      viewportSize,
      colorDepth,
      cookiesEnabled,
      touchPoints,
      pdfViewerEnabled,
      hardwareConcurrency,
      deviceMemory,
      network: {
        type: networkType,
        downlink: networkDownlink,
        rtt: networkRtt,
        saveData: networkSaveData,
      },
      accessibility: {
        prefersDarkMode,
        prefersReducedMotion,
        prefersContrast,
      },
      clientTimezoneOffset: body.clientTimezoneOffset,
      rawUserAgent: userAgent,
      rawIp: process.env.NODE_ENV === "development" ? ip : undefined, // only expose IP in dev environment
    };

    // 6. Record visitor details (fire and forget to not block client)
    prisma.cardView.create({
      data: {
        cardId,
        visitorId,
        referrer: referrer || null,
        userAgent: userAgent || null,
        country: country || null,
        city: city || null,
        region: region || null,
        browser: parsedUa.browser,
        os: parsedUa.os,
        device: parsedUa.device,
        screenResolution: screenResolution || null,
        language: language || null,
        timezone: timezone || null,
        ipAddress,
        visitorName: visitorName || null,
        visitorEmail: visitorEmail || null,
        visitorPhone: visitorPhone || null,
        telemetry: telemetryPayload
      }
    }).catch(error => {
      console.error("Failed to record telemetry view:", error);
    });

    return NextResponse.json({ success: true, message: "Telemetry recorded" });
  } catch (error) {
    console.error("Error logging client telemetry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
