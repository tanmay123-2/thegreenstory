'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Lock, ShoppingBag, Package, LogOut, Eye, EyeOff } from 'lucide-react';

const AdminOrders = dynamic(() => import('./AdminOrders'), { ssr: false });
const AdminProducts = dynamic(() => import('./AdminProducts'), { ssr: false });
const AdminUsers = dynamic(() => import('./AdminUsers'), { ssr: false });
const AdminWishlists = dynamic(() => import('./AdminWishlists'), { ssr: false });
const AdminCarts = dynamic(() => import('./AdminCarts'), { ssr: false });

const SESSION_KEY = 'gs_admin_auth';

export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'users' | 'wishlists' | 'carts'>('orders');

    // Check session on mount
    useEffect(() => {
        if (sessionStorage.getItem(SESSION_KEY) === 'true') {
            setAuthed(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                sessionStorage.setItem(SESSION_KEY, 'true');
                setAuthed(true);
            } else {
                const data = await res.json();
                setError(data.error || 'Incorrect password.');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
        setPassword('');
    };

    // ── Password Gate ───────────────────────────────────────────────────────────
    if (!authed) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    <div className="bg-white border border-gray-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-black p-2">
                                <Lock size={16} className="text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-gray-900 text-sm uppercase tracking-widest">Admin</h1>
                                <p className="text-xs text-gray-400">The Green Story</p>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gray-900 transition pr-10"
                                        placeholder="Enter admin password"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                {error && (
                                    <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !password}
                                className="w-full bg-black text-white font-bold py-3 text-[12px] uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-300 transition"
                            >
                                {loading ? 'Verifying...' : 'Enter Dashboard'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // ── Admin Dashboard ─────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-black p-1.5">
                            <Lock size={12} className="text-white" />
                        </div>
                        <span className="font-bold text-gray-900 text-sm uppercase tracking-widest">
                            The Green Story — Admin
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition"
                    >
                        <LogOut size={13} /> Log out
                    </button>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-5 flex gap-0 border-t border-gray-100">
                    {[
                        { key: 'orders', label: 'Orders', icon: ShoppingBag },
                        { key: 'products', label: 'Products', icon: Package },
                        { key: 'users', label: 'Users', icon: Eye },
                        { key: 'wishlists', label: 'Wishlists', icon: Eye },
                        { key: 'carts', label: 'Carts', icon: ShoppingBag },
                    ].map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key as any)}
                            className={`flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-widest border-b-2 transition ${activeTab === key
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon size={13} /> {label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-5 py-8">
                {activeTab === 'orders' && <AdminOrders />}
                {activeTab === 'products' && <AdminProducts />}
                {activeTab === 'users' && <AdminUsers />}
                {activeTab === 'wishlists' && <AdminWishlists />}
                {activeTab === 'carts' && <AdminCarts />}
            </main>
        </div>
    );
}
