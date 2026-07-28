import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

export const revalidate = 0; // Don't cache admin dashboard

export default async function AdminDashboardPage() {
  const [
    totalUsers,
    totalCards,
    totalViews,
    premiumCount,
    recentUsers,
    recentCards,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.card.count(),
    prisma.cardView.count(),
    prisma.user.count({
      where: {
        subscription: {
          in: ["STANDARD", "PRO"],
        },
      },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        subscription: true,
      },
    }),
    prisma.card.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        title: true,
        createdAt: true,
        isPublic: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
        <p className="text-sm text-gray-500">
          Monitor your platform's growth, registration metrics, and activity.
        </p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{totalUsers}</h3>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-4 inline-flex items-center gap-1"
          >
            View directory →
          </Link>
        </div>

        {/* Total Cards */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Cards</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{totalCards}</h3>
          </div>
          <Link
            href="/admin/cards"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-4 inline-flex items-center gap-1"
          >
            View all cards →
          </Link>
        </div>

        {/* Total Views */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Card Views</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{totalViews}</h3>
          </div>
          <span className="text-xs text-gray-400 mt-4">Lifetime views</span>
        </div>

        {/* Premium Conversions */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Premium Users</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">{premiumCount}</h3>
          </div>
          <span className="text-xs text-gray-400 mt-4">
            Conversion Rate: {totalUsers > 0 ? ((premiumCount / totalUsers) * 100).toFixed(1) : 0}%
          </span>
        </div>
      </div>

      {/* Main Stats tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Recent Users</h3>
            <Link href="/admin/users" className="text-xs font-medium text-blue-600 hover:underline">
              See all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentUsers.map((user) => (
              <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{user.name || "Unnamed User"}</h4>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      user.subscription === "FREE"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {user.subscription}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {recentUsers.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-500">No users found.</div>
            )}
          </div>
        </div>

        {/* Recent Cards Created */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Recent Cards</h3>
            <Link href="/admin/cards" className="text-xs font-medium text-blue-600 hover:underline">
              See all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentCards.map((card) => (
              <div key={card.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{card.title}</h4>
                  <p className="text-xs text-gray-500">@{card.username} • {card.user?.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      card.isPublic ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {card.isPublic ? "Public" : "Private"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(card.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {recentCards.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-500">No cards found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
