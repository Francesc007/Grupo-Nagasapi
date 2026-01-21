"use client";
import React from "react";
import { BarChart3 } from "lucide-react";

export default function MetricsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="p-6 bg-white/5 rounded-full text-naga-purple">
        <BarChart3 size={48} />
      </div>
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter italic">Análisis Avanzado</h1>
        <p className="text-gray-500 max-w-md mt-2">Estamos procesando los datos detallados de tus ventas. Muy pronto podrás ver reportes profundos aquí.</p>
      </div>
    </div>
  );
}
