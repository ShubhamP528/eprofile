import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                            Product
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/features"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                            Company
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/business-info"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Business Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/refund"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Refund Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                            Support
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:support@eprofile.com"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@eprofile.com"
                                    className="text-base text-gray-500 hover:text-gray-900"
                                >
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-base text-gray-400">
                            © {new Date().getFullYear()} eProfile. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/refund"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                Refunds
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
