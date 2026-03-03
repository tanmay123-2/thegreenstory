'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const reviewImages = [
    {
        src: '/reviews/WhatsApp Image 2026-03-03 at 2.27.44 PM.jpeg',
        alt: 'Customer review 1',
    },
    {
        src: '/reviews/WhatsApp Image 2026-03-03 at 2.27.44 PM (1).jpeg',
        alt: 'Customer review 2',
    },
    {
        src: '/reviews/WhatsApp Image 2026-03-03 at 2.27.45 PM.jpeg',
        alt: 'Customer review 3',
    },
    {
        src: '/reviews/WhatsApp Image 2026-03-03 at 2.27.45 PM (1).jpeg',
        alt: 'Customer review 4',
    },
    {
        src: '/reviews/WhatsApp Image 2026-03-03 at 2.27.45 PM (2).jpeg',
        alt: 'Customer review 5',
    },
];

const stats = [
    { label: 'Happy Customers', value: '100+' },
    { label: '100% Herbal Formula', value: '100%' },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
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

            {/* Review Images Grid — 4 per row */}
            <motion.div
                className="max-w-6xl mx-auto px-4 md:px-6 py-12"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                    {reviewImages.map((img, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="relative overflow-hidden bg-brand-white border border-brand-gray-dark/10"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={400}
                                height={300}
                                className="w-full h-auto object-contain"
                                sizes="(max-width: 640px) 50vw, 25vw"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Review Video */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-2 md:mt-3 bg-brand-white border border-brand-gray-dark/10 overflow-hidden"
                >
                    <video
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-auto max-h-[70vh] object-contain"
                    >
                        <source src="/reviews/WhatsApp%20Video%202026-03-03%20at%202.27.57%20PM.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
            </motion.div>

        </div>
    );
}
