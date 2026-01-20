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
    <section className="py-16 bg-naga-cotton border-y border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 p-10 opacity-[0.03]">
        <Quote size={120} className="text-naga-purple" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tighter uppercase mb-2 italic">
            Lo que dicen <span className="text-naga-purple">nuestros clientes</span>
          </h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} className="text-naga-purple fill-naga-purple" />
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="overflow-hidden min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center space-y-6"
              >
                <p className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed italic">
                  "{REVIEWS[index].comment}"
                </p>
                <div>
                  <h4 className="text-lg font-black text-naga-purple uppercase tracking-widest">
                    {REVIEWS[index].name}
                  </h4>
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">
                    Cliente {REVIEWS[index].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-naga-purple hover:text-white hover:border-naga-purple transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-naga-purple hover:text-white hover:border-naga-purple transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
