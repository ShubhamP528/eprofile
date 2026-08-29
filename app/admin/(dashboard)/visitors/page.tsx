import { prisma } from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { getCardUrl } from "@/lib/utils/card-url";
import JsonViewer from "@/components/admin/JsonViewer";
import TrafficChart from "@/components/admin/TrafficChart";
import { 
  Zap, 
  FileText, 
  ChevronRight, 
  Activity, 
  Users, 
  Moon, 
  Smartphone,
  Globe 
} from "lucide-react";

export const revalidate = 0; // Don't cache admin visitor page

interface Props {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function AdminVisitorsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1");
  const q = resolvedSearchParams.q || "";
  const limit = 20;
  const skip = (page - 1) * limit;

  // 1. Fetch visitor data with search filter for name, email, browser, or country
  const whereClause = q
    ? {
        OR: [
          { visitorName: { contains: q, mode: "insensitive" as const } },
          { visitorEmail: { contains: q, mode: "insensitive" as const } },
          { visitorPhone: { contains: q, mode: "insensitive" as const } },
          { browser: { contains: q, mode: "insensitive" as const } },
          { os: { contains: q, mode: "insensitive" as const } },
          { country: { contains: q, mode: "insensitive" as const } },
          { card: { username: { contains: q, mode: "insensitive" as const } } },
        ],
      }
    : undefined;

