'use client';

import { motion } from 'framer-motion';

const stats = [
    { label: 'Happy Customers', value: '100+' },
    { label: '100% Herbal Formula', value: '100%' },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TestimonialsPage() {
    return (
        <div className="bg-brand-gray min-h-screen">

            {/* Header */}
            <header className="bg-brand-white py-14 px-6 border-b border-brand-gray-dark/10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
                        Real Results. No Filters.
                    </h1>
                    <p className="text-[13px] text-brand-gray-dark font-medium max-w-xl leading-relaxed">
                        Unedited screenshots straight from our customers. No fake testimonials, just real feedback.
                    </p>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="bg-brand-black text-brand-white border-b border-brand-gray-dark/10">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-2 divide-x divide-brand-gray-dark/30">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center px-4">
                                <p className="text-2xl md:text-4xl font-bold tracking-tighter mb-1">{stat.value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/70">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Coming Soon */}
            <motion.div
                className="max-w-6xl mx-auto px-4 md:px-6 py-24 flex flex-col items-center justify-center text-center"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
            >
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gray-dark mb-4">Reviews</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mb-4">More Coming Soon</h2>
                <p className="text-[13px] text-brand-gray-dark font-medium max-w-md leading-relaxed">
                    We are collecting real customer reviews and will be sharing them here shortly. Thank you for your patience.
                </p>
            </motion.div>

        </div>
    );
}
