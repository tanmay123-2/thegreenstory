"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function UnifiedLogin() {
    const [method, setMethod] = useState<'email' | 'whatsapp'>('email');
    const [contact, setContact] = useState(''); // Stores either email or phone
    const [otp, setOtp] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);

    // 1. Send the Code
    const handleSendOTP = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            [method === 'email' ? 'email' : 'phone']: contact,
            options: { channel: method === 'email' ? 'email' : 'whatsapp' }
        } as any);

        setLoading(false);
        if (error) alert(error.message);
        else setIsSent(true);
    };

    // 2. Verify the Code
    const handleVerify = async () => {
        const { error } = await supabase.auth.verifyOtp({
            [method === 'email' ? 'email' : 'phone']: contact,
            token: otp,
            type: method === 'email' ? 'email' : 'whatsapp'
        } as any);

        if (error) alert(error.message);
        else {
            alert("Welcome to The Green Story!");
            window.location.href = "/";
        }
    };

    // 3. Google Login
    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`,
            }
        });
        setLoading(false);
        if (error) alert(error.message);
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-2xl border border-green-100">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Sign In</h2>

            {!isSent ? (
                <div className="space-y-6">
                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-bold py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition shadow-sm"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>

                    <div className="flex items-center my-4">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-4 text-gray-500 text-sm font-medium">or continue with</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Method Switcher */}
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button
                            onClick={() => setMethod('email')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold ${method === 'email' ? 'bg-white shadow' : ''}`}
                        >Email</button>
                        <button
                            onClick={() => setMethod('whatsapp')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold ${method === 'whatsapp' ? 'bg-white shadow text-green-600' : ''}`}
                        >WhatsApp</button>
                    </div>

                    <input
                        type={method === 'email' ? 'email' : 'tel'}
                        placeholder={method === 'email' ? "nature@greenstory.com" : "+91 00000 00000"}
                        className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setContact(e.target.value)}
                    />

                    <button
                        disabled={loading}
                        onClick={handleSendOTP}
                        className="w-full bg-green-700 text-white font-bold py-4 rounded-xl hover:bg-green-800 transition"
                    >
                        {loading ? "Sending..." : `Send ${method === 'email' ? 'Link' : 'WhatsApp Code'}`}
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <p className="text-center text-gray-600">Enter the code sent to <b>{contact}</b></p>
                    <input
                        type="text" placeholder="6-digit code"
                        className="w-full p-4 border rounded-xl text-center text-2xl tracking-widest"
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                        onClick={handleVerify}
                        className="w-full bg-green-700 text-white font-bold py-4 rounded-xl"
                    >
                        Verify & Enter
                    </button>
                    <button onClick={() => setIsSent(false)} className="w-full text-sm text-gray-500 underline">
                        Change {method}
                    </button>
                </div>
            )}
        </div>
    );
}
