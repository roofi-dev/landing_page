"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VariantBProps = {
  h: any;
  s: any;
  v: any;
  t: any;
  coreValues: any[];
  timelineItems: any[];
};

/**
 * PROTOTYPE — Variant B: "Immersive Cinematic"
 * Full-bleed images, dramatic overlapping text, scroll-driven cinematic sections.
 * Alternating dark/light sections, large type, image-heavy.
 */
const VariantB = ({ h, s, v, t, coreValues, timelineItems }: VariantBProps) => {
  const container = React.useRef(null);

  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Story — parallax image
      gsap.to(".vb-story-img", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ".vb-story",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".vb-story-text > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vb-story-text",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Values — alternating row reveal
      gsap.utils.toArray(".vb-value-row").forEach((row: any) => {
        gsap.from(row.querySelectorAll(".vb-value-content > *"), {
          x: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Timeline — vertical line draw + item reveal
      gsap.from(".vb-timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".vb-timeline",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray(".vb-timeline-item").forEach((item: any) => {
        gsap.from(item, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Closing — fade up
      gsap.from(".vb-closing > *", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vb-closing",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-forest">
      {/* Story — Full-bleed image with overlay text */}
      <section className="vb-story relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={s.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
            alt={s.image_alt || "Ladang Lima Heritage"}
            className="vb-story-img w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/70" />
        </div>

        <div className="vb-story-text relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-24 text-white">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-medium tracking-wide text-amber-gold italic">{s.label || "our story"}</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight text-balance mb-8">
            {s.title_line1 || "From Traditional Roots to"}{" "}
            <span className="italic text-amber-gold">{s.title_line2 || "Modern Wellness"}</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-[1.7] font-light max-w-[55ch] mb-6">
            {s.description_1 || "Our journey began with a simple yet profound realization: the future of food lies in our roots."}
          </p>
          <p className="text-white/60 text-base md:text-lg leading-[1.8] font-light max-w-[55ch]">
            {s.description_2 || "Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle."}
          </p>
        </div>
      </section>

      {/* Values — Alternating full-width rows */}
      <section className="vb-values bg-cream py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-amber-gold" />
              <span className="text-sm font-medium tracking-wide text-amber-gold italic">{v.label || "what we stand for"}</span>
              <div className="h-px w-12 bg-amber-gold" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-forest leading-[1.05] tracking-tight text-balance">
              {v.title || "Our Core Values"}
            </h2>
          </div>

          <div className="space-y-px">
            {coreValues.map((value: any, i: number) => (
              <div
                key={i}
                className={`vb-value-row group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-12 md:py-16 px-4 md:px-8 ${
                  i % 2 === 0 ? "bg-white" : "bg-sand"
                } transition-colors duration-500`}
              >
                <span className="text-7xl md:text-8xl font-serif text-forest-light/20 group-hover:text-amber-gold transition-colors duration-500 leading-none flex-shrink-0">
                  {value.num}
                </span>
                <div className="vb-value-content flex-1 space-y-4">
                  <h3 className="text-3xl md:text-4xl font-serif text-forest tracking-tight">
                    {value.title}
                  </h3>
                  <div className="w-12 h-px bg-forest-light group-hover:bg-amber-gold transition-colors duration-500" />
                  <p className="text-forest/60 text-base md:text-lg leading-relaxed font-light max-w-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — Vertical with line */}
      <section className="vb-timeline bg-forest py-24 md:py-36 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-amber-gold" />
              <span className="text-sm font-medium tracking-wide text-amber-gold italic">{t.label || "our journey"}</span>
              <div className="h-px w-12 bg-amber-gold" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-[1.05] tracking-tight text-balance">
              {t.title || "Milestones"}
            </h2>
          </div>

          <div className="relative pl-8 md:pl-12">
            <div className="vb-timeline-line absolute left-0 top-0 bottom-0 w-px bg-forest-light/30" />

            <div className="space-y-16">
              {timelineItems.map((item: any, i: number) => (
                <div key={i} className="vb-timeline-item relative">
                  <div className="absolute -left-8 md:-left-12 top-2 w-3 h-3 rounded-full bg-amber-gold ring-4 ring-forest" />
                  <span className="text-3xl md:text-4xl font-serif text-amber-gold/60 leading-none block mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-white tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed font-light max-w-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing — Full-bleed dark */}
      <section className="vb-closing bg-forest relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={h.background_image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-12 bg-amber-gold" />
            <span className="text-sm font-medium tracking-wide text-amber-gold italic">our promise</span>
            <div className="h-px w-12 bg-amber-gold" />
          </div>
          <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white leading-[1.3] tracking-tight max-w-3xl mx-auto text-balance">
            Feeding the future with nature's wisdom — one harvest at a time.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-amber-gold" />
            <span className="text-sm font-medium tracking-wide text-white/40 italic">Ladang Lima</span>
            <div className="h-px w-8 bg-amber-gold" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VariantB;
