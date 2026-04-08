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
    const resolvedParams = await params;
    const product = await getProductById(resolvedParams.id);

    if (!product) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-brand-ivory">
                <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Product not found</h1>
                <Link href="/shop" className="text-[13px] border-b border-brand-green pb-0.5 hover:opacity-70 text-brand-green font-sans">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-16">

                {/* Breadcrumb / Back */}
                <Link href="/shop" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-green transition-colors mb-6 md:mb-8 font-sans">
                    <ArrowLeft size={14} strokeWidth={2} />
                    Back to Formulations
                </Link>

                <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-24">
                    {/* Image Block */}
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-square bg-brand-cream w-full border border-brand-border-light">
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
                        <div className="border-b border-brand-border-light pb-6 md:pb-8 mb-6 md:mb-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-2 items-center">
                                    <p className="text-[11px] font-bold text-brand-text bg-brand-cream px-3 py-1 uppercase tracking-widest border border-brand-border-light font-sans">
                                        {product.category}
                                    </p>
                                    {product.compare_at_price && product.compare_at_price > product.price && (
                                        <p className="text-[11px] font-bold text-brand-ivory bg-brand-terracotta px-3 py-1 uppercase tracking-widest font-sans">
                                            {Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}% OFF
                                        </p>
                                    )}
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <p className="text-xl md:text-2xl font-bold text-brand-text font-sans">₹{product.price}</p>
                                    {product.compare_at_price && product.compare_at_price > product.price && (
                                        <p className="text-sm md:text-md text-brand-muted/50 line-through font-medium font-sans">
                                            ₹{product.compare_at_price}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-4 md:mb-6 gap-4">
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-brand-text leading-tight md:leading-[0.9]">
                                    {product.name}
                                </h1>
                                <WishlistButton productId={product.id} />
                            </div>

                            <p className="text-[13px] md:text-[14px] text-brand-muted leading-relaxed font-medium font-sans">
                                {product.description}
                            </p>
                        </div>

                        {/* Interactive Actions */}
                        <div className="mb-8 md:mb-10">
                            <ProductActions product={product} />
                        </div>

                        {/* Clinical Details */}
                        <div className="space-y-6">

                            {/* Concerns Addressed */}
                            <div className="border border-brand-border-light p-5 bg-brand-cream/50 text-brand-text flex flex-col gap-3">
                                <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest text-brand-muted border-b border-brand-border-light pb-3 font-sans">
                                    <Droplets size={16} strokeWidth={2} />
                                    <span>Primary Concerns</span>
                                </div>
                                <ul className="flex flex-wrap gap-2 mt-2">
                                    {product.concerns.map((concern, idx) => (
                                        <li key={idx} className="bg-brand-ivory border border-brand-border-light px-3 py-1 text-[11px] font-bold uppercase tracking-widest font-sans">
                                            {concern}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Ingredients Glossary */}
                            <IngredientGlossary ingredients={product.ingredients} />

                            {/* How to use */}
                            <div className="border border-brand-border-light p-5 bg-brand-cream/50 text-brand-text flex flex-col gap-3">
                                <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest text-brand-muted border-b border-brand-border-light pb-3 font-sans">
                                    <Info size={16} strokeWidth={2} />
                                    <span>Regimen Instructions</span>
                                </div>
                                <p className="text-[13px] text-brand-muted font-medium leading-relaxed mt-2 font-sans">
                                    Apply 2-3 drops onto clean, dry skin. Allow to absorb completely before applying moisturizer. Use AM and PM. Always follow with SPF 50 during the day.
                                </p>
                            </div>

                        </div>

                        {/* Clinical Results Section */}
                        <div className="mt-8 border border-brand-border-light p-5 bg-brand-ivory text-brand-text flex flex-col gap-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-[13px] uppercase tracking-widest text-brand-text font-sans">Clinical Results</h3>
                            </div>
                            <BeforeAfterSlider
                                beforeImage="https://images.unsplash.com/photo-1512496015851-a1dcdb3ccfa1?auto=format&fit=crop&q=80&w=800"
                                afterImage="https://images.unsplash.com/photo-1615397323286-63eef1284eb4?auto=format&fit=crop&q=80&w=800"
                            />
                            <p className="text-[11px] text-brand-muted font-medium uppercase tracking-widest mt-2 text-center font-sans">
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
