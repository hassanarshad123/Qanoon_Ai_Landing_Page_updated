"use client";

import { useState, useCallback } from "react";
import type {
  UploadedDocument,
  ExtractedCaseData,
  RAGSearchResult,
  EnhancedBriefSection,
} from "@/lib/mock/types";
import { analyzeDocuments } from "@/lib/brief-pipeline/document-analyzer";
import { matchPrecedents } from "@/lib/brief-pipeline/precedent-matcher";
import { generateAllSections } from "@/lib/brief-pipeline/section-renderers";

export type PipelinePhase =
  | "idle"
  | "uploading"
  | "extracting"
  | "analyzing"
  | "matching_precedents"
  | "generating_sections"
  | "complete"
  | "error";

interface PipelineProgress {
  step: number;
  total: number;
  label: string;
}

const PHASE_LABELS: Record<string, string> = {
  uploading: "Uploading documents...",
  extracting: "Extracting text from PDFs...",
  analyzing: "Analyzing document structure...",
  matching_precedents: "Searching precedent database...",
  generating_sections: "Generating brief sections...",
  complete: "Brief generation complete",
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useBriefPipeline() {
  const [phase, setPhase] = useState<PipelinePhase>("idle");
  const [extractedData, setExtractedData] = useState<ExtractedCaseData | null>(null);
  const [ragResults, setRagResults] = useState<RAGSearchResult[]>([]);
  const [generatedSections, setGeneratedSections] = useState<EnhancedBriefSection[]>([]);
  const [progress, setProgress] = useState<PipelineProgress>({ step: 0, total: 5, label: "" });
  const [error, setError] = useState<string | null>(null);

  const startPipeline = useCallback(async (documents: UploadedDocument[]) => {
    try {
      setError(null);
      const extractedDocs = documents.filter(d => d.status === "extracted");

      if (extractedDocs.length === 0) {
        setError("No successfully extracted documents to process.");
        setPhase("error");
        return;
      }

      // Phase 1: Analyzing documents
      setPhase("analyzing");
      setProgress({ step: 1, total: 5, label: PHASE_LABELS.analyzing });
      await delay(800); // Simulate processing time for UX
      const data = analyzeDocuments(extractedDocs);
      setExtractedData(data);

      // Phase 2: Matching precedents
      setPhase("matching_precedents");
      setProgress({ step: 2, total: 5, label: PHASE_LABELS.matching_precedents });
      const results = await matchPrecedents(data);
      setRagResults(results);

      // Phase 3: Generating sections
      setPhase("generating_sections");
      setProgress({ step: 3, total: 5, label: PHASE_LABELS.generating_sections });
      await delay(600);
      const sections = generateAllSections(data, results);
      setGeneratedSections(sections);

      // Complete
      setPhase("complete");
      setProgress({ step: 5, total: 5, label: PHASE_LABELS.complete });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pipeline failed");
      setPhase("error");
    }
  }, []);

  const reset = useCallback(() => {
    setPhase("idle");
    setExtractedData(null);
    setRagResults([]);
    setGeneratedSections([]);
    setProgress({ step: 0, total: 5, label: "" });
    setError(null);
  }, []);

  return {
    phase,
    extractedData,
    ragResults,
    generatedSections,
    progress,
    error,
    startPipeline,
    reset,
  };
}
