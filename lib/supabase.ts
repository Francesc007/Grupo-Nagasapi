import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase credentials are missing. Check your .env.local file.");
}

// Para uso en Client Components
export const supabase = createBrowserClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Mantenemos createClient solo para compatibilidad si fuera necesario, 
// pero recomendamos usar supabase (browser client)
export const getSupabaseClient = () => supabase;

export const getSiteUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // En el servidor, intentamos usar la variable de entorno o regresamos vacío 
  // para que otros métodos (como los de Next.js) manejen la URL base
  return process.env.NEXT_PUBLIC_SITE_URL || "";
};
