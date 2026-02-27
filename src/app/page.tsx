import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Beaker, CheckCircle, Search } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">
      {/* Split Hero Section */}
      <section className="flex flex-col md:flex-row h-auto min-h-[80vh] w-full border-b border-brand-gray-dark/10 bg-brand-white">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <span className="inline-block px-3 py-1 bg-brand-gray text-brand-black text-[10px] uppercase font-bold tracking-widest w-fit mb-8 border border-brand-gray-dark/10">
            Science Backed
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-brand-black mb-6 leading-[0.9]">
            Efficacy <br />over <br />everything.
          </h1>
          <p className="text-base md:text-lg text-brand-gray-dark mb-10 max-w-md font-medium leading-relaxed">
            No fluff, no false promises. Formulated with proven active ingredients at optimal concentrations for visible results.
          </p>
          <div className="flex gap-4">
            <Link
              href="/shop"
              className="bg-brand-black text-brand-white px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-brand-gray-dark transition-colors"
            >
              Shop All
            </Link>
            <Link
              href="/routine"
              className="bg-brand-white text-brand-black border border-brand-black px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-brand-gray transition-colors"
            >
              Build Routine
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[50vh] bg-brand-gray">
          <Image
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200"
            alt="Clinical skincare bottles"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* Core Values / Icon Bar */}
      <section className="bg-brand-white border-b border-brand-gray-dark/10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-gray-dark/10">
          <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
            <Beaker size={24} className="mb-4 text-brand-black" strokeWidth={1.5} />
            <h3 className="text-[13px] font-bold uppercase tracking-widest mb-2">High Concentrations</h3>
            <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed">Active ingredients formulated at clinically proven levels.</p>
          </div>
          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <Search size={24} className="mb-4 text-brand-black" strokeWidth={1.5} />
            <h3 className="text-[13px] font-bold uppercase tracking-widest mb-2">Total Transparency</h3>
            <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed">We disclose exact ingredient percentages and pH levels.</p>
          </div>
          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <CheckCircle size={24} className="mb-4 text-brand-black" strokeWidth={1.5} />
            <h3 className="text-[13px] font-bold uppercase tracking-widest mb-2">Dermatologist Tested</h3>
            <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed">Rigorously tested for safety and efficacy on all skin types.</p>
          </div>
        </div>
      </section>

      {/* Shop by Concern */}
      <section className="py-24 px-6 bg-brand-white max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold tracking-tighter uppercase">Shop By Concern</h2>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Acne', 'Pigmentation', 'Aging', 'Dryness'].map((concern) => (
            <Link key={concern} href={`/shop?concern=${concern.toLowerCase()}`} className="group relative aspect-[3/4] bg-brand-gray overflow-hidden flex items-end p-6 border border-transparent hover:border-brand-black transition-colors">
              <span className="relative z-10 text-[13px] font-bold uppercase tracking-widest bg-brand-white px-4 py-2 group-hover:bg-brand-black group-hover:text-brand-white transition-colors">{concern}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 px-6 bg-brand-gray border-y border-brand-gray-dark/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-3xl font-bold tracking-tighter uppercase">Our Best Sellers</h2>
            <Link href="/shop" className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-black hover:opacity-70 transition-opacity border-b border-brand-black pb-1">
              View All Formulations
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}