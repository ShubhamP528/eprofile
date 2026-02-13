import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Read eProfile's Refund & Cancellation Policy to understand our guidelines on subscriptions, cancellations, and refunds.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Refund & Cancellation Policy
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-IN")}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Overview
              </h2>
              <p className="text-gray-700 mb-4">
                At eProfile, we want you to be completely satisfied with our
                digital business card services. This Refund & Cancellation
                Policy explains our policies regarding refunds, cancellations,
                and subscription management.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Free Trial Period
              </h2>
              <p className="text-gray-700 mb-4">
                We offer a 14-day free trial for new Pro plan subscribers.
                During this period:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You can cancel anytime without any charges</li>
                <li>No payment will be processed during the trial period</li>
                <li>You will have full access to Pro features</li>
                <li>
                  Automatic billing begins after the trial ends unless cancelled
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Subscription Cancellation
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                3.1 How to Cancel
              </h3>
              <p className="text-gray-700 mb-4">
                You can cancel your subscription at any time by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Logging into your account and going to Subscription settings
                </li>
                <li>Clicking "Downgrade to Free" or "Cancel Subscription"</li>
                <li>Contacting our support team at support@eprofile.com</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                3.2 Cancellation Effects
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Cancellation takes effect at the end of your current billing
                  period
                </li>
                <li>
                  You retain access to paid features until the period ends
                </li>
                <li>
                  Your account will automatically downgrade to the Free plan
                </li>
                <li>No further charges will be made after cancellation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Refund Policy
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                4.1 General Refund Policy
              </h3>
              <p className="text-gray-700 mb-4">
                Due to the digital nature of our services, all payments are
                generally non-refundable. However, we may provide refunds in the
                following exceptional circumstances:
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                4.2 Eligible Refund Scenarios
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Technical Issues:</strong> If our service is
                  unavailable for more than 48 consecutive hours due to
                  technical problems on our end
                </li>
                <li>
                  <strong>Billing Errors:</strong> If you were charged
                  incorrectly due to a system error
                </li>
                <li>
                  <strong>Duplicate Charges:</strong> If you were charged
                  multiple times for the same subscription
                </li>
                <li>
                  <strong>Unauthorized Charges:</strong> If charges were made
                  without your authorization (subject to investigation)
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                4.3 Refund Process
              </h3>
              <p className="text-gray-700 mb-4">To request a refund:</p>
              <ol className="list-decimal pl-6 text-gray-700 mb-4">
                <li>
                  Contact our support team at support@eprofile.com within 7 days
                  of the charge
                </li>
                <li>
                  Provide your account details and reason for the refund request
                </li>
                <li>Include any relevant documentation or screenshots</li>
                <li>
                  Our team will review your request within 3-5 business days
                </li>
                <li>
                  If approved, refunds will be processed within 7-10 business
                  days
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Non-Refundable Scenarios
              </h2>
              <p className="text-gray-700 mb-4">
                Refunds will not be provided in the following situations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Change of mind after using the service</li>
                <li>Failure to cancel before the next billing cycle</li>
                <li>
                  Violation of our Terms of Service leading to account
                  suspension
                </li>
                <li>Requests made more than 30 days after the charge</li>
                <li>Partial month usage (subscriptions are billed monthly)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Payment Processing
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                6.1 Payment Gateway
              </h3>
              <p className="text-gray-700 mb-4">
                All payments are processed securely through Razorpay, a
                certified payment gateway. We do not store your payment
                information on our servers.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                6.2 Billing Cycle
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  Subscriptions are billed monthly on the same date you
                  initially subscribed
                </li>
                <li>
                  Payments are automatically charged to your selected payment
                  method
                </li>
                <li>
                  You will receive an email receipt for each successful payment
                </li>
                <li>
                  Failed payments may result in service suspension after 3
                  attempts
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Plan Changes
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                7.1 Upgrades
              </h3>
              <p className="text-gray-700 mb-4">
                When upgrading your plan, you will be charged the prorated
                amount for the remaining billing period. The new plan takes
                effect immediately.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                7.2 Downgrades
              </h3>
              <p className="text-gray-700 mb-4">
                When downgrading your plan, the change takes effect at the end
                of your current billing period. No refund is provided for the
                unused portion of the higher plan.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Account Suspension
              </h2>
              <p className="text-gray-700 mb-4">
                If your account is suspended due to violation of our Terms of
                Service, no refund will be provided for the remaining
                subscription period. You may appeal the suspension by contacting
                our support team.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Data Export
              </h2>
              <p className="text-gray-700 mb-4">
                Before cancelling your subscription, you can export your data
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Digital business card information</li>
                <li>Contact and lead data</li>
                <li>Analytics reports</li>
                <li>Gallery and portfolio content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Contact Support
              </h2>
              <p className="text-gray-700 mb-4">
                For any questions about refunds, cancellations, or billing
                issues, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> support@eprofile.com
                  <br />
                  <strong>Billing Support:</strong> billing@eprofile.com
                  <br />
                  <strong>Refund Requests:</strong> refunds@eprofile.com
                  <br />
                  <strong>Phone:</strong> +91-[Your 10-digit Phone Number]
                  <br />
                  <strong>Support Hours:</strong> Monday to Friday, 9:00 AM to
                  6:00 PM IST
                  <br />
                  <strong>Emergency Support:</strong> Available via email 24/7
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                11. Policy Updates
              </h2>
              <p className="text-gray-700 mb-4">
                We may update this Refund & Cancellation Policy from time to
                time. Any changes will be posted on this page with an updated
                revision date. Continued use of our service after changes
                constitutes acceptance of the updated policy.
              </p>
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
