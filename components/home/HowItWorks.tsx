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
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">Simple Process</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        How It Works
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Get your professional eProfile up and running in three simple steps.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {steps.map((step, stepIdx) => (
                            <div key={step.name} className="flex flex-col items-center text-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                                    <step.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                                </div>
                                <dt className="text-xl font-semibold leading-7 text-gray-900">
                                    {stepIdx + 1}. {step.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{step.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
