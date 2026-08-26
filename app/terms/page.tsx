import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read eProfile's Terms of Service to understand the rules and regulations for using our digital business card platform.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative bg-white border-b border-slate-200/50 overflow-hidden py-16 sm:py-20">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-5 shadow-xs">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Read our rules, guidelines, and terms for using the eProfile platform.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden space-y-12">
          <div>
            <p className="text-sm text-slate-500">
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-IN")}
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              By accessing and using eProfile ("Service"), you accept and
              agree to be bound by the terms and provision of this agreement.
              If you do not agree to abide by the above, please do not use
              this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              2. Description of Service
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-3">
              eProfile is a digital business card platform that allows users
              to create, customize, and share professional digital business
              cards. Our service includes:
            </p>
            <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
              <li>Digital business card creation and customization</li>
              <li>Multiple professional templates</li>
              <li>Contact information management</li>
              <li>Analytics and lead tracking</li>
              <li>Premium features for paid subscribers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              3. User Accounts
            </h2>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  3.1 Account Creation
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  To use our service, you must create an account by providing
                  accurate and complete information. You are responsible for
                  maintaining the confidentiality of your account credentials.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  3.2 Account Responsibility
                </h3>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
                  <li>You are responsible for all activities under your account</li>
                  <li>You must notify us immediately of any unauthorized use</li>
                  <li>You must provide accurate and up-to-date information</li>
                  <li>One person or entity may maintain only one account</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              4. Subscription and Payments
            </h2>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  4.1 Subscription Plans
                </h3>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
                  <li>
                    <strong>Free Plan:</strong> Basic features with limited functionality
                  </li>
                  <li>
                    <strong>Standard Plan:</strong> Enhanced features for growing professionals
                  </li>
                  <li>
                    <strong>Pro Plan:</strong> Full access to all premium features
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  4.2 Payment Terms
                </h3>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
                  <li>
                    Payments are processed securely through Razorpay (PCI DSS Level 1 compliant)
                  </li>
                  <li>
                    Subscriptions are billed monthly in advance in Indian Rupees (INR)
                  </li>
                  <li>
                    All prices include applicable taxes (GST) as per Indian tax laws
                  </li>
                  <li>
                    Payment methods accepted: Credit/Debit Cards, Net Banking, UPI, Wallets
                  </li>
                  <li>
                    All fees are non-refundable except as specified in our Refund Policy
                  </li>
                  <li>
                    We reserve the right to change pricing with 30 days advance notice
                  </li>
                  <li>
                    Failed payments may result in service suspension after 3 retry attempts
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  4.3 Taxes and Compliance
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  All prices are inclusive of applicable Goods and Services Tax (GST) as per Indian tax regulations. Tax invoices will be provided for all transactions as required by law.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  4.4 Cancellation
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period. You will retain access to paid features until the end of your billing period.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              5. Acceptable Use
            </h2>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  5.1 Permitted Use
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  You may use our service for lawful business and professional purposes only.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  5.2 Prohibited Activities
                </h3>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
                  <li>Uploading illegal, harmful, or offensive content</li>
                  <li>Impersonating others or providing false information</li>
                  <li>Attempting to hack, disrupt, or damage our systems</li>
                  <li>Using the service for spam or unsolicited communications</li>
                  <li>Violating intellectual property rights</li>
                  <li>Engaging in fraudulent activities</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              6. Content and Intellectual Property
            </h2>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  6.1 Your Content
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  You retain ownership of content you upload to our service. By uploading content, you grant us a license to use, store, and display your content as necessary to provide our services.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  6.2 Our Intellectual Property
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  The eProfile platform, including its design, features, and underlying technology, is owned by us and protected by intellectual property laws.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              7. Privacy and Data Protection
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Your privacy is important to us. Please review our{" "}
              <Link
                href="/privacy"
                className="text-indigo-600 hover:text-indigo-700 font-semibold underline decoration-2 decoration-indigo-600/20 hover:decoration-indigo-600/50 transition-colors"
              >
                Privacy Policy
              </Link>{" "}
              to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              8. Service Availability
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              We strive to maintain high service availability but cannot guarantee uninterrupted access. We may temporarily suspend service for maintenance, updates, or due to circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              9. Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              To the maximum extent permitted by law, eProfile shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              10. Termination
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the service will cease immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              11. Governing Law
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Rudrapur, Uttarakhand.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              12. Changes to Terms
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through our service. Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              13. Contact Information
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-slate-50 border border-slate-200/50 p-6 rounded-2xl">
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>Email:</strong> support@eprofile.cv
                <br />
                <strong>Business Address:</strong> Rudraksh Colony, Janpth Road, Fulsunga, Rudrapur, Uttrakhand, Pin - 263153
                <br />
                <strong>Phone:</strong> +919027640571
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
