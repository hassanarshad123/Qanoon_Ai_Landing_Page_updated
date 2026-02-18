"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { lawyerFirmSchema } from "@/lib/onboarding/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FIRM_TYPES } from "@/lib/onboarding/constants";
import type { LawyerFirmInfo as LawyerFirmInfoType } from "@/lib/onboarding/types";

type FormValues = z.infer<typeof lawyerFirmSchema>;

interface LawyerFirmInfoProps {
  data: LawyerFirmInfoType;
  onSubmit: (data: FormValues) => void;
  onBack: () => void;
}

export function LawyerFirmInfo({ data, onSubmit, onBack }: LawyerFirmInfoProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(lawyerFirmSchema),
    defaultValues: {
      firmType: data.firmType,
      firmName: data.firmName,
    },
  });

  const selectedType = form.watch("firmType");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
          Firm Information
        </h2>
        <p className="mt-2 text-gray-500">
          Tell us about your practice setup
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 max-w-lg mx-auto"
        >
          <FormField
            control={form.control}
            name="firmType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firm Type</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {FIRM_TYPES.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => field.onChange(type.value)}
                      className={cn(
                        "p-4 rounded-lg border-2 text-left transition-all",
                        field.value === type.value
                          ? "border-[#A21CAF] bg-[#A21CAF]/5"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <span
                        className={cn(
                          "text-sm font-medium",
                          field.value === type.value
                            ? "text-[#A21CAF]"
                            : "text-gray-700"
                        )}
                      >
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedType && selectedType !== "solo" && (
            <FormField
              control={form.control}
              name="firmName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firm Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Ahmed & Associates"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              type="submit"
              className="gap-2 bg-[#A21CAF] hover:bg-[#86198F] text-white"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
