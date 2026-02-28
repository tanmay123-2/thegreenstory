'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    return (
        <div className="group flex flex-col pt-4 border border-transparent hover:border-brand-gray-dark/10 transition-colors bg-brand-white">
            <Link href={`/product/${product.id}`} className="block relative aspect-square mb-6 overflow-hidden bg-brand-gray mx-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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
                    <button
                        className="text-[11px] font-bold uppercase tracking-widest bg-brand-black text-brand-white px-4 py-2 hover:bg-brand-gray-dark transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            addItem(product, 1);
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
