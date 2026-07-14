"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IntroSection = ({ content }: { content?: any }) => {
  const c = content || {};
  const container = React.useRef(null);
  const imageRef = React.useRef(null);

  useGSAP(() => {
    // Reveal text in acts
    const acts = gsap.utils.toArray(".story-act");
    
    acts.forEach((act: any) => {
      gsap.from(act, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: act,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Parallax effect for the side image
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-20 md:py-28 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Visual Side - Editorial Style */}
          <div className="lg:col-span-5 space-y-8 sticky top-24">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Our Heritage"
                className="absolute inset-0 w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-forest/10 mix-blend-multiply" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-forest/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-forest/40 uppercase">{c.established_label || "Est. 2013"}</span>
            </div>
          </div>

          {/* Narrative Side */}
          <div className="lg:col-span-7 space-y-24 md:space-y-32">
            
            {/* Act 1: The Origin */}
            <div className="story-act space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-forest leading-tight">
                {c.act1_title_line1 || "Indonesia's Pioneer of"} <br />
                <span className="italic text-[#4a7c59]">{c.act1_title_line2 || "Gluten-Free"}</span> since 2013.
              </h2>
              <p className="text-forest/70 text-lg md:text-xl leading-relaxed font-medium">
                {c.act1_description || "Our journey began with a simple yet profound realization: the future of food lies in our roots. We rediscovered the potential of cassava, a traditional staple, and transformed it into a modern foundation for health."}
              </p>
            </div>

            {/* Act 2: The Mission */}
            <div className="story-act space-y-6 border-l-2 border-forest/5 pl-8 md:pl-12">
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#4a7c59] uppercase">{c.act2_label || "Our Mission"}</span>
              <h3 className="text-2xl md:text-4xl font-bold text-forest leading-tight">
                {c.act2_title_line1 || "Saving Nature,"} <br />
                {c.act2_title_line2 || "One Bite at a Time."}
              </h3>
              <p className="text-forest/60 text-base md:text-lg leading-relaxed">
                {c.act2_description || "Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle. We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious."}
              </p>
            </div>

            {/* Act 3: The Innovation */}
            <div className="story-act space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-px w-full bg-forest/10" />
                  <p className="text-sm font-bold text-forest uppercase tracking-widest">{c.act3_col1_title || "Innovation"}</p>
                  <p className="text-forest/60 text-sm leading-relaxed">
                    {c.act3_col1_desc || "We only produce high-quality flour with characteristics similar to wheat, allowing for seamless gluten-free baking."}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="h-px w-full bg-forest/10" />
                  <p className="text-sm font-bold text-forest uppercase tracking-widest">{c.act3_col2_title || "Expansion"}</p>
                  <p className="text-forest/60 text-sm leading-relaxed">
                    {c.act3_col2_desc || "From pasta and pastry to delightful cakes, our ecosystem of products redefines what healthy living looks like."}
                  </p>
                </div>
              </div>
              
              <a href={c.act3_button_link || "#"} className="group flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-forest hover:text-[#4a7c59] transition-colors">
                {c.act3_button_text || "Explore Full History"}
                <div className="w-10 h-10 rounded-full border border-forest/10 flex items-center justify-center group-hover:bg-forest group-hover:text-white transition-all duration-500">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
