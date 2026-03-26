'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Save, RefreshCw, Loader } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    concerns: string[];
    ingredients: string[];
}

interface EditableProduct extends Product {
    _dirty: boolean;
    _saving: boolean;
    _saved: boolean;
}

export default function AdminProducts() {
    const [products, setProducts] = useState<EditableProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setProducts(data.map(p => ({ ...p, _dirty: false, _saving: false, _saved: false })));
        }
        setLoading(false);
    };

    const handleChange = (id: string, field: keyof Product, value: string | number) => {
        setProducts(prev =>
            prev.map(p => p.id === id ? { ...p, [field]: value, _dirty: true, _saved: false } : p)
        );
    };

    const handleSave = async (product: EditableProduct) => {
        setProducts(prev => prev.map(p => p.id === product.id ? { ...p, _saving: true } : p));

        const { error } = await supabase
            .from('products')
            .update({
                name: product.name,
                description: product.description,
                price: Number(product.price),
                category: product.category,
            })
            .eq('id', product.id);

        setProducts(prev =>
            prev.map(p =>
                p.id === product.id
                    ? { ...p, _saving: false, _dirty: !!error, _saved: !error }
                    : p
            )
        );

        if (error) alert(`Save failed: ${error.message}`);
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white h-16 animate-pulse rounded border border-gray-200" />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500 font-medium">{products.length} products</p>
                <button onClick={fetchProducts} className="text-xs font-bold uppercase tracking-widest border border-gray-300 px-3 py-1.5 hover:bg-gray-50 transition flex items-center gap-1.5">
                    <RefreshCw size={11} /> Refresh
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Product</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 w-36">Price (₹)</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</th>
                            <th className="px-4 py-3 w-24"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map(product => (
                            <tr key={product.id} className={product._dirty ? 'bg-amber-50' : ''}>
                                {/* Name */}
                                <td className="px-5 py-3">
                                    <input
                                        type="text"
                                        value={product.name}
                                        onChange={e => handleChange(product.id, 'name', e.target.value)}
                                        className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-600 focus:outline-none font-medium text-gray-900 py-0.5 transition"
                                    />
                                </td>
                                {/* Category */}
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={product.category}
                                        onChange={e => handleChange(product.id, 'category', e.target.value)}
                                        className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-600 focus:outline-none text-gray-600 py-0.5 transition"
                                    />
                                </td>
                                {/* Price */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-400">₹</span>
                                        <input
                                            type="number"
                                            value={product.price}
                                            onChange={e => handleChange(product.id, 'price', e.target.value)}
                                            className="w-24 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-600 focus:outline-none font-bold text-gray-900 py-0.5 transition"
                                        />
                                    </div>
                                </td>
                                {/* Description */}
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={product.description}
                                        onChange={e => handleChange(product.id, 'description', e.target.value)}
                                        className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-600 focus:outline-none text-gray-500 py-0.5 transition text-xs"
                                    />
                                </td>
                                {/* Save */}
                                <td className="px-4 py-3 text-right">
                                    {product._saving ? (
                                        <Loader size={14} className="animate-spin text-gray-400 ml-auto" />
                                    ) : product._saved ? (
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-green-600">Saved ✓</span>
                                    ) : (
                                        <button
                                            onClick={() => handleSave(product)}
                                            disabled={!product._dirty}
                                            className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 transition ml-auto ${product._dirty
                                                    ? 'bg-gray-900 text-white hover:bg-gray-700'
                                                    : 'bg-gray-100 text-gray-300 cursor-default'
                                                }`}
                                        >
                                            <Save size={10} /> Save
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
