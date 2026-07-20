"use client";

import React from "react";

const features = [
  {
    title: "Restore the lack of Information",
    desc: "Some of people really feel about nature issue which we can saving ours and our nature from junk global issue. We produce for satisfy you to consume products which high in baked and more control salt."
  },
  {
    title: "Better Digestion",
    desc: "Gluten-free diet is a way to stay healthy and fit. Our flour has unique characteristic as wheat flour, we produce alternative products such as gluten-free noodles, cookies and flour for pasta, pastry and delightful cakes."
  },
  {
    title: "Healthy Choice",
    desc: "Ladang Lima provide healthy food for you save yourself and nature from junk food. Turning free people from around five from around five agriculture issues without which have similar characteristic as wheat flour."
  }
];

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyGlutenFree = ({ content }: { content?: any }) => {
  const c = content || {};
  const container = React.useRef(null);
  const featuresData = c.features || features;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".wgf-img",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(".wgf-content",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", clearProps: "all" },
      "-=1"
    );
  }, { scope: container });

  return (
    <section ref={container} id="benefits" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Visual Focus */}
        <div className="wgf-img lg:col-span-5 flex justify-center">
          <img
            src={c.image || "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
            alt={c.image_alt || "Organic Cassava Flour"}
            className="w-full max-w-sm h-auto transform transition-transform duration-700 hover:rotate-3 hover:scale-110"
          />
        </div>

        {/* Content Side */}
        <div className="wgf-content lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-forest-light leading-tight">
              {c.title || "Why Gluten-Free is a Good Choice"}
            </h2>
          </div>

          <div className="space-y-6">
            {featuresData.map((feature: any, index: number) => (
              <div
                key={index}
                className="space-y-1"
              >
                <h4 className="text-base md:text-lg font-bold text-forest">{feature.title}</h4>
                <p className="text-forest/60 text-xs md:text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGlutenFree;

