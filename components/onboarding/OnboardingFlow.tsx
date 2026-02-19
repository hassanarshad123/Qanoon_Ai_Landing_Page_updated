"use client";

import { useEffect } from "react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { toast } from "sonner";
import { ROLE_COLORS } from "@/lib/onboarding/constants";
import { OnboardingLayout } from "./OnboardingLayout";
import { RoleSelection } from "./steps/RoleSelection";
import { PersonalInfo } from "./steps/PersonalInfo";
import { LawyerPracticeDetails } from "./steps/LawyerPracticeDetails";
import { LawyerLocation } from "./steps/LawyerLocation";
import { LawyerFirmInfo } from "./steps/LawyerFirmInfo";
import { ReferralSource } from "./steps/ReferralSource";
import { JudgeJudicialInfo } from "./steps/JudgeJudicialInfo";
import { JudgeLocation } from "./steps/JudgeLocation";
import { StudentEducation } from "./steps/StudentEducation";
import { StudentInterests } from "./steps/StudentInterests";
import { CitizenConcern } from "./steps/CitizenConcern";
import { CitizenLocation } from "./steps/CitizenLocation";
import { OnboardingComplete } from "./OnboardingComplete";

interface OnboardingFlowProps {
  userId: string;
  userEmail: string;
  userName: string;
}

export function OnboardingFlow({ userId, userEmail, userName }: OnboardingFlowProps) {
  const {
    state,
    hydrated,
    isSubmitting,
    submitError,
    steps,
    totalSteps,
    setRole,
    nextStep,
    prevStep,
    updateLawyerData,
    updateJudgeData,
    updateLawStudentData,
    updateCommonPersonData,
  } = useOnboarding({ userId });

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const colors = state.role ? ROLE_COLORS[state.role] : null;
  const accentColor = colors?.primary ?? "#A21CAF";
  const hoverColor = colors?.hover ?? "#86198F";

  return (
    <OnboardingLayout
      role={state.role}
      currentStep={state.currentStep}
      totalSteps={totalSteps}
    >
      <div className="transition-opacity duration-300">
        {renderCurrentStep()}
      </div>
    </OnboardingLayout>
  );

  function renderCurrentStep() {
    // Step 0: Role selection
    if (state.currentStep === 0 || !state.role) {
      return <RoleSelection onSelect={setRole} userName={userName} />;
    }

    switch (state.role) {
      case "lawyer":
        return renderLawyerStep();
      case "judge":
        return renderJudgeStep();
      case "law_student":
        return renderLawStudentStep();
      case "common_person":
        return renderCommonPersonStep();
      default:
        return null;
    }
  }

  function renderLawyerStep() {
    switch (state.currentStep) {
      case 1:
        return (
          <PersonalInfo
            data={{ ...state.lawyerData.personalInfo, email: userEmail, fullName: userName || state.lawyerData.personalInfo.fullName }}
            onSubmit={(data) => {
              updateLawyerData("personalInfo", data);
              nextStep();
            }}
            onBack={prevStep}
            emailReadOnly
            accentColor={accentColor}
            hoverColor={hoverColor}
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
            accentColor={accentColor}
            hoverColor={hoverColor}
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
            accentColor={accentColor}
            hoverColor={hoverColor}
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
            accentColor={accentColor}
            hoverColor={hoverColor}
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
            accentColor={accentColor}
            hoverColor={hoverColor}
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
            data={{ ...state.judgeData.personalInfo, email: userEmail, fullName: userName || state.judgeData.personalInfo.fullName }}
            onSubmit={(data) => {
              updateJudgeData("personalInfo", data);
              nextStep();
            }}
            onBack={prevStep}
            emailReadOnly
            accentColor={accentColor}
            hoverColor={hoverColor}
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
            accentColor={accentColor}
            hoverColor={hoverColor}
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
            accentColor={accentColor}
            hoverColor={hoverColor}
          />
        );
      default:
        return <OnboardingComplete role="judge" isSubmitting={isSubmitting} />;
    }
  }

  function renderLawStudentStep() {
    switch (state.currentStep) {
      case 1:
        return (
          <PersonalInfo
            data={{ ...state.lawStudentData.personalInfo, email: userEmail, fullName: userName || state.lawStudentData.personalInfo.fullName }}
            onSubmit={(data) => {
              updateLawStudentData("personalInfo", data);
              nextStep();
            }}
            onBack={prevStep}
            emailReadOnly
            accentColor={accentColor}
            hoverColor={hoverColor}
          />
        );
      case 2:
        return (
          <StudentEducation
            data={state.lawStudentData.education}
            onSubmit={(data) => {
              updateLawStudentData("education", data);
              nextStep();
            }}
            onBack={prevStep}
            accentColor={accentColor}
            hoverColor={hoverColor}
          />
        );
      case 3:
        return (
          <StudentInterests
            data={state.lawStudentData.interests}
            onSubmit={(data) => {
              updateLawStudentData("interests", data);
              nextStep();
            }}
            onBack={prevStep}
            accentColor={accentColor}
            hoverColor={hoverColor}
          />
        );
      default:
        return <OnboardingComplete role="law_student" isSubmitting={isSubmitting} />;
    }
  }

  function renderCommonPersonStep() {
    switch (state.currentStep) {
      case 1:
        return (
          <PersonalInfo
            data={{ ...state.commonPersonData.personalInfo, email: userEmail, fullName: userName || state.commonPersonData.personalInfo.fullName }}
            onSubmit={(data) => {
              updateCommonPersonData("personalInfo", data);
              nextStep();
            }}
            onBack={prevStep}
            emailReadOnly
            accentColor={accentColor}
            hoverColor={hoverColor}
          />
        );
      case 2:
        return (
          <CitizenConcern
            data={state.commonPersonData.legalConcern}
            onSubmit={(data) => {
              updateCommonPersonData("legalConcern", data);
              nextStep();
            }}
            onBack={prevStep}
            accentColor={accentColor}
            hoverColor={hoverColor}
          />
        );
      case 3:
        return (
          <CitizenLocation
            data={state.commonPersonData.location}
            onSubmit={(data) => {
              updateCommonPersonData("location", data);
              nextStep();
            }}
            onBack={prevStep}
            accentColor={accentColor}
            hoverColor={hoverColor}
          />
        );
      default:
        return <OnboardingComplete role="common_person" isSubmitting={isSubmitting} />;
    }
  }
}
