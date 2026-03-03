'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        src: '/slider image 1.1.png',
        alt: 'The Green Story – Natural Haircare',
    },
    {
        src: '/slider image 1.2.png',
        alt: 'The Green Story – Herbal Formulations',
    },
    {
        src: '/slider image 1.3.png',
        alt: 'The Green Story – Ayurvedic Oils',
    },
    {
        src: '/slider image 1.4.png',
        alt: 'The Green Story – Pure Ingredients',
    },
    {
        src: '/slider image 1.5.png',
        alt: 'The Green Story – Handcrafted Care',
    },
];

const AUTOPLAY_INTERVAL = 2500;

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

    const goTo = useCallback(
        (index: number, dir: number) => {
            setDirection(dir);
            setCurrent(index);
        },
        []
    );

    const next = useCallback(() => {
        goTo((current + 1) % slides.length, 1);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + slides.length) % slides.length, -1);
    }, [current, goTo]);

    // Autoplay
    useEffect(() => {
        const timer = setInterval(next, AUTOPLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [next]);

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
        },
        exit: (dir: number) => ({
            x: dir > 0 ? '-100%' : '100%',
            opacity: 0,
            transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
        }),
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-brand-gray">
            {/* Slides */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[current].src}
                        alt={slides[current].alt}
                        fill
                        priority={current === 0}
                        className="object-contain object-center"
                        sizes="100vw"
                    />
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i, i > current ? 1 : -1)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`transition-all duration-300 rounded-full ${i === current
                            ? 'bg-brand-white w-6 h-1.5'
                            : 'bg-brand-white/50 w-1.5 h-1.5 hover:bg-brand-white/80'
                            }`}
                    />
                ))}
            </div>

            {/* Prev / Next arrows */}
            <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-brand-white/80 hover:bg-brand-white transition-colors text-brand-black"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-brand-white/80 hover:bg-brand-white transition-colors text-brand-black"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-white/20 z-10">
                <motion.div
                    key={current}
                    className="h-full bg-brand-white/70"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
                />
            </div>
        </div>
    );
}
