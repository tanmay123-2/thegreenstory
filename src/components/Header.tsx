'use client';

import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MobileMenu from '@/components/MobileMenu';
import { supabase } from '@/lib/supabaseClient';

export default function Header() {
  const { itemCount, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('#search-toggle-button')) return;
      if (searchRef.current && !searchRef.current.contains(target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
            <button
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-brand-black hover:opacity-70 transition-opacity"
            >
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
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-[13px] tracking-wide font-medium uppercase text-brand-black/90 h-full">
            <div className="group relative h-full flex items-center">
              <Link href="/shop" className="hover:text-brand-black transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-black after:transition-all">
                Shop All
              </Link>
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-brand-white border border-brand-gray-dark/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="flex p-8 gap-8">
                  <div className="flex-1">
                    <h4 className="font-bold text-[11px] uppercase tracking-widest text-brand-gray-dark mb-4">Shop By Category</h4>
                    <ul className="space-y-3">
                      {['Shampoos', 'Oils', 'Conditioners', 'Toners'].map(item => (
                        <li key={item}><Link href={`/shop?category=${item.toLowerCase()}`} className="text-brand-black hover:opacity-70 transition-opacity capitalize">{item}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 bg-brand-gray relative flex items-center justify-center overflow-hidden min-h-[150px]">
                    <div className="z-10 text-center p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-white px-2 py-1 inline-block mb-2">New</span>
                      <p className="text-[12px] font-bold">Discover our latest Ayurvedic blends.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/routine" className="hover:text-brand-black hover:opacity-70 transition-opacity flex items-center h-full">Build Routine</Link>
            <Link href="/testimonials" className="hover:text-brand-black hover:opacity-70 transition-opacity">Reviews</Link>
            <Link href="/contact" className="hover:text-brand-black hover:opacity-70 transition-opacity">Contact Us</Link>
          </nav>

          {/* Icons */}
          <div className="flex-1 md:flex-none flex items-center justify-end gap-5">
            <button
              id="search-toggle-button"
              aria-label="Search"
              className="text-brand-black hover:opacity-70 transition-opacity"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
            </button>
            {user ? (
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-black/70">
                  {user.email?.split('@')[0]}
                </span>
                <Link
                  href="/orders"
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-gray-dark hover:text-brand-black transition-colors"
                >
                  Orders
                </Link>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-gray-dark hover:text-brand-black transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/register" aria-label="Account" className="hidden sm:block text-brand-black hover:opacity-70 transition-opacity">
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}
            <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:block text-brand-black hover:opacity-70 transition-opacity">
              <Heart size={20} strokeWidth={1.5} />
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
          <div ref={searchRef} className="absolute top-full left-0 w-full bg-brand-white border-b border-brand-gray-dark/10 p-4 shadow-lg animate-in slide-in-from-top-2">
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

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