  const [visits, totalVisits, allViewsForStats] = await Promise.all([
    prisma.cardView.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        card: {
          select: {
            username: true,
            title: true,
          },
        },
      },
      take: limit,
      skip: skip,
    }),
    prisma.cardView.count({ where: whereClause }),
    // Fetch last 1000 views for building charts & statistics aggregate data
    prisma.cardView.findMany({
      orderBy: { createdAt: "desc" },
      take: 1000,
      select: {
        createdAt: true,
        browser: true,
        os: true,
        device: true,
        country: true,
        visitorId: true,
        ipAddress: true,
        telemetry: true,
      },
    }),
  ]);

  // 1.1. Extract unique visitor IDs to resolve their full journey timelines
  const visitorIds = Array.from(new Set(visits.map((v) => v.visitorId).filter(Boolean)));

  const [allPathVisits, allPathClicks] = await Promise.all([
    prisma.cardView.findMany({
      where: { visitorId: { in: visitorIds } },
      orderBy: { createdAt: "asc" },
      include: {
        card: {
          select: { username: true, title: true },
        },
      },
    }),
    prisma.buttonClick.findMany({
      where: { visitorId: { in: visitorIds } },
      orderBy: { createdAt: "asc" },
      include: {
        card: {
          select: { username: true, title: true },
        },
      },
    }),
  ]);

  // Map each visitorId to a chronological timeline of views and actions
  const visitorJourneys = visitorIds.reduce((acc, vid) => {
    const pathVisits = allPathVisits
      .filter((v) => v.visitorId === vid)
      .map((v) => ({
        type: "VIEW",
        timestamp: v.createdAt,
        label: v.card ? `Viewed Card (@${v.card.username})` : "Main Portal",
        meta: v.referrer ? `Referrer: ${v.referrer}` : "Direct Visit",
        path: v.card ? `/${v.card.username}` : "/",
      }));

    const pathClicks = allPathClicks
      .filter((c) => c.visitorId === vid)
      .map((c) => ({
        type: "CLICK",
        timestamp: c.createdAt,
        label: `Clicked ${c.buttonType} Button`,
        meta: c.card ? `On Card: @${c.card.username}` : "",
        path: c.card ? `/${c.card.username}` : "/",
      }));

    // Sort chronologically
    const timeline = [...pathVisits, ...pathClicks].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );

    acc[vid] = timeline;
    return acc;
  }, {} as Record<string, any[]>);

  const totalPages = Math.ceil(totalVisits / limit);

  // 2. Compute aggregated metrics from last 1000 views for charts
  const stats = {
    browsers: {} as Record<string, number>,
    os: {} as Record<string, number>,
    devices: {} as Record<string, number>,
    countries: {} as Record<string, number>,
    uniqueVisitors: new Set<string>(),
    darkThemeCount: 0,
    touchScreenCount: 0,
  };

  allViewsForStats.forEach((v) => {
    // Unique visitors
    if (v.visitorId) stats.uniqueVisitors.add(v.visitorId);

    // Browsers
    const browser = v.browser || "Unknown";
    stats.browsers[browser] = (stats.browsers[browser] || 0) + 1;

    // OS
    const os = v.os || "Unknown";
    stats.os[os] = (stats.os[os] || 0) + 1;

    // Devices
    const device = v.device || "Desktop";
    stats.devices[device] = (stats.devices[device] || 0) + 1;

    // Countries
    const country = v.country || "Unknown";
    stats.countries[country] = (stats.countries[country] || 0) + 1;

    // Telemetry specifics
    if (v.telemetry && typeof v.telemetry === "object" && !Array.isArray(v.telemetry)) {
      const tel = v.telemetry as Record<string, any>;
      if (tel.accessibility?.prefersDarkMode) stats.darkThemeCount++;
      if (tel.touchPoints && tel.touchPoints > 0) stats.touchScreenCount++;
    }
  });

  const totalViewsSample = allViewsForStats.length || 1;

  // Helper to format distributions as sorted percentages
  const getPercentageDistribution = (dict: Record<string, number>) => {
    return Object.entries(dict)
      .map(([name, count]) => ({
        name,
        count,
        percentage: ((count / totalViewsSample) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const topBrowsers = getPercentageDistribution(stats.browsers);
  const topOS = getPercentageDistribution(stats.os);
  const topDevices = getPercentageDistribution(stats.devices);
  const topCountries = getPercentageDistribution(stats.countries);

  // 2.1. Group last 7 days of views chronologically for trend graph
  const trendData = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - idx));
    const dateString = d.toISOString().split("T")[0]; // YYYY-MM-DD
    const label = d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
    
    // Count views matching this date string
    const value = allViewsForStats.filter((v) => {
      const viewDate = new Date(v.createdAt).toISOString().split("T")[0];
      return viewDate === dateString;
    }).length;

    return { label, value };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Visitor Telemetry & Analytics</h2>
        <p className="text-sm text-gray-500">
          Real-time diagnostics, device profile metrics, and returned identity tracking.
        </p>
      </div>

      {/* Aggregate Overview Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition duration-200">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Logged Views</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{totalVisits}</h3>
            <span className="text-[11px] text-gray-400">All registered system page loads</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition duration-200">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Est. Unique Visitors</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">{stats.uniqueVisitors.size}</h3>
            <span className="text-[11px] text-gray-400">Based on unique visitor signature</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition duration-200">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Dark Theme Users</p>
            <h3 className="text-3xl font-bold text-indigo-600 mt-2">
              {((stats.darkThemeCount / totalViewsSample) * 100).toFixed(0)}%
            </h3>
            <span className="text-[11px] text-gray-400">{stats.darkThemeCount} of last 1000 visits</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Moon className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition duration-200">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Touchscreen Capability</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-2">
              {((stats.touchScreenCount / totalViewsSample) * 100).toFixed(0)}%
            </h3>
            <span className="text-[11px] text-gray-400">{stats.touchScreenCount} of last 1000 visits</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Smartphone className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Traffic Trend Chart */}
      <TrafficChart data={trendData} />

      {/* Breakdown Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Browsers Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h4 className="font-semibold text-gray-900 text-sm border-b pb-2">Top Browsers</h4>
          <div className="space-y-3">
            {topBrowsers.map((b) => (
              <div key={b.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-gray-600">
                  <span>{b.name}</span>
                  <span>{b.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${b.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Systems Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h4 className="font-semibold text-gray-900 text-sm border-b pb-2">Top Operating Systems</h4>
          <div className="space-y-3">
            {topOS.map((o) => (
              <div key={o.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-gray-600">
                  <span>{o.name}</span>
                  <span>{o.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${o.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h4 className="font-semibold text-gray-900 text-sm border-b pb-2">Top Devices</h4>
          <div className="space-y-3">
            {topDevices.map((d) => (
              <div key={d.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-gray-600">
                  <span>{d.name}</span>
                  <span>{d.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${d.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countries Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h4 className="font-semibold text-gray-900 text-sm border-b pb-2">Top Countries</h4>
          <div className="space-y-3">
            {topCountries.map((c) => (
              <div key={c.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-gray-600">
                  <span>{c.name}</span>
                  <span>{c.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: `${c.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="space-y-4">
        {/* Search Filter */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-2">
          <form method="GET" action="/admin/visitors" className="flex gap-2 w-full">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Filter by name, email, card, browser, OS, country..."
              className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
            >
              Filter
            </button>
            {q && (
              <a
                href="/admin/visitors"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition flex items-center justify-center"
              >
                Clear
              </a>
            )}
          </form>
        </div>

        {/* Visitor Session Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Visitor & Profile</th>
                  <th className="px-6 py-4">Target Page</th>
                  <th className="px-6 py-4">Environment Profile</th>
                  <th className="px-6 py-4">Time & Region</th>
                  <th className="px-6 py-4 text-center">Hardware Detail</th>
                  <th className="px-6 py-4 text-right">Data Logs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {visits.map((visit) => {
                  const targetPage = visit.card
                    ? `Card (@${visit.card.username})`
                    : "Main Portal";
                  const targetUrl = visit.card
                    ? getCardUrl(visit.card.username)
                    : "/";
                  const journey = visitorJourneys[visit.visitorId] || [];

                  // Extract telemetry parameters
                  const tel = visit.telemetry && typeof visit.telemetry === "object" && !Array.isArray(visit.telemetry)
                    ? (visit.telemetry as Record<string, any>)
                    : null;

                  const ram = tel?.deviceMemory ? `${tel.deviceMemory} GB` : "N/A";
                  const cores = tel?.hardwareConcurrency ? `${tel.hardwareConcurrency} Cores` : "N/A";
                  const netSpeed = tel?.network?.type ? `${tel.network.type.toUpperCase()}` : "N/A";

                  return (
                    <tr key={visit.id} className="hover:bg-gray-50 transition text-gray-700">
                      <td className="px-6 py-4">
                        {visit.visitorName ? (
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                              👤 {visit.visitorName}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">{visit.visitorEmail || "No Email"}</div>
                            {visit.visitorPhone && <div className="text-[10px] text-gray-400">{visit.visitorPhone}</div>}
                          </div>
                        ) : (
                          <div>
                            <span className="text-xs font-medium text-gray-500 italic">Anonymous Visitor</span>
                            <div className="text-[10px] font-mono text-gray-400 mt-1">ID: {visit.visitorId.slice(0, 10)}...</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {targetPage}
                        </a>
                        <div className="text-xs text-gray-400 mt-1">Ref: {visit.referrer ? new URL(visit.referrer).hostname : "Direct"}</div>
                        
                        {/* Session Journey Flow Timeline */}
                        {journey.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 max-w-sm p-1.5 bg-gray-50/50 rounded-lg border border-gray-100/50 shadow-inner">
                            {journey.slice(0, 4).map((step, idx) => {
                              const isClick = step.type === "CLICK";
                              return (
                                <React.Fragment key={idx}>
                                  {idx > 0 && (
                                    <ChevronRight className="w-3 h-3 text-gray-400 animate-pulse" />
                                  )}
                                  <span 
                                    className={`inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-md font-medium tracking-wide border transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 cursor-help ${
                                      isClick 
                                        ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-amber-100/50 hover:shadow" 
                                        : "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100/80 hover:shadow-indigo-100/50 hover:shadow"
                                    }`}
                                    title={`${step.label} ${step.meta ? `(${step.meta})` : ""}`}
                                  >
                                    {isClick ? (
                                      <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                                    ) : (
                                      <FileText className="w-2.5 h-2.5 text-indigo-500" />
                                    )}
                                    <span className="truncate max-w-[80px]">{step.path}</span>
                                  </span>
                                </React.Fragment>
                              );
                            })}
                            {journey.length > 4 && (
                              <span className="text-[9px] text-gray-400 font-semibold pl-1 animate-pulse hover:text-gray-600 transition cursor-pointer" title="Click View Details JSON to see complete session timeline">
                                +{journey.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700 font-medium">
                            {visit.browser || "Unknown"}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                            {visit.os || "Unknown"}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-xs text-gray-600">
                            {visit.screenResolution || "Unknown Screen"}
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1.5 font-mono overflow-hidden truncate max-w-[200px]" title={visit.userAgent || ""}>
                          {visit.userAgent}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-900 font-medium">
                          {new Date(visit.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {new Date(visit.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-xs text-gray-600 font-semibold mt-1 flex flex-col gap-0.5">
                          <span>🌍 {visit.country || "Unknown"}</span>
                          {(visit.city || visit.region) && (
                            <span className="text-[10px] text-gray-500 font-medium font-sans">
                              📍 {[visit.city, visit.region].filter(Boolean).join(", ")}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-xs text-gray-900">
                          {cores} CPU / {ram} RAM
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1">
                          Net: {netSpeed} | {tel?.accessibility?.prefersDarkMode ? "🌙 Dark" : "☀️ Light"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <JsonViewer
                          data={{ 
                            visitDetails: {
                              id: visit.id,
                              visitorId: visit.visitorId,
                              visitorName: visit.visitorName,
                              visitorEmail: visit.visitorEmail,
                              visitorPhone: visit.visitorPhone,
                              browser: visit.browser,
                              os: visit.os,
                              device: visit.device,
                              screenResolution: visit.screenResolution,
                              language: visit.language,
                              timezone: visit.timezone,
                              country: visit.country,
                              city: visit.city,
                              region: visit.region,
                              createdAt: visit.createdAt,
                            },
                            telemetry: tel,
                            sessionJourney: journey
                          }}
                          title={visit.visitorName ? `Details: ${visit.visitorName}` : "Anonymous Session Details"}
                        />
                      </td>
                    </tr>
                  );
                })}
                {visits.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No visits recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Showing page {page} of {totalPages} ({totalVisits} entries)
              </span>
              <div className="flex gap-2">
                <Link
                  href={`/admin/visitors?page=${Math.max(1, page - 1)}${q ? `&q=${q}` : ""}`}
                  className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition ${
                    page === 1 ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  Previous
                </Link>
                <Link
                  href={`/admin/visitors?page=${Math.min(totalPages, page + 1)}${q ? `&q=${q}` : ""}`}
                  className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition ${
                    page === totalPages ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  Next
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
