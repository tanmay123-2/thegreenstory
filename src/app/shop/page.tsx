import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function Shop() {
    return (
        <div className="bg-brand-gray min-h-screen">
            {/* Header Banner */}
            <header className="bg-brand-white py-16 px-6 border-b border-brand-gray-dark/10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">All Formulations</h1>
                    <p className="text-[13px] text-brand-gray-dark font-medium max-w-2xl leading-relaxed">
                        Browse our complete range of science-backed skincare. Filter by your specific concerns or search for targeted active ingredients.
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
                                <li className="flex items-center gap-3">
                                    <input type="checkbox" id="acne" className="accent-brand-black w-4 h-4 cursor-pointer" />
                                    <label htmlFor="acne" className="cursor-pointer hover:text-brand-black transition-colors">Acne Control</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input type="checkbox" id="tone" className="accent-brand-black w-4 h-4 cursor-pointer" />
                                    <label htmlFor="tone" className="cursor-pointer hover:text-brand-black transition-colors">Uneven Tone</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input type="checkbox" id="dryness" className="accent-brand-black w-4 h-4 cursor-pointer" />
                                    <label htmlFor="dryness" className="cursor-pointer hover:text-brand-black transition-colors">Dryness</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input type="checkbox" id="aging" className="accent-brand-black w-4 h-4 cursor-pointer" />
                                    <label htmlFor="aging" className="cursor-pointer hover:text-brand-black transition-colors">Anti-Aging</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    {/* Utility Bar */}
                    <div className="flex justify-between items-center mb-8 bg-brand-white p-4 border border-brand-gray-dark/10">
                        <p className="text-[11px] font-bold text-brand-gray-dark uppercase tracking-widest">Showing {products.length} Products</p>
                        <select className="bg-transparent text-[11px] font-bold uppercase tracking-widest border-none cursor-pointer focus:outline-none">
                            <option>Sort By: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
