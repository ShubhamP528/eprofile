import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Read eProfile's Refund & Cancellation Policy to understand our guidelines on subscriptions, cancellations, and refunds.",
  alternates: {
    canonical: "/refund",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative bg-white border-b border-slate-200/50 overflow-hidden py-16 sm:py-20">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-5 shadow-xs">
            <RefreshCw className="w-6 h-6 animate-spin-slow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Refund & Cancellation
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Read our guidelines on subscription management, cancellations, and billing.
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
              1. Overview
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              At eProfile, we want you to be completely satisfied with our
              digital business card services. This Refund & Cancellation
              Policy explains our policies regarding refunds, cancellations,
              and subscription management.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              2. Free Trial Period
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              We offer a 14-day free trial for new Pro plan subscribers.
              During this period:
            </p>
            <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
              <li>You can cancel anytime without any charges</li>
              <li>No payment will be processed during the trial period</li>
              <li>You will have full access to Pro features</li>
              <li>
                Automatic billing begins after the trial ends unless cancelled
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              3. Subscription Cancellation
            </h2>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  3.1 How to Cancel
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">
                  You can cancel your subscription at any time by:
                </p>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
                  <li>
                    Logging into your account and going to Subscription settings
                  </li>
                  <li>Clicking "Downgrade to Free" or "Cancel Subscription"</li>
                  <li>Contacting our support team at support@eprofile.com</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  3.2 Cancellation Effects
                </h3>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
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
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              4. Refund Policy
            </h2>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  4.1 General Refund Policy
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Due to the digital nature of our services, all payments are
                  generally non-refundable. However, we may provide refunds in the
                  exceptional circumstances detailed below.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  4.2 Eligible Refund Scenarios
                </h3>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
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
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  4.3 Refund Process
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-3">To request a refund:</p>
                <ol className="list-decimal pl-6 text-slate-600 text-sm space-y-1.5">
                  <li>
                    Contact our support team at support@eprofile.cv within 7 days
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
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              5. Non-Refundable Scenarios
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-3">
              Refunds will not be provided in the following situations:
            </p>
            <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
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

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              6. Payment Processing
            </h2>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  6.1 Payment Gateway
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  All payments are processed securely through Razorpay, a
                  certified payment gateway. We do not store your payment
                  information on our servers.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  6.2 Billing Cycle
                </h3>
                <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
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
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              7. Plan Changes
            </h2>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  7.1 Upgrades
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  When upgrading your plan, you will be charged the prorated
                  amount for the remaining billing period. The new plan takes
                  effect immediately.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  7.2 Downgrades
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  When downgrading your plan, the change takes effect at the end
                  of your current billing period. No refund is provided for the
                  unused portion of the higher plan.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              8. Account Suspension
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              If your account is suspended due to violation of our Terms of
              Service, no refund will be provided for the remaining
              subscription period. You may appeal the suspension by contacting
              our support team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              9. Data Export
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-3">
              Before cancelling your subscription, you can export your data
              including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 text-sm space-y-1.5">
              <li>Digital business card information</li>
              <li>Contact and lead data</li>
              <li>Analytics reports</li>
              <li>Gallery and portfolio content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="h-6 w-1 bg-indigo-600 rounded-full"></span>
              10. Contact Support
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              For any questions about refunds, cancellations, or billing
              issues, please contact us:
            </p>
            <div className="bg-slate-50 border border-slate-200/50 p-6 rounded-2xl">
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>Email:</strong> support@eprofile.cv
                <br />
                <strong>Phone:</strong> +919027640571
                <br />
                <strong>Support Hours:</strong> Monday to Friday, 9:00 AM to
                6:00 PM IST
                <br />
                <strong>Emergency Support:</strong> Available via email 24/7
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
