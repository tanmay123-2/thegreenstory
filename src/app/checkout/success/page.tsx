import React from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-green-100 text-center space-y-8">
                <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 p-4">
                        <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 font-serif">Order Confirmed!</h2>
                    <p className="mt-4 text-sm text-gray-600">
                        Thank you for shopping with The Green Story. Your order has been placed successfully and is being processed.
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-100 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Order Number:</span>
                        <span className="font-semibold text-gray-900">#TGS-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estimated Delivery:</span>
                        <span className="font-semibold text-gray-900">3-5 Business Days</span>
                    </div>
                </div>

                <div className="pt-4 flex flex-col space-y-3">
                    <Link href="/shop" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
                        Continue Shopping
                    </Link>
                    <Link href="/track" className="w-full flex justify-center py-3 px-4 border border-green-200 rounded-xl shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
                        Track Order
                    </Link>
                </div>
            </div>
        </div>
    );
}
