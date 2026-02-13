import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/session-provider";
import { SubscriptionProvider } from "@/components/providers/subscription-provider";
import ConditionalNavbar from "@/components/layout/conditional-navbar";
import StartupProvider from "@/components/providers/startup-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "eProfile - Professional Digital Profiles",
    template: "%s | eProfile",
  },
  description: "Create and share stunning professional digital visiting cards and portfolios with eProfile. The modern way to network.",
  keywords: ["digital visiting card", "portfolio", "networking", "business card", "eProfile"],
  authors: [{ name: "eProfile Team" }],
  creator: "eProfile",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eprofile.cv",
    title: "eProfile - Professional Digital Profiles",
    description: "Create and share stunning professional digital visiting cards and portfolios with eProfile.",
    siteName: "eProfile",
  },
  twitter: {
    card: "summary_large_image",
    title: "eProfile - Professional Digital Profiles",
    description: "Create and share stunning professional digital visiting cards and portfolios with eProfile.",
    creator: "@eprofile",
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
    ],
    apple: {
      url: "/favicon.svg",
      sizes: "180x180",
      type: "image/svg+xml",
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          <SubscriptionProvider>
            <ConditionalNavbar />
            <main>{children}</main>
          </SubscriptionProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
