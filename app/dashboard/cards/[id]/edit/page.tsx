import type { Metadata } from "next";
import EditCardClient from "./client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "Edit Card",
    description: "Edit your digital business card details, design, and content.",
  };
}

export default async function EditCardPage({ params }: Props) {
  return <EditCardClient params={params} />;
}
