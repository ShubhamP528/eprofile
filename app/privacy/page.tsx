import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-IN")}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 mb-4">
                Welcome to eProfile ("we," "our," or "us"). This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website and use our digital
                business card services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                2.1 Personal Information
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Profile information for your digital business cards</li>
                <li>
                  Payment information (processed securely through Razorpay)
                </li>
                <li>Account credentials and authentication data</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                2.2 Usage Information
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Usage patterns and analytics data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide and maintain our digital business card services</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send important updates and notifications</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Information Sharing and Third-Party Services
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
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

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                4.1 Payment Information
              </h3>
              <p className="text-gray-700 mb-4">
                We do not store your complete payment card information on our
                servers. Payment processing is handled entirely by Razorpay,
                which maintains PCI DSS Level 1 compliance. We only store
                transaction IDs and payment status for billing and support
                purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing through Razorpay</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Cookies and Tracking
              </h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your
                experience, analyze usage, and provide personalized content. You
                can control cookie settings through your browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Data Retention and Deletion
              </h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information only as long as necessary to
                provide our services and comply with legal obligations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
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

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                8.1 Data Deletion
              </h3>
              <p className="text-gray-700 mb-4">
                You can request complete deletion of your account and associated
                data by contacting us at privacy@eprofile.com. We will process
                deletion requests within 30 days, except for data we are legally
                required to retain.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. International Transfers
              </h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place to protect your data during such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Children's Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under 13 years of
                age. We do not knowingly collect personal information from
                children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                11. Changes to This Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                12. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@eprofile.com
                  <br />
                  <strong>Support Email:</strong> support@eprofile.com
                  <br />
                  <strong>Business Address:</strong> [Complete Business Address
                  with PIN Code]
                  <br />
                  <strong>Phone:</strong> +91-[Your 10-digit Phone Number]
                  <br />
                  <strong>Business Hours:</strong> Monday to Friday, 9:00 AM to
                  6:00 PM IST
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
