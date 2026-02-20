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

// ─── Accent icon positions (offsets from center) ─────────────────────
const ACCENT_POSITIONS = [
  { x: 48, y: -40 },   // top-right
  { x: -48, y: 44 },   // bottom-left
];

// ─── Shared props ────────────────────────────────────────────────────
interface ValueSlidePanelProps {
  role: UserRole | null;
  currentStep: number;
}

// ─── Judge Premium Panel (dark, Notion-style) ────────────────────────
function JudgePremiumPanel({ currentStep }: { currentStep: number }) {
  const step = JUDGE_PANEL_STEPS[currentStep] ?? JUDGE_PANEL_STEPS[0];
  const MainIcon = ICON_MAP[step.icon] ?? Scale;

  return (
    <div className="hidden lg:flex lg:flex-col h-full bg-gray-950 relative overflow-hidden">
      {/* Logo — top-left */}
      <div className="flex items-center gap-3 p-10 pb-0">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <Scale className="w-5 h-5 text-purple-400" />
        </div>
        <span className="font-serif text-xl font-semibold text-white">
          QanoonAI
        </span>
      </div>

      {/* Center area — icon composition + heading */}
      <div className="flex-1 flex flex-col items-center justify-center px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Icon composition */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Glow ring */}
              <motion.div
                className="absolute w-20 h-20 rounded-full bg-purple-500/10"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="relative z-10"
              >
                <MainIcon className="w-12 h-12 text-purple-400" strokeWidth={1.5} />
              </motion.div>

              {/* Accent icons */}
              {step.accents.map((name, i) => {
                const AccentIcon = ICON_MAP[name] ?? Sparkles;
                const pos = ACCENT_POSITIONS[i];
                return (
                  <motion.div
                    key={name}
                    className="absolute"
                    style={{ left: `calc(50% + ${pos.x}px - 10px)`, top: `calc(50% + ${pos.y}px - 10px)` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.7 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.15 * (i + 1),
                    }}
                  >
                    {/* Subtle float */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                    >
                      <AccentIcon className="w-5 h-5 text-purple-400/50" strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
              className="mt-6 text-2xl font-serif font-bold text-white text-center"
            >
              {step.heading}
            </motion.h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step dots — bottom center */}
      <div className="flex justify-center gap-2 p-10 pt-0">
        {JUDGE_PANEL_STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentStep
                ? "w-6 bg-purple-400"
                : "w-2 bg-white/20"
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
