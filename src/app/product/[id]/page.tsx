import { products } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductActions from '@/components/ProductActions';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = products.find((p) => p.id === params.id);

    if (!product) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-serif mb-4">Product not found</h1>
                <Link href="/shop" className="text-green-700 underline">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition mb-10">
                <ArrowLeft size={16} />
                Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                {/* Images */}
                <div className="relative aspect-[3/4] bg-sand-200 w-full mb-8 md:mb-0">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-green-700 uppercase tracking-widest mb-4">
                        {product.category}
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-serif text-charcoal mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-600">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-medium mb-8">₹{product.price}</p>

                    <div className="prose prose-sm text-gray-600 mb-10 text-base leading-relaxed">
                        <p>{product.description}</p>
                    </div>

                    <ProductActions product={product} />

                    <div className="mt-16 pt-10 border-t border-sand-200">
                        <h3 className="font-serif text-xl mb-6">Key Benefits</h3>
                        <ul className="space-y-3 mb-10">
                            {product.benefits.map((benefit, index) => (
                                <li key={index} className="flex border-b border-sand-200/50 pb-3 text-sm text-charcoal/80 items-center justify-between">
                                    {benefit}
                                    <span className="text-green-600">+</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-serif text-xl mb-4">Full Ingredients</h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-mono">
                            {product.ingredients.join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
