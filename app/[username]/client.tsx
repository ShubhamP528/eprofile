"use client";

import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { SkeletonBase } from "@/components/ui/skeleton/skeleton-base";
import Template1 from "@/components/templates/template1";
import Template2 from "@/components/templates/template2";
import Template3 from "@/components/templates/template3";
import Template4 from "@/components/templates/template4";
import Template5 from "@/components/templates/template5";
import Template6 from "@/components/templates/template6";
import Template7 from "@/components/templates/template7";
import Template8 from "@/components/templates/template8";
import Template9 from "@/components/templates/template9";
import Template10 from "@/components/templates/template10";
import LeadForm from "@/components/forms/lead-form";
import QRCodeGenerator from "@/components/cards/qr-code-generator";
import SocialShare from "@/components/cards/social-share";
import PaymentSection from "@/components/payments/payment-section";

interface PublicCardPageProps {
    params: Promise<{ username: string }>;
}

interface CardData {
    id: string;
    username: string;
    title: string;
    subtitle?: string;
    bio?: string;
    phone?: string;
    email?: string;
    address?: string;
    profileImage?: string;
    coverImage?: string;
    template: string;
    socialLinks: Array<{
        platform: string;
        url: string;
    }>;
    services: Array<{
        id: string;
        title: string;
        description?: string;
        price?: string;
        isFeatured: boolean;
        order: number;
    }>;
    gallery: Array<{
        id: string;
        type: "IMAGE" | "VIDEO" | "DOCUMENT";
        url: string;
        title?: string;
        order: number;
    }>;
    testimonials: Array<{
        id: string;
        customerName: string;
        content: string;
        rating: number;
        order: number;
    }>;
}

const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4,
    template5: Template5,
    template6: Template6,
    template7: Template7,
    template8: Template8,
    template9: Template9,
    template10: Template10,
};

