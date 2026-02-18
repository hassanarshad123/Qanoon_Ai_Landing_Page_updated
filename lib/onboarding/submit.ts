"use server";

import { sql } from "@/lib/db";

type SubmitResult = { success: boolean; error: string | null };

const VALID_ROLES = ["lawyer", "judge", "law_student", "common_person"];

export async function submitOnboarding(
  role: string,
  email: string,
  data: Record<string, unknown>
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
      INSERT INTO onboarding_submissions (role, email, data, full_name, phone)
      VALUES (${role}, ${email}, ${JSON.stringify(data)}::jsonb, ${fullName}, ${phone})
      ON CONFLICT (email) DO UPDATE SET
        role = EXCLUDED.role,
        data = EXCLUDED.data,
        full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        updated_at = now()
    `;
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
