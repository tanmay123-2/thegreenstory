import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET /api/admin/products — fetch all products
export async function GET() {
    const { data, error } = await supabaseAdmin
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

// PATCH /api/admin/products — update a product by id
export async function PATCH(req: NextRequest) {
    const body = await req.json();
    const { id, name, description, price, category } = body;

    if (!id) {
        return NextResponse.json({ error: 'Product id is required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
        .from('products')
        .update({ name, description, price: Number(price), category })
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
}
