import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getPageContent, getProducts, getProductBySlug } from "@/lib/api";
import { ArrowLeft, ShoppingBag, Leaf, CheckCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — Ladang Lima" };
  return {
    title: `${product.name} — Ladang Lima`,
    description: product.description || "Ladang Lima gluten-free product",
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [content, product] = await Promise.all([
    getPageContent(),
    getProductBySlug(slug),
  ]);

  if (!product) notFound();

  const relatedProducts = (await getProducts())
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const image = product.image_url || "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      <PageHeader
        title={product.name}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-forest/60 hover:text-[#6b9b7e] transition-colors mb-12 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img src={image} alt={product.name} className="w-full h-full object-cover" />
              {product.is_new && (
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-[#6b9b7e] text-white rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
                    New Arrival
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                {product.category && (
                  <span className="text-[10px] font-bold tracking-[0.4em] text-[#6b9b7e] uppercase">
                    {product.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-5xl font-bold text-forest leading-tight">{product.name}</h1>
                {product.description && (
                  <p className="text-forest/70 text-lg leading-relaxed">{product.description}</p>
                )}
              </div>

              {product.ingredients && (
                <div className="space-y-3 p-6 rounded-2xl bg-white border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-[#6b9b7e]" />
                    <h3 className="font-bold text-forest">Ingredients</h3>
                  </div>
                  <p className="text-forest/60 text-sm leading-relaxed">{product.ingredients}</p>
                </div>
              )}

              {product.nutritional_info && (
                <div className="space-y-3 p-6 rounded-2xl bg-white border border-gray-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#6b9b7e]" />
                    <h3 className="font-bold text-forest">Nutritional Information</h3>
                  </div>
                  <p className="text-forest/60 text-sm leading-relaxed whitespace-pre-line">{product.nutritional_info}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="inline-flex items-center gap-2 px-8 py-3 bg-forest text-white rounded-xl font-bold hover:bg-[#6b9b7e] transition-all active:scale-95">
                  <ShoppingBag className="h-5 w-5" />
                  Buy Now
                </button>
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-3 border border-forest/20 text-forest rounded-xl font-bold hover:bg-forest/5 transition-all"
                >
                  Browse More
                </Link>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl md:text-3xl font-bold text-forest mb-8">Related Products</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/products/${rp.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={rp.image_url || "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-forest text-sm group-hover:text-[#6b9b7e] transition-colors">{rp.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer content={content.footer} />
    </main>
  );
}
