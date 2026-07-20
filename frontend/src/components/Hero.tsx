"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ content }: { content?: any }) => {
  const c = content || {};
  const container = React.useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-bg", {
      scale: 1.2,
      duration: 2.5,
      ease: "power2.out"
    })
    .from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2
    }, "-=1.5")
    .from(".hero-text", {
      y: 40,
      opacity: 0,
      duration: 1
    }, "-=0.8")
    .from(".hero-btn", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8
    }, "-=0.6");

    gsap.to(".hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-forest">
      {/* Immersive Visual Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={c.background_image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
          alt={c.background_alt || "Ladang Lima Farm"}
          className="hero-bg w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl text-left space-y-6 md:space-y-8">
          <div className="space-y-2 overflow-hidden">
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight uppercase">
              {c.title_line1 || "FEEDING"}<br />{c.title_line2 || "THE FUTURE"}
            </h1>
          </div>

          <div className="space-y-6 md:space-y-8">
            <p className="hero-text text-white text-lg md:text-2xl font-bold leading-relaxed">
              {c.subtitle_line1 || "Stronger Farmer,"} <br />
              {c.subtitle_line2 || "Healthy Food for Better Life"}
            </p>

            <div className="hero-btn">
              <a href={c.button_link || "#"} className="group inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-forest transition-all active:scale-95">
                {c.button_text || "Read More"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;





