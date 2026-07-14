"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const cards = [
  {
    title: "OUR COMPANY PROFILE",
    subtitle: "GET KNOW US BETTER",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "bg-[#8b5e3c]/40",
  },
  {
    title: "OUR PRODUCT KNOWLEDGE",
    subtitle: "GET KNOW US BETTER",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "bg-[#8b5e3c]/40",
  },
];

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InteractiveCards = ({ content }: { content?: any }) => {
  const c = content || {};
  const container = React.useRef(null);
  const cardsData = c.cards || cards;

  useGSAP(() => {
    gsap.from(".interactive-card", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {cardsData.map((card: any, index: number) => (
          <div
            key={index}
            className="interactive-card relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Minimal Overlay */}
            <div className={`absolute inset-0 ${card.color} opacity-60 transition-opacity duration-700 group-hover:opacity-40`} />

            {/* Content - Centered */}
            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center space-y-4 z-10">
              <div className="space-y-2">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white uppercase block transform transition-transform duration-700 group-hover:-translate-y-1">
                  {card.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                  {card.title}
                </h3>
              </div>
              
              {/* Play Button - Center */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#8b5e3c] transition-all duration-500 transform group-hover:scale-110">
                <Play className="h-5 w-5 md:h-6 md:w-6 fill-current ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InteractiveCards;


