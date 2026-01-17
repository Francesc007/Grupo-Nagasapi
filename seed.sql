-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  images TEXT[] NOT NULL,
  colors TEXT[] NOT NULL,
  sizes TEXT[] NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  items JSONB NOT NULL,
  total DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert seed products
INSERT INTO products (name, price, category, type, images, colors, sizes, description) VALUES
('Playera Clásica Nagasapi DTF', 250, 'playeras', 'estándar', ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500'], ARRAY['Negro', 'Blanco', 'Rojo', 'Verde'], ARRAY['S', 'M', 'L', 'XL', '2XL', '3XL'], 'Impresión DTF de alta calidad en algodón 100%.'),
('Playera Oversize Premium', 450, 'playeras', 'premium', ARRAY['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500'], ARRAY['Negro', 'Blanco'], ARRAY['M', 'L', 'XL'], 'Corte moderno con impresión DTF tácto cero.'),
('Playera Streetwear CDMX', 350, 'playeras', 'estándar', ARRAY['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=500'], ARRAY['Negro', 'Azul', 'Gris'], ARRAY['S', 'M', 'L', 'XL'], 'Diseño urbano con colores vibrantes.'),
('Playera Deportiva Tech', 300, 'playeras', 'estándar', ARRAY['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500'], ARRAY['Blanco', 'Negro', 'Rojo'], ARRAY['S', 'M', 'L', 'XL'], 'Tela dry-fit con DTF elástico.'),
('Playera Nagasapi Edición Limitada', 600, 'playeras', 'premium', ARRAY['https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500'], ARRAY['Negro'], ARRAY['S', 'M', 'L', 'XL', '2XL'], 'Acabado de lujo con detalles en neón.'),
('Tote Bag Eco Nagasapi', 180, 'bolsas', 'estándar', ARRAY['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500'], ARRAY['Natural', 'Negro'], ARRAY['Única'], 'Bolsa de manta con impresión DTF resistente.'),
('Chuncho Intro Pack (3 piezas)', 450, 'bolsas', 'premium', ARRAY['https://images.unsplash.com/photo-1597484662317-9bd76320f762?q=80&w=500'], ARRAY['Natural'], ARRAY['Única'], 'Pack ecológico para tus compras.'),
('Bolsa Premium La Pinche', 280, 'bolsas', 'premium', ARRAY['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=500'], ARRAY['Negro', 'Verde Neón'], ARRAY['Grande'], 'Diseño exclusivo con mockups realistas.'),
('Mini Chuncho Portable', 120, 'bolsas', 'estándar', ARRAY['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500'], ARRAY['Azul', 'Rojo'], ARRAY['Pequeña'], 'Ideal para accesorios pequeños.'),
('Bolsa de Playa Reforzada', 350, 'bolsas', 'estándar', ARRAY['https://images.unsplash.com/photo-1591348113547-6ad874995971?q=80&w=500'], ARRAY['Blanco', 'Beige'], ARRAY['XL'], 'Soporta hasta 15kg con estilo.'),
('Hoodie Nagasapi Urban', 750, 'hoodies', 'premium', ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500'], ARRAY['Negro', 'Gris Oscuro'], ARRAY['S', 'M', 'L', 'XL'], 'Sudadera premium con DTF de gran formato.'),
('Gorra Snapback Nagasapi', 320, 'hoodies', 'estándar', ARRAY['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500'], ARRAY['Negro/Verde', 'Negro/Rojo'], ARRAY['Ajustable'], 'Visera plana con logo en DTF 3D.'),
('Sudadera Crop-Top', 550, 'hoodies', 'estándar', ARRAY['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500'], ARRAY['Rosa', 'Blanco'], ARRAY['S', 'M', 'L'], 'Corte femenino con impresiones artísticas.'),
('Gorra Trucker Retro', 280, 'hoodies', 'estándar', ARRAY['https://images.unsplash.com/photo-1572427364737-c73179450c7a?q=80&w=500'], ARRAY['Azul/Blanco', 'Negro/Blanco'], ARRAY['Ajustable'], 'Estilo clásico con DTF frontal.'),
('Hoodie Zip-Up Pro', 850, 'hoodies', 'premium', ARRAY['https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=500'], ARRAY['Negro', 'Marino'], ARRAY['M', 'L', 'XL', '2XL'], 'Cierre metálico y DTF en espalda.'),
('Personalizado DTF A4', 200, 'custom', 'estándar', ARRAY['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500'], ARRAY['Cualquiera'], ARRAY['A4'], 'Sube tu diseño y nosotros lo imprimimos.'),
('Hoja DTF Metro Lineal', 650, 'custom', 'premium', ARRAY['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500'], ARRAY['Cualquiera'], ARRAY['60cm x 100cm'], 'Máximo rendimiento para tu negocio.'),
('Kit Emprendedor DTF', 1500, 'custom', 'premium', ARRAY['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500'], ARRAY['Cualquiera'], ARRAY['Varios'], 'Incluye 3 metros de DTF y muestras.'),
('DTF Texturizado Especial', 400, 'custom', 'premium', ARRAY['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500'], ARRAY['Oro', 'Plata', 'Reflejante'], ARRAY['A3'], 'Acabados especiales para diseños únicos.'),
('Parche DTF Termoadhesivo', 80, 'custom', 'estándar', ARRAY['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500'], ARRAY['Multicolor'], ARRAY['10x10cm'], 'Fácil de aplicar con plancha casera.');
