import type { Metadata } from "next";
import NfcBusinessCardClient from "./client";

export const metadata: Metadata = {
  title: "NFC Business Card India | Tap-to-Share Digital Visiting Card",
  description:
    "Turn any cheap NFC tag, card, or keychain into a tap-to-share business card. Write your eProfile link to an NFC tag and let anyone open your digital profile just by tapping their phone.",
  alternates: {
    canonical: "/nfc-business-card",
  },
};

export default function NfcBusinessCardPage() {
  return <NfcBusinessCardClient />;
}
