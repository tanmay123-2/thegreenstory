"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/context/ToastContext';

export default function UnifiedLogin() {
    const [contact, setContact] = useState('');
    const [otp, setOtp] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const { addToast } = useToast();

    const handleSendOTP = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email: contact,
            options: { channel: 'email' }
        } as any);

        setLoading(false);
        if (error) addToast(error.message, 'error');
        else setIsSent(true);
    };

    const handleVerify = async () => {
        const { error } = await supabase.auth.verifyOtp({
            email: contact,
            token: otp,
            type: 'email'
        } as any);

        if (error) addToast(error.message, 'error');
        else {
            addToast("Welcome to The Green Story!", "success");
            window.location.href = "/";
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`,
            }
        });
        setLoading(false);
        if (error) addToast(error.message, 'error');
    };

    return (
        <div className="bg-brand-cream min-h-[80vh] flex flex-col justify-center items-center py-24 px-6">
            <div className="bg-brand-ivory p-8 md:p-12 border border-brand-border-light w-full max-w-md shadow-sm">
                <h2 className="text-3xl font-bold text-brand-green mb-6 text-center">Login or Sign Up</h2>

                {!isSent ? (
                    <div className="space-y-4">
                        {/* Google Login Button */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-brand-ivory text-brand-text font-bold py-3 border border-brand-border hover:bg-brand-cream transition-colors text-[13px] font-sans"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            Continue with Google
                        </button>

                        {!showEmailInput ? (
                            <button
                                onClick={() => setShowEmailInput(true)}
                                className="w-full flex items-center justify-center gap-3 bg-brand-ivory text-brand-text font-bold py-3 border border-brand-border hover:bg-brand-cream transition-colors text-[13px] font-sans"
                            >
                                <svg className="w-5 h-5 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                Continue with Email
                            </button>
                        ) : (
                            <div className="space-y-4 mt-6">
                                <div className="flex items-center my-4">
                                    <div className="flex-1 border-t border-brand-border"></div>
                                    <span className="px-4 text-brand-muted text-sm font-medium font-sans">Enter your email</span>
                                    <div className="flex-1 border-t border-brand-border"></div>
                                </div>
                                <input
                                    type="email"
                                    placeholder="nature@greenstory.com"
                                    className="w-full p-4 border border-brand-border focus:outline-none focus:border-brand-green bg-brand-ivory text-[13px] font-sans"
                                    onChange={(e) => setContact(e.target.value)}
                                />

                                <button
                                    disabled={loading}
                                    onClick={handleSendOTP}
                                    className="w-full bg-brand-green text-brand-ivory font-bold py-4 hover:bg-brand-green-dark transition-colors text-[13px] uppercase tracking-widest font-sans"
                                >
                                    {loading ? "Sending..." : "Send Link"}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <p className="text-center text-brand-muted font-sans">Enter the code sent to <b className="text-brand-text">{contact}</b></p>
                        <input
                            type="text" placeholder="6-digit code"
                            className="w-full p-4 border border-brand-border text-center text-2xl tracking-widest bg-brand-ivory focus:outline-none focus:border-brand-green font-sans"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            onClick={handleVerify}
                            className="w-full bg-brand-green text-brand-ivory font-bold py-4 text-[13px] uppercase tracking-widest hover:bg-brand-green-dark transition-colors font-sans"
                        >
                            Verify &amp; Enter
                        </button>
                        <button onClick={() => setIsSent(false)} className="w-full text-sm text-brand-muted underline font-sans">
                            Change Email
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
