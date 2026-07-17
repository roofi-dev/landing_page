import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getPageContent, getNews } from "@/lib/api";
import { ArrowRight, Calendar } from "lucide-react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={article.image_url || ""}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-forest uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-forest/40 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {article.published_date
                      ? new Date(article.published_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </div>
                  <h3 className="text-lg font-bold text-forest mb-3 group-hover:text-[#4a7c59] transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-forest/60 text-sm mb-4 line-clamp-2 flex-1">{article.excerpt}</p>
                  <div className="flex items-center text-[#4a7c59] font-bold text-sm group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-forest/40 text-lg">No articles available yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer content={content.footer} />
    </main>
  );
}
