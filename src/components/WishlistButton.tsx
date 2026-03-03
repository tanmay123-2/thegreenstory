"use client";

import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistButton({ productId }: { productId: string }) {
    const { isWishlisted, toggleWishlist } = useWishlist();
    const wishlisted = isWishlisted(productId);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(productId);
            }}
            className={`p-2 rounded-full z-20 ${wishlisted ? 'text-red-500' : 'text-brand-gray-dark hover:text-brand-black'} transition-colors`}
            aria-label="Toggle Wishlist"
        >
            <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
        </button>
    );
}
