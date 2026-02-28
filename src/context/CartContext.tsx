'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/lib/data';

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addItem = (product: Product, quantity = 1) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.product.id === product.id);

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...currentItems, { product, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (productId: string) => {
        setItems((current) => current.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((current) =>
            current.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const cartTotal = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                isCartOpen,
                setIsCartOpen,
                cartTotal,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
