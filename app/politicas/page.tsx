"use client";
import React, { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, RotateCcw, ShieldCheck, FileText, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

function PoliticasContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"general" | "chunchos" | "bolsas">("general");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "chunchos" || tab === "bolsas" || tab === "general") {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  const tabs = [
    { id: "general", label: "General", icon: <Truck size={18} /> },
    { id: "chunchos", label: "Chunchos", icon: <ShieldCheck size={18} /> },
    { id: "bolsas", label: "La Pinche Bolsa", icon: <FileText size={18} /> },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-6xl font-black text-black uppercase tracking-tighter italic mb-8">
            Centro de <span className="text-naga-purple">Políticas</span>
          </h1>
          
          <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-naga-purple shadow-sm"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "general" && (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-16"
            >
              <section className="space-y-6">
                <div className="flex items-center gap-4 text-naga-purple">
                  <Truck size={32} />
                  <h2 className="text-2xl font-black uppercase tracking-wider">Envíos y Entregas</h2>
                </div>
                <div className="bg-white border border-gray-100 p-8 rounded-2xl text-gray-600 leading-relaxed space-y-4 font-medium shadow-sm">
                  <p>En <strong>Grupo Nagasapi</strong>, sabemos que la rapidez es clave. Ofrecemos envíos gratuitos en la Ciudad de México (CDMX) en compras superiores a <span className="text-black font-black">$500 MXN</span>.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Tiempo de entrega estimado: 24 a 48 horas hábiles.</li>
                    <li>Envíos nacionales vía FedEx o DHL (costo calculado en checkout).</li>
                    <li>Recolección en punto de venta disponible sin costo.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-4 text-naga-red">
                  <RotateCcw size={32} />
                  <h2 className="text-2xl font-black uppercase tracking-wider">Devoluciones</h2>
                </div>
                <div className="bg-white border border-gray-100 p-8 rounded-2xl text-gray-600 leading-relaxed space-y-4 font-medium shadow-sm">
                  <p>Debido a la naturaleza personalizada de nuestros productos (DTF), las devoluciones solo aplican en los siguientes casos:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Defectos de fábrica en la prenda o el transfer.</li>
                    <li>Error en el diseño respecto a lo aprobado por el cliente.</li>
                    <li>Producto dañado durante el transporte.</li>
                  </ul>
                  <p>Tienes un plazo de <strong>7 días naturales</strong> tras recibir tu pedido para reportar cualquier incidencia.</p>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "chunchos" && (
            <motion.div
              key="chunchos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              <div className="bg-white border border-gray-100 p-10 rounded-[2rem] shadow-sm overflow-hidden">
                <h2 className="text-3xl font-black uppercase italic mb-8 border-b pb-4 text-naga-brown">Aviso de Privacidad - Chunchos</h2>
                <div className="prose prose-stone max-w-none text-gray-600 font-medium space-y-6 text-sm">
                  <p className="font-bold">AVISO DE PRIVACIDAD</p>
                  <p>GRUPO NAGASAPI S.A. DE C.V, titular del nombre comercial CHUNCHOS, con RFC GNA200810FW2 y domicilio ubicado en Calle Magnolia, número 173, Altos A, Col. Guerrero, C.P. 06300, Alcaldía, Cuauhtémoc, Ciudad de México; es el responsable del uso y protección de sus datos personales, los cuales serán protegidos conforme a lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</p>
                  
                  <p className="font-bold">¿Para qué fines utilizaremos sus datos personales?</p>
                  <p>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p>
                  <ul className="list-disc pl-5">
                    <li>Brindarle información acerca de los productos que comercializa CHUNCHOS.</li>
                    <li>Ejecutar él envió de los productos que adquiera a través de las compras efectuadas en el sitio web.</li>
                    <li>Atender sus opiniones, quejas y/o sugerencias.</li>
                  </ul>
                  
                  <p>De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:</p>
                  <ul className="list-disc pl-5">
                    <li>Envió de nuestras promociones y descuentos (publicidad y mercadotecnia).</li>
                  </ul>

                  <p className="font-bold uppercase mt-8">Términos y Condiciones - Chunchos</p>
                  <p>GRUPO NAGASAPI SA DE CV., con RFC GNA200810FW2 y domicilio en Magnolia, número 173, Colonia Guerrero, Código Postal 06300, Alcaldía Cuauhtémoc, Ciudad de México, en lo sucesivo denominado como Chunchos, es el Titular del presente SITIO WEB, quien por este medio establece y da a conocer los TÉRMINOS Y CONDICIONES DE USO a los que se sujetaran todas las personas físicas y/o morales (en lo sucesivo denominados como EL USUARIO), que ingresen al SITIO WEB.</p>
                  
                  <p className="font-bold">DISPONIBILIDAD DE LOS TERMINOS Y CONDICIONES DE USO</p>
                  <p>Los presentes TÉRMINOS Y CONDICIONES, se exponen con carácter permanente en el SITIO WEB, donde EL USUARIO podrá consultarlos, archivarlos y/o imprimirlos en cualquier momento. Al acceder y hacer uso del SITIO WEB, EL USUARIO acepta en su totalidad y sin reservas, los presentes TÉRMINOS Y CONDICIONES.</p>
                  
                  <p className="font-bold uppercase mt-8 text-xs tracking-widest">POLITICAS DE DEVOLUCIÓN</p>
                  <p>En caso de devolución, deberá efectuarse dentro de un plazo máximo de 05 (cinco) días hábiles, después de recibido el producto. EL USUARIO, tendrá la obligación de devolver el producto en las mismas condiciones en las que lo recibió y sin haberlo utilizado.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "bolsas" && (
            <motion.div
              key="bolsas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              <div className="bg-white border border-gray-100 p-10 rounded-[2rem] shadow-sm">
                <h2 className="text-3xl font-black uppercase italic mb-8 border-b pb-4 text-naga-green">Aviso de Privacidad - La Pinche Bolsa</h2>
                <div className="prose prose-stone max-w-none text-gray-600 font-medium space-y-6 text-sm">
                  <p className="font-bold uppercase">Política de Privacidad general para Clientes.</p>
                  <p>La confidencialidad y debida protección de la información personal confiada a la marca La Pinche Bolsa (en adelante se llamará “EL VENDEDOR”) es de máxima importancia.</p>
                  <p>“EL VENDEDOR” está comprometido a manejar sus datos personales de manera responsable y con apego a lo previsto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (en adelante la “Ley”) y demás normatividad aplicable.</p>
                  <p>Para “EL VENDEDOR” resulta necesaria la recopilación de ciertos datos personales para llevar a cabo las actividades relacionadas a su giro comercial y mercantil. “EL VENDEDOR” tiene la obligación legal y social de cumplir con las medidas, legales y de seguridad suficientes para proteger aquellos datos personales que haya recabado para las finalidades que en la presente política de privacidad serán descritas.</p>
                  
                  <p className="font-bold">Datos del responsable.</p>
                  <p>La Pinche Bolsa forma parte de Grupo Nagasapi S.A. DE C.V. Es una sociedad constituida de conformidad con las leyes de México, con domicilio en Magnolia #173, altos “A”, Col. Guerrero, C.P. 06300, Alcaldía Cuauhtémoc, Ciudad de México.</p>
                  
                  <p className="font-bold">Finalidad del tratamiento de datos.</p>
                  <ul className="list-disc pl-5">
                    <li>Identificación.</li>
                    <li>Gestión y/o administración de nuestra relación comercial.</li>
                    <li>Hacer consultas, investigaciones y revisiones en relación con sus quejas o reclamaciones.</li>
                  </ul>

                  <h2 className="text-3xl font-black uppercase italic mt-16 mb-8 border-b pb-4 text-naga-green">Términos y Condiciones - La Pinche Bolsa</h2>
                  <p>Agradecemos tu preferencia y nos permitimos informarte sobre algunos puntos importantes a considerar durante tu visita a www.lapinchebolsa.mx. Al ingresar y utilizar este sitio estás aceptando los términos y condiciones contenidos en este convenio y declaras expresamente tu aceptación.</p>
                  
                  <p className="font-bold uppercase mt-8">Derechos de Autor y Propiedad Industrial</p>
                  <p>Los derechos de autor sobre el contenido, organización, recopilación, compilación, información, logotipos, fotografías, imágenes, programas, aplicaciones, o en general cualquier información contenida o publicada en www.lapinchebolsa.mx, se encuentran debidamente protegidos a favor de Grupo Nagasapi S.A. de C.V.</p>
                  
                  <p className="font-bold uppercase mt-8">Limitaciones a la Responsabilidad</p>
                  <p>Hasta el máximo permitido por las leyes aplicables, www.lapinchebolsa.mx no será responsable, en ningún caso, por cualquier daño directo, especial, incidental, indirecto, o consecuencia que en cualquier forma se deriven o se relacionen con el uso o ejecución de www.lapinchebolsa.mx.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-16 bg-naga-purple p-12 rounded-[2rem] text-white shadow-xl shadow-naga-purple/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-4xl font-black uppercase leading-none">¿Dudas sobre tus datos?</h3>
              <p className="font-bold opacity-90 uppercase tracking-widest text-sm">Nuestro equipo legal está listo para ayudarte</p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a href="mailto:contacto@lapinchebolsa.mx" className="bg-black text-white px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all uppercase text-sm shadow-lg">
                <Mail size={18} /> contacto@lapinchebolsa.mx
              </a>
              <a href="https://wa.me/525530447291" className="bg-white text-black px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all uppercase text-sm shadow-lg">
                Soporte Legal WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function PoliticasPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center">Cargando políticas...</div>}>
        <PoliticasContent />
      </Suspense>
      <Footer />
    </main>
  );
}
