"use client";
import React, { useState, useEffect } from "react";
import { REVIEWS } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
    <section className="py-24 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 p-20 opacity-[0.03]">
        <Quote size={200} className="text-naga-green" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase mb-4 italic">
            Lo que dicen <span className="text-naga-green">nuestros clientes</span>
          </h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={20} className="text-naga-green fill-naga-green" />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center space-y-8"
              >
                <p className="text-2xl md:text-3xl font-medium text-gray-700 leading-relaxed italic">
                  "{REVIEWS[index].comment}"
                </p>
                <div>
                  <h4 className="text-xl font-black text-naga-green uppercase tracking-widest">
                    {REVIEWS[index].name}
                  </h4>
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">
                    Cliente {REVIEWS[index].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-naga-green hover:text-white hover:border-naga-green transition-all shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-naga-green hover:text-white hover:border-naga-green transition-all shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
