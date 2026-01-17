"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Info, CheckCircle2, ShieldCheck, Zap, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const SIZES = [
  { id: "2x2", name: '2" x 2"', price: 15, desc: "Etiquetas, logos pequeños" },
  { id: "4x4", name: '4" x 4"', price: 35, desc: "Pecho izquierdo, gorras" },
  { id: "8x8", name: '8" x 8"', price: 85, desc: "Diseños medianos, niños" },
  { id: "11x11", name: '11" x 11"', price: 145, desc: "Frente completo adulto" },
  { id: "12x17", name: '12" x 17"', price: 210, desc: "Oversized, espalda" },
  { id: "gang-sheet", name: "Gang Sheet (60cm x 100cm)", price: 650, desc: "Máximo ahorro, varios diseños" },
];

export default function PersonalizarPage() {
  const [selectedSize, setSelectedSize] = useState(SIZES[3]);
  const [quantity, setQuantity] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [isUploading, setIsScaping] = useState(false);
  const { addToCart } = useCart();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsScaping(true);
    // Simulación de carga
    setTimeout(() => {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsScaping(false);
    }, 1500);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddToCart = () => {
    if (uploadedFiles.length === 0) {
      alert("Por favor carga al menos un diseño.");
      return;
    }

    addToCart({
      id: Math.random(), // ID temporal
      name: `DTF Personalizado - ${selectedSize.name}`,
      price: selectedSize.price,
      color: "Personalizado",
      size: selectedSize.name,
      quantity: quantity,
      image: uploadedFiles[0].url,
    });
    alert("¡Diseño añadido al carrito!");
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Upload Area */}
            <div className="space-y-8">
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] p-12 text-center relative group hover:border-naga-green transition-all">
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={handleFileUpload}
                />
                
                <div className="space-y-6">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                    <Upload className="text-naga-green" size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-black uppercase mb-2">Arrastra tu diseño aquí</h3>
                    <p className="text-gray-500 font-medium italic">O haz clic para seleccionar archivos</p>
                  </div>
                  <div className="flex justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span className="bg-white px-3 py-1 rounded-full border border-gray-100">PNG Transparentes</span>
                    <span className="bg-white px-3 py-1 rounded-full border border-gray-100">300 DPI</span>
                    <span className="bg-white px-3 py-1 rounded-full border border-gray-100">RGB</span>
                  </div>
                </div>

                {isUploading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[3rem] flex items-center justify-center z-20"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-naga-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-black font-black uppercase tracking-tighter">Procesando arte...</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Uploaded Files List */}
              <AnimatePresence>
                {uploadedFiles.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-sm font-black text-black uppercase tracking-widest ml-2">Archivos listos ({uploadedFiles.length})</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {uploadedFiles.map((file, i) => (
                        <div key={i} className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                              <Image src={file.url} alt="Preview" fill className="object-cover" />
                            </div>
                            <span className="text-sm font-bold text-gray-700 truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <button 
                            onClick={() => removeFile(i)}
                            className="p-2 text-gray-400 hover:text-naga-red transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Guía */}
              <div className="bg-black rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-naga-green/10 blur-3xl rounded-full" />
                <h4 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
                  <Info className="text-naga-green" /> Requisitos del archivo
                </h4>
                <ul className="space-y-4 text-sm text-gray-400 font-medium">
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-naga-green shrink-0" size={18} />
                    Fondo transparente (sin recuadros blancos).
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-naga-green shrink-0" size={18} />
                    Grosor mínimo de líneas: 0.5pt para asegurar adherencia.
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="text-naga-green shrink-0" size={18} />
                    Evita sombras con baja opacidad o degradados a transparente.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Options */}
            <div className="space-y-10">
              <div>
                <h1 className="text-5xl font-black text-black uppercase tracking-tighter italic mb-4">
                  Configura tus <span className="text-naga-green">Transfers</span>
                </h1>
                <p className="text-gray-500 font-medium text-lg">
                  Elige el tamaño, carga tu diseño y nosotros nos encargamos del resto. Calidad Ninja garantizada.
                </p>
              </div>

              {/* Size Selector */}
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Selecciona el tamaño</label>
                <div className="grid grid-cols-2 gap-4">
                  {SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`p-6 rounded-3xl text-left border-2 transition-all ${
                        selectedSize.id === size.id 
                        ? "border-naga-green bg-naga-green/5 shadow-lg shadow-naga-green/10" 
                        : "border-gray-100 bg-white hover:border-gray-200"
                      }`}
                    >
                      <p className={`font-black uppercase mb-1 ${selectedSize.id === size.id ? "text-naga-green" : "text-black"}`}>
                        {size.name}
                      </p>
                      <p className="text-xs text-gray-500 font-bold mb-3">{size.desc}</p>
                      <p className="text-lg font-black text-black">${size.price} MXN</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Cantidad</label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-2">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-16 text-center text-xl font-black text-black">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="text-right flex-grow">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total estimado</p>
                    <p className="text-4xl font-black text-naga-green">${selectedSize.price * quantity} MXN</p>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white hover:bg-naga-green transition-all py-6 rounded-3xl font-black text-xl uppercase tracking-widest shadow-xl shadow-black/10 flex items-center justify-center gap-4"
              >
                <Zap size={24} className="fill-current" />
                Añadir al Carrito
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
                <div className="text-center space-y-2">
                  <ShieldCheck className="mx-auto text-naga-green" size={24} />
                  <p className="text-[10px] font-black text-gray-400 uppercase">Garantía Total</p>
                </div>
                <div className="text-center space-y-2">
                  <Zap className="mx-auto text-naga-green" size={24} />
                  <p className="text-[10px] font-black text-gray-400 uppercase">CDMX 24-48h</p>
                </div>
                <div className="text-center space-y-2">
                  <CheckCircle2 className="mx-auto text-naga-green" size={24} />
                  <p className="text-[10px] font-black text-gray-400 uppercase">Calidad Pro</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
