import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';

// GET /api/admin/orders — fetch all orders with items
export async function GET() {
    const { data, error } = await supabaseAdmin
        .from('orders')
        .select(`
            *,
            order_items (
                id,
                quantity,
                price_at_time,
                products ( name, image )
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

// PATCH /api/admin/orders — update order status by id
export async function PATCH(req: NextRequest) {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
        return NextResponse.json({ error: 'Order id and status are required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
        .from('orders')
        .update({ status })
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ success: true });
}
