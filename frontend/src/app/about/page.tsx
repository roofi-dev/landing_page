import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getPageContent } from "@/lib/api";
import { Leaf, Heart, Globe, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Ladang Lima",
  description: "Discover the story behind Ladang Lima, Indonesia's pioneer of gluten-free cassava-based food products since 2013.",
};

const values = [
  {
    icon: Leaf,
    title: "Natural & Sustainable",
    description: "We harness the power of cassava, a traditional Indonesian staple, to create food that's good for you and the planet.",
  },
  {
    icon: Heart,
    title: "Health First",
    description: "Every product is crafted with your wellbeing in mind — gluten-free, egg-free, and free from junk.",
  },
  {
    icon: Globe,
    title: "Earth Friendly",
    description: "We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Our mocaf flour matches wheat flour characteristics, enabling seamless gluten-free baking without compromise.",
  },
];

const timeline = [
  { year: "2013", title: "The Beginning", description: "Ladang Lima was founded with a vision to revolutionize gluten-free food in Indonesia." },
  { year: "2015", title: "Mocaf Innovation", description: "Developed our signature mocaf flour with characteristics similar to wheat flour." },
  { year: "2018", title: "Product Expansion", description: "Expanded from flour to pasta, noodles, cookies, and cake mixes." },
  { year: "2020", title: "National Reach", description: "Products available across Indonesia through major online and offline retailers." },
  { year: "2024", title: "Feeding the Future", description: "Continuing to innovate sustainable, healthy food for generations to come." },
];

export default async function AboutPage() {
  const content = await getPageContent();
  const h = content.about_header || {};
  const s = content.about_story || {};
  const v = content.about_values || {};
  const t = content.about_timeline || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      <PageHeader
        title={h.title || "About Us"}
        subtitle={h.subtitle || "Indonesia's pioneer of gluten-free food products since 2013. We feed the future with nature's wisdom."}
        backgroundImage={h.background_image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={s.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                  alt={s.image_alt || "Ladang Lima Heritage"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-forest/10 mix-blend-multiply" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#4a7c59] uppercase">{s.label || "Our Story"}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-forest leading-tight">
                {s.title_line1 || "From Traditional Roots to"} <span className="italic text-[#4a7c59]">{s.title_line2 || "Modern Wellness"}</span>
              </h2>
              <p className="text-forest/70 text-lg leading-relaxed">
                {s.description_1 || "Our journey began with a simple yet profound realization: the future of food lies in our roots. We rediscovered the potential of cassava, a traditional staple, and transformed it into a modern foundation for health."}
              </p>
              <p className="text-forest/60 text-base leading-relaxed">
                {s.description_2 || "Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle. We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious. From pasta and pastry to delightful cakes, our ecosystem of products redefines what healthy living looks like."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#4a7c59] uppercase">{v.label || "What We Stand For"}</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-forest">{v.title || "Our Core Values"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="space-y-4 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-[#4a7c59]" />
                </div>
                <h3 className="text-lg font-bold text-forest">{value.title}</h3>
                <p className="text-forest/60 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#4a7c59] uppercase">{t.label || "Our Journey"}</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-forest">{t.title || "Milestones"}</h2>
          </div>
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-forest text-white flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-[#4a7c59] transition-colors">
                    {item.year}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px h-full bg-forest/10 mt-4" />
                  )}
                </div>
                <div className="pb-12 space-y-2">
                  <h3 className="text-xl font-bold text-forest">{item.title}</h3>
                  <p className="text-forest/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer content={content.footer} />
    </main>
  );
}