export default function PublicCardClient({ params, initialCard, baseUrl }: PublicCardPageProps & { initialCard?: CardData | null; baseUrl?: string }) {
    const resolvedParams = use(params);
    const [card, setCard] = useState<CardData | null>(initialCard || null);
    const [loading, setLoading] = useState(!initialCard);
    const [error, setError] = useState<string | null>(null);

    // Use the passed baseUrl or fallback to window.location.origin on client
    const origin = baseUrl || (typeof window !== "undefined" ? window.location.origin : "");

    useEffect(() => {
        if (initialCard) return;

        const fetchCard = async () => {
            try {
                setLoading(true);
                const response = await apiClient.getCardByUsername(
                    resolvedParams.username
                );

                if (response.success) {
                    setCard(response.data as CardData);
                } else {
                    if (response.error?.code === "CARD_NOT_FOUND") {
                        notFound();
                    } else {
                        setError(response.error?.message || "Failed to load card");
                    }
                }
            } catch (err) {
                setError("An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [resolvedParams.username, initialCard]);

    // Track button clicks
    const handleButtonClick = async (buttonType: string) => {
        if (card) {
            try {
                await apiClient.trackButtonClick(card.id, buttonType);
            } catch (error) {
                // Silently fail - analytics tracking shouldn't break user experience
                console.error("Failed to track button click:", error);
            }
        }
    };

    // Handle contact actions
    const handleCall = () => {
        if (card?.phone) {
            handleButtonClick("PHONE");
            window.open(`tel:${card.phone}`, "_self");
        }
    };

    const handleEmail = () => {
        if (card?.email) {
            handleButtonClick("EMAIL");
            window.open(`mailto:${card.email}`, "_self");
        }
    };

    const handleWhatsApp = () => {
        if (card?.phone) {
            handleButtonClick("WHATSAPP");
            const message = encodeURIComponent(
                `Hi ${card.title}, I found your eProfile and would like to connect!`
            );
            window.open(
                `https://wa.me/${card.phone.replace(/[^0-9]/g, "")}?text=${message}`,
                "_blank"
            );
        }
    };

    const handleLocation = () => {
        if (card?.address) {
            handleButtonClick("LOCATION");
            window.open(
                `https://maps.google.com/?q=${encodeURIComponent(card.address)}`,
                "_blank"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Profile Header Skeleton */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <SkeletonBase
                                width="6rem"
                                height="6rem"
                                rounded="full"
                                className="shrink-0"
                            />
                            <div className="flex-1 text-center sm:text-left space-y-3">
                                <SkeletonBase
                                    width="12rem"
                                    height="2rem"
                                    className="mx-auto sm:mx-0"
                                />
                                <SkeletonBase
                                    width="8rem"
                                    height="1.25rem"
                                    className="mx-auto sm:mx-0"
                                />
                                <div className="space-y-2">
                                    <SkeletonBase width="100%" height="1rem" />
                                    <SkeletonBase
                                        width="75%"
                                        height="1rem"
                                        className="mx-auto sm:mx-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Skeleton */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                        <SkeletonBase width="8rem" height="1.5rem" className="mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <SkeletonBase width="1.25rem" height="1.25rem" />
                                    <SkeletonBase width="8rem" height="1rem" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Services Skeleton */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <SkeletonBase width="5rem" height="1.5rem" className="mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="p-4 border border-gray-200 rounded-lg">
                                    <SkeletonBase
                                        width="6rem"
                                        height="1.25rem"
                                        className="mb-2"
                                    />
                                    <SkeletonBase width="100%" height="1rem" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-red-600 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Error Loading Card
                    </h1>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!card) {
        return notFound();
    }

    const SelectedTemplate =
        templates[card.template as keyof typeof templates] || Template1;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 py-12 px-4">
            {/* eProfile Display - Centered with proper card proportions */}
            <div className="max-w-2xl mx-auto mb-12">
                <SelectedTemplate data={card} isPreview={false} />
            </div>

            {/* Contact Actions - Floating Action Buttons */}
            <div className="fixed bottom-4 right-4 space-y-2 z-50">
                {card.phone && (
                    <button
                        onClick={handleCall}
                        className="w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                        title="Call"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                    </button>
                )}

                {card.phone && (
                    <button
                        onClick={handleWhatsApp}
                        className="w-12 h-12 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                        title="WhatsApp"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                    </button>
                )}

                {card.email && (
                    <button
                        onClick={handleEmail}
                        className="w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                        title="Email"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </button>
                )}

                {card.address && (
                    <button
                        onClick={handleLocation}
                        className="w-12 h-12 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                        title="Location"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Interactive Section - Compact Layout */}
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Services Section */}
                {card.services && card.services.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                            Services
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {card.services.map((service) => (
                                <div
                                    key={service.id}
                                    className={`p-4 rounded-lg border ${service.isFeatured
                                        ? "border-blue-200 bg-blue-50"
                                        : "border-gray-200 bg-white"
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900">
                                            {service.title}
                                        </h4>
                                        {service.isFeatured && (
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    {service.description && (
                                        <p className="text-gray-600 text-sm mb-2">
                                            {service.description}
                                        </p>
                                    )}
                                    {service.price && (
                                        <p className="text-blue-600 font-semibold">
                                            {service.price}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Gallery Section */}
                {card.gallery && card.gallery.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                            Portfolio
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {card.gallery.map((item) => (
                                <div key={item.id} className="group cursor-pointer">
                                    {item.type === "IMAGE" ? (
                                        <div className="aspect-square overflow-hidden rounded-lg">
                                            <img
                                                src={item.url}
                                                alt={item.title || "Portfolio item"}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                onClick={() => window.open(item.url, "_blank")}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center group-hover:bg-gray-200 transition-colors"
                                            onClick={() => window.open(item.url, "_blank")}
                                        >
                                            <div className="text-gray-400 mb-2">
                                                {item.type === "VIDEO" ? (
                                                    <svg
                                                        className="w-8 h-8"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="w-8 h-8"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-600 text-center">
                                                {item.type}
                                            </span>
                                        </div>
                                    )}
                                    {item.title && (
                                        <p className="text-sm text-gray-700 mt-2 text-center truncate">
                                            {item.title}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Testimonials Section */}
                {card.testimonials && card.testimonials.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                            What Clients Say
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {card.testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
                                >
                                    <div className="flex items-center mb-3">
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= testimonial.rating
                                                        ? "text-yellow-400 fill-current"
                                                        : "text-gray-300"
                                                        }`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                    <p className="text-gray-900 font-medium text-sm">
                                        — {testimonial.customerName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Payment Section */}
                <PaymentSection card={card} />

                {/* Lead Generation Form */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <LeadForm cardId={card.id} cardOwnerName={card.title} />
                </div>

                {/* QR Code and Social Share in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                        <QRCodeGenerator
                            url={`${origin}/${card.username}`}
                            title={card.title}
                        />
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                        <SocialShare
                            url={`${origin}/${card.username}`}
                            title={card.title}
                            description={card.bio}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 py-8 border-t border-white/20">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2"
                                />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                            eProfile
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">Create your own eProfile</p>
                    <a
                        href="/"
                        className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-full hover:bg-blue-700 transition-colors"
                    >
                        Get Started
                    </a>
                </div>
            </footer>
        </div>
    );
}
