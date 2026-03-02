'use client';

import { useState, useEffect, useRef } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function ProductActions({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    const [showSticky, setShowSticky] = useState(false);
    const actionsRef = useRef<HTMLDivElement>(null);

    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    const handleIncrease = () => setQuantity(prev => prev + 1);

    useEffect(() => {
        const handleScroll = () => {
            if (actionsRef.current) {
                const rect = actionsRef.current.getBoundingClientRect();
                // Show sticky bar when the main actions section scrolls out of view upwards
                setShowSticky(rect.bottom < 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div ref={actionsRef} className="flex flex-col md:flex-row gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-brand-black h-12 w-full md:w-32 flex-shrink-0 bg-brand-white">
                    <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={handleDecrease}
                        className="w-12 h-full flex items-center justify-center text-brand-black hover:bg-brand-gray transition-colors"
                    >
                        <Minus size={16} strokeWidth={2} />
                    </button>
                    <span className="flex-1 text-center text-[13px] font-bold">{quantity}</span>
                    <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={handleIncrease}
                        className="w-12 h-full flex items-center justify-center text-brand-black hover:bg-brand-gray transition-colors"
                    >
                        <Plus size={16} strokeWidth={2} />
                    </button>
                </div>

                {/* Add to Cart Button */}
                <button
                    type="button"
                    onClick={() => addItem(product, quantity)}
                    className="flex-1 bg-brand-black text-brand-white h-12 hover:bg-brand-gray-dark transition-colors duration-300 font-bold tracking-widest uppercase text-[12px]"
                >
                    Add to Cart
                </button>
            </div>

            {/* Sticky Bottom Bar */}
            <div
                className={`fixed bottom-0 left-0 w-full bg-brand-white border-t border-brand-gray-dark/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transform transition-transform duration-300 z-40 flex items-center justify-between px-6 py-4 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <div className="hidden md:flex items-center gap-4">
                    <div className="relative w-12 h-12 bg-brand-gray border border-brand-gray-dark/10">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                        <h4 className="font-bold text-[12px] uppercase tracking-widest leading-none mb-1">{product.name}</h4>
                        <span className="text-[12px] text-brand-gray-dark font-medium">₹{product.price}</span>
                    </div>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <button
                        type="button"
                        onClick={() => addItem(product, 1)}
                        className="flex-1 md:flex-none md:w-64 bg-brand-black text-brand-white h-12 hover:bg-brand-gray-dark transition-colors duration-300 font-bold tracking-widest uppercase text-[12px]"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
}
