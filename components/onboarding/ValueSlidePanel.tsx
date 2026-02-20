"use client";

import { useEffect, useState } from "react";
import {
  Scale,
  Shield,
  Sparkles,
  FileText,
  Gavel,
  StickyNote,
  Search,
  FileStack,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { UserRole } from "@/lib/onboarding/types";
import {
  VALUE_SLIDES,
  ROLE_COLORS,
  JUDGE_PANEL_STEPS,
} from "@/lib/onboarding/constants";
import type { LucideIcon } from "lucide-react";

// ─── Icon map for judge panel ────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Scale,
  Shield,
  Sparkles,
  FileText,
  Gavel,
  StickyNote,
  Search,
  FileStack,
  BookOpen,
};

// ─── Shared props ────────────────────────────────────────────────────
interface ValueSlidePanelProps {
  role: UserRole | null;
  currentStep: number;
}

// ─── Apple-like cubic-bezier ─────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Judge Premium Panel ─────────────────────────────────────────────
function JudgePremiumPanel({ currentStep }: { currentStep: number }) {
  const step = JUDGE_PANEL_STEPS[currentStep] ?? JUDGE_PANEL_STEPS[0];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-between h-full bg-gradient-to-b from-slate-50 to-white p-10 relative overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
          <Scale className="w-5 h-5 text-purple-700" />
        </div>
        <span className="font-serif text-xl font-semibold text-gray-900">
          QanoonAI
        </span>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease }}
          className="space-y-6"
        >
          {/* Tag */}
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase text-purple-600">
            {step.tag}
          </span>

          {/* Heading */}
          <h2 className="text-[28px] leading-[1.2] font-serif font-bold text-gray-900 whitespace-pre-line">
            {step.heading}
          </h2>

          {/* Subtitle */}
          <p className="text-[15px] leading-relaxed text-gray-500 max-w-[300px]">
            {step.subtitle}
          </p>

          {/* Features */}
          <motion.div
            className="space-y-4 pt-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {step.features.map((feature) => {
              const Icon = ICON_MAP[feature.icon] ?? Scale;
              return (
                <motion.div
                  key={feature.label}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, ease },
                    },
                  }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                    <Icon className="w-[18px] h-[18px] text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {feature.label}
                    </p>
                    <p className="text-[13px] leading-snug text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Step dots */}
      <div className="flex gap-2">
        {JUDGE_PANEL_STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentStep
                ? "w-6 bg-purple-600"
                : "w-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Legacy Panel (all other roles) ─────────────────────────────────
function LegacySlidePanel({
  role,
  currentStep,
}: {
  role: UserRole | null;
  currentStep: number;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = role ? VALUE_SLIDES[role] : VALUE_SLIDES.lawyer;
  const colors = role ? ROLE_COLORS[role] : ROLE_COLORS.lawyer;

  useEffect(() => {
    const newIndex = currentStep % slides.length;
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setSlideIndex(newIndex);
      setIsTransitioning(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [currentStep, slides.length]);

  const currentSlide = slides[slideIndex];

  return (
    <div
      className={`hidden lg:flex lg:flex-col lg:justify-between h-full bg-gradient-to-br ${colors.gradient} text-white p-10 relative overflow-hidden`}
    >
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
      <div
        className={`relative z-10 space-y-6 transition-all duration-300 ${
          isTransitioning
            ? "opacity-0 translate-y-2"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="inline-block px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm">
          <span className="text-sm font-semibold tracking-wide">
            {currentSlide.stat}
          </span>
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

// ─── Exported component ──────────────────────────────────────────────
export function ValueSlidePanel({ role, currentStep }: ValueSlidePanelProps) {
  if (role === "judge") {
    return <JudgePremiumPanel currentStep={currentStep} />;
  }
  return <LegacySlidePanel role={role} currentStep={currentStep} />;
}
