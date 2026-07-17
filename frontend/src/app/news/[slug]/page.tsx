import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPageContent, getNews, getNewsBySlug } from "@/lib/api";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Article Not Found — Ladang Lima" };
  return {
    title: `${article.title} — Ladang Lima`,
    description: article.excerpt || "",
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getPageContent();
  const article = await getNewsBySlug(slug);

  if (!article) notFound();

  const allArticles = await getNews();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  const fallbackRelated = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const related = relatedArticles.length > 0 ? relatedArticles : fallbackRelated;

  const contentParagraphs = article.content
    ? article.content.split(/\n\s*\n/).filter((p) => p.trim())
    : [];

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      {/* Article Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0">
          <img
            src={article.image_url || ""}
            alt={article.title}
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/news" className="hover:text-white transition-colors">News</Link>
            <span className="text-white/30">/</span>
            <span className="text-white truncate">{article.category}</span>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-widest text-white uppercase border border-white/20">
              {article.category}
            </span>
            <div className="flex items-center text-white/60 text-sm">
              <Calendar className="h-4 w-4 mr-1.5" />
              {article.published_date
                ? new Date(article.published_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-forest/60 hover:text-[#4a7c59] transition-colors mb-12 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-16">
            <img src={article.image_url || ""} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <p className="text-forest text-xl md:text-2xl font-medium leading-relaxed">
              {article.excerpt}
            </p>

            <div className="h-px w-full bg-forest/10" />

            {contentParagraphs.map((paragraph, i) => (
              <p key={i} className="text-forest/70 text-base md:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share & Tags */}
          <div className="mt-16 pt-8 border-t border-forest/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-forest/40" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-forest/40 uppercase">
                {article.category}
              </span>
            </div>
            <Link
              href="/news"
              className="text-[10px] font-bold tracking-[0.3em] text-[#4a7c59] uppercase hover:text-forest transition-colors"
            >
              More Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-20 md:py-28 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-px bg-forest/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#4a7c59] uppercase">
                Continue Reading
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/news/${rel.slug}`}
                  className="group flex flex-col"
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                    <img
                      src={rel.image_url || ""}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center text-forest/40 text-xs mb-3">
                    <Calendar className="h-3 w-3 mr-1.5" />
                    {rel.published_date
                      ? new Date(rel.published_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </div>
                  <h3 className="text-lg font-bold text-forest group-hover:text-[#4a7c59] transition-colors leading-tight mb-2">
                    {rel.title}
                  </h3>
                  <p className="text-forest/60 text-sm line-clamp-2 mb-4">{rel.excerpt}</p>
                  <div className="flex items-center text-[#4a7c59] font-bold text-xs tracking-widest uppercase group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer content={content.footer} />
    </main>
  );
}
