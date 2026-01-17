"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/mock-data";

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase italic">
              Nuestros <span className="text-naga-green underline decoration-naga-red/50">Lienzos</span>
            </h2>
            <p className="text-gray-600 max-w-lg font-medium">
              Selecciona el producto base. Nosotros nos encargamos de que tu diseño luzca espectacular con tecnología DTF de última generación.
            </p>
          </div>
          <Link href="/#productos" className="text-naga-green font-bold hover:underline transition-all uppercase tracking-widest text-sm">
            Ver todo el catálogo →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/#${cat.id}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 border border-white/5"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                  <p className="text-naga-green font-black text-xs uppercase tracking-[0.2em] mb-2">
                    {cat.description}
                  </p>
                  <h3 className="text-2xl font-black text-white mb-2 leading-none uppercase">
                    {cat.name}
                  </h3>
                  <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {cat.examples}
                  </p>
                </div>
                
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-naga-green text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-300">
                  <span className="font-black text-xl">+</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
