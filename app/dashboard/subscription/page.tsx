import SubscriptionManager from "@/components/subscription/subscription-manager";

export default function SubscriptionPage() {
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Subscription
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Manage your eProfile subscription and billing
        </p>
      </div>

      <SubscriptionManager />

      {/* Billing History */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Billing History
        </h3>
        <div className="text-center py-6 sm:py-8 text-gray-500">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-sm sm:text-base">No billing history available</p>
          <p className="text-xs sm:text-sm mt-1">
            Your payment history will appear here
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
              Can I cancel my subscription anytime?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Yes, you can cancel your Pro subscription at any time. You'll
              continue to have access to Pro features until your current billing
              period ends.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
              What happens when I downgrade to Free?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              When you downgrade, you'll lose access to Pro features but your
              cards will remain active. Some advanced features like custom
              domains and payment integration will be disabled.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
              Do you offer refunds?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We offer a 14-day free trial for new Pro subscribers. After that,
              we provide refunds on a case-by-case basis. Please contact support
              for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
