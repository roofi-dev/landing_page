import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsDetailContent from "@/components/NewsDetailContent";
import { getPageContent, getNews, getNewsBySlug } from "@/lib/api";

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

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      <NewsDetailContent article={article} related={related} />

      <Footer content={content.footer} />
    </main>
  );
}
