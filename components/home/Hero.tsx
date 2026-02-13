import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Hero() {
    const { data: session } = useSession();

    return (
        <section className="relative overflow-hidden bg-white pt-16 pb-32 space-y-24">
            <div className="relative">
                <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
                    <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:px-0 lg:py-16">
                        <div>
                            <div className="mt-6">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Your Digital Identity, <br />
                                    <span className="text-blue-600">Reimagined.</span>
                                </h1>
                                <p className="mt-4 text-lg text-gray-500">
                                    Create a stunning digital visiting card in minutes. Share your contact info, social links, and portfolio with a single tap or QR code. Professional, eco-friendly, and always up-to-date.
                                </p>
                                <div className="mt-6 flex gap-4">
                                    <Link
                                        href={session ? "/dashboard" : "/auth/signup"}
                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
                                    >
                                        {session ? "Go to Dashboard" : "Get Started Free"}
                                    </Link>
                                    {!session && (
                                        <Link
                                            href="/auth/signin"
                                            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Sign In
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 sm:mt-16 lg:mt-0">
                        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-400/10">
                            <Image
                                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop"
                                alt="Digital visiting card on smartphone"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
