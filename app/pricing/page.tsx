import type { Metadata } from "next";
import PricingClient from "./client";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Simple, transparent pricing for every professional. Choose the perfect plan for your networking needs.",
};

export default function PricingPage() {
    return <PricingClient />;
}
