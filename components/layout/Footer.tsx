import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
                    {/* Brand Info */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2.5 mb-4 group">
                            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                                <svg
                                    className="w-4.5 h-4.5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.2}
                                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
                                eProfile
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                            Build your professional digital identity in minutes. Share your contact info, social links, and portfolio with a single link.
                        </p>
                    </div>

                    {/* Columns */}
                    <div>
                        <h3 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/features"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/digital-business-card-india"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Digital Card in India
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/digital-business-card-for-freelancers"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    For Freelancers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/nfc-business-card"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    NFC Business Cards
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/digital-vs-paper-business-cards"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Digital vs Paper
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/business-info"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Business Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/refund"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="/sitemap.xml"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Sitemap
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:support@eprofile.cv"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@eprofile.cv"
                                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200/50 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-400">
                            © {new Date().getFullYear()} eProfile. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                            <Link
                                href="/privacy"
                                className="text-xs text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-xs text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/refund"
                                className="text-xs text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                Refunds
                            </Link>
                            <a
                                href="/sitemap.xml"
                                className="text-xs text-slate-400 hover:text-indigo-600 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
