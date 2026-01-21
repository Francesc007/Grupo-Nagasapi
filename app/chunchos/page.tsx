"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts, Product } from "@/lib/products";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, MapPin, Palette, Zap, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ChunchosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts({ category: "playeras" });
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const cafecitoProducts = products.filter(p => p.collection === "cafecito");
  const cdmxProducts = products.filter(p => p.collection === "cdmx");
  const arteProducts = products.filter(p => p.collection === "arte");

  return (
    <main className="min-h-screen bg-background text-naga-brown">
      <Navbar />
      
      {/* Promo Bar */}
      <div className="bg-naga-brown text-white py-2 text-center text-[10px] font-black uppercase tracking-[0.2em] fixed top-[112px] w-full z-40">
        ¡Nuevos diseños de temporada! Envíos a todo México
      </div>

      {/* Hero Chunchos */}
      <section className="pt-48 pb-20 overflow-hidden bg-naga-cotton">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-stone-100 text-naga-brown px-4 py-2 rounded-full border border-stone-200 text-xs font-black uppercase tracking-widest">
                <Zap size={14} className="fill-current" />
                Envío Gratis CDMX {">"} $500 MXN
              </div>
              <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase italic">
                <span className="text-naga-brown">CHUN</span><span className="text-naga-red">CHOS</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed">
                Diseños con intención. Conciencia, propósito y estrategia en cada prenda. Descubre nuestra colección de playeras premium con impresión DTF de alta definición.
              </p>
              <div className="flex gap-4">
                <Link href="#colecciones" className="bg-naga-brown text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center gap-2 group">
                  Explora catálogo
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
            <div className="relative aspect-square lg:h-[500px] group">
              <div className="absolute inset-0 bg-stone-100 rounded-[3rem] -rotate-3" />
              <Image 
                src="/Un Cafecito.webp"
                alt="Chunchos Collection"
                fill
                className="object-cover rounded-[3rem] shadow-2xl rotate-3 transition-transform group-hover:rotate-0 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent rounded-[3rem] opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Colección: Un Cafecito pa' llevar */}
      <section id="colecciones" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-naga-brown">
              <Coffee size={24} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic leading-none">Un cafecito pa' llevar</h2>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Nuestros favoritos de barra</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {loading ? (
              <div className="col-span-full py-12 flex justify-center">
                <Loader2 size={32} className="text-naga-brown animate-spin" />
              </div>
            ) : cafecitoProducts.length > 0 ? (
              cafecitoProducts.map((product) => (
                <ProductCard key={product.id} product={product} colorTheme="brown" />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">No hay productos en esta colección</p>
            )}
          </div>
        </div>
      </section>

      {/* Sección: Ciudad de México */}
      <section className="py-24 bg-naga-cotton">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-naga-brown shadow-sm">
              <MapPin size={24} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic leading-none">Ciudad de México</h2>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">El alma de las calles en tu piel</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {loading ? (
              <div className="col-span-full py-12 flex justify-center">
                <Loader2 size={32} className="text-naga-brown animate-spin" />
              </div>
            ) : cdmxProducts.length > 0 ? (
              cdmxProducts.map((product) => (
                <ProductCard key={product.id} product={product} colorTheme="brown" />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">Próximamente más diseños</p>
            )}
          </div>
        </div>
      </section>

      {/* Sección: Arte */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-naga-brown">
              <Palette size={24} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic leading-none">Colección de Arte</h2>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Clásicos reinterpretados</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {loading ? (
              <div className="col-span-full py-12 flex justify-center">
                <Loader2 size={32} className="text-naga-brown animate-spin" />
              </div>
            ) : arteProducts.length > 0 ? (
              arteProducts.map((product) => (
                <ProductCard key={product.id} product={product} colorTheme="brown" />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">Colección en desarrollo</p>
            )}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-24 bg-naga-brown text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-[0.9]">Somos fans, también aliados.</h2>
            <p className="text-xl text-white/80 font-medium leading-relaxed">
              Además de ser cómplices de nuestros creadores de contenido favoritos con nuestra #MerchOficial, queremos ser parte de tus sueños y proyectos. Realizamos impresión de DTF por metro de alta calidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sube-tu-diseno" className="bg-white text-naga-brown px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">
                Impresión por Metro
              </Link>
              <a href="https://wa.me/525530447291" className="border-2 border-white/20 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Cotizar Proyecto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Hecho con amor", desc: "Cada Chuncho se elabora bajo pedido con dedicación para ti.", icon: <Zap className="text-naga-red" /> },
              { title: "Diseños con intención", desc: "Conciencia, propósito y estrategia en cada trazo.", icon: <Palette className="text-naga-brown" /> },
              { title: "Calidad Premium", desc: "Personas reales creando grandes productos textiles.", icon: <ShoppingBag className="text-naga-brown" /> }
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center">
                  {badge.icon}
                </div>
                <h4 className="text-lg font-black uppercase">{badge.title}</h4>
                <p className="text-sm text-gray-500 font-medium">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
