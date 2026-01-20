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
    colors: ["Negro", "Blanco", "Café", "Azul", "Rojo", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    description: "Un cafecito y una playera pa' llevar."
  },
  {
    id: 2,
    name: "Noticias",
    price: 250,
    category: "playeras",
    collection: "cafecito",
    type: "estándar",
    images: ["/Noticias.webp"],
    colors: ["Blanco", "Negro", "Café", "Azul", "Rojo", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    description: "Diseño inspirado en la prensa clásica."
  },
  {
    id: 12,
    name: "Papel Picado",
    price: 250,
    category: "playeras",
    collection: "cafecito",
    type: "estándar",
    images: ["/PapelPicado.webp"],
    colors: ["Blanco", "Negro", "Multicolor", "Café", "Azul", "Rojo", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    description: "El folclore mexicano en cada detalle."
  },
  // Colección CDMX
  {
    id: 3,
    name: "Canta y No Llores",
    price: 250,
    category: "playeras",
    collection: "cdmx",
    type: "estándar",
    images: ["/CantayNoLlores.webp"],
    colors: ["Negro", "Azul", "Blanco", "Café", "Rojo", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    description: "Inspirada en el folclore mexicano."
  },
  {
    id: 4,
    name: "Fierro Viejo",
    price: 250,
    category: "playeras",
    collection: "cdmx",
    type: "estándar",
    images: ["/FierroViejo.webp"],
    colors: ["Blanco", "Gris", "Negro", "Café", "Azul", "Rojo"],
    sizes: ["S", "M", "L", "XL"],
    description: "El sonido icónico de la ciudad en tu playera."
  },
  {
    id: 13,
    name: "CDMX Rojo",
    price: 250,
    category: "playeras",
    collection: "cdmx",
    type: "estándar",
    images: ["/CDMX rojo.webp"],
    colors: ["Rojo", "Blanco", "Negro", "Café", "Azul", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    description: "Pasión por la ciudad en cada fibra."
  },
  // Colección Arte
  {
    id: 5,
    name: "El Grito",
    price: 350,
    category: "playeras",
    collection: "arte",
    type: "premium",
    images: ["/El_Grito.webp"],
    colors: ["Negro", "Blanco", "Café", "Azul", "Rojo", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    description: "Arte clásico con un toque moderno."
  },
  {
    id: 11,
    name: "La Perla",
    price: 350,
    category: "playeras",
    collection: "arte",
    type: "premium",
    images: ["/LaPerla.webp"],
    colors: ["Blanco", "Negro", "Café", "Azul", "Rojo", "Gris"],
    sizes: ["S", "M", "L", "XL"],
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
  { 
    id: 1, 
    name: "Carlos R.", 
    rating: 5, 
    comment: "¡DTF perfecto en mis playeras! El blanco es súper brillante.", 
    location: "CDMX",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    id: 2, 
    name: "Ana M.", 
    rating: 5, 
    comment: "Excelente calidad y rapidez. Muy recomendados.", 
    location: "Naucalpan",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    id: 3, 
    name: "Miguel L.", 
    rating: 4, 
    comment: "Las bolsas chunchos quedaron geniales para mi marca.", 
    location: "CDMX",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    id: 4, 
    name: "Sofía T.", 
    rating: 5, 
    comment: "El servicio de atención por WhatsApp es de 10.", 
    location: "Puebla",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    id: 5, 
    name: "Jorge V.", 
    rating: 5, 
    comment: "Increíble cómo manejan los degradados finos.", 
    location: "CDMX",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  },
];
