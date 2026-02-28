export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    concerns: string[];
    ingredients: string[];
}

export const products: Product[] = [
    {
        id: "p1",
        name: "Salicylic Acid 02%",
        description: "A potent BHA exfoliant that penetrates deep into pores to dissolve dead skin cells, clear congestion, and minimize blemishes.",
        price: 599,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
        category: "Face Serum",
        concerns: ["Acne Control", "Oiliness", "Pore Minimizing"],
        ingredients: ["Aqua", "Salicylic Acid", "Glycerin", "Sodium Hydroxide"]
    },
    {
        id: "p2",
        name: "Vitamin C 10% + AG 1%",
        description: "A highly stable and effective Vitamin C serum formulated to brighten uneven skin tone, reduce dullness, and provide antioxidant protection.",
        price: 699,
        image: "https://images.unsplash.com/photo-1608248593801-49e0c156f2f2?auto=format&fit=crop&q=80&w=800",
        category: "Face Serum",
        concerns: ["Uneven Tone", "Dullness", "Anti-aging"],
        ingredients: ["Aqua", "3-O-Ethyl Ascorbic Acid", "Acetyl Glucosamine", "Propanediol"]
    },
    {
        id: "p3",
        name: "Niacinamide 10%",
        description: "A soothing and strengthening serum that regulates sebum production, reduces redness, and fortifies the skin barrier.",
        price: 599,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
        category: "Face Serum",
        concerns: ["Oiliness", "Barrier Repair", "Redness"],
        ingredients: ["Aqua", "Niacinamide", "Zinc PCA", "Pentylene Glycol"]
    },
    {
        id: "p4",
        name: "Vitamin B5 10% Moisturizer",
        description: "An ultra-hydrating, non-comedogenic gel moisturizer that locks in moisture, calms inflammation, and plumps the skin.",
        price: 349,
        image: "https://images.unsplash.com/photo-1615397323136-2cd3818e3dd5?auto=format&fit=crop&q=80&w=800",
        category: "Moisturizer",
        concerns: ["Dryness", "Barrier Repair"],
        ingredients: ["Aqua", "Panthenol (Vitamin B5)", "Squalane", "Glycerin"]
    }
];
