import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function Shop() {
    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">All Products</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our complete collection of botanical skincare. Every product is carefully formulated to work with your skin's natural healing abilities.
                    </p>
                </header>

                <div className="flex justify-between items-center mb-10 border-b border-sand-200 pb-4">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{products.length} Products</p>

                    <div className="flex gap-6 text-sm">
                        <button className="flex items-center gap-2 hover:text-green-700 transition">
                            Filter
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-700 transition">
                            Sort
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
