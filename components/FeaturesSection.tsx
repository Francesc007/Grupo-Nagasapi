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

interface FeaturesSectionProps {
  colorTheme?: "purple" | "green";
  showFeatures?: boolean;
  showProcess?: boolean;
}

export default function FeaturesSection({ 
  colorTheme = "purple", 
  showFeatures = true, 
  showProcess = true 
}: FeaturesSectionProps) {
  const primaryColorClass = colorTheme === "purple" ? "naga-purple" : "naga-green";
  const primaryBorderClass = colorTheme === "purple" ? "hover:border-naga-purple" : "hover:border-naga-green";
  const primaryBgHoverClass = colorTheme === "purple" ? "group-hover:bg-naga-purple" : "group-hover:bg-naga-green";
  const primaryTextClass = colorTheme === "purple" ? "text-naga-purple" : "text-naga-green";

  const features = [
    {
      title: "Calidad inigualable",
      desc: "Obtenga una calidad inigualable en cada transferencia DTF con materiales de primera calidad y artesanía experta.",
      icon: <CheckCircle2 size={22} />
    },
    {
      title: "Sin mínimos",
      desc: "Ordene exactamente lo que necesita sin cantidad mínima requerida para ninguna compra.",
      icon: <Layers size={22} />
    },
    {
      title: "Envío súper rápido",
      desc: "Reciba sus pedidos rápidamente con nuestro servicio de envío y entrega confiable y súper rápido.",
      icon: <Zap size={22} />
    },
    {
      title: "Gama de colores vibrantes",
      desc: "Disfrute de colores vivos y detalles nítidos con nuestra amplia gama de colores en cada transferencia.",
      icon: <Palette size={22} />
    },
    {
      title: "Aplicación fácil",
      desc: "Aplique transferencias sin esfuerzo con nuestro sencillo proceso de presionar y despegar para obtener resultados perfectos.",
      icon: <MousePointer2 size={22} />
    },
    {
      title: "Máxima Resistencia",
      desc: "Nuestros transfers resisten el desgaste y los lavados, manteniendo su calidad y vibrancia en el tiempo.",
      icon: <ShieldCheck size={22} />
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className={`py-16 ${showFeatures ? 'bg-naga-cotton' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {showFeatures && (
          <div className="mb-24">
            {/* Title */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-black tracking-tighter uppercase italic">
                El líder en <span className={`${primaryTextClass}`}>transferencias DTF</span> personalizadas
              </h2>
            </div>

            {/* Features Grid */}
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className={`p-6 rounded-2xl bg-white border-2 border-transparent hover:border-${primaryColorClass} hover:shadow-xl hover:shadow-${primaryColorClass}/5 transition-all group shadow-sm flex flex-col items-center text-center`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 shadow-sm ${primaryBgHoverClass} group-hover:text-white transition-all duration-300 ${primaryTextClass}`}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-black text-black mb-2 uppercase tracking-tight">{f.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {showProcess && (
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden shadow-xl">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-${primaryColorClass}/5 blur-[100px] rounded-full`} />
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tighter mb-2">
                  El proceso <span className={`${primaryTextClass}`}>Nagasapi</span>
                </h3>
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">
                  Más rápido. Más sencillo. Satisfacción garantizada.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${primaryColorClass} flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-${primaryColorClass}/20`}>
                    <Upload size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-black mb-3 uppercase leading-tight">Cargue sus diseños y haga su pedido en línea</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      Utilice diseños con colores ilimitados, ilustraciones simples o con muchos detalles. Cargue cualquier diseño que desee y lo convertiremos en una transferencia directa a película de alta calidad.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left"
                >
                  <div className="w-14 h-14 rounded-2xl bg-naga-red flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-naga-red/20">
                    <Send size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-black mb-3 uppercase leading-tight">Imprimimos tus transferencias y las enviamos en 24-48 horas</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      Realizamos su transferencia utilizando nuestro exclusivo proceso de transferencia DTF. Creando la transferencia directa a película más detallada, de mayor calidad y a todo color que puedas encontrar.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
