import type { Metadata } from "next";
import DigitalBusinessCardIndiaClient from "./client";

export const metadata: Metadata = {
  title: "Digital Business Card India | Online Visiting Card Maker",
  description:
    "Create a digital business card in India in minutes. Share via QR code or one link, collect leads, accept UPI payments, and track analytics. Free to start.",
  alternates: {
    canonical: "/digital-business-card-india",
  },
};

export default function DigitalBusinessCardIndiaPage() {
  return <DigitalBusinessCardIndiaClient />;
}
