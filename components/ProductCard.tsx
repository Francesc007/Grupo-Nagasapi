"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ShoppingCart, Upload, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

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
      <div className="relative aspect-square overflow-hidden bg-gray-50">
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
            onClick={handleAddToCart}
            className={`w-full bg-${primaryColor} text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg`}
          >
            <ShoppingCart size={18} />
            + CARRITO
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col gap-4">
        <div>
          <h3 className="text-gray-800 font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className={`text-${primaryColor} font-black text-xl`}>${product.price} MXN</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className={`w-full bg-gray-50 border border-gray-100 text-[10px] text-gray-600 font-bold rounded-lg py-2 pl-3 pr-8 appearance-none focus:ring-1 focus:ring-${primaryColor} cursor-pointer uppercase tracking-wider`}
            >
              {product.colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className={`w-full bg-gray-50 border border-gray-100 text-[10px] text-gray-600 font-bold rounded-lg py-2 pl-3 pr-8 appearance-none focus:ring-1 focus:ring-${primaryColor} cursor-pointer uppercase tracking-wider`}
            >
              {product.sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Upload Sim */}
        <button className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-500 text-[10px] font-black py-2 rounded-lg flex items-center justify-center gap-2 transition-all uppercase tracking-widest">
          <Upload size={14} className={`text-${primaryColor}`} />
          Sube tu diseño
        </button>
      </div>
    </motion.div>
  );
}
