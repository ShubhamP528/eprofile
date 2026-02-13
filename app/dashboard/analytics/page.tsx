import type { Metadata } from "next";
import AnalyticsClient from "./client";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Track performance metrics for your digital business cards.",
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
