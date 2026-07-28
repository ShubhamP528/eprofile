import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthorized = await isAdmin();
  if (!isAuthorized) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              eProfile Admin
            </span>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            📊 Dashboard Overview
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            👥 User Directory
          </Link>
          <Link
            href="/admin/cards"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            📇 Card Registry
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
          >
            🏠 Return to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-gray-200 bg-white flex items-center px-8 justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Admin Control Center</h1>
          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
              Secure Admin Session
            </div>
            <LogoutButton />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
