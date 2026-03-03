import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-brand-gray pt-12 md:pt-16 pb-8 border-t border-brand-gray-dark/10 mt-12 md:mt-20 text-brand-black">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="block text-2xl font-bold uppercase tracking-tighter mb-4">
                        The Green Story
                    </Link>
                    <p className="text-[13px] leading-relaxed max-w-sm font-medium text-brand-gray-dark">
                        At The Green Story, we believe skincare should be simple, pure, and close to nature. Every product is handcrafted in small batches using carefully selected herbal ingredients.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 tracking-widest uppercase text-[11px] text-brand-gray-dark">Company</h4>
                    <ul className="space-y-3 text-[13px] font-medium">
                        <li><Link href="/about" className="hover:opacity-70 transition-opacity">About Us</Link></li>
                        <li><Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link></li>
                        <li><Link href="/faq" className="hover:opacity-70 transition-opacity">FAQ</Link></li>
                        <li><Link href="/track" className="hover:opacity-70 transition-opacity">Track Order</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-brand-gray-dark/10 flex flex-col items-center md:flex-row md:justify-between text-center md:text-left text-[11px] font-medium tracking-wide text-brand-gray-dark uppercase gap-4 md:gap-0">
                <p>&copy; {new Date().getFullYear()} The Green Story. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <span>Authentic.</span>
                    <span>Transparent.</span>
                    <span>Effective.</span>
                </div>
            </div>
        </footer>
    );
}
