import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ProductZigZag from "@/components/ProductZigZag";
import { getPageContent, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Products — Ladang Lima",
  description: "Explore Ladang Lima's full range of gluten-free cassava-based food products.",
};

export default async function ProductsPage() {
  const [content, products] = await Promise.all([
    getPageContent(),
    getProducts(),
  ]);

  const h = content.products_header || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      <PageHeader
        title={h.title_line1 && h.title_line2 ? `${h.title_line1} ${h.title_line2}` : "Our Products"}
        subtitle={h.description || "Gluten-free goodness for everyone. Explore our full range of cassava-based food products."}
        backgroundImage={h.background_image || "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Products" }]}
      />

      {products.length === 0 ? (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center py-24">
            <p className="text-forest/50 text-lg">No products available yet. Please check back soon.</p>
          </div>
        </section>
      ) : (
        <ProductZigZag products={products} content={h} />
      )}

      <Footer content={content.footer} />
    </main>
  );
}
