"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Palette, 
  Smartphone, 
  Briefcase, 
  Image, 
  Star, 
  CreditCard, 
  BarChart3, 
  Share2, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Check,
  ArrowRight,
  Search,
  Globe,
  Sparkles
} from "lucide-react";

// Icon mapping to render Lucide React components dynamically
const iconMap = {
  Palette,
  Smartphone,
  Briefcase,
  Image,
  Star,
  CreditCard,
  BarChart3,
  Share2,
  TrendingUp,
  Search,
};

export default function FeaturesPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signup");
    }
  };

  const features = [
    {
      icon: "Search",
      title: "Google SEO & Page 1 Ranking",
      description:
        "Engineered with Schema.org JSON-LD and live XML sitemaps to rank your personal card on Google in 10–20 days.",
      details: [
        "Automated Schema.org structured data",
        "Instant Google sitemap syndication",
        "Rank in 10–20 days on Google Search",
        "Customizable SEO title & meta description",
      ],
    },
    {
      icon: "Palette",
      title: "Professional Templates",
      description:
        "Choose from 10 beautifully designed templates that make your eProfile stand out.",
      details: [
        "Modern, responsive designs",
        "Mobile-optimized layouts",
        "Customizable color schemes",
        "Professional typography",
      ],
    },
    {
      icon: "Smartphone",
      title: "Interactive Contact Buttons",
      description:
        "Make it easy for visitors to reach you with one-click contact options.",
      details: [
        "Direct phone calling",
        "WhatsApp messaging",
        "Email integration",
        "Google Maps navigation",
      ],
    },
    {
      icon: "Briefcase",
      title: "Services Showcase",
      description:
        "Display your services with pricing and highlight your featured offerings.",
      details: [
        "Up to 5 services per card",
        "Featured service highlighting",
        "Drag-and-drop reordering",
        "Pricing display options",
      ],
    },
    {
      icon: "Image",
      title: "Portfolio Gallery",
      description:
        "Showcase your work with images, videos, and documents in a beautiful gallery.",
      details: [
        "Support for images and videos",
        "Document attachments",
        "Up to 10 gallery items",
        "Responsive grid layout",
      ],
    },
    {
      icon: "Star",
      title: "Customer Testimonials",
      description:
        "Build trust with customer reviews and star ratings on your card.",
      details: [
        "5-star rating system",
        "Customer feedback display",
        "Reorderable testimonials",
        "Social proof integration",
      ],
    },
    {
      icon: "CreditCard",
      title: "Payment Integration",
      description:
        "Accept payments directly through your eProfile with multiple options.",
      details: [
        "UPI QR code support",
        "Razorpay integration",
        "Paytm gateway support",
        "Custom payment buttons",
      ],
    },
    {
      icon: "BarChart3",
      title: "Analytics Dashboard",
      description:
        "Track your card performance with detailed analytics and insights.",
      details: [
        "View count tracking",
        "Button click analytics",
        "Lead generation metrics",
        "Conversion rate analysis",
      ],
    },
    {
      icon: "Share2",
      title: "Easy Sharing",
      description:
        "Share your card effortlessly with QR codes and social media integration.",
      details: [
        "Downloadable QR codes",
        "Social media sharing",
        "Direct link sharing",
        "Embed code generation",
      ],
    },
    {
      icon: "TrendingUp",
      title: "Lead Generation",
      description:
        "Capture leads directly from your card with built-in contact forms.",
      details: [
        "Custom contact forms",
        "Lead management dashboard",
        "Email notifications",
        "Lead status tracking",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative bg-white border-b border-slate-200/50 overflow-hidden py-16 sm:py-20">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Powerful Features for
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Digital Success</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create a professional eProfile that
              converts visitors into customers.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 shadow-sm group"
              >
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2.5 border-t border-slate-100 pt-5">
                  {feature.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center text-xs text-slate-500"
                    >
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 text-white py-16 px-8 sm:px-12 text-center shadow-xl shadow-indigo-500/10">
          {/* Subtle overlay circles */}
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              Ready to Create Your eProfile?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-lg mx-auto">
              Join thousands of professionals who have transformed their
              networking with eProfile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-slate-50 px-8 py-3.5 rounded-xl font-bold text-sm shadow transition-all hover:-translate-y-0.5"
              >
                {session ? "Go to Dashboard" : "Get Started Free"}
              </button>
              <Link
                href="/pricing"
                className="w-full sm:w-auto border border-white/35 hover:border-white/60 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights (Why Choose) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Why Choose eProfile?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Built for professionals who want to make a lasting impression.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center bg-white border border-indigo-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Google SEO Ranked
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Schema.org JSON-LD and live XML sitemaps get your card to Page 1 of Google in 10–20 days.
            </p>
          </div>

          <div className="text-center bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create your professional eProfile in under 5 minutes. No technical
              skills required.
            </p>
          </div>

          <div className="text-center bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Always Updated
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Update your information anytime and it reflects instantly across
              all shared links.
            </p>
          </div>

          <div className="text-center bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-violet-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Secure & Reliable
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enterprise SSL security, 99.9% uptime guarantee, and privacy control for your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
