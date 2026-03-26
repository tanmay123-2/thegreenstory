'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Package, User, MapPin, CreditCard, ChevronDown } from 'lucide-react';

interface OrderItem {
    id: string;
    quantity: number;
    price_at_time: number;
    products: { name: string; image: string } | null;
}

interface Order {
    id: string;
    created_at: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    payment_method: string;
    subtotal: number;
    taxes: number;
    total: number;
    status: string;
    user_email?: string;
    order_items: OrderItem[];
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    id,
                    quantity,
                    price_at_time,
                    products ( name, image )
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching orders:', error);
        } else {
            setOrders((data as unknown as Order[]) || []);
        }
        setLoading(false);
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        setUpdatingStatus(orderId);
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (!error) {
            setOrders(prev =>
                prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
            );
        }
        setUpdatingStatus(null);
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white h-20 animate-pulse rounded border border-gray-200" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-24 border border-dashed border-gray-300 rounded">
                <Package size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No orders yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500 font-medium">{orders.length} total orders</p>
                <button onClick={fetchOrders} className="text-xs font-bold uppercase tracking-widest border border-gray-300 px-3 py-1.5 hover:bg-gray-50 transition">
                    Refresh
                </button>
            </div>

            {orders.map(order => (
                <div key={order.id} className="bg-white border border-gray-200 rounded overflow-hidden">
                    {/* Order Header Row */}
                    <div
                        className="flex flex-wrap items-center gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-sm">
                                {order.first_name} {order.last_name}
                            </p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5 truncate">#{order.id.slice(0, 16)}…</p>
                        </div>

                        <div className="text-right">
                            <p className="font-bold text-gray-900">₹{order.total}</p>
                            <p className="text-xs text-gray-400">
                                {new Date(order.created_at).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })}
                            </p>
                        </div>

                        {/* Status selector */}
                        <div onClick={e => e.stopPropagation()}>
                            <select
                                value={order.status}
                                disabled={updatingStatus === order.id}
                                onChange={e => handleStatusChange(order.id, e.target.value)}
                                className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}
                            >
                                {STATUS_OPTIONS.map(s => (
                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform flex-shrink-0 ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                        />
                    </div>

                    {/* Expanded Details */}
                    {expandedOrder === order.id && (
                        <div className="border-t border-gray-100 px-5 py-5 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50">
                            {/* Customer Info */}
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                                    <User size={11} /> Customer
                                </p>
                                <p className="text-sm font-bold text-gray-900">{order.first_name} {order.last_name}</p>
                                <p className="text-sm text-gray-500 mt-1">{order.phone}</p>
                                <p className="text-xs text-gray-400 mt-1 font-mono">Payment: {order.payment_method}</p>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                                    <MapPin size={11} /> Shipping Address
                                </p>
                                <p className="text-sm text-gray-700">{order.address}</p>
                                <p className="text-sm text-gray-700">{order.city}, {order.state}</p>
                                <p className="text-sm text-gray-700">PIN: {order.zip}</p>
                            </div>

                            {/* Items Ordered */}
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                                    <CreditCard size={11} /> Items Ordered
                                </p>
                                <div className="space-y-2">
                                    {order.order_items?.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-700 truncate max-w-[160px]">
                                                {item.products?.name || 'Unknown product'} × {item.quantity}
                                            </span>
                                            <span className="font-bold text-gray-900 ml-2 flex-shrink-0">
                                                ₹{item.price_at_time * item.quantity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-sm">
                                    <span className="text-gray-500">Total</span>
                                    <span className="font-bold text-gray-900">₹{order.total}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
