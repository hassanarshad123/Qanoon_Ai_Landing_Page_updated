"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

interface OnboardingCompleteProps {
  role: "lawyer" | "judge";
  isSubmitting?: boolean;
}

export function OnboardingComplete({ role, isSubmitting }: OnboardingCompleteProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  const destination = role === "judge" ? "/judges" : "/lawyers";
  const roleLabel = role === "judge" ? "Judge" : "Lawyer";

  useEffect(() => {
    if (isSubmitting) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(destination);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, destination, isSubmitting]);

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
        <Loader2 className="w-12 h-12 text-[#A21CAF] animate-spin" />
        <p className="text-gray-500">Saving your information...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>

      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
          Welcome aboard!
        </h2>
        <p className="mt-2 text-gray-500">
          Your {roleLabel} workspace is ready.
        </p>
      </div>

      <p className="text-sm text-gray-400">
        Redirecting in {countdown}...
      </p>
    </div>
  );
}
