"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Menu, X, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import CartModal from "./CartModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

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
            <div className="relative w-12 h-12 overflow-hidden rounded-lg transition-transform group-hover:scale-110">
              <Image 
                src="/Logo.jpg" 
                alt="Nagasapi Logo" 
                fill 
                className="object-cover"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <div 
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button className={`flex items-center gap-1 font-bold transition-colors ${
                isScrolled ? "text-gray-700 hover:text-naga-green" : "text-white hover:text-naga-green"
              }`}>
                Categorías <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xl"
                  >
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/#${cat.id}`}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-naga-green hover:text-white transition-colors font-bold"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/#productos" className={`font-bold transition-colors ${
              isScrolled ? "text-gray-700 hover:text-naga-green" : "text-white hover:text-naga-green"
            }`}>
              Productos
            </Link>
            <Link href="/personalizar" className={`font-bold transition-colors ${
              isScrolled ? "text-gray-700 hover:text-naga-green" : "text-white hover:text-naga-green"
            }`}>
              Personalizar
            </Link>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <div className={`hidden sm:flex items-center rounded-full px-4 py-1.5 border transition-all ${
              isScrolled ? "bg-gray-100 border-gray-200 focus-within:border-naga-green" : "bg-white/10 border-white/10 focus-within:border-naga-green"
            }`}>
              <Search size={18} className={isScrolled ? "text-gray-400" : "text-gray-300"} />
              <input
                type="text"
                placeholder="Buscar..."
                className={`bg-transparent border-none focus:ring-0 text-sm placeholder-gray-500 w-32 lg:w-48 ml-2 ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              />
            </div>
            
            <Link href="/login" className={`transition-colors ${
              isScrolled ? "text-gray-700 hover:text-naga-green" : "text-white hover:text-naga-green"
            }`}>
              <User size={22} />
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative transition-colors ${
                isScrolled ? "text-gray-700 hover:text-naga-green" : "text-white hover:text-naga-green"
              }`}
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-naga-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <button className={isScrolled ? "md:hidden text-black" : "md:hidden text-white"} onClick={() => setIsOpen(!isOpen)}>
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
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/#${cat.id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-gray-800 hover:text-naga-green"
                  >
                    {cat.name}
                  </Link>
                ))}
                <Link
                  href="/personalizar"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-gray-800 hover:text-naga-green"
                >
                  Personalizar
                </Link>
                <hr className="border-gray-100" />
                <Link href="/login" className="text-naga-green font-bold text-lg">Iniciar Sesión</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
