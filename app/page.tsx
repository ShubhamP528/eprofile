import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import GoogleSeoHighlight from "@/components/home/GoogleSeoHighlight";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "eProfile - Smart Digital Business Cards | Rank on Google Page 1 in 10-20 Days",
  description: "Create stunning digital visiting cards that rank on Page 1 of Google in 10-20 days. Share contact details, showcase your portfolio, and collect leads seamlessly.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "eProfile - Smart Digital Business Cards | Rank on Google Page 1 in 10-20 Days",
    description: "Create stunning digital visiting cards that rank on Page 1 of Google in 10-20 days. Share contact details, showcase your portfolio, and collect leads seamlessly.",
    url: "https://www.eprofile.cv",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Features />
        <GoogleSeoHighlight />
        <HowItWorks />
        <Testimonials />
      </main>
    </div>
  );
}
