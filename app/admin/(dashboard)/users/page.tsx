import { prisma } from "@/lib/prisma";
import React from "react";

export const revalidate = 0;

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q || "";

  const users = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      subscription: true,
      _count: {
        select: {
          cards: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">User Directory</h2>
          <p className="text-sm text-gray-500">
            Search and view details of all registered users.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <form method="GET" action="/admin/users" className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by name or email..."
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
              href="/admin/users"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition flex items-center justify-center"
            >
              Clear
            </a>
          )}
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Name / Email</th>
                <th className="px-6 py-4">Registered Date</th>
                <th className="px-6 py-4">Subscription</th>
                <th className="px-6 py-4 text-center">Cards Owned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{user.name || "Unnamed"}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                        user.subscription === "FREE"
                          ? "bg-gray-50 text-gray-600 border-gray-200"
                          : user.subscription === "STANDARD"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-purple-50 text-purple-700 border-purple-200"
                      }`}
                    >
                      {user.subscription}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">
                    {user._count.cards}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No users found matching "{q}".
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
