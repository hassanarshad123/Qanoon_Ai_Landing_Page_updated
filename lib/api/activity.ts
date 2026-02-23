import { apiFetch } from "./client";

export interface ActivityEntry {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  entity_title: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export const activityApi = {
  getRecent(limit = 20): Promise<ActivityEntry[]> {
    return apiFetch(`/activity/recent?limit=${limit}`);
  },
};
