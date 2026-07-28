"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xs font-semibold px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg border border-red-200 transition cursor-pointer"
    >
      Sign Out
    </button>
  );
}
