import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET /api/admin/carts — all cart items with user_id and product info
export async function GET() {
    const { data, error } = await supabaseAdmin
        .from('cart_items')
        .select(`
            id,
            user_id,
            quantity,
            created_at,
            products ( id, name, price, image, category )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
