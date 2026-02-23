import { apiFetch } from "./client";

export interface JudgeProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  court_level: string | null;
  designation: string | null;
  province: string | null;
  city: string | null;
  court_name: string | null;
  tour_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface LawyerProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  bar_council_number: string | null;
  years_of_experience: string | null;
  practice_areas: string[];
  province: string | null;
  city: string | null;
  primary_court: string | null;
  firm_type: string | null;
  firm_name: string | null;
  tour_completed: boolean;
  created_at: string;
  updated_at: string;
}

export type LawyerTourState = Record<string, unknown>;

export const profilesApi = {
  // --- Judge ---
  getJudgeProfile(): Promise<JudgeProfile> {
    return apiFetch("/profiles/judge");
  },

  updateJudgeProfile(data: Partial<JudgeProfile>): Promise<JudgeProfile> {
    return apiFetch("/profiles/judge", { method: "PUT", body: data });
  },

  getJudgeTourStatus(): Promise<{ tour_completed: boolean }> {
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
