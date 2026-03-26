'use client';

import { useEffect, useState } from 'react';
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
    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setFetchError('');
        try {
            const res = await fetch('/api/admin/products');
            if (!res.ok) {
                const err = await res.json();
                setFetchError(err.error || 'Failed to load products.');
            } else {
                const data: Product[] = await res.json();
                setProducts(data.map(p => ({ ...p, _dirty: false, _saving: false, _saved: false })));
            }
        } catch {
            setFetchError('Network error loading products.');
        }
        setLoading(false);
    };

    const handleChange = (id: string, field: keyof Product, value: string | number | string[]) => {
        setProducts(prev =>
            prev.map(p => p.id === id ? { ...p, [field]: value, _dirty: true, _saved: false } : p)
        );
    };

    const handleArrayChange = (id: string, field: 'concerns' | 'ingredients', value: string) => {
        const arrayValue = value.split(',').map(s => s.trim()).filter(Boolean);
        handleChange(id, field, arrayValue);
    };

    const handleSave = async (product: EditableProduct) => {
        setProducts(prev => prev.map(p => p.id === product.id ? { ...p, _saving: true } : p));

        try {
            const res = await fetch('/api/admin/products', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: Number(product.price),
                    category: product.category,
                    concerns: product.concerns,
                    ingredients: product.ingredients,
                }),
            });

            if (res.ok) {
                setProducts(prev =>
                    prev.map(p =>
                        p.id === product.id
                            ? { ...p, _saving: false, _dirty: false, _saved: true }
                            : p
                    )
                );
            } else {
                const err = await res.json();
                setProducts(prev =>
                    prev.map(p => p.id === product.id ? { ...p, _saving: false } : p)
                );
                alert(`Save failed: ${err.error || 'Unknown error'}`);
            }
        } catch {
            setProducts(prev =>
                prev.map(p => p.id === product.id ? { ...p, _saving: false } : p)
            );
            alert('Network error. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white h-24 animate-pulse rounded border border-gray-200" />
                ))}
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="text-center py-16 border border-dashed border-red-200 rounded bg-red-50">
                <p className="text-red-600 font-medium text-sm">{fetchError}</p>
                <button
                    onClick={fetchProducts}
                    className="mt-4 text-xs font-bold uppercase tracking-widest border border-red-300 px-3 py-1.5 text-red-500 hover:bg-red-100 transition"
                >
                    Retry
                </button>
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

            <div className="space-y-4">
                {products.map(product => (
                    <div key={product.id} className={`bg-white border rounded p-5 transition ${product._dirty ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Visual reference */}
                            <div className="md:col-span-2 flex flex-col items-center justify-center bg-gray-50 rounded p-2">
                                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-full mb-2" />
                                <span className="text-[10px] text-gray-400 font-mono truncate w-full text-center" title={product.id}>{product.id.split('-')[0]}...</span>
                            </div>

                            {/* Main Info */}
                            <div className="md:col-span-4 space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={product.name}
                                        onChange={e => handleChange(product.id, 'name', e.target.value)}
                                        className="w-full bg-transparent border-b border-gray-200 hover:border-gray-300 focus:border-gray-900 focus:outline-none font-bold text-gray-900 py-1 transition"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Category</label>
                                        <input
                                            type="text"
                                            value={product.category}
                                            onChange={e => handleChange(product.id, 'category', e.target.value)}
                                            className="w-full bg-transparent border-b border-gray-200 hover:border-gray-300 focus:border-gray-900 focus:outline-none text-sm text-gray-600 py-1 transition"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Price (₹)</label>
                                        <input
                                            type="number"
                                            value={product.price}
                                            onChange={e => handleChange(product.id, 'price', e.target.value)}
                                            className="w-full bg-transparent border-b border-gray-200 hover:border-gray-300 focus:border-gray-900 focus:outline-none text-sm font-bold text-gray-900 py-1 transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Details (Description, Concerns, Ingredients) */}
                            <div className="md:col-span-6 space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Description</label>
                                    <textarea
                                        value={product.description}
                                        onChange={e => handleChange(product.id, 'description', e.target.value)}
                                        rows={2}
                                        className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-gray-900 focus:bg-white transition resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1" title="Comma separated">Concerns (CSV)</label>
                                        <input
                                            type="text"
                                            value={product.concerns?.join(', ') || ''}
                                            onChange={e => handleArrayChange(product.id, 'concerns', e.target.value)}
                                            placeholder="Acne, Fine Lines..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-600 focus:outline-none focus:border-gray-900 focus:bg-white transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1" title="Comma separated">Ingredients (CSV)</label>
                                        <input
                                            type="text"
                                            value={product.ingredients?.join(', ') || ''}
                                            onChange={e => handleArrayChange(product.id, 'ingredients', e.target.value)}
                                            placeholder="Aloe, Niacinamide..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-600 focus:outline-none focus:border-gray-900 focus:bg-white transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end items-center gap-3">
                            {product._saved && !product._dirty && (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 flex items-center gap-1">
                                    Active / Saved ✓
                                </span>
                            )}
                            {product._dirty && !product._saving && (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                                    Unsaved Changes
                                </span>
                            )}
                            
                            <button
                                onClick={() => handleSave(product)}
                                disabled={!product._dirty || product._saving}
                                className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-5 py-2 transition ${product._dirty && !product._saving
                                        ? 'bg-black text-white hover:bg-gray-800'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {product._saving ? (
                                    <><Loader size={12} className="animate-spin" /> Saving...</>
                                ) : (
                                    <><Save size={12} /> Save Changes</>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
