export const CATEGORIES = [
  { id: 'playeras', name: 'Chunchos', description: 'DTF full color', examples: 'Clásica, Oversize', image: '/Un Cafecito.webp' },
  { id: 'bolsas', name: 'La Pinche Bolsa', description: 'Ecológicas personalizadas', examples: 'Tote, Intro pack', image: '/bolsa.png' },
];

export const PRODUCTS = [
  // Playeras DTF (Chunchos) - Colección Cafecito
  {
    id: 1,
    name: "Cafecito de Triciclo",
    price: 250,
    category: "playeras",
    collection: "cafecito",
    type: "estándar",
    images: ["/Un Cafecito.webp"],
    colors: ["Negro", "Blanco", "Café"],
    sizes: ["S", "M", "L", "XL"],
    description: "Un cafecito y una playera pa' llevar."
  },
  {
    id: 2,
    name: "¿Un Cafecito?",
    price: 250,
    category: "playeras",
    collection: "cafecito",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800"],
    colors: ["Blanco", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    description: "Diseño minimalista para amantes del café."
  },
  // Colección CDMX
  {
    id: 3,
    name: "Canta y No Llores",
    price: 210,
    category: "playeras",
    collection: "cdmx",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800"],
    colors: ["Negro", "Azul"],
    sizes: ["S", "M", "L", "XL"],
    description: "Inspirada en el folclore mexicano."
  },
  {
    id: 4,
    name: "Fierro Viejo",
    price: 224,
    category: "playeras",
    collection: "cdmx",
    type: "estándar",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800"],
    colors: ["Blanco", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    description: "El sonido icónico de la ciudad en tu playera."
  },
  // Colección Arte
  {
    id: 5,
    name: "El Grito",
    price: 350,
    category: "playeras",
    collection: "arte",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800"],
    colors: ["Negro"],
    sizes: ["M", "L", "XL"],
    description: "Arte clásico con un toque moderno."
  },
  {
    id: 11,
    name: "La Perla",
    price: 350,
    category: "playeras",
    collection: "arte",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800"],
    colors: ["Blanco"],
    sizes: ["S", "M", "L"],
    description: "Elegancia y arte en cada detalle."
  },
  // La Pinche Bolsa - Favoritos
  {
    id: 6,
    name: "Noche Estrellada",
    price: 150,
    category: "bolsas",
    type: "estándar",
    images: ["/bolsa.png"],
    colors: ["Natural"],
    sizes: ["Única"],
    description: "Bolsa de manta premium con acabado sustentable."
  },
  {
    id: 7,
    name: "Amanecer",
    price: 150,
    category: "bolsas",
    type: "premium",
    images: ["/Amanecer bolsa.png"],
    colors: ["Natural"],
    sizes: ["Única"],
    description: "Inspirada en los colores del alba en la ciudad."
  },
  {
    id: 8,
    name: "Leonardo",
    price: 150,
    category: "bolsas",
    type: "premium",
    images: ["/Leonardo.png"],
    colors: ["Natural"],
    sizes: ["Única"],
    description: "Un toque de arte clásico en tu bolsa diaria."
  },
  {
    id: 9,
    name: "Acrostico",
    price: 150,
    category: "bolsas",
    type: "estándar",
    images: ["/Acrostico bolsa.png"],
    colors: ["Natural"],
    sizes: ["Única"],
    description: "Diseño tipográfico con identidad propia."
  },
  {
    id: 10,
    name: "Autorretrato",
    price: 150,
    category: "bolsas",
    type: "premium",
    images: ["/Autorretrato.png"],
    colors: ["Natural"],
    sizes: ["Única"],
    description: "Expresión pura en cada trazo de loneta."
  },
];

export const REVIEWS = [
  { id: 1, name: "Carlos R.", rating: 5, comment: "¡DTF perfecto en mis playeras! El blanco es súper brillante.", location: "CDMX" },
  { id: 2, name: "Ana M.", rating: 5, comment: "Excelente calidad y rapidez. Muy recomendados.", location: "Naucalpan" },
  { id: 3, name: "Miguel L.", rating: 4, comment: "Las bolsas chunchos quedaron geniales para mi marca.", location: "CDMX" },
  { id: 4, name: "Sofía T.", rating: 5, comment: "El servicio de atención por WhatsApp es de 10.", location: "Puebla" },
  { id: 5, name: "Jorge V.", rating: 5, comment: "Increíble cómo manejan los degradados finos.", location: "CDMX" },
];
