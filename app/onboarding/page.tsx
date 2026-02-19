"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
      router.replace("/login");
      return;
    }
    if (session.user.onboardingCompleted) {
      const role = session.user.role;
      if (role === "judge") router.replace("/judges");
      else if (role === "lawyer") router.replace("/lawyers");
      else if (role === "admin") router.replace("/admin");
    }
  }, [session, status, router]);

  if (status === "loading" || !session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-[#A21CAF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (session.user.onboardingCompleted) return null;

  return (
    <OnboardingFlow
      userId={session.user.id}
      userEmail={session.user.email}
      userName={session.user.name}
    />
  );
}
