"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Plus, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/judges/shared/page-header";
import { LegalStatusBadge } from "@/components/judges/shared/legal-status-badge";
import { MultiDocumentUpload } from "@/components/judges/shared/multi-document-upload";
import { CaseSelector } from "@/components/judges/shared/case-selector";
import { EmptyState } from "@/components/judges/shared/empty-state";
import { ExtractionProgress } from "@/components/judges/shared/extraction-progress";
import { useBriefPipeline } from "@/hooks/use-brief-pipeline";
import { listBriefs, saveBrief } from "@/lib/brief/actions";
import type { Brief, EnhancedBrief, UploadedDocument } from "@/lib/mock/types";

export default function BriefListPage() {
  const router = useRouter();
  const [briefs, setBriefs] = useState<(Brief | EnhancedBrief)[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<string>("");
  const [documentsReady, setDocumentsReady] = useState<UploadedDocument[] | null>(null);
  const [saving, setSaving] = useState(false);

  const pipeline = useBriefPipeline();

  useEffect(() => {
    listBriefs().then((data) => {
      setBriefs(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  // When pipeline completes, save to DB and navigate
  useEffect(() => {
    if (pipeline.phase === "complete" && pipeline.generatedSections.length > 0 && documentsReady && !saving) {
      setSaving(true);

      const caseTitle = pipeline.extractedData?.courtInfo?.caseNumber
        ? `Case ${pipeline.extractedData.courtInfo.caseNumber}`
        : `Generated Brief — ${new Date().toLocaleDateString()}`;

      saveBrief({
        caseTitle,
        caseNumber: pipeline.extractedData?.courtInfo?.caseNumber || undefined,
        court: pipeline.extractedData?.courtInfo?.courtName || undefined,
        extractedData: pipeline.extractedData,
        uploadedDocuments: documentsReady.map(d => ({
          id: d.id,
          fileName: d.fileName,
          documentType: d.documentType,
          totalPages: d.totalPages,
        })),
        ragResults: pipeline.ragResults,
        sections: pipeline.generatedSections,
      }).then((briefId) => {
        router.push(`/judges/brief/${briefId}`);
      }).catch((err) => {
        console.error("Failed to save brief:", err);
        setSaving(false);
      });
    }
  }, [pipeline.phase, pipeline.generatedSections, documentsReady, saving]);

  const handleDocumentsReady = (docs: UploadedDocument[]) => {
    setDocumentsReady(docs);
  };

  const handleGenerateBrief = () => {
    if (documentsReady && documentsReady.length > 0) {
      pipeline.startPipeline(documentsReady);
    }
  };

  const isPipelineRunning =
    pipeline.phase !== "idle" && pipeline.phase !== "complete" && pipeline.phase !== "error";

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        label="Case Brief"
        title="Brief Generator"
        description="AI-powered case brief generation from your documents"
      />

      {/* New Brief Card */}
      <Card className="border-dashed border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="h-8 w-8 rounded-lg bg-[#A21CAF]/10 flex items-center justify-center">
              <Plus className="h-4 w-4 text-[#A21CAF]" />
            </div>
            Create New Brief
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {isPipelineRunning || saving ? (
            /* Pipeline progress display */
            <Card className="border-[#A21CAF]/20 bg-gradient-to-br from-[#A21CAF]/[0.02] to-purple-50/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-[#A21CAF] animate-pulse" />
                  <h3 className="text-base font-semibold text-gray-900">
                    {saving ? "Saving Brief..." : "Generating Brief..."}
                  </h3>
                </div>
                <ExtractionProgress
                  phase={pipeline.phase}
                  progress={pipeline.progress}
                  documentsProcessed={
                    documentsReady?.filter((d) => d.status === "extracted").length || 0
                  }
                  totalDocuments={documentsReady?.length || 0}
                />
                {pipeline.error && (
                  <p className="text-sm text-red-600 mt-3">{pipeline.error}</p>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Multi-Document Upload */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#84752F]">
                    Option 1: Upload Documents
                  </p>
                  <MultiDocumentUpload onDocumentsReady={handleDocumentsReady} />
                </div>

                {/* Divider for mobile, visual separator */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="h-full w-px bg-gray-200" />
                </div>
                <div className="md:hidden">
                  <div className="flex items-center gap-3">
                    <Separator className="flex-1" />
                    <span className="text-xs text-gray-400 font-medium">OR</span>
                    <Separator className="flex-1" />
                  </div>
                </div>

                {/* Option 2: Select Existing Case */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#84752F]">
                    Option 2: Select Existing Case
                  </p>
                  <CaseSelector
                    value={selectedCase}
                    onSelect={setSelectedCase}
                    placeholder="Choose a case to generate brief..."
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                {documentsReady && documentsReady.length > 0 && (
                  <p className="text-xs text-emerald-600 font-medium">
                    {documentsReady.length} document{documentsReady.length !== 1 ? "s" : ""} ready
                  </p>
                )}
                <div className="ml-auto">
                  <Button
                    className="bg-[#A21CAF] hover:bg-[#86198F] gap-2"
                    onClick={handleGenerateBrief}
                    disabled={!documentsReady || documentsReady.length === 0}
                  >
                    {isPipelineRunning ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    Generate Brief
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Previous Briefs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Previous Briefs</h2>
          <span className="text-sm text-gray-500">{briefs.length} briefs</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : briefs.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No Briefs Yet"
            description="Generate your first AI-powered case brief by uploading documents or selecting an existing case above."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {briefs.map((brief) => {
              const firstSectionContent = brief.sections[0]?.content || "";
              const snippet =
                firstSectionContent.length > 120
                  ? firstSectionContent.slice(0, 120) + "..."
                  : firstSectionContent;

              return (
                <Link key={brief.id} href={`/judges/brief/${brief.id}`}>
                  <Card className="h-full hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer group">
                    <CardContent className="pt-5 pb-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#A21CAF] transition-colors">
                          {brief.caseTitle}
                        </h3>
                        <LegalStatusBadge status={brief.status} />
                      </div>
                      <p className="text-xs text-gray-500">
                        {formatDate(brief.createdAt)}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {snippet}
                      </p>
                      {"reviewProgress" in brief && brief.reviewProgress && (
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          <span className="text-emerald-600">
                            {brief.reviewProgress.approved} approved
                          </span>
                          {brief.reviewProgress.flagged > 0 && (
                            <span className="text-amber-600">
                              {brief.reviewProgress.flagged} flagged
                            </span>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
