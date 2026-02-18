"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gavel, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/judges/shared/page-header";
import { CaseSelector } from "@/components/judges/shared/case-selector";
import { LegalStatusBadge } from "@/components/judges/shared/legal-status-badge";
import { getJudgments, getBriefs } from "@/lib/mock/api";
import type { Judgment, Brief, EnhancedBrief } from "@/lib/mock/types";

export default function JudgmentListPage() {
  const router = useRouter();
  const [judgments, setJudgments] = useState<Judgment[]>([]);
  const [briefs, setBriefs] = useState<(Brief | EnhancedBrief)[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState<string>("");
  const [selectedBriefId, setSelectedBriefId] = useState<string>("");
  const [creationMode, setCreationMode] = useState<"case" | "brief">("case");

  useEffect(() => {
    async function loadData() {
      try {
        const [judgmentsData, briefsData] = await Promise.all([
          getJudgments(),
          getBriefs(),
        ]);
        setJudgments(judgmentsData);
        setBriefs(briefsData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleGenerateSkeleton = () => {
    if (creationMode === "case" && selectedCaseId) {
      // Navigate to the first judgment for demo purposes
      const existingJudgment = judgments.find(
        (j) => j.caseId === selectedCaseId
      );
      if (existingJudgment) {
        router.push(`/judges/judgment/${existingJudgment.id}`);
      } else {
        router.push(`/judges/judgment/${judgments[0]?.id ?? "jdg-001"}`);
      }
    } else if (creationMode === "brief" && selectedBriefId) {
      const brief = briefs.find((b) => b.id === selectedBriefId);
      if (brief) {
        const existingJudgment = judgments.find(
          (j) => j.caseId === brief.caseId
        );
        if (existingJudgment) {
          router.push(`/judges/judgment/${existingJudgment.id}`);
        } else {
          router.push(`/judges/judgment/${judgments[0]?.id ?? "jdg-001"}`);
        }
      }
    }
  };

  const canGenerate =
    (creationMode === "case" && selectedCaseId) ||
    (creationMode === "brief" && selectedBriefId);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        label="Judgment"
        title="Judgment Assistant"
        description="AI-assisted judgment drafting with precedent suggestions"
      />

      {/* New Judgment Creation Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#A21CAF]/10 flex items-center justify-center">
              <Gavel className="h-4 w-4 text-[#A21CAF]" />
            </div>
            Create New Judgment Draft
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={creationMode}
            onValueChange={(v) => setCreationMode(v as "case" | "brief")}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="case">Select a Case</TabsTrigger>
              <TabsTrigger value="brief">Start from Existing Brief</TabsTrigger>
            </TabsList>

            <TabsContent value="case">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Choose a case to generate a judgment skeleton with AI-powered
                  analysis and precedent suggestions.
                </p>
                <CaseSelector
                  value={selectedCaseId}
                  onSelect={setSelectedCaseId}
                  placeholder="Select a case to draft judgment..."
                />
              </div>
            </TabsContent>

            <TabsContent value="brief">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Generate a judgment skeleton from an existing case brief to
                  save time and maintain consistency.
                </p>
                <Select
                  value={selectedBriefId}
                  onValueChange={setSelectedBriefId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an existing brief..." />
                  </SelectTrigger>
                  <SelectContent>
                    {briefs.map((brief) => (
                      <SelectItem key={brief.id} value={brief.id}>
                        <div className="flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-gray-400" />
                          <span>{brief.caseTitle}</span>
                          <span className="text-xs text-gray-400 ml-1">
                            ({brief.status})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button
              onClick={handleGenerateSkeleton}
              disabled={!canGenerate}
              className="bg-[#A21CAF] hover:bg-[#86198F] text-white"
            >
              <Gavel className="h-4 w-4 mr-2" />
              Generate Judgment Skeleton
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Previous Judgment Drafts */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Previous Judgment Drafts
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : judgments.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Gavel className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No judgment drafts yet. Create your first one above.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {judgments.map((judgment) => (
              <Link
                key={judgment.id}
                href={`/judges/judgment/${judgment.id}`}
                className="group"
              >
                <Card className="h-full hover:shadow-md transition-shadow group-hover:border-[#A21CAF]/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                        <Gavel className="h-4 w-4 text-amber-600" />
                      </div>
                      <LegalStatusBadge status={judgment.status} />
                    </div>

                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-[#A21CAF] transition-colors">
                      {judgment.caseTitle}
                    </h3>

                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">
                        Created:{" "}
                        {new Date(judgment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-xs text-gray-400">
                        {judgment.sections.length} sections &middot;{" "}
                        {judgment.suggestedPrecedents.length} precedents
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
