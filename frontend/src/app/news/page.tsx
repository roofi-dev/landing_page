import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getPageContent } from "@/lib/api";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "News — Ladang Lima",
  description: "Latest news, articles, and updates from Ladang Lima.",
};

const newsArticles = [
  {
    slug: "benefits-of-gluten-free-diet",
    title: "5 Benefits of a Gluten-Free Diet You Should Know",
    excerpt: "Discover how going gluten-free can improve your digestion, energy levels, and overall wellbeing.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6d17062e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-06-15",
    category: "Health Tips",
  },
  {
    slug: "cassava-the-superfood",
    title: "Cassava: The Superfood Powering Ladang Lima",
    excerpt: "Learn why cassava is considered one of the most versatile and nutritious root vegetables in the world.",
    image: "https://images.unsplash.com/photo-1605498335749-7633d50e5791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-06-10",
    category: "Ingredients",
  },
  {
    slug: "sustainable-farming-practices",
    title: "Our Commitment to Sustainable Farming Practices",
    excerpt: "How Ladang Lima works with local farmers to promote sustainable agriculture and protect the environment.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ab4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-06-05",
    category: "Sustainability",
  },
  {
    slug: "new-product-launch-2024",
    title: "Introducing Our New Cassava Pasta Line",
    excerpt: "We're excited to launch our newest product — 100% cassava pasta, now available in three varieties.",
    image: "https://images.unsplash.com/photo-1551462147-3a8823c819f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-05-28",
    category: "Product News",
  },
  {
    slug: "gluten-free-baking-tips",
    title: "10 Tips for Perfect Gluten-Free Baking",
    excerpt: "Master the art of gluten-free baking with these expert tips from our Ladang Lima kitchen.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-05-20",
    category: "Baking Tips",
  },
  {
    slug: "partnering-with-farmers",
    title: "Partnering with Local Farmers for a Better Future",
    excerpt: "Our farmer partnership program empowers local communities while ensuring the highest quality cassava.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-05-15",
    category: "Community",
  },
];

export default async function NewsPage() {
  const content = await getPageContent();
  const h = content.news_header || {};

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
            {newsArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={article.image}
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
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
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
        </div>
      </section>

      <Footer content={content.footer} />
    </main>
  );
}
