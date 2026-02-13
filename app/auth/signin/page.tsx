import type { Metadata } from "next";
import SignInClient from "./client";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your eProfile account to manage your digital business cards and view analytics.",
};

export default function SignInPage() {
    return <SignInClient />;
}
