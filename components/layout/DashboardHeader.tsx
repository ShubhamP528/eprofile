"use client";

import { useSession } from "next-auth/react";
import SubscriptionBadge from "@/components/subscription/subscription-badge";
import { Menu, Bell } from "lucide-react";
import Image from "next/image";

interface DashboardHeaderProps {
    toggleMobileMenu: () => void;
    toggleSidebar: () => void;
    isSidebarCollapsed: boolean;
}

export default function DashboardHeader({
    toggleMobileMenu,
    toggleSidebar,
    isSidebarCollapsed,
}: DashboardHeaderProps) {
    const { data: session } = useSession();

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 transition-all duration-200">
            <div className="h-[72px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 -ml-2 rounded-xl text-gray-500 lg:hidden hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Page Title / Breadcrumbs can go here */}
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold text-gray-900 leading-tight">Dashboard</h1>
                        <p className="text-xs text-gray-500 font-medium hidden sm:block">Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Subscription Status */}

                    <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>



                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-gray-100 sm:pl-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-semibold text-gray-900 leading-none mb-1">
                                {session?.user?.name || "User"}
                            </span>
                            <SubscriptionBadge className="mt-0.5" />
                        </div>

                        <button className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm hover:ring-blue-100 transition-all group">
                            {session?.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold">
                                    {session?.user?.name?.[0]?.toUpperCase() || "U"}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
