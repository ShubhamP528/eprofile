"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Share2,
  QrCode,
  CreditCard,
  TrendingUp,
  BarChart3,
  Image as ImageIcon,
  Star,
  ArrowRight,
  HelpCircle,
  MessageCircle,
  X,
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Services Showcase with Pricing",
    description:
      "List every service you offer — consulting hours, packages, or fixed-price deliverables — with pricing displayed right on your card, so prospects self-qualify before they message you.",
  },
  {
    icon: ImageIcon,
    title: "Portfolio Gallery",
    description:
      "Show off your work with an image, video, and document gallery, so clients can judge your quality before they even get on a call.",
  },
  {
    icon: Star,
    title: "Client Testimonials",
    description:
      "Add star ratings and reviews from past clients directly to your profile — social proof that a paper card or plain LinkedIn bio can't offer.",
  },
  {
    icon: TrendingUp,
    title: "Built-in Lead Capture",
    description:
      "A contact form on your card sends enquiries straight to your dashboard, so a lead generated at 11pm doesn't get lost in your DMs.",
  },
  {
    icon: CreditCard,
    title: "Get Paid Without Chasing Invoices",
    description:
      "Connect UPI, Razorpay, or Paytm so clients can pay a deposit or full invoice directly from your card — no separate payment link needed.",
  },
  {
    icon: BarChart3,
    title: "Analytics on Every Visit",
    description:
      "See how many people viewed your card and which service or button they tapped, so you know which offer is actually generating interest.",
  },
  {
    icon: Share2,
    title: "One Link for Every Platform",
    description:
      "Drop the same link in your Upwork profile, Instagram bio, email signature, and WhatsApp Business — update it once, and it updates everywhere.",
  },
  {
    icon: QrCode,
    title: "QR Code for In-Person Networking",
    description:
      "Meeting a client or attending an event? Share your QR code or tap an NFC card instead of fumbling for a pen and a stack of paper cards.",
  },
];

const faqs = [
  {
    question: "Why do freelancers and consultants need a digital business card?",
    answer:
      "Freelancers work across many platforms — Upwork, Instagram, WhatsApp, email, in-person meetings — and repeating your pitch, services, and contact details everywhere is exhausting. An eProfile digital business card puts it all in one link you can drop anywhere, and it captures leads even when you're not actively pitching.",
  },
  {
    question: "Can I list my services and prices on my card?",
    answer:
      "Yes. eProfile lets you add a services showcase with pricing and mark specific offerings as featured, so visitors immediately understand what you do and what it costs, cutting down on back-and-forth messages.",
  },
  {
    question: "How do I capture leads from my digital visiting card?",
    answer:
      "Every eProfile includes a built-in lead capture form. When someone fills it out, the enquiry lands in your lead management dashboard with status tracking, so you can follow up without digging through emails or DMs.",
  },
  {
    question: "Can clients pay me directly through my profile?",
    answer:
      "Yes, on the Pro plan you can connect UPI, Razorpay, or Paytm and accept payments directly through your card — useful for deposits, retainers, or one-off project payments.",
  },
  {
    question: "Is it better than just using a LinkedIn profile?",
    answer:
      "LinkedIn is great for networking, but it can't show your pricing, capture leads with a custom form, collect payments, or give you click-level analytics. eProfile is built specifically to convert a profile view into a paying client.",
  },
  {
    question: "Can I use one eProfile across multiple freelance platforms?",
    answer:
      "Yes. Your eProfile link works the same whether you share it on Upwork, Fiverr, Instagram, or in an email signature — and you can add it wherever a platform allows an external link.",
  },
];

export default function DigitalBusinessCardForFreelancersClient() {
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
              Built for Independent Professionals
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Digital Business Cards Built for
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Freelancers & Consultants</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              You juggle clients across five different platforms and a stack of paper cards no one keeps.
              A digital visiting card for consultants and freelancers puts your services, pricing, portfolio,
              and contact details behind one link — so every conversation can turn into a lead.
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
            The Problem With Pitching Yourself Everywhere Separately
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            As a freelancer or consultant, you're your own marketing team. Here's what usually goes wrong
            without a single, always-updated profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500 mb-6">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Leads Slip Through the Cracks</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              An enquiry buried in Instagram DMs or a missed WhatsApp message is a lost client. Without a
              dedicated lead capture form, you have no reliable way to follow up.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500 mb-6">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Pricing Conversations Take Forever</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Explaining your rates in every single chat wastes time. A services showcase with pricing
              answers the question before it's even asked.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500 mb-6">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">No Visibility Into What Converts</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Without analytics, you're guessing which platform, post, or pitch actually brings in clients.
              eProfile shows you views and clicks so you can double down on what works.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white border-y border-slate-200/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Everything You Need to Turn Views Into Clients
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              eProfile is designed around how independent professionals actually get hired — showcase,
              trust, contact, payment.
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

      {/* Who it's for */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Built for Every Kind of Independent Professional
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you bill by the hour, the project, or the retainer, eProfile adapts to how you work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Consultants & Coaches</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Showcase your expertise, list session packages with pricing, and let a lead capture form
              handle discovery-call requests automatically.
            </p>
          </div>
          <div className="text-center bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Designers & Creators</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Use the portfolio gallery to display your best work and testimonials to back it up, all
              behind one link you can drop in any bio.
            </p>
          </div>
          <div className="text-center bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Service Providers</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              From photographers to tutors, list your services with pricing and accept UPI or card
              payments directly, without a separate invoicing tool.
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
                Not a freelancer? Looking for the broader picture?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                See our overview of the{" "}
                <Link href="/digital-business-card-india" className="text-indigo-600 font-semibold hover:underline">
                  best digital business card for India
                </Link>{" "}
                for teams and businesses of any size. You can also browse the full{" "}
                <Link href="/features" className="text-indigo-600 font-semibold hover:underline">
                  feature list
                </Link>{" "}
                or compare{" "}
                <Link href="/pricing" className="text-indigo-600 font-semibold hover:underline">
                  pricing plans
                </Link>{" "}
                to pick what fits your practice.
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
            Common questions from freelancers and consultants.
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
              Join freelancers and consultants who've turned their profile into a lead-generating,
              payment-collecting business card.
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
