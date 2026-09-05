import type { Metadata } from "next";
import ReferralsClient from "./client";

export const metadata: Metadata = {
  title: "Refer & Earn",
  description: "Invite friends to eProfile and earn free Pro access.",
};

export default function ReferralsPage() {
  return <ReferralsClient />;
}
