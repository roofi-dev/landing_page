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
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-forest">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt={title}
            className="w-full h-full object-cover brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/80" />
        </div>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-forest via-[#0a3d1f] to-forest" />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="flex items-center justify-center gap-2 text-white/60 text-sm">
              {breadcrumb.map((item, i) => (
                <React.Fragment key={i}>
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white">{item.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <ChevronRight className="h-3 w-3 text-white/40" />
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight uppercase">
            {title}
          </h1>

          {subtitle && (
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
