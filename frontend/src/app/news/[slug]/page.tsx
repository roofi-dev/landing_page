import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPageContent } from "@/lib/api";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";

const newsArticles: Record<string, {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  content: string[];
}> = {
  "benefits-of-gluten-free-diet": {
    slug: "benefits-of-gluten-free-diet",
    title: "5 Benefits of a Gluten-Free Diet You Should Know",
    excerpt: "Discover how going gluten-free can improve your digestion, energy levels, and overall wellbeing.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6d17062e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    date: "2024-06-15",
    category: "Health Tips",
    content: [
      "For many people, going gluten-free isn't just a dietary choice — it's a life-changing decision. Whether you have celiac disease, gluten sensitivity, or simply want to explore a healthier lifestyle, understanding the benefits can help you make an informed choice.",
      "Improved digestion is one of the most immediate benefits people notice. Gluten can cause inflammation in the gut for sensitive individuals, leading to bloating, gas, and discomfort. By switching to gluten-free alternatives like cassava flour, many people report feeling lighter and more comfortable after meals.",
      "Sustained energy levels are another significant advantage. Gluten-containing foods, especially refined wheat products, can cause rapid blood sugar spikes followed by crashes. Gluten-free alternatives made from whole foods like cassava provide a steadier release of energy throughout the day.",
      "Better skin health is often reported by those who eliminate gluten. The connection between gut health and skin is well-documented — when your digestive system is happy, your skin tends to reflect that with a natural, healthy glow.",
      "Finally, going gluten-free encourages a more mindful approach to eating. You become more aware of ingredients, more intentional about your food choices, and more connected to what you put into your body. At Ladang Lima, we believe this mindfulness is the foundation of a healthier life.",
    ],
  },
  "cassava-the-superfood": {
    slug: "cassava-the-superfood",
    title: "Cassava: The Superfood Powering Ladang Lima",
    excerpt: "Learn why cassava is considered one of the most versatile and nutritious root vegetables in the world.",
    image: "https://images.unsplash.com/photo-1605498335749-7633d50e5791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    date: "2024-06-10",
    category: "Ingredients",
    content: [
      "Cassava has been a staple food in Indonesia for centuries, but only recently has the world begun to recognize its extraordinary potential. This humble root vegetable is the foundation of everything we create at Ladang Lima.",
      "Naturally gluten-free, cassava is a safe and nutritious alternative for those with celiac disease or gluten sensitivity. Unlike wheat, it contains no gluten proteins, making it ideal for people who need to avoid gluten in their diet.",
      "Rich in carbohydrates and fiber, cassava provides sustained energy without the blood sugar spikes associated with refined grains. It's also a good source of vitamin C, folate, and essential minerals like magnesium and potassium.",
      "What makes cassava truly special is its versatility. Through fermentation, it becomes mocaf — a flour with characteristics remarkably similar to wheat flour. This means you can bake cakes, make pasta, create cookies, and cook noodles without compromising on taste or texture.",
      "At Ladang Lima, we've spent over a decade perfecting the art of cassava processing. Our mocaf flour matches wheat flour characteristics, enabling seamless gluten-free baking without compromise. This is why we call cassava the superfood of the future.",
    ],
  },
  "sustainable-farming-practices": {
    slug: "sustainable-farming-practices",
    title: "Our Commitment to Sustainable Farming Practices",
    excerpt: "How Ladang Lima works with local farmers to promote sustainable agriculture and protect the environment.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ab4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    date: "2024-06-05",
    category: "Sustainability",
    content: [
      "Sustainability isn't just a buzzword for us — it's woven into every decision we make. From the farms where our cassava grows to the factories where our products are crafted, we're committed to practices that protect the earth.",
      "We work directly with local Indonesian farmers, ensuring fair prices and long-term partnerships. This approach not only supports rural communities but also guarantees the highest quality cassava for our products.",
      "Cassava is naturally drought-resistant and grows well in Indonesian soil without requiring excessive water or chemical fertilizers. This makes it one of the most environmentally friendly crops available, requiring minimal resources while delivering maximum nutrition.",
      "We tackle five major agriculture issues through our sustainable practices: soil degradation, water conservation, chemical reduction, biodiversity loss, and farmer welfare. Each of these is addressed through specific initiatives in our supply chain.",
      "Our goal is simple: to create food that nourishes both people and the planet. Every product you enjoy from Ladang Lima represents a chain of conscious decisions — from farm to table — that prioritize sustainability at every step.",
    ],
  },
  "new-product-launch-2024": {
    slug: "new-product-launch-2024",
    title: "Introducing Our New Cassava Pasta Line",
    excerpt: "We're excited to launch our newest product — 100% cassava pasta, now available in three varieties.",
    image: "https://images.unsplash.com/photo-1551462147-3a8823c819f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    date: "2024-05-28",
    category: "Product News",
    content: [
      "We're thrilled to announce the launch of our new cassava pasta line — a breakthrough in gluten-free pasta that doesn't compromise on taste, texture, or nutrition. Available in three varieties: penne, spaghetti, and fusilli.",
      "Our cassava pasta is made from 100% premium mocaf flour, created through our signature fermentation process. This gives the pasta a texture and bite that's remarkably similar to traditional wheat pasta — something that has been difficult to achieve in gluten-free products until now.",
      "Each variety has been carefully tested with home cooks and professional chefs alike. The result is a pasta that holds sauce beautifully, maintains its shape when cooked al dente, and delivers a satisfying, authentic pasta experience.",
      "Like all Ladang Lima products, our cassava pasta is gluten-free, egg-free, and made without artificial preservatives. It's also rich in fiber, making it not just a safe alternative but a genuinely healthier choice for the whole family.",
      "The new pasta line is now available through our official online stores on Tokopedia, Shopee, and select retail partners nationwide. Try it today and discover what gluten-free pasta should taste like.",
    ],
  },
  "gluten-free-baking-tips": {
    slug: "gluten-free-baking-tips",
    title: "10 Tips for Perfect Gluten-Free Baking",
    excerpt: "Master the art of gluten-free baking with these expert tips from our Ladang Lima kitchen.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    date: "2024-05-20",
    category: "Baking Tips",
    content: [
      "Gluten-free baking can feel intimidating at first, but with the right techniques and ingredients, you can create baked goods that are just as delicious — if not better — than their wheat-based counterparts.",
      "Tip 1: Always use a quality gluten-free flour. Our mocaf flour is designed to mimic wheat flour characteristics, making it the easiest substitution for traditional recipes. Measure by weight for best results.",
      "Tip 2: Let your batter rest. Gluten-free flours need more time to absorb liquids. Letting your batter rest for 15-30 minutes before baking improves texture significantly.",
      "Tip 3: Add extra moisture. Gluten-free baked goods tend to dry out faster. Adding a bit more fat (butter, oil) or an extra egg can keep your cakes and cookies moist and tender.",
      "Tip 4: Don't overmix. While gluten-free batters don't develop gluten, overmixing can still create dense, heavy textures. Mix until just combined for the lightest results. And remember — practice makes perfect. Every oven is different, so don't be afraid to experiment and adjust.",
    ],
  },
  "partnering-with-farmers": {
    slug: "partnering-with-farmers",
    title: "Partnering with Local Farmers for a Better Future",
    excerpt: "Our farmer partnership program empowers local communities while ensuring the highest quality cassava.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    date: "2024-05-15",
    category: "Community",
    content: [
      "Behind every Ladang Lima product is a network of dedicated farmers who grow our cassava with care and expertise. Our farmer partnership program is the heart of our supply chain — and one of our proudest achievements.",
      "We work with farmers across East Java, providing them with training, resources, and fair pricing. This ensures that our cassava is grown to the highest standards while supporting the livelihoods of the families who grow it.",
      "Our partnerships are built on trust and long-term commitment. We don't just buy cassava — we invest in the communities that produce it. This includes education programs, sustainable farming training, and infrastructure support.",
      "The result is a supply chain that benefits everyone. Farmers get stable income and professional development. We get premium quality cassava grown with care. And our customers get products they can feel good about — from farm to table.",
      "When you choose Ladang Lima, you're not just choosing healthy food. You're supporting a model of business that puts people and planet first. That's the future we're building, one partnership at a time.",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles[slug];
  if (!article) return { title: "Article Not Found — Ladang Lima" };
  return {
    title: `${article.title} — Ladang Lima`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getPageContent();
  const article = newsArticles[slug];

  if (!article) notFound();

  const relatedArticles = Object.values(newsArticles)
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  const fallbackRelated = Object.values(newsArticles)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const related = relatedArticles.length > 0 ? relatedArticles : fallbackRelated;

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      {/* Article Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0">
          <img
            src={article.image}
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
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <p className="text-forest text-xl md:text-2xl font-medium leading-relaxed">
              {article.excerpt}
            </p>

            <div className="h-px w-full bg-forest/10" />

            {article.content.map((paragraph, i) => (
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
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center text-forest/40 text-xs mb-3">
                    <Calendar className="h-3 w-3 mr-1.5" />
                    {new Date(rel.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
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
