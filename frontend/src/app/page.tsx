import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import FloatingGallery from "@/components/FloatingGallery";
import CassavaSection from "@/components/CassavaSection";
import InteractiveCards from "@/components/InteractiveCards";
import WhyGlutenFree from "@/components/WhyGlutenFree";
import FactoryCTA from "@/components/FactoryCTA";
import Footer from "@/components/Footer";
import { getPageContent, getProducts, getRecipes } from "@/lib/api";

export default async function Home() {
  const [content, products, recipes] = await Promise.all([
    getPageContent(),
    getProducts(),
    getRecipes(),
  ]);

  return (
    <main className="min-h-screen bg-white selection:bg-amber-gold/30 selection:text-forest">
      <Navbar content={content.navbar} />
      
      {/* Narrative Flow */}
      <Hero content={content.hero} />
      <IntroSection content={content.intro} />
      <CassavaSection content={content.cassava} />
      
      {/* Content & Lifestyle */}
      <InteractiveCards content={content.interactive_cards} />
      <FloatingGallery content={content.gallery_header} products={products} />
      
      {/* Science & Reason */}
      <WhyGlutenFree content={content.why_gluten_free} />
      
      {/* Authority & Conclusion */}
      <FactoryCTA content={content.factory_cta} />
      <Footer content={content.footer} />
    </main>
  );
}
