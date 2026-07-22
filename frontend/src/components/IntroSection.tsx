"use client";

import React from "react";

const IntroSection = ({ content }: { content?: any }) => {
  const c = content || {};
  const container = React.useRef(null);

  return (
    <section 
      ref={container} 
      className="relative py-20 bg-[#FAF9F5] border-b border-gray-100"
    >
      {/* Subtle texture overlay if desired, or clean paper tone */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#1b3b2f] text-sm md:text-base lg:text-lg font-medium leading-[1.8] tracking-wide max-w-3xl mx-auto">
          {c.act1_description || "Indonesia's Pioneer of Gluten-free food products since 2013, freeing free people from around five agriculture issues without which have similar characteristic as wheat flour. Turning cassava into premium cassava flour, Ladang Lima also produce alternative products such as gluten-free noodles, cookies and alternative flour for pasta, pastry and delightful cakes."}
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
