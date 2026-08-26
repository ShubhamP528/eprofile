import Link from "next/link";
import type { Metadata } from "next";
import { Leaf, RefreshCw, BarChart2, Award, Heart, ShieldCheck, HelpCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about eProfile's mission to revolutionize professional networking with eco-friendly digital business cards.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative bg-white border-b border-slate-200/50 overflow-hidden py-16 sm:py-20">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            About eProfile
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Revolutionizing professional networking with beautiful, interactive, and eco-friendly digital business cards.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* Mission Section */}
          <section className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              At eProfile, we believe that every professional deserves a modern, eco-friendly way to share their contact information and showcase their work. Our mission is to revolutionize networking by providing beautiful, interactive digital business cards that make lasting impressions, saving trees and facilitating seamless professional connections.
            </p>
          </section>

          {/* What We Do */}
          <section className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              What We Do
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              eProfile is a comprehensive digital business card platform that enables professionals, entrepreneurs, and businesses to build stunning online profiles. We support you with:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-600">
              {[
                "Professional digital business card templates",
                "Customizable designs and color branding",
                "Direct one-click call, email, and social links",
                "Interactive service details & pricing lists",
                "Dynamic portfolio galleries for files & images",
                "Integrated customer testimonials & reviews",
                "Contact forms & lead management tools",
                "Secure payments via custom UPI/Razorpay buttons"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Value Cards */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Why Choose eProfile?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-5">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Eco-Friendly
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Reduce paper waste and environmental impact with digital business cards that can be shared instantly without cut down trees.
                </p>
              </div>

              <div className="bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-5">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Always Updated
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Update your contact details or portfolio links once, and they reflect instantly across all cards previously shared.
                </p>
              </div>

              <div className="bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-5">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Analytics & Leads
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Keep track of page views, button clicks, and receive customer enquiries directly inside your integrated leads dashboard.
                </p>
              </div>

              <div className="bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-5">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Professional Design
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Impress prospects with digital cards that are designed for conversions, optimized for mobile devices, and fast-loading.
                </p>
              </div>
            </div>
          </section>

          {/* Values timeline */}
          <section className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              Our Values
            </h2>

            <div className="space-y-6">
              {[
                { title: "Innovation", desc: "We continuously evolve our platform with cutting-edge designs and features.", color: "border-indigo-500" },
                { title: "Sustainability", desc: "We're committed to reducing paper carbon footprint through cloud solutions.", color: "border-emerald-500" },
                { title: "User-Centric", desc: "Every feature we build is designed with our users' networking success in mind.", color: "border-violet-500" },
                { title: "Privacy", desc: "Your data security and granular privacy settings are our absolute top priority.", color: "border-slate-500" }
              ].map((val, idx) => (
                <div key={idx} className={`border-l-4 ${val.color} pl-4.5 py-1`}>
                  <h3 className="font-bold text-slate-900 text-base">{val.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{val.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Security & GDPR */}
          <section className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              Security & Privacy
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              Your security is built in. We implement standard measures to ensure safety:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-500 text-sm">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>SSL Encryption for all traffic</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Secure payment gateways (Razorpay)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Transparent data policies</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Regular security updates</span>
              </li>
            </ul>
          </section>

          {/* CTA card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 text-white py-12 px-8 text-center shadow-lg shadow-indigo-500/10">
            <h3 className="text-2xl font-bold mb-3">Ready to Join eProfile?</h3>
            <p className="text-sm text-indigo-100 mb-6 max-w-md mx-auto">
              Create your digital business card now and start sharing contact details instantly.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block bg-white text-indigo-600 hover:bg-slate-50 px-6.5 py-3 rounded-xl font-bold text-sm shadow transition-all hover:-translate-y-0.5"
            >
              Get Started Free
            </Link>
          </div>

          {/* Contact details */}
          <section className="bg-slate-100/50 border border-slate-200/50 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Corporate Contact Info</h2>
            <div className="text-sm text-slate-600 space-y-2">
              <p><strong>Email:</strong> support@eprofile.cv</p>
              <p><strong>Address:</strong> Rudraksh Colony, Janpth Road, Fulsunga, Rudrapur, Uttrakhand, Pin - 263153</p>
              <p><strong>Phone:</strong> +919027640571</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
