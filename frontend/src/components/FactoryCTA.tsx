"use client";

import React from "react";
import { motion } from "framer-motion";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FactoryCTA = ({ content }: { content?: any }) => {
  const c = content || {};
  const container = React.useRef(null);

  useGSAP(() => {
    gsap.from(".cta-content", {
      scale: 0.9,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-24 md:py-32 overflow-hidden bg-forest">
      {/* Background with Split Effect */}
      <div className="absolute inset-0 z-0 flex">
        <div className="w-full h-full relative">
          <img 
            src={c.background_image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}
            alt={c.background_alt || "Factory"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/40 to-transparent" />
        </div>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="cta-content max-w-2xl space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-white/40" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/60 uppercase">{c.label || "Market Leader"}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              {c.title_line1 || "#1 Gluten-Free Product"} <br />
              {c.title_line2 || "In Indonesia"}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <a href={c.button_link || "#"} className="inline-block px-10 py-3 bg-white text-forest rounded-full text-xs font-bold tracking-widest uppercase hover:bg-forest hover:text-white border border-white transition-all active:scale-95 shadow-xl shadow-black/20">
              {c.button_text || "Read More"}
            </a>
            <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase hidden md:block">
              {c.button_subtext || "Learn about our factory & standards"}
            </p>
          </div>
        </div>
      </div>

      {/* Brand Watermark */}
      <div className="absolute top-1/2 -right-24 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[200px] font-bold text-white leading-none">LL</h2>
      </div>
    </section>
  );
};

export default FactoryCTA;


