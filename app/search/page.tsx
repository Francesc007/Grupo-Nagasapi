"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts, Product } from "@/lib/products";
import { motion } from "framer-motion";
import { Search, PackageX, Loader2 } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      const results = await getProducts({ search: query });
      setProducts(results);
      setLoading(false);
    }
    if (query) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tight flex items-center gap-4">
          <Search size={40} className="text-naga-purple" />
          Resultados para: <span className="text-naga-purple">"{query}"</span>
        </h1>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-4">
          {products.length} productos encontrados
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 size={48} className="text-naga-purple animate-spin" />
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Buscando tesoros...</p>
        </div>
      ) : products.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mb-24"
        >
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              colorTheme={product.category === 'bolsas' ? 'green' : 'purple'} 
            />
          ))}
        </motion.div>
      ) : (
        <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm mb-24">
          <PackageX size={64} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-2xl font-black uppercase italic mb-4">No encontramos lo que buscas</h2>
          <p className="text-gray-500 max-w-md mx-auto font-medium">
            Intenta con palabras más generales como "bolsas", "playeras" o revisa si hay algún error de dedo.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-48 pb-20">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 size={48} className="text-naga-purple animate-spin" />
          </div>
        }>
          <SearchResults />
        </Suspense>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
