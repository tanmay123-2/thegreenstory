'use client';

import { useState, useMemo, Suspense } from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';

function ShopContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';

    const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<string>('Featured');

    const availableConcerns = [
        'Acne Control',
        'Uneven Tone',
        'Dryness',
        'Anti-aging',
        'Oiliness',
        'Barrier Repair',
        'Redness'
    ];

    const handleConcernToggle = (concern: string) => {
        setSelectedConcerns(prev =>
            prev.includes(concern)
                ? prev.filter(c => c !== concern)
                : [...prev, concern]
        );
    };

    const filteredAndSortedProducts = useMemo(() => {
        let result = products;

        // Search Query Filter
        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery) ||
                product.ingredients.some(i => i.toLowerCase().includes(searchQuery)) ||
                product.concerns.some(c => c.toLowerCase().includes(searchQuery))
            );
        }

        // Filter by Concern
        if (selectedConcerns.length > 0) {
            result = result.filter(product =>
                product.concerns.some(c => selectedConcerns.includes(c))
            );
        }

        // Sort
        switch (sortOption) {
            case 'Price: Low to High':
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case 'Featured':
            default:
                // keep original array order
                break;
        }

        return result;
    }, [selectedConcerns, sortOption, searchQuery]);

    return (
        <div className="bg-brand-gray min-h-screen">
            {/* Header Banner */}
            <header className="bg-brand-white py-16 px-6 border-b border-brand-gray-dark/10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Formulations'}
                    </h1>
                    <p className="text-[13px] text-brand-gray-dark font-medium max-w-2xl leading-relaxed">
                        {searchQuery
                            ? `Showing results matching your search terms.`
                            : `Browse our complete range of science-backed skincare. Filter by your specific concerns or search for targeted active ingredients.`}
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">

                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-brand-gray-dark/10 pb-2">Filter By Concern</h3>
                            <ul className="space-y-3 text-[13px] font-medium text-brand-gray-dark">
                                {availableConcerns.map(concern => (
                                    <li key={concern} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id={concern}
                                            checked={selectedConcerns.includes(concern)}
                                            onChange={() => handleConcernToggle(concern)}
                                            className="accent-brand-black w-4 h-4 cursor-pointer"
                                        />
                                        <label htmlFor={concern} className="cursor-pointer hover:text-brand-black transition-colors">{concern}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    {/* Utility Bar */}
                    <div className="flex justify-between items-center mb-8 bg-brand-white p-4 border border-brand-gray-dark/10">
                        <p className="text-[11px] font-bold text-brand-gray-dark uppercase tracking-widest">Showing {filteredAndSortedProducts.length} Products</p>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-transparent text-[11px] font-bold uppercase tracking-widest border-none cursor-pointer focus:outline-none"
                        >
                            <option value="Featured">Sort By: Featured</option>
                            <option value="Price: Low to High">Price: Low to High</option>
                            <option value="Price: High to Low">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredAndSortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {filteredAndSortedProducts.length === 0 && (
                        <div className="py-24 text-center border border-brand-gray-dark/10 bg-brand-white">
                            <p className="text-[13px] font-bold uppercase tracking-widest text-brand-black mb-4">No formulations found.</p>
                            <button
                                onClick={() => {
                                    setSelectedConcerns([]);
                                    if (searchQuery) window.location.href = '/shop';
                                }}
                                className="text-[11px] font-bold uppercase tracking-widest border-b border-brand-black pb-0.5 hover:opacity-70 transition-opacity"
                            >
                                Clear all filters & search
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-brand-gray">
                <p className="text-[13px] font-bold uppercase tracking-widest text-brand-black">Loading Formulations...</p>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
