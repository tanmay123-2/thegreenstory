// This is where you can write the supabase client code.
// The file is ready!
import { createClient } from '@supabase/supabase-js';

// These lines are "magnets"—they pull the data from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);