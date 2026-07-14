"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Mac & Cheese",
    category: "Instant Meal",
    isNew: true
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Gluten Free Flour",
    category: "Baking Essentials",
    isNew: false
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Blackmond Cookies",
    category: "Superfood Cookies",
    isNew: false
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Veggie Noodle",
    category: "Healthy Noodle",
    isNew: true
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Mocaf Premium",
    category: "Special Flour",
    isNew: false
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Cassava Pasta",
    category: "Pantry",
    isNew: true
  }
];

const CARD_GAP = 24;

const AUTO_PLAY_INTERVAL = 3500;
const PAUSE_DURATION = 5000;

const FloatingGallery = ({ content, products: cmsProducts }: { content?: any; products?: any[] }) => {
  const c = content || {};
  const container = React.useRef(null);

  const galleryProducts = (cmsProducts && cmsProducts.length > 0)
    ? cmsProducts.map((p: any) => ({
        id: p.id,
        image: p.image_url,
        name: p.name,
        category: p.category,
        isNew: p.is_new
      }))
    : products;
  const carouselRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculateLoopWidth = useCallback(() => {
    if (firstSetRef.current) {
      setLoopWidth(firstSetRef.current.offsetWidth + CARD_GAP);
    }
  }, []);

  useEffect(() => {
    calculateLoopWidth();
    const onResize = () => calculateLoopWidth();
    window.addEventListener("resize", onResize);

    const imgs = carouselRef.current?.querySelectorAll("img") || [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", calculateLoopWidth);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      imgs.forEach((img) => img.removeEventListener("load", calculateLoopWidth));
    };
  }, [calculateLoopWidth]);

  const getCardStep = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      return 300 + CARD_GAP;
    }
    return 240 + CARD_GAP;
  }, []);

  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), PAUSE_DURATION);
  }, []);

  const handlePrev = () => {
    pauseAutoPlay();
    const step = getCardStep();
    const current = x.get();
    if (current >= -2) {
      x.set(-loopWidth);
      animate(x, -loopWidth + step, { type: "spring", stiffness: 300, damping: 30 });
    } else {
      const target = Math.min(current + step, 0);
      animate(x, target, { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  const handleNext = () => {
    pauseAutoPlay();
    const step = getCardStep();
    const current = x.get();
    if (current <= -(loopWidth - step - 2)) {
      animate(x, -loopWidth, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => x.set(0),
      });
    } else {
      const target = Math.max(current - step, -loopWidth);
      animate(x, target, { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  const handleDragEnd = () => {
    pauseAutoPlay();
    const step = getCardStep();
    const current = x.get();
    const snapped = Math.round(current / step) * step;
    if (snapped <= -loopWidth) {
      animate(x, -loopWidth, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => x.set(0),
      });
      return;
    }
    const clamped = Math.max(-loopWidth, Math.min(0, snapped));
    animate(x, clamped, { type: "spring", stiffness: 300, damping: 30 });
  };

  const progressWidth = useTransform(x, [0, -(loopWidth || 1)], ["0%", "100%"]);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPaused || loopWidth <= 0) return;
    const interval = setInterval(() => {
      const step = getCardStep();
      const current = x.get();
      if (current <= -(loopWidth - step - 2)) {
        animate(x, -loopWidth, {
          type: "spring",
          stiffness: 300,
          damping: 30,
          onComplete: () => x.set(0),
        });
      } else {
        animate(x, Math.max(current - step, -loopWidth), { type: "spring", stiffness: 300, damping: 30 });
      }
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isInView, isPaused, loopWidth, x, getCardStep]);

  useGSAP(() => {
    gsap.from(".gallery-header", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      }
    });
  }, { scope: container });

  const renderCard = (product: any, keyPrefix: string) => (
    <motion.div
      key={`${keyPrefix}-${product.id}`}
      className="w-[240px] md:w-[300px] group flex-shrink-0"
    >
      <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          draggable="false"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
          {product.isNew && (
            <span className="px-3 py-1 bg-[#4a7c59] text-white text-[9px] font-bold tracking-widest uppercase rounded-full shadow-lg">
              New Launch
            </span>
          )}
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-bold tracking-widest uppercase rounded-full">
            {product.category}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-8 flex flex-col justify-end z-10">
          <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
          <button className="flex items-center gap-2 text-white text-[10px] font-bold tracking-widest uppercase">
            View Details <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section ref={container} id="products" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 gallery-header">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-forest/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#4a7c59] uppercase">{c.label || "Our Collection"}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-forest tracking-tight">
              {c.title_line1 || "Crafted with"} <br /> <span className="italic font-serif">{c.title_line2 || "Natural Integrity."}</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-forest/60 text-sm max-w-xs md:text-right hidden md:block leading-relaxed">
              {c.description || "Explore our curated selection of gluten-free innovations, made from 100% Indonesian Cassava."}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous products"
                className="p-3 rounded-full border border-forest/10 text-forest hover:bg-forest hover:text-white transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next products"
                className="p-3 rounded-full border border-forest/10 text-forest hover:bg-forest hover:text-white transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6 px-6 cursor-grab active:cursor-grabbing select-none"
          style={{ x, width: "max-content", touchAction: "pan-y" }}
          drag="x"
          dragConstraints={{ left: -loopWidth, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
        >
          <div ref={firstSetRef} className="flex gap-6">
            {galleryProducts.map((product: any) => renderCard(product, "original"))}
          </div>
          <div className="flex gap-6" aria-hidden="true">
            {galleryProducts.map((product: any) => renderCard(product, "clone"))}
          </div>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-12 flex justify-center items-center gap-3">
        <div className="w-24 h-1 bg-forest/10 rounded-full relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#4a7c59] rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
        <span className="text-[8px] font-bold tracking-[0.2em] text-forest/40 uppercase">
          {isPaused ? "Swipe to explore" : "Auto-playing"}
        </span>
      </div>
    </section>
  );
};

export default FloatingGallery;

