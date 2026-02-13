import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Information",
  description: "View eProfile's business details, contact information, and corporate identity.",
};

export default function BusinessInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Business Information
          </h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Company Details
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700">
                      <strong>Business Name:</strong> eProfile
                    </p>
                    <p className="text-gray-700">
                      <strong>Business Type:</strong> Technology Services /
                      Software as a Service (SaaS)
                    </p>
                    <p className="text-gray-700">
                      <strong>Industry:</strong> Digital Marketing &
                      Professional Services
                    </p>
                    <p className="text-gray-700">
                      <strong>Established:</strong> 2024
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Registration Number:</strong> [Your Business
                      Registration Number]
                    </p>
                    <p className="text-gray-700">
                      <strong>PAN Number:</strong> [Your PAN Number]
                    </p>
                    <p className="text-gray-700">
                      <strong>GST Number:</strong> [Your GST Number if
                      applicable]
                    </p>
                    <p className="text-gray-700">
                      <strong>CIN:</strong> [Corporate Identification Number if
                      applicable]
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Registered Office Address
                    </h3>
                    <p className="text-gray-700">
                      [Your Complete Business Address]
                      <br />
                      [City, State - PIN Code]
                      <br />
                      India
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Contact Details
                    </h3>
                    <p className="text-gray-700">
                      <strong>Phone:</strong> +91-[Your 10-digit Phone Number]
                      <br />
                      <strong>Email:</strong> contact@eprofile.com
                      <br />
                      <strong>Support:</strong> support@eprofile.com
                      <br />
                      <strong>Legal:</strong> legal@eprofile.com
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Business Description
              </h2>
              <p className="text-gray-700 mb-4">
                eProfile is a comprehensive digital business card platform that
                enables professionals and businesses to create, customize, and
                share interactive digital business cards. Our platform serves as
                a modern alternative to traditional paper business cards,
                offering enhanced functionality and analytics.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Services Offered
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Digital Business Card Creation:</strong> Professional
                  templates and customization tools
                </li>
                <li>
                  <strong>Contact Management:</strong> Lead capture and contact
                  organization
                </li>
                <li>
                  <strong>Analytics Dashboard:</strong> Detailed insights on
                  card views and interactions
                </li>
                <li>
                  <strong>QR Code Generation:</strong> Easy sharing through QR
                  codes
                </li>
                <li>
                  <strong>Social Media Integration:</strong> Connect all social
                  profiles in one place
                </li>
                <li>
                  <strong>Portfolio Showcase:</strong> Display work samples and
                  testimonials
                </li>
                <li>
                  <strong>Lead Generation:</strong> Capture and manage potential
                  customer information
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Target Audience
              </h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Business professionals and entrepreneurs</li>
                <li>Sales and marketing teams</li>
                <li>Freelancers and consultants</li>
                <li>Real estate agents and insurance professionals</li>
                <li>Small and medium businesses</li>
                <li>Networking professionals</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pricing and Subscription Model
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Subscription Plans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900">Free Plan</h4>
                    <p className="text-gray-600">₹0/month</p>
                    <p className="text-sm text-gray-500">
                      Basic features for individuals
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900">
                      Standard Plan
                    </h4>
                    <p className="text-gray-600">₹299/month</p>
                    <p className="text-sm text-gray-500">
                      Enhanced features for professionals
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900">Pro Plan</h4>
                    <p className="text-gray-600">₹599/month</p>
                    <p className="text-sm text-gray-500">
                      Full access to all premium features
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  * All prices include applicable GST as per Indian tax
                  regulations
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment and Security
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Payment Processing
                </h3>
                <p className="text-gray-700 mb-4">
                  All payments are processed securely through Razorpay, a
                  certified PCI DSS Level 1 compliant payment gateway. We
                  support multiple payment methods including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>
                    Credit and Debit Cards (Visa, Mastercard, RuPay, American
                    Express)
                  </li>
                  <li>Net Banking (All major Indian banks)</li>
                  <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
                  <li>Digital Wallets (Paytm, Mobikwik, etc.)</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Security Measures
                </h3>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>SSL encryption for all data transmission</li>
                  <li>PCI DSS compliant payment processing</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Secure cloud infrastructure</li>
                  <li>Data backup and disaster recovery</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Customer Support
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Support Channels
                </h3>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>
                    <strong>Email Support:</strong> support@eprofile.com
                  </li>
                  <li>
                    <strong>Phone Support:</strong> +91-[Your Phone Number]
                  </li>
                  <li>
                    <strong>Live Chat:</strong> Available on website during
                    business hours
                  </li>
                  <li>
                    <strong>Help Documentation:</strong> Comprehensive guides
                    and FAQs
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Support Hours
                </h3>
                <p className="text-gray-700">
                  Monday to Friday: 9:00 AM to 6:00 PM IST
                  <br />
                  Saturday: 10:00 AM to 4:00 PM IST
                  <br />
                  Sunday: Closed (Emergency support available via email)
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Legal Compliance
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  eProfile operates in full compliance with Indian laws and
                  regulations:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>
                    <strong>Information Technology Act, 2000:</strong> Data
                    protection and cybersecurity compliance
                  </li>
                  <li>
                    <strong>GST Act:</strong> Proper tax collection and
                    remittance
                  </li>
                  <li>
                    <strong>Consumer Protection Act, 2019:</strong> Customer
                    rights and protection
                  </li>
                  <li>
                    <strong>Digital Personal Data Protection Act:</strong>{" "}
                    Privacy and data protection
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Legal Documents
                </h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/refund"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Refund & Cancellation Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Contact Information
                    </Link>
                  </li>
                </ul>
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
