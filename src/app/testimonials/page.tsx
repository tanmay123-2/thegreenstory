import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsPage() {
    const testimonials = [
        {
            id: 1,
            name: "Priya S.",
            role: "Verified Buyer",
            product: "10% Vitamin C Serum",
            rating: 5,
            title: "Finally, something that works",
            content: "I've tried countless vitamin C serums, but this one actually delivers. It's lightweight, non-sticky, and my skin looks noticeably brighter after just two weeks. Finally, a transparent brand I can trust.",
            date: "October 12, 2023"
        },
        {
            id: 2,
            name: "Rahul M.",
            role: "Verified Buyer",
            product: "Salicylic Acid 2% Extract",
            rating: 5,
            title: "Game changer for acne-prone skin",
            content: "This formulation is potent yet gentle. I've struggled with adult acne for years, and this is the only product that has kept my breakouts at bay without completely drying out my skin barrier. Will repurchase forever.",
            date: "November 05, 2023"
        },
        {
            id: 3,
            name: "Ananya D.",
            role: "Verified Buyer",
            product: "Hyaluronic Acid 2% + B5",
            rating: 5,
            title: "Ultimate hydration",
            content: "I live in a very dry climate and my skin was constantly flaking. This hyaluronic acid plumps my skin immediately. It sinks in so beautifully under moisturizer. Worth every penny.",
            date: "January 18, 2024"
        },
        {
            id: 4,
            name: "Karan V.",
            role: "Verified Buyer",
            product: "Niacinamide 10%",
            rating: 4,
            title: "Reduced my pore size",
            content: "I've been using this for a month. The texture takes a minute to sink in, but the results are undeniable. My pores look smaller and my overall tone is much more even.",
            date: "February 02, 2024"
        },
        {
            id: 5,
            name: "Meera K.",
            role: "Verified Buyer",
            product: "Multi-Peptide Hair Serum",
            rating: 5,
            title: "Actual visible baby hairs!",
            content: "I was skeptical, but after 3 months of consistent use, I have completely new hair growth along my hairline. It doesn't make my scalp greasy at all so I can use it daily.",
            date: "March 15, 2024"
        },
        {
            id: 6,
            name: "Sarah T.",
            role: "Verified Buyer",
            product: "Soothing Botanical Cleanser",
            rating: 5,
            title: "Gentlest cleanser ever",
            content: "My sensitive skin loves this. It removes all my makeup without that tight, stripped feeling. It just feels clean, balanced, and calm. The minimalist ingredient list is exactly what I needed.",
            date: "April 08, 2024"
        }
    ];

    // Stats for the top section
    const stats = [
        { label: 'Happy Customers', value: '100,000+' },
        { label: 'Average Rating', value: '4.8/5' },
        { label: 'Science-Backed Formulas', value: '100%' }
    ];

    return (
        <div className="bg-brand-gray min-h-screen">
            {/* Header Banner */}
            <header className="bg-brand-white py-16 px-6 border-b border-brand-gray-dark/10">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">Real Results. No Filters.</h1>
                    <p className="text-[14px] text-brand-gray-dark font-medium max-w-2xl mx-auto leading-relaxed">
                        We believe in efficacy and transparency. Read what our community has to say about their experience with our clinical formulations.
                    </p>
                </div>
            </header>

            {/* Stats Section */}
            <div className="bg-brand-black text-brand-white border-b border-brand-gray-dark/10">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-gray-dark/30">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center pt-8 md:pt-0 first:pt-0">
                                <p className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{stat.value}</p>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gray">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-brand-white p-8 border border-brand-gray-dark/10 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex text-yellow-500 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < testimonial.rating ? "currentColor" : "none"}
                                        className={i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}
                                        strokeWidth={1.5}
                                    />
                                ))}
                            </div>

                            <h3 className="text-lg font-bold text-brand-black mb-3 leading-snug tracking-tight">"{testimonial.title}"</h3>
                            <p className="text-brand-gray-dark text-[14px] leading-relaxed mb-6 font-medium">
                                {testimonial.content}
                            </p>

                            <div className="mt-auto border-t border-brand-gray-dark/10 pt-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="font-bold text-[13px] text-brand-black uppercase tracking-wide">{testimonial.name}</p>
                                        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-green-700 tracking-widest uppercase">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                            {testimonial.role}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] font-medium text-brand-gray-dark mb-1">{testimonial.date}</p>
                                        <p className="text-[11px] font-bold text-brand-black tracking-wider uppercase truncate max-w-[120px]">{testimonial.product}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-brand-black text-brand-white text-[11px] font-bold uppercase tracking-widest py-4 px-10 hover:bg-brand-gray-dark transition-colors">
                        Load More Reviews
                    </button>
                </div>
            </div>
        </div>
    );
}
