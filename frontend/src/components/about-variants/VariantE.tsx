"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VariantEProps = {
  h: any;
  s: any;
  v: any;
  t: any;
  coreValues: any[];
  timelineItems: any[];
};

/**
 * PROTOTYPE — Variant E: "Minimalist Zen"
 * Ultra-clean, massive whitespace, tiny labels vs huge statements,
 * monochrome with single accent. Japanese-inspired ma (negative space).
 * Slow, deliberate pacing. Almost gallery-like.
 */
const VariantE = ({ h, s, v, t, coreValues, timelineItems }: VariantEProps) => {
  const container = React.useRef(null);

  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".ve-story > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ve-story",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".ve-value", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ve-values",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".ve-tl-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ve-timeline",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".ve-closing > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ve-closing",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-white">
      {/* Story — Gallery-like, image and text separated by space */}
      <section className="ve-story py-32 md:py-48 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-6">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={s.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                  alt={s.image_alt || "Ladang Lima Heritage"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-10">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-medium tracking-[0.3em] text-forest/30 uppercase">{s.label || "our story"}</span>
                <div className="flex-1 h-px bg-forest/8" />
              </div>

              <h2 className="text-3xl md:text-5xl font-serif text-forest leading-[1.15] tracking-tight text-balance">
                {s.title_line1 || "From Traditional Roots to"}{" "}
                <span className="italic text-forest-light">{s.title_line2 || "Modern Wellness"}</span>
              </h2>

              <p className="text-forest/60 text-base md:text-lg leading-[1.9] font-light max-w-[55ch]">
                {s.description_1 || "Our journey began with a simple yet profound realization: the future of food lies in our roots. We rediscovered the potential of cassava, a traditional staple, and transformed it into a modern foundation for health."}
              </p>

              <p className="text-forest/40 text-sm md:text-base leading-[1.9] font-light max-w-[55ch]">
                {s.description_2 || "Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle. We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Stacked, generous spacing, minimal decoration */}
      <section className="ve-values bg-cream py-32 md:py-48 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 md:mb-32">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] font-medium tracking-[0.3em] text-amber-gold uppercase">{v.label || "what we stand for"}</span>
              <div className="flex-1 h-px bg-forest/8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-forest leading-[1.15] tracking-tight max-w-3xl text-balance">
              {v.title || "Our Core Values"}
            </h2>
          </div>

          <div className="space-y-20 md:space-y-28">
            {coreValues.map((value: any, i: number) => (
              <div key={i} className="ve-value grid grid-cols-12 gap-6 md:gap-12 items-start">
                <div className="col-span-2 md:col-span-1">
                  <span className="text-2xl md:text-3xl font-serif text-forest/20 leading-none">
                    {value.num}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-5">
                  <h3 className="text-2xl md:text-4xl font-serif text-forest tracking-tight">
                    {value.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-forest/50 text-sm md:text-base leading-[1.8] font-light max-w-md">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — Minimal rows, lots of air */}
      <section className="ve-timeline py-32 md:py-48 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 md:mb-32">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] font-medium tracking-[0.3em] text-forest/30 uppercase">{t.label || "our journey"}</span>
              <div className="flex-1 h-px bg-forest/8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-forest leading-[1.15] tracking-tight max-w-3xl text-balance">
              {t.title || "Milestones"}
            </h2>
          </div>

          <div className="space-y-0">
            {timelineItems.map((item: any, i: number) => (
              <div key={i} className="ve-tl-item group grid grid-cols-12 gap-6 md:gap-12 py-12 md:py-16 border-t border-forest/8">
                <div className="col-span-3 md:col-span-2">
                  <span className="text-xl md:text-3xl font-serif text-forest/25 group-hover:text-forest transition-colors duration-700 leading-none">
                    {item.year}
                  </span>
                </div>
                <div className="col-span-9 md:col-span-4">
                  <h3 className="text-base md:text-xl font-serif text-forest tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-forest/40 text-sm leading-[1.7] font-light max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-forest/8" />
          </div>
        </div>
      </section>

      {/* Closing — Single line, centered, vast space */}
      <section className="ve-closing py-40 md:py-64 px-6 md:px-16 bg-forest">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px w-8 bg-amber-gold/50" />
            <span className="text-[11px] font-medium tracking-[0.3em] text-amber-gold/60 uppercase">our promise</span>
            <div className="h-px w-8 bg-amber-gold/50" />
          </div>
          <p className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-white/90 leading-[1.35] tracking-tight max-w-2xl mx-auto text-balance">
            Feeding the future with nature's wisdom — one harvest at a time.
          </p>
          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="h-px w-6 bg-amber-gold/40" />
            <span className="text-[11px] font-medium tracking-[0.2em] text-white/30 italic">Ladang Lima</span>
            <div className="h-px w-6 bg-amber-gold/40" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VariantE;
