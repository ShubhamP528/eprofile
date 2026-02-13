import type { Metadata } from "next";
import ContactClient from "./client";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the eProfile team. We're here to help you revolutionize your professional networking.",
};

export default function ContactPage() {
  return <ContactClient />;
}
