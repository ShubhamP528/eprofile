import type { Metadata } from "next";
import LeadsClient from "./client";

export const metadata: Metadata = {
  title: "Leads",
  description: "View and manage leads captured from your digital business cards.",
};

export default function LeadsPage() {
  return <LeadsClient />;
}
