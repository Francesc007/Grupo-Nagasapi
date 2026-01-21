"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Chrome, ArrowRight, User, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register" | "forgot";

export default function LoginPage() {
  const [mode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.push("/");
    };
    checkUser();
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // Silently check for env vars in console only
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Supabase configuration missing in environment variables.");
    }

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          // Si el error es específicamente de credenciales inválidas
          if (error.status === 400 || error.message.includes("Invalid login credentials")) {
            throw new Error("Correo o contraseña incorrectos. ¿Aún no tienes cuenta? Regístrate aquí.");
          }
          // Si el correo no ha sido confirmado
          if (error.message.includes("Email not confirmed")) {
            throw new Error("Por favor, confirma tu correo electrónico antes de iniciar sesión.");
          }
          throw error;
        }
        router.push("/");
      } else if (mode === "register") {
        if (password !== confirmPassword) throw new Error("Las contraseñas no coinciden");
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });
        if (error) throw error;
        setMessage("¡Registro exitoso! Por favor, revisa tu correo para confirmar tu cuenta.");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMessage("Se ha enviado un enlace de recuperación a tu correo.");
      }
    } catch (err: any) {
      // Mensaje amigable para fallos de login
      setError(err.message || "Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
    if (error) setError(error.message);
  };

  return (
    <main className="min-h-screen bg-naga-cotton flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-naga-purple/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-naga-red/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-6">
            <div className="flex justify-center mb-0">
              <Link href="/" className="relative w-48 h-48 transition-transform hover:scale-105 block">
                <Image src="/Logo 1.png" alt="Logo" fill className="object-contain" priority />
              </Link>
            </div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tight -mt-12">
            Bienvenido
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold">
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-600 text-sm font-bold">
              <ShieldCheck size={18} /> {message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleAuth} className="space-y-3">
          {mode === "register" && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-black focus:border-naga-purple focus:ring-1 focus:ring-naga-purple outline-none transition-all font-medium"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-black focus:border-naga-purple focus:ring-1 focus:ring-naga-purple outline-none transition-all font-medium"
              />
            </div>
          </div>

          {mode !== "forgot" && (
            <>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-12 text-black focus:border-naga-purple focus:ring-1 focus:ring-naga-purple outline-none transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-naga-purple transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-12 text-black focus:border-naga-purple focus:ring-1 focus:ring-naga-purple outline-none transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-naga-purple transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {mode === "login" && (
            <button type="button" onClick={() => setAuthMode("forgot")} className="text-xs text-naga-purple font-bold hover:underline ml-4">
              ¿Olvidaste tu contraseña?
            </button>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-naga-purple text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all uppercase tracking-widest mt-4 shadow-lg shadow-naga-purple/20 disabled:opacity-50"
          >
            {loading ? "Procesando..." : mode === "login" ? "Entrar" : mode === "register" ? "Registrarse" : "Enviar Enlace"}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
            <span className="bg-white px-4 text-gray-400">O continúa con</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-100 py-3 rounded-2xl hover:bg-gray-50 transition-all shadow-sm mb-6"
        >
          <Chrome size={20} className="text-gray-700" />
          <span className="text-gray-700 font-bold text-sm">Google</span>
        </button>

        <p className="text-center text-gray-500 text-sm">
          {mode === "login" ? "¿No tienes cuenta? " : mode === "register" ? "¿Ya tienes cuenta? " : "¿Recordaste tu contraseña? "}
          <button 
            onClick={() => setAuthMode(mode === "login" ? "register" : "login")}
            className="text-naga-purple font-bold hover:underline"
          >
            {mode === "login" ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </motion.div>
    </main>
  );
}
