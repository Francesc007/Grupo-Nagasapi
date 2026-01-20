"use client";
import React, { useState, useEffect } from "react";
import { REVIEWS } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % REVIEWS.length);
  const prev = () => setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <section className="py-12 bg-naga-cotton border-y border-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-black tracking-tighter uppercase italic leading-none">
            Lo que dicen <span className="text-naga-purple">nuestros clientes</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="overflow-hidden min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-50 flex flex-col md:flex-row items-center gap-6 md:gap-8 relative">
                  <div className="absolute top-4 right-6 opacity-10 text-naga-purple">
                    <Quote size={40} fill="currentColor" />
                  </div>

                  {/* Foto del Cliente */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border-2 border-naga-purple/10">
                    <Image 
                      src={REVIEWS[index].image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200"} 
                      alt={REVIEWS[index].name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-grow space-y-3 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < (REVIEWS[index].rating || 5) ? "text-naga-purple fill-naga-purple" : "text-gray-200"} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 font-medium leading-relaxed italic text-sm md:text-base">
                      "{REVIEWS[index].comment}"
                    </p>

                    <div>
                      <h4 className="text-base font-black text-black uppercase tracking-tight">
                        {REVIEWS[index].name}
                      </h4>
                      <p className="text-naga-purple font-bold uppercase text-[9px] tracking-[0.2em]">
                        Cliente {REVIEWS[index].location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-naga-purple hover:border-naga-purple transition-all shadow-md group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-naga-purple hover:border-naga-purple transition-all shadow-md group"
            >
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
