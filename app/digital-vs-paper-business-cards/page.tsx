import type { Metadata } from "next";
import DigitalVsPaperClient from "./client";

export const metadata: Metadata = {
  title: "Digital vs Paper Business Cards: Which Should You Use?",
  description:
    "A side-by-side comparison of digital and paper business cards — cost, updatability, running out of stock, environmental impact, analytics, first impressions, and ease of sharing.",
  alternates: {
    canonical: "/digital-vs-paper-business-cards",
  },
};

export default function DigitalVsPaperPage() {
  return <DigitalVsPaperClient />;
}
