"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";

interface RazorpayCheckoutProps {
  plan: "PRO";
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
        name: "ProCard",
        description: planConfig.description,
        order_id: orderId,
        handler: async (response: any) => {
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
            } else {
              onError(
                typeof verifyResponse.error === "string"
                  ? verifyResponse.error
                  : "Payment verification failed"
              );
            }
          } catch (error) {
            onError("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "ProCard User",
          email: "user@procard.com",
        },
        theme: {
          color: "#2563eb", // Blue color matching our theme
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
    <button
      onClick={handlePayment}
      disabled={disabled || loading}
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
  );
}
