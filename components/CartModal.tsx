"use client";
import React, { useState } from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "NAGA20") {
      setDiscount(subtotal * 0.2);
    } else {
      setDiscount(0);
    }
  };

  const total = subtotal - discount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-naga-green" />
                <h2 className="text-xl font-black text-black uppercase tracking-tighter">Tu Carrito</h2>
                <span className="bg-naga-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-gray-400 font-medium">Tu carrito está vacío</p>
                  <button
                    onClick={onClose}
                    className="text-naga-green font-bold hover:underline"
                  >
                    Explorar productos
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-black font-bold text-sm leading-tight">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id, item.color, item.size)}
                          className="text-gray-400 hover:text-naga-red transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-3">
                        {item.color} / {item.size}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                            className="p-1.5 text-gray-400 hover:text-black"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-black">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                            className="p-1.5 text-gray-400 hover:text-black"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-naga-green font-black">${item.price * item.quantity} MXN</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-6 bg-white/80 backdrop-blur-md">
                {/* Coupon */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cupón (NAGA20)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-grow bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm text-black focus:ring-1 focus:ring-naga-green"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-gray-100 hover:bg-gray-200 text-black font-bold px-4 py-2 rounded-xl text-xs uppercase"
                  >
                    Aplicar
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal} MXN</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-naga-green text-sm">
                      <span>Descuento (20%)</span>
                      <span>-${discount} MXN</span>
                    </div>
                  )}
                  <div className="flex justify-between text-black font-black text-xl pt-2">
                    <span>Total</span>
                    <span>${total} MXN</span>
                  </div>
                </div>

                <button className="w-full bg-naga-green hover:bg-black text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest shadow-lg shadow-naga-green/20">
                  <CreditCard size={20} />
                  Pagar Ahora
                </button>
                <p className="text-[10px] text-center text-gray-500 uppercase font-bold tracking-widest">
                  Checkout seguro con Stripe y Mercado Pago
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
