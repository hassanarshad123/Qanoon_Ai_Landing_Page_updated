"use client";

import { useEffect, useState } from "react";
import { Scale } from "lucide-react";
import type { UserRole } from "@/lib/onboarding/types";
import { VALUE_SLIDES, ROLE_COLORS } from "@/lib/onboarding/constants";

interface ValueSlidePanelProps {
  role: UserRole | null;
  currentStep: number;
}

export function ValueSlidePanel({ role, currentStep }: ValueSlidePanelProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = role ? VALUE_SLIDES[role] : VALUE_SLIDES.lawyer;
  const colors = role ? ROLE_COLORS[role] : ROLE_COLORS.lawyer;

  // Change slide based on step progression
  useEffect(() => {
    if (currentStep <= 0) return;
    const newIndex = (currentStep - 1) % slides.length;
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setSlideIndex(newIndex);
      setIsTransitioning(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [currentStep, slides.length]);

  const currentSlide = slides[slideIndex];

  return (
    <div className={`hidden lg:flex lg:flex-col lg:justify-between h-full bg-gradient-to-br ${colors.gradient} text-white p-10 relative overflow-hidden`}>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 border border-white rounded-full" />
        <div className="absolute bottom-20 left-10 w-40 h-40 border border-white rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-white rounded-full" />
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif text-xl font-semibold">QanoonAI</span>
        </div>
      </div>

      {/* Value slide */}
      <div className={`relative z-10 space-y-6 transition-all duration-300 ${isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
        <div className="inline-block px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm">
          <span className="text-sm font-semibold tracking-wide">{currentSlide.stat}</span>
        </div>
        <h2 className="text-3xl font-serif font-bold leading-tight">
          {currentSlide.title}
        </h2>
        <p className="text-white/80 text-lg leading-relaxed max-w-sm">
          {currentSlide.description}
        </p>
      </div>

      {/* Slide indicators */}
      <div className="relative z-10 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === slideIndex ? "w-8 bg-white" : "w-3 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
