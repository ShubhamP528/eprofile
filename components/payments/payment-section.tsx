"use client";

import { useState } from "react";

interface CardWithPayments {
  id: string;
  title: string;
  paymentEnabled?: boolean;
  paymentText?: string;
  upiId?: string;
  upiQrCode?: string;
  razorpayId?: string;
  paytmId?: string;
}

interface PaymentSectionProps {
  card: CardWithPayments;
}

export default function PaymentSection({ card }: PaymentSectionProps) {
  const [showQrCode, setShowQrCode] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");

  if (!card.paymentEnabled) {
    return null;
  }

  const hasPaymentOptions = card.upiId || card.razorpayId || card.paytmId;

  if (!hasPaymentOptions) {
    return null;
  }

  const handleUpiPayment = () => {
    if (card.upiQrCode) {
      setShowQrCode(true);
    } else if (card.upiId) {
      // Generate UPI payment link
      const amount = selectedAmount ? `&am=${selectedAmount}` : "";
      const upiUrl = `upi://pay?pa=${card.upiId}&pn=${encodeURIComponent(
        card.title
      )}${amount}`;
      window.open(upiUrl, "_blank");
    }
  };

  const handleRazorpayPayment = () => {
    if (!card.razorpayId) return;

    // This is a simplified implementation
    // In a real app, you'd integrate with Razorpay's SDK
    const amount = selectedAmount ? parseInt(selectedAmount) * 100 : 100; // Convert to paise

    // For demo purposes, we'll just show an alert
    // In production, you'd use Razorpay's checkout
    alert(`Razorpay payment integration would open here for ₹${amount / 100}`);

    // Example Razorpay integration:
    /*
    const options = {
      key: card.razorpayId,
      amount: amount,
      currency: 'INR',
      name: card.title,
      description: 'Payment for services',
      handler: function (response) {
        console.log('Payment successful:', response);
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    */
  };

  const handlePaytmPayment = () => {
    if (!card.paytmId) return;

    // This is a simplified implementation
    // In a real app, you'd integrate with Paytm's SDK
    alert("Paytm payment integration would open here");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Make a Payment
        </h3>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (Optional)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            ₹
          </span>
          <input
            type="number"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-3">
        {card.upiId && (
          <button
            onClick={handleUpiPayment}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span>{card.paymentText} via UPI</span>
          </button>
        )}

        {card.razorpayId && (
          <button
            onClick={handleRazorpayPayment}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 13.5L8.5 16 12 18.5 15.5 16 12 13.5z" />
            </svg>
            <span>{card.paymentText} via Razorpay</span>
          </button>
        )}

        {card.paytmId && (
          <button
            onClick={handlePaytmPayment}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span>{card.paymentText} via Paytm</span>
          </button>
        )}
      </div>

      {/* QR Code Modal */}
      {showQrCode && card.upiQrCode && (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Scan QR Code to Pay
              </h4>
              <div className="mb-4">
                <img
                  src={card.upiQrCode}
                  alt="UPI QR Code"
                  className="w-48 h-48 mx-auto border border-gray-300 rounded-lg"
                />
              </div>
              {selectedAmount && (
                <p className="text-lg font-medium text-gray-900 mb-4">
                  Amount: ₹{selectedAmount}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-4">
                Open any UPI app and scan this QR code to make payment
              </p>
              <button
                onClick={() => setShowQrCode(false)}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <p className="text-xs text-gray-600 text-center">
          Secure payment processing. Your payment information is protected.
        </p>
      </div>
    </div>
  );
}
