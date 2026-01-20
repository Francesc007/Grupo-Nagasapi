"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/mock-data";

export default function CategoryGrid({ colorTheme = "purple" }: { colorTheme?: "purple" | "green" }) {
  const primaryColor = colorTheme === "purple" ? "naga-purple" : "naga-green";

  return (
    <section className="py-24 bg-naga-cotton overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase italic">
              Nuestros <span className={`text-${primaryColor} underline decoration-naga-red/50`}>Lienzos</span>
            </h2>
            <p className="text-gray-600 max-w-lg font-medium">
              Selecciona el producto base. Nosotros nos encargamos de que tu diseño luzca espectacular con tecnología DTF de última generación.
            </p>
          </div>
          <Link href="/#productos" className={`text-${primaryColor} font-bold hover:underline transition-all uppercase tracking-widest text-sm`}>
            Ver todo el catálogo →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.id}>
              <Link
                href={cat.id === "playeras" ? "/chunchos" : "/bolsas"}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                  <p className={`text-${primaryColor} font-black text-xs uppercase tracking-[0.2em] mb-2`}>
                    {cat.description}
                  </p>
                  <h3 className="text-2xl font-black text-black mb-2 leading-none uppercase">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    {cat.examples}
                  </p>
                </div>
                
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-${primaryColor} text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-300 shadow-lg shadow-${primaryColor}/20`}>
                  <span className="font-black text-xl">+</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
