'use client';

import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
    const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-brand-text/20 backdrop-blur-sm z-[60] transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-brand-ivory shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col border-l border-brand-border-light">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-brand-border-light">
                    <h2 className="text-[13px] font-bold uppercase tracking-widest font-sans">Your Cart</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-brand-muted hover:text-brand-text transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Free Shipping Banner */}
                {items.length > 0 && (
                    <div className="bg-brand-cream py-2 px-5 text-center text-[11px] font-medium tracking-wide border-b border-brand-border-light font-sans">
                        🎉 You have unlocked Free Shipping!
                    </div>
                )}

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-5">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-brand-muted">
                            <ShoppingBag size={40} strokeWidth={1} className="text-brand-border" />
                            <p className="text-[13px] font-medium font-sans">Your cart is currently empty.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-[11px] font-bold uppercase tracking-widest border-b border-brand-muted pb-0.5 hover:text-brand-green hover:border-brand-green transition-colors font-sans"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex gap-4">
                                    <div className="relative w-20 h-20 bg-brand-cream flex-shrink-0 border border-brand-border-light">
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-[13px] leading-tight pr-4">{item.product.name}</h3>
                                                <button
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="text-brand-muted hover:text-brand-text"
                                                >
                                                    <X size={14} strokeWidth={2} />
                                                </button>
                                            </div>
                                            <p className="text-[11px] text-brand-muted mt-1 uppercase tracking-wider font-sans">{item.product.category}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center border border-brand-border h-7">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-7 h-full flex items-center justify-center text-brand-muted hover:bg-brand-cream transition-colors"
                                                >
                                                    <Minus size={12} strokeWidth={2} />
                                                </button>
                                                <span className="w-8 text-center text-[12px] font-bold font-sans">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-7 h-full flex items-center justify-center text-brand-muted hover:bg-brand-cream transition-colors"
                                                >
                                                    <Plus size={12} strokeWidth={2} />
                                                </button>
                                            </div>
                                            <p className="font-bold text-[13px] font-sans">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-5 bg-brand-ivory border-t border-brand-border-light">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[13px] font-bold uppercase tracking-widest font-sans">Subtotal</span>
                            <span className="font-bold text-base font-sans">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-brand-muted mb-5 font-sans">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <Link
                            href="/checkout"
                            className="block w-full bg-brand-green text-brand-ivory text-center py-4 text-[13px] font-bold tracking-widest uppercase hover:bg-brand-green-dark transition-colors font-sans"
                            onClick={() => setIsCartOpen(false)}
                        >
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
