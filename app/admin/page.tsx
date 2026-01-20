"use client";
import React, { useState } from "react";
import { 
  BarChart3, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  MoreHorizontal,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import Link from "next/link";

const data = [
  { name: "Lun", ventas: 4000 },
  { name: "Mar", ventas: 3000 },
  { name: "Mie", ventas: 2000 },
  { name: "Jue", ventas: 2780 },
  { name: "Vie", ventas: 1890 },
  { name: "Sab", ventas: 2390 },
  { name: "Dom", ventas: 3490 },
];

const stats = [
  { label: "Ventas Hoy", value: "$10,250", icon: <DollarSign size={20} />, trend: "+12.5%", color: "text-naga-green" },
  { label: "Órdenes", value: "52", icon: <Package size={20} />, trend: "+3", color: "text-blue-500" },
  { label: "Usuarios", value: "1,240", icon: <Users size={20} />, trend: "+15", color: "text-purple-500" },
  { label: "Conversión", value: "3.2%", icon: <TrendingUp size={20} />, trend: "+0.4%", color: "text-naga-red" },
];

const orders = [
  { id: "#1024", user: "Carlos Rodriguez", product: "Playera Nagasapi DTF", status: "Completado", total: "$250" },
  { id: "#1023", user: "Ana Martínez", product: "Chuncho Intro Pack", status: "Pendiente", total: "$450" },
  { id: "#1022", user: "Miguel López", product: "Hoodie Urban", status: "Enviado", total: "$750" },
  { id: "#1021", user: "Sofia Torres", product: "Bolsa Premium", status: "Procesando", total: "$280" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/5 flex flex-col p-6">
        <div className="mb-12">
          <Link href="/" className="text-2xl font-black text-naga-green tracking-tighter italic">
            Nagasapi
          </Link>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "dashboard" ? "bg-naga-green text-black" : "text-gray-400 hover:bg-white/5"}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 transition-all"
          >
            <Package size={18} /> Órdenes
          </button>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 transition-all"
          >
            <BarChart3 size={18} /> Estadísticas
          </button>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 transition-all"
          >
            <Users size={18} /> Clientes
          </button>
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-naga-red hover:bg-naga-red/10 transition-all mt-auto">
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Resumen de Ventas</h1>
            <p className="text-gray-500 text-sm">Bienvenido de nuevo, Admin.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-neutral-900 border border-white/5 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
              Exportar CSV
            </button>
            <button className="bg-naga-green text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
              + Nuevo Producto
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-black border border-white/5 p-6 rounded-2xl shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-bold text-naga-green bg-naga-green/10 px-2 py-1 rounded-full flex items-center gap-1">
                  {stat.trend} <ArrowUpRight size={12} />
                </span>
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-white mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-black border border-white/5 p-8 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">Ingresos (Últimos 7 días)</h3>
              <select className="bg-neutral-900 border-none text-[10px] text-gray-400 font-bold rounded-lg py-1 px-3 appearance-none uppercase tracking-wider">
                <option>Esta Semana</option>
                <option>Mes Pasado</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#444" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#444" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                    itemStyle={{ color: '#16A34A' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="#16A34A" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorVentas)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-black border border-white/5 p-8 rounded-2xl shadow-xl">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Órdenes Recientes</h3>
            <div className="space-y-6">
              {orders.map((order, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-white font-bold text-sm">{order.user}</p>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-naga-green font-black text-sm">{order.total}</p>
                    <p className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block ${
                      order.status === "Completado" ? "bg-naga-green/10 text-naga-green" : 
                      order.status === "Pendiente" ? "bg-yellow-500/10 text-yellow-500" :
                      "bg-blue-500/10 text-blue-500"
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
              <button className="w-full text-center text-xs font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest pt-4">
                Ver todas las órdenes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
