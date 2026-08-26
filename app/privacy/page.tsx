import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read eProfile's Privacy Policy to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative bg-white border-b border-slate-200/50 overflow-hidden py-16 sm:py-20">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-5 shadow-xs">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Understand how we collect, use, and protect your personal information at eProfile.
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
              1. Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Welcome to eProfile ("we," "our," or "us"). This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website and use our digital
              business card services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              2. Information We Collect
            </h2>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  2.1 Personal Information
                </h3>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Profile information for your digital business cards</li>
                  <li>
                    Payment information (processed securely through Razorpay)
                  </li>
                  <li>Account credentials and authentication data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  2.2 Usage Information
                </h3>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and analytics data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
              <li>Provide and maintain our digital business card services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send important updates and notifications</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              4. Information Sharing and Third-Party Services
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              We do not sell, trade, or rent your personal information to
              third parties. We may share your information only in the
              following circumstances:
            </p>
            <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5 mb-4">
              <li>With your explicit consent</li>
              <li>
                <strong>Payment Processing:</strong> We use Razorpay (a
                certified PCI DSS compliant payment gateway) to process
                payments securely. Razorpay may collect and process payment
                information according to their privacy policy.
              </li>
              <li>
                <strong>Cloud Services:</strong> We use secure cloud
                infrastructure providers for hosting and data storage
              </li>
              <li>To comply with legal requirements and court orders</li>
              <li>
                To protect our rights, prevent fraud, and ensure security
              </li>
              <li>In case of business transfer, merger, or acquisition</li>
            </ul>

            <h3 className="text-base font-bold text-slate-800 mb-2">
              4.1 Payment Information
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              We do not store your complete payment card information on our
              servers. Payment processing is handled entirely by Razorpay,
              which maintains PCI DSS Level 1 compliance. We only store
              transaction IDs and payment status for billing and support
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              5. Data Security
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              We implement appropriate technical and organizational security
              measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction.
              This includes:
            </p>
            <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing through Razorpay</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              6. Your Rights
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              7. Cookies and Tracking
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              We use cookies and similar technologies to enhance your
              experience, analyze usage, and provide personalized content. You
              can control cookie settings through your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              8. Data Retention and Deletion
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              We retain your personal information only as long as necessary to
              provide our services and comply with legal obligations:
            </p>
            <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5 mb-4">
              <li>
                <strong>Active Accounts:</strong> Data is retained while your
                account is active
              </li>
              <li>
                <strong>Cancelled Accounts:</strong> Account data is retained
                for 90 days after cancellation for potential reactivation
              </li>
              <li>
                <strong>Payment Records:</strong> Billing and payment
                information is retained for 7 years as required by Indian tax
                laws
              </li>
              <li>
                <strong>Legal Compliance:</strong> Some data may be retained
                longer if required by law or for legal proceedings
              </li>
            </ul>

            <h3 className="text-base font-bold text-slate-800 mb-2">
              8.1 Data Deletion
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              You can request complete deletion of your account and associated
              data by contacting us at privacy@eprofile.com. We will process
              deletion requests within 30 days, except for data we are legally
              required to retain.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              9. International Transfers
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Your information may be transferred to and processed in
              countries other than your own. We ensure appropriate safeguards
              are in place to protect your data during such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              10. Children's Privacy
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our services are not intended for children under 13 years of
              age. We do not knowingly collect personal information from
              children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              11. Changes to This Policy
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              12. Contact Us
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="bg-slate-50 border border-slate-200/50 p-6 rounded-2xl">
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>Email:</strong> support@eprofile.cv
                <br />
                <strong>Business Address:</strong> Rudraksh Colony, Janpth Road, Fulsunga, Rudrapur, Uttrakhand, Pin - 263153
                <br />
                <strong>Phone:</strong> +919027640571
                <br />
                <strong>Business Hours:</strong> Monday to Friday, 9:00 AM to
                6:00 PM IST
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
