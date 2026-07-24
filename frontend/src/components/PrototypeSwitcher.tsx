"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

type PrototypeSwitcherProps = {
  variants: { key: string; name: string }[];
  current: string;
};

const PrototypeSwitcher = ({ variants, current }: PrototypeSwitcherProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentIndex = Math.max(
    0,
    variants.findIndex((v) => v.key === current)
  );

  const cycle = useCallback(
    (dir: number) => {
      const nextIdx = (currentIndex + dir + variants.length) % variants.length;
      const nextKey = variants[nextIdx].key;
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", nextKey);
      router.replace(`/about?${params.toString()}`, { scroll: false });
    },
    [currentIndex, variants, router, searchParams]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        cycle(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        cycle(1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cycle]);

  const currentVariant = variants[currentIndex];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1 bg-charcoal/95 backdrop-blur-md text-white rounded-full pl-2 pr-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10">
      <button
        onClick={() => cycle(-1)}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Previous variant"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-2 px-2 select-none">
        <Eye className="h-3.5 w-3.5 text-amber-gold" />
        <div className="flex flex-col items-center leading-tight">
          <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
            Prototype
          </span>
          <span className="text-xs font-medium tracking-wide">
            {currentVariant.key} — {currentVariant.name}
          </span>
        </div>
        <span className="text-[10px] text-white/30 ml-2">
          {currentIndex + 1}/{variants.length}
        </span>
      </div>

      <button
        onClick={() => cycle(1)}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Next variant"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PrototypeSwitcher;
