import type { Metadata } from "next";
import PricingClient from "./client";

export const metadata: Metadata = {
    title: "Pricing Plans - Free & Pro Digital Visiting Cards with Google SEO | eProfile",
    description: "Simple, transparent pricing for every professional. Get custom domains, Google SEO ranking (10-20 days), unlimited gallery & lead management. Start free today.",
    alternates: {
        canonical: "/pricing",
    },
    openGraph: {
        title: "eProfile Pricing - Affordable Digital Visiting Cards & SEO Profiles",
        description: "Choose your plan to create stunning digital cards that rank on Page 1 of Google in 10-20 days. Free and Pro options available.",
        url: "https://www.eprofile.cv/pricing",
        type: "website",
    },
};

export default function PricingPage() {
    return <PricingClient />;
}
