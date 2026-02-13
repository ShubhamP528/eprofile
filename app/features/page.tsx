import type { Metadata } from "next";
import FeaturesClient from "./client";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore the powerful features of eProfile: Professional templates, analytics, lead generation, and more.",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
