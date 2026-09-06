"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  QrCode,
  CreditCard,
  Users,
  BarChart3,
  Briefcase,
  Globe,
  Nfc,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  X,
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "QR Code + Shareable Link",
    description:
      "Every eProfile gets a unique link and a downloadable QR code. Share it on WhatsApp, print it on a poster, or add it to your email signature — one link works everywhere.",
  },
  {
    icon: Smartphone,
    title: "One-Tap Contact Buttons",
    description:
      "Visitors can call, WhatsApp, email, or get directions to you with a single tap. No typing numbers or saving contacts manually.",
  },
  {
    icon: Briefcase,
    title: "Services Showcase with Pricing",
    description:
      "List what you offer with prices right on your card, so people know what you do and what it costs before they even message you.",
  },
  {
    icon: CreditCard,
    title: "Accept Payments Instantly",
    description:
      "Collect payments directly through your card with UPI, Razorpay, and Paytm — perfect for freelancers, shop owners, and service providers across India.",
  },
  {
    icon: BarChart3,
    title: "Analytics You Can Actually Use",
    description:
      "See how many people viewed your card and which buttons they tapped. A paper card can't tell you any of that.",
  },
  {
    icon: Users,
    title: "Built-in Lead Capture",
    description:
      "A simple contact form on your card captures enquiries directly into your dashboard, so you never miss a potential customer.",
  },
  {
    icon: Globe,
    title: "Custom Domain (Pro)",
    description:
      "Upgrade to Pro and connect your own domain, so your card lives at yourname.com instead of a generic link.",
  },
  {
    icon: Nfc,
    title: "NFC Tap-Card Ready",
    description:
      "Pair your eProfile with an NFC tap card and let people access your profile with a single tap of their phone — no app required.",
  },
];

const faqs = [
  {
    question: "What is a digital business card?",
    answer:
      "A digital business card (also called a digital visiting card or online business card) is a mobile-friendly web page with your contact details, services, and links. Instead of handing out a paper card, you share a link or QR code that anyone can save, tap to call, or forward instantly.",
  },
  {
    question: "Is eProfile really free to use in India?",
    answer:
      "Yes. You can create one eProfile for free with a template, contact buttons, QR code, and basic analytics. Paid plans unlock more eProfiles, premium templates, services showcase, payment integration, and a custom domain.",
  },
  {
    question: "Can I accept UPI payments on my digital business card?",
    answer:
      "Yes. On the Pro plan you can connect UPI, Razorpay, or Paytm so clients and customers can pay you directly from your card without any extra app.",
  },
  {
    question: "Does a digital business card work with NFC tap cards?",
    answer:
      "Yes. Your eProfile link can be programmed onto an NFC card or tag. When someone taps their phone against it, your profile opens instantly — no scanning or typing required.",
  },
  {
    question: "How is this different from just sharing my number on WhatsApp?",
    answer:
      "Your eProfile brings everything together in one place — your services, pricing, portfolio, social links, and a way to get in touch — and it tracks who's viewing it. A phone number alone can't showcase your work or capture leads.",
  },
  {
    question: "Can I update my digital business card after printing or sharing it?",
    answer:
      "Yes, and that's the whole point. Update your details, services, or prices anytime from your dashboard, and everyone who has your link or QR code instantly sees the latest version — no reprinting needed.",
  },
];

export default function DigitalBusinessCardIndiaClient() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signup");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative bg-white border-b border-slate-200/50 overflow-hidden py-16 sm:py-20">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5 text-xs font-semibold text-indigo-700 mb-6">
              <span className="flex w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
              Made for Indian Professionals & Businesses
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              The Best Digital Business Card
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> for India</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Ditch paper visiting cards that get lost, torn, or outdated the moment your number changes.
              Create a digital visiting card with eProfile — share it with a tap or QR code, showcase your
              services, collect payments, and see exactly who's checking you out.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-base font-semibold px-8 py-3.5 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {session ? "Go to Dashboard" : "Create Your Free Digital Business Card"}
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/features"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-base font-semibold px-8 py-3.5 hover:border-slate-300 transition-all"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Problem / Why section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Why Paper Visiting Cards Are Costing You Business
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            You print 500 cards, hand them out, and most end up in a drawer or the bin. Here's what a
            digital business card fixes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500 mb-6">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Paper Cards Get Lost</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              A physical card can be misplaced, thrown away, or left in a pocket. A digital business card
              lives in your prospect's phone forever, ready to be found in one search.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500 mb-6">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Outdated the Moment You Print</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Changed your number, moved offices, or added a new service? Every paper card in circulation
              is now wrong. Update your eProfile once and everyone sees the change instantly.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500 mb-6">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Zero Analytics</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              There's no way to know if someone even looked at your paper card. eProfile shows you views,
              button clicks, and leads so you know what's actually working.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white border-y border-slate-200/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Everything an Online Business Card Maker Should Have
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              eProfile is built for how Indian professionals and small businesses actually network — on
              WhatsApp, over UPI, and on the move.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            From Signup to Sharing in 3 Steps
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            No design skills or developers needed — build your digital visiting card in under 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 font-extrabold text-xl">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Pick a Template</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Choose from 10 professionally designed, mobile-optimized templates and add your name,
              photo, and role.
            </p>
          </div>
          <div className="text-center bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 font-extrabold text-xl">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Add Contact & Services</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Set up your call, WhatsApp, and email buttons, then list your services with pricing so
              visitors know exactly what you offer.
            </p>
          </div>
          <div className="text-center bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 font-extrabold text-xl">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Share Your Link or QR</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Send your link on WhatsApp, add it to your email signature, print the QR code, or tap an
              NFC card to share instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Internal linking / related section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center text-violet-600 shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Freelancer or consultant?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                If you work independently, see how eProfile's{" "}
                <Link href="/digital-business-card-for-freelancers" className="text-indigo-600 font-semibold hover:underline">
                  digital business card for freelancers
                </Link>{" "}
                helps you capture leads and showcase your services with a single link. You can also
                compare all templates and tools on our{" "}
                <Link href="/features" className="text-indigo-600 font-semibold hover:underline">
                  features page
                </Link>{" "}
                or check{" "}
                <Link href="/pricing" className="text-indigo-600 font-semibold hover:underline">
                  pricing plans
                </Link>{" "}
                to find the right fit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 flex items-center justify-center gap-2.5">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Common questions about digital business cards in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-base font-bold text-slate-900 mb-2">{faq.question}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 text-white py-16 px-8 sm:px-12 text-center shadow-xl shadow-indigo-500/10">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              Create Your Free Digital Business Card
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-lg mx-auto">
              Join thousands of professionals across India who've replaced paper cards with an eProfile
              that works harder for them.
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
    </div>
  );
}
