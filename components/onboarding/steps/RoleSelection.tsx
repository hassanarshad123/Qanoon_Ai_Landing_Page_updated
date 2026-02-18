"use client";

import { Scale, Gavel, GraduationCap, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { UserRole } from "@/lib/onboarding/types";

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

const roles = [
  {
    id: "lawyer" as UserRole,
    label: "Lawyer",
    description: "Access case management, legal research, and practice tools",
    icon: Scale,
    available: true,
  },
  {
    id: "judge" as UserRole,
    label: "Judge",
    description: "Access judicial tools, case analysis, and bench resources",
    icon: Gavel,
    available: true,
  },
  {
    id: "law_student" as UserRole,
    label: "Law Student",
    description: "Study aids, case briefs, and exam preparation tools",
    icon: GraduationCap,
    available: false,
  },
  {
    id: "common_person" as UserRole,
    label: "Common Citizen",
    description: "Understand your legal rights and find legal assistance",
    icon: Users,
    available: false,
  },
];

export function RoleSelection({ onSelect }: RoleSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
          Welcome to QanoonAI
        </h2>
        <p className="mt-2 text-gray-500">
          Tell us about yourself so we can personalize your experience
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => onSelect(role.id)}
              className={cn(
                "relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all text-left",
                role.available
                  ? "border-gray-200 hover:border-[#A21CAF] hover:bg-[#A21CAF]/5 cursor-pointer"
                  : "border-gray-100 bg-gray-50 cursor-pointer"
              )}
            >
              {!role.available && (
                <Badge className="absolute top-3 right-3 bg-gray-200 text-gray-600 hover:bg-gray-200">
                  Coming Soon
                </Badge>
              )}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  role.available ? "bg-[#A21CAF]/10 text-[#A21CAF]" : "bg-gray-200 text-gray-400"
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3
                  className={cn(
                    "font-semibold text-lg",
                    role.available ? "text-gray-900" : "text-gray-400"
                  )}
                >
                  {role.label}
                </h3>
                <p
                  className={cn(
                    "text-sm mt-1",
                    role.available ? "text-gray-500" : "text-gray-400"
                  )}
                >
                  {role.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
