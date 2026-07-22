"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Share2,
} from "lucide-react";
import type { NewsArticle } from "@/lib/api";
import NewsCard from "./NewsCard";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

interface NewsDetailContentProps {
  article: NewsArticle;
  related: NewsArticle[];
}

const formatDate = (date: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const estimateReadingTime = (content: string | null): string => {
  if (!content) return "1 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

export default function NewsDetailContent({
  article,
  related,
}: NewsDetailContentProps) {
  const contentParagraphs = article.content
    ? article.content.split(/\n\s*\n/).filter((p) => p.trim())
    : [];

  const [shareUrl, setShareUrl] = useState("");
  const shareText = encodeURIComponent(article.title);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const shareLinks = [
    {
      icon: FacebookIcon,
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: TwitterIcon,
      label: "Share on Twitter",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: LinkedinIcon,
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <>
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
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2 text-white/60 text-sm mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/news" className="hover:text-white transition-colors">
              News
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white truncate">{article.category}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            {article.category && (
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-widest text-white uppercase border border-white/20">
                {article.category}
              </span>
            )}
            <div className="flex items-center text-white/60 text-sm">
              <Calendar className="h-4 w-4 mr-1.5" />
              {formatDate(article.published_date)}
            </div>
            <div className="flex items-center text-white/60 text-sm">
              <Clock className="h-4 w-4 mr-1.5" />
              {estimateReadingTime(article.content)}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight font-serif"
          >
            {article.title}
          </motion.h1>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-forest/60 hover:text-forest-light transition-colors mb-12 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/9] rounded-[1.5rem] overflow-hidden shadow-2xl mb-16"
          >
            <img
              src={article.image_url || ""}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            {article.excerpt && (
              <p className="text-forest text-xl md:text-2xl font-medium leading-relaxed font-serif">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-forest/10" />
              <div className="w-2 h-2 rounded-full bg-forest-light/40" />
              <div className="h-px flex-1 bg-forest/10" />
            </div>

            {contentParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`text-forest/70 text-base md:text-lg leading-[1.8] ${
                  i === 0
                    ? "first-letter:text-5xl first-letter:font-bold first-letter:text-forest first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:font-serif"
                    : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Share & Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-16 pt-8 border-t border-forest/10 flex flex-wrap items-center justify-between gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-forest/40" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-forest/40 uppercase">
                  {article.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.3em] text-forest/40 uppercase">
                <Share2 className="h-3.5 w-3.5" />
                Share
              </span>
              <div className="flex items-center gap-2">
                {shareLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="w-9 h-9 rounded-full bg-forest/5 hover:bg-forest-light hover:text-white text-forest/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-20 md:py-28 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-forest/20" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-forest-light uppercase">
                  Continue Reading
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-forest font-serif">
                Related Articles
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rel, i) => (
                <NewsCard key={rel.slug} article={rel} variant="default" index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center mt-14"
            >
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-all duration-300 hover:gap-4 group"
              >
                View All Articles
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
