"use server";

import { getUserId } from "@/lib/auth/session";
import { getOrCreateProfile, type LawyerProfile } from "@/lib/actions/lawyer-profile";
import { getRecentActivity, type ActivityEntry } from "@/lib/actions/activity";

export interface LawyerDashboardData {
  profile: LawyerProfile;
  recentActivity: ActivityEntry[];
}

export async function getLawyerDashboardData(): Promise<LawyerDashboardData> {
  const userId = await getUserId();
  const [profile, recentActivity] = await Promise.all([
    getOrCreateProfile(userId),
    getRecentActivity(userId, 10),
  ]);
  return { profile, recentActivity };
}
