import { SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabaseClient = new SupabaseClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
);
