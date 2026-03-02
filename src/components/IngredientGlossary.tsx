"use client";

import { useState } from 'react';
import { Beaker, ChevronDown, ChevronUp } from 'lucide-react';

const ingredientDatabase: Record<string, string> = {
    'Salicylic Acid': 'A beta hydroxy acid (BHA) that exfoliates the skin, unclogs pores, and reduces acne.',
    'Glycerin': 'A humectant that draws moisture into the skin, keeping it hydrated and soft.',
    'Sodium Hydroxide': 'Used in small amounts to balance the pH of skincare formulations.',
    '3-O-Ethyl Ascorbic Acid': 'A stable Vitamin C derivative that brightens dull skin and reduces pigmentation.',
    'Acetyl Glucosamine': 'An amino sugar that works synergistically with Vitamin C and Niacinamide to fade dark spots.',
    'Propanediol': 'A natural alternative to propylene glycol that increases the absorption of active ingredients.',
    'Niacinamide': 'Vitamin B3. Helps build keratin, strengthens the lipid barrier, and minimizes redness.',
    'Zinc PCA': 'Helps control the overproduction of sebum and has antibacterial properties.',
    'Pentylene Glycol': 'A skin-conditioning agent that also serves as a solvent and helps stabilize formulas.',
    'Panthenol (Vitamin B5)': 'A humectant that attracts and holds moisture, while also soothing irritated skin.',
    'Squalane': 'A lightweight, non-comedogenic oil that mimics skin\'s natural sebum to lock in moisture.',
    'Aqua': 'Purified water, serving as the solvent base for the formulation.'
};

export default function IngredientGlossary({ ingredients }: { ingredients: string[] }) {
    const [openIngredient, setOpenIngredient] = useState<string | null>(null);

    return (
        <div className="border border-brand-gray-dark/10 p-5 bg-brand-gray/50 text-brand-black flex flex-col gap-3">
            <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest text-brand-gray-dark border-b border-brand-gray-dark/10 pb-3">
                <Beaker size={16} strokeWidth={2} />
                <span>Interactive Ingredient Glossary</span>
            </div>

            <div className="mt-2 space-y-2">
                {ingredients.map((ingredient, idx) => {
                    const isOpen = openIngredient === ingredient;
                    const description = ingredientDatabase[ingredient] || 'A naturally derived component ensuring formula stability and efficacy.';

                    return (
                        <div key={idx} className="border border-brand-gray-dark/10 bg-brand-white">
                            <button
                                onClick={() => setOpenIngredient(isOpen ? null : ingredient)}
                                className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-brand-gray transition-colors"
                            >
                                <span className="text-[12px] font-bold font-mono tracking-tight">{ingredient}</span>
                                {isOpen ? <ChevronUp size={14} className="text-brand-gray-dark" /> : <ChevronDown size={14} className="text-brand-gray-dark" />}
                            </button>
                            {isOpen && (
                                <div className="px-4 pb-4 pt-1 text-[13px] text-brand-gray-dark font-medium leading-relaxed border-t border-brand-gray-dark/5">
                                    {description}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="text-[10px] text-brand-gray-dark uppercase tracking-widest mt-2 text-center">Tap an ingredient to learn more</p>
        </div>
    );
}
