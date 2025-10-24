"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RazorpayCheckout from "@/components/payments/razorpay-checkout";

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

  const handleContactSales = () => {
    router.push("/contact");
  };

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with digital cards",
      features: [
        "1 Digital Card",
        "Basic Templates",
        "Contact Buttons",
        "QR Code Generation",
        "Basic Analytics",
        "Lead Generation Form",
        "Social Media Links",
        "ProCard Branding",
      ],
      limitations: [
        "Limited customization",
        "Basic support",
        "ProCard watermark",
      ],
      buttonText: session ? "Go to Dashboard" : "Get Started Free",
      buttonAction: handleGetStarted,
      buttonStyle:
        "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      description: "Everything you need for professional networking",
      features: [
        "Unlimited Digital Cards",
        "All Premium Templates",
        "Advanced Customization",
        "Services Showcase (5 services)",
        "Portfolio Gallery (10 items)",
        "Customer Testimonials",
        "Payment Integration",
        "Advanced Analytics",
        "Lead Management",
        "Custom Domain Support",
        "Priority Support",
        "No ProCard Branding",
      ],
      limitations: [],
      buttonText: session ? "Upgrade to Pro" : "Start Pro Trial",
      buttonAction: handleStartTrial,
      useRazorpay: session ? true : false,
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For teams and organizations with advanced needs",
      features: [
        "Everything in Pro",
        "Team Management",
        "Bulk Card Creation",
        "Advanced Integrations",
        "Custom Branding",
        "API Access",
        "Dedicated Support",
        "Training & Onboarding",
        "SLA Guarantee",
        "Custom Features",
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonAction: handleContactSales,
      buttonStyle: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
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
        "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through our secure payment partners.",
    },
    {
      question: "Can I use my own domain name?",
      answer:
        "Yes, Pro and Enterprise plans include custom domain support. You can use your own domain for your digital cards.",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent
              <span className="text-blue-600"> Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Start free and upgrade as
              you grow.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 ${
                plan.popular ? "ring-2 ring-blue-600 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period !== "contact us" && (
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">
                  What's included:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Limitations:
                    </h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li
                          key={limitationIndex}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <svg
                            className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {(plan as any).useRazorpay ? (
                <RazorpayCheckout
                  plan="PRO"
                  amount={29900}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                >
                  <div
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </div>
                </RazorpayCheckout>
              ) : (
                <button
                  onClick={plan.buttonAction}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              See what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Features
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    Free
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    Pro
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    feature: "Digital Cards",
                    free: "1",
                    pro: "Unlimited",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "Templates",
                    free: "Basic",
                    pro: "All Premium",
                    enterprise: "All + Custom",
                  },
                  {
                    feature: "Services Showcase",
                    free: "❌",
                    pro: "✅",
                    enterprise: "✅",
                  },
                  {
                    feature: "Portfolio Gallery",
                    free: "❌",
                    pro: "✅",
                    enterprise: "✅",
                  },
                  {
                    feature: "Payment Integration",
                    free: "❌",
                    pro: "✅",
                    enterprise: "✅",
                  },
                  {
                    feature: "Advanced Analytics",
                    free: "Basic",
                    pro: "✅",
                    enterprise: "✅",
                  },
                  {
                    feature: "Custom Domain",
                    free: "❌",
                    pro: "✅",
                    enterprise: "✅",
                  },
                  {
                    feature: "Team Management",
                    free: "❌",
                    pro: "❌",
                    enterprise: "✅",
                  },
                  {
                    feature: "API Access",
                    free: "❌",
                    pro: "❌",
                    enterprise: "✅",
                  },
                  {
                    feature: "Support",
                    free: "Community",
                    pro: "Priority",
                    enterprise: "Dedicated",
                  },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {row.free}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {row.pro}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust ProCard for their digital
            networking needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {session ? "Go to Dashboard" : "Start Free Trial"}
            </button>
            <Link
              href="/features"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
