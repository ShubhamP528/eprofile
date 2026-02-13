export default function Testimonials() {
    return (
        <section className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">Testimonials</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Trusted by Professionals
                    </p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {/* Testimonial 1 */}
                    <div className="flex flex-col justify-between bg-white p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-2xl sm:p-10">
                        <div>
                            <p className="text-lg leading-8 text-gray-600">
                                “eProfile has completely changed how I network. No more running out of business cards at events. Just a quick scan and my details are saved.”
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-x-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                JD
                            </div>
                            <div className="text-sm leading-6">
                                <div className="font-semibold text-gray-900">John Doe</div>
                                <div className="text-gray-600">Real Estate Agent</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="flex flex-col justify-between bg-white p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-2xl sm:p-10">
                        <div>
                            <p className="text-lg leading-8 text-gray-600">
                                “The analytics feature is a game-changer. I can see exactly how many people are viewing my profile and clicking my links.”
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-x-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                JS
                            </div>
                            <div className="text-sm leading-6">
                                <div className="font-semibold text-gray-900">Jane Smith</div>
                                <div className="text-gray-600">Freelance Designer</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="flex flex-col justify-between bg-white p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-2xl sm:p-10">
                        <div>
                            <p className="text-lg leading-8 text-gray-600">
                                “Setting up my profile was incredibly easy. The templates are modern and professional. Highly recommended!”
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-x-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                MJ
                            </div>
                            <div className="text-sm leading-6">
                                <div className="font-semibold text-gray-900">Michael Johnson</div>
                                <div className="text-gray-600">Business Consultant</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
