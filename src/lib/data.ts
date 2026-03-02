import { supabase } from '@/lib/supabaseClient';

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

export const products: Product[] = [];

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error loading products from Supabase:', error);
        return [];
    }

    return data as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
    console.log(`[getProductById] Invoked with ID: "${id}"`);
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`[getProductById] Supabase Error for ${id}:`, error);
        return null;
    }

    console.log(`[getProductById] Success: found ${data.name}`);
    return data as Product;
}
