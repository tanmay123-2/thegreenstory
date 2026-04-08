"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import { getProducts, Product } from '@/lib/data';
import Link from 'next/link';

export default function WishlistPage() {
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                const { data, error } = await supabase
                    .from('wishlists')
                    .select('product_id')
                    .eq('user_id', user.id);

                if (data && !error) {
                    const savedIds = data.map((item: any) => item.product_id);
                    const allProducts = await getProducts();
                    const savedProducts = allProducts.filter(p => savedIds.includes(p.id));
                    setWishlistProducts(savedProducts);
                }
            }
            setLoading(false);
        };

        fetchWishlist();
    }, []);

    if (loading) {
        return (
            <div className="bg-brand-ivory min-h-[60vh] flex items-center justify-center">
                <p className="text-[13px] uppercase tracking-widest font-bold text-brand-muted animate-pulse font-sans">Loading Wishlist...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-brand-ivory min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-bold tracking-tighter uppercase mb-4 text-brand-text">Your Wishlist</h1>
                <p className="text-[13px] text-brand-muted font-medium max-w-md mb-8 font-sans">
                    Please log in to view and save products to your wishlist.
                </p>
                <Link href="/login" className="bg-brand-green text-brand-ivory px-8 py-3 text-[12px] font-bold uppercase tracking-widest hover:bg-brand-green-dark transition-colors font-sans">
                    Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-brand-cream min-h-screen py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-brand-border-light pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-brand-text mb-4">
                            Your Wishlist
                        </h1>
                        <p className="text-[13px] text-brand-muted font-medium max-w-xl leading-relaxed font-sans">
                            A curated collection of your saved Ayurvedic formulations.
                        </p>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted mt-4 md:mt-0 font-sans">
                        {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Item' : 'Items'}
                    </p>
                </div>

                {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistProducts.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-brand-ivory border border-brand-border-light">
                        <p className="text-[13px] font-bold uppercase tracking-widest text-brand-text mb-6 font-sans">
                            Your wishlist is empty
                        </p>
                        <Link href="/shop" className="inline-block border border-brand-green text-brand-green px-8 py-3 text-[12px] font-bold uppercase tracking-widest hover:bg-brand-green hover:text-brand-ivory transition-colors font-sans">
                            Explore Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
