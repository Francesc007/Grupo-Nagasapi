"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Chrome, ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-naga-cotton flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-naga-green/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-naga-red/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 transition-transform">
              <Image src="/Logo 1.png" alt="Logo" fill className="object-contain" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">
            {isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta"}
          </h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">
            {isLogin ? "Accede a tus pedidos y diseños" : "Empieza a personalizar tus productos"}
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-black focus:border-naga-green focus:ring-1 focus:ring-naga-green outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-black focus:border-naga-green focus:ring-1 focus:ring-naga-green outline-none transition-all font-medium"
              />
            </div>
          </div>

          <button className="w-full bg-naga-green text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all uppercase tracking-widest mt-4 shadow-lg shadow-naga-green/20">
            {isLogin ? "Entrar" : "Registrarse"}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase font-bold tracking-[0.2em]">
            <span className="bg-white px-4 text-gray-400">O continúa con</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 py-4 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
            <Chrome size={20} className="text-gray-700" />
            <span className="text-gray-700 font-bold text-sm">Google</span>
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-naga-green font-bold hover:underline"
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </motion.div>
    </main>
  );
}
