"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, Product } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import SkeletonProductCard from '@/components/SkeletonProductCard';
import { ArrowRight, Beaker, CheckCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSlider from '@/components/HeroSlider';

// ── Ingredient Ticker ─────────────────────────────────────────────────────────
const ingredients = [
  'Amla', 'Bhringraj', 'Neem', 'Aloe Vera', 'Brahmi',
  'Hibiscus', 'Coconut Oil', 'Shikakai', 'Reetha', 'Fenugreek',
  'Castor Oil', 'Rosemary', 'Jatamansi', 'Argan Oil', 'Curry Leaf',
];

function IngredientTicker() {
  // Duplicate so the strip loops seamlessly
  const set = [...ingredients, ...ingredients];
  return (
    <div className="overflow-hidden border-y border-brand-gray-dark/10 bg-brand-gray select-none">
      <div className="flex animate-ticker whitespace-nowrap py-3">
        {set.map((name, i) => (
          <span key={i} className="flex items-center gap-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gray-dark px-5">
              {name}
            </span>
            <span className="text-brand-gray-dark/30 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Animated headline letters ─────────────────────────────────────────────────
const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.04 * i,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function AnimatedHeadline() {
  const fullText = "Naturality over everything.";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <h1 className="font-bold tracking-tighter text-brand-black mb-6 leading-[0.9]">
        <span className="block text-3xl md:text-5xl lg:text-7xl">{fullText}</span>
      </h1>
    );
  }

  return (
    <h1 className="font-bold tracking-tighter text-brand-black mb-6 pb-3" style={{ perspective: '800px' }}>
      <span className="block text-3xl md:text-5xl lg:text-7xl" aria-label={fullText}>
        {fullText.split('').map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00a0' : char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

// ── Fade variants ─────────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── Page ──────────────────────────────────────────────────────────────────────
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

      {/* Ingredient Ticker — overhead the Naturality section */}
      <IngredientTicker />

      {/* Hero Text Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full bg-brand-white border-b border-brand-gray-dark/10"
      >
        <motion.div variants={fadeInUp} className="max-w-7xl mx-auto flex flex-col justify-center px-5 py-10 md:p-16 lg:px-24 lg:py-20">
          <motion.span
            variants={fadeInUp}
            className="inline-block px-3 py-1 bg-brand-gray text-brand-black text-[10px] uppercase font-bold tracking-widest w-fit mb-8 border border-brand-gray-dark/10"
          >
            Ayurvedic
          </motion.span>

          <AnimatedHeadline />

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-brand-gray-dark mb-10 max-w-xl font-medium leading-relaxed"
          >
            No fluff, no false promises. Formulated with proven active ingredients at optimal concentrations for visible results.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="inline-block bg-brand-black text-brand-white px-8 py-3.5 md:py-4 text-[13px] font-bold uppercase tracking-widest text-center hover:bg-brand-gray-dark transition-colors"
            >
              Shop All
            </Link>
            <Link
              href="/routine"
              className="inline-block bg-brand-white text-brand-black border border-brand-black px-8 py-3.5 md:py-4 text-[13px] font-bold uppercase tracking-widest text-center hover:bg-brand-gray transition-colors"
            >
              Build Routine
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Full-Width Hero Image Slider */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full border-b border-brand-gray-dark/10"
      >
        <div className="w-full aspect-[16/7] md:aspect-[16/5] relative">
          <HeroSlider />
        </div>
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
        className="py-16 md:py-24 px-6 bg-brand-white max-w-7xl mx-auto w-full"
      >
        <header className="flex justify-between items-end mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase">Shop By Category</h2>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
          <Link
            href="/shop"
            className="group relative h-20 md:h-32 bg-brand-black flex items-center justify-center border border-brand-black hover:bg-brand-gray-dark transition-colors col-span-2 md:col-span-1"
          >
            <div className="text-center">
              <span className="text-[13px] font-bold uppercase tracking-widest text-brand-white transition-colors">Shop All</span>
              <p className="text-[10px] text-brand-white/60 uppercase tracking-widest mt-1">View Everything</p>
            </div>
          </Link>
          {['Shampoos', 'Oils', 'Conditioners', 'Toners'].map((category) => (
            <Link key={category} href={`/shop?category=${category.toLowerCase()}`} className="group relative h-20 md:h-32 bg-brand-gray flex items-center justify-center border border-transparent hover:border-brand-black transition-colors">
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
        className="py-14 md:py-24 px-4 md:px-6 bg-brand-gray border-y border-brand-gray-dark/10"
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonProductCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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