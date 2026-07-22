"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import type { NewsArticle } from "@/lib/api";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "featured" | "horizontal" | "compact" | "default";
  index?: number;
}

const formatDate = (date: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1490645935967-10de6d17062e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

export default function NewsCard({
  article,
  variant = "default",
  index = 0,
}: NewsCardProps) {
  const image = article.image_url || FALLBACK_IMAGE;

  /* ── Featured: large hero card with image overlay ── */
  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-2 md:row-span-2"
      >
        <Link
          href={`/news/${article.slug}`}
          className="group relative block rounded-[1.5rem] overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 aspect-[16/11] md:aspect-auto md:h-full md:min-h-[480px]"
        >
          <img
            src={image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="flex items-center gap-3 mb-5">
              {article.category && (
                <span className="px-3.5 py-1.5 bg-forest-light text-white rounded-full text-[10px] font-bold uppercase tracking-[0.15em]">
                  {article.category}
                </span>
              )}
              <div className="flex items-center text-white/70 text-xs">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {formatDate(article.published_date)}
              </div>
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4 max-w-2xl font-serif">
              {article.title}
            </h2>

            {article.excerpt && (
              <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-xl mb-6 line-clamp-2 font-light">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-4 transition-all duration-300">
              <span className="border-b border-white/30 group-hover:border-white pb-0.5">
                Read Article
              </span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  /* ── Horizontal: image left, content right ── */
  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: Math.min(index * 0.08, 0.4),
        }}
      >
        <Link
          href={`/news/${article.slug}`}
          className="group flex flex-col sm:flex-row gap-5 bg-white rounded-[1.5rem] overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
        >
          <div className="sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden relative shrink-0">
            <img
              src={image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {article.category && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-forest uppercase tracking-[0.12em] shadow-sm">
                  {article.category}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 flex-1">
            <div className="flex items-center text-forest/40 text-xs mb-3">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {formatDate(article.published_date)}
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-forest mb-3 group-hover:text-forest-light transition-colors duration-300 leading-snug font-serif">
              {article.title}
            </h3>

            {article.excerpt && (
              <p className="text-forest/55 text-sm mb-5 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center text-forest-light font-semibold text-xs tracking-wider uppercase group-hover:gap-3 transition-all duration-300">
              Read More
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  /* ── Compact: small card for sidebars / related ── */
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
          delay: Math.min(index * 0.06, 0.3),
        }}
      >
        <Link
          href={`/news/${article.slug}`}
          className="group flex gap-4 items-start"
        >
          <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
            <img
              src={image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center text-forest/40 text-[11px] mb-1.5">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(article.published_date)}
            </div>
            <h4 className="text-sm font-bold text-forest group-hover:text-forest-light transition-colors leading-snug line-clamp-2 font-serif">
              {article.title}
            </h4>
          </div>
        </Link>
      </motion.div>
    );
  }

  /* ── Default: standard vertical card ── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.08, 0.4),
      }}
    >
      <Link
        href={`/news/${article.slug}`}
        className="group bg-white rounded-[1.5rem] overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col h-full hover:-translate-y-1"
      >
        <div className="aspect-[16/10] overflow-hidden relative">
          <img
            src={image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {article.category && (
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-forest uppercase tracking-[0.12em] shadow-sm">
                {article.category}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center text-forest/40 text-xs mb-3">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            {formatDate(article.published_date)}
          </div>

          <h3 className="text-lg font-bold text-forest mb-3 group-hover:text-forest-light transition-colors duration-300 leading-snug font-serif">
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="text-forest/55 text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center text-forest-light font-semibold text-xs tracking-wider uppercase group-hover:gap-3 transition-all duration-300">
            Read More
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
