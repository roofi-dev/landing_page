"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VariantDProps = {
  h: any;
  s: any;
  v: any;
  t: any;
  coreValues: any[];
  timelineItems: any[];
};

/**
 * PROTOTYPE — Variant D: "Magazine Spread"
 * True magazine layout: asymmetric grids, drop caps, multi-column text,
 * overlapping elements, pull quotes, page-number style navigation.
 * Feels like flipping through a premium print publication.
 */
const VariantD = ({ h, s, v, t, coreValues, timelineItems }: VariantDProps) => {
  const container = React.useRef(null);

  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".vd-story-col", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vd-story",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".vd-value-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".vd-values",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".vd-tl-item", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vd-timeline",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".vd-closing > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vd-closing",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-[#FDFCFB]">
      {/* Story — Multi-column magazine spread */}
      <section className="vd-story py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left — image with caption */}
            <div className="vd-story-col lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden rounded-sm">
                  <img
                    src={s.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                    alt={s.image_alt || "Ladang Lima Heritage"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-[11px] font-medium tracking-wide text-forest/40 italic">
                  {s.image_alt || "Ladang Lima Heritage"} — photographed on location
                </p>
              </div>
            </div>

            {/* Right — multi-column text with drop cap */}
            <div className="vd-story-col lg:col-span-7 lg:pt-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-medium tracking-wide text-forest-light italic">{s.label || "our story"}</span>
                <div className="flex-1 h-px bg-forest/10" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-forest/30 uppercase">Page 02</span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-forest leading-[1.05] tracking-tight text-balance mb-10">
                {s.title_line1 || "From Traditional Roots to"}{" "}
                <span className="italic text-forest-light">{s.title_line2 || "Modern Wellness"}</span>
              </h2>

              <div className="md:columns-2 md:gap-8 md:[column-rule:1px_solid_rgba(27,59,47,0.08)]">
                <p className="text-forest/70 text-base md:text-lg leading-[1.8] font-light mb-4 md:break-inside-avoid">
                  <span className="float-left text-6xl md:text-7xl font-serif text-forest leading-[0.8] mr-2 mt-1">
                    {(s.description_1 || "O")[0]}
                  </span>
                  {(s.description_1 || "Our journey began with a simple yet profound realization: the future of food lies in our roots. We rediscovered the potential of cassava, a traditional staple, and transformed it into a modern foundation for health.").slice(1)}
                </p>
                <p className="text-forest/50 text-sm md:text-base leading-[1.8] font-light mb-4">
                  {s.description_2 || "Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle. We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious."}
                </p>
                <blockquote className="my-6 py-4 border-y border-forest/10 md:break-inside-avoid">
                  <p className="text-xl md:text-2xl font-serif italic text-forest/80 leading-snug">
                    {s.quote || "We feed the future with nature's wisdom — one harvest at a time."}
                  </p>
                </blockquote>
                <p className="text-forest/50 text-sm md:text-base leading-[1.8] font-light">
                  From pasta and pastry to delightful cakes, our ecosystem of products redefines what healthy living looks like — grounded in tradition, driven by innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Horizontal list with large numbers */}
      <section className="vd-values bg-forest text-white py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium tracking-wide text-amber-gold italic">{v.label || "what we stand for"}</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif leading-[1.05] tracking-tight max-w-3xl text-balance">
                {v.title || "Our Core Values"}
              </h2>
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase hidden md:block">Page 03</span>
          </div>

          <div className="space-y-0">
            {coreValues.map((value: any, i: number) => (
              <div
                key={i}
                className="vd-value-item group grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 border-t border-white/10 hover:bg-white/5 transition-colors duration-500"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="text-4xl md:text-6xl font-serif text-white/20 group-hover:text-amber-gold transition-colors duration-500 leading-none">
                    {value.num}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="text-2xl md:text-4xl font-serif tracking-tight">
                    {value.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-7 flex items-center">
                  <p className="text-white/50 text-sm md:text-lg leading-relaxed font-light max-w-xl">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* Timeline — Magazine feature spread */}
      <section className="vd-timeline py-20 md:py-32 px-6 md:px-16 bg-sand">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium tracking-wide text-forest-light italic">{t.label || "our journey"}</span>
                <div className="flex-1 h-px bg-forest/10" />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-forest leading-[1.05] tracking-tight max-w-3xl text-balance">
                {t.title || "Milestones"}
              </h2>
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-forest/30 uppercase hidden md:block">Page 04</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {timelineItems.map((item: any, i: number) => (
              <div
                key={i}
                className={`vd-tl-item group ${i % 3 === 1 ? "md:mt-16" : ""} ${i % 3 === 2 ? "lg:mt-8" : ""}`}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-5xl md:text-6xl font-serif text-forest/20 group-hover:text-amber-gold transition-colors duration-500 leading-none">
                    {item.year}
                  </span>
                </div>
                <div className="w-12 h-px bg-forest-light mb-4" />
                <h3 className="text-xl md:text-2xl font-serif text-forest tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-forest/50 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing — Full-page statement */}
      <section className="vd-closing py-24 md:py-40 px-6 md:px-16 bg-[#FDFCFB] border-t border-forest/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-12 bg-forest-light/30" />
            <span className="text-sm font-medium tracking-wide text-forest-light italic">our promise</span>
            <div className="h-px w-12 bg-forest-light/30" />
          </div>
          <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-forest leading-[1.25] tracking-tight max-w-3xl mx-auto text-balance">
            Feeding the future with nature's wisdom — one harvest at a time.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-amber-gold" />
            <span className="text-sm font-medium tracking-wide text-forest/40 italic">Ladang Lima</span>
            <div className="h-px w-8 bg-amber-gold" />
          </div>
          <p className="mt-12 text-[10px] font-bold tracking-[0.3em] text-forest/20 uppercase">— End of Issue —</p>
        </div>
      </section>
    </div>
  );
};

export default VariantD;
