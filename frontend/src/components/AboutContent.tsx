"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AboutContentProps = {
  h: any;
  s: any;
  v: any;
  t: any;
  coreValues: any[];
  timelineItems: any[];
};

const AboutContent = ({ h, s, v, t, coreValues, timelineItems }: AboutContentProps) => {
  const container = React.useRef(null);

  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Hero — parallax + fade-in
      gsap.to(".about-hero-bg", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".about-hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });

      // Story — asymmetric reveal
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-story",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      storyTl
        .from(".story-label", {
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".story-image-wrap",
          {
            y: 80,
            opacity: 0,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".story-text > *",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=1"
        );

      // Values — staggered grid reveal
      const valuesTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-values",
          start: "top 85%", // Trigger earlier
          toggleActions: "play none none reverse",
        },
      });

      valuesTl
        .from(".values-header > *", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        })
        .from(
          ".value-card",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // Timeline — row-by-row reveal
      gsap.from(".timeline-row", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-timeline",
          start: "top 85%", // Trigger earlier
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".timeline-header > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-timeline",
          start: "top 80%",
        },
      });

      // Closing quote — fade + scale
      gsap.from(".about-closing > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-closing",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container}>
      {/* Hero — Editorial Cover */}
      <section className="about-hero grain-overlay relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0">
          <img
            src={h.background_image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
            alt="About Ladang Lima"
            className="about-hero-bg w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-forest/20" />
        </div>

        <div className="about-hero-content relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-amber-gold" />
            <span className="text-xs font-medium tracking-[0.3em] text-amber-gold italic">about Ladang Lima</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.95] tracking-tight max-w-4xl text-balance">
            {h.title || "About Us"}
          </h1>
          <p className="mt-8 text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
            {h.subtitle || "Indonesia's pioneer of gluten-free food products since 2013. We feed the future with nature's wisdom."}
          </p>
        </div>

        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-10 text-right">
          <p className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">Est.</p>
          <p className="text-3xl md:text-4xl font-serif text-white/40">2013</p>
        </div>
      </section>

      {/* Story — Asymmetric Editorial Spread */}
      <section className="about-story py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="story-label flex items-center gap-4 mb-16 md:mb-24">
            <span className="text-sm font-medium tracking-wide text-forest-light italic">{s.label || "our story"}</span>
            <div className="flex-1 h-px bg-forest/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="story-image-wrap lg:col-span-5 lg:mt-16">
              <div className="relative group">
                <div className="absolute -top-4 -left-4 w-full h-full border border-forest-light/20 rounded-lg" />
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(27,59,47,0.08)]">
                  <img
                    src={s.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                    alt={s.image_alt || "Ladang Lima Heritage"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-xs font-medium tracking-wide text-forest/40 italic">
                  {s.image_alt || "Ladang Lima Heritage"} — photographed on location
                </p>
              </div>
            </div>

            <div className="story-text lg:col-span-7 space-y-8">
              <h2 className="text-4xl md:text-6xl font-serif text-forest leading-[1.05] tracking-tight text-balance">
                {s.title_line1 || "From Traditional Roots to"}{" "}
                <span className="italic text-forest-light">{s.title_line2 || "Modern Wellness"}</span>
              </h2>

              <div className="w-12 h-px bg-forest-light" />

              <p className="text-forest/70 text-lg md:text-xl leading-[1.7] font-light max-w-[65ch]">
                {s.description_1 || "Our journey began with a simple yet profound realization: the future of food lies in our roots. We rediscovered the potential of cassava, a traditional staple, and transformed it into a modern foundation for health."}
              </p>
              <p className="text-forest/50 text-base md:text-lg leading-[1.8] font-light max-w-[65ch]">
                {s.description_2 || "Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle. We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious. From pasta and pastry to delightful cakes, our ecosystem of products redefines what healthy living looks like."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Numbered Editorial Grid */}
      <section className="about-values grain-overlay py-24 md:py-32 bg-sand relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] z-0">
          <p className="text-[300px] md:text-[500px] font-serif text-forest leading-none">4P</p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="values-header mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-medium tracking-wide text-amber-gold italic">{v.label || "what we stand for"}</span>
              <div className="flex-1 h-px bg-forest/10" />
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-forest leading-[1.05] tracking-tight max-w-3xl text-balance">
              {v.title || "Our Core Values"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-forest/10 rounded-2xl overflow-hidden border border-forest/10 shadow-soft">
            {coreValues.map((value: any, i: number) => (
              <div
                key={i}
                className="value-card group bg-white/90 backdrop-blur-sm p-12 md:p-16 hover:bg-white active:scale-[0.99] transition-all duration-500 ease-out"
              >
                <div className="flex items-start gap-8">
                  <span className="text-6xl md:text-7xl font-serif text-forest-light/30 group-hover:text-amber-gold transition-colors duration-500 leading-none">
                    {value.num}
                  </span>
                  <div className="space-y-6 pt-2">
                    <h3 className="text-3xl md:text-4xl font-serif text-forest tracking-tight">
                      {value.title}
                    </h3>
                    <div className="w-12 h-px bg-forest-light group-hover:bg-amber-gold transition-colors duration-500" />
                    <p className="text-forest/60 text-base md:text-lg leading-relaxed font-light max-w-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — Editorial Rows */}
      <section className="about-timeline py-24 md:py-40 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="timeline-header mb-16 md:mb-20">
            <div className="flex items-center gap-4 mb-16 md:mb-20">
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
                className="timeline-row group grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-12 border-t border-forest/10 hover:bg-white/60 hover:shadow-[0_8px_30px_rgba(27,59,47,0.04)] active:scale-[0.995] transition-all duration-300 px-2 md:px-4 rounded-lg"
              >
                <div className="col-span-3 md:col-span-2">
                  <span className="text-3xl md:text-5xl font-serif text-forest/30 group-hover:text-forest-light transition-colors duration-500 leading-none">
                    {item.year}
                  </span>
                </div>

                <div className="col-span-9 md:col-span-4 flex items-center">
                  <h3 className="text-lg md:text-2xl font-serif text-forest tracking-tight">
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

      {/* Closing Statement — Editorial Quote */}
      <section className="about-closing py-24 md:py-40 bg-earth">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-forest-light/30" />
            <span className="text-sm font-medium tracking-wide text-forest-light italic">our promise</span>
            <div className="h-px w-12 bg-forest-light/30" />
          </div>
          <p className="text-3xl md:text-5xl font-serif italic text-forest leading-[1.3] tracking-tight max-w-3xl mx-auto text-balance">
            Feeding the future with nature's wisdom — one harvest at a time.
          </p>
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-amber-gold" />
            <span className="text-sm font-medium tracking-wide text-forest/40 italic">Ladang Lima</span>
            <div className="h-px w-8 bg-amber-gold" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;
