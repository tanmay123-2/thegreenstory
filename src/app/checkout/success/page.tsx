'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { CheckCircle2 } from 'lucide-react';

export default function CheckoutSuccessPage() {
    const router = useRouter();
    const [latestOrderId, setLatestOrderId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestOrder = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                setLoading(false);
                return;
            }

            // Fetch the most recently created order for this user
            const { data, error } = await supabase
                .from('orders')
                .select('id')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (!error && data) {
                setLatestOrderId(data.id.split('-')[0].toUpperCase());
            }
            setLoading(false);
        };

        fetchLatestOrder();
    }, []);

    return (
        <div className="min-h-[80vh] bg-brand-gray flex flex-col items-center justify-center py-24 px-6">
            <div className="max-w-xl w-full bg-brand-white p-12 text-center border border-brand-gray-dark/10 shadow-sm relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-black"></div>

                <div className="flex justify-center mb-8">
                    <CheckCircle2 size={64} strokeWidth={1} className="text-brand-black" />
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase mb-6 text-brand-black">
                    Order Completed.
                </h1>

                <p className="text-[14px] text-brand-gray-dark font-medium leading-relaxed mb-8 max-w-md mx-auto">
                    Thank you for choosing The Green Story. Your formulation order has been successfully processed and is now being prepared for shipment.
                </p>

                {loading ? (
                    <div className="animate-pulse bg-brand-gray h-20 w-full mb-10 border border-brand-gray-dark/10"></div>
                ) : (
                    <div className="bg-brand-gray/50 p-6 border border-brand-gray-dark/10 text-left mb-10 space-y-4">
                        <div className="flex justify-between items-center border-b border-brand-gray-dark/10 pb-4">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gray-dark">Order ID</span>
                            <span className="text-[13px] font-bold text-brand-black font-mono">
                                {latestOrderId ? `#TGS-${latestOrderId}` : 'Pending Confirmation'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gray-dark">Estimated Dispatch</span>
                            <span className="text-[13px] font-bold text-brand-black">1 - 2 Business Days</span>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/orders"
                        className="flex-1 bg-brand-black text-brand-white text-[11px] font-bold uppercase tracking-widest py-4 hover:opacity-80 transition-opacity"
                    >
                        View My Orders
                    </Link>
                    <Link
                        href="/shop"
                        className="flex-1 bg-transparent text-brand-black border border-brand-black text-[11px] font-bold uppercase tracking-widest py-4 hover:bg-brand-gray transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
