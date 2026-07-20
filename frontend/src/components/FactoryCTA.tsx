"use client";

import React from "react";

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
    <section ref={container} className="relative py-24 md:py-32 overflow-hidden bg-charcoal">
      {/* Background with Clean Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={c.background_image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}
          alt={c.background_alt || "Factory"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="cta-content max-w-2xl space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-white/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">{c.label || "Market Leader"}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight font-serif">
              {c.title_line1 || "#1 Gluten-Free Product"} <br />
              <span className="italic text-white/90">{c.title_line2 || "In Indonesia"}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <a href={c.button_link || "#"} className="inline-block px-10 py-4 bg-white text-forest rounded-xl text-[10px] font-bold tracking-widest uppercase hover:bg-forest hover:text-white border border-white transition-all active:scale-95 shadow-2xl shadow-black/20">
              {c.button_text || "Read More"}
            </a>
            <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase hidden md:block">
              {c.button_subtext || "Learn about our factory & standards"}
            </p>
          </div>
        </div>
      </div>

      {/* Brand Watermark - More Subtle */}
      <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[250px] font-bold text-white leading-none font-serif italic">LL</h2>
      </div>
    </section>
  );
};

export default FactoryCTA;


