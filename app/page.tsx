import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import ReviewCarousel from "@/components/ReviewCarousel";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <CategoryGrid />
      <ProductGrid />
      <ReviewCarousel />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
