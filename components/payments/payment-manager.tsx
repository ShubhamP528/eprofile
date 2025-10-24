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

interface PaymentManagerProps {
  card: CardWithPayments;
  onUpdate: (data: any) => void;
}

export default function PaymentManager({
  card,
  onUpdate,
}: PaymentManagerProps) {
  const [paymentData, setPaymentData] = useState({
    paymentEnabled: card.paymentEnabled || false,
    paymentText: card.paymentText || "Pay Now",
    upiId: card.upiId || "",
    upiQrCode: card.upiQrCode || "",
    razorpayId: card.razorpayId || "",
    paytmId: card.paytmId || "",
  });

  const [uploading, setUploading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    const updatedData = { ...paymentData, [field]: value };
    setPaymentData(updatedData);
    onUpdate(updatedData);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "visiting-cards"); // You'll need to set this up in Cloudinary

      // Upload to Cloudinary (you can replace this with your preferred service)
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        handleInputChange("upiQrCode", data.secure_url);
      } else {
        // Fallback: convert to base64 for demo purposes
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          handleInputChange("upiQrCode", base64);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // Fallback: convert to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        handleInputChange("upiQrCode", base64);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Payment Options
          </h3>
          <p className="text-sm text-gray-600">
            Enable payment options for your services
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={paymentData.paymentEnabled}
            onChange={(e) =>
              handleInputChange("paymentEnabled", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {paymentData.paymentEnabled && (
        <div className="space-y-6 border-t pt-6">
          {/* Payment Button Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Button Text
            </label>
            <input
              type="text"
              value={paymentData.paymentText}
              onChange={(e) => handleInputChange("paymentText", e.target.value)}
              placeholder="Pay Now"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* UPI Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-4">UPI Payment</h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={paymentData.upiId}
                  onChange={(e) => handleInputChange("upiId", e.target.value)}
                  placeholder="yourname@paytm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI QR Code
                </label>
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload your UPI QR code image (max 5MB)
                    </p>
                  </div>
                  {paymentData.upiQrCode && (
                    <div className="w-20 h-20 border border-gray-300 rounded-md overflow-hidden">
                      <img
                        src={paymentData.upiQrCode}
                        alt="UPI QR Code"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {uploading && (
                  <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Gateway Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-4">Payment Gateways</h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Razorpay ID
                </label>
                <input
                  type="text"
                  value={paymentData.razorpayId}
                  onChange={(e) =>
                    handleInputChange("razorpayId", e.target.value)
                  }
                  placeholder="rzp_live_xxxxxxxxxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your Razorpay merchant ID
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paytm Merchant ID
                </label>
                <input
                  type="text"
                  value={paymentData.paytmId}
                  onChange={(e) => handleInputChange("paytmId", e.target.value)}
                  placeholder="PAYTM_MERCHANT_ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your Paytm merchant ID
                </p>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Preview</h4>
            <div className="space-y-2">
              {paymentData.upiId && (
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  {paymentData.paymentText} via UPI
                </button>
              )}
              {paymentData.razorpayId && (
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  {paymentData.paymentText} via Razorpay
                </button>
              )}
              {paymentData.paytmId && (
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  {paymentData.paymentText} via Paytm
                </button>
              )}
              {!paymentData.upiId &&
                !paymentData.razorpayId &&
                !paymentData.paytmId && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    Configure at least one payment option to see preview
                  </p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
