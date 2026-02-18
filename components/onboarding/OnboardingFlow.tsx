"use client";

import { useEffect } from "react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { toast } from "sonner";
import { OnboardingStepIndicator } from "./OnboardingStepIndicator";
import { RoleSelection } from "./steps/RoleSelection";
import { PersonalInfo } from "./steps/PersonalInfo";
import { LawyerPracticeDetails } from "./steps/LawyerPracticeDetails";
import { LawyerLocation } from "./steps/LawyerLocation";
import { LawyerFirmInfo } from "./steps/LawyerFirmInfo";
import { ReferralSource } from "./steps/ReferralSource";
import { JudgeJudicialInfo } from "./steps/JudgeJudicialInfo";
import { JudgeLocation } from "./steps/JudgeLocation";
import { ComingSoonView } from "./ComingSoonView";
import { OnboardingComplete } from "./OnboardingComplete";

export function OnboardingFlow() {
  const {
    state,
    hydrated,
    isSubmitting,
    submitError,
    steps,
    setRole,
    nextStep,
    prevStep,
    updateLawyerData,
    updateJudgeData,
    reset,
  } = useOnboarding();

  useEffect(() => {
    if (submitError) {
      toast.error("Submission failed", {
        description: submitError,
        action: {
          label: "Retry",
          onClick: () => nextStep(),
        },
      });
    }
  }, [submitError, nextStep]);

  // Prevent hydration mismatch
  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#A21CAF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Coming Soon for unavailable roles
  if (state.role === "law_student" || state.role === "common_person") {
    return <ComingSoonView role={state.role} onBack={reset} />;
  }

  // Step 0: Role selection
  if (state.currentStep === 0 || !state.role) {
    return <RoleSelection onSelect={setRole} />;
  }

  // Lawyer flow
  if (state.role === "lawyer") {
    return (
      <div className="space-y-8">
        <OnboardingStepIndicator steps={steps} currentStep={state.currentStep} />
        {renderLawyerStep()}
      </div>
    );
  }

  // Judge flow
  if (state.role === "judge") {
    return (
      <div className="space-y-8">
        <OnboardingStepIndicator steps={steps} currentStep={state.currentStep} />
        {renderJudgeStep()}
      </div>
    );
  }

  return null;

  function renderLawyerStep() {
    switch (state.currentStep) {
      case 1:
        return (
          <PersonalInfo
            data={state.lawyerData.personalInfo}
            onSubmit={(data) => {
              updateLawyerData("personalInfo", data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <LawyerPracticeDetails
            data={state.lawyerData.practiceDetails}
            onSubmit={(data) => {
              updateLawyerData("practiceDetails", data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <LawyerLocation
            data={state.lawyerData.location}
            onSubmit={(data) => {
              updateLawyerData("location", data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <LawyerFirmInfo
            data={state.lawyerData.firmInfo}
            onSubmit={(data) => {
              updateLawyerData("firmInfo", data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <ReferralSource
            data={state.lawyerData.referral}
            onSubmit={(data) => {
              updateLawyerData("referral", data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      default:
        return <OnboardingComplete role="lawyer" isSubmitting={isSubmitting} />;
    }
  }

  function renderJudgeStep() {
    switch (state.currentStep) {
      case 1:
        return (
          <PersonalInfo
            data={state.judgeData.personalInfo}
            onSubmit={(data) => {
              updateJudgeData("personalInfo", data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <JudgeJudicialInfo
            data={state.judgeData.judicialInfo}
            onSubmit={(data) => {
              updateJudgeData("judicialInfo", data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <JudgeLocation
            data={state.judgeData.location}
            onSubmit={(data) => {
              updateJudgeData("location", data);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      default:
        return <OnboardingComplete role="judge" isSubmitting={isSubmitting} />;
    }
  }
}
