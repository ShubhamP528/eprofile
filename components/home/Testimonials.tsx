import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        quote: "eProfile has completely changed how I network. No more running out of business cards at events. Just a quick scan and my details are saved.",
        author: "John Doe",
        role: "Real Estate Agent",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
        rating: 5,
    },
    {
        quote: "The analytics feature is a game-changer. I can see exactly how many people are viewing my profile and clicking my links.",
        author: "Jane Smith",
        role: "Freelance Designer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
        rating: 5,
    },
    {
        quote: "Setting up my profile was incredibly easy. The templates are modern and professional. Highly recommended!",
        author: "Michael Johnson",
        role: "Business Consultant",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="relative bg-slate-50/50 py-24 sm:py-32 overflow-hidden border-t border-slate-200/40">
            {/* Glow blob */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Testimonials</h2>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Trusted by Professionals
                    </p>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {testimonials.map((item, index) => (
                        <div 
                            key={index}
                            className="flex flex-col justify-between bg-white border border-slate-200/60 p-8 shadow-sm rounded-2xl hover:shadow-lg hover:border-indigo-500/10 hover:-translate-y-1 transition-all duration-300 relative group"
                        >
                            <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-100 group-hover:text-indigo-50 transition-colors duration-300 pointer-events-none z-0" />
                            
                            <div className="relative z-10">
                                {/* Stars */}
                                <div className="flex gap-0.5 mb-5">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-base leading-relaxed text-slate-600 font-medium">
                                    “{item.quote}”
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-x-4 relative z-10 border-t border-slate-100 pt-5">
                                <div className="h-11 w-11 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
                                    <img 
                                        src={item.avatar} 
                                        alt={item.author} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-sm">
                                    <div className="font-bold text-slate-900">{item.author}</div>
                                    <div className="text-xs text-slate-500">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
