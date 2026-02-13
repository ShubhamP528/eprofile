import type { Metadata } from "next";
import SubscriptionClient from "./client";

export const metadata: Metadata = {
  title: "Subscription",
  description: "Manage your eProfile subscription and billing details.",
};

export default function SubscriptionPage() {
  return <SubscriptionClient />;
}
