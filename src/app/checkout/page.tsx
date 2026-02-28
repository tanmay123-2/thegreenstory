import React from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <h1 className="text-4xl font-bold text-green-900 mb-8 font-serif tracking-tight">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Checkout Form */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Contact Information */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                    <input type="email" id="email" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" placeholder="you@example.com" />
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="newsletter" className="w-4 h-4 text-green-600 rounded focus:ring-green-500 accent-green-600" />
                                    <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">Email me with news and offers</label>
                                </div>
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                                    <input type="text" id="firstName" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                                    <input type="text" id="lastName" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input type="text" id="address" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" placeholder="Apartment, suite, etc." />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input type="text" id="city" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input type="text" id="state" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                    </div>
                                    <div>
                                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                                        <input type="text" id="zip" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input type="tel" id="phone" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition" />
                                </div>
                            </div>
                        </section>

                        {/* Payment Options */}
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                                Payment Method
                            </h2>
                            <div className="space-y-4">
                                {/* UPI Option */}
                                <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition border-green-500 bg-green-50">
                                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-green-600 accent-green-600" />
                                    <div className="ml-4 flex-1">
                                        <span className="block font-medium text-gray-900">UPI / QR (GPay, PhonePe, Paytm)</span>
                                        <span className="block text-sm text-gray-500 mt-1">Pay quickly using any UPI app</span>
                                    </div>
                                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                </label>

                                {/* Card Option */}
                                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                    <input type="radio" name="payment" className="w-5 h-5 text-green-600 accent-green-600" />
                                    <div className="ml-4 flex-1">
                                        <span className="block font-medium text-gray-900">Credit / Debit Card</span>
                                        <span className="block text-sm text-gray-500 mt-1">Visa, Mastercard, RuPay</span>
                                    </div>
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </label>

                                {/* COD Option */}
                                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                    <input type="radio" name="payment" className="w-5 h-5 text-green-600 accent-green-600" />
                                    <div className="ml-4 flex-1">
                                        <span className="block font-medium text-gray-900">Cash on Delivery</span>
                                        <span className="block text-sm text-gray-500 mt-1">Pay when you receive your order</span>
                                    </div>
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                            {/* Mock Cart Items */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-green-50 rounded text-green-800 flex items-center justify-center font-bold text-xs shrink-0">
                                            IMG
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">10% Vitamin C Serum</p>
                                            <p className="text-xs text-gray-500">Qty: 1</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-800">₹699</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-green-50 rounded text-green-800 flex items-center justify-center font-bold text-xs shrink-0">
                                            IMG
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">Hyaluronic Acid 2%</p>
                                            <p className="text-xs text-gray-500">Qty: 1</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-800">₹599</p>
                                </div>
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
                                    <p className="font-medium text-gray-800">₹1298</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <p>Shipping</p>
                                    <p className="font-medium text-green-600">Free</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <p>Taxes</p>
                                    <p className="font-medium text-gray-800">₹116</p>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-end pt-6 border-t border-gray-100 mb-8">
                                <div>
                                    <p className="text-base text-gray-900 font-bold">Total</p>
                                    <p className="text-xs text-gray-500">Including ₹116 in taxes</p>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">₹1414</p>
                            </div>

                            <Link href="/checkout/success">
                                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-6 rounded-xl transition duration-200 shadow-md flex items-center justify-center space-x-2">
                                    <span>Place Order</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </Link>

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
