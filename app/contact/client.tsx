"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Check, ArrowRight, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    plan: "enterprise",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error || "Failed to send message. Please try again later.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-10 text-center shadow-lg shadow-slate-100">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Thank You!</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            We've received your message and will get back to you within 24
            hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                company: "",
                message: "",
                plan: "enterprise",
              });
            }}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 px-6 rounded-xl font-bold text-sm hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative bg-white border-b border-slate-200/50 overflow-hidden py-16 sm:py-20">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Get in
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Touch</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with eProfile? Let's discuss your
            needs and find the perfect solution.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Let's Start a Conversation
            </h2>

            <div className="space-y-6">
              <div className="flex items-start bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center mr-4 text-indigo-600 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Email Us</h3>
                  <p className="text-sm text-slate-600 mt-1 font-semibold">support@eprofile.cv</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mr-4 text-emerald-600 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Call Us</h3>
                  <p className="text-sm text-slate-600 mt-1 font-semibold">+91 90276 40571</p>
                  <p className="text-xs text-slate-400 mt-0.5">Mon-Fri 9AM-6PM IST</p>
                </div>
              </div>

              <div className="flex items-start bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center mr-4 text-violet-600 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Visit Us</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Rudraksh Colony, Janpth Road, Fulsunga, Rudrapur, Uttrakhand, Pin - 263153
                  </p>
                  <p className="text-xs text-slate-400 mt-1">By appointment only</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Why Choose eProfile Enterprise?
              </h3>
              <ul className="space-y-3">
                {[
                  "Dedicated account manager",
                  "Custom integrations and features",
                  "Priority support with SLA",
                  "Team training and onboarding",
                  "Advanced security and compliance",
                  "Flexible pricing for large teams",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center text-xs text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Send us a Message
            </h2>

            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-slate-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all text-sm text-slate-800"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all text-sm text-slate-800"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-xs font-bold text-slate-700 mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all text-sm text-slate-800"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label
                  htmlFor="plan"
                  className="block text-xs font-bold text-slate-700 mb-2"
                >
                  Interested Plan
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all text-sm text-slate-800"
                >
                  <option value="enterprise">Enterprise</option>
                  <option value="pro">Pro</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-slate-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all text-sm text-slate-800"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
