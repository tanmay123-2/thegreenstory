"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function UnifiedLogin() {
    const [contact, setContact] = useState(''); // Stores email
    const [otp, setOtp] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);

    // 1. Send the Code
    const handleSendOTP = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email: contact,
            options: { channel: 'email' }
        } as any);

        setLoading(false);
        if (error) alert(error.message);
        else setIsSent(true);
    };

    // 2. Verify the Code
    const handleVerify = async () => {
        const { error } = await supabase.auth.verifyOtp({
            email: contact,
            token: otp,
            type: 'email'
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
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Login or Sign Up</h2>

            {!isSent ? (
                <div className="space-y-4">
                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-bold py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition shadow-sm"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>

                    {!showEmailInput ? (
                        <button
                            onClick={() => setShowEmailInput(true)}
                            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-bold py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition shadow-sm"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            Continue with Email
                        </button>
                    ) : (
                        <div className="space-y-4 mt-6">
                            <div className="flex items-center my-4">
                                <div className="flex-1 border-t border-gray-200"></div>
                                <span className="px-4 text-gray-500 text-sm font-medium">Enter your email</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>
                            <input
                                type="email"
                                placeholder="nature@greenstory.com"
                                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                onChange={(e) => setContact(e.target.value)}
                            />

                            <button
                                disabled={loading}
                                onClick={handleSendOTP}
                                className="w-full bg-green-700 text-white font-bold py-4 rounded-xl hover:bg-green-800 transition"
                            >
                                {loading ? "Sending..." : "Send Link"}
                            </button>
                        </div>
                    )}
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
                        Change Email
                    </button>
                </div>
            )}
        </div>
    );
}
