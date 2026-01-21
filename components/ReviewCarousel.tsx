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
    <section className="py-4 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-2">
          <h2 className="text-2xl md:text-3xl font-black text-black tracking-tighter uppercase italic leading-none">
            Lo que dicen <span className="text-naga-purple">nuestros clientes</span>
          </h2>
        </div>

        <div className="max-w-[450px] mx-auto relative">
          <div className="overflow-hidden min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-50 flex flex-row items-center gap-6 relative">
                  <div className="absolute top-4 right-6 opacity-10 text-naga-purple">
                    <Quote size={28} fill="currentColor" />
                  </div>

                  {/* Foto del Cliente */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border-2 border-naga-purple/10">
                    <Image 
                      src={REVIEWS[index].image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200"} 
                      alt={REVIEWS[index].name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-grow space-y-2 text-left">
                    <div className="flex justify-start gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < (REVIEWS[index].rating || 5) ? "text-naga-purple fill-naga-purple" : "text-gray-200"} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 font-medium leading-relaxed italic text-sm md:text-base">
                      "{REVIEWS[index].comment}"
                    </p>

                    <div>
                      <h4 className="text-base font-black text-black uppercase tracking-tight leading-none">
                        {REVIEWS[index].name}
                      </h4>
                      <p className="text-naga-purple font-bold uppercase text-[9px] tracking-[0.2em] mt-1">
                        {REVIEWS[index].location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === i ? "bg-naga-purple w-4" : "bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Ir a reseña ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
