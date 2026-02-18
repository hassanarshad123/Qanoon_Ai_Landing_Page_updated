"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { lawyerPracticeSchema } from "@/lib/onboarding/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PRACTICE_AREAS, EXPERIENCE_RANGES } from "@/lib/onboarding/constants";
import type { LawyerPracticeDetails as LawyerPracticeDetailsType } from "@/lib/onboarding/types";

type FormValues = z.infer<typeof lawyerPracticeSchema>;

interface LawyerPracticeDetailsProps {
  data: LawyerPracticeDetailsType;
  onSubmit: (data: FormValues) => void;
  onBack: () => void;
}

export function LawyerPracticeDetails({
  data,
  onSubmit,
  onBack,
}: LawyerPracticeDetailsProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(lawyerPracticeSchema),
    defaultValues: {
      barCouncilNumber: data.barCouncilNumber,
      yearsOfExperience: data.yearsOfExperience,
      practiceAreas: data.practiceAreas,
    },
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
          Practice Details
        </h2>
        <p className="mt-2 text-gray-500">
          Tell us about your legal practice
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 max-w-lg mx-auto"
        >
          <FormField
            control={form.control}
            name="barCouncilNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bar Council Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. LHC/2020/1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EXPERIENCE_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="practiceAreas"
            render={() => (
              <FormItem>
                <FormLabel>Practice Areas</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {PRACTICE_AREAS.map((area) => (
                    <FormField
                      key={area}
                      control={form.control}
                      name="practiceAreas"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(area)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                field.onChange(
                                  checked
                                    ? [...current, area]
                                    : current.filter((v: string) => v !== area)
                                );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {area}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

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
