"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Sprout, Heart, Leaf, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type VariantCProps = {
  h: any;
  s: any;
  v: any;
  t: any;
  coreValues: any[];
  timelineItems: any[];
};

const valueIcons = [Sprout, Heart, Leaf, Award];

/**
 * PROTOTYPE — Variant C: "Modern Bento Grid"
 * Clean, structured bento-grid layout with cards, generous whitespace,
 * geometric shapes, stats, and a contemporary corporate feel.
 */
const VariantC = ({ h, s, v, t, coreValues, timelineItems }: VariantCProps) => {
  const container = React.useRef(null);

  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Stats — animate on load (above the fold)
      gsap.fromTo(".vc-stats-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.3 }
      );

      // Story — scroll triggered
      gsap.fromTo(".vc-story-card",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: ".vc-story",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Values — scroll triggered
      gsap.fromTo(".vc-value-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: ".vc-values",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline — scroll triggered
      gsap.fromTo(".vc-timeline-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: ".vc-timeline",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Closing — scroll triggered
      gsap.fromTo(".vc-closing > *",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: ".vc-closing",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-cream">
      {/* Stats strip — bento feel bridge between hero and story */}
      <section className="vc-stats py-10 md:py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { num: "11+", label: "Years of Innovation" },
              { num: "5", label: "Core Values" },
              { num: "100%", label: "Gluten-Free" },
              { num: "∞", label: "Possibilities" },
            ].map((stat, i) => (
              <div key={i} className="vc-stats-card bg-white rounded-2xl p-6 md:p-8 border border-forest/5 shadow-soft">
                <p className="text-3xl md:text-4xl font-serif text-forest leading-none mb-2">{stat.num}</p>
                <p className="text-xs md:text-sm text-forest/70 font-light tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story — True bento with 3 cards */}
      <section className="vc-story pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Image card — spans 2 cols */}
            <div className="vc-story-card lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[400px] md:min-h-[460px] group">
              <img
                src={s.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
                alt={s.image_alt || "Ladang Lima Heritage"}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 text-xs md:text-sm font-light tracking-wide italic">
                  {s.image_alt || "Ladang Lima Heritage"} — photographed on location
                </p>
              </div>
            </div>

            {/* Text card — spans 1 col */}
            <div className="vc-story-card bg-sand rounded-3xl p-10 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium tracking-wide text-forest-light italic">{s.label || "our story"}</span>
                <div className="flex-1 h-px bg-forest/10" />
              </div>
              <h2 className="text-2xl md:text-4xl font-serif text-forest leading-[1.1] tracking-tight text-balance mb-6">
                {s.title_line1 || "From Traditional Roots to"}{" "}
                <span className="italic text-forest-light">{s.title_line2 || "Modern Wellness"}</span>
              </h2>
              <p className="text-forest/70 text-sm md:text-base leading-[1.7] font-light mb-4">
                {s.description_1 || "Our journey began with a simple yet profound realization: the future of food lies in our roots."}
              </p>
              <p className="text-forest/70 text-xs md:text-sm leading-[1.8] font-light">
                {s.description_2 || "Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Bento grid with varying sizes */}
      <section className="vc-values py-16 md:py-24 px-6 md:px-12 bg-sand">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium tracking-wide text-amber-gold italic">{v.label || "what we stand for"}</span>
              <div className="flex-1 h-px bg-forest/10" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-forest leading-[1.1] tracking-tight max-w-3xl text-balance">
              {v.title || "Our Core Values"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
            {coreValues.map((value: any, i: number) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div
                  key={i}
                  className="vc-value-card group bg-white rounded-3xl p-8 md:p-10 border border-forest/5 shadow-soft hover:shadow-[0_20px_60px_rgba(27,59,47,0.06)] hover:-translate-y-1 transition-all duration-500 h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-4xl md:text-5xl font-serif text-forest-light/40 group-hover:text-amber-gold transition-colors duration-500 leading-none">
                      {value.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center group-hover:bg-amber-gold/10 transition-colors duration-500">
                      <Icon className="h-6 w-6 text-forest-light group-hover:text-amber-gold transition-colors duration-500" />
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col">
                    <h3 className="font-serif text-forest tracking-tight mb-4 text-2xl md:text-3xl">
                      {value.title}
                    </h3>
                    <div className="w-12 h-px bg-forest-light/40 group-hover:bg-amber-gold/50 transition-colors duration-500 mb-6" />
                    <p className="text-forest/70 leading-relaxed font-light text-sm md:text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline — Horizontal cards */}
      <section className="vc-timeline py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium tracking-wide text-forest-light italic">{t.label || "our journey"}</span>
              <div className="flex-1 h-px bg-forest/10" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-forest leading-[1.1] tracking-tight max-w-3xl text-balance">
              {t.title || "Milestones"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {timelineItems.map((item: any, i: number) => (
              <div
                key={i}
                className="vc-timeline-card group bg-white rounded-2xl p-8 border border-forest/5 shadow-soft hover:shadow-[0_20px_60px_rgba(27,59,47,0.06)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl md:text-3xl font-serif text-forest-light/50 group-hover:text-amber-gold transition-colors duration-500 leading-none">
                    {item.year}
                  </span>
                  <div className="flex-1 h-px bg-forest/10" />
                </div>
                <h3 className="text-lg md:text-xl font-serif text-forest tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-forest/70 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
            {/* CTA card to fill the grid evenly */}
            <div className="vc-timeline-card vc-cta-card bg-forest rounded-2xl p-8 flex flex-col justify-center items-center text-center">
              <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">What's Next</p>
              <p className="text-white text-lg md:text-xl font-serif italic leading-snug mb-6">
                The journey continues — stay tuned for what's ahead.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-amber-400" />
                <span className="text-white/60 text-xs font-medium tracking-wide italic">Ladang Lima</span>
                <div className="h-px w-6 bg-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing — CTA card */}
      <section className="vc-closing py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-forest rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-gold/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-forest-light/5 rounded-full translate-y-1/3 -translate-x-1/3" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-gold/[0.02] rounded-full" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-amber-400" />
                <span className="text-sm font-semibold tracking-wide text-amber-400 italic">our promise</span>
                <div className="h-px w-12 bg-amber-400" />
              </div>
              <p className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-white leading-[1.3] tracking-tight max-w-2xl mx-auto text-balance">
                Feeding the future with nature's wisdom — one harvest at a time.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-amber-400" />
                <span className="text-sm font-medium tracking-wide text-white/60 italic">Ladang Lima</span>
                <div className="h-px w-8 bg-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VariantC;
