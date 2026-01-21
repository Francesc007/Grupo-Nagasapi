"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Users,
  BarChart3
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        setLoading(true);
        console.log("🛰️ Iniciando verificación profunda en el servidor...");

        // 1. Obtener usuario directamente de Supabase Auth
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          console.log("❌ No se detectó sesión activa. Redirigiendo a Login.");
          router.push("/login");
          return;
        }

        console.log("👤 Usuario detectado:", user.email);

        // 2. Consultar valor REAL de is_admin en la tabla profiles
        const { data: profile, error: dbError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (dbError || !profile) {
          console.error("❌ Perfil no encontrado o error de DB:", dbError?.message);
          router.push("/");
          return;
        }

        console.log("👑 Valor de is_admin en DB:", profile.is_admin);

        // 3. Validación final
        if (profile.is_admin === true) {
          console.log("✅ Acceso administrativo concedido.");
          setLoading(false);
        } else {
          console.log("🚫 Usuario no autorizado (no es admin). Regresando al Home.");
          router.push("/");
        }

      } catch (err) {
        console.error("💥 Error crítico en validación:", err);
        router.push("/");
      }
    };

    checkAdmin();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { label: "Inventario", href: "/admin/inventory", icon: <Package size={20} /> },
    { label: "Métricas", href: "/admin/metrics", icon: <BarChart3 size={20} /> },
    { label: "Configuración", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-naga-purple animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-30">
        <div className="p-8">
          <Link href="/" className="text-2xl font-black text-naga-purple tracking-tighter italic">
            NAGASAPI<span className="text-white/20 not-italic ml-1 text-[10px] uppercase tracking-[0.2em]">Panel</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group ${
                pathname === item.href 
                ? "bg-naga-purple text-white shadow-2xl shadow-naga-purple/20" 
                : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={pathname === item.href ? "text-white" : "text-gray-600 group-hover:text-naga-purple transition-colors"}>
                  {item.icon}
                </span>
                {item.label}
              </div>
              <ChevronRight size={14} className={`transition-transform duration-300 ${pathname === item.href ? "opacity-100 rotate-90" : "opacity-0 group-hover:opacity-40"}`} />
            </Link>
          ))}
        </nav>

        <div className="p-6 mt-auto space-y-3 border-t border-white/5 bg-black/50 backdrop-blur-md">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all"
          >
            <ArrowLeft size={14} /> Ir a la web
          </Link>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-naga-red hover:bg-naga-red/10 transition-all border border-transparent hover:border-naga-red/20"
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-10 relative h-screen overflow-y-auto bg-gradient-to-br from-[#050505] via-[#080808] to-[#050505]">
        {/* Background Ambient Glows */}
        <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-naga-purple/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="fixed bottom-0 left-64 w-1/2 h-1/2 bg-naga-red/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
