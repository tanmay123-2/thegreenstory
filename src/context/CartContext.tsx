'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/data';
import { supabase } from '@/lib/supabaseClient';
import { products as allProducts } from '@/lib/data';

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [user, setUser] = useState<any>(null);

    // 1. Initialize Auth and Load Cart
    useEffect(() => {
        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                // Load from Supabase
                const { data, error } = await supabase
                    .from('cart_items')
                    .select('*')
                    .eq('user_id', currentUser.id);

                if (data && !error) {
                    const supabaseItems = data.map(row => {
                        const prod = allProducts.find(p => p.id === row.product_id);
                        return prod ? { product: prod, quantity: row.quantity } : null;
                    }).filter(Boolean) as CartItem[];
                    setItems(supabaseItems);
                }
            } else {
                // Load from LocalStorage
                const savedCart = localStorage.getItem('greenstory_cart');
                if (savedCart) {
                    try {
                        setItems(JSON.parse(savedCart));
                    } catch (e) {
                        console.error('Failed to parse local cart');
                    }
                }
            }
            setIsInitialized(true);
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            // Re-fetch cart on auth state change (login/logout)
            if (currentUser) {
                supabase.from('cart_items').select('*').eq('user_id', currentUser.id).then(({ data }) => {
                    if (data) {
                        const supabaseItems = data.map(row => {
                            const prod = allProducts.find(p => p.id === row.product_id);
                            return prod ? { product: prod, quantity: row.quantity } : null;
                        }).filter(Boolean) as CartItem[];
                        setItems(supabaseItems);
                    }
                });
            } else {
                setItems([]); // Clear state on logout
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // 2. Save to LocalStorage if NOT logged in
    useEffect(() => {
        if (isInitialized && !user) {
            localStorage.setItem('greenstory_cart', JSON.stringify(items));
        }
    }, [items, isInitialized, user]);

    // Actions
    const addItem = async (product: Product, quantity = 1) => {
        let newQuantity = quantity;

        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.product.id === product.id);

            if (existingItem) {
                newQuantity = existingItem.quantity + quantity;
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }

            return [...currentItems, { product, quantity }];
        });

        if (user) {
            await supabase
                .from('cart_items')
                .upsert({ user_id: user.id, product_id: product.id, quantity: newQuantity }, { onConflict: 'user_id,product_id' });
        }

        setIsCartOpen(true);
    };

    const removeItem = async (productId: string) => {
        setItems((current) => current.filter((item) => item.product.id !== productId));
        if (user) {
            await supabase.from('cart_items').delete().eq('user_id', user.id).eq('product_id', productId);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((current) =>
            current.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
        if (user) {
            await supabase.from('cart_items').update({ quantity }).eq('user_id', user.id).eq('product_id', productId);
        }
    };

    const clearCart = async () => {
        setItems([]);
        if (user) {
            await supabase.from('cart_items').delete().eq('user_id', user.id);
        } else {
            localStorage.removeItem('greenstory_cart');
        }
    }

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
                clearCart,
                isCartOpen,
                setIsCartOpen,
                cartTotal,
                itemCount,
            }}
        >
            {isInitialized ? children : null}
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
