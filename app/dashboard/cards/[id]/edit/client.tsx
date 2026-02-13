"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import CardForm from "@/components/cards/card-form";
import { apiClient } from "@/lib/api-client";
import { SkeletonBase } from "@/components/ui/skeleton/skeleton-base";
import Link from "next/link";

interface EditCardClientProps {
    params: Promise<{ id: string }>;
}

export default function EditCardClient({ params }: EditCardClientProps) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [card, setCard] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                setLoading(true);
                const response = await apiClient.getCard(resolvedParams.id);

                if (response.success) {
                    setCard(response.data);
                } else {
                    setError(response.error?.message || "Failed to load card");
                }
            } catch (err) {
                setError("An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [resolvedParams.id]);

    const handleSubmit = async (data: any) => {
        try {
            const response = await apiClient.updateCard(resolvedParams.id, data);

            if (response.success) {
                router.push("/dashboard");
                router.refresh(); // Refresh server components
                return { success: true };
            } else {
                return {
                    success: false,
                    error: response.error?.message || "Failed to update card"
                };
            }
        } catch (err) {
            return {
                success: false,
                error: "An unexpected error occurred"
            };
        }
    };

    if (loading) {
        return (
            <div className="mobile-container mobile-spacing">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <SkeletonBase width="8rem" height="1.5rem" />
                    <SkeletonBase width="10rem" height="2rem" />
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        <div className="space-y-6">
                            <SkeletonBase width="14rem" height="2rem" className="mb-6" />
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <SkeletonBase width="100%" height="20rem" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mobile-container mobile-spacing">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Card</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <Link
                        href="/dashboard"
                        className="text-blue-600 hover:underline"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mobile-container mobile-spacing">
            <div className="mb-4 sm:mb-6">
                <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-gray-900 flex items-center touch-target mb-3 sm:mb-4"
                >
                    <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Dashboard
                </Link>
            </div>

            <CardForm
                initialData={card}
                onSubmit={handleSubmit}
                onCancel={() => router.push("/dashboard")}
                isEditing={true}
            />
        </div>
    );
}
