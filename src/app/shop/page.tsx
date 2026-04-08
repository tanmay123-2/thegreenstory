'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { getProducts, Product } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import SkeletonProductCard from '@/components/SkeletonProductCard';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ShopContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';
    const urlCategory = searchParams.get('category');

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(urlCategory ? [urlCategory.toLowerCase()] : []);
    const [sortOption, setSortOption] = useState<string>('Featured');

    useEffect(() => {
        if (urlCategory) {
            setSelectedCategories([urlCategory.toLowerCase()]);
        }
    }, [urlCategory]);

    useEffect(() => {
        const fetchRemoteProducts = async () => {
            const data = await getProducts();
            setAllProducts(data);
            setLoading(false);
        };
        fetchRemoteProducts();
    }, []);

    const availableCategories = ['Shampoos', 'Oils', 'Conditioners', 'Toners'];

    const handleCategoryToggle = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category.toLowerCase())
                ? prev.filter(c => c !== category.toLowerCase())
                : [...prev, category.toLowerCase()]
        );
    };

    const filteredAndSortedProducts = useMemo(() => {
        let result = allProducts;

        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery) ||
                (product.description && product.description.toLowerCase().includes(searchQuery)) ||
                (product.ingredients && product.ingredients.some(i => i.toLowerCase().includes(searchQuery)))
            );
        }

        if (selectedCategories.length > 0) {
            result = result.filter(product =>
                selectedCategories.some(cat => {
                    const singularCat = cat.endsWith('s') ? cat.slice(0, -1) : cat;
                    return product.name.toLowerCase().includes(singularCat);
                })
            );
        }

        switch (sortOption) {
            case 'Price: Low to High':
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case 'Featured':
            default:
                break;
        }

        return result;
    }, [allProducts, selectedCategories, sortOption, searchQuery]);

    return (
        <div className="bg-brand-cream min-h-screen">
            {/* Header Banner */}
            <motion.header
                initial="hidden" animate="visible" variants={fadeInUp}
                className="bg-brand-ivory py-12 md:py-20 px-6 border-b border-brand-border-light"
            >
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-3">
                        {searchQuery ? `Results for "${searchQuery}"` : 'All Formulations'}
                    </h1>
                    <p className="text-[13px] text-brand-muted font-medium max-w-2xl leading-relaxed font-sans">
                        {searchQuery
                            ? `Showing results matching your search terms.`
                            : `Browse our complete range of science-backed haircare. Filter by category or view everything at once.`}
                    </p>
                </div>
            </motion.header>

            {/* Mobile Filter Bar */}
            <div className="md:hidden bg-brand-ivory border-b border-brand-border-light px-4 py-3 overflow-x-auto">
                <div className="flex items-center gap-2 w-max">
                    <button
                        onClick={() => setSelectedCategories([])}
                        className={`flex-shrink-0 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest border transition-colors whitespace-nowrap font-sans ${selectedCategories.length === 0
                                ? 'bg-brand-green text-brand-ivory border-brand-green'
                                : 'bg-brand-ivory text-brand-muted border-brand-border hover:border-brand-green hover:text-brand-green'
                            }`}
                    >
                        All
                    </button>
                    {availableCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryToggle(category)}
                            className={`flex-shrink-0 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest border transition-colors whitespace-nowrap font-sans ${selectedCategories.includes(category.toLowerCase())
                                    ? 'bg-brand-green text-brand-ivory border-brand-green'
                                    : 'bg-brand-ivory text-brand-muted border-brand-border hover:border-brand-green hover:text-brand-green'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 flex flex-col md:flex-row gap-8">

                {/* Desktop Sidebar Filters */}
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-brand-border-light pb-2 font-sans">Filter By Category</h3>
                            <ul className="space-y-3 text-[13px] font-medium text-brand-muted font-sans">
                                {availableCategories.map(category => (
                                    <li key={category} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id={`category-${category}`}
                                            checked={selectedCategories.includes(category.toLowerCase())}
                                            onChange={() => handleCategoryToggle(category)}
                                            className="accent-brand-green w-4 h-4 cursor-pointer"
                                        />
                                        <label htmlFor={`category-${category}`} className="cursor-pointer hover:text-brand-green transition-colors">{category}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1 min-w-0">
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                            {[...Array(6)].map((_, i) => (
                                <SkeletonProductCard key={i} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Utility Bar */}
                            <div className="flex justify-between items-center mb-5 bg-brand-ivory p-3 md:p-4 border border-brand-border-light">
                                <p className="text-[11px] font-bold text-brand-muted uppercase tracking-widest font-sans">
                                    {filteredAndSortedProducts.length} Products
                                </p>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="bg-transparent text-[11px] font-bold uppercase tracking-widest border-none cursor-pointer focus:outline-none font-sans"
                                >
                                    <option value="Featured">Sort: Featured</option>
                                    <option value="Price: Low to High">Price: Low → High</option>
                                    <option value="Price: High to Low">Price: High → Low</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                {filteredAndSortedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            {filteredAndSortedProducts.length === 0 && (
                                <div className="py-24 text-center border border-brand-border-light bg-brand-ivory">
                                    <p className="text-[13px] font-bold uppercase tracking-widest text-brand-text mb-4 font-sans">No formulations found.</p>
                                    <button
                                        onClick={() => {
                                            setSelectedCategories([]);
                                            if (searchQuery) window.location.href = '/shop';
                                        }}
                                        className="text-[11px] font-bold uppercase tracking-widest border-b border-brand-green pb-0.5 hover:opacity-70 transition-opacity text-brand-green font-sans"
                                    >
                                        Clear all filters & search
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={
            <div className="bg-brand-cream min-h-screen">
                <header className="bg-brand-ivory py-12 md:py-20 px-6 border-b border-brand-border-light">
                    <div className="max-w-7xl mx-auto">
                        <div className="h-12 w-64 animate-shimmer mb-4"></div>
                        <div className="h-4 w-96 animate-shimmer"></div>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 flex flex-col md:flex-row gap-8">
                    <aside className="hidden md:block w-64 flex-shrink-0">
                        <div className="h-4 w-32 animate-shimmer mb-8"></div>
                        <div className="h-4 w-32 animate-shimmer mb-8"></div>
                    </aside>
                    <main className="flex-1">
                        <div className="flex justify-between items-center mb-5 bg-brand-ivory p-4 border border-brand-border-light">
                            <div className="h-4 w-32 animate-shimmer"></div>
                            <div className="h-4 w-32 animate-shimmer"></div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                            {[...Array(6)].map((_, i) => (
                                <SkeletonProductCard key={i} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
