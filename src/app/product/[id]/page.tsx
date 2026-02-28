import { products } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Beaker, Info, Droplets } from 'lucide-react';
import ProductActions from '@/components/ProductActions';
import ProductReviews from '@/components/ProductReviews';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = products.find((p) => p.id === params.id);

    if (!product) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-brand-white">
                <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Product not found</h1>
                <Link href="/shop" className="text-[13px] border-b border-brand-black pb-0.5 hover:opacity-70">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="bg-brand-white">
            <div className="max-w-7xl mx-auto px-6 py-8 md:py-16">

                {/* Breadcrumb / Back */}
                <Link href="/shop" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-gray-dark hover:text-brand-black transition-colors mb-8">
                    <ArrowLeft size={14} strokeWidth={2} />
                    Back to Formulations
                </Link>

                <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
                    {/* Image Block */}
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-square bg-brand-gray w-full border border-brand-gray-dark/10">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Product Details Block */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="border-b border-brand-gray-dark/10 pb-8 mb-8">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-[11px] font-bold text-brand-black bg-brand-gray px-3 py-1 uppercase tracking-widest border border-brand-gray-dark/10">
                                    {product.category}
                                </p>
                                <p className="text-2xl font-bold">₹{product.price}</p>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-brand-black mb-6 leading-[0.9]">
                                {product.name}
                            </h1>

                            <p className="text-[14px] text-brand-gray-dark leading-relaxed font-medium">
                                {product.description}
                            </p>
                        </div>

                        {/* Interactive Actions */}
                        <div className="mb-10">
                            <ProductActions product={product} />
                        </div>

                        {/* Clinical Details Accordion-style layout */}
                        <div className="space-y-6">

                            {/* Concerns Addressed */}
                            <div className="border border-brand-gray-dark/10 p-5 bg-brand-gray/50 text-brand-black flex flex-col gap-3">
                                <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest text-brand-gray-dark border-b border-brand-gray-dark/10 pb-3">
                                    <Droplets size={16} strokeWidth={2} />
                                    <span>Primary Concerns</span>
                                </div>
                                <ul className="flex flex-wrap gap-2 mt-2">
                                    {product.concerns.map((concern, idx) => (
                                        <li key={idx} className="bg-brand-white border border-brand-gray-dark/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
                                            {concern}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Ingredients */}
                            <div className="border border-brand-gray-dark/10 p-5 bg-brand-gray/50 text-brand-black flex flex-col gap-3">
                                <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest text-brand-gray-dark border-b border-brand-gray-dark/10 pb-3">
                                    <Beaker size={16} strokeWidth={2} />
                                    <span>Full Ingredient Profile</span>
                                </div>
                                <p className="text-[13px] text-brand-black font-medium leading-relaxed font-mono mt-2">
                                    {product.ingredients.join(', ')}
                                </p>
                            </div>

                            {/* How to use */}
                            <div className="border border-brand-gray-dark/10 p-5 bg-brand-gray/50 text-brand-black flex flex-col gap-3">
                                <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest text-brand-gray-dark border-b border-brand-gray-dark/10 pb-3">
                                    <Info size={16} strokeWidth={2} />
                                    <span>Regimen Instructions</span>
                                </div>
                                <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed mt-2">
                                    Apply 2-3 drops onto clean, dry skin. Allow to absorb completely before applying moisturizer. Use AM and PM. Always follow with SPF 50 during the day.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Product Reviews Section */}
                <ProductReviews productId={product.id} />

            </div>
        </div>
    );
}
