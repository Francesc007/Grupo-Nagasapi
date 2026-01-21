"use client";
import React, { useState, useEffect } from "react";
import { 
  Package, 
  DollarSign, 
  Zap,
  ShoppingCart,
  Loader2,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { supabase } from "@/lib/supabase";

const data = [
  { name: "Lun", ventas: 4000 },
  { name: "Mar", ventas: 3000 },
  { name: "Mie", ventas: 2000 },
  { name: "Jue", ventas: 2780 },
  { name: "Vie", ventas: 1890 },
  { name: "Sab", ventas: 2390 },
  { name: "Dom", ventas: 3490 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalOrders: 12, 
    revenue: 4500 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { count: productCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      const { count: lowStockCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .lt("stock", 10);

      setStats(prev => ({
        ...prev,
        totalProducts: productCount || 0,
        lowStock: lowStockCount || 0
      }));
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Catálogo", value: stats.totalProducts, icon: <Package size={20} />, trend: "Productos", color: "text-naga-purple" },
    { label: "Stock Bajo", value: stats.lowStock, icon: <Zap size={20} />, trend: "Alertas", color: stats.lowStock > 0 ? "text-naga-red" : "text-naga-green" },
    { label: "Ingresos", value: `$${stats.revenue}`, icon: <DollarSign size={20} />, trend: "Estimado", color: "text-naga-green" },
    { label: "Órdenes", value: stats.totalOrders, icon: <ShoppingCart size={20} />, trend: "Hoy", color: "text-blue-500" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-naga-purple" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Resumen de <span className="text-naga-purple">Métricas</span></h1>
          <p className="text-gray-500 text-sm font-medium mt-2">Monitorea el crecimiento de tu tienda en tiempo real.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <div className="w-2 h-2 rounded-full bg-naga-green animate-pulse" />
          En Vivo
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-white/10 transition-all backdrop-blur-xl">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.03] -translate-y-1/2 translate-x-1/2 rounded-full ${stat.color}`} />
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} shadow-inner`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${stat.color} bg-current/10 border border-current/10`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="bg-black/40 border border-white/5 p-10 rounded-[3.5rem] shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm italic">Análisis de Ingresos</h3>
            <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold tracking-[0.3em]">Proyección semanal de ventas</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-naga-purple" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Ventas Totales</span>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333EA" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#9333EA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="#444" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                className="font-black uppercase"
                tickMargin={15}
              />
              <YAxis 
                stroke="#444" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                className="font-black"
                tickFormatter={(value) => `$${value}`}
                tickMargin={15}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.95)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '24px', 
                  fontFamily: 'inherit',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                }}
                itemStyle={{ color: '#9333EA', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px', padding: '0' }}
                labelStyle={{ fontWeight: '900', marginBottom: '8px', color: '#fff', fontSize: '12px', textTransform: 'uppercase' }}
                cursor={{ stroke: '#9333EA', strokeWidth: 2, strokeDasharray: '5 5' }}
              />
              <Area 
                type="monotone" 
                dataKey="ventas" 
                stroke="#9333EA" 
                strokeWidth={5} 
                fillOpacity={1} 
                fill="url(#colorVentas)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
