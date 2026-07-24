"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AboutHeroProps = {
  h: any;
};

/**
 * Shared hero banner — identical across all About Us variants.
 */
const AboutHero = ({ h }: AboutHeroProps) => {
  const container = React.useRef(null);

  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".about-hero-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(".about-hero-content > *",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power3.out", delay: 0.2 }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="about-hero grain-overlay relative min-h-[65vh] md:min-h-[75vh] flex items-end overflow-hidden bg-forest">
      <div className="absolute inset-0 z-0">
        <img
          src={h.background_image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
          alt="About Ladang Lima"
          className="about-hero-bg w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-forest/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/40 to-transparent" />
      </div>

      <div className="about-hero-content relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-28">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-amber-400" />
          <span className="text-xs font-semibold tracking-[0.3em] text-amber-400 italic">about Ladang Lima</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif text-white leading-[0.92] tracking-tight max-w-4xl text-balance">
          {h.title || "About Us"}
        </h1>
        <p className="mt-8 text-white/85 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
          {h.subtitle || "Indonesia's pioneer of gluten-free food products since 2013. We feed the future with nature's wisdom."}
        </p>
      </div>

      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-10 text-right">
        <p className="text-[9px] font-bold tracking-[0.3em] text-white/50 uppercase">Est.</p>
        <p className="text-3xl md:text-5xl font-serif text-white/60">2013</p>
      </div>
    </section>
  );
};

export default AboutHero;
