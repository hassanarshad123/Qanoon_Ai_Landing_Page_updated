import { apiFetch } from "./client";

export const dashboardApi = {
  getJudgeDashboard(): Promise<unknown> {
    return apiFetch("/dashboard/judge");
  },

  getLawyerDashboard(): Promise<unknown> {
    return apiFetch("/dashboard/lawyer");
  },
};
