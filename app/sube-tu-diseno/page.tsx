"use client";
import React, { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Upload, Star, ChevronLeft, ChevronRight, CheckCircle2, Zap, ShieldCheck, Palette, MousePointer2, Layers } from "lucide-react";
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
import ReviewCarousel from "@/components/ReviewCarousel";

export default function SubeTuDisenoPage() {
  const [currentImg, setCurrentImg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % carouselImages.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNotification(`Archivo seleccionado: ${file.name}`);
      setTimeout(() => setNotification(null), 5000);
      // Aquí se implementaría la lógica de subida
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setNotification(`Archivo soltado: ${file.name}`);
      setTimeout(() => setNotification(null), 5000);
      // Aquí se implementaría la lógica de subida
    }
  };

  const specs = [
    { title: "Sin mínimos de compra", icon: <Layers size={24} />, color: "bg-blue-50 text-blue-600" },
    { title: "Revisión técnica gratis", icon: <ShieldCheck size={24} />, color: "bg-green-50 text-green-600" },
    { title: "Colores vibrantes", icon: <Palette size={24} />, color: "bg-purple-50 text-purple-600" },
    { title: "Tacto suave e imperceptible", icon: <MousePointer2 size={24} />, color: "bg-orange-50 text-orange-600" }
  ];

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
        <div className="container mx-auto px-4 space-y-16">
          {/* Main Title for both boxes */}
          <div className="text-center">
            <h2 className="text-[15px] font-black text-naga-purple uppercase tracking-[0.05em] mb-2">Inspiración y Diseño</h2>
            <h3 className="text-4xl font-black text-black uppercase tracking-tight italic leading-none">Galería de tus ideas</h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
            
            {/* Left side: Upload area */}
            <div className="w-full max-w-sm">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".png,.ai,.psd,.pdf"
                aria-label="Seleccionar archivo de diseño"
              />
              <div 
                className={`relative aspect-square border-4 border-dashed rounded-[3rem] p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                  isDragging ? "border-naga-purple bg-purple-50/50" : "border-gray-100 bg-gray-50 hover:bg-gray-100/50 hover:border-gray-200"
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={handleFileClick}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Upload size={32} className="text-black group-hover:text-naga-purple transition-colors" />
                </div>
                <h3 className="text-xl font-black text-black uppercase mb-2 tracking-tighter">Arrastra tu archivo aquí</h3>
                <p className="text-gray-400 text-[10px] font-medium mb-8 max-w-[180px] uppercase tracking-wider">PNG, AI, PSD, PDF (300 DPI)</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleFileClick(); }}
                  className="bg-black text-white px-10 py-3 rounded-xl font-black uppercase tracking-widest hover:bg-naga-purple transition-all shadow-xl text-xs hover:scale-105 active:scale-95"
                >
                  Seleccionar Archivo
                </button>
              </div>
            </div>

            {/* Right side: Carousel */}
            <div className="w-full max-w-sm">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 border border-gray-100 group">
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

                {/* Arrows inside the gallery - Always visible or on hover */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-10">
                  <button 
                    onClick={prevImg} 
                    aria-label="Ver imagen anterior" 
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-lg hover:scale-110 active:scale-90"
                  >
                    <ChevronLeft size={20}/>
                  </button>
                  <button 
                    onClick={nextImg} 
                    aria-label="Ver siguiente imagen" 
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-lg hover:scale-110 active:scale-90"
                  >
                    <ChevronRight size={20}/>
                  </button>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Ejemplos Reales</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specs - Full Width Below */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {specs.map((spec, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-4 p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:bg-white hover:border-naga-purple/20 transition-all group"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500 ${spec.color}`}>
                  {React.cloneElement(spec.icon as React.ReactElement<any>, { size: 28 })}
                </div>
                <span className="text-xs font-black text-gray-800 uppercase tracking-widest leading-tight">{spec.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection colorTheme="purple" showFeatures={false} showProcess={true} />
      
      <ReviewCarousel />

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50 px-8 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl flex items-center gap-4"
          >
            <CheckCircle2 size={18} className="text-naga-purple" />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
