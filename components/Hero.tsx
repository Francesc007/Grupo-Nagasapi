"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, CheckCircle, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-32 overflow-hidden bg-black">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-naga-green/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-naga-red/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-naga-green/10 text-naga-green px-4 py-2 rounded-full border border-naga-green/20 text-sm font-bold tracking-wide uppercase">
            <Zap size={14} className="fill-current" />
            Envío Gratis CDMX {">"} $500 MXN
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
            Nada genérico. <span className="text-naga-green">Nada al azar.</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
            Transformamos conceptos en merch, bolsas y promocionales que se usan, se ven y representan a tu marca.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/#productos"
              className="bg-naga-green hover:bg-white text-black font-black px-8 py-5 rounded-xl flex items-center justify-center gap-2 transition-all group text-lg uppercase"
            >
              Explora Catálogo
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-square lg:aspect-auto lg:h-[620px] w-full mt-12 lg:mt-20"
        >
          {/* Main Mockup Placeholder */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop"
              alt="DTF Mockup"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>

          {/* Secondary Mockups */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-12 -right-12 w-48 h-48 bg-neutral-900 border border-white/10 rounded-2xl p-2 shadow-2xl hidden xl:block"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400"
                alt="Tote Mockup"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
