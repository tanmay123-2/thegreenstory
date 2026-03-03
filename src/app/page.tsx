"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, Product } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import SkeletonProductCard from '@/components/SkeletonProductCard';
import { ArrowRight, Beaker, CheckCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const allProducts = await getProducts();

      const targetProducts = ['Shampoo (200ml)', 'Onion Hair Oil (200ml)'];
      const bestSellers = allProducts.filter(p => targetProducts.includes(p.name));

      setFeaturedProducts(bestSellers);
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">
      {/* Split Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="flex flex-col md:flex-row h-auto min-h-[80vh] w-full border-b border-brand-gray-dark/10 bg-brand-white"
      >
        <motion.div variants={fadeInUp} className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <span className="inline-block px-3 py-1 bg-brand-gray text-brand-black text-[10px] uppercase font-bold tracking-widest w-fit mb-8 border border-brand-gray-dark/10">
            Ayurvedic
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-brand-black mb-6 leading-[0.9]">
            Naturality over everything.
          </h1>
          <p className="text-base md:text-lg text-brand-gray-dark mb-10 max-w-md font-medium leading-relaxed">
            No fluff, no false promises. Formulated with proven active ingredients at optimal concentrations for visible results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="inline-block bg-brand-black text-brand-white px-8 py-4 text-[13px] font-bold uppercase tracking-widest text-center hover:bg-brand-gray-dark transition-colors"
            >
              Shop All
            </Link>
            <Link
              href="/routine"
              className="inline-block bg-brand-white text-brand-black border border-brand-black px-8 py-4 text-[13px] font-bold uppercase tracking-widest text-center hover:bg-brand-gray transition-colors"
            >
              Build Routine
            </Link>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="w-full md:w-1/2 relative min-h-[50vh] bg-brand-gray">
          <Image
            src="/shampoo.png"
            alt="Handcrafted Herbal Shampoo"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </motion.section>

      {/* Core Values / Icon Bar */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="bg-brand-white border-b border-brand-gray-dark/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-gray-dark/10">
          <motion.div variants={fadeInUp} className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
            <Beaker size={24} className="mb-4 text-brand-black" strokeWidth={1.5} />
            <h3 className="text-[13px] font-bold uppercase tracking-widest mb-2">Gentle Yet Effective</h3>
            <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed">Formulated to be kind to sensitive skin and scalp while delivering visible results.</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <Search size={24} className="mb-4 text-brand-black" strokeWidth={1.5} />
            <h3 className="text-[13px] font-bold uppercase tracking-widest mb-2">Purely Herbal</h3>
            <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed">Inspired by traditional Indian herbal remedies.</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <CheckCircle size={24} className="mb-4 text-brand-black" strokeWidth={1.5} />
            <h3 className="text-[13px] font-bold uppercase tracking-widest mb-2">Handcrafted</h3>
            <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed">Crafted with care, not mass-produced in factories.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Shop by Category */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="py-24 px-6 bg-brand-white max-w-7xl mx-auto w-full"
      >
        <header className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold tracking-tighter uppercase">Shop By Category</h2>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Shampoos', 'Oils', 'Conditioners', 'Toners'].map((category) => (
            <Link key={category} href={`/shop?category=${category.toLowerCase()}`} className="group relative h-32 bg-brand-gray flex items-center justify-center border border-transparent hover:border-brand-black transition-colors">
              <span className="text-[13px] font-bold uppercase tracking-widest text-brand-black transition-colors">{category}</span>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Best Sellers */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="py-24 px-6 bg-brand-gray border-y border-brand-gray-dark/10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4 sm:gap-6">
            <h2 className="text-3xl font-bold tracking-tighter uppercase">Our Best Sellers</h2>
            <Link href="/shop" className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-black hover:opacity-70 transition-opacity border-b border-brand-black pb-1">
              View All Formulations
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonProductCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} isBestSeller />
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}