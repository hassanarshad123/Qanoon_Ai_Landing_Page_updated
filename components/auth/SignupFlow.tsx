"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/lib/auth/schemas";
import { signupAction } from "@/lib/auth/actions";
import { saveOnboardingState } from "@/lib/onboarding/storage";
import { ROLE_COLORS } from "@/lib/onboarding/constants";
import type { UserRole } from "@/lib/onboarding/types";
import { toast } from "sonner";
import Link from "next/link";
import { Scale, Gavel, GraduationCap, Users, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const roles = [
  {
    id: "lawyer" as UserRole,
    label: "Lawyer",
    description: "Case management, legal research, and practice tools",
    icon: Scale,
  },
  {
    id: "judge" as UserRole,
    label: "Judge",
    description: "Judicial tools, case analysis, and bench resources",
    icon: Gavel,
  },
  {
    id: "law_student" as UserRole,
    label: "Law Student",
    description: "Study aids, case summaries, and exam preparation",
    icon: GraduationCap,
  },
  {
    id: "common_person" as UserRole,
    label: "Common Citizen",
    description: "Know your rights and find legal assistance",
    icon: Users,
  },
];

export function SignupFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  // Staggered card entrance on mount
  useEffect(() => {
    const t = setTimeout(() => setCardsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Form entrance when going to step 1
  useEffect(() => {
    if (step === 1) {
      setFormVisible(false);
      const t = setTimeout(() => setFormVisible(true), 50);
      return () => clearTimeout(t);
    }
  }, [step]);

  function handleRoleSelect(role: UserRole) {
    setSelectedRole(role);
    setStep(1);
  }

  async function onSubmit(data: SignupInput) {
    if (!selectedRole) return;
    setLoading(true);

    try {
      const result = await signupAction({ ...data, role: selectedRole });
      if (!result.success) {
        toast.error(result.error || "Signup failed");
        setLoading(false);
        return;
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.error("Account created but login failed. Please sign in manually.");
        router.push("/login");
        return;
      }

      // Seed onboarding state so it skips role selection
      saveOnboardingState({ role: selectedRole, currentStep: 0 });

      toast.success("Account created!");
      router.push("/onboarding");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const roleColors = selectedRole ? ROLE_COLORS[selectedRole] : null;

  return (
    <div className="flex min-h-screen">
      {/* Left panel — gradient */}
      <div className="hidden lg:flex lg:w-[40%] lg:min-h-screen relative overflow-hidden">
        {/* Base purple gradient (always present) */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 transition-opacity duration-700",
            selectedRole ? "opacity-0" : "opacity-100"
          )}
        />
        {/* Role-specific gradient (fades in on selection) */}
        {selectedRole && (
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-opacity duration-700",
              ROLE_COLORS[selectedRole].gradient,
              step === 1 ? "opacity-100" : "opacity-0"
            )}
          />
        )}

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-between h-full text-white p-10">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-64 h-64 border border-white rounded-full" />
            <div className="absolute bottom-20 left-10 w-40 h-40 border border-white rounded-full" />
            <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-white rounded-full" />
          </div>

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-xl font-semibold">QanoonAI</span>
            </div>
          </div>

          {/* Value text */}
          <div className="relative z-10 space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm">
              <span className="text-sm font-semibold tracking-wide">
                {step === 0 ? "Pakistan's Legal AI Platform" : "Join 500+ legal professionals"}
              </span>
            </div>
            <h2 className="text-3xl font-serif font-bold leading-tight">
              {step === 0
                ? "AI-powered tools for every legal professional"
                : "Create your account"}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-sm">
              {step === 0
                ? "Research, draft, and manage cases faster with intelligent AI that understands Pakistani law."
                : "Set up your workspace and start using QanoonAI in minutes."}
            </p>
          </div>

          {/* Slide indicators */}
          <div className="relative z-10 flex gap-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? "w-8 bg-white" : "w-3 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Mobile brand bar */}
        <div className="lg:hidden px-6 pt-6">
          <span className="font-serif text-lg font-semibold text-gray-900">QanoonAI</span>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-8">
          <div className="w-full max-w-lg">
            {step === 0 ? renderRoleStep() : renderAccountStep()}
          </div>
        </div>
      </div>
    </div>
  );

  function renderRoleStep() {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
            Tell us who you are
          </h2>
          <p className="mt-2 text-gray-500">
            We&apos;ll personalize QanoonAI just for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const colors = ROLE_COLORS[role.id];
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={cn(
                  "group relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-gray-200",
                  "hover:scale-[1.02] hover:shadow-lg cursor-pointer",
                  "hover:border-accent-dynamic hover:bg-accent-light",
                  "transition-all duration-300 ease-out",
                  cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{
                  ["--accent" as string]: colors.primary,
                  ["--accent-light" as string]: colors.light,
                  transitionDelay: `${150 + index * 100}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors bg-accent-light text-accent-dynamic">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {role.label}
                  </h3>
                  <p className="text-sm mt-1 text-gray-500">
                    {role.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#A21CAF] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  function renderAccountStep() {
    return (
      <div
        className={cn(
          "space-y-6 transition-all duration-500 ease-out",
          formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
        style={
          roleColors
            ? {
                ["--accent" as string]: roleColors.primary,
                ["--accent-hover" as string]: roleColors.hover,
                ["--accent-light" as string]: roleColors.light,
              }
            : undefined
        }
      >
        <div>
          <button
            onClick={() => setStep(0)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Change role
          </button>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-gray-500">
            Get started with QanoonAI as a{" "}
            <span className="font-medium text-accent-dynamic">
              {roles.find((r) => r.id === selectedRole)?.label}
            </span>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Min 8 chars, 1 uppercase, 1 number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Re-enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-white bg-accent-dynamic hover:bg-accent-hover transition-colors"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create account
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#A21CAF] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    );
  }
}
