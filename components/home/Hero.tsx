"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Phone, Plus, Linkedin, Twitter, Instagram, Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function Hero() {
    const { data: session } = useSession();

    return (
        <section className="relative overflow-hidden bg-white pt-24 pb-32">
            {/* Glow blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    {/* Text Area */}
                    <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:px-0 lg:col-span-7 py-6">
                        <div>
                            {/* Premium Announcement Badge */}
                            <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5 text-xs font-semibold text-indigo-700 mb-6 animate-fade-in">
                                <span className="flex w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
                                Discover the Future of Networking
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl leading-tight">
                                Your Digital Identity, <br />
                                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
                                    Reimagined.
                                </span>
                            </h1>
                            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
                                Create a stunning digital visiting card in minutes. Share your contact info, social links, and portfolio with a single tap or QR code. Professional, eco-friendly, and always up-to-date.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={session ? "/dashboard" : "/auth/signup"}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-base font-semibold px-6 py-3.5 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    {session ? "Go to Dashboard" : "Get Started Free"}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                {!session && (
                                    <Link
                                        href="/auth/signin"
                                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-base font-semibold px-6 py-3.5 hover:border-slate-300 transition-all"
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </div>

                            {/* Trust badges */}
                            <div className="mt-12 flex items-center gap-6 border-t border-slate-100 pt-8">
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">10k+</p>
                                    <p className="text-xs text-slate-500">Active Professionals</p>
                                </div>
                                <div className="border-l border-slate-200 h-8"></div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">10+</p>
                                    <p className="text-xs text-slate-500">Premium Templates</p>
                                </div>
                                <div className="border-l border-slate-200 h-8"></div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">100%</p>
                                    <p className="text-xs text-slate-500">Eco-Friendly & Digital</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mockup Area */}
                    <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-5 flex justify-center relative">
                        {/* Decorative Background Ring */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-indigo-100 pointer-events-none opacity-40"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] rounded-full border border-dashed border-slate-200 pointer-events-none opacity-30"></div>

                        {/* Smartphone Container */}
                        <div className="relative w-full max-w-[340px] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-12 ring-slate-950 shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-500 hover:-translate-y-2.5 z-10">
                            {/* Notch */}
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full mr-2"></div>
                                <div className="w-10 h-1 bg-slate-900 rounded-full"></div>
                            </div>

                            {/* Simulated Screen */}
                            <div className="relative overflow-hidden rounded-[36px] bg-slate-50 border border-slate-200/50 w-full min-h-[500px] flex flex-col select-none">
                                {/* Cover Banner */}
                                <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-white">
                                        Pro Member
                                    </div>
                                </div>

                                {/* Profile info details */}
                                <div className="px-5 -mt-10 relative flex-1 flex flex-col pb-5">
                                    {/* Avatar */}
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white bg-slate-100 shadow-md">
                                        <img
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
                                            alt="Profile avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="mt-3 flex items-center gap-1">
                                        <h3 className="text-base font-extrabold text-slate-900 leading-none">Sarah Jenkins</h3>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10 flex-shrink-0" />
                                    </div>
                                    <p className="text-[10px] font-bold text-indigo-600 mt-0.5">Creative Director & Designer</p>
                                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                                        Helping brands create digital-first products and stunning brand identities.
                                    </p>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <div className="flex items-center justify-center gap-1 bg-indigo-600 text-white py-1.5 px-2.5 rounded-xl text-[10px] font-bold shadow-sm cursor-pointer hover:bg-indigo-700 transition-colors">
                                            <Phone className="w-3 h-3" />
                                            Call
                                        </div>
                                        <div className="flex items-center justify-center gap-1 bg-slate-900 text-white py-1.5 px-2.5 rounded-xl text-[10px] font-bold shadow-sm cursor-pointer hover:bg-slate-800 transition-colors">
                                            <Plus className="w-3 h-3" />
                                            Save
                                        </div>
                                    </div>

                                    {/* Social icons */}
                                    <div className="flex items-center justify-between gap-1 mt-4">
                                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors shadow-sm cursor-pointer">
                                            <Linkedin className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors shadow-sm cursor-pointer">
                                            <Twitter className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors shadow-sm cursor-pointer">
                                            <Instagram className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors shadow-sm cursor-pointer">
                                            <Mail className="w-3.5 h-3.5" />
                                        </div>
                                    </div>

                                    {/* Highlighted Service Card */}
                                    <div className="mt-4 border border-slate-200/60 rounded-xl bg-white p-3 shadow-sm">
                                        <p className="text-[8px] font-bold text-indigo-600 uppercase tracking-wider">Featured Service</p>
                                        <h4 className="text-[10px] font-bold text-slate-900 mt-0.5 leading-tight">Custom Brand Guidelines</h4>
                                        <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-slate-100">
                                            <span className="text-xs font-extrabold text-slate-900">₹14,999</span>
                                            <span className="text-[8px] font-semibold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">Deliver in 5 days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
