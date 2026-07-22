import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import { getPageContent } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us — Ladang Lima",
  description: "Discover the story behind Ladang Lima, Indonesia's pioneer of gluten-free cassava-based food products since 2013.",
};

export default async function AboutPage() {
  const content = await getPageContent();
  const h = content.about_header || {};
  const s = content.about_story || {};
  const v = content.about_values || {};
  const t = content.about_timeline || {};

  const coreValues = (v.values && v.values.length > 0 ? v.values : [
    { title: "Productive", description: "Consistently producing work, performance, and solutions of high value and meaningful impact." },
    { title: "Proactive", description: "Taking action before problems arise and always showing initiative." },
    { title: "Professional", description: "Working with competence, responsibility, and high ethical standards." },
    { title: "Progressive", description: "Continuously growing, innovating, and staying forward-oriented." },
  ]).map((val: any, i: number) => ({
    ...val,
    num: (i + 1).toString().padStart(2, "0")
  }));

  const timelineItems = t.timeline && t.timeline.length > 0 ? t.timeline : [
    { year: "2013", title: "The Beginning", description: "Ladang Lima was founded with a vision to revolutionize gluten-free food in Indonesia." },
    { year: "2015", title: "Mocaf Innovation", description: "Developed our signature mocaf flour with characteristics similar to wheat flour." },
    { year: "2018", title: "Product Expansion", description: "Expanded from flour to pasta, noodles, cookies, and cake mixes." },
    { year: "2020", title: "National Reach", description: "Products available across Indonesia through major online and offline retailers." },
    { year: "2024", title: "Feeding the Future", description: "Continuing to innovate sustainable, healthy food for generations to come." },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <Navbar content={content.navbar} />
      <AboutContent
        h={h}
        s={s}
        v={v}
        t={t}
        coreValues={coreValues}
        timelineItems={timelineItems}
      />
      <Footer content={content.footer} />
    </main>
  );
}
