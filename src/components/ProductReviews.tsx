'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function ProductReviews({ productId }: { productId: string }) {
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
        // Simulate API call
        setTimeout(() => {
            setReviews([{
                id: Date.now(),
                ...newReview,
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            }, ...reviews]);
            setNewReview({ name: '', title: '', content: '', rating: 5, photos: [] });
            setIsSubmitting(false);
            setShowForm(false);
            alert("Thank you for your review!");
        }, 800);
    };

    return (
        <div className="mt-20 border-t border-brand-gray-dark/10 pt-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter text-brand-black uppercase mb-2 text-center md:text-left">Customer Reviews</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex text-brand-black">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill="currentColor" />
                            ))}
                        </div>
                        <span className="text-[13px] font-bold tracking-widest uppercase text-brand-gray-dark">5.0 Based on {reviews.length} Review{reviews.length > 1 ? 's' : ''}</span>
                    </div>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full md:w-auto bg-brand-black text-brand-white text-[11px] font-bold uppercase tracking-widest py-4 px-10 hover:bg-brand-gray-dark transition-colors"
                    >
                        Write a Review
                    </button>
                )}
            </div>

            {/* Write a Review Form */}
            {showForm && (
                <div className="bg-brand-gray/30 border border-brand-gray-dark/10 p-6 md:p-8 mb-12 animate-in slide-in-from-top-4">
                    <div className="flex justify-between items-center border-b border-brand-gray-dark/10 pb-4 mb-6">
                        <h3 className="text-[13px] font-bold uppercase tracking-widest text-brand-black">Write your review</h3>
                        <button onClick={() => setShowForm(false)} className="text-[11px] font-bold text-brand-gray-dark hover:text-brand-black uppercase tracking-widest">Cancel</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-bold text-brand-gray-dark uppercase tracking-widest mb-2">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="text-brand-black focus:outline-none"
                                    >
                                        <Star size={24} fill={star <= newReview.rating ? "currentColor" : "none"} strokeWidth={1} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[11px] font-bold text-brand-gray-dark uppercase tracking-widest mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    placeholder="Enter your name"
                                    className="w-full border border-brand-gray-dark/20 p-4 text-[13px] focus:outline-none focus:border-brand-black bg-brand-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-brand-gray-dark uppercase tracking-widest mb-2">Review Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newReview.title}
                                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                    placeholder="Give your review a title"
                                    className="w-full border border-brand-gray-dark/20 p-4 text-[13px] focus:outline-none focus:border-brand-black bg-brand-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-brand-gray-dark uppercase tracking-widest mb-2">Review</label>
                            <textarea
                                required
                                rows={4}
                                value={newReview.content}
                                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                                placeholder="Write your comments here"
                                className="w-full border border-brand-gray-dark/20 p-4 text-[13px] focus:outline-none focus:border-brand-black bg-brand-white resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-brand-gray-dark uppercase tracking-widest mb-2">Upload Photos</label>
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
                                className="w-full border border-brand-gray-dark/20 p-4 text-[13px] focus:outline-none focus:border-brand-black bg-brand-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[11px] file:font-bold file:uppercase file:tracking-widest file:bg-brand-black file:text-brand-white hover:file:border-brand-gray-dark"
                            />
                            {newReview.photos.length > 0 && (
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    {newReview.photos.map((photo, idx) => (
                                        <div key={idx} className="relative w-20 h-20 bg-brand-gray border border-brand-gray-dark/10">
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
                            className="bg-brand-black text-brand-white text-[11px] font-bold uppercase tracking-widest py-4 px-10 hover:bg-brand-gray-dark transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </div>
            )}

            {/* Individual Reviews */}
            <div className="space-y-8">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-brand-gray-dark/10 pb-8 last:border-0 last:pb-0">
                        <div className="flex gap-1 text-brand-black mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                            ))}
                        </div>
                        <h4 className="text-[14px] font-bold text-brand-black mb-2 leading-tight">"{review.title}"</h4>
                        <p className="text-[13px] text-brand-gray-dark leading-relaxed font-medium mb-4 max-w-4xl">{review.content}</p>

                        {review.photos && review.photos.length > 0 && (
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {review.photos.map((photo, idx) => (
                                    <div key={idx} className="relative w-24 h-24 bg-brand-gray border border-brand-gray-dark/10 cursor-pointer hover:opacity-80 transition-opacity">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={photo} alt={`Review photo ${idx}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest">
                            <span className="font-bold text-brand-black">{review.name}</span>
                            <span className="w-1 h-1 rounded-full bg-brand-gray-dark/30"></span>
                            <span className="text-brand-gray-dark">{review.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
