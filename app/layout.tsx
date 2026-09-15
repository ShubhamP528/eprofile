import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/session-provider";
import { SubscriptionProvider } from "@/components/providers/subscription-provider";
import ConditionalNavbar from "@/components/layout/conditional-navbar";
import ConditionalFooter from "@/components/layout/conditional-footer";
import StartupProvider from "@/components/providers/startup-provider";
import TelemetryTracker from "@/components/layout/TelemetryTracker";
import AttributionCapture from "@/components/analytics/attribution-capture";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.eprofile.cv"),
  title: {
    default: "eProfile - Professional Digital Visiting Cards & SEO-Ranked Profiles",
    template: "%s | eProfile",
  },
  description: "Create stunning digital visiting cards that rank on Page 1 of Google in 10-20 days. Share your portfolio, accept payments, and network smartly.",
  keywords: [
    "digital visiting card",
    "seo friendly digital business card",
    "rank on google visiting card",
    "online portfolio maker",
    "smart visiting card",
    "nfc business card",
    "electronic visiting card",
    "eProfile",
    "digital business card india"
  ],
  authors: [{ name: "eProfile Team", url: "https://www.eprofile.cv" }],
  creator: "eProfile",
  publisher: "eProfile",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.eprofile.cv",
    title: "eProfile - Professional Digital Visiting Cards & SEO-Ranked Profiles",
    description: "Create stunning digital visiting cards that rank on Page 1 of Google in 10-20 days. Share your portfolio, accept payments, and network smartly.",
    siteName: "eProfile",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "eProfile - Next-Gen Digital Visiting Cards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eProfile - Professional Digital Visiting Cards & SEO-Ranked Profiles",
    description: "Create stunning digital visiting cards that rank on Page 1 of Google in 10-20 days. Share your portfolio, accept payments, and network smartly.",
    images: ["/og-image.png"],
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
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.eprofile.cv";
  
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "eProfile",
        url: baseUrl,
        logo: `${baseUrl}/favicon.svg`,
        description: "Leading digital visiting card and professional profile creation platform with built-in Google SEO indexing.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+919027640571",
          contactType: "customer service",
          email: "support@eprofile.cv",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "eProfile",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/cards?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "eProfile Digital Card Maker",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema).replace(/</g, "\\u003c") }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          <SubscriptionProvider>
            <TelemetryTracker />
            <AttributionCapture />
            <ConditionalNavbar />
            <main>{children}</main>
            <ConditionalFooter />
          </SubscriptionProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
