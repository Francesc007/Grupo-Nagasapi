import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, RotateCcw, ShieldCheck, Mail } from "lucide-react";

export default function PoliticasPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-6xl font-black text-black uppercase tracking-tighter italic mb-12">
            Políticas de <span className="text-naga-green">Servicio</span>
          </h1>

          <div className="space-y-16">
            {/* Shipping */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-naga-green">
                <Truck size={32} />
                <h2 className="text-2xl font-black uppercase tracking-wider">Envíos y Entregas</h2>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl text-gray-600 leading-relaxed space-y-4 font-medium shadow-sm">
                <p>
                  En <strong>Grupo Nagasapi</strong>, sabemos que la rapidez es clave. Ofrecemos envíos gratuitos en la Ciudad de México (CDMX) en compras superiores a <span className="text-black font-black">$500 MXN</span>.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Tiempo de entrega estimado: 24 a 48 horas hábiles.</li>
                  <li>Envíos nacionales vía FedEx o DHL (costo calculado en checkout).</li>
                  <li>Recolección en punto de venta disponible sin costo.</li>
                </ul>
              </div>
            </section>

            {/* Returns */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-naga-red">
                <RotateCcw size={32} />
                <h2 className="text-2xl font-black uppercase tracking-wider">Devoluciones</h2>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl text-gray-600 leading-relaxed space-y-4 font-medium shadow-sm">
                <p>
                  Debido a la naturaleza personalizada de nuestros productos (DTF), las devoluciones solo aplican en los siguientes casos:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Defectos de fábrica en la prenda o el transfer.</li>
                  <li>Error en el diseño respecto a lo aprobado por el cliente.</li>
                  <li>Producto dañado durante el transporte.</li>
                </ul>
                <p>
                  Tienes un plazo de <strong>7 días naturales</strong> tras recibir tu pedido para reportar cualquier incidencia.
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-blue-600">
                <ShieldCheck size={32} />
                <h2 className="text-2xl font-black uppercase tracking-wider">Privacidad y Datos</h2>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl text-gray-600 leading-relaxed space-y-4 font-medium shadow-sm">
                <p>
                  Tus datos están seguros con nosotros. Solo utilizamos tu información para procesar pedidos y mejorar tu experiencia de compra. No compartimos bases de datos con terceros.
                </p>
                <p>
                  Los archivos de diseño que subes a nuestra plataforma son de tu propiedad y se eliminan de nuestros servidores tras 30 días de la entrega.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-naga-green p-12 rounded-[2rem] text-white shadow-xl shadow-naga-green/20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2">
                  <h3 className="text-4xl font-black uppercase leading-none">¿Dudas adicionales?</h3>
                  <p className="font-bold opacity-90 uppercase tracking-widest text-sm">Nuestro equipo está listo para ayudarte</p>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <a href="mailto:hola@gruponagasapi.com.mx" className="bg-black text-white px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all uppercase text-sm shadow-lg">
                    <Mail size={18} /> hola@gruponagasapi.com.mx
                  </a>
                  <a href="https://wa.me/525530447291" className="bg-white text-black px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all uppercase text-sm shadow-lg">
                    WhatsApp Soporte
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
