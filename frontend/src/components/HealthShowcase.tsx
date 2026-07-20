"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const HealthShowcase = () => {
  return (
    <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      {/* Subtle texture overlay if you had one */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/texture.png')] bg-repeat" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-forest-light text-3xl md:text-4xl font-bold tracking-tighter">
              HEALTH <span className="text-forest">FOR EVERYBODY</span>
            </h2>
            <div className="w-20 h-1 bg-forest-light/20 mt-4 rounded-full" />
          </motion.div>

          {/* Quote Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto bg-white border-2 border-forest-light/20 rounded-[2rem] p-8 md:p-12 shadow-soft relative"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-forest-light rounded-full flex items-center justify-center text-white shadow-lg">
              <Quote className="h-6 w-6 fill-current" />
            </div>
            <p className="text-forest text-2xl md:text-3xl font-bold italic font-serif leading-tight">
              "Wholesome choices that everyone can enjoy"
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-forest-light" />
              <div className="w-1.5 h-1.5 rounded-full bg-forest-light/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-forest-light/20" />
            </div>
          </motion.div>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-forest/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
          >
            We believe that healthy food should be accessible, delicious, and inclusive. Join us in our journey towards a healthier lifestyle for everyone.
          </motion.p>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-card"
            >
              <Image 
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Healthy family"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-card"
            >
              <Image 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Healthy lifestyle"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthShowcase;
