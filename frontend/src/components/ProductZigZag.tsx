"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/api";

const TAB_CONFIG = [
  { label: "Gluten-Free Flour", short: "Flour", keywords: ["Flour", "Baking Essentials", "Special Flour"] },
  { label: "Gluten-Free Cookies", short: "Cookies", keywords: ["Cookies", "Superfood Cookies"] },
  { label: "Gluten-Free Noodle", short: "Noodle", keywords: ["Noodle", "Healthy Noodle"] },
  { label: "Gluten-Free Pasta", short: "Pasta", keywords: ["Pasta", "Pantry"] },
];

interface ProductZigZagProps {
  products: Product[];
  content?: any;
}

const ProductZigZag = ({ products, content }: ProductZigZagProps) => {
  const [activeCategory, setActiveCategory] = useState(TAB_CONFIG[0].label);

  const filteredProducts = useMemo(() => {
    const config = TAB_CONFIG.find((t) => t.label === activeCategory);
    const targetCats = config?.keywords || [activeCategory];

    return products.filter((p) => {
      if (!p.category) return false;
      return targetCats.some((tc) =>
        p.category?.toLowerCase().includes(tc.toLowerCase())
      );
    });
  }, [products, activeCategory]);

  return (
    <section className="py-20 md:py-24 bg-[#FDFCFB] relative" id="our-products">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-[#6b9b7e]/30" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-[#6b9b7e]">
              Ladang Lima Collection
            </span>
            <div className="h-px w-8 bg-[#6b9b7e]/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-sans font-bold text-forest tracking-tight leading-[1.1]"
          >
            {content?.title || "Our Product"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-[#64748b] max-w-2xl mx-auto text-base md:text-base leading-[1.6]"
          >
            {content?.description ||
              "We also produce several derivative products such as healthy vegetable noodles, premix flour, all-purpose seasoning flour, gluten-free cookies and pasta."}
          </motion.p>
        </div>

        {/* Tabs — Pill style with sliding indicator */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1 p-1 bg-white rounded-full shadow-[0_2px_8px_rgba(5,46,22,0.04)] border border-[rgba(5,46,22,0.05)]">
            {TAB_CONFIG.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveCategory(tab.label)}
                className={cn(
                  "relative px-4 md:px-7 py-2.5 text-xs md:text-sm font-sans font-semibold transition-colors duration-300 rounded-full z-10",
                  activeCategory === tab.label
                    ? "text-white"
                    : "text-[#64748b] hover:text-forest"
                )}
              >
                {activeCategory === tab.label && (
                  <motion.div
                    layoutId="pillTab"
                    className="absolute inset-0 bg-forest rounded-full"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{tab.short}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FAF9F6] flex items-center justify-center">
                <span className="text-xl text-[#6b9b7e]">∅</span>
              </div>
              <p className="text-[#64748b] text-sm font-sans">
                No products in this category yet.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 md:space-y-20"
            >
              {filteredProducts.map((product, index) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  index={index}
                  isEven={index % 2 === 0}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const ProductItem = ({
  product,
  index,
  isEven,
}: {
  product: Product;
  index: number;
  isEven: boolean;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col lg:flex-row items-center gap-6 lg:gap-12",
        !isEven && "lg:flex-row-reverse"
      )}
    >
      {/* Image Side — Layered with colored panel */}
      <div className="w-full lg:w-[42%] relative">
        {/* Colored background panel behind image */}
        <div
          className={cn(
            "absolute inset-0 rounded-[1.5rem] translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4",
            isEven ? "bg-[#6b9b7e]/8" : "bg-[#B45309]/6"
          )}
        />

        {/* Main image container */}
        <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-[#FAF9F6] to-[#F5F3EE] group shadow-[0_16px_40px_-8px_rgba(5,46,22,0.1)]">
          <Image
            src={product.image_url || "/placeholder-product.webp"}
            alt={product.name}
            fill
            className="object-contain p-8 md:p-10 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />

          {/* New badge */}
          {product.is_new && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-forest text-[9px] font-sans font-bold tracking-wider uppercase rounded-full shadow-sm">
                New
              </span>
            </div>
          )}

          {/* Large editorial number */}
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
            <span className="text-5xl md:text-6xl font-sans font-extrabold text-forest/[0.04] leading-none select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Info Side */}
      <div className="w-full lg:w-[58%] flex flex-col justify-center py-2 lg:py-4">
        {/* Category label */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 mb-3"
        >
          <div className="w-4 h-px bg-[#6b9b7e]" />
          <span className="text-[10px] font-sans font-semibold text-[#6b9b7e] tracking-[0.15em] uppercase">
            {product.category || "Premium"}
          </span>
        </motion.div>

        {/* Product name */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-2xl md:text-3xl font-sans font-bold text-forest leading-tight tracking-tight"
        >
          {product.name}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-3 text-[#64748b] leading-[1.6] text-sm md:text-[15px] max-w-lg"
        >
          {product.description ||
            "Our premium product is made from 100% natural cassava, providing a healthy and gluten-free alternative for your daily needs."}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 flex items-center gap-4"
        >
          <a href={product.buy_now_link || "#"} className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-forest text-white rounded-[0.5rem] font-sans font-semibold text-xs transition-all duration-400 hover:bg-[#6b9b7e] shadow-sm">
            <span>{product.buy_now_text || "Buy Now"}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-400 group-hover/btn:translate-x-1" />
          </a>

          <button className="inline-flex items-center gap-1.5 px-3 py-2 text-forest font-sans font-semibold text-xs transition-colors duration-300 hover:text-[#6b9b7e]">
            View Detail
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductZigZag;
