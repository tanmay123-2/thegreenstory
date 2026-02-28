'use client';

import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { itemCount, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-brand-white border-b border-brand-gray-dark/10">
        {/* Announcement Bar */}
        <div className="bg-brand-black text-brand-white text-[13px] text-center py-2.5 tracking-widest uppercase font-bold">
          A Bond With Nature
        </div>

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Mobile Menu Icon */}
          <div className="md:hidden flex-1">
            <button aria-label="Menu" className="text-brand-black hover:opacity-70 transition-opacity">
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link href="/" className="text-xl font-bold tracking-tighter text-brand-black uppercase">
              The Green Story.
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-[13px] tracking-wide font-medium uppercase text-brand-black/90">
            <Link href="/shop" className="hover:text-brand-black transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-black after:transition-all">Shop All</Link>
            <Link href="/routine" className="hover:text-brand-black hover:opacity-70 transition-opacity">Build Routine</Link>
            <Link href="/testimonials" className="hover:text-brand-black hover:opacity-70 transition-opacity">Reviews</Link>
            <Link href="/contact" className="hover:text-brand-black hover:opacity-70 transition-opacity">Contact Us</Link>
          </nav>

          {/* Icons */}
          <div className="flex-1 md:flex-none flex items-center justify-end gap-5">
            <button
              aria-label="Search"
              className="text-brand-black hover:opacity-70 transition-opacity"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
            </button>
            <Link href="/register" aria-label="Account" className="hidden sm:block text-brand-black hover:opacity-70 transition-opacity">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button
              aria-label="Cart"
              className="relative text-brand-black hover:opacity-70 transition-opacity"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-black text-brand-white text-[10px] font-bold h-[18px] min-w-[18px] px-1 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-brand-white border-b border-brand-gray-dark/10 p-4 shadow-lg animate-in slide-in-from-top-2">
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for products, ingredients, or concerns..."
                className="w-full border border-brand-gray-dark/20 rounded-none py-3 pl-4 pr-12 focus:outline-none focus:border-brand-black text-[13px] uppercase tracking-wider font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-black hover:opacity-70 transition-opacity">
                <Search size={20} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}
