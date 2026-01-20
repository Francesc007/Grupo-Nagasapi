"use client";
import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/mock-data";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search } from "lucide-react";

export default function ProductGrid({ colorTheme = "purple" }: { colorTheme?: "purple" | "green" }) {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [activeType, setActiveType] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const primaryColor = colorTheme === "purple" ? "naga-purple" : "naga-green";

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "todos" || p.category === activeCategory;
      const matchType = activeType === "todos" || p.type === activeType;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchType && matchSearch;
    });
  }, [activeCategory, activeType, searchQuery]);

  return (
    <section id="productos" className="py-24 bg-naga-cotton">
      <div className="container mx-auto px-4">
        {/* Header & Filters */}
        <div className="flex flex-col gap-12 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <h2 className="text-5xl font-black text-black tracking-tighter uppercase italic">
              Catálogo <span className={`text-${primaryColor}`}>Completo</span>
            </h2>
            
            {/* Search */}
            <div className={`w-full md:w-96 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 focus-within:border-${primaryColor}/50 transition-all shadow-sm`}>
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Busca tu producto..."
                className="bg-transparent border-none focus:ring-0 text-black placeholder-gray-400 w-full ml-3 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-y border-gray-200 py-6">
            <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em] mr-4">
              <Filter size={16} />
              Filtrar por:
            </div>
            
            {/* Category Filter */}
            <div className="flex bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
              {["todos", "playeras", "bolsas"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
                    activeCategory === cat ? `bg-${primaryColor} text-white shadow-md shadow-${primaryColor}/20` : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {cat === "playeras" ? "chunchos" : cat}
                </button>
              ))}
            </div>

            <div className="h-8 w-[1px] bg-gray-200 hidden lg:block mx-2" />

            {/* Type Filter */}
            <div className="flex bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
              {["todos", "estándar", "premium"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
                    activeType === type ? "bg-naga-red text-white shadow-md shadow-naga-red/20" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} colorTheme={colorTheme} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-xl font-medium">No encontramos productos con esos filtros.</p>
            <button 
              onClick={() => { setActiveCategory("todos"); setActiveType("todos"); setSearchQuery(""); }}
              className={`mt-4 text-${primaryColor} font-bold hover:underline`}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
