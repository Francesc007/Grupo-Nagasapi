"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Layers, 
  Zap, 
  Palette, 
  MousePointer2, 
  ShieldCheck,
  Upload,
  Send
} from "lucide-react";

const features = [
  {
    title: "Calidad inigualable",
    desc: "Obtenga una calidad inigualable en cada transferencia DTF con materiales de primera calidad y artesanía experta.",
    icon: <CheckCircle2 className="text-naga-green" size={24} />
  },
  {
    title: "Sin mínimos",
    desc: "Ordene exactamente lo que necesita sin cantidad mínima requerida para ninguna compra.",
    icon: <Layers className="text-naga-green" size={24} />
  },
  {
    title: "Envío súper rápido",
    desc: "Reciba sus pedidos rápidamente con nuestro servicio de envío y entrega confiable y súper rápido.",
    icon: <Zap className="text-naga-green" size={24} />
  },
  {
    title: "Gama de colores vibrantes",
    desc: "Disfrute de colores vivos y detalles nítidos con nuestra amplia gama de colores en cada transferencia.",
    icon: <Palette className="text-naga-green" size={24} />
  },
  {
    title: "Aplicación fácil",
    desc: "Aplique transferencias sin esfuerzo con nuestro sencillo proceso de presionar y despegar para obtener resultados perfectos.",
    icon: <MousePointer2 className="text-naga-green" size={24} />
  },
  {
    title: "Durabilidad duradera",
    desc: "Nuestros transfers resisten el desgaste y los lavados, manteniendo su calidad en el tiempo.",
    icon: <ShieldCheck className="text-naga-green" size={24} />
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase italic"
          >
            El líder en <span className="text-naga-green">transferencias DTF</span> personalizadas
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-naga-green/30 transition-all group shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-naga-green group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-black mb-4 uppercase tracking-tight">{f.title}</h3>
              <p className="text-gray-600 font-medium leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-black rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-naga-green/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
                El proceso <span className="text-naga-green">Nagasapi</span>
              </h3>
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">
                Más rápido. Más sencillo. Satisfacción garantizada.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-naga-green flex-shrink-0 flex items-center justify-center text-white">
                  <Upload size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-4 uppercase">Cargue sus diseños y haga su pedido en línea</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Utilice diseños con colores ilimitados, ilustraciones simples o con muchos detalles. Cargue cualquier diseño que desee y lo convertiremos en una transferencia directa a película de alta calidad.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-naga-red flex-shrink-0 flex items-center justify-center text-white">
                  <Send size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-4 uppercase">Imprimimos tus transferencias y las enviamos en 24-48 horas</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Realizamos su transferencia utilizando nuestro exclusivo proceso de transferencia DTF. Creando la transferencia directa a película más detallada, de mayor calidad y a todo color que puedas encontrar.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
