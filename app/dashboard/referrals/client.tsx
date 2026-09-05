"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { SkeletonBase } from "@/components/ui/skeleton/skeleton-base";

interface ReferralInfo {
  code: string;
  link: string;
  rewardDays: number;
  stats: {
    pending: number;
    rewarded: number;
    total: number;
  };
}

export default function ReferralsClient() {
  const [info, setInfo] = useState<ReferralInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await apiClient.getReferralInfo();
        if (response.success) {
          setInfo(response.data as ReferralInfo);
        }
      } catch (error) {
        console.error("Failed to load referral info:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleCopy = async () => {
    if (!info) return;
    try {
      await navigator.clipboard.writeText(info.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy referral link:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
        <div>
          <SkeletonBase width="10rem" height="1.75rem" className="mb-2" />
          <SkeletonBase width="18rem" height="1.25rem" />
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <SkeletonBase width="100%" height="3rem" />
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
        <p className="text-sm text-gray-600">
          Could not load your referral link. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Refer & Earn
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Invite a friend to eProfile. When they create their first card, you
          get {info.rewardDays} days of Pro access, free.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm">
        <label className="block text-xs font-bold text-gray-700 mb-2">
          Your referral link
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            readOnly
            value={info.link}
            onFocus={(e) => e.target.select()}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 text-sm text-gray-700 font-mono"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl text-xs hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer whitespace-nowrap"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Share this link anywhere — WhatsApp, Instagram bio, email signature.
          Anyone who signs up through it and creates a card earns you the
          reward automatically.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm text-center">
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {info.stats.total}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Total referred
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm text-center">
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {info.stats.rewarded}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Rewarded
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm text-center col-span-2 sm:col-span-1">
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
            {info.stats.pending}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Awaiting first card
          </p>
        </div>
      </div>
    </div>
  );
}
