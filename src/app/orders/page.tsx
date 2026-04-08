'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Package, MapPin, CreditCard } from 'lucide-react';

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
            <div className="min-h-screen bg-brand-cream py-24 px-6 flex justify-center">
                <div className="animate-shimmer bg-brand-ivory p-8 w-full max-w-4xl h-64 border border-brand-border-light"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-brand-cream pb-24">
            <header className="bg-brand-ivory py-16 px-6 border-b border-brand-border-light">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter uppercase mb-2">My Orders</h1>
                        <p className="text-[13px] text-brand-muted font-medium tracking-wide uppercase font-sans">
                            Account: {user.email}
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 mt-12 space-y-8">
                {orders.length === 0 ? (
                    <div className="bg-brand-ivory p-12 text-center border border-brand-border-light">
                        <Package className="mx-auto text-brand-muted mb-4" size={32} strokeWidth={1.5} />
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-2">No Orders Found</h2>
                        <p className="text-[13px] text-brand-muted font-medium mb-6 font-sans">You haven&apos;t placed any orders yet.</p>
                        <Link href="/shop" className="inline-block border-b border-brand-green text-[11px] font-bold uppercase tracking-widest pb-0.5 hover:opacity-70 transition-opacity text-brand-green font-sans">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-brand-ivory border border-brand-border-light overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-brand-cream/50 border-b border-brand-border-light p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="grid grid-cols-2 md:flex md:gap-12 gap-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1 font-sans">Order Date</p>
                                        <p className="text-[13px] font-medium text-brand-text font-sans">
                                            {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1 font-sans">Total</p>
                                        <p className="text-[13px] font-medium text-brand-text font-sans">₹{order.total}</p>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1 font-sans">Order ID</p>
                                        <p className="text-[13px] font-medium text-brand-text font-mono">{order.id.split('-')[0]}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest border font-sans ${order.status === 'delivered' ? 'bg-brand-green/10 text-brand-green border-brand-green/20' :
                                            order.status === 'shipped' ? 'bg-brand-gold/10 text-brand-gold-dark border-brand-gold/20' :
                                                'bg-brand-ivory text-brand-text border-brand-border'
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
                                                <div className="relative w-20 h-20 bg-brand-cream border border-brand-border-light shrink-0">
                                                    {product.image ? (
                                                        <Image src={product.image} alt={product.name || 'Product'} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-brand-muted border border-brand-border-light text-[10px] uppercase font-sans">No Img</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <Link href={`/product/${product.id}`} className="text-[13px] font-bold text-brand-text hover:underline underline-offset-4 decoration-1 mb-1 font-sans">
                                                        {product.name || 'Unknown Product'}
                                                    </Link>
                                                    <p className="text-[11px] font-medium text-brand-muted mb-2 font-sans">
                                                        Qty: {item.quantity}
                                                    </p>
                                                    <p className="text-[11px] font-bold text-brand-text font-sans">
                                                        ₹{item.price_at_time}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Order Info Sidebar */}
                                <div className="lg:w-64 shrink-0 border-t lg:border-t-0 lg:border-l border-brand-border-light pt-6 lg:pt-0 lg:pl-6 space-y-6">
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-muted flex items-center gap-2 mb-3 font-sans">
                                            <MapPin size={14} /> Shipping Address
                                        </h4>
                                        <p className="text-[13px] font-medium text-brand-text leading-relaxed font-sans">
                                            {order.address}<br />
                                            {order.city}, {order.state} {order.zip}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-muted flex items-center gap-2 mb-3 font-sans">
                                            <CreditCard size={14} /> Payment Method
                                        </h4>
                                        <p className="text-[13px] font-medium text-brand-text font-sans">
                                            {order.payment_method === 'UPI' ? 'UPI / QR Code' : order.payment_method === 'COD' ? 'Cash on Delivery' : order.payment_method}
                                        </p>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-brand-border-light">
                                        <button className="w-full bg-brand-green text-brand-ivory text-[11px] font-bold uppercase tracking-widest py-3 hover:bg-brand-green-dark transition-colors font-sans">
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
