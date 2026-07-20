"use client";

import React from "react";

const icons = [
  { name: "SOURCE OF FIBER", icon: "/icon-1.webp" },
  { name: "GLUTEN FREE", icon: "/icon-2.webp" },
  { name: "HIGH IRON & CALCIUM", icon: "/icon-3.webp" },
  { name: "NO PRESERVATIVES", icon: "/icon-4.webp" },
  { name: "NATURAL", icon: "/icon-5.webp" },
  { name: "HEALTHY", icon: "/icon-6.webp" },
];

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CassavaSection = ({ content }: { content?: any }) => {
  const c = content || {};
  const container = React.useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(".cassava-header", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(".cassava-icon", {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .from(".cassava-img", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.8");
  }, { scope: container });

  return (
    <section ref={container} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="cassava-header max-w-3xl mx-auto space-y-2 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-forest-light tracking-tight">
            {c.title || "100% Cassava"}
          </h2>
          <p className="text-forest-light text-sm md:text-base font-semibold">
            {c.subtitle || "Healthy, Natural and Gluten Free"}
          </p>
        </div>

        {/* Icons Grid */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12">
          {icons.map((item: any, index: number) => (
            <div
              key={index}
              className="cassava-icon flex flex-col items-center"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white overflow-hidden transition-transform hover:scale-110 duration-300">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Visual Focus */}
        <div className="cassava-img relative max-w-4xl mx-auto overflow-hidden rounded-3xl">
          <img
            src={c.image || "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}
            alt={c.image_alt || "Cassava"}
            className="w-full h-auto transition-transform duration-1000 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default CassavaSection;


