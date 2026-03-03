'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/data';
import { supabase } from '@/lib/supabaseClient';

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

const CART_STORAGE_KEY = 'greenstory_cart';

function saveCartToStorage(items: CartItem[]) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
        console.error('Failed to save cart to localStorage');
    }
}

function loadCartFromStorage(): CartItem[] {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [user, setUser] = useState<any>(null);

    // Initialize: always load from localStorage first (instant), then sync with Supabase if logged in
    useEffect(() => {
        // Load localStorage immediately so cart is never empty on first render
        const localItems = loadCartFromStorage();
        if (localItems.length > 0) {
            setItems(localItems);
        }

        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                // Try to load from Supabase — but keep localStorage as fallback
                try {
                    const { data, error } = await supabase
                        .from('cart_items')
                        .select('product_id, quantity, product:products(id, name, price, image, category, description)')
                        .eq('user_id', currentUser.id);

                    if (data && !error && data.length > 0) {
                        const supabaseItems = data
                            .filter((row: any) => row.product)
                            .map((row: any) => ({
                                product: row.product as Product,
                                quantity: row.quantity,
                            }));
                        setItems(supabaseItems);
                        saveCartToStorage(supabaseItems); // Keep localStorage in sync
                    }
                    // If Supabase returns empty or errors, we keep whatever was in localStorage
                } catch (err) {
                    console.error('Failed to load cart from Supabase, using local cart', err);
                }
            }
            setIsInitialized(true);
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                // Load from Supabase on login
                supabase
                    .from('cart_items')
                    .select('product_id, quantity, product:products(id, name, price, image, category, description)')
                    .eq('user_id', currentUser.id)
                    .then(({ data }) => {
                        if (data && data.length > 0) {
                            const supabaseItems = data
                                .filter((row: any) => row.product)
                                .map((row: any) => ({
                                    product: row.product as Product,
                                    quantity: row.quantity,
                                }));
                            setItems(supabaseItems);
                            saveCartToStorage(supabaseItems);
                        }
                        // On login, if Supabase cart is empty, keep localStorage cart as-is
                    });
            }
            // Note: on logout we intentionally do NOT clear items — keep them in localStorage
            // so users don't lose their cart when they log out
        });

        return () => subscription.unsubscribe();
    }, []);

    // Always persist to localStorage whenever items change (after initialization)
    useEffect(() => {
        if (isInitialized) {
            saveCartToStorage(items);
        }
    }, [items, isInitialized]);

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
                .upsert(
                    { user_id: user.id, product_id: product.id, quantity: newQuantity },
                    { onConflict: 'user_id,product_id' }
                );
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
        saveCartToStorage([]);
        if (user) {
            await supabase.from('cart_items').delete().eq('user_id', user.id);
        }
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
