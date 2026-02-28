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
                className="fixed inset-0 bg-brand-black/20 backdrop-blur-sm z-[60] transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-brand-white shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col border-l border-brand-gray-dark/10">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-brand-gray-dark/10">
                    <h2 className="text-[13px] font-bold uppercase tracking-widest">Your Cart</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-brand-gray-dark hover:text-brand-black transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Free Shipping Banner */}
                {items.length > 0 && (
                    <div className="bg-brand-gray py-2 px-5 text-center text-[11px] font-medium tracking-wide border-b border-brand-gray-dark/10">
                        🎉 You have unlocked Free Shipping!
                    </div>
                )}

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-5">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-brand-gray-dark">
                            <ShoppingBag size={40} strokeWidth={1} className="text-brand-gray" />
                            <p className="text-[13px] font-medium">Your cart is currently empty.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-[11px] font-bold uppercase tracking-widest border-b border-brand-gray-dark pb-0.5 hover:text-brand-black"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex gap-4">
                                    <div className="relative w-20 h-20 bg-brand-gray flex-shrink-0 border border-brand-gray-dark/5">
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
                                                    className="text-brand-gray-dark hover:text-brand-black"
                                                >
                                                    <X size={14} strokeWidth={2} />
                                                </button>
                                            </div>
                                            <p className="text-[11px] text-brand-gray-dark mt-1 uppercase tracking-wider">{item.product.category}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center border border-brand-gray-dark/20 h-7">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-7 h-full flex items-center justify-center text-brand-gray-dark hover:bg-brand-gray transition-colors"
                                                >
                                                    <Minus size={12} strokeWidth={2} />
                                                </button>
                                                <span className="w-8 text-center text-[12px] font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-7 h-full flex items-center justify-center text-brand-gray-dark hover:bg-brand-gray transition-colors"
                                                >
                                                    <Plus size={12} strokeWidth={2} />
                                                </button>
                                            </div>
                                            <p className="font-bold text-[13px]">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-5 bg-brand-white border-t border-brand-gray-dark/10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[13px] font-bold uppercase tracking-widest">Subtotal</span>
                            <span className="font-bold text-base">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-brand-gray-dark mb-5">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <Link
                            href="/checkout"
                            className="block w-full bg-brand-black text-brand-white text-center py-4 text-[13px] font-bold tracking-widest uppercase hover:bg-brand-gray-dark transition-colors"
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
