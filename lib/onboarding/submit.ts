"use server";

import { sql } from "@/lib/db";

type SubmitResult = { success: boolean; error: string | null };

const VALID_ROLES = ["lawyer", "judge", "law_student", "common_person"];

export async function submitOnboarding(
  role: string,
  email: string,
  data: Record<string, unknown>,
  userId?: string
): Promise<SubmitResult> {
  try {
    if (!VALID_ROLES.includes(role)) {
      return { success: false, error: "Invalid role" };
    }
    if (!email || typeof email !== "string") {
      return { success: false, error: "Email is required" };
    }
    if (!data || typeof data !== "object") {
      return { success: false, error: "Form data is required" };
    }

    const personalInfo = data.personalInfo as
      | { fullName?: string; phone?: string }
      | undefined;
    const fullName = personalInfo?.fullName ?? null;
    const phone = personalInfo?.phone ?? null;

    await sql`
      INSERT INTO onboarding_submissions (role, email, data, full_name, phone, user_id)
      VALUES (${role}, ${email}, ${JSON.stringify(data)}::jsonb, ${fullName}, ${phone}, ${userId ?? null})
      ON CONFLICT (email) DO UPDATE SET
        role = EXCLUDED.role,
        data = EXCLUDED.data,
        full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        user_id = EXCLUDED.user_id,
        updated_at = now()
    `;

    // Update the users table with role and onboarding status
    if (userId) {
      await sql`
        UPDATE users
        SET role = ${role}, onboarding_completed = true, updated_at = now()
        WHERE id = ${userId}
      `;

      // Auto-create judge_profiles row for judges
      if (role === "judge") {
        const courtInfo = data.courtInfo as
          | { courtLevel?: string; designation?: string; province?: string; city?: string; courtName?: string }
          | undefined;

        await sql`
          INSERT INTO judge_profiles (user_id, full_name, email, phone, court_level, designation, province, city, court_name)
          VALUES (
            ${userId},
            ${fullName},
            ${email},
            ${phone},
            ${courtInfo?.courtLevel ?? null},
            ${courtInfo?.designation ?? null},
            ${courtInfo?.province ?? null},
            ${courtInfo?.city ?? null},
            ${courtInfo?.courtName ?? null}
          )
          ON CONFLICT (user_id) DO UPDATE SET
            full_name = COALESCE(EXCLUDED.full_name, judge_profiles.full_name),
            email = COALESCE(EXCLUDED.email, judge_profiles.email),
            phone = COALESCE(EXCLUDED.phone, judge_profiles.phone),
            court_level = COALESCE(EXCLUDED.court_level, judge_profiles.court_level),
            designation = COALESCE(EXCLUDED.designation, judge_profiles.designation),
            province = COALESCE(EXCLUDED.province, judge_profiles.province),
            city = COALESCE(EXCLUDED.city, judge_profiles.city),
            court_name = COALESCE(EXCLUDED.court_name, judge_profiles.court_name),
            updated_at = now()
        `;
      }
    }

    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Onboarding submission failed:", message);
    return { success: false, error: message };
  }
}

export async function submitComingSoonEmail(
  role: string,
  email: string
): Promise<SubmitResult> {
  try {
    if (!VALID_ROLES.includes(role)) {
      return { success: false, error: "Invalid role" };
    }
    if (!email || typeof email !== "string") {
      return { success: false, error: "Email is required" };
    }

    await sql`
      INSERT INTO coming_soon_signups (role, email)
      VALUES (${role}, ${email})
      ON CONFLICT (email, role) DO NOTHING
    `;
    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Coming soon signup failed:", message);
    return { success: false, error: message };
  }
}
