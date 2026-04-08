'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ProductReviews({ productId }: { productId: string }) {
    const { addToast } = useToast();
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: "Verified Buyer",
            rating: 5,
            title: "Excellent formulation",
            content: "I have been using this for a few weeks and the results are amazing. Highly recommended for anyone looking for effective skincare.",
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            photos: [] as string[]
        }
    ]);

    const [newReview, setNewReview] = useState({ name: '', title: '', content: '', rating: 5, photos: [] as string[] });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReview.name || !newReview.title || !newReview.content) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setReviews([{
                id: Date.now(),
                ...newReview,
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            }, ...reviews]);
            setNewReview({ name: '', title: '', content: '', rating: 5, photos: [] });
            setIsSubmitting(false);
            setShowForm(false);
            addToast("Thank you for your review! ⭐", "success");
        }, 800);
    };

    return (
        <div className="mt-20 border-t border-brand-border-light pt-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter text-brand-text uppercase mb-2 text-center md:text-left">Customer Reviews</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex text-brand-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill="currentColor" />
                            ))}
                        </div>
                        <span className="text-[13px] font-bold tracking-widest uppercase text-brand-muted font-sans">5.0 Based on {reviews.length} Review{reviews.length > 1 ? 's' : ''}</span>
                    </div>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full md:w-auto bg-brand-green text-brand-ivory text-[11px] font-bold uppercase tracking-widest py-4 px-10 hover:bg-brand-green-dark transition-colors font-sans"
                    >
                        Write a Review
                    </button>
                )}
            </div>

            {/* Write a Review Form */}
            {showForm && (
                <div className="bg-brand-cream/30 border border-brand-border-light p-6 md:p-8 mb-12 animate-in slide-in-from-top-4">
                    <div className="flex justify-between items-center border-b border-brand-border-light pb-4 mb-6">
                        <h3 className="text-[13px] font-bold uppercase tracking-widest text-brand-text font-sans">Write your review</h3>
                        <button onClick={() => setShowForm(false)} className="text-[11px] font-bold text-brand-muted hover:text-brand-text uppercase tracking-widest font-sans">Cancel</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-widest mb-2 font-sans">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="text-brand-gold focus:outline-none"
                                    >
                                        <Star size={24} fill={star <= newReview.rating ? "currentColor" : "none"} strokeWidth={1} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-widest mb-2 font-sans">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    placeholder="Enter your name"
                                    className="w-full border border-brand-border p-4 text-[13px] focus:outline-none focus:border-brand-green bg-brand-ivory font-sans"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-widest mb-2 font-sans">Review Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newReview.title}
                                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                    placeholder="Give your review a title"
                                    className="w-full border border-brand-border p-4 text-[13px] focus:outline-none focus:border-brand-green bg-brand-ivory font-sans"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-widest mb-2 font-sans">Review</label>
                            <textarea
                                required
                                rows={4}
                                value={newReview.content}
                                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                                placeholder="Write your comments here"
                                className="w-full border border-brand-border p-4 text-[13px] focus:outline-none focus:border-brand-green bg-brand-ivory resize-none font-sans"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-brand-muted uppercase tracking-widest mb-2 font-sans">Upload Photos</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                    if (e.target.files) {
                                        const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
                                        setNewReview({ ...newReview, photos: [...newReview.photos, ...urls] });
                                    }
                                }}
                                className="w-full border border-brand-border p-4 text-[13px] focus:outline-none focus:border-brand-green bg-brand-ivory file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[11px] file:font-bold file:uppercase file:tracking-widest file:bg-brand-green file:text-brand-ivory hover:file:bg-brand-green-dark font-sans"
                            />
                            {newReview.photos.length > 0 && (
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    {newReview.photos.map((photo, idx) => (
                                        <div key={idx} className="relative w-20 h-20 bg-brand-cream border border-brand-border-light">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={photo} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-brand-green text-brand-ivory text-[11px] font-bold uppercase tracking-widest py-4 px-10 hover:bg-brand-green-dark transition-colors disabled:opacity-50 font-sans"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </div>
            )}

            {/* Individual Reviews */}
            <div className="space-y-8">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-brand-border-light pb-8 last:border-0 last:pb-0">
                        <div className="flex gap-1 text-brand-gold mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                            ))}
                        </div>
                        <h4 className="text-[14px] font-bold text-brand-text mb-2 leading-tight font-sans">&quot;{review.title}&quot;</h4>
                        <p className="text-[13px] text-brand-muted leading-relaxed font-medium mb-4 max-w-4xl font-sans">{review.content}</p>

                        {review.photos && review.photos.length > 0 && (
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {review.photos.map((photo, idx) => (
                                    <div key={idx} className="relative w-24 h-24 bg-brand-cream border border-brand-border-light cursor-pointer hover:opacity-80 transition-opacity">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={photo} alt={`Review photo ${idx}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest font-sans">
                            <span className="font-bold text-brand-text">{review.name}</span>
                            <span className="w-1 h-1 rounded-full bg-brand-border"></span>
                            <span className="text-brand-muted">{review.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
