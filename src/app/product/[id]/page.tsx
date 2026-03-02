import { getProductById, getProducts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Beaker, Info, Droplets } from 'lucide-react';
import ProductActions from '@/components/ProductActions';
import ProductReviews from '@/components/ProductReviews';
import FrequentlyBoughtTogether from '@/components/FrequentlyBoughtTogether';
import WishlistButton from '@/components/WishlistButton';
import IngredientGlossary from '@/components/IngredientGlossary';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

// Force dynamic rendering to prevent Next.js from caching a "Product not found" state
export const dynamic = 'force-dynamic';


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    // Await params for Next.js 15+ support
    const resolvedParams = await params;
    // Fetch product from Supabase directly
    const product = await getProductById(resolvedParams.id);

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

                            <div className="flex justify-between items-start mb-6">
                                <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-brand-black leading-[0.9]">
                                    {product.name}
                                </h1>
                                <WishlistButton productId={product.id} />
                            </div>

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

                            {/* Ingredients Glossary */}
                            <IngredientGlossary ingredients={product.ingredients} />

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

                        {/* Clinical Results Section */}
                        <div className="mt-8 border border-brand-gray-dark/10 p-5 bg-brand-white text-brand-black flex flex-col gap-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-[13px] uppercase tracking-widest text-brand-black">Clinical Results</h3>
                            </div>
                            <BeforeAfterSlider
                                beforeImage="https://images.unsplash.com/photo-1512496015851-a1dcdb3ccfa1?auto=format&fit=crop&q=80&w=800"
                                afterImage="https://images.unsplash.com/photo-1615397323286-63eef1284eb4?auto=format&fit=crop&q=80&w=800"
                            />
                            <p className="text-[11px] text-brand-gray-dark font-medium uppercase tracking-widest mt-2 text-center">
                                *Results from an independent consumer study of 30 women over 4 weeks.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Product Reviews Section */}
                <ProductReviews productId={product.id} />

                {/* Frequently Bought Together */}
                <FrequentlyBoughtTogether currentProductId={product.id} />

            </div>
        </div>
    );
}
