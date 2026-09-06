import type { Metadata } from "next";
import DigitalBusinessCardForFreelancersClient from "./client";

export const metadata: Metadata = {
  title: "Digital Business Card for Freelancers & Consultants",
  description:
    "A digital visiting card built for freelancers and consultants: showcase your services, capture leads, accept payments, and share one link everywhere you work.",
  alternates: {
    canonical: "/digital-business-card-for-freelancers",
  },
};

export default function DigitalBusinessCardForFreelancersPage() {
  return <DigitalBusinessCardForFreelancersClient />;
}
