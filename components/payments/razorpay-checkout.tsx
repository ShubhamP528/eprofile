"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";

interface RazorpayCheckoutProps {
  plan: "STANDARD" | "PRO";
  amount: number;
  onSuccess: (paymentData: any) => void;
  onError: (error: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayCheckout({
  plan,
  amount,
  onSuccess,
  onError,
  disabled = false,
  children,
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        onError("Failed to load payment gateway. Please try again.");
        return;
      }

      // Create order
      const orderResponse = await apiClient.createPaymentOrder(plan);

      if (!orderResponse.success) {
        onError(
          typeof orderResponse.error === "string"
            ? orderResponse.error
            : "Failed to create payment order"
        );
        return;
      }

      const {
        orderId,
        amount: orderAmount,
        currency,
        key,
        planConfig,
      } = orderResponse.data as any;

      // Razorpay options
      const options = {
        key: key,
        amount: orderAmount,
        currency: currency,
        name: "eProfile",
        description: planConfig.description,
        order_id: orderId,
        handler: async (response: any) => {
          setVerifying(true);
          try {
            // Verify payment
            const verifyResponse = await apiClient.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan,
            });

            if (verifyResponse.success) {
              onSuccess(verifyResponse.data);
              setVerifying(false);
            } else {
              setVerifying(false);
              onError(
                typeof verifyResponse.error === "string"
                  ? verifyResponse.error
                  : "Payment verification failed"
              );
            }
          } catch (error) {
            setVerifying(false);
            onError("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "eProfile User",
          email: "user@eprofile.cv",
        },
        theme: {
          color: "#4f46e5", // Updated theme color to brand Indigo
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      onError("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={disabled || loading || verifying}
        className="w-full"
      >
        {loading ? (
          <div className="flex items-center justify-center py-1">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            <span className="text-sm sm:text-base">Processing...</span>
          </div>
        ) : (
          children
        )}
      </button>

      {verifying && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center space-y-6">
            {/* Premium Loader Animation */}
            <div className="relative flex items-center justify-center w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              <svg className="w-6 h-6 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">Payment Verification</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                We are securely processing and verifying your transaction. This might take a few moments.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start space-x-3 text-left">
              <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs text-amber-800 font-semibold leading-relaxed">
                Please do not close this window, refresh the page, or click the back button.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
