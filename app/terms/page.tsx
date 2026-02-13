import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read eProfile's Terms of Service to understand the rules and regulations for using our digital business card platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-IN")}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 mb-4">
                By accessing and using eProfile ("Service"), you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use
                this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-700 mb-4">
                eProfile is a digital business card platform that allows users
                to create, customize, and share professional digital business
                cards. Our service includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Digital business card creation and customization</li>
                <li>Multiple professional templates</li>
                <li>Contact information management</li>
                <li>Analytics and lead tracking</li>
                <li>Premium features for paid subscribers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. User Accounts
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                3.1 Account Creation
              </h3>
              <p className="text-gray-700 mb-4">
                To use our service, you must create an account by providing
                accurate and complete information. You are responsible for
                maintaining the confidentiality of your account credentials.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                3.2 Account Responsibility
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  You are responsible for all activities under your account
                </li>
                <li>You must notify us immediately of any unauthorized use</li>
                <li>You must provide accurate and up-to-date information</li>
                <li>One person or entity may maintain only one account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Subscription and Payments
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                4.1 Subscription Plans
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Free Plan:</strong> Basic features with limited
                  functionality
                </li>
                <li>
                  <strong>Standard Plan:</strong> Enhanced features for growing
                  professionals
                </li>
                <li>
                  <strong>Pro Plan:</strong> Full access to all premium features
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                4.2 Payment Terms
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Payments are processed securely through Razorpay (PCI DSS
                  Level 1 compliant)
                </li>
                <li>
                  Subscriptions are billed monthly in advance in Indian Rupees
                  (INR)
                </li>
                <li>
                  All prices include applicable taxes (GST) as per Indian tax
                  laws
                </li>
                <li>
                  Payment methods accepted: Credit/Debit Cards, Net Banking,
                  UPI, Wallets
                </li>
                <li>
                  All fees are non-refundable except as specified in our Refund
                  Policy
                </li>
                <li>
                  We reserve the right to change pricing with 30 days advance
                  notice
                </li>
                <li>
                  Failed payments may result in service suspension after 3 retry
                  attempts
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                4.3 Taxes and Compliance
              </h3>
              <p className="text-gray-700 mb-4">
                All prices are inclusive of applicable Goods and Services Tax
                (GST) as per Indian tax regulations. Tax invoices will be
                provided for all transactions as required by law.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                4.3 Cancellation
              </h3>
              <p className="text-gray-700 mb-4">
                You may cancel your subscription at any time. Cancellation will
                take effect at the end of your current billing period. You will
                retain access to paid features until the end of your billing
                period.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Acceptable Use
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                5.1 Permitted Use
              </h3>
              <p className="text-gray-700 mb-4">
                You may use our service for lawful business and professional
                purposes only.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                5.2 Prohibited Activities
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Uploading illegal, harmful, or offensive content</li>
                <li>Impersonating others or providing false information</li>
                <li>Attempting to hack, disrupt, or damage our systems</li>
                <li>
                  Using the service for spam or unsolicited communications
                </li>
                <li>Violating intellectual property rights</li>
                <li>Engaging in fraudulent activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Content and Intellectual Property
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                6.1 Your Content
              </h3>
              <p className="text-gray-700 mb-4">
                You retain ownership of content you upload to our service. By
                uploading content, you grant us a license to use, store, and
                display your content as necessary to provide our services.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                6.2 Our Intellectual Property
              </h3>
              <p className="text-gray-700 mb-4">
                The eProfile platform, including its design, features, and
                underlying technology, is owned by us and protected by
                intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Privacy Policy
                </Link>{" "}
                to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Service Availability
              </h2>
              <p className="text-gray-700 mb-4">
                We strive to maintain high service availability but cannot
                guarantee uninterrupted access. We may temporarily suspend
                service for maintenance, updates, or due to circumstances beyond
                our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, eProfile shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, including but not limited to loss of profits,
                data, or business opportunities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Termination
              </h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account immediately, without
                prior notice, for any reason, including breach of these Terms.
                Upon termination, your right to use the service will cease
                immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                11. Governing Law
              </h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance
                with the laws of India. Any disputes shall be subject to the
                exclusive jurisdiction of the courts in [Your City].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will
                notify users of material changes via email or through our
                service. Continued use after changes constitutes acceptance of
                the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                13. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Legal Email:</strong> legal@eprofile.com
                  <br />
                  <strong>Support Email:</strong> support@eprofile.com
                  <br />
                  <strong>Business Address:</strong> [Complete Business Address
                  with PIN Code]
                  <br />
                  <strong>Phone:</strong> +91-[Your 10-digit Phone Number]
                  <br />
                  <strong>GST Number:</strong> [Your GST Number if applicable]
                  <br />
                  <strong>Business Registration:</strong> [Your business
                  registration details]
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
