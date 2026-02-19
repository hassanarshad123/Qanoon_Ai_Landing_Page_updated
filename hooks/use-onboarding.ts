"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { OnboardingState, UserRole } from "@/lib/onboarding/types";
import {
  getOnboardingState,
  saveOnboardingState,
  clearOnboardingState,
  getDefaultState,
} from "@/lib/onboarding/storage";
import { LAWYER_STEPS, JUDGE_STEPS } from "@/lib/onboarding/constants";
import { submitOnboarding } from "@/lib/onboarding/submit";

interface UseOnboardingOptions {
  userId?: string;
}

export function useOnboarding(options: UseOnboardingOptions = {}) {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [state, setState] = useState<OnboardingState>(getDefaultState());
  const [hydrated, setHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setState(getOnboardingState());
    setHydrated(true);
  }, []);

  const persist = useCallback((updates: Partial<OnboardingState>) => {
    setState((prev) => {
      const next = { ...prev, ...updates };
      saveOnboardingState(next);
      return next;
    });
  }, []);

  const setRole = useCallback(
    (role: UserRole) => {
      persist({ role, currentStep: 1 });
    },
    [persist]
  );

  const steps = state.role === "judge" ? JUDGE_STEPS : LAWYER_STEPS;
  const totalSteps = steps.length;
  const isLastStep = state.currentStep >= totalSteps - 1;

  const nextStep = useCallback(async () => {
    if (isLastStep) {
      setIsSubmitting(true);
      setSubmitError(null);
      const role = state.role as "lawyer" | "judge";
      const formData = role === "lawyer" ? state.lawyerData : state.judgeData;
      const email =
        role === "lawyer"
          ? state.lawyerData.personalInfo.email
          : state.judgeData.personalInfo.email;

      try {
        const result = await submitOnboarding(role, email, formData as unknown as Record<string, unknown>, options.userId);

        if (!result.success) {
          setSubmitError(result.error ?? "Submission failed. Please try again.");
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        setSubmitError(message);
        setIsSubmitting(false);
        return;
      }

      // Update the NextAuth session with the new role
      if (options.userId) {
        await updateSession({ role, onboardingCompleted: true });
      }

      setIsSubmitting(false);
      const redirectTo = role === "judge" ? "/judges" : "/lawyers";
      clearOnboardingState();
      router.push(redirectTo);
      return;
    }
    persist({ currentStep: state.currentStep + 1 });
  }, [isLastStep, state.role, state.lawyerData, state.judgeData, state.currentStep, persist, router, options.userId, updateSession]);

  const prevStep = useCallback(() => {
    if (state.currentStep <= 0) return;
    persist({ currentStep: state.currentStep - 1 });
  }, [state.currentStep, persist]);

  const updateLawyerData = useCallback(
    (section: keyof OnboardingState["lawyerData"], data: Record<string, unknown>) => {
      setState((prev) => {
        const next = {
          ...prev,
          lawyerData: {
            ...prev.lawyerData,
            [section]: { ...prev.lawyerData[section], ...data },
          },
        };
        saveOnboardingState(next);
        return next;
      });
    },
    []
  );

  const updateJudgeData = useCallback(
    (section: keyof OnboardingState["judgeData"], data: Record<string, unknown>) => {
      setState((prev) => {
        const next = {
          ...prev,
          judgeData: {
            ...prev.judgeData,
            [section]: { ...prev.judgeData[section], ...data },
          },
        };
        saveOnboardingState(next);
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    clearOnboardingState();
    setState(getDefaultState());
  }, []);

  return {
    state,
    hydrated,
    isSubmitting,
    submitError,
    steps,
    totalSteps,
    isLastStep,
    setRole,
    nextStep,
    prevStep,
    updateLawyerData,
    updateJudgeData,
    persist,
    reset,
  };
}
