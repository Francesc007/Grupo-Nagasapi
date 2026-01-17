export const CATEGORIES = [
  { id: 'playeras', name: 'Playeras', description: 'DTF full color', examples: 'Clásica, Oversize', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
  { id: 'bolsas', name: 'Bolsas Chunchos', description: 'Ecológicas personalizadas', examples: 'Tote, Intro pack', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop' },
  { id: 'hoodies', name: 'Hoodies/Gorras', description: 'Premium prints', examples: 'Urbanas, Sport', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop' },
  { id: 'custom', name: '+Custom', description: 'Cualquier producto', examples: 'Sube tu diseño', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop' },
];

export const PRODUCTS = [
  // Playeras DTF
  {
    id: 1,
    name: "Playera Clásica Nagasapi DTF",
    price: 250,
    category: "playeras",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500"],
    colors: ["Negro", "Blanco", "Rojo", "Verde"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    description: "Impresión DTF de alta calidad en algodón 100%."
  },
  {
    id: 2,
    name: "Playera Oversize Premium",
    price: 450,
    category: "playeras",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500"],
    colors: ["Negro", "Blanco"],
    sizes: ["M", "L", "XL"],
    description: "Corte moderno con impresión DTF tácto cero."
  },
  {
    id: 3,
    name: "Playera Streetwear CDMX",
    price: 350,
    category: "playeras",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=500"],
    colors: ["Negro", "Azul", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    description: "Diseño urbano con colores vibrantes."
  },
  {
    id: 4,
    name: "Playera Deportiva Tech",
    price: 300,
    category: "playeras",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500"],
    colors: ["Blanco", "Negro", "Rojo"],
    sizes: ["S", "M", "L", "XL"],
    description: "Tela dry-fit con DTF elástico."
  },
  {
    id: 5,
    name: "Playera Nagasapi Edición Limitada",
    price: 600,
    category: "playeras",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500"],
    colors: ["Negro"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Acabado de lujo con detalles en neón."
  },
  // Bolsas Chunchos
  {
    id: 6,
    name: "Tote Bag Eco Nagasapi",
    price: 180,
    category: "bolsas",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500"],
    colors: ["Natural", "Negro"],
    sizes: ["Única"],
    description: "Bolsa de manta con impresión DTF resistente."
  },
  {
    id: 7,
    name: "Chuncho Intro Pack (3 piezas)",
    price: 450,
    category: "bolsas",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1597484662317-9bd76320f762?q=80&w=500"],
    colors: ["Natural"],
    sizes: ["Única"],
    description: "Pack ecológico para tus compras."
  },
  {
    id: 8,
    name: "Bolsa Premium 'La Pinche'",
    price: 280,
    category: "bolsas",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=500"],
    colors: ["Negro", "Verde Neón"],
    sizes: ["Grande"],
    description: "Diseño exclusivo con mockups realistas."
  },
  {
    id: 9,
    name: "Mini Chuncho Portable",
    price: 120,
    category: "bolsas",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500"],
    colors: ["Azul", "Rojo"],
    sizes: ["Pequeña"],
    description: "Ideal para accesorios pequeños."
  },
  {
    id: 10,
    name: "Bolsa de Playa Reforzada",
    price: 350,
    category: "bolsas",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1591348113547-6ad874995971?q=80&w=500"],
    colors: ["Blanco", "Beige"],
    sizes: ["XL"],
    description: "Soporta hasta 15kg con estilo."
  },
  // Hoodies / Gorras
  {
    id: 11,
    name: "Hoodie Nagasapi Urban",
    price: 750,
    category: "hoodies",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500"],
    colors: ["Negro", "Gris Oscuro"],
    sizes: ["S", "M", "L", "XL"],
    description: "Sudadera premium con DTF de gran formato."
  },
  {
    id: 12,
    name: "Gorra Snapback Nagasapi",
    price: 320,
    category: "hoodies",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500"],
    colors: ["Negro/Verde", "Negro/Rojo"],
    sizes: ["Ajustable"],
    description: "Visera plana con logo en DTF 3D."
  },
  {
    id: 13,
    name: "Sudadera Crop-Top",
    price: 550,
    category: "hoodies",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500"],
    colors: ["Rosa", "Blanco"],
    sizes: ["S", "M", "L"],
    description: "Corte femenino con impresiones artísticas."
  },
  {
    id: 14,
    name: "Gorra Trucker Retro",
    price: 280,
    category: "hoodies",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1572427364737-c73179450c7a?q=80&w=500"],
    colors: ["Azul/Blanco", "Negro/Blanco"],
    sizes: ["Ajustable"],
    description: "Estilo clásico con DTF frontal."
  },
  {
    id: 15,
    name: "Hoodie Zip-Up Pro",
    price: 850,
    category: "hoodies",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=500"],
    colors: ["Negro", "Marino"],
    sizes: ["M", "L", "XL", "2XL"],
    description: "Cierre metálico y DTF en espalda."
  },
  // Custom
  {
    id: 16,
    name: "Personalizado DTF A4",
    price: 200,
    category: "custom",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500"],
    colors: ["Cualquiera"],
    sizes: ["A4"],
    description: "Sube tu diseño y nosotros lo imprimimos."
  },
  {
    id: 17,
    name: "Hoja DTF Metro Lineal",
    price: 650,
    category: "custom",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500"],
    colors: ["Cualquiera"],
    sizes: ["60cm x 100cm"],
    description: "Máximo rendimiento para tu negocio."
  },
  {
    id: 18,
    name: "Kit Emprendedor DTF",
    price: 1500,
    category: "custom",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500"],
    colors: ["Cualquiera"],
    sizes: ["Varios"],
    description: "Incluye 3 metros de DTF y muestras."
  },
  {
    id: 19,
    name: "DTF Texturizado Especial",
    price: 400,
    category: "custom",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500"],
    colors: ["Oro", "Plata", "Reflejante"],
    sizes: ["A3"],
    description: "Acabados especiales para diseños únicos."
  },
  {
    id: 20,
    name: "Parche DTF Termoadhesivo",
    price: 80,
    category: "custom",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500"],
    colors: ["Multicolor"],
    sizes: ["10x10cm"],
    description: "Fácil de aplicar con plancha casera."
  },
];

export const REVIEWS = [
  { id: 1, name: "Carlos R.", rating: 5, comment: "¡DTF perfecto en mis playeras! El blanco es súper brillante.", location: "CDMX" },
  { id: 2, name: "Ana M.", rating: 5, comment: "Excelente calidad y rapidez. Muy recomendados.", location: "Naucalpan" },
  { id: 3, name: "Miguel L.", rating: 4, comment: "Las bolsas chunchos quedaron geniales para mi marca.", location: "CDMX" },
  { id: 4, name: "Sofía T.", rating: 5, comment: "El servicio de atención por WhatsApp es de 10.", location: "Puebla" },
  { id: 5, name: "Jorge V.", rating: 5, comment: "Increíble cómo manejan los degradados finos.", location: "CDMX" },
];
