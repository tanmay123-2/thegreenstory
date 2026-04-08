"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/context/ToastContext";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

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
            addToast("Error: " + error.message, "error");
        } else {
            addToast("Success! Check your email for a confirmation link.", "success");
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
        if (error) addToast("Error: " + error.message, "error");
    };

    return (
        <div className="bg-brand-cream min-h-[80vh] flex flex-col justify-center items-center py-24 px-6">
            <div className="bg-brand-ivory p-8 md:p-12 border border-brand-border-light w-full max-w-md shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">Create Account</h1>
                    <p className="text-[13px] text-brand-muted font-medium leading-relaxed font-sans">
                        Join The Green Story for exclusive access to our science-backed formulations.
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest font-sans">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-brand-border bg-brand-cream p-4 text-[13px] focus:outline-none focus:border-brand-green transition-colors font-sans"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest font-sans">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@email.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-brand-border bg-brand-cream p-4 text-[13px] focus:outline-none focus:border-brand-green transition-colors font-sans"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest font-sans">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-brand-border bg-brand-cream p-4 text-[13px] focus:outline-none focus:border-brand-green transition-colors font-sans"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-green text-brand-ivory py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-brand-green-dark transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed font-sans"
                    >
                        {loading ? "Creating Account..." : "Create My Account"}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-brand-border"></div>
                    <span className="px-4 text-brand-muted text-[10px] uppercase font-bold tracking-widest font-sans">or</span>
                    <div className="flex-1 border-t border-brand-border"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-brand-ivory text-brand-text font-bold py-4 text-[13px] uppercase tracking-widest border border-brand-border hover:bg-brand-cream transition-colors font-sans"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>

                <p className="mt-8 text-center text-[13px] font-medium text-brand-muted font-sans">
                    Already have an account?{' '}
                    <Link href="/login" className="text-brand-green font-bold uppercase tracking-widest text-[11px] border-b border-brand-green pb-0.5 hover:opacity-70 transition-opacity m-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
