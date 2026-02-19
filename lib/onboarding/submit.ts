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
