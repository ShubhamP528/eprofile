import { UserPlus, Layout, Share2 } from "lucide-react";

const steps = [
    {
        name: "Create Account",
        description: "Sign up in seconds using your email or Google account.",
        icon: UserPlus,
    },
    {
        name: "Design Your Card",
        description: "Choose a template and customize your profile with your details.",
        icon: Layout,
    },
    {
        name: "Share Instantly",
        description: "Share your unique link or QR code with anyone, anywhere.",
        icon: Share2,
    },
];

export default function HowItWorks() {
    return (
        <div className="relative bg-white py-24 sm:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-20">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Simple Process</h2>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        How It Works
                    </p>
                    <p className="mt-4 text-lg text-slate-600">
                        Get your professional eProfile up and running in three simple steps.
                    </p>
                </div>

                <div className="relative mx-auto max-w-none">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[44px] left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-slate-200 z-0" />

                    <dl className="relative grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-12 z-10">
                        {steps.map((step, stepIdx) => (
                            <div key={step.name} className="flex flex-col items-center text-center group">
                                {/* Icon container with step number */}
                                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 shadow-sm group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white transition-all duration-300">
                                    <step.icon className="h-9 w-9 text-indigo-600 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white shadow">
                                        {stepIdx + 1}
                                    </span>
                                </div>

                                <dt className="text-xl font-bold text-slate-900">
                                    {step.name}
                                </dt>
                                <dd className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xs">
                                    {step.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
