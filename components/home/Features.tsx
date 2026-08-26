import {
    Smartphone,
    Share2,
    BarChart3,
    Palette,
    ShieldCheck,
    Zap
} from "lucide-react";

const features = [
    {
        name: "Mobile Optimized",
        description: "Your digital card looks perfect on any device, from smartphones to tablets.",
        icon: Smartphone,
    },
    {
        name: "Instant Sharing",
        description: "Share via QR code, link, email, or social media with just one click.",
        icon: Share2,
    },
    {
        name: "Analytics & Insights",
        description: "Track views and clicks to understand how people interact with your profile.",
        icon: BarChart3,
    },
    {
        name: "Customizable Design",
        description: "Choose from beautiful templates and customize colors to match your brand.",
        icon: Palette,
    },
    {
        name: "Secure & Private",
        description: "Your data is encrypted and secure. You control what information is public.",
        icon: ShieldCheck,
    },
    {
        name: "Fast & Reliable",
        description: "Built on modern technology for lightning-fast load times and 99.9% uptime.",
        icon: Zap,
    },
];

export default function Features() {
    return (
        <div className="relative bg-slate-50/50 py-24 sm:py-32 overflow-hidden border-y border-slate-200/40">
            {/* Glow Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-20">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Why Choose eProfile?
                    </p>
                    <p className="mt-4 text-lg text-slate-600">
                        We provide all the tools you need to create a professional online presence that converts.
                    </p>
                </div>
                <div className="mx-auto max-w-none">
                    <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div 
                                key={feature.name} 
                                className="relative bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300 shadow-sm group"
                            >
                                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <dt className="text-lg font-bold text-slate-900 mb-2">
                                    {feature.name}
                                </dt>
                                <dd className="text-sm text-slate-600 leading-relaxed">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
