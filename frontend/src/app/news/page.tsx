import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import NewsGrid from "@/components/NewsGrid";
import { getPageContent, getNews } from "@/lib/api";

export const metadata: Metadata = {
  title: "News — Ladang Lima",
  description: "Latest news, articles, and updates from Ladang Lima.",
};

export default async function NewsPage() {
  const content = await getPageContent();
  const h = content.news_header || {};
  const articles = await getNews();

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      <PageHeader
        title={h.title || "News"}
        subtitle={h.subtitle || "Latest articles, health tips, and updates from the world of Ladang Lima."}
        backgroundImage={h.background_image || "https://images.unsplash.com/photo-1490645935967-10de6d17062e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <NewsGrid articles={articles} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-28 bg-forest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-10 hidden md:block">
          <div className="absolute top-1/2 -right-20 w-80 h-80 border border-white/20 rounded-full" />
          <div className="absolute top-1/3 -right-10 w-60 h-60 border border-white/10 rounded-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-forest-light/40" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-forest-light uppercase">
              Stay Connected
            </span>
            <div className="w-12 h-px bg-forest-light/40" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5 font-serif">
            Never miss a story from Ladang Lima
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-light">
            Get the latest articles, health tips, and updates delivered straight to your inbox.
          </p>
        </div>
      </section>

      <Footer content={content.footer} />
    </main>
  );
}
