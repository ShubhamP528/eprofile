import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function CardPage({ params }: Props) {
    const { id } = await params;
    redirect(`/dashboard/cards/${id}/edit`);
}
