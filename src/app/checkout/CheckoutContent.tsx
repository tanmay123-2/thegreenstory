"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';


export default function CheckoutPage() {
    const router = useRouter();
    const { items, cartTotal, clearCart } = useCart();
    const [user, setUser] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });

    // Saved Address State
    const [savedAddress, setSavedAddress] = useState<any>(null);
    const [showAddressForm, setShowAddressForm] = useState(true);

    const [paymentMethod, setPaymentMethod] = useState('UPI');
    const [orderRef, setOrderRef] = useState('');

    useEffect(() => {
        setOrderRef(`ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
    }, []);

    const taxes = Math.round(cartTotal * 0.18); // 18% mock tax
    const finalTotal = cartTotal + taxes;

    useEffect(() => {
        const fetchUserAndAddress = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                await fetchLatestAddress(currentUser.id);
            }
        };
        fetchUserAndAddress();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                await fetchLatestAddress(currentUser.id);
            } else {
                // Clear form if logged out
                setFormData({
                    firstName: '', lastName: '', address: '', city: '', state: '', zip: '', phone: ''
                });
                setSavedAddress(null);
                setShowAddressForm(true);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchLatestAddress = async (userId: string) => {
        setIsLoadingAddress(true);
        // Safety timeout — if Supabase hangs, stop showing loader after 5s
        const safetyTimer = setTimeout(() => setIsLoadingAddress(false), 5000);
        try {
            // Use maybeSingle() instead of single() to avoid errors when user has no past orders
            const { data, error } = await supabase
                .from('orders')
                .select('first_name, last_name, address, city, state, zip, phone')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (data && !error) {
                const addressData = {
                    firstName: data.first_name || '',
                    lastName: data.last_name || '',
                    address: data.address || '',
                    city: data.city || '',
                    state: data.state || '',
                    zip: data.zip || '',
                    phone: data.phone || ''
                };
                setSavedAddress(addressData);
                setFormData(addressData);
                setShowAddressForm(false);
            }
        } catch (err) {
            console.error('Error fetching latest address:', err);
        } finally {
            clearTimeout(safetyTimer);
            setIsLoadingAddress(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handlePlaceOrder = async () => {
        if (!user) {
            alert('Please log in to place an order.');
            router.push('/login');
            return;
        }

        if (items.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        // Basic validation
        const targetAddress = (!showAddressForm && savedAddress) ? savedAddress : formData;

        if (!targetAddress.firstName || !targetAddress.address || !targetAddress.city || !targetAddress.phone) {
            alert('Please fill in all required shipping details.');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Insert Order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    first_name: targetAddress.firstName,
                    last_name: targetAddress.lastName,
                    address: targetAddress.address,
                    city: targetAddress.city,
                    state: targetAddress.state,
                    zip: targetAddress.zip,
                    phone: targetAddress.phone,
                    payment_method: paymentMethod, // if UPI, could append orderRef or save to a notes col. We'll stick to basic schema.
                    subtotal: cartTotal,
                    shipping: 0,
                    taxes: taxes,
                    total: finalTotal,
                    status: 'pending'
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Insert Order Items
            const orderItems = items.map(item => ({
                order_id: orderData.id,
                product_id: item.product.id,
                quantity: item.quantity,
                price_at_time: item.product.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3. Clear Cart
            await clearCart();

            // 4. Redirect
            router.push('/checkout/success');

        } catch (error: any) {
            console.error('Error placing order:', error.message || error, JSON.stringify(error, null, 2));
            alert(`There was an error placing your order: ${error.message || JSON.stringify(error)}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <h1 className="text-4xl font-bold text-green-900 mb-8 font-serif tracking-tight">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Checkout Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Account Information */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                                    <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                                    Account
                                </h2>
                                {user ? (
                                    <p className="text-sm text-gray-600 ml-11">Logged in as {user.email}</p>
                                ) : (
                                    <p className="text-sm text-gray-600 ml-11">Log in or sign up to complete your purchase</p>
                                )}
                            </div>
                            {user ? (
                                <button
                                    onClick={async () => {
                                        await supabase.auth.signOut();
                                        window.location.href = '/';
                                    }}
                                    className="bg-gray-100 text-gray-800 font-bold py-2.5 px-6 rounded-xl hover:bg-gray-200 transition text-sm"
                                >
                                    Log out
                                </button>
                            ) : (
                                <Link href="/login" className="bg-green-700 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-green-800 transition text-sm">
                                    Log in / Sign up
                                </Link>
                            )}
                        </section>

                        {/* Shipping Address */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                    <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                                    Shipping Address
                                </h2>
                                {isLoadingAddress && <span className="text-sm text-green-600 font-medium animate-pulse">Loading saved address...</span>}
                            </div>

                            {/* Saved Address Display OR Form */}
                            {!showAddressForm && savedAddress ? (
                                <div className="border border-green-200 bg-green-50/50 rounded-xl p-6 relative">
                                    <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                        Saved Address
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">{savedAddress.firstName} {savedAddress.lastName}</h3>
                                    <p className="text-gray-600 text-sm mb-1">{savedAddress.address}</p>
                                    <p className="text-gray-600 text-sm mb-1">{savedAddress.city}, {savedAddress.state} {savedAddress.zip}</p>
                                    <p className="text-gray-600 text-sm mb-6">Phone: {savedAddress.phone}</p>

                                    <div className="flex items-center space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData(savedAddress);
                                                setShowAddressForm(true);
                                            }}
                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                                        >
                                            Update Address
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSavedAddress(null);
                                                setFormData({ firstName: '', lastName: '', address: '', city: '', state: '', zip: '', phone: '' });
                                                setShowAddressForm(true);
                                            }}
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition"
                                        >
                                            Delete & Use New
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {savedAddress && (
                                        <div className="md:col-span-2 mb-2 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => setShowAddressForm(false)}
                                                className="text-sm font-medium text-green-700 hover:text-green-800 underline"
                                            >
                                                Cancel and use saved address
                                            </button>
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                                        <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                                        <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input type="text" id="address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" placeholder="Apartment, suite, etc." />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input type="text" id="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                            <input type="text" id="state" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                        </div>
                                        <div>
                                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                                            <input type="text" id="zip" value={formData.zip} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Payment Options */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                                Payment Method
                            </h2>
                            <div className="space-y-4">
                                {/* UPI Option */}
                                <div className={`border rounded-xl transition ${paymentMethod === 'UPI' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                                    <label className="flex items-center p-4 cursor-pointer">
                                        <input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-green-600 accent-green-600" />
                                        <div className="ml-4 flex-1">
                                            <span className="block font-medium text-gray-900">UPI / QR (GPay, PhonePe, Paytm)</span>
                                            <span className="block text-sm text-gray-500 mt-1">Pay quickly using any UPI app</span>
                                        </div>
                                        <svg className={`w-8 h-8 ${paymentMethod === 'UPI' ? 'text-green-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                    </label>

                                    {paymentMethod === 'UPI' && finalTotal > 0 && (
                                        <div className="p-4 border-t border-green-200 flex flex-col items-center text-center">
                                            <p className="text-sm font-medium text-gray-800 mb-4">Scan the QR code below using any UPI App to pay securely.</p>
                                            <div className="bg-white p-4 rounded-xl shadow-sm inline-block mb-3">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`upi://pay?pa=reena.goyal@ptaxis&pn=Reena%20Goyal&am=${finalTotal}&cu=INR&tn=${orderRef}`)}`}
                                                    alt="UPI QR Code"
                                                    width={160}
                                                    height={160}
                                                />
                                            </div>
                                            <div className="bg-white border border-gray-200 flex items-center px-4 py-2 rounded-lg mb-1">
                                                <span className="text-sm text-gray-600 mr-2">UPI ID:</span>
                                                <code className="text-sm font-bold text-green-700 select-all tracking-wide">reena.goyal@ptaxis</code>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-3 max-w-xs">
                                                After a successful payment on your mobile device, please click the "Place Order" button on the right to complete your checkout.
                                            </p>
                                        </div>
                                    )}
                                </div>


                                {/* COD Option */}
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition ${paymentMethod === 'COD' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                                    <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-green-600 accent-green-600" />
                                    <div className="ml-4 flex-1">
                                        <span className="block font-medium text-gray-900">Cash on Delivery</span>
                                        <span className="block text-sm text-gray-500 mt-1">Pay when you receive your order</span>
                                    </div>
                                    <svg className={`w-8 h-8 ${paymentMethod === 'COD' ? 'text-green-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6">
                                {items.length === 0 ? (
                                    <p className="text-sm text-gray-500 italic">Your cart is empty.</p>
                                ) : (
                                    items.map((item) => (
                                        <div key={item.product.id} className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative w-12 h-12 bg-green-50 rounded overflow-hidden shrink-0 border border-gray-100">
                                                    {item.product.image && (
                                                        <Image
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="48px"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-800">₹{item.product.price * item.quantity}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Promo Code */}
                            <div className="flex gap-2 mb-6 border-t border-gray-100 pt-6">
                                <input type="text" placeholder="Discount code" className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                                <button className="bg-gray-900 text-white px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition">Apply</button>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 pt-6 border-t border-gray-100 mb-6">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <p>Subtotal</p>
                                    <p className="font-medium text-gray-800">₹{cartTotal}</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <p>Shipping</p>
                                    <p className="font-medium text-green-600">Free</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <p>Taxes (Estimated)</p>
                                    <p className="font-medium text-gray-800">₹{items.length > 0 ? taxes : 0}</p>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-end pt-6 border-t border-gray-100 mb-8">
                                <div>
                                    <p className="text-base text-gray-900 font-bold">Total</p>
                                    <p className="text-xs text-gray-500">Including ₹{items.length > 0 ? taxes : 0} in taxes</p>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">₹{items.length > 0 ? finalTotal : 0}</p>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isSubmitting || items.length === 0}
                                className={`w-full ${isSubmitting || items.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'} text-white font-bold py-4 px-6 rounded-xl transition duration-200 shadow-md flex items-center justify-center space-x-2`}
                            >
                                <span>{isSubmitting ? 'Processing...' : 'Place Order'}</span>
                                {!isSubmitting && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                )}
                            </button>

                            <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Payments are secure and encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
