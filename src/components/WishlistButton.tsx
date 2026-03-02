"use client";

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function WishlistButton({ productId }: { productId: string }) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkAuthAndWishlist = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                const { data } = await supabase
                    .from('wishlists')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('product_id', productId)
                    .maybeSingle();

                if (data) setIsWishlisted(true);
            }
        };
        checkAuthAndWishlist();
    }, [productId]);

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert('Please login to wishlist products');
            return;
        }

        if (isWishlisted) {
            await supabase
                .from('wishlists')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);
            setIsWishlisted(false);
        } else {
            await supabase
                .from('wishlists')
                .insert([{ user_id: user.id, product_id: productId }]);
            setIsWishlisted(true);
        }
    };

    return (
        <button
            onClick={toggleWishlist}
            className={`p-2 rounded-full z-20 ${isWishlisted ? 'text-red-500' : 'text-brand-gray-dark hover:text-brand-black'} transition-colors`}
            aria-label="Toggle Wishlist"
        >
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
        </button>
    );
}
