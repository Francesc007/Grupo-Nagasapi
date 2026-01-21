"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById, getProducts, Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Loader2,
  ChevronLeft,
  Share2,
  Heart,
  BadgePercent
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";

const COLOR_MAP: Record<string, string> = {
  "Negro": "#000000",
  "Blanco": "#FFFFFF",
  "Café": "#4B3621",
  "Azul": "#1E40AF",
  "Rojo": "#FF1744",
  "Gris": "#9CA3AF",
  "Natural": "#F5F0E6",
  "Multicolor": "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      const data = await getProductById(id as string);
      if (data) {
        setProduct(data);
        setMainImage(data.images[0]);
        setSelectedColor(data.colors[0]);
        setSelectedSize(data.sizes[0]);
        
        // Load related products
        const related = await getProducts({ category: data.category });
        setRelatedProducts(related.filter(p => String(p.id) !== String(id)).slice(0, 4));
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
      image: mainImage,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-naga-cotton">
        <Loader2 size={48} className="text-naga-purple animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-naga-cotton space-y-4">
        <h1 className="text-2xl font-black uppercase italic">Producto no encontrado</h1>
        <button onClick={() => router.back()} className="text-naga-purple font-bold hover:underline">Regresar</button>
      </div>
    );
  }

  const colorTheme = product.category === 'bolsas' ? 'green' : (product.category === 'playeras' ? 'brown' : 'purple');
  const primaryColor = colorTheme === "purple" ? "naga-purple" : (colorTheme === "green" ? "naga-green" : "naga-brown");
  const primaryBg = colorTheme === "purple" ? "bg-naga-purple" : (colorTheme === "green" ? "bg-naga-green" : "bg-naga-brown");
  const primaryText = colorTheme === "purple" ? "text-naga-purple" : (colorTheme === "green" ? "text-naga-green" : "text-naga-brown");

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">
          <Link href="/" className="hover:text-black">Inicio</Link>
          <span>/</span>
          <Link href={product.category === 'bolsas' ? '/bolsas' : '/chunchos'} className="hover:text-black">
            {product.category === 'bolsas' ? 'La Pinche Bolsa' : 'Chunchos'}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-12 gap-4">
              {/* Thumbnails */}
              <div className="col-span-2 space-y-4">
                {product.images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`relative aspect-square w-full rounded-xl overflow-hidden border-2 transition-all ${
                      mainImage === img ? `border-${primaryColor}` : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image with Zoom */}
              <div className="col-span-10">
                <div 
                  className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 cursor-crosshair group shadow-2xl"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <Image 
                    src={mainImage} 
                    alt={product.name} 
                    fill 
                    className={`object-cover transition-transform duration-200 ${isZoomed ? 'scale-[2.5]' : 'scale-100'}`}
                    style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {product.type === "premium" && (
                      <span className={`${primaryBg} text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-xl`}>
                        Edición Premium
                      </span>
                    )}
                    <span className="bg-naga-red text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-xl flex items-center gap-1">
                      <BadgePercent size={14} /> 15% OFF
                    </span>
                  </div>

                  {/* Zoom Indicator */}
                  {!isZoomed && (
                    <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] font-black uppercase tracking-widest text-black">Hover para Zoom</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h1 className="text-4xl md:text-5xl font-black text-black leading-none uppercase italic tracking-tighter">
                  {product.name}
                </h1>
                <div className="flex gap-2">
                  <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-naga-red transition-all shadow-sm">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-naga-purple transition-all shadow-sm">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  (42 Reseñas verificadas)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-4 py-4 border-y border-gray-100">
                <div className="space-y-1">
                  <p className="text-gray-400 text-xs font-bold line-through uppercase tracking-widest">${Math.round(product.price * 1.15)} MXN</p>
                  <p className={`${primaryText} text-5xl font-black tracking-tighter`}>
                    ${product.price} <span className="text-xl">MXN</span>
                  </p>
                </div>
                <div className="bg-naga-red/10 text-naga-red text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest mb-1 animate-pulse">
                  ¡Ahorras ${(Math.round(product.price * 1.15) - product.price)}!
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 font-medium leading-relaxed">
              {product.description} Nuestra técnica de impresión DTF garantiza colores vibrantes y una durabilidad excepcional lavado tras lavado.
            </p>

            {/* Selectors */}
            <div className="space-y-8">
              {/* Color Selector */}
              <div className="space-y-4">
                <p className="text-xs font-black text-black uppercase tracking-widest flex justify-between">
                  Color: <span className="text-gray-400">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-10 h-10 rounded-full border-4 transition-all flex items-center justify-center relative ${
                        selectedColor === c ? `border-${primaryColor} scale-110 shadow-lg` : 'border-transparent hover:scale-105'
                      }`}
                      style={{ 
                        background: COLOR_MAP[c] || "#CCCCCC",
                      }}
                    >
                      {selectedColor === c && (
                        <div className="absolute -top-1 -right-1 bg-white rounded-full shadow-md">
                          <Check size={14} className={primaryText} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-4">
                <p className="text-xs font-black text-black uppercase tracking-widest flex justify-between">
                  Talla: <span className="text-gray-400">{selectedSize}</span>
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-3 text-xs font-black rounded-xl border-2 transition-all ${
                        selectedSize === s 
                          ? `${primaryBg} border-${primaryColor} text-white shadow-xl` 
                          : "bg-white border-gray-100 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4 pt-4">
                <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center font-black text-lg hover:text-naga-purple transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center font-black text-lg hover:text-naga-purple transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className={`flex-grow ${primaryBg} text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl hover:scale-[1.02] active:scale-95 uppercase tracking-widest`}
                >
                  <ShoppingCart size={22} />
                  Agregar al Carrito
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Truck size={20} />
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Envío Rápido CDMX</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Pago Seguro SSL</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <RotateCcw size={20} />
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Garantía Nagasapi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32 pt-20 border-t border-gray-100">
            <div className="flex justify-between items-end mb-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-black uppercase italic tracking-tighter">
                  También te <span className={primaryText}>puede gustar</span>
                </h2>
                <p className="text-gray-500 font-medium">Otros tesoros de la colección {product.collection || product.category}</p>
              </div>
              <Link href={product.category === 'bolsas' ? '/bolsas' : '/chunchos'} className={`text-sm font-black uppercase tracking-widest ${primaryText} hover:underline`}>
                Ver todo el catálogo
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} colorTheme={colorTheme as any} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer variant={colorTheme as any} />
      <WhatsAppButton />
    </main>
  );
}
