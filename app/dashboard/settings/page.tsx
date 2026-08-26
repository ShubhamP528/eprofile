import type { Metadata } from "next";
import SettingsClient from "./client";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your eProfile account, profile information, and password.",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
