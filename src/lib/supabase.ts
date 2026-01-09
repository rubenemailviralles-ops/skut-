import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: 'hats' | 'shades' | 'shirts' | 'tops' | 'pants' | 'bags' | 'socks';
  gender: 'male' | 'female' | 'unisex';
  price: number;
  image_url: string | null;
  theme: 'industrial' | 'psytrance' | 'detroit' | 'all' | null;
  stock_quantity: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
