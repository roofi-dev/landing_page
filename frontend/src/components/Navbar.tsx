"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = ({ content }: { content?: any }) => {
  const c = content || {};
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routeMap: Record<string, string> = {
    "#story": "/about",
    "#products": "/products",
    "#news": "/news",
    "#contact": "/contact",
  };

  const mapLink = (href: string) => routeMap[href] || href;

  const navLinks = (c.links || [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "OUR PRODUCT", href: "/products" },
    { name: "NEWS", href: "/news" },
    { name: "CONTACT US", href: "/contact" },
  ])
    .filter((link: any) => {
      const name = (link.name || "").toUpperCase();
      return !name.includes("TV");
    })
    .map((link: any) => ({ ...link, href: mapLink(link.href) }));

  return (
    <div className="fixed top-0 w-full z-50 px-6 py-2 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="max-w-7xl mx-auto pointer-events-auto"
      >
        <div className={cn(
          "relative flex justify-between items-center px-6 py-2 transition-all duration-500 rounded-2xl border",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-gray-200/50 shadow-lg text-forest"
            : "bg-transparent border-transparent text-white"
        )}>
          {/* Brand */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt={c.brand_name || "Ladang Lima"} 
              className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link: any) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[11px] font-bold tracking-widest uppercase transition-colors",
                  scrolled ? "hover:text-amber-gold" : "hover:text-amber-gold"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={scrolled ? "text-forest" : "text-white"}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 bg-white/95 backdrop-blur-xl z-[60] flex flex-col p-8 rounded-2xl border border-gray-100 shadow-2xl pointer-events-auto lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link: any) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold tracking-widest uppercase text-forest hover:text-amber-gold"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;


