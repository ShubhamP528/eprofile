import type { Metadata } from "next";
import FeaturesClient from "./client";

export const metadata: Metadata = {
  title: "Features - Google SEO Optimization, Instant Sharing & Lead Capture | eProfile",
  description: "Discover eProfile features: Built-in Google SEO indexing (ranks in 10-20 days), Schema.org rich snippets, 10+ designer templates, lead capture, and UPI payment buttons.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "eProfile Features - Google SEO Ranked Digital Visiting Cards",
    description: "Built-in Google SEO indexing (ranks in 10-20 days), Schema.org rich snippets, interactive contact buttons, and lead generation.",
    url: "https://www.eprofile.cv/features",
    type: "website",
  },
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
