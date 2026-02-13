"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CreditCard,
    Users,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Settings
} from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    isMobile: boolean;
    closeMobileMenu?: () => void;
}

const navigation = [
    { name: "My Cards", href: "/dashboard", icon: LayoutDashboard },
    { name: "Leads", href: "/dashboard/leads", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
    // { name: "Settings", href: "/dashboard/settings", icon: Settings }, // Future use
];

export default function Sidebar({
    isCollapsed,
    toggleSidebar,
    isMobile,
    closeMobileMenu,
}: SidebarProps) {
    const pathname = usePathname();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <div
            className={cn(
                "flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-30 relative",
                isMobile ? "w-64 fixed inset-y-0 left-0" : isCollapsed ? "w-20" : "w-64",
                "shadow-sm"
            )}
        >
            {/* Header */}
            <div className={cn(
                "flex items-center h-[72px] px-6 border-b border-gray-200 transition-all duration-300",
                !isMobile && isCollapsed ? "justify-center px-2" : "justify-between"
            )}>
                <Link href="/" className="flex items-center space-x-2 overflow-hidden">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                            className="w-5 h-5 text-white"
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
                    <span
                        className={cn(
                            "text-xl font-bold text-gray-900 transition-all duration-300 whitespace-nowrap overflow-hidden",
                            !isMobile && isCollapsed
                                ? "w-0 max-w-0 opacity-0 text-[0px]"
                                : "w-auto max-w-40 opacity-100 text-xl ml-2"
                        )}
                    >
                        eProfile
                    </span>
                </Link>

                {isMobile && closeMobileMenu && (
                    <button
                        onClick={closeMobileMenu}
                        className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
            </div>

            {/* Desktop Toggle Button - Absolute Positioned */}
            {!isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-6 z-50 p-1 bg-white border border-gray-200 rounded-full shadow-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
                <ul className="space-y-1 px-3">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    onClick={isMobile ? closeMobileMenu : undefined}
                                    className={cn(
                                        "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                                        isActive
                                            ? "bg-blue-50 text-blue-600 font-medium"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                        !isMobile && isCollapsed ? "justify-center" : "space-x-3"
                                    )}
                                    title={!isMobile && isCollapsed ? item.name : undefined}
                                >
                                    <item.icon
                                        size={22}
                                        className={cn(
                                            "flex-shrink-0 transition-colors",
                                            isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            "transition-all duration-300 whitespace-nowrap overflow-hidden",
                                            !isMobile && isCollapsed
                                                ? "w-0 max-w-0 opacity-0 text-[0px]"
                                                : "w-auto max-w-32 opacity-100"
                                        )}
                                    >
                                        {item.name}
                                    </span>

                                    {/* Tooltip for collapsed state */}
                                    {/* {!isMobile && isCollapsed && (
                                        <div className="absolute left-10 ml-6 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none shadow-lg">
                                            {item.name}
                                        </div>
                                    )} */}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer / Sign Out */}
            <div className="p-4 border-t border-gray-100 overflow-hidden">
                <button
                    onClick={handleSignOut}
                    className={cn(
                        "flex items-center w-full px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors group",
                        !isMobile && isCollapsed ? "justify-center" : "space-x-3"
                    )}
                    title={!isMobile && isCollapsed ? "Sign Out" : undefined}
                >
                    <LogOut size={22} className="flex-shrink-0 text-gray-500 group-hover:text-red-600" />
                    <span
                        className={cn(
                            "transition-all duration-300 whitespace-nowrap overflow-hidden",
                            !isMobile && isCollapsed
                                ? "w-0 max-w-0 opacity-0 text-[0px]"
                                : "w-auto max-w-32 opacity-100"
                        )}
                    >
                        Sign Out
                    </span>
                </button>
            </div>
        </div>
    );
}
