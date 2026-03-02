"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });

        if (error) {
            alert("Error: " + error.message);
        } else {
            alert("Success! Check your email for a confirmation link.");
        }
        setLoading(false);
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
        if (error) alert("Error: " + error.message);
    };

    return (
        <div className="bg-brand-gray min-h-[80vh] flex flex-col justify-center items-center py-24 px-6">
            <div className="bg-brand-white p-8 md:p-12 border border-brand-gray-dark/10 w-full max-w-md shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">Create Account</h1>
                    <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed">
                        Join The Green Story for exclusive access to our science-backed formulations.
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-brand-gray-dark/20 bg-brand-gray p-4 text-[13px] focus:outline-none focus:border-brand-black transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@email.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-brand-gray-dark/20 bg-brand-gray p-4 text-[13px] focus:outline-none focus:border-brand-black transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-brand-gray-dark/20 bg-brand-gray p-4 text-[13px] focus:outline-none focus:border-brand-black transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-black text-brand-white py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-brand-gray-dark transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Create My Account"}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-brand-gray-dark/20"></div>
                    <span className="px-4 text-brand-gray-dark text-[10px] uppercase font-bold tracking-widest">or</span>
                    <div className="flex-1 border-t border-brand-gray-dark/20"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-brand-white text-brand-black font-bold py-4 text-[13px] uppercase tracking-widest rounded-none border border-brand-gray-dark/20 hover:bg-brand-gray transition-colors"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>

                <p className="mt-8 text-center text-[13px] font-medium text-brand-gray-dark">
                    Already have an account?{' '}
                    <Link href="/login" className="text-brand-black font-bold uppercase tracking-widest text-[11px] border-b border-brand-black pb-0.5 hover:opacity-70 transition-opacity m-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
