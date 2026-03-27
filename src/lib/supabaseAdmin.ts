// Server-only Supabase client using the service role key.
// This bypasses RLS and must NEVER be imported in client components.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// We provide a fallback string here solely so the Next.js build process
// doesn't crash when it collects page data. It will fail gracefully later
// if the real key isn't provided in Netlify's environment variables.
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'MISSING_SERVICE_ROLE_KEY_IN_NETLIFY';

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
