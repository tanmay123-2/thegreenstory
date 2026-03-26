import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET /api/admin/wishlists — all wishlists with user email + product info
export async function GET() {
    const { data, error } = await supabaseAdmin
        .from('wishlists')
        .select(`
            id,
            user_id,
            created_at,
            products ( id, name, price, image, category )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
