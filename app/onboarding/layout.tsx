"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#A21CAF]" />
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              QanoonAI
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">{children}</div>
      </main>
      <Toaster richColors />
    </div>
  );
}
