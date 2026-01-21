"use client";
import React from "react";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="p-6 bg-white/5 rounded-full text-naga-purple">
        <SettingsIcon size={48} />
      </div>
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter italic">Configuración del Sistema</h1>
        <p className="text-gray-500 max-w-md mt-2">Gestiona los parámetros generales de la tienda, impuestos, envíos y perfiles de usuario.</p>
      </div>
    </div>
  );
}
