import { supabase } from './supabase';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  category: string;
  collection?: string;
  discount?: number;
  stock?: number;
  type?: string;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
  created_at?: string;
}

export async function getProducts(options?: { 
  category?: string; 
  collection?: string;
  search?: string;
}) {
  let query = supabase
    .from('products')
    .select('*');

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.collection) {
    query = query.eq('collection', options.collection);
  }

  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,category.ilike.%${options.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as Product[];
}

export async function getProductById(id: string | number) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data as Product;
}
