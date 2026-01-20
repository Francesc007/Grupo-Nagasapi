"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CreditCard, Lock, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular proceso de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setIsPaid(true);
    clearCart();
  };

  if (isPaid) {
    return (
      <main className="min-h-screen bg-naga-cotton">
        <Navbar />
        <div className="pt-40 pb-20 container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-lg w-full space-y-6"
          >
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={60} />
            </div>
            <h1 className="text-4xl font-black uppercase italic">¡Pago Confirmado!</h1>
            <p className="text-gray-600 font-medium">
              Tu pedido ha sido procesado con éxito. Recibirás un correo con los detalles de tu compra en breve.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-naga-purple text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"
            >
              Volver al inicio
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-naga-cotton">
      <Navbar />
      
      <div className="pt-40 pb-24 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Formulario de Pago */}
          <div className="flex-grow space-y-8">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-naga-purple/10 text-naga-purple rounded-2xl flex items-center justify-center">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-3xl font-black uppercase italic">Detalles de Pago</h2>
              </div>

              <form onSubmit={handlePay} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Nombre en la tarjeta</label>
                    <input required type="text" placeholder="JUAN PEREZ" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-black focus:border-naga-purple focus:ring-1 focus:ring-naga-purple outline-none transition-all font-bold uppercase" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Número de tarjeta</label>
                    <div className="relative">
                      <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-black focus:border-naga-purple focus:ring-1 focus:ring-naga-purple outline-none transition-all font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Fecha de vencimiento</label>
                    <input required type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-black focus:border-naga-purple focus:ring-1 focus:ring-naga-purple outline-none transition-all font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">CVC</label>
                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input required type="password" placeholder="***" maxLength={3} className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-black focus:border-naga-purple focus:ring-1 focus:ring-naga-purple outline-none transition-all font-bold" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <button 
                    type="submit"
                    disabled={loading || cart.length === 0}
                    className="w-full bg-naga-purple text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all uppercase tracking-[0.2em] shadow-xl shadow-naga-purple/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Pagar ${subtotal} MXN</>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-naga-purple" />
                <span className="text-[10px] font-black uppercase tracking-widest">Pago 100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-naga-purple font-black">
                <Image src="/Logo 1.png" alt="Nagasapi" width={100} height={30} className="opacity-50 grayscale" />
              </div>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
              <h3 className="text-xl font-black uppercase italic mb-6 border-b pb-4">Resumen</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-black leading-tight">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase font-black">{item.color} / {item.size}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs font-medium text-gray-500">Cant: {item.quantity}</span>
                        <span className="text-sm font-black text-naga-purple">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>${subtotal} MXN</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Envío</span>
                  <span className="text-naga-purple">GRATIS</span>
                </div>
                <div className="flex justify-between text-black font-black text-2xl pt-2 border-t">
                  <span>Total</span>
                  <span>${subtotal} MXN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
