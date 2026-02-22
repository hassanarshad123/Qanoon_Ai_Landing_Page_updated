"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Shield,
  Sparkles,
  UserCheck,
  Zap,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SIGNUP_PANEL_STEPS } from "@/lib/onboarding/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Scale,
  Shield,
  Sparkles,
  UserCheck,
  Zap,
  Star,
};

const ACCENT_POSITIONS = [
  { x: 48, y: -40 },
  { x: -48, y: 44 },
];

interface SignupPremiumPanelProps {
  step: number;
  accentColor: string;
}

export function SignupPremiumPanel({ step, accentColor }: SignupPremiumPanelProps) {
  const data = SIGNUP_PANEL_STEPS[step] ?? SIGNUP_PANEL_STEPS[0];
  const MainIcon = ICON_MAP[data.icon] ?? Scale;

  return (
    <div className="flex flex-col h-full w-full bg-gray-950 relative overflow-hidden">
      {/* Logo — top-left */}
      <div className="flex items-center gap-3 p-10 pb-0">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          animate={{ backgroundColor: accentColor + "33" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div animate={{ color: accentColor }} transition={{ duration: 0.5 }}>
            <Scale className="w-5 h-5" style={{ color: "inherit" }} />
          </motion.div>
        </motion.div>
        <span className="font-serif text-xl font-semibold text-white">QanoonAI</span>
      </div>

      {/* Center area — icon composition + heading + description */}
      <div className="flex-1 flex flex-col items-center justify-center px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
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
                className="absolute w-20 h-20 rounded-full"
                animate={{
                  scale: [1, 1.15, 1],
                  backgroundColor: accentColor + "1A",
                }}
                transition={{
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  backgroundColor: { duration: 0.5 },
                }}
              />

              {/* Main icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, color: accentColor }}
                transition={{
                  scale: { type: "spring", stiffness: 300, damping: 20 },
                  opacity: { type: "spring", stiffness: 300, damping: 20 },
                  color: { duration: 0.5 },
                }}
                className="relative z-10"
              >
                <MainIcon className="w-12 h-12" style={{ color: "inherit" }} strokeWidth={1.5} />
              </motion.div>

              {/* Accent icons */}
              {data.accents.map((name, i) => {
                const AccentIcon = ICON_MAP[name] ?? Sparkles;
                const pos = ACCENT_POSITIONS[i];
                return (
                  <motion.div
                    key={name}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${pos.x}px - 10px)`,
                      top: `calc(50% + ${pos.y}px - 10px)`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.7, color: accentColor + "80" }}
                    transition={{
                      scale: { type: "spring", stiffness: 300, damping: 20, delay: 0.15 * (i + 1) },
                      opacity: { type: "spring", stiffness: 300, damping: 20, delay: 0.15 * (i + 1) },
                      color: { duration: 0.5 },
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                    >
                      <AccentIcon className="w-5 h-5" style={{ color: "inherit" }} strokeWidth={1.5} />
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
              {data.heading}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 }}
              className="mt-3 text-sm text-gray-400 text-center max-w-xs"
            >
              {data.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step dots — bottom center */}
      <div className="flex justify-center gap-2 p-10 pt-0">
        {SIGNUP_PANEL_STEPS.map((_, i) => (
          <motion.div
            key={i}
            className="h-2 rounded-full"
            animate={{
              width: i === step ? 24 : 8,
              backgroundColor: i === step ? accentColor : "rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
