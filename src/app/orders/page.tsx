'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Package, MapPin, CreditCard, ChevronRight } from 'lucide-react';

export default function OrdersPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                router.push('/login');
                return;
            }
            setUser(session.user);

            // Fetch orders and their nested items + products
            // Adjust the nested select based on the actual foreign keys in Supabase
            // order_items references orders and products.
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    id, created_at, status, total, payment_method, address, city, state, zip,
                    order_items (
                        quantity,
                        price_at_time,
                        products (
                            id,
                            name,
                            image
                        )
                    )
                `)
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching orders:', error);
            } else {
                setOrders(data || []);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-gray py-24 px-6 flex justify-center">
                <div className="animate-pulse bg-brand-white p-8 w-full max-w-4xl h-64 border border-brand-gray-dark/10"></div>
            </div>
        );
    }

    if (!user) return null; // Let the router redirect

    return (
        <div className="min-h-screen bg-brand-gray pb-24">
            <header className="bg-brand-white py-16 px-6 border-b border-brand-gray-dark/10">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter uppercase mb-2">My Orders</h1>
                        <p className="text-[13px] text-brand-gray-dark font-medium tracking-wide uppercase">
                            Account: {user.email}
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 mt-12 space-y-8">
                {orders.length === 0 ? (
                    <div className="bg-brand-white p-12 text-center border border-brand-gray-dark/10">
                        <Package className="mx-auto text-brand-gray-dark mb-4" size={32} strokeWidth={1.5} />
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-2">No Orders Found</h2>
                        <p className="text-[13px] text-brand-gray-dark font-medium mb-6">You haven't placed any orders yet.</p>
                        <Link href="/shop" className="inline-block border-b border-brand-black text-[11px] font-bold uppercase tracking-widest pb-0.5 hover:opacity-70 transition-opacity">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-brand-white border border-brand-gray-dark/10 overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-brand-gray/50 border-b border-brand-gray-dark/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="grid grid-cols-2 md:flex md:gap-12 gap-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray-dark mb-1">Order Date</p>
                                        <p className="text-[13px] font-medium text-brand-black">
                                            {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray-dark mb-1">Total</p>
                                        <p className="text-[13px] font-medium text-brand-black">₹{order.total}</p>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray-dark mb-1">Order ID</p>
                                        <p className="text-[13px] font-medium text-brand-black font-mono">{order.id.split('-')[0]}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                                            order.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                'bg-brand-white text-brand-black border-brand-gray-dark/20'
                                        }`}>
                                        {order.status || 'Pending'}
                                    </span>
                                </div>
                            </div>

                            {/* Order Details Body */}
                            <div className="p-6 flex flex-col lg:flex-row gap-8">
                                {/* Items List */}
                                <div className="flex-1 space-y-6">
                                    {order.order_items?.map((item: any, idx: number) => {
                                        const product = item.products || {};
                                        return (
                                            <div key={idx} className="flex gap-4">
                                                <div className="relative w-20 h-20 bg-brand-gray border border-brand-gray-dark/10 shrink-0">
                                                    {product.image ? (
                                                        <Image src={product.image} alt={product.name || 'Product'} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-brand-gray-dark border border-brand-gray-dark/10 text-[10px] uppercase">No Img</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <Link href={`/product/${product.id}`} className="text-[13px] font-bold text-brand-black hover:underline underline-offset-4 decoration-1 mb-1">
                                                        {product.name || 'Unknown Product'}
                                                    </Link>
                                                    <p className="text-[11px] font-medium text-brand-gray-dark mb-2">
                                                        Qty: {item.quantity}
                                                    </p>
                                                    <p className="text-[11px] font-bold text-brand-black">
                                                        ₹{item.price_at_time}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Order Info Sidebar */}
                                <div className="lg:w-64 shrink-0 border-t lg:border-t-0 lg:border-l border-brand-gray-dark/10 pt-6 lg:pt-0 lg:pl-6 space-y-6">
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-gray-dark flex items-center gap-2 mb-3">
                                            <MapPin size={14} /> Shipping Address
                                        </h4>
                                        <p className="text-[13px] font-medium text-brand-black leading-relaxed">
                                            {order.address}<br />
                                            {order.city}, {order.state} {order.zip}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-gray-dark flex items-center gap-2 mb-3">
                                            <CreditCard size={14} /> Payment Method
                                        </h4>
                                        <p className="text-[13px] font-medium text-brand-black">
                                            {order.payment_method === 'UPI' ? 'UPI / QR Code' : order.payment_method === 'COD' ? 'Cash on Delivery' : order.payment_method}
                                        </p>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-brand-gray-dark/10">
                                        <button className="w-full bg-brand-black text-brand-white text-[11px] font-bold uppercase tracking-widest py-3 hover:opacity-80 transition-opacity">
                                            Track Shipment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}
