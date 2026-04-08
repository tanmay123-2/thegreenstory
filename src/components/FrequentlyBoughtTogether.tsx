"use client";

import { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function FrequentlyBoughtTogether({ currentProductId }: { currentProductId: string }) {
    const [suggestions, setSuggestions] = useState<Product[]>([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            const allProducts = await getProducts();

            const currentProduct = allProducts.find(p => p.id === currentProductId);
            if (!currentProduct) return;

            const matches = allProducts
                .filter(p => p.id !== currentProductId && p.concerns && currentProduct.concerns && p.concerns.some(c => currentProduct.concerns.includes(c)))
                .slice(0, 3);

            const finalSuggestions = matches.length > 0
                ? matches
                : allProducts.filter(p => p.id !== currentProductId).slice(0, 3);

            setSuggestions(finalSuggestions);
        };
        fetchSuggestions();
    }, [currentProductId]);

    if (suggestions.length === 0) return null;

    return (
        <div className="py-16 md:py-24 border-t border-brand-border-light">
            <h2 className="text-2xl font-bold tracking-tighter uppercase mb-8">Frequently Bought Together</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {suggestions.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
