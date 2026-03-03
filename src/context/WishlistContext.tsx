'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface WishlistContextType {
    wishlistIds: Set<string>;
    wishlistCount: number;
    toggleWishlist: (productId: string) => Promise<void>;
    isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) await loadWishlist(currentUser.id);
        };
        init();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                loadWishlist(currentUser.id);
            } else {
                setWishlistIds(new Set());
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const loadWishlist = async (userId: string) => {
        const { data } = await supabase
            .from('wishlists')
            .select('product_id')
            .eq('user_id', userId);
        if (data) {
            setWishlistIds(new Set(data.map((row: any) => row.product_id)));
        }
    };

    const toggleWishlist = async (productId: string) => {
        if (!user) {
            alert('Please login to wishlist products');
            return;
        }

        if (wishlistIds.has(productId)) {
            await supabase.from('wishlists').delete().eq('user_id', user.id).eq('product_id', productId);
            setWishlistIds(prev => {
                const next = new Set(prev);
                next.delete(productId);
                return next;
            });
        } else {
            await supabase.from('wishlists').insert([{ user_id: user.id, product_id: productId }]);
            setWishlistIds(prev => new Set(prev).add(productId));
        }
    };

    const isWishlisted = (productId: string) => wishlistIds.has(productId);

    return (
        <WishlistContext.Provider value={{ wishlistIds, wishlistCount: wishlistIds.size, toggleWishlist, isWishlisted }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within WishlistProvider');
    return context;
}
