"use client";

import React from "react";
import { motion } from "framer-motion";

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

    tl.from(".wgf-img", {
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .from(".wgf-content", {
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=1")
    .from(".wgf-feature", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.8");
  }, { scope: container });

  return (
    <section ref={container} id="benefits" className="py-20 md:py-24 bg-white overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#4a7c59] leading-tight">
              {c.title || "Why Gluten-Free is a Good Choice"}
            </h2>
          </div>

          <div className="space-y-8">
            {featuresData.map((feature: any, index: number) => (
              <div
                key={index}
                className="wgf-feature space-y-1"
              >
                <h4 className="text-lg font-bold text-black">{feature.title}</h4>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
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

