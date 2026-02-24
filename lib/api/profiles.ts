import { apiFetch } from "./client";
import type {
  JudgeProfile,
  LawyerProfile,
  LawyerTourState,
} from "@/lib/types/shared";

export type { LawyerTourState } from "@/lib/types/shared";

export const profilesApi = {
  // --- Judge ---
  getJudgeProfile(): Promise<JudgeProfile> {
    return apiFetch("/profiles/judge");
  },

  updateJudgeProfile(data: Partial<JudgeProfile>): Promise<JudgeProfile> {
    return apiFetch("/profiles/judge", { method: "PUT", body: data });
  },

  getJudgeTourStatus(): Promise<{ tourCompleted: boolean }> {
    return apiFetch("/profiles/judge/tour-status");
  },

  completeJudgeTour(): Promise<{ success: boolean }> {
    return apiFetch("/profiles/judge/tour-complete", { method: "POST" });
  },

  // --- Lawyer ---
  getLawyerProfile(): Promise<LawyerProfile> {
    return apiFetch("/profiles/lawyer");
  },

  updateLawyerProfile(data: Partial<LawyerProfile>): Promise<LawyerProfile> {
    return apiFetch("/profiles/lawyer", { method: "PUT", body: data });
  },

  getLawyerTourState(): Promise<LawyerTourState> {
    return apiFetch("/profiles/lawyer/tour-state");
  },

  patchLawyerTourState(patch: Partial<LawyerTourState>): Promise<LawyerTourState> {
    return apiFetch("/profiles/lawyer/tour-state", { method: "PATCH", body: patch });
  },

  completeLawyerTourChapter(chapterId: string): Promise<LawyerTourState> {
    return apiFetch("/profiles/lawyer/tour-chapter-complete", {
      method: "POST",
      body: { chapter_id: chapterId },
    });
  },

  recordLawyerSectionVisit(route: string): Promise<LawyerTourState> {
    return apiFetch("/profiles/lawyer/tour-section-visit", {
      method: "POST",
      body: { route },
    });
  },

  markLawyerWelcomeShown(): Promise<LawyerTourState> {
    return apiFetch("/profiles/lawyer/tour-welcome-shown", { method: "POST" });
  },

  resetLawyerTour(): Promise<LawyerTourState> {
    return apiFetch("/profiles/lawyer/tour-reset", { method: "POST" });
  },
};
