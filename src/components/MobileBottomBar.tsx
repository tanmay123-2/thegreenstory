'use client';

import Link from 'next/link';
import { Home, ShoppingBag, User, Grid2X2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MobileBottomBar() {
    const { itemCount, setIsCartOpen } = useCart();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-ivory border-t border-brand-border-light flex items-center justify-around px-2 py-2 safe-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
            <Link
                href="/"
                className="flex flex-col items-center gap-1 py-1 px-3 text-brand-text hover:text-brand-green transition-colors"
            >
                <Home size={20} strokeWidth={1.5} />
                <span className="text-[9px] font-bold uppercase tracking-widest font-sans">Home</span>
            </Link>

            <Link
                href="/shop"
                className="flex flex-col items-center gap-1 py-1 px-3 text-brand-text hover:text-brand-green transition-colors"
            >
                <Grid2X2 size={20} strokeWidth={1.5} />
                <span className="text-[9px] font-bold uppercase tracking-widest font-sans">Shop</span>
            </Link>

            <button
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center gap-1 py-1 px-3 text-brand-text hover:text-brand-green transition-colors relative"
                aria-label="Open cart"
            >
                <div className="relative">
                    <ShoppingBag size={20} strokeWidth={1.5} />
                    {itemCount > 0 && (
                        <span className="absolute -top-1.5 -right-2 bg-brand-green text-brand-ivory text-[9px] font-bold h-[16px] min-w-[16px] px-0.5 rounded-full flex items-center justify-center font-sans">
                            {itemCount}
                        </span>
                    )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest font-sans">Cart</span>
            </button>

            <Link
                href="/register"
                className="flex flex-col items-center gap-1 py-1 px-3 text-brand-text hover:text-brand-green transition-colors"
            >
                <User size={20} strokeWidth={1.5} />
                <span className="text-[9px] font-bold uppercase tracking-widest font-sans">Account</span>
            </Link>
        </nav>
    );
}
