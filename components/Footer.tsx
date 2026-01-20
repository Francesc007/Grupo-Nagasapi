import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-naga-cotton border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-48 h-16 transition-transform group-hover:scale-105">
              <Image src="/Logo 1.png" alt="Logo" fill className="object-contain object-left" />
            </div>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            Expertos en transferencias DTF personalizadas en CDMX. 
            Calidad premium para marcas, emprendedores y entusiastas.
          </p>
          <div className="flex gap-4">
            <Link href="https://instagram.com/gruponagasapi" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-naga-purple hover:text-white transition-all">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-naga-purple hover:text-white transition-all">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-naga-purple hover:text-white transition-all">
              <Twitter size={20} />
            </Link>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-black font-black mb-6 uppercase tracking-wider text-xs">Empresa</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-gray-500 hover:text-naga-purple text-sm font-bold transition-colors">Inicio</Link></li>
            <li><Link href="/chunchos" className="text-gray-500 hover:text-naga-brown text-sm font-bold transition-colors">Chunchos</Link></li>
            <li><Link href="/bolsas" className="text-gray-500 hover:text-naga-green text-sm font-bold transition-colors">La Pinche Bolsa</Link></li>
            <li><Link href="/sube-tu-diseno" className="text-gray-500 hover:text-naga-purple text-sm font-bold transition-colors">Sube tu diseño</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-black font-black mb-6 uppercase tracking-wider text-xs">Soporte</h4>
          <ul className="space-y-4">
            <li><Link href="/politicas" className="text-gray-500 hover:text-naga-green text-sm font-bold transition-colors">Políticas de Envío</Link></li>
            <li><Link href="/politicas" className="text-gray-500 hover:text-naga-green text-sm font-bold transition-colors">Devoluciones</Link></li>
            <li><Link href="/politicas" className="text-gray-500 hover:text-naga-green text-sm font-bold transition-colors">Privacidad</Link></li>
            <li><Link href="/politicas" className="text-gray-500 hover:text-naga-green text-sm font-bold transition-colors">Términos</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-black font-black mb-6 uppercase tracking-wider text-xs">Ubicación</h4>
          <p className="text-gray-500 text-sm mb-4 font-medium">
            CDMX, México<br />
            Envíos gratis en compras mayores a $500 MXN.
          </p>
          <p className="text-naga-purple font-black text-sm">
            WhatsApp: +52 55 3044 7291
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
        <p>© 2026 Grupo Nagasapi - CDMX. Todos los derechos reservados.</p>
        <div className="flex items-center gap-6">
          <span>Stripe Secure</span>
          <span>Mercado Pago</span>
          <span>PayPal</span>
        </div>
      </div>
    </footer>
  );
}
