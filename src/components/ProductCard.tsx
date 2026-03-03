'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import WishlistButton from '@/components/WishlistButton';

interface ProductCardProps {
    product: Product;
    isBestSeller?: boolean;
}

// Static star rating display — replace with real data when available
const StarRating = ({ rating = 4.8, count = 124 }: { rating?: number; count?: number }) => (
    <div className="flex items-center gap-1.5 mb-3">
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-brand-black' : 'text-brand-gray-dark/20'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
        <span className="text-[10px] font-bold text-brand-gray-dark tracking-wide">{rating} ({count})</span>
    </div>
);

export default function ProductCard({ product, isBestSeller = false }: ProductCardProps) {
    const { addItem } = useCart();

    return (
        <div className="group flex flex-col pt-4 border border-transparent hover:border-brand-gray-dark/20 transition-colors bg-brand-white relative">
            {/* Best Seller Badge */}
            {isBestSeller && (
                <div className="absolute top-2 left-2 z-20">
                    <span className="bg-brand-black text-brand-white text-[9px] font-bold uppercase tracking-widest px-2 py-1">
                        Best Seller
                    </span>
                </div>
            )}

            {/* Wishlist */}
            <div className="absolute top-6 right-6 z-20">
                <WishlistButton productId={product.id} />
            </div>

            {/* Product Image */}
            <Link href={`/product/${product.id}`} className="block relative aspect-square mb-3 overflow-hidden bg-brand-gray mx-2 md:mx-4 group/image">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover/image:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-black/5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                {/* Quick Add hover button — desktop only */}
                <button
                    className="hidden md:block absolute bottom-4 left-4 right-4 text-[11px] font-bold uppercase tracking-widest bg-brand-white text-brand-black px-4 py-3 translate-y-4 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-brand-black hover:text-brand-white z-10"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem(product, 1);
                    }}
                >
                    + Quick Add
                </button>
            </Link>

            {/* Mobile-only persistent Add to Cart button */}
            <button
                className="md:hidden mx-2 mb-2.5 w-[calc(100%-1rem)] text-[10px] font-bold uppercase tracking-widest bg-brand-black text-brand-white py-2.5 hover:bg-brand-gray-dark transition-colors active:scale-95 transform"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(product, 1);
                }}
            >
                + Add to Cart
            </button>

            <div className="flex flex-col flex-1 px-2 md:px-4 pb-3 md:pb-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-brand-gray-dark mb-2">
                    {product.category}
                </p>
                <Link href={`/product/${product.id}`} className="block mb-1">
                    <h3 className="font-semibold text-sm leading-tight text-brand-black group-hover:underline underline-offset-4 decoration-1">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-[11px] text-brand-gray-dark leading-relaxed mb-2 line-clamp-2">
                    {product.description}
                </p>

                {/* Star Rating */}
                <StarRating />

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-gray-dark/10">
                    <span className="font-bold text-sm tracking-wide">₹{product.price}</span>
                    <button
                        onClick={() => addItem(product, 1)}
                        className="text-[10px] font-bold uppercase tracking-widest text-brand-gray-dark hover:text-brand-black transition-colors border-b border-brand-gray-dark/40 hover:border-brand-black pb-0.5"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
