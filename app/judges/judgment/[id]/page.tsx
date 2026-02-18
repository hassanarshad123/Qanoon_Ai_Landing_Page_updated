"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ExportMenu } from "@/components/judges/shared/export-menu";
import { SaveToNotesDialog } from "@/components/judges/shared/save-to-notes-dialog";
import { PrecedentCard } from "@/components/judges/shared/precedent-card";
import { ConversationInput } from "@/components/judges/shared/conversation-input";
import { getJudgmentById } from "@/lib/mock/api";
import type { Judgment } from "@/lib/mock/types";

const SECTION_ORDER = [
  "Facts",
  "Issues",
  "Analysis",
  "Applicable Law",
  "Precedents",
  "Holding",
  "Relief",
];

const AI_SUGGESTIONS = [
  "Expand the analysis section",
  "Add more precedents",
  "Refine the holding",
  "Strengthen legal reasoning",
];

export default function JudgmentDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [judgment, setJudgment] = useState<Judgment | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadJudgment() {
      try {
        const data = await getJudgmentById(id);
        if (data) {
          setJudgment(data);
          // Open all sections by default
          const initialOpen: Record<string, boolean> = {};
          data.sections.forEach((section) => {
            initialOpen[section.id] = true;
          });
          setOpenSections(initialOpen);
        }
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadJudgment();
    }
  }, [id]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleAIFollowUp = (message: string) => {
    // Placeholder for AI follow-up interaction
    console.log("AI follow-up:", message);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="h-[600px] bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  if (!judgment) {
    return (
      <div className="space-y-4">
        <Link href="/judges/judgment">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Judgments
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">Judgment not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sort sections by the defined order
  const sortedSections = [...judgment.sections].sort((a, b) => {
    const aIndex = SECTION_ORDER.indexOf(a.title);
    const bIndex = SECTION_ORDER.indexOf(b.title);
    if (aIndex === -1 && bIndex === -1) return a.order - b.order;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between">
        <Link href="/judges/judgment">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Judgments
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <ExportMenu title={judgment.caseTitle} />
          <SaveToNotesDialog
            title="Save Judgment to Notes"
            sourceLabel={judgment.caseTitle}
          />
        </div>
      </div>

      {/* Judgment Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          {judgment.caseTitle}
        </h1>
        <p className="text-sm text-gray-500 mt-1.5">
          Created{" "}
          {new Date(judgment.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Resizable Panel Layout */}
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[700px] rounded-lg border"
      >
        {/* Left Panel - Judgment Skeleton */}
        <ResizablePanel defaultSize={65} minSize={40}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-gray-50/50">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#84752F]">
                Judgment Skeleton
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Pakistani judgment format &mdash; 7 sections
              </p>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {sortedSections.map((section, index) => (
                  <Collapsible
                    key={section.id}
                    open={openSections[section.id]}
                    onOpenChange={() => toggleSection(section.id)}
                  >
                    <Card>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50/80 transition-colors py-3.5 px-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#84752F]/10 text-[#84752F] text-xs font-semibold">
                                {index + 1}
                              </span>
                              <span className="text-sm font-semibold uppercase tracking-wider text-[#84752F]">
                                {section.title}
                              </span>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                                openSections[section.id]
                                  ? "rotate-180"
                                  : "rotate-0"
                              }`}
                            />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0 px-4 pb-5">
                          <Separator className="mb-3" />
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                            {section.content}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>

              {/* AI Follow-up Area */}
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#84752F] mb-3">
                  AI Follow-up
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Ask the AI to refine, expand, or modify specific sections of
                  the judgment draft.
                </p>
                <ConversationInput
                  onSend={handleAIFollowUp}
                  promptSuggestions={AI_SUGGESTIONS}
                  placeholder="Ask to refine any section of the judgment..."
                />
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Suggested Precedents */}
        <ResizablePanel defaultSize={35} minSize={25}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-gray-50/50">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#84752F]">
                Suggested Precedents
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {judgment.suggestedPrecedents.length} relevant cases found
              </p>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {judgment.suggestedPrecedents.map((precedent) => (
                  <PrecedentCard
                    key={precedent.id}
                    precedent={precedent}
                    onSaveToNotes={() => {
                      // Handled by SaveToNotesDialog wrapping in parent
                    }}
                  />
                ))}

                {judgment.suggestedPrecedents.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-400">
                      No precedents suggested yet.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
