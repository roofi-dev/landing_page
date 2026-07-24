"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VariantAProps = {
  h: any;
  s: any;
  v: any;
  t: any;
  coreValues: any[];
  timelineItems: any[];
};

/**
 * PROTOTYPE — Variant A: "Editorial Refined"
 * Polished version of the current editorial layout.
 * Refined spacing, better visual hierarchy, pull quotes, subtle motion.
 */
const VariantA = ({ h, s, v, t, coreValues, timelineItems }: VariantAProps) => {
  const container = React.useRef(null);

  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".va-story-img", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".va-story",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".va-story-text > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".va-story",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".va-value-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".va-values",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".va-timeline-row", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".va-timeline",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".va-closing > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".va-closing",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container}>
      {/* Story */}
      <section className="va-story py-24 md:py-36 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="va-story-img lg:col-span-5 lg:sticky lg:top-24">
              <div className="relative group">
                <div className="absolute -top-3 -left-3 w-full h-full border border-forest-light/20 rounded-lg" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(27,59,47,0.08)]">
                  <img
                    src={s.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                    alt={s.image_alt || "Ladang Lima Heritage"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </div>
            </div>

            <div className="va-story-text lg:col-span-7 space-y-8 lg:pt-12">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium tracking-wide text-forest-light italic">{s.label || "our story"}</span>
                <div className="flex-1 h-px bg-forest/10" />
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-forest leading-[1.05] tracking-tight text-balance">
                {s.title_line1 || "From Traditional Roots to"}{" "}
                <span className="italic text-forest-light">{s.title_line2 || "Modern Wellness"}</span>
              </h2>

              <p className="text-forest/70 text-lg md:text-xl leading-[1.7] font-light max-w-[60ch]">
                {s.description_1 || "Our journey began with a simple yet profound realization: the future of food lies in our roots. We rediscovered the potential of cassava, a traditional staple, and transformed it into a modern foundation for health."}
              </p>

              <blockquote className="border-l-2 border-amber-gold pl-6 py-2">
                <p className="text-2xl md:text-3xl font-serif italic text-forest/80 leading-snug">
                  {s.quote || "We feed the future with nature's wisdom — one harvest at a time."}
                </p>
              </blockquote>

              <p className="text-forest/50 text-base md:text-lg leading-[1.8] font-light max-w-[60ch]">
                {s.description_2 || "Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle. We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="va-values grain-overlay py-24 md:py-32 bg-sand relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] z-0">
          <p className="text-[300px] md:text-[500px] font-serif text-forest leading-none">4P</p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-medium tracking-wide text-amber-gold italic">{v.label || "what we stand for"}</span>
              <div className="flex-1 h-px bg-forest/10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-forest leading-[1.05] tracking-tight max-w-3xl text-balance">
              {v.title || "Our Core Values"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value: any, i: number) => (
              <div
                key={i}
                className="va-value-card group bg-white rounded-2xl p-10 md:p-14 border border-forest/5 shadow-soft hover:shadow-[0_20px_60px_rgba(27,59,47,0.06)] transition-all duration-500 ease-out"
              >
                <div className="flex items-start gap-6">
                  <span className="text-5xl md:text-6xl font-serif text-forest-light/25 group-hover:text-amber-gold transition-colors duration-500 leading-none">
                    {value.num}
                  </span>
                  <div className="space-y-4 pt-1">
                    <h3 className="text-2xl md:text-3xl font-serif text-forest tracking-tight">
                      {value.title}
                    </h3>
                    <div className="w-10 h-px bg-forest-light group-hover:bg-amber-gold transition-colors duration-500" />
                    <p className="text-forest/60 text-sm md:text-base leading-relaxed font-light max-w-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="va-timeline py-24 md:py-36 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-medium tracking-wide text-forest-light italic">{t.label || "our journey"}</span>
              <div className="flex-1 h-px bg-forest/10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-forest leading-[1.05] tracking-tight max-w-3xl text-balance">
              {t.title || "Milestones"}
            </h2>
          </div>

          <div className="space-y-0">
            {timelineItems.map((item: any, i: number) => (
              <div
                key={i}
                className="va-timeline-row group grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-t border-forest/10 hover:bg-white/50 transition-all duration-300 px-2 md:px-4 rounded-lg"
              >
                <div className="col-span-3 md:col-span-2">
                  <span className="text-2xl md:text-4xl font-serif text-forest/30 group-hover:text-forest-light transition-colors duration-500 leading-none">
                    {item.year}
                  </span>
                </div>
                <div className="col-span-9 md:col-span-4 flex items-center">
                  <h3 className="text-base md:text-xl font-serif text-forest tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6 flex items-start md:items-center">
                  <p className="text-forest/50 text-sm md:text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-forest/10" />
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="va-closing py-24 md:py-36 bg-earth">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-12 bg-forest-light/30" />
            <span className="text-sm font-medium tracking-wide text-forest-light italic">our promise</span>
            <div className="h-px w-12 bg-forest-light/30" />
          </div>
          <p className="text-3xl md:text-5xl font-serif italic text-forest leading-[1.3] tracking-tight max-w-3xl mx-auto text-balance">
            Feeding the future with nature's wisdom — one harvest at a time.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-amber-gold" />
            <span className="text-sm font-medium tracking-wide text-forest/40 italic">Ladang Lima</span>
            <div className="h-px w-8 bg-amber-gold" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VariantA;
