import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Leaf, Shield, SprayCan } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=2000"
          alt="Natural herbal skincare arrangement"
          fill
          priority
          className="object-cover object-center absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-sand-100 uppercase tracking-[0.3em] text-sm mb-6 font-medium bg-black/20 px-4 py-1 rounded-full backdrop-blur-md">
            The Botanical Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 font-medium leading-tight text-balance">
            Nature's wisdom for your skin.
          </h1>
          <p className="text-lg md:text-xl text-sand-100 mb-10 max-w-2xl font-light text-balance">
            Elevate your daily ritual with our pure, plant-powered formulas designed to restore harmony and natural radiance.
          </p>
          <Link
            href="/shop"
            className="group flex items-center gap-2 bg-white text-green-800 px-8 py-4 rounded-sm font-medium hover:bg-green-800 hover:text-white transition-all duration-300 shadow-lg shadow-black/10"
          >
            Explore the Collection
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="bg-green-800 text-sand-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="p-3 bg-white/10 rounded-full w-fit">
              <Leaf size={28} className="text-sand-100" />
            </div>
            <h3 className="text-xl font-serif font-medium">100% Herbal</h3>
            <p className="text-sand-100/80 leading-relaxed text-sm">Every ingredient is ethically sourced directly from nature, retaining its potent healing properties.</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="p-3 bg-white/10 rounded-full w-fit">
              <Shield size={28} className="text-sand-100" />
            </div>
            <h3 className="text-xl font-serif font-medium">Cruelty Free</h3>
            <p className="text-sand-100/80 leading-relaxed text-sm">We never test on animals. Our commitment to compassion extends to all living beings.</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="p-3 bg-white/10 rounded-full w-fit">
              <SprayCan size={28} className="text-sand-100" />
            </div>
            <h3 className="text-xl font-serif font-medium">Clean Formulas</h3>
            <p className="text-sand-100/80 leading-relaxed text-sm">No parabens, sulfates, or artificial fragrances. Just pure, unadulterated botanical goodness.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif text-charcoal mb-4">Curated for you</h2>
            <p className="text-gray-600">Discover our most loved botanical blends, handcrafted in small batches to ensure maximum potency.</p>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors uppercase tracking-widest text-sm pb-2 border-b border-green-700">
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Section */}
      <section className="my-12 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row bg-sand-200 overflow-hidden rounded-sm">
          <div className="w-full md:w-1/2 relative min-h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1556228720-1c2ae6ba6a5e?auto=format&fit=crop&q=80&w=1000"
              alt="Herbal ingredients"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
            <span className="uppercase tracking-widest text-sm text-green-700 mb-6 font-medium">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-6 leading-tight">Rooted in ancient tradition, crafted for modern skin.</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We believe that the earth provides everything we need to care for our bodies. The Green Story began with an old family recipe and a desire to strip away purely synthetic ingredients in favor of biocompatible botanicals that truly nourish.
            </p>
            <Link href="/about" className="inline-block border border-charcoal text-charcoal px-8 py-4 hover:bg-charcoal hover:text-white transition-colors duration-300 text-center w-fit uppercase tracking-widest text-xs font-medium">
              Read Our Journal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}