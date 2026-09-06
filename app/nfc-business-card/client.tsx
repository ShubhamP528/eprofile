"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  Share2,
  QrCode,
  Zap,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Wifi,
  RefreshCw,
  BarChart3,
  Wallet,
  HelpCircle,
} from "lucide-react";

export default function NfcBusinessCardClient() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signup");
    }
  };

  const steps = [
    {
      icon: Smartphone,
      title: "Create your eProfile",
      description:
        "Sign up free and build your digital business card with your contact details, services, and links. You get a unique shareable link like eprofile.cv/yourname.",
    },
    {
      icon: QrCode,
      title: "Get your link or QR code",
      description:
        "Every eProfile comes with a permanent shareable link and a downloadable QR code — both point to the same live profile.",
    },
    {
      icon: Wifi,
      title: "Write it to an NFC tag",
      description:
        "Buy any cheap NFC tag, sticker, card, or keychain (₹50–₹300 on Amazon or a local electronics store) and use a free NFC-writer app to save your eProfile link onto it. No special hardware from us required.",
    },
    {
      icon: Zap,
      title: "Tap to share instantly",
      description:
        "Hold the tag near any modern smartphone and your eProfile opens automatically in the browser — no app to install, no typing, no scanning required.",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Faster than a QR code",
      description:
        "No need to open a camera app and line up a scan. A tap registers in under a second, even in bad lighting or a crowded room.",
    },
    {
      icon: RefreshCw,
      title: "Update anytime, tag stays the same",
      description:
        "The NFC tag only stores your eprofile.cv link — never your actual details. Change your title, phone number, or services in your dashboard and every tap reflects it instantly. No reprogramming needed.",
    },
    {
      icon: CreditCard,
      title: "One tag, everything you offer",
      description:
        "Your profile can carry your services with pricing, portfolio, testimonials, and payment options — all reachable from a single tap, not just a name and number.",
    },
    {
      icon: Wallet,
      title: "Accept payments after the tap",
      description:
        "On Pro plans, your eProfile can collect payments directly via UPI, Razorpay, or Paytm — useful for freelancers and small business owners who want to get paid on the spot.",
    },
    {
      icon: BarChart3,
      title: "See who's tapping",
      description:
        "Every open of your eProfile is tracked in your analytics dashboard — views, button clicks, and leads — something a printed or plain NFC card can never tell you.",
    },
    {
      icon: Share2,
      title: "Works even without the tag",
      description:
        "Your eProfile link and QR code work independently of any physical tag, so you can share it over WhatsApp, email, or social media the moment you need to — with or without the hardware in your pocket.",
    },
  ];

  const faqs = [
    {
      question: "Does eProfile sell NFC cards or tags?",
      answer:
        "No — eProfile is a digital business card platform. We give you the shareable link and QR code; you write that link onto any standard NFC tag, sticker, card, or keychain that you buy separately (widely available online for ₹50–₹300). Any NFC-writer app on your phone can do the writing in under a minute.",
    },
    {
      question: "What phones can read an NFC business card?",
      answer:
        "Virtually every smartphone sold since around 2015 has NFC built in and enabled by default for reading tags — this includes all modern iPhones (iOS 11+) and the vast majority of Android phones. The person you're sharing with doesn't need any app installed; their phone just needs NFC turned on.",
    },
    {
      question: "Is an NFC business card better than a QR code?",
      answer:
        "They complement each other rather than compete. NFC is faster (a tap vs. lining up a camera scan) and feels more \"premium,\" but QR codes work on the small number of devices without NFC and can be printed anywhere — on a poster, a paper card, or a storefront window. Your eProfile gives you both from the same link.",
    },
    {
      question: "Can I change my details after writing the NFC tag?",
      answer:
        "Yes. The tag stores only your eprofile.cv link, not your actual information. Edit your job title, phone number, services, or pricing anytime in your eProfile dashboard, and everyone who taps your card sees the update immediately — the physical tag never needs to be rewritten.",
    },
    {
      question: "How much does an NFC business card cost overall?",
      answer:
        "eProfile itself is free to start (paid plans begin at ₹149/month for extra features like payment integration and advanced analytics). A blank NFC tag or card typically costs ₹50–₹300 as a one-time purchase, compared to repeatedly reprinting paper cards every time your details change.",
    },
    {
      question: "Do I need a special app to write the NFC tag?",
      answer:
        "No special eProfile app is needed. Any free NFC-writer app from the Play Store or App Store (search \"NFC Tools\" or similar) can write a URL to a blank NFC tag in a few taps — just paste in your eprofile.cv link and write it to the tag.",
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
              NFC Business Cards for
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Instant Tap-to-Share Networking</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Write your eProfile link to any NFC tag, card, or keychain and let
              people open your full digital business card just by tapping their
              phone against it — no app, no typing, no scanning.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all"
              >
                {session ? "Go to Dashboard" : "Create Your Free eProfile"}
              </button>
              <Link
                href="/digital-vs-paper-business-cards"
                className="w-full sm:w-auto border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
              >
                Digital vs Paper Cards
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What is an NFC business card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            What Is an NFC Business Card?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            NFC (Near Field Communication) is the same short-range wireless tech
            used for contactless payments. A small NFC chip embedded in a card,
            sticker, or keychain can be programmed to store a link. When someone
            taps their phone against it, the phone reads the link and opens it
            automatically — in this case, your eProfile digital business card.
            eProfile provides the profile, the shareable link, and the QR code;
            you supply a low-cost NFC tag from any electronics store or online
            marketplace and write your link to it using a free NFC-writer app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 relative"
              >
                <div className="absolute top-6 right-6 text-xs font-bold text-slate-300">
                  0{index + 1}
                </div>
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white border-y border-slate-200/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Why Pair an NFC Tag with Your eProfile
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A tap-to-share card is only as useful as the profile behind it.
              Here's what makes the combination work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 shadow-sm group"
                >
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* NFC vs QR quick note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
            NFC Tag or QR Code — Do I Need to Choose?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            No. Every eProfile automatically includes both a shareable link and
            a downloadable QR code, in addition to whatever you write to an NFC
            tag. Use the NFC tag on a keychain or card for quick in-person taps,
            print the QR code on packaging, invoices, or a storefront window,
            and send the plain link over WhatsApp or email — all three lead to
            the exact same live profile, and all three update together the
            moment you edit your details.
          </p>
          <ul className="space-y-3 mt-6">
            <li className="flex items-start text-sm text-slate-600">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
              One eProfile link powers your NFC tag, QR code, and shared link at the same time
            </li>
            <li className="flex items-start text-sm text-slate-600">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
              Editing your profile updates every channel instantly — no re-tagging, no reprinting
            </li>
            <li className="flex items-start text-sm text-slate-600">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
              Analytics track views and clicks regardless of how someone reached your profile
            </li>
          </ul>
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
            Everything you need to know before setting up your NFC business card.
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
              Get Your Link, Then Tap to Share
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-lg mx-auto">
              Create your free eProfile in minutes, grab your link or QR code,
              and write it to an NFC tag whenever you're ready to go tap-to-share.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-slate-50 px-8 py-3.5 rounded-xl font-bold text-sm shadow transition-all hover:-translate-y-0.5"
              >
                {session ? "Go to Dashboard" : "Create Your Free Digital Business Card"}
              </button>
              <Link
                href="/pricing"
                className="w-full sm:w-auto border border-white/35 hover:border-white/60 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold text-sm transition-all inline-flex items-center gap-2"
              >
                View Pricing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
