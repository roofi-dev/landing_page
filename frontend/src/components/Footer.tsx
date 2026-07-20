"use client";

import React from "react";
import Link from "next/link";
import { Globe, Mail, MessageSquare } from "lucide-react";

const Footer = ({ content }: { content?: any }) => {
  const c = content || {};
  return (
    <footer id="footer" className="bg-white text-black py-8 md:py-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          
          {/* Logo & Intro */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img 
                src="/logo.png" 
                alt={c.brand_name || "Ladang Lima"} 
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-[12px] leading-relaxed max-w-xs">
              {c.brand_description || "Indonesia's Pioneer of Gluten Free food products since 2013. Ladang Lima provides healthy food for help you save yourself and nature from junk food."}
            </p>
            <div className="flex gap-3 pt-2">
              <Link href="#" className="text-gray-400 hover:text-black transition-all"><Globe className="h-4 w-4" /></Link>
              <Link href="#" className="text-gray-400 hover:text-black transition-all"><Mail className="h-4 w-4" /></Link>
              <Link href="#" className="text-gray-400 hover:text-black transition-all"><MessageSquare className="h-4 w-4" /></Link>
            </div>
          </div>

          {/* PT Details */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Company</h3>
            <div className="space-y-3 text-[12px] text-gray-600">
              <div className="space-y-0.5">
                <p className="font-bold text-black uppercase text-[10px]">Main Office</p>
                <p className="leading-tight">{c.main_office || "Rungkut Industri III No.20-B, Surabaya"}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-black uppercase text-[10px]">Factory</p>
                <p className="leading-tight">{c.factory || "Ds. Lengkong, Mojoanyar, Mojokerto"}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Explore</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12px] text-gray-600">
              <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-black transition-colors">Products</Link></li>
              <li><Link href="/recipes" className="hover:text-black transition-colors">Recipes</Link></li>
              <li><Link href="/news" className="hover:text-black transition-colors">News</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Official Online Store */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Official Store</h3>
            <ul className="space-y-2 text-[12px] text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <Link href="#" className="hover:text-black transition-colors">Tokopedia</Link>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <Link href="#" className="hover:text-black transition-colors">Shopee</Link>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <Link href="#" className="hover:text-black transition-colors">Bukalapak</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Ladang Lima. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-[9px] text-gray-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-black">Privacy Policy</Link>
            <Link href="#" className="hover:text-black">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


