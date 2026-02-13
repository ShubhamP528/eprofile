import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about eProfile's mission to revolutionize professional networking with eco-friendly digital business cards.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            About eProfile
          </h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 mb-4">
                At eProfile, we believe that every professional deserves a
                modern, eco-friendly way to share their contact information and
                showcase their work. Our mission is to revolutionize networking
                by providing beautiful, interactive digital business cards that
                make lasting impressions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What We Do
              </h2>
              <p className="text-gray-700 mb-4">
                eProfile is a comprehensive digital business card platform that
                enables professionals, entrepreneurs, and businesses to create
                stunning online profiles. Our platform offers:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Professional digital business card templates</li>
                <li>Customizable designs and branding options</li>
                <li>Contact information management</li>
                <li>Portfolio and gallery showcases</li>
                <li>Lead generation and analytics tools</li>
                <li>QR code generation for easy sharing</li>
                <li>Social media integration</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Why Choose eProfile?
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    🌱 Eco-Friendly
                  </h3>
                  <p className="text-blue-800">
                    Reduce paper waste and environmental impact with digital
                    business cards that can be shared instantly.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    📱 Always Updated
                  </h3>
                  <p className="text-green-800">
                    Update your information once and it's instantly available to
                    everyone who has your digital card.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    📊 Analytics Insights
                  </h3>
                  <p className="text-purple-800">
                    Track who views your profile, which sections get the most
                    attention, and measure your networking success.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">
                    🎨 Professional Design
                  </h3>
                  <p className="text-orange-800">
                    Choose from multiple professionally designed templates that
                    make you stand out from the crowd.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-gray-700 mb-4">
                Founded in 2024, eProfile was born from the frustration of
                constantly running out of business cards at networking events
                and the environmental concern of paper waste. Our team of
                designers and developers came together to create a solution that
                would be both practical and sustainable.
              </p>
              <p className="text-gray-700 mb-4">
                Today, eProfile serves thousands of professionals across various
                industries, helping them make meaningful connections and grow
                their networks in the digital age.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Our Values
              </h2>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Innovation</h3>
                  <p className="text-gray-700">
                    We continuously evolve our platform with cutting-edge
                    features and designs.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900">
                    Sustainability
                  </h3>
                  <p className="text-gray-700">
                    We're committed to reducing environmental impact through
                    digital solutions.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900">User-Centric</h3>
                  <p className="text-gray-700">
                    Every feature we build is designed with our users' success
                    in mind.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Quality</h3>
                  <p className="text-gray-700">
                    We maintain the highest standards in design, functionality,
                    and security.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Security & Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                Your data security and privacy are our top priorities. We
                implement industry-standard security measures including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>SSL encryption for all data transmission</li>
                <li>Secure payment processing through certified gateways</li>
                <li>Regular security audits and updates</li>
                <li>GDPR and data protection compliance</li>
                <li>Transparent privacy policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Join Our Community
              </h2>
              <p className="text-gray-700 mb-4">
                Become part of a growing community of professionals who are
                modernizing their networking approach. Whether you're a
                freelancer, entrepreneur, or corporate professional, eProfile
                has the tools you need to make meaningful connections.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-blue-800 mb-4">
                  Create your professional digital business card today and start
                  networking smarter.
                </p>
                <Link
                  href="/auth/signup"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Your eProfile
                </Link>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> hello@eprofile.com
                  <br />
                  <strong>Support:</strong> support@eprofile.com
                  <br />
                  <strong>Business:</strong> business@eprofile.com
                  <br />
                  <strong>Address:</strong> [Your Business Address]
                  <br />
                  <strong>Phone:</strong> [Your Contact Number]
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
