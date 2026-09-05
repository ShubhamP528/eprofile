"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

const STORAGE_KEY = "eprofile_attribution";
const SYNCED_KEY = "eprofile_attribution_synced";
const REFERRAL_STORAGE_KEY = "eprofile_referral_code";
const REFERRAL_SYNCED_KEY = "eprofile_referral_synced";

interface StoredAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPage?: string;
}

/**
 * Captures first-touch acquisition data (UTM params, referrer, landing page)
 * on the visitor's very first page load, then syncs it to their account once
 * they have an authenticated session — whether that came from the credentials
 * signup form or Google OAuth. Runs on every route since either path can be
 * the entry point, but only ever captures/syncs once per browser.
 */
export default function AttributionCapture() {
  const { status } = useSession();

  // Capture on first visit, before any signup has happened.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;

      const params = new URLSearchParams(window.location.search);
      const attribution: StoredAttribution = {
        utmSource: params.get("utm_source") || undefined,
        utmMedium: params.get("utm_medium") || undefined,
        utmCampaign: params.get("utm_campaign") || undefined,
        utmTerm: params.get("utm_term") || undefined,
        utmContent: params.get("utm_content") || undefined,
        referrer: document.referrer || undefined,
        landingPage: window.location.pathname,
      };

      const hasAnyValue = Object.values(attribution).some(Boolean);
      if (hasAnyValue) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
      }

      // Referral code is tracked separately since it links two real accounts,
      // not just a descriptive tag - kept as its own first-touch value.
      if (!localStorage.getItem(REFERRAL_STORAGE_KEY)) {
        const ref = params.get("ref");
        if (ref) localStorage.setItem(REFERRAL_STORAGE_KEY, ref);
      }
    } catch {
      // localStorage unavailable (private mode, etc.) - skip attribution silently
    }
  }, []);

  // Once logged in, sync the captured attribution to the account (once).
  useEffect(() => {
    if (status !== "authenticated") return;

    try {
      if (localStorage.getItem(SYNCED_KEY)) return;
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      localStorage.setItem(SYNCED_KEY, "1"); // set eagerly to avoid duplicate sends

      fetch("/api/user/attribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: stored,
      }).catch(() => {
        // Best-effort - a failed sync just means we miss attribution for this user
      });
    } catch {
      // localStorage unavailable - skip sync silently
    }
  }, [status]);

  // Once logged in, link this account to whoever referred them (once).
  useEffect(() => {
    if (status !== "authenticated") return;

    try {
      if (localStorage.getItem(REFERRAL_SYNCED_KEY)) return;
      const code = localStorage.getItem(REFERRAL_STORAGE_KEY);
      if (!code) return;

      localStorage.setItem(REFERRAL_SYNCED_KEY, "1");

      fetch("/api/referrals/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }).catch(() => {
        // Best-effort - a failed link just means this referral goes untracked
      });
    } catch {
      // localStorage unavailable - skip sync silently
    }
  }, [status]);

  return null;
}
