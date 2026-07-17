"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumb?: { label: string; href?: string }[];
}

const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
  breadcrumb,
}: PageHeaderProps) => {
  return (
    <section className="relative min-h-[35vh] md:min-h-[45vh] flex items-center overflow-hidden bg-[#1a1a1a]">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt={title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 z-0 bg-[#1a1a1a]" />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-4 md:space-y-6"
        >
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="flex items-center gap-2 text-white/50 text-xs md:text-sm font-medium tracking-wide">
              {breadcrumb.map((item, i) => (
                <React.Fragment key={i}>
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white transition-colors duration-300">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{item.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <ChevronRight className="h-3 w-3 text-white/20" />
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          <div className="space-y-2 md:space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight font-serif">
              {title}
            </h1>
            <div className="h-1 w-12 md:w-20 bg-amber-gold/80 rounded-full" />
          </div>

          {subtitle && (
            <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed font-light">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-20 hidden md:block">
        <div className="absolute top-1/2 -right-20 w-80 h-80 border border-white/10 rounded-full" />
        <div className="absolute top-1/3 -right-10 w-60 h-60 border border-white/5 rounded-full" />
      </div>
    </section>
  );
};

export default PageHeader;
