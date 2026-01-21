"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ShoppingCart, Upload, ChevronDown, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

import Link from "next/link";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    type: string;
    images: string[];
    colors: string[];
    sizes: string[];
    description: string;
  };
  colorTheme?: "purple" | "green" | "brown";
}

const COLOR_MAP: Record<string, string> = {
  "Negro": "#000000",
  "Blanco": "#FFFFFF",
  "Café": "#4B3621",
  "Azul": "#1E40AF",
  "Rojo": "#FF1744",
  "Gris": "#9CA3AF",
  "Natural": "#F5F0E6",
  "Multicolor": "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
};

export default function ProductCard({ product, colorTheme = "purple" }: ProductProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const primaryColor = colorTheme === "purple" ? "naga-purple" : colorTheme === "green" ? "naga-green" : "naga-brown";

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      image: product.images[0],
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/producto/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-110`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent opacity-60" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.type === "premium" && (
            <span className={`bg-${primaryColor} text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg`}>
              Premium
            </span>
          )}
        </div>

        {/* Quick Add Overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/20 to-transparent`}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
            className={`w-full bg-${primaryColor} text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg`}
          >
            <ShoppingCart size={18} />
            + CARRITO
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col gap-4">
        <Link href={`/producto/${product.id}`} className="hover:opacity-70 transition-opacity">
          <h3 className="text-gray-800 font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className={`text-${primaryColor} font-black text-xl`}>${product.price} MXN</p>
        </Link>

        {/* Color Bubbles */}
        <div className="space-y-2">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Color: <span className="text-gray-900">{selectedColor}</span></p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                  selectedColor === c ? "border-naga-purple scale-110 shadow-sm" : "border-transparent hover:scale-105"
                }`}
                title={c}
                style={{ 
                  background: COLOR_MAP[c] || "#CCCCCC",
                  border: selectedColor === c ? `2px solid ${COLOR_MAP[c] === '#FFFFFF' ? '#E5E7EB' : '#000000'}` : '2px solid transparent'
                }}
              >
                {selectedColor === c && (
                  <Check size={12} className={c === "Blanco" || c === "Natural" ? "text-black" : "text-white"} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="relative">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Talla</p>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                  selectedSize === s 
                    ? `bg-${primaryColor} border-${primaryColor} text-white shadow-sm` 
                    : "bg-gray-50 border-gray-100 text-gray-600 hover:border-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Sim */}
        <button className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-500 text-[10px] font-black py-2 rounded-lg flex items-center justify-center gap-2 transition-all uppercase tracking-widest mt-auto">
          <Upload size={14} className={`text-${primaryColor}`} />
          Sube tu diseño
        </button>
      </div>
    </motion.div>
  );
}
