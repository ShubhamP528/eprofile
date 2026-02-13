import type { Metadata } from "next";
import DashboardLayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard | eProfile",
    default: "Dashboard",
  },
  description: "Manage your digital business cards and track performance.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
