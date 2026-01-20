"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import CartModal from "./CartModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const isBolsasActive = pathname === "/bolsas";
  const isHomeActive = pathname === "/";
  const isChunchosActive = pathname === "/chunchos";
  const isDesignActive = pathname === "/sube-tu-diseno";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md py-2 border-b border-gray-100 shadow-sm" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-80 h-28 transition-transform group-hover:scale-105">
              <Image 
                src="/Logo 1.png" 
                alt="Nagasapi Logo" 
                fill 
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/chunchos" className={`font-bold transition-colors px-4 py-2 rounded-full ${
              isChunchosActive
                ? "bg-naga-brown text-white shadow-lg shadow-naga-brown/20"
                : isScrolled ? "text-gray-700 hover:text-naga-brown" : "text-black hover:text-naga-brown"
            }`}>
              Chunchos
            </Link>
            <Link href="/bolsas" className={`font-bold transition-colors px-4 py-2 rounded-full ${
              isBolsasActive 
                ? "bg-naga-green text-white shadow-lg shadow-naga-green/20" 
                : isScrolled ? "text-gray-700 hover:text-naga-green" : "text-black hover:text-naga-green"
            }`}>
              La Pinche Bolsa
            </Link>
            <Link href="/sube-tu-diseno" className={`font-bold transition-colors px-4 py-2 rounded-full ${
              isScrolled ? "text-gray-700 hover:text-naga-purple" : "text-black hover:text-naga-purple"
            }`}>
              Sube tu diseño
            </Link>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <div className={`hidden sm:flex items-center rounded-full px-4 py-1.5 border transition-all ${
              isScrolled ? "bg-gray-100 border-gray-200 focus-within:border-naga-green" : "bg-black/5 border-black/10 focus-within:border-naga-green"
            }`}>
              <Search size={18} className={isScrolled ? "text-gray-400" : "text-gray-500"} />
              <input
                type="text"
                placeholder="Buscar..."
                className={`bg-transparent border-none focus:ring-0 text-sm placeholder-gray-500 w-32 lg:w-48 ml-2 ${
                  isScrolled ? "text-black" : "text-black"
                }`}
              />
            </div>
            
            <Link href="/login" className={`transition-colors ${
              isScrolled ? "text-gray-700 hover:text-naga-green" : "text-black hover:text-naga-green"
            }`}>
              <User size={22} />
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative transition-colors ${
                isScrolled ? "text-gray-700 hover:text-naga-green" : "text-black hover:text-naga-green"
              }`}
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-naga-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <button className={isScrolled ? "md:hidden text-black" : "md:hidden text-black"} onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                <Link
                  href="/chunchos"
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold px-4 py-2 rounded-xl transition-all ${
                    isChunchosActive ? "bg-naga-brown text-white shadow-lg" : "text-gray-800 hover:text-naga-brown"
                  }`}
                >
                  Chunchos
                </Link>
                <Link
                  href="/bolsas"
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold px-4 py-2 rounded-xl transition-all ${
                    isBolsasActive ? "bg-naga-green text-white shadow-lg" : "text-gray-800 hover:text-naga-green"
                  }`}
                >
                  La Pinche Bolsa
                </Link>
                <Link
                  href="/sube-tu-diseno"
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold px-4 py-2 rounded-xl transition-all ${
                    isDesignActive ? "text-naga-purple" : "text-gray-800 hover:text-naga-purple"
                  }`}
                >
                  Sube tu diseño
                </Link>
                <hr className="border-gray-100" />
                <Link href="/login" className="text-naga-purple font-bold text-lg">Iniciar Sesión</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
