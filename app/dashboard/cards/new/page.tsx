import type { Metadata } from "next";
import NewCardClient from "./client";

export const metadata: Metadata = {
    title: "Create New Card",
    description: "Create a new professional digital business card with eProfile.",
};

export default function NewCardPage() {
    return <NewCardClient />;
}
