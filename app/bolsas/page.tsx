"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts, Product } from "@/lib/products";
import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, Zap, ShieldCheck, ShoppingBag, MessageCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function LaPincheBolsaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts({ category: "bolsas" });
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const bolsasProducts = products.slice(0, 5);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Promo Bar */}
      <div className="bg-green-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-[0.2em] fixed top-[112px] w-full z-40">
        En la compra mínima de $1,199 el envío es GRATIS
      </div>

      {/* Hero La Pinche Bolsa */}
      <section className="pt-48 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full border border-green-100 text-xs font-black uppercase tracking-widest">
                <Zap size={14} className="fill-current" />
                Envío Gratis CDMX {">"} $500 MXN
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-black leading-[0.9] tracking-tighter uppercase italic">
                LA PINCHE <span className="text-green-600">BOLSA</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl font-medium leading-relaxed">
                Nuestra colección es un lienzo andante lleno de colores y creatividad. Desde el caos hermoso de las calles de la CDMX hasta el encanto de sus barrios.
              </p>
              <div className="flex gap-4">
                <Link href="#productos" className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl flex items-center gap-2 group">
                  Explora catálogo
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
            <div className="relative aspect-square lg:h-[500px] group">
              <div className="absolute inset-0 bg-green-50 rounded-[3rem] -rotate-3" />
              <Image 
                src="/bolsa.png"
                alt="La Pinche Bolsa"
                fill
                className="object-cover rounded-[3rem] shadow-2xl rotate-3 transition-transform group-hover:rotate-0 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent rounded-[3rem] opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-black text-black uppercase mb-8 italic">Nuestra Historia</h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            En un mundo donde el consumismo y el desecho dominan, nos sumamos a la búsqueda de una solución sostenible. Así nació en el 2022 <span className="text-green-600 font-black">La Pinche Bolsa</span>, una marca que combina diseños atemporales con responsabilidad medioambiental.
          </p>
        </div>
      </section>

      {/* Servicios/Colecciones */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-green-600 uppercase tracking-[0.3em] mb-4">Conoce nuestros servicios</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight italic">Estilo y sustentabilidad <br/> para cada necesidad</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Eventos Sociales",
                desc: "Ideales para bodas, XV años y cumpleaños. Algodón de alta calidad y materiales sostenibles.",
                icon: <Heart className="text-green-600" />
              },
              {
                title: "Corporativos y Marcas",
                desc: "Potencia tu marca con logotipos y colores corporativos. Refuerza tu visibilidad.",
                icon: <Zap className="text-naga-green" />
              },
              {
                title: "Empaques Textiles",
                desc: "Diseño y producción de empaques para proteger tus productos de manera elegante.",
                icon: <ShoppingBag className="text-black" />
              }
            ].map((serv, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center group">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {serv.icon}
                </div>
                <h4 className="text-xl font-black text-black uppercase mb-4">{serv.title}</h4>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{serv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modelos Favoritos (Grid de Productos) */}
      <section id="productos" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase italic">
                Los <span className="text-green-600">Favoritos</span>
              </h2>
              <p className="text-gray-600 max-w-lg font-medium">
                Diseños icónicos impresos en DTF full color sobre loneta premium.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mb-16">
            {loading ? (
              <div className="col-span-full py-12 flex justify-center">
                <Loader2 size={32} className="text-naga-green animate-spin" />
              </div>
            ) : bolsasProducts.length > 0 ? (
              bolsasProducts.map((product) => (
                <ProductCard key={product.id} product={product} colorTheme="green" />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">Cargando colección eco-friendly...</p>
            )}
          </div>
        </div>
      </section>

      {/* Ribbon: Clientes */}
      <section className="py-8 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Marcas que confían en nosotros</p>
          
          <div className="relative flex overflow-hidden">
            <motion.div
              className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {/* Double the array for seamless loop */}
              {[...Array(2)].map((_, outerIndex) => (
                <React.Fragment key={outerIndex}>
                  {[
                    { name: "Alba", img: "/Alba.png" },
                    { name: "Harper Collins", img: "/Harper Collins.png" },
                    { name: "Mide", img: "/Mide.png" },
                    { name: "Trillas", img: "/Trillas.png" },
                    { name: "Inver Medik", img: "/Inver medik.png" }
                  ].map((client, i) => (
                    <div key={`${outerIndex}-${i}`} className="relative w-32 h-12 flex-shrink-0 transition-all duration-500 cursor-pointer">
                      <Image
                        src={client.img}
                        alt={client.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ / Info */}
      <section className="py-24 bg-naga-cotton">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-black uppercase italic">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              {[
                { q: "¿Qué materiales utilizan?", a: "Utilizamos materiales sostenibles como algodón lona y loneta garantizando alta calidad y durabilidad." },
                { q: "¿Puedo personalizar mi bolsa?", a: "Sí, ofrecemos opciones de personalización desde logotipos hasta mensajes especiales en técnica DTF full color." },
                { q: "¿Tienen un pedido mínimo?", a: "Para paquetes personalizados el mínimo es de 50 piezas." },
                { q: "¿Cuál es el tiempo de entrega?", a: "Nuestro tiempo de producción y envío estándar es de 10 días hábiles." }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h4 className="font-black text-black uppercase text-sm mb-2">{faq.q}</h4>
                  <p className="text-gray-500 text-sm font-medium">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-green-600 rounded-[3rem] p-12 text-white space-y-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black uppercase mb-4 italic">¿Tienes dudas antes de comprar?</h3>
              <p className="text-white/80 font-medium mb-8">Te ayudamos a resolver todas tus dudas antes de iniciar tu compra.</p>
              <a href="https://wa.me/525530447291" className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
                <MessageCircle size={20} /> Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
