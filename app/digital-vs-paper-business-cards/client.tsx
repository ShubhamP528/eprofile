"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Check,
  X,
  TrendingDown,
  Leaf,
  BarChart3,
  RefreshCw,
  Share2,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export default function DigitalVsPaperClient() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signup");
    }
  };

  const comparisonRows = [
    {
      category: "Cost over time",
      paper: "Recurring printing cost every time you order a batch (typically ₹300–₹1,000 per 100 cards), plus reprints whenever your title, number, or address changes.",
      digital: "eProfile is free to start, with paid plans from ₹149/month for advanced features. One profile, no reprinting, ever.",
      digitalWins: true,
    },
    {
      category: "Updating your details",
      paper: "Any change — a new phone number, job title, or company — makes every card in your drawer outdated until you reprint.",
      digital: "Edit your eProfile once in your dashboard and the change is live immediately for everyone who has your link, QR code, or NFC tag.",
      digitalWins: true,
    },
    {
      category: "Running out of stock",
      paper: "Hand out your last card at a conference and you're stuck writing your number on a napkin until the next batch arrives.",
      digital: "Nothing to run out of. Your link and QR code are always available — share them from your phone anytime.",
      digitalWins: true,
    },
    {
      category: "Environmental impact",
      paper: "Paper, ink, and packaging for every batch — most printed cards end up discarded within weeks of being handed out.",
      digital: "No paper, no printing, no waste. A single digital profile replaces an unlimited number of physical cards.",
      digitalWins: true,
    },
    {
      category: "Analytics & tracking",
      paper: "No way to know if someone kept your card, looked at it, or threw it away.",
      digital: "Built-in analytics show profile views, contact-button clicks, and captured leads — so you know what's actually working.",
      digitalWins: true,
    },
    {
      category: "First impression & modernity",
      paper: "A well-designed paper card can still look sharp, but it says little about your work beyond a name and number.",
      digital: "10 professional templates, your services with pricing, a portfolio gallery, and testimonials — a full profile, not just contact info.",
      digitalWins: true,
    },
    {
      category: "Sharing at a distance",
      paper: "Requires physically handing the card to someone standing next to you — impossible on a call or in a chat.",
      digital: "Share your eprofile.cv link over WhatsApp, email, or social media from anywhere, or let people scan your QR code or tap your NFC tag in person.",
      digitalWins: true,
    },
  ];

  const digitalReasons = [
    {
      icon: TrendingDown,
      title: "Lower cost, no reprints",
      description:
        "Start free and never pay a printer again. Even on a paid plan, one flat monthly fee replaces the recurring cost of ordering new batches every time something changes.",
    },
    {
      icon: RefreshCw,
      title: "Always up to date",
      description:
        "Changed jobs, updated your pricing, or added a new service? Update it once in your dashboard and it reflects everywhere instantly — no outdated cards floating around.",
    },
    {
      icon: Leaf,
      title: "Zero paper waste",
      description:
        "One digital profile replaces thousands of printed cards over a career, with no ink, paper, or packaging involved.",
    },
    {
      icon: BarChart3,
      title: "Real data on engagement",
      description:
        "See exactly how many people viewed your profile, which contact buttons they clicked, and how many turned into leads through your capture form.",
    },
    {
      icon: Sparkles,
      title: "A fuller first impression",
      description:
        "Beyond a name and number, visitors see your services with pricing, a portfolio gallery, testimonials, and can even pay you directly via UPI, Razorpay, or Paytm.",
    },
    {
      icon: Share2,
      title: "Shareable from anywhere",
      description:
        "Send your link in a WhatsApp chat, embed it in an email signature, print the QR code on packaging, or write it to an NFC tag for an in-person tap — all from the same profile.",
    },
  ];

  const faqs = [
    {
      question: "Is a digital business card really better than a paper one?",
      answer:
        "For most professionals, yes — a digital card costs less over time, never goes out of stock, updates instantly, and gives you data on who's engaging with it. Paper still has a place for events where handing over something physical matters, which is why many people carry a QR code or NFC tag as a bridge between the two.",
    },
    {
      question: "Do I need a paper card if I have a digital one?",
      answer:
        "Not necessarily. Many eProfile users share their link directly, print their QR code on packaging or a lanyard, or write it to an NFC tag or card for the same tap-to-share experience as a physical card — without any of the reprinting hassle.",
    },
    {
      question: "How much does a digital business card cost compared to paper?",
      answer:
        "eProfile's Free plan costs nothing and includes a shareable link, QR code, and basic analytics. Paid plans start at ₹149/month for services showcase, portfolio galleries, and advanced analytics. Compare that to ₹300-₹1,000 per batch of printed cards, repeated every time your details change.",
    },
    {
      question: "Can older or less tech-savvy contacts still use a digital card?",
      answer:
        "Yes. A digital business card link opens in any phone or desktop browser with no app required. Contacts can also scan the QR code with their phone's built-in camera, and if you use an NFC tag, they simply tap their phone against it — no technical knowledge needed on their end.",
    },
    {
      question: "What happens to a digital card's data if I stop paying?",
      answer:
        "Your eProfile stays accessible on the Free plan even if you don't upgrade, and your data remains available for 30 days after cancelling a paid plan, giving you time to export anything you need.",
    },
    {
      question: "Does a digital business card work without internet?",
      answer:
        "Viewing the profile requires the visitor to have an internet connection, same as loading any webpage. In practice this is rarely an issue since virtually everyone has mobile data or Wi-Fi, and the sharing methods (link, QR code, NFC tap) all work the moment the page loads.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative bg-white border-b border-slate-200/50 overflow-hidden py-16 sm:py-20">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Digital vs Paper Business Cards:
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Which Should You Use?</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A clear, practical comparison across cost, updatability, stock,
              environmental impact, analytics, first impressions, and how easily
              each one shares — so you can decide with your eyes open.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all"
              >
                {session ? "Go to Dashboard" : "Create Your Free eProfile"}
              </button>
              <Link
                href="/nfc-business-card"
                className="w-full sm:w-auto border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
              >
                Explore NFC Tap-to-Share
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Side-by-Side Comparison
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The same seven factors that matter most when you're deciding how to
            hand out your contact information.
          </p>
        </div>

        {/* Mobile: stacked cards, one per factor, so both columns are always
            visible without a hidden horizontal swipe. Desktop: full table. */}
        <div className="md:hidden space-y-4">
          {comparisonRows.map((row, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-100 shadow-sm bg-white p-5"
            >
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                {row.category}
              </h3>
              <div className="flex items-start gap-2.5 mb-3">
                <X className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-0.5">
                    Paper Business Card
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {row.paper}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-indigo-600 mb-0.5">
                    Digital eProfile
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {row.digital}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/60">
                <th className="text-left py-4.5 px-6 font-bold text-slate-900 text-sm w-1/5">
                  Factor
                </th>
                <th className="text-left py-4.5 px-6 font-bold text-slate-500 text-sm w-2/5">
                  Paper Business Card
                </th>
                <th className="text-left py-4.5 px-6 font-bold text-indigo-600 text-sm w-2/5">
                  Digital eProfile
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/40 transition-colors align-top">
                  <td className="py-5 px-6 text-sm font-bold text-slate-900">
                    {row.category}
                  </td>
                  <td className="py-5 px-6 text-sm text-slate-500 leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                      <span>{row.paper}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-sm text-slate-700 leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{row.digital}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Why digital wins - card grid */}
      <div className="bg-white border-y border-slate-200/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Why Professionals Are Switching to Digital
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Six concrete reasons a digital business card outperforms paper for
              most day-to-day networking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {digitalReasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 shadow-sm group"
                >
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* When paper still makes sense */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
            Is There Still a Place for Paper?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            Paper cards aren't gone entirely — some people still expect the
            physical hand-off, and a printed card doesn't need a phone to
            "read." But most of what a paper card is good for, a digital
            eProfile does better, and the two aren't mutually exclusive. You can
            print your eProfile's QR code onto a card or write your link to an
            NFC tag, giving contacts the same physical exchange while every
            update, click, and view still flows through your digital profile.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In practice, most professionals who switch to a digital business
            card stop reordering paper within a few months — the cost savings
            and always-current details make the physical version feel
            unnecessary except as a backup.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 flex items-center justify-center gap-2.5">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Common questions about switching from paper to digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {faq.answer}
              </p>
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
              Make the Switch to Digital
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-lg mx-auto">
              Stop reprinting and start sharing a business card that updates
              itself, tracks its own results, and never runs out of stock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-slate-50 px-8 py-3.5 rounded-xl font-bold text-sm shadow transition-all hover:-translate-y-0.5"
              >
                {session ? "Go to Dashboard" : "Create Your Free Digital Business Card"}
              </button>
              <Link
                href="/features"
                className="w-full sm:w-auto border border-white/35 hover:border-white/60 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold text-sm transition-all inline-flex items-center gap-2"
              >
                Explore Features <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
