"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RazorpayCheckout from "@/components/payments/razorpay-checkout";
import { Check, X, ArrowRight, HelpCircle } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  buttonText: string;
  buttonAction: () => void;
  buttonStyle: string;
  popular: boolean;
  useRazorpay?: boolean;
}

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signup");
    }
  };

  const handleStartTrial = () => {
    if (session) {
      router.push("/dashboard/subscription");
    } else {
      router.push("/auth/signup");
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    alert("Payment successful! Your Pro subscription has been activated.");
    router.push("/dashboard");
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
  };

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with eProfiles",
      features: [
        "1 eProfile",
        "Google SEO Indexing (10–20 Days)",
        "Schema.org JSON-LD Structured Data",
        "Basic Templates",
        "Contact Buttons & QR Code",
        "Basic Analytics",
        "Lead Generation Form",
        "Social Media Links",
        "eProfile Branding",
      ],
      limitations: [
        "Limited customization",
        "Basic support",
        "eProfile watermark",
      ],
      buttonText: session ? "Go to Dashboard" : "Get Started Free",
      buttonAction: handleGetStarted,
      buttonStyle:
        "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl shadow-sm hover:shadow transition-all duration-200",
      popular: false,
    },
    {
      name: "Standard",
      price: "₹149",
      period: "per month",
      description: "Great for professionals who need more features",
      features: [
        "3 eProfiles",
        "Google SEO Indexing (10–20 Days)",
        "Schema.org Structured Data",
        "All Premium Templates",
        "Services Showcase (3 services)",
        "Portfolio Gallery (5 items)",
        "Advanced Customization",
        "Lead Management",
        "Advanced Analytics",
        "Email Support",
        "No eProfile Branding",
      ],
      limitations: [
        "No testimonials",
        "No payment integration",
        "No custom domain",
      ],
      buttonText: session ? "Upgrade to Standard" : "Start Standard Trial",
      buttonAction: handleStartTrial,
      useRazorpay: session ? true : false,
      plan: "STANDARD",
      amount: 14900,
      buttonStyle: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all duration-200",
      popular: true,
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      description: "Everything you need for professional networking",
      features: [
        "Unlimited eProfiles",
        "Google SEO Top Ranking Optimization",
        "Schema.org Rich Snippet Meta",
        "All Premium Templates",
        "Advanced Customization",
        "Services Showcase (Unlimited)",
        "Portfolio Gallery (Unlimited)",
        "Customer Testimonials",
        "Payment Integration",
        "Advanced Analytics",
        "Lead Management",
        "Custom Domain Support",
        "Priority Support",
        "No eProfile Branding",
      ],
      limitations: [],
      buttonText: session ? "Upgrade to Pro" : "Start Pro Trial",
      buttonAction: handleStartTrial,
      useRazorpay: session ? true : false,
      plan: "PRO",
      amount: 29900,
      buttonStyle: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all duration-200",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Is there a free trial for the Pro plan?",
      answer:
        "Yes, we offer a 14-day free trial for the Pro plan. No credit card required to start your trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept UPI, Credit/Debit cards, Net Banking, and wallets through our secure payment gateway Razorpay.",
    },
    {
      question: "Can I use my own domain name?",
      answer:
        "Yes, our Pro plan includes custom domain support. You can connect your own domain to your eProfiles.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees or hidden charges. You only pay the monthly subscription fee.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer:
        "Your data remains accessible for 30 days after cancellation. You can export your data anytime during this period.",
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
              Simple, Transparent
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Pricing</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your needs. Start free and upgrade as
              you grow.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${
                plan.popular ? "ring-2 ring-indigo-600 lg:scale-[1.03] z-10" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4.5 py-1.5 rounded-full text-xs font-bold shadow-md shadow-indigo-600/10">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-5xl font-extrabold text-slate-900">
                      {plan.price}
                    </span>
                    {plan.period !== "contact us" && (
                      <span className="text-slate-500 font-medium ml-1.5">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 min-h-[40px]">{plan.description}</p>
                </div>

                <div className="border-t border-slate-100 pt-6 mb-8">
                  <h4 className="font-bold text-slate-900 text-sm mb-4">
                    What's included:
                  </h4>
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-sm text-slate-600"
                      >
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mt-6 border-t border-slate-50 pt-5">
                      <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">
                        Limitations:
                      </h4>
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <li
                            key={limitationIndex}
                            className="flex items-start text-sm text-slate-400"
                          >
                            <X className="w-4.5 h-4.5 text-slate-300 mr-3 flex-shrink-0 mt-0.5" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-auto">
                {(plan as any).useRazorpay ? (
                  <RazorpayCheckout
                    plan={(plan as any).plan}
                    amount={(plan as any).amount}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  >
                    <div
                      className={`w-full py-3.5 px-6 font-bold text-sm text-center transition-colors cursor-pointer ${plan.buttonStyle}`}
                    >
                      {plan.buttonText}
                    </div>
                  </RazorpayCheckout>
                ) : (
                  <button
                    onClick={plan.buttonAction}
                    className={`w-full py-3.5 px-6 font-bold text-sm text-center transition-colors ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-white border-y border-slate-200/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-lg text-slate-600">
              See what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/60 shadow-sm max-w-4xl mx-auto bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60">
                  <th className="text-left py-4.5 px-6 font-bold text-slate-900 text-sm">
                    Features
                  </th>
                  <th className="text-center py-4.5 px-6 font-bold text-slate-900 text-sm w-32">
                    Free
                  </th>
                  <th className="text-center py-4.5 px-6 font-bold text-slate-900 text-sm w-32">
                    Standard
                  </th>
                  <th className="text-center py-4.5 px-6 font-bold text-slate-900 text-sm w-32">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    feature: "eProfiles",
                    free: "1",
                    standard: "3",
                    pro: "Unlimited",
                  },
                  {
                    feature: "Google SEO Indexing (10-20 Days)",
                    free: "✅",
                    standard: "✅",
                    pro: "✅ (Top Rank Optimization)",
                  },
                  {
                    feature: "Schema.org Rich Snippets",
                    free: "Basic",
                    standard: "Full",
                    pro: "Full + Knowledge Graph",
                  },
                  {
                    feature: "Templates",
                    free: "Basic",
                    standard: "All Premium",
                    pro: "All Premium",
                  },
                  {
                    feature: "Services Showcase",
                    free: "❌",
                    standard: "✅ (3)",
                    pro: "✅ (Unlimited)",
                  },
                  {
                    feature: "Portfolio Gallery",
                    free: "❌",
                    standard: "✅ (5)",
                    pro: "✅ (Unlimited)",
                  },
                  {
                    feature: "Testimonials",
                    free: "❌",
                    standard: "❌",
                    pro: "✅",
                  },
                  {
                    feature: "Payment Integration",
                    free: "❌",
                    standard: "❌",
                    pro: "✅",
                  },
                  {
                    feature: "Advanced Analytics",
                    free: "Basic",
                    standard: "✅",
                    pro: "✅",
                  },
                  {
                    feature: "Custom Domain",
                    free: "❌",
                    standard: "❌",
                    pro: "✅",
                  },
                  {
                    feature: "Support",
                    free: "Community",
                    standard: "Email",
                    pro: "Priority",
                  },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 px-6 text-sm font-semibold text-slate-700">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-sm font-medium text-slate-500">
                      {row.free === "❌" ? <X className="w-4 h-4 text-slate-300 mx-auto" /> : row.free === "✅" ? <Check className="w-4.5 h-4.5 text-emerald-500 mx-auto" /> : row.free}
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-medium text-slate-500">
                      {row.standard.startsWith("✅") ? <Check className="w-4.5 h-4.5 text-emerald-500 mx-auto" /> : row.standard}
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-medium text-slate-900 font-semibold">
                      {row.pro.startsWith("✅") ? <Check className="w-4.5 h-4.5 text-emerald-500 mx-auto" /> : row.pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 flex items-center justify-center gap-2.5">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Got questions? We've got answers.
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
              <p className="text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 text-white py-16 px-8 sm:px-12 text-center shadow-xl shadow-indigo-500/10">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-lg mx-auto">
              Join thousands of professionals who trust eProfile for their digital
              networking and top Google search rankings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-slate-50 px-8 py-3.5 rounded-xl font-bold text-sm shadow transition-all hover:-translate-y-0.5"
              >
                {session ? "Go to Dashboard" : "Start Free Trial"}
              </button>
              <Link
                href="/features"
                className="w-full sm:w-auto border border-white/35 hover:border-white/60 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
              >
                View Features
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
