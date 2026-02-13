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
        <div className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Why Choose eProfile?
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We provide all the tools you need to create a professional online presence that converts.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
