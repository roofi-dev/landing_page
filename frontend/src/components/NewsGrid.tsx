"use client";

import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import type { NewsArticle } from "@/lib/api";

interface NewsGridProps {
  articles: NewsArticle[];
}

export default function NewsGrid({ articles }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest/5 mb-6">
          <span className="text-2xl font-serif text-forest/30">N</span>
        </div>
        <p className="text-forest/40 text-lg font-light">
          No articles available yet.
        </p>
        <p className="text-forest/30 text-sm mt-2">
          Please check back soon for the latest updates.
        </p>
      </div>
    );
  }

  /* ── Single article: full-width horizontal ── */
  if (articles.length === 1) {
    return (
      <div>
        <SectionLabel label="Featured Story" />
        <NewsCard article={articles[0]} variant="horizontal" />
      </div>
    );
  }

  /* ── 2 articles: featured + horizontal ── */
  if (articles.length === 2) {
    return (
      <div className="space-y-8">
        <div>
          <SectionLabel label="Featured Story" />
          <NewsCard article={articles[0]} variant="featured" />
        </div>
        <div>
          <SectionLabel label="Latest Articles" className="mt-10 mb-6" />
          <NewsCard article={articles[1]} variant="horizontal" index={1} />
        </div>
      </div>
    );
  }

  /* ── 3+ articles: magazine bento layout ── */
  const [featured, second, third, ...rest] = articles;

  return (
    <div className="space-y-12">
      {/* Featured + sidebar */}
      <div>
        <SectionLabel label="Featured Story" className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-auto">
          <NewsCard article={featured} variant="featured" />
          <div className="flex flex-col gap-6">
            <NewsCard article={second} variant="default" index={1} />
            <NewsCard article={third} variant="default" index={2} />
          </div>
        </div>
      </div>

      {/* Horizontal cards for next tier */}
      {rest.length > 0 && (
        <div>
          <SectionLabel label="More Articles" className="mb-8" />
          <div className="space-y-6">
            {rest.slice(0, 2).map((article, i) => (
              <NewsCard
                key={article.slug}
                article={article}
                variant="horizontal"
                index={i}
              />
            ))}
          </div>
        </div>
      )}

      {/* Remaining as compact grid */}
      {rest.length > 2 && (
        <div>
          <SectionLabel label="All Stories" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.slice(2).map((article, i) => (
              <NewsCard
                key={article.slug}
                article={article}
                variant="default"
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`flex items-center gap-3 ${className}`}
    >
      <div className="w-12 h-px bg-forest/20" />
      <span className="text-[10px] font-bold tracking-[0.4em] text-forest-light uppercase">
        {label}
      </span>
    </motion.div>
  );
}
