"use client";

import { motion } from 'framer-motion';

export default function SkeletonProductCard() {
    return (
        <div className="flex flex-col pt-4 border border-brand-gray-dark/10 bg-brand-white">
            {/* Image Placeholder */}
            <div className="relative aspect-square mb-6 mx-4 bg-brand-gray overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-brand-gray via-brand-gray-dark/5 to-brand-gray"
                    animate={{
                        x: ['-100%', '100%'],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Details Placeholder */}
            <div className="flex flex-col flex-1 px-4 pb-4">
                {/* Category */}
                <div className="h-3 w-1/4 bg-brand-gray mb-3 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-brand-gray via-brand-gray-dark/5 to-brand-gray"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
                {/* Title */}
                <div className="h-4 w-3/4 bg-brand-gray mb-2 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-brand-gray via-brand-gray-dark/5 to-brand-gray"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
                {/* Description lines */}
                <div className="h-3 w-full bg-brand-gray mb-1 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-brand-gray via-brand-gray-dark/5 to-brand-gray"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
                <div className="h-3 w-5/6 bg-brand-gray mb-4 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-brand-gray via-brand-gray-dark/5 to-brand-gray"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>

                {/* Price & Button */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-gray-dark/10">
                    <div className="h-4 w-12 bg-brand-gray overflow-hidden relative">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-brand-gray via-brand-gray-dark/5 to-brand-gray"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
