"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { referralSchema } from "@/lib/onboarding/schemas";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Check } from "lucide-react";
import { REFERRAL_SOURCES } from "@/lib/onboarding/constants";
import type { ReferralInfo } from "@/lib/onboarding/types";

type FormValues = z.infer<typeof referralSchema>;

interface ReferralSourceProps {
  data: ReferralInfo;
  onSubmit: (data: FormValues) => void;
  onBack: () => void;
}

export function ReferralSource({ data, onSubmit, onBack }: ReferralSourceProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      source: data.source,
      otherDetail: data.otherDetail,
    },
  });

  const selectedSource = form.watch("source");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
          One last thing
        </h2>
        <p className="mt-2 text-gray-500">
          How did you hear about QanoonAI? (Optional)
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-2"
                  >
                    {REFERRAL_SOURCES.map((source) => (
                      <FormItem
                        key={source}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={source} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {source}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedSource === "Other" && (
            <FormField
              control={form.control}
              name="otherDetail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please specify</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex items-center justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onSubmit({ source: "", otherDetail: "" })}
              >
                Skip
              </Button>
              <Button
                type="submit"
                className="gap-2 text-white bg-accent-dynamic hover:bg-accent-hover transition-colors"
              >
                Complete
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
