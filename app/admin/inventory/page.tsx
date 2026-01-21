"use client";
import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Package,
  ArrowUpRight,
  ChevronDown,
  Upload,
  X
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  collection?: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  discount?: number;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "playeras",
    collection: "",
    description: "",
    stock: "",
    discount: "",
    image_url: "",
    colors: "",
    sizes: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Reset collection if category changes and isn't playeras
      ...(name === "category" && value !== "playeras" ? { collection: "" } : {})
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setError(null);

      // Preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (err: any) {
      console.error("Error uploading image:", err);
      setError("Error al subir la imagen. Asegúrate que el bucket 'products' exista.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image_url) {
      setError("Por favor, sube una imagen para el producto.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Logic for colors and sizes: ensure they are correctly formatted arrays
      const colorsArray = formData.colors
        .split(",")
        .map(c => c.trim())
        .filter(c => c !== "")
        .map(c => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()); // Normalize to Capital Case

      const sizesArray = formData.sizes
        .split(",")
        .map(s => s.trim())
        .filter(s => s !== "")
        .map(s => s.toUpperCase()); // Normalize to Uppercase (S, M, L, XL)

      const productToInsert = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        collection: formData.category === "playeras" ? formData.collection : null,
        description: formData.description,
        stock: parseInt(formData.stock) || 0,
        discount: parseFloat(formData.discount) || 0,
        images: [formData.image_url],
        colors: colorsArray,
        sizes: sizesArray,
        type: "estándar" 
      };

      const { error } = await supabase
        .from("products")
        .insert([productToInsert]);

      if (error) throw error;

      fetchProducts();
      alert("¡Producto publicado correctamente!");
      
      // Reset form but stay on page
      setFormData({
        name: "",
        price: "",
        category: "playeras",
        collection: "",
        description: "",
        stock: "",
        discount: "",
        image_url: "",
        colors: "",
        sizes: ""
      });
      setImagePreview(null);
    } catch (err: any) {
      console.error("Error creating product:", err);
      setError(err.message || "Error al crear el producto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto permanentemente?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      console.error("Error deleting product:", err);
      alert("No se pudo eliminar el producto.");
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none italic">Gestión de <span className="text-naga-purple">Inventario</span></h1>
          <p className="text-gray-500 text-sm font-medium mt-3">Control total sobre tus productos y existencias.</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-8 py-5 rounded-[2rem] backdrop-blur-md flex items-center gap-6 shadow-2xl">
          <div className="p-3 bg-naga-purple/10 rounded-2xl text-naga-purple">
            <Package size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Total en Stock</p>
            <p className="text-2xl font-black text-white">{products.reduce((acc, p) => acc + (p.stock || 0), 0)} <span className="text-xs text-gray-600 font-bold uppercase tracking-widest ml-1">unidades</span></p>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="bg-black/40 border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-naga-purple via-naga-red to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
        
        <h2 className="text-2xl font-black uppercase mb-12 flex items-center gap-4 italic tracking-tighter">
          <Plus className="text-naga-purple" size={28} /> 
          Publicar Nuevo Producto
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Information (8 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Información Básica</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Nombre del producto (ej: Playera Chunchos Gold)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold focus:border-naga-purple focus:bg-white/[0.08] transition-all outline-none placeholder:text-gray-700"
              />
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Descripción del producto..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold focus:border-naga-purple focus:bg-white/[0.08] transition-all outline-none resize-none placeholder:text-gray-700"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Precio ($)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-naga-purple font-black">$</span>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:border-naga-purple focus:bg-white/[0.08] transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Stock</label>
                <input 
                  type="number" 
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  placeholder="Cantidad"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-naga-purple focus:bg-white/[0.08] transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Categoría</label>
                <div className="relative">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    aria-label="Seleccionar categoría"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-naga-purple focus:bg-white/[0.08] transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="playeras">Playeras (Chunchos)</option>
                    <option value="bolsas">Bolsas (La Pinche)</option>
                    <option value="hoodies">Sudaderas</option>
                    <option value="custom">Personalizado</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Descuento (%)</label>
                <input 
                  type="number" 
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-naga-purple focus:bg-white/[0.08] transition-all outline-none"
                />
              </div>
            </div>

            {formData.category === "playeras" && (
              <div className="space-y-3 animate-in fade-in slide-in-from-left-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-naga-purple ml-1">Subcategoría (Colección)</label>
                <div className="relative">
                  <select 
                    name="collection"
                    value={formData.collection}
                    onChange={handleInputChange}
                    required
                    aria-label="Seleccionar subcategoría"
                    className="w-full bg-naga-purple/5 border border-naga-purple/20 rounded-2xl px-6 py-4 text-sm font-bold focus:border-naga-purple focus:bg-naga-purple/10 transition-all outline-none appearance-none cursor-pointer text-white"
                  >
                    <option value="" disabled className="bg-black">Seleccionar sección...</option>
                    <option value="cafecito" className="bg-black">Un cafecito pa' llevar</option>
                    <option value="cdmx" className="bg-black">Ciudad de México</option>
                    <option value="arte" className="bg-black">Colección de Arte</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-naga-purple pointer-events-none" size={16} />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Colores</label>
                <input 
                  type="text" 
                  name="colors"
                  value={formData.colors}
                  onChange={handleInputChange}
                  placeholder="Azul, Negro..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-naga-purple outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Tallas</label>
                <input 
                  type="text" 
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleInputChange}
                  placeholder="S, M, L..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-naga-purple outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Media & Submit (4 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Imagen del Producto</label>
              <div className="h-full">
                {imagePreview ? (
                  <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-2 border-naga-purple group/preview bg-white/5 shadow-2xl">
                    <Image src={imagePreview} alt="Preview" fill className="object-contain p-4" />
                    <button 
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image_url: "" }));
                      }}
                      className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity gap-2"
                    >
                      <X size={32} className="text-white" />
                      <span className="text-[10px] font-black uppercase text-white tracking-widest">Cambiar Imagen</span>
                    </button>
                  </div>
                ) : (
                  <label className="w-full aspect-square bg-white/5 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-naga-purple hover:bg-white/[0.08] transition-all group/upload shadow-inner">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    {uploadingImage ? (
                      <Loader2 className="animate-spin text-naga-purple" size={40} />
                    ) : (
                      <>
                        <div className="p-6 bg-white/5 rounded-3xl group-hover/upload:bg-naga-purple/10 transition-all">
                          <Upload size={48} className="text-gray-600 group-hover/upload:text-naga-purple transition-colors" />
                        </div>
                        <div className="text-center px-6">
                          <span className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400 group-hover/upload:text-white transition-colors">Subir Imagen</span>
                          <span className="block text-[9px] font-bold uppercase tracking-widest text-gray-600 mt-2">PNG, JPG o WEBP</span>
                        </div>
                      </>
                    )}
                  </label>
                )}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-naga-purple text-white py-6 rounded-2xl font-black uppercase tracking-[0.4em] shadow-2xl shadow-naga-purple/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-4 text-xs"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Publicar Producto"}
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-10 p-6 bg-naga-red/10 border border-naga-red/20 rounded-[2rem] flex items-center gap-4 text-naga-red text-sm font-black uppercase tracking-widest animate-shake">
            <AlertCircle size={24} /> {error}
          </div>
        )}
      </section>

      {/* Inventory Table */}
      <section className="bg-black border border-white/5 rounded-[3.5rem] overflow-hidden shadow-2xl relative">
        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 bg-white/[0.01]">
          <h3 className="text-xl font-black uppercase tracking-tighter italic">Catálogo Actual <span className="text-gray-600 ml-2 not-italic text-sm font-bold uppercase tracking-widest">({products.length} productos)</span></h3>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o SKU..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-xs font-bold outline-none focus:border-naga-purple focus:bg-white/[0.08] transition-all"
              />
            </div>
            <button 
              className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all text-gray-500"
              title="Filtrar"
              aria-label="Filtrar productos"
            >
              <Filter size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
                <th className="px-10 py-8">Producto</th>
                <th className="px-10 py-8 text-center">Categoría</th>
                <th className="px-10 py-8">Inversión / Precio</th>
                <th className="px-10 py-8">Stock</th>
                <th className="px-10 py-8 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center">
                    <Loader2 className="animate-spin mx-auto text-naga-purple mb-8" size={48} />
                    <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-[10px]">Sincronizando con base de datos...</p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center text-gray-600 font-bold uppercase tracking-[0.2em] text-xs italic">
                    No se encontraron registros en el sistema.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-all group duration-500">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-8">
                        <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-700 shadow-2xl">
                          {p.images?.[0] ? (
                            <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-800">
                              <ImageIcon size={32} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-lg text-white leading-tight mb-2 group-hover:text-naga-purple transition-colors">{p.name}</p>
                          <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">SKU: NS-{p.id.toString().padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="space-y-1">
                        <p className="font-black text-lg text-white group-hover:scale-110 transition-transform origin-left inline-block">${p.price}</p>
                        {p.discount ? (
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-naga-red/20 text-naga-red text-[9px] font-black rounded-md uppercase tracking-tighter">
                              -{p.discount}% OFF
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-2.5 h-2.5 rounded-full shadow-lg ${p.stock < 10 ? 'bg-naga-red animate-pulse shadow-naga-red/50' : 'bg-naga-green shadow-naga-green/50'}`} />
                        <span className={`text-sm font-black uppercase tracking-[0.1em] ${p.stock < 10 ? 'text-naga-red' : 'text-gray-400'}`}>
                          {p.stock} <span className="text-[9px] text-gray-600 ml-1">PZ</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-8 group-hover:translate-x-0">
                        <button 
                          className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-white hover:bg-white/10 transition-all shadow-xl"
                          title="Editar"
                          aria-label="Editar producto"
                        >
                          <Edit3 size={20} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="p-4 bg-naga-red/5 border border-naga-red/10 rounded-2xl text-naga-red hover:bg-naga-red hover:text-white transition-all shadow-xl"
                          title="Eliminar"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
