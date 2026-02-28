'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function ProductActions({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    const handleIncrease = () => setQuantity(prev => prev + 1);

    return (
        <div className="flex flex-col md:flex-row gap-4">

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
    );
}
