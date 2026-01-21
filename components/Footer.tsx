"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { usePathname } from "next/navigation";

// Custom TikTok SVG Icon (Exact Logo)
const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.88-.64-1.55-1.51-1.93-2.5-.02 2.45-.01 4.9-.01 7.35 0 1.25-.2 2.53-.78 3.65-.6 1.16-1.58 2.1-2.76 2.64-1.21.56-2.58.74-3.89.52-1.32-.22-2.58-.87-3.52-1.82-1-1-1.63-2.35-1.74-3.76-.11-1.48.27-3.01 1.09-4.22.84-1.25 2.15-2.2 3.64-2.55V9.43c-1.12.22-2.14.83-2.85 1.71-.62.77-.95 1.76-.9 2.74.05.93.43 1.84 1.07 2.52.66.7 1.56 1.16 2.5 1.28.9.11 1.84-.04 2.62-.51.77-.47 1.34-1.24 1.54-2.12.11-.53.15-1.07.15-1.61V0h.01z" />
  </svg>
);

export default function Footer({ variant }: { variant?: "purple" | "green" | "brown" }) {
  const pathname = usePathname();
  
  // Determine color theme based on current page OR passed variant
  const isChunchos = variant === "brown" || pathname === "/chunchos";
  const isBolsas = variant === "green" || pathname === "/bolsas";
  
  // Color classes based on page
  const hoverBgClass = isChunchos 
    ? "hover:bg-naga-brown" 
    : isBolsas 
      ? "hover:bg-naga-green" 
      : "hover:bg-naga-purple";
  
  const textColorClass = isChunchos 
    ? "text-naga-brown" 
    : isBolsas 
      ? "text-naga-green" 
      : "text-naga-purple";

  return (
    <footer className="bg-naga-cotton pt-10 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Brand */}
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-36 h-12 transition-transform group-hover:scale-105">
              <Image src="/Logo 1.png" alt="Logo" fill className="object-contain object-left" />
            </div>
          </Link>
          <p className="text-gray-500 text-[13px] leading-relaxed font-medium">
            Expertos en transferencias DTF personalizadas en CDMX. 
            Calidad premium para marcas y emprendedores.
          </p>
          <div className="flex gap-3">
            <Link href="https://instagram.com/gruponagasapi" className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 ${hoverBgClass} hover:text-white transition-all`}>
              <Instagram size={16} />
            </Link>
            <Link href="#" className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 ${hoverBgClass} hover:text-white transition-all`}>
              <Facebook size={16} />
            </Link>
            <Link href="#" className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 ${hoverBgClass} hover:text-white transition-all`}>
              <TikTokIcon size={16} />
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-black font-black mb-4 uppercase tracking-wider text-[11px]">Soporte y Legal</h4>
          <ul className="space-y-3">
            <li><Link href="/politicas?tab=general" className="text-gray-500 hover:text-naga-purple text-[13px] font-bold transition-colors">Envíos y Devoluciones</Link></li>
            <li><Link href="/politicas?tab=chunchos" className="text-gray-500 hover:text-naga-brown text-[13px] font-bold transition-colors">Privacidad Chunchos</Link></li>
            <li><Link href="/politicas?tab=bolsas" className="text-gray-500 hover:text-naga-green text-[13px] font-bold transition-colors">Privacidad Bolsa</Link></li>
            <li><Link href="/politicas?tab=general" className="text-gray-500 hover:text-naga-purple text-[13px] font-bold transition-colors">Términos y Condiciones</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-black font-black mb-4 uppercase tracking-wider text-[11px]">Ubicación</h4>
          <p className="text-gray-500 text-[13px] mb-3 font-medium">
            CDMX, México<br />
            Envíos gratis en compras mayores a $500 MXN.
          </p>
          <p className={`${textColorClass} font-black text-[13px]`}>
            WhatsApp: +52 55 3044 7291
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[9px] font-black uppercase tracking-widest">
        <p>© 2026 Grupo Nagasapi - CDMX. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4">
          <span>Stripe Secure</span>
          <span>Mercado Pago</span>
          <span>PayPal</span>
        </div>
      </div>
    </footer>
  );
}
