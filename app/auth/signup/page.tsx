import type { Metadata } from "next";
import SignUpClient from "./client";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your free eProfile account today. Build professional digital business cards and grow your network.",
};

export default function SignUpPage() {
  return <SignUpClient />;
}
