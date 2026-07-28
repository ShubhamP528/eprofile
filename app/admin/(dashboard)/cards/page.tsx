import { prisma } from "@/lib/prisma";
import { getCardUrl } from "@/lib/utils/card-url";
import React from "react";

export const revalidate = 0;

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminCardsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q || "";

  const cards = await prisma.card.findMany({
    where: q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { username: { contains: q, mode: "insensitive" } },
            { user: { email: { contains: q, mode: "insensitive" } } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      title: true,
      isPublic: true,
      createdAt: true,
      user: {
        select: {
          email: true,
          name: true,
        },
      },
      _count: {
        select: {
          cardViews: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Card Registry</h2>
        <p className="text-sm text-gray-500">
          Monitor all user-created digital visiting cards, check their views, and manage visibility.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <form method="GET" action="/admin/cards" className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by title, username, or owner email..."
            className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
          >
            Search
          </button>
          {q && (
            <a
              href="/admin/cards"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition flex items-center justify-center"
            >
              Clear
            </a>
          )}
        </form>
      </div>

      {/* Cards Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Card Profile</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Views</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cards.map((card) => {
                const cardUrl = getCardUrl(card.username);
                return (
                  <tr key={card.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{card.title}</div>
                      <div className="text-xs text-blue-600 font-medium">@{card.username}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{card.user?.name || "Unnamed"}</div>
                      <div className="text-xs text-gray-500">{card.user?.email || "No Email"}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(card.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                          card.isPublic
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {card.isPublic ? "Public" : "Private"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-900">
                      {card._count.cardViews}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={cardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        View Card ↗
                      </a>
                    </td>
                  </tr>
                );
              })}
              {cards.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No cards found matching "{q}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
