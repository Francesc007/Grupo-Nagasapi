"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Upload, Star, ChevronLeft, ChevronRight, CheckCircle2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const carouselImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
  "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800",
];

const reviews = [
  { name: "Mariana S.", text: "Subí mi logo y el resultado en DTF fue increíble. Los colores son súper vivos.", stars: 5 },
  { name: "Roberto D.", text: "Muy fácil de usar la plataforma. El envío llegó en menos de 48 horas.", stars: 5 },
  { name: "Elena G.", text: "La calidad de la impresión superó mis expectativas. ¡Recomendado!", stars: 5 },
];

import FeaturesSection from "@/components/FeaturesSection";

export default function SubeTuDisenoPage() {
  const [currentImg, setCurrentImg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % carouselImages.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 bg-naga-cotton overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-black/5 text-black px-4 py-2 rounded-full border border-black/10 text-xs font-black uppercase tracking-widest">
                <Zap size={14} className="fill-current" />
                Transferencias DTF en 24h
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-black leading-[0.9] tracking-tighter uppercase italic">
                SUBE TU <span className="text-black">DISEÑO</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed">
                Envíanos tu archivo y nosotros lo convertimos en la mejor transferencia DTF del mercado. Calidad garantizada para tu marca o proyecto.
              </p>
            </div>
            <div className="w-full lg:w-1/2 group">
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-gray-100 p-4">
                <Image 
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000" 
                  alt="Ejemplo DTF" 
                  fill 
                  className="object-cover rounded-[2.5rem] transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent rounded-[2.5rem] opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload & Content Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left side: Upload area */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div 
                className={`relative border-4 border-dashed rounded-[3rem] p-16 flex flex-col items-center justify-center text-center transition-all ${
                  isDragging ? "border-black bg-gray-50" : "border-gray-100 bg-gray-50"
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
              >
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-8">
                  <Upload size={48} className="text-black" />
                </div>
                <h3 className="text-3xl font-black text-black uppercase mb-4">Arrastra tu archivo aquí</h3>
                <p className="text-gray-500 font-medium mb-10 max-w-sm">Formatos aceptados: PNG, AI, PSD, PDF (300 DPI recomendado)</p>
                <button className="bg-black text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-naga-purple transition-all shadow-xl text-lg">
                  Seleccionar Archivo
                </button>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Sin mínimos de compra",
                  "Revisión técnica gratis",
                  "Colores vibrantes",
                  "Tacto suave e imperceptible"
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <CheckCircle2 className="text-black" />
                    <span className="text-sm font-black text-gray-700 uppercase tracking-tight">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Carousel & Reviews */}
            <div className="w-full lg:w-1/2 space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-xs font-black text-black uppercase tracking-[0.3em] mb-4">Inspiración</h2>
                    <h3 className="text-3xl font-black text-black uppercase tracking-tight italic">Galería de trabajos</h3>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={prevImg} className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"><ChevronLeft size={24}/></button>
                    <button onClick={nextImg} className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"><ChevronRight size={24}/></button>
                  </div>
                </div>
                <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 border border-gray-100 group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImg}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full relative"
                    >
                      <Image src={carouselImages[currentImg]} alt="Galería Nagasapi" fill className="object-cover transition-all duration-700 scale-110 group-hover:scale-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-black uppercase tracking-tight italic mb-6">Lo que dicen nuestros clientes</h3>
                {reviews.map((rev, i) => (
                  <div key={i} className="p-8 bg-gray-50 border border-gray-100 rounded-[2rem] shadow-sm flex flex-col gap-3 group hover:shadow-lg transition-all">
                    <div className="flex text-black gap-1">
                      {[...Array(rev.stars)].map((_, s) => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-600 text-lg font-medium leading-relaxed italic">"{rev.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-[2px] bg-black" />
                      <span className="text-black font-black text-sm uppercase tracking-widest">{rev.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <FeaturesSection colorTheme="purple" showFeatures={false} showProcess={true} />

      <Footer />
    </main>
  );
}
