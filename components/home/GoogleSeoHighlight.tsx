"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  TrendingUp, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Code2, 
  Clock, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Star
} from "lucide-react";

export default function GoogleSeoHighlight() {
  const [activeQuery, setActiveQuery] = useState("sarah jenkins creative director");

  const sampleQueries = [
    "sarah jenkins creative director",
    "dr rahul sharma cardiologist mumbai",
    "arjun mehta corporate lawyer delhi",
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32 text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Built-In Search Engine Domination</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Rank at the <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-400 bg-clip-text text-transparent">Top of Google</span> in 10–20 Days
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Every digital visiting card created on eProfile is deeply engineered for search engine performance. With automated <strong>Schema.org JSON-LD</strong>, instant <strong>XML sitemaps</strong>, and ultra-fast <strong>Server-Side Rendering</strong>, your personal brand climbs to Page 1 on Google within 10–20 days (based on Google crawling cycles).
          </p>
        </div>

        {/* Interactive Google Search Mockup & Visual Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20">
          {/* Left Column: Live Google Search SERP Simulation */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md relative">
            {/* Top Bar / Google Header simulation */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight">
                  <span className="text-blue-400">G</span>
                  <span className="text-red-400">o</span>
                  <span className="text-amber-400">o</span>
                  <span className="text-blue-400">g</span>
                  <span className="text-emerald-400">l</span>
                  <span className="text-red-400">e</span>
                </span>
                <span className="text-xs text-slate-400 font-medium ml-2">Search Preview</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Rank #1 Verified</span>
              </div>
            </div>

            {/* Interactive Search Query Bar */}
            <div className="relative mb-6">
              <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 gap-3 shadow-inner">
                <Search className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-sm font-mono text-slate-200 truncate">{activeQuery}</span>
                <span className="ml-auto text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Enter
                </span>
              </div>
              
              {/* Quick Query Switchers */}
              <div className="flex flex-wrap gap-2 mt-3 items-center">
                <span className="text-xs text-slate-400">Try searching:</span>
                {sampleQueries.map((query) => (
                  <button
                    key={query}
                    onClick={() => setActiveQuery(query)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      activeQuery === query
                        ? "bg-indigo-600/30 border-indigo-500 text-indigo-200"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    "{query}"
                  </button>
                ))}
              </div>
            </div>

            {/* Google SERP Card #1 Result */}
            <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all hover:border-indigo-500/70">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full pointer-events-none" />

              {/* URL & Breadcrumb */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                  e
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-300 font-medium">eProfile.cv</span>
                  <span className="text-[11px] text-slate-400 font-mono truncate">https://www.eprofile.cv › {activeQuery.split(" ")[0].toLowerCase()}</span>
                </div>
              </div>

              {/* Title & Clickable Headline */}
              <h3 className="text-lg sm:text-xl font-bold text-sky-400 hover:underline cursor-pointer flex items-center gap-1.5 mt-1">
                {activeQuery.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} - Digital Visiting Card & Portfolio | eProfile
                <ExternalLink className="w-3.5 h-3.5 text-sky-400/80 inline" />
              </h3>

              {/* Rich Snippet Star Rating & Job Title */}
              <div className="flex items-center gap-2 my-2 text-xs text-amber-300">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-slate-200">5.0 (24 reviews)</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 font-medium">Verified Professional</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-semibold">Available for Hire</span>
              </div>

              {/* Meta Description snippet */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect with {activeQuery.split(" ")[0].toUpperCase()} on eProfile. Instant phone calling, WhatsApp messaging, portfolio gallery, verified customer reviews, and direct payment options.
              </p>

              {/* Sitelinks for Quick Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-center hover:border-slate-700 transition-colors cursor-pointer">
                  <p className="text-xs font-bold text-sky-400">📞 Call Directly</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Instant Dial</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-center hover:border-slate-700 transition-colors cursor-pointer">
                  <p className="text-xs font-bold text-sky-400">💼 Services & Rates</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">View Pricing</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-center hover:border-slate-700 transition-colors cursor-pointer">
                  <p className="text-xs font-bold text-sky-400">🎨 Portfolio Gallery</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Projects & Files</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-center hover:border-slate-700 transition-colors cursor-pointer">
                  <p className="text-xs font-bold text-sky-400">💬 WhatsApp Chat</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">One-Click Lead</p>
                </div>
              </div>
            </div>

            {/* Bottom indexing speed badge */}
            <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Typical Google Indexing: <strong>10–20 Days</strong></span>
              </div>
              <span className="text-[11px] text-slate-500">Core Web Vitals: 99/100</span>
            </div>
          </div>

          {/* Right Column: Key SEO Pillars & Timeline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 hover:bg-slate-800/90 transition-all shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Automated Schema.org JSON-LD
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Googlebot understands who you are, your skills, phone number, and service offerings through rich structured semantic graphs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 hover:bg-slate-800/90 transition-all shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400 flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Server-Side Rendered (SSR)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Pre-rendered HTML at edge servers guarantees 100% crawl accessibility without relying on client-side JS rendering delays.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 hover:bg-slate-800/90 transition-all shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Instant XML Sitemap Sync
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    The moment you create or modify your digital card, our automated sitemap alerts Googlebot for high-frequency recrawling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 10-20 Day Crawl Journey Timeline */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              How Your Card Ranks on Google in 10–20 Days
            </h3>
            <p className="text-sm text-slate-400">
              The automated crawler pipeline working 24/7 behind every eProfile card.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative group hover:border-indigo-500/50 transition-all">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-400 font-bold text-xs flex items-center justify-center mb-4">
                01
              </div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-1">Days 1 – 3</span>
              <h4 className="text-base font-bold text-white mb-2">Publish & Sitemap Ingestion</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your profile is published with semantic tags, canonical URLs, and immediately injected into the live XML sitemap feed for Googlebot discovery.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative group hover:border-violet-500/50 transition-all">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500 text-violet-400 font-bold text-xs flex items-center justify-center mb-4">
                02
              </div>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider block mb-1">Days 4 – 10</span>
              <h4 className="text-base font-bold text-white mb-2">Schema Parsing & Entity Index</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Search engine crawlers index your Person entity, match keywords, services, and locations, building authority for your exact name and profession.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative group hover:border-emerald-500/50 transition-all">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold text-xs flex items-center justify-center mb-4">
                03
              </div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">Days 10 – 20</span>
              <h4 className="text-base font-bold text-white mb-2">Top SERP Placement</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your card establishes top organic ranking on Google search results, complete with rich snippets, star ratings, and one-tap contact buttons.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
            >
              <span>Create Your Google-Ranked Card Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
