'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, RefreshCw } from 'lucide-react';

interface CartEntry {
    id: string;
    user_id: string;
    quantity: number;
    created_at: string;
    products: {
        id: string;
        name: string;
        price: number;
        category: string;
        image: string;
    } | null;
}

export default function AdminCarts() {
    const [cartItems, setCartItems] = useState<CartEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCarts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/carts');
            if (res.ok) {
                const data = await res.json();
                setCartItems(data);
            } else {
                setError('Failed to fetch cart items');
            }
        } catch {
            setError('Network error');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCarts();
    }, []);

    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white h-20 animate-pulse rounded border border-gray-200" />
                ))}
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-sm py-4">{error}</div>;

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-24 border border-dashed border-gray-300 rounded">
                <ShoppingCart size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No items stored in carts.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500 font-medium">{cartItems.length} active cart items</p>
                <button onClick={fetchCarts} className="text-xs font-bold uppercase tracking-widest border border-gray-300 px-3 py-1.5 hover:bg-gray-50 transition flex items-center gap-1.5">
                    <RefreshCw size={11} /> Refresh
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Product</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">User ID</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 w-24">Quantity</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Value</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Added On</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {cartItems.map(entry => {
                            const unitPrice = entry.products?.price || 0;
                            const totalValue = unitPrice * entry.quantity;

                            return (
                                <tr key={entry.id} className="hover:bg-gray-50 transition">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {entry.products?.image && (
                                                <img src={entry.products.image} alt={entry.products.name} className="w-10 h-10 object-cover rounded" />
                                            )}
                                            <div>
                                                <p className="font-bold text-gray-900">{entry.products?.name || 'Unknown Product'}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">₹{unitPrice} ea</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <p className="text-xs text-gray-500 font-mono" title={entry.user_id}>{entry.user_id.slice(0, 8)}...{entry.user_id.slice(-4)}</p>
                                    </td>
                                    <td className="px-4 py-4 font-bold text-gray-900">
                                        {entry.quantity}
                                    </td>
                                    <td className="px-4 py-4 font-bold text-gray-900">
                                        ₹{totalValue}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col text-gray-600 text-sm">
                                            <span>{new Date(entry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            <span className="text-xs text-gray-400 font-mono">{new Date(entry.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
