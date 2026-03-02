'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import WishlistButton from '@/components/WishlistButton';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    return (
        <div className="group flex flex-col pt-4 border border-transparent hover:border-brand-gray-dark/10 transition-colors bg-brand-white relative">
            <div className="absolute top-6 right-6 z-20">
                <WishlistButton productId={product.id} />
            </div>
            <Link href={`/product/${product.id}`} className="block relative aspect-square mb-6 overflow-hidden bg-brand-gray mx-4 group/image">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover/image:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-black/5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                <button
                    className="absolute bottom-4 left-4 right-4 text-[11px] font-bold uppercase tracking-widest bg-brand-white text-brand-black px-4 py-3 translate-y-4 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-brand-gray z-10"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem(product, 1);
                    }}
                >
                    Quick Add
                </button>
            </Link>

            <div className="flex flex-col flex-1 px-4 pb-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-brand-gray-dark mb-2">
                    {product.category}
                </p>
                <Link href={`/product/${product.id}`} className="block mb-1">
                    <h3 className="font-semibold text-sm leading-tight text-brand-black group-hover:underline underline-offset-4 decoration-1">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-[11px] text-brand-gray-dark leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-gray-dark/10">
                    <span className="font-bold text-sm tracking-wide">₹{product.price}</span>
                </div>
            </div>
        </div>
    );
}
