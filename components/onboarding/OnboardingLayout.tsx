"use client";

import type { UserRole } from "@/lib/onboarding/types";
import { ROLE_COLORS } from "@/lib/onboarding/constants";
import { OnboardingProgressBar } from "./OnboardingProgressBar";
import { ValueSlidePanel } from "./ValueSlidePanel";

interface OnboardingLayoutProps {
  role: UserRole | null;
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

export function OnboardingLayout({ role, currentStep, totalSteps, children }: OnboardingLayoutProps) {
  const colors = role ? ROLE_COLORS[role] : ROLE_COLORS.lawyer;
  const showProgress = currentStep > 0 && role;

  return (
    <div className="flex min-h-screen">
      {/* Left panel — brand + value slides (hidden on mobile) */}
      <div className="hidden lg:block lg:w-[40%] lg:min-h-screen">
        <ValueSlidePanel role={role} currentStep={currentStep} />
      </div>

      {/* Right panel — form area */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Progress bar */}
        {showProgress && (
          <div className="px-6 sm:px-10 pt-6">
            <OnboardingProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              color={colors.primary}
            />
          </div>
        )}

        {/* Mobile brand bar (visible only on mobile when no progress) */}
        {!showProgress && (
          <div className="lg:hidden px-6 pt-6">
            <span className="font-serif text-lg font-semibold text-gray-900">QanoonAI</span>
          </div>
        )}

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-8">
          <div className="w-full max-w-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
