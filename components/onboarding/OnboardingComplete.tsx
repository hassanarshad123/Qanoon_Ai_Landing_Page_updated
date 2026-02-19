"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { UserRole } from "@/lib/onboarding/types";

type Phase =
  | "dissolve"
  | "law"
  | "ai"
  | "convergence"
  | "status"
  | "welcome"
  | "exit";

const ROLE_SUBTITLES: Record<string, string> = {
  judge: "Your Honor, your bench awaits.",
  lawyer: "Your practice, reimagined.",
  law_student: "Your journey in law begins here.",
  common_person: "Justice, accessible to all.",
};

const STATUS_LINES = [
  "Profile verified",
  "Workspace configured",
  "AI assistant ready",
];

// Generate particle configs at module level (not in render)
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() > 0.5 ? "w-2 h-2" : "w-1 h-1",
  opacity: Math.random() > 0.5 ? "bg-purple-400/20" : "bg-white/10",
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 3,
}));

interface OnboardingCompleteProps {
  role: UserRole;
  displayName: string;
  onComplete: () => void;
}

export function OnboardingComplete({
  role,
  displayName,
  onComplete,
}: OnboardingCompleteProps) {
  const [phase, setPhase] = useState<Phase>("dissolve");
  const calledRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (mq.matches) {
      setPhase("welcome");
      timers.push(
        setTimeout(() => {
          if (!calledRef.current) {
            calledRef.current = true;
            onComplete();
          }
        }, 2000)
      );
    } else {
      timers.push(setTimeout(() => setPhase("law"), 800));
      timers.push(setTimeout(() => setPhase("ai"), 3000));
      timers.push(setTimeout(() => setPhase("convergence"), 5000));
      timers.push(setTimeout(() => setPhase("status"), 7000));
      timers.push(setTimeout(() => setPhase("welcome"), 8800));
      timers.push(setTimeout(() => setPhase("exit"), 10500));
      timers.push(
        setTimeout(() => {
          if (!calledRef.current) {
            calledRef.current = true;
            onComplete();
          }
        }, 11000)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const subtitle = ROLE_SUBTITLES[role] || "Welcome aboard.";
  const firstName = displayName?.split(" ")[0] || "";

  const showLaw =
    phase === "law" ||
    phase === "ai" ||
    phase === "convergence";
  const showAI = phase === "ai" || phase === "convergence";
  const isConverging = phase === "convergence";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/90 to-gray-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.size} ${p.opacity}`}
          style={{ top: p.top, left: p.left }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {/* Phases: law, ai, convergence */}
        {(showLaw || showAI) && (
          <motion.div
            key="icons-group"
            className="relative flex items-center justify-center w-full"
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            {/* Law icon group */}
            <motion.div
              className="absolute flex flex-col items-center"
              initial={{ x: -80, opacity: 0 }}
              animate={{
                x: isConverging ? 0 : -80,
                opacity: 1,
                ...(isConverging && {
                  transition: {
                    x: { type: "spring", stiffness: 120, damping: 20 },
                    opacity: { duration: 0.3 },
                  },
                }),
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Scales of Justice SVG */}
              <motion.svg
                viewBox="0 0 80 80"
                fill="none"
                className="w-14 h-14 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Center pillar */}
                <motion.line
                  x1="40" y1="12" x2="40" y2="68"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                />
                {/* Top beam */}
                <motion.line
                  x1="16" y1="22" x2="64" y2="22"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                />
                {/* Left chain */}
                <motion.line
                  x1="16" y1="22" x2="16" y2="40"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                />
                {/* Right chain */}
                <motion.line
                  x1="64" y1="22" x2="64" y2="40"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                />
                {/* Left bowl */}
                <motion.path
                  d="M6 40 Q16 52 26 40"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
                />
                {/* Right bowl */}
                <motion.path
                  d="M54 40 Q64 52 74 40"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
                />
                {/* Base */}
                <motion.line
                  x1="28" y1="68" x2="52" y2="68"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.9 }}
                />
                {/* Top finial */}
                <motion.circle
                  cx="40" cy="12"
                  r="3"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                />
              </motion.svg>

              {/* LAW label */}
              <motion.span
                className="mt-3 text-xs tracking-[0.3em] uppercase text-white/60 font-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                Law
              </motion.span>
            </motion.div>

            {/* AI icon group */}
            {showAI && (
              <motion.div
                className="absolute flex flex-col items-center"
                initial={{ x: 80, opacity: 0 }}
                animate={{
                  x: isConverging ? 0 : 80,
                  opacity: 1,
                  ...(isConverging && {
                    transition: {
                      x: { type: "spring", stiffness: 120, damping: 20 },
                      opacity: { duration: 0.3 },
                    },
                  }),
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Neural Network SVG */}
                <motion.svg
                  viewBox="0 0 80 80"
                  fill="none"
                  className="w-14 h-14 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20"
                  style={{
                    filter:
                      "drop-shadow(0 0 6px rgba(167,139,250,0.5))",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Lines from center to outer nodes */}
                  {[
                    { x: 40, y: 10 },
                    { x: 68, y: 30 },
                    { x: 58, y: 65 },
                    { x: 22, y: 65 },
                    { x: 12, y: 30 },
                  ].map((node, i) => (
                    <motion.line
                      key={`line-${i}`}
                      x1="40"
                      y1="40"
                      x2={node.x}
                      y2={node.y}
                      stroke="#A78BFA"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                  {/* Outer nodes */}
                  {[
                    { x: 40, y: 10 },
                    { x: 68, y: 30 },
                    { x: 58, y: 65 },
                    { x: 22, y: 65 },
                    { x: 12, y: 30 },
                  ].map((node, i) => (
                    <motion.circle
                      key={`node-${i}`}
                      cx={node.x}
                      cy={node.y}
                      r="5"
                      stroke="#A78BFA"
                      strokeWidth="1.5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.5 + i * 0.1,
                      }}
                    />
                  ))}
                  {/* Central node */}
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="6"
                    stroke="#A78BFA"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.2,
                    }}
                  />
                  {/* Pulsing dot on central node */}
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="3"
                    fill="#A78BFA"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8,
                    }}
                  />
                </motion.svg>

                {/* AI label */}
                <motion.span
                  className="mt-3 text-xs tracking-[0.3em] uppercase text-white/60 font-sans"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Artificial Intelligence
                </motion.span>
              </motion.div>
            )}

            {/* Convergence glow + tagline */}
            {isConverging && (
              <>
                {/* Radial glow behind merge point */}
                <motion.div
                  className="absolute w-40 h-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(162,28,175,0.4) 0%, transparent 70%)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Tagline */}
                <motion.div
                  className="absolute mt-40 sm:mt-44 flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                  <p className="font-serif text-lg sm:text-xl text-white/80 font-light">
                    Where Law Meets Intelligence
                  </p>
                  {/* Thin horizontal line */}
                  <motion.div
                    className="h-px bg-white/30 mt-4"
                    initial={{ width: 0 }}
                    animate={{ width: 120 }}
                    transition={{
                      duration: 0.8,
                      delay: 1.0,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>
              </>
            )}
          </motion.div>
        )}

        {/* Phase: Status */}
        {phase === "status" && (
          <motion.div
            key="status-group"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              {STATUS_LINES.map((line, i) => (
                <motion.div
                  key={line}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: i * 0.35,
                  }}
                >
                  <motion.svg
                    viewBox="0 0 20 20"
                    className="w-5 h-5 flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: i * 0.35 + 0.15,
                    }}
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="rgba(168,85,247,0.2)"
                    />
                    <motion.path
                      d="M6 10.5 L8.5 13 L14 7.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: i * 0.35 + 0.25,
                      }}
                    />
                  </motion.svg>
                  <span className="text-sm sm:text-base text-gray-400">
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase: Welcome */}
        {phase === "welcome" && (
          <motion.div
            key="welcome"
            className="flex flex-col items-center text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              Welcome to Qanoon AI
              {firstName ? `, ${firstName}` : ""}
            </motion.h1>
            <motion.p
              className="mt-4 text-base sm:text-lg text-gray-400 font-light"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        )}

        {/* Phase: Exit */}
        {phase === "exit" && (
          <motion.div
            key="exit"
            className="flex flex-col items-center text-center px-6"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
              Welcome to Qanoon AI
              {firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-400 font-light">
              {subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
