import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Grupo Nagasapi | Transferencias DTF Personalizadas en CDMX",
  description: "Imprime cualquier diseño en cualquier producto con DTF Transfers. Calidad alta, blanco brillante, degradados y líneas finas para tu marca.",
  keywords: ["DTF", "Transferencias", "Personalización", "CDMX", "Playeras", "Bolsas", "Chunchos"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background`} suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
