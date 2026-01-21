"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbulb, Printer, Briefcase, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import FeaturesSection from "@/components/FeaturesSection";
import ReviewCarousel from "@/components/ReviewCarousel";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Nosotros - Ahora Página Principal */}
      <section className="relative min-h-screen flex items-center pt-20 lg:pt-32 overflow-hidden bg-naga-cotton">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-naga-purple/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-naga-red/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-black text-black leading-[1.1] tracking-tighter">
              Nada genérico. <span className="text-naga-purple">Nada al azar.</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl leading-relaxed font-medium">
              Transformamos conceptos en merch, bolsas y promocionales que se usan, se ven y representan a tu marca.
            </p>
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-[560px] w-full mt-12 lg:mt-5 group">
            {/* Main Mockup Placeholder */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl bg-white p-4">
              <Image
                src="/Un Cafecito.webp"
                alt="Un Cafecito"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-150 rounded-[2rem] scale-125"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent opacity-40" />
            </div>

            {/* Secondary Mockups - Elemento Flotante */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-10 -right-10 w-44 h-44 bg-black border border-white/10 rounded-[2rem] p-3 shadow-2xl hidden xl:block"
            >
              <div className="relative w-full h-full rounded-[1.2rem] overflow-hidden">
                <Image
                  src="/Logo.jpg"
                  alt="Logo Secundario"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight italic">
                ¿QUÉ <span className="text-naga-purple text-6xl">HACEMOS?</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Diseñamos y producimos merch, bolsas y productos promocionales para marcas, bandas y proyectos que quieren diferenciarse.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                Unimos creatividad, impresión y producción en un solo lugar para que tu idea no se diluya en el proceso.
              </p>
            </div>
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-gradient-to-br from-naga-purple/5 to-naga-red/5">
              <Image 
                src="/dtf.jpg" 
                alt="Impresión DTF Nagasapi" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-naga-purple/90 backdrop-blur-sm px-5 py-2.5 rounded-xl border border-white/20">
                <p className="text-white font-black uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                  <Zap size={14} className="text-yellow-300" />
                  Impresión DTF de Alta Definición
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection colorTheme="purple" showProcess={false} />

      {/* Soluciones */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-naga-purple uppercase tracking-[0.3em] mb-4">Nuestras Soluciones</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight">Acompañamos tu proyecto <br/> de principio a fin</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Merchandising personalizado",
                desc: "Ropa y artículos para proyectos creativos, bandas y marcas.",
                icon: <Briefcase size={32} />,
                img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500"
              },
              {
                title: "Impresión DTF",
                desc: "Producción interna, alta calidad y tirajes flexibles.",
                icon: <Printer size={32} />,
                img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=500"
              },
              {
                title: "Productos promocionales",
                desc: "Funcionales y bien diseñados para empresas que buscan presencia real.",
                icon: <Lightbulb size={32} />,
                img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500"
              }
            ].map((sol, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
                  <Image src={sol.img} alt={sol.title} fill className="object-cover transition-all duration-500 scale-110 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent opacity-40" />
                </div>
                <div className="text-naga-purple mb-4">{sol.icon}</div>
                <h4 className="text-xl font-black text-black uppercase mb-4">{sol.title}</h4>
                <p className="text-gray-500 font-medium">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas del Grupo */}
      <section className="py-24 bg-naga-cotton">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight italic mb-6">Explora nuestras <span className="text-naga-purple">marcas</span></h2>
            <p className="text-gray-600 text-lg font-medium">Grupo Nagasapi reúne marcas con enfoques distintos y una misma forma de trabajar: diseño con intención y producción bien hecha.</p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {[
              {
                name: "Chunchos",
                desc: "Nuestra línea de playeras con tecnología DTF de alta definición. Diseños que se sienten y se ven increíbles.",
                img: "/El_Grito.webp",
                link: "/chunchos",
                reverse: false
              },
              {
                name: "La Pinche Bolsa",
                desc: "Bolsas personalizadas y colecciones propias con carácter, diseño y funcionalidad.",
                img: "/México Mágico.png",
                link: "/bolsas",
                reverse: true
              }
            ].map((brand, i) => (
              <div key={i} className={`flex flex-col ${brand.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center group`}>
                <div className="w-full lg:w-1/2 aspect-[16/9] relative rounded-[2.5rem] overflow-hidden shadow-xl">
                  <Image src={brand.img} alt={brand.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent opacity-40" />
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <h4 className="text-4xl font-black text-black uppercase">{brand.name}</h4>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">{brand.desc}</p>
                  <Link href={brand.link} className="inline-flex items-center gap-3 bg-naga-purple text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black transition-all group shadow-lg shadow-naga-purple/20">
                    Explorar Marca <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewCarousel />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
