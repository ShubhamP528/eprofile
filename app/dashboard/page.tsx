import type { Metadata } from "next";
import DashboardClient from "./client";

export const metadata: Metadata = {
  title: "Overview",
  description: "Manage your digital business cards, track leads, and view analytics.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
