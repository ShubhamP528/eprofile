import SubscriptionManager from "@/components/subscription/subscription-manager";
import BillingHistoryManager from "@/components/billing/billing-history-manager";

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
      <BillingHistoryManager />

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
