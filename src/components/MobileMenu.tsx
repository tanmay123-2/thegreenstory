"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const [activeSubMenu, setActiveSubMenu] = useState<'main' | 'shop'>('main');

    const menuVariants = {
        closed: {
            x: "-100%",
            transition: { duration: 0.3 }
        },
        open: {
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    const overlayVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    const handleSubMenuClick = (menu: 'main' | 'shop') => {
        setActiveSubMenu(menu);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-brand-black/50 z-50 md:hidden"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        className="fixed top-0 left-0 w-4/5 sm:w-80 h-full bg-brand-white z-50 md:hidden shadow-2xl flex flex-col pt-16"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
                            <AnimatePresence mode="wait">
                                {activeSubMenu === 'main' && (
                                    <motion.div
                                        key="main"
                                        initial={{ x: "-10%" }}
                                        animate={{ x: 0 }}
                                        exit={{ x: "-10%" }}
                                        transition={{ duration: 0.2 }}
                                        className="h-full w-full absolute top-0 left-0 px-6 py-8"
                                    >
                                        <nav className="flex flex-col gap-6 text-[15px] font-bold uppercase tracking-widest text-brand-black">
                                            <button
                                                onClick={() => handleSubMenuClick('shop')}
                                                className="flex justify-between items-center text-left py-2 hover:opacity-70 transition-opacity w-full"
                                            >
                                                Shop All
                                                <ChevronRight size={18} />
                                            </button>
                                            <Link href="/routine" onClick={onClose} className="py-2 hover:opacity-70 transition-opacity">
                                                Build Routine
                                            </Link>
                                            <Link href="/testimonials" onClick={onClose} className="py-2 hover:opacity-70 transition-opacity">
                                                Reviews
                                            </Link>
                                            <Link href="/contact" onClick={onClose} className="py-2 hover:opacity-70 transition-opacity">
                                                Contact Us
                                            </Link>
                                            <div className="h-px bg-brand-gray-dark/10 my-4" />
                                            <Link href="/register" onClick={onClose} className="py-2 hover:opacity-70 transition-opacity text-[13px] text-brand-gray-dark">
                                                My Account
                                            </Link>
                                        </nav>
                                    </motion.div>
                                )}

                                {activeSubMenu === 'shop' && (
                                    <motion.div
                                        key="shop"
                                        initial={{ x: "10%" }}
                                        animate={{ x: 0 }}
                                        exit={{ x: "10%" }}
                                        transition={{ duration: 0.2 }}
                                        className="h-full w-full absolute top-0 left-0 px-6 py-8 bg-brand-white"
                                    >
                                        <button
                                            onClick={() => handleSubMenuClick('main')}
                                            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-gray-dark mb-8 hover:text-brand-black transition-colors"
                                        >
                                            <ChevronLeft size={14} /> Back
                                        </button>

                                        <div className="mb-8">
                                            <h4 className="font-bold text-[11px] uppercase tracking-widest text-brand-gray-dark mb-4 border-b border-brand-gray-dark/10 pb-2">By Category</h4>
                                            <ul className="flex flex-col gap-4 text-[14px] font-bold uppercase tracking-widest">
                                                {['Cleansers', 'Toners', 'Serums', 'Moisturizers'].map(item => (
                                                    <li key={item}>
                                                        <Link href={`/shop?category=${item.toLowerCase()}`} onClick={onClose} className="hover:opacity-70 transition-opacity">
                                                            {item}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-[11px] uppercase tracking-widest text-brand-gray-dark mb-4 border-b border-brand-gray-dark/10 pb-2">By Concern</h4>
                                            <ul className="flex flex-col gap-4 text-[14px] font-bold uppercase tracking-widest">
                                                {['Acne', 'Pigmentation', 'Aging', 'Dryness'].map(item => (
                                                    <li key={item}>
                                                        <Link href={`/shop?concern=${item.toLowerCase()}`} onClick={onClose} className="hover:opacity-70 transition-opacity">
                                                            {item}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
