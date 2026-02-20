// Merge RAG backend citations with Neon search results

import type { RAGSearchResult } from "@/lib/mock/types";
import type { RAGChatResponse, RAGCitation } from "./client";

const MAX_RESULTS = 15;

/**
 * Convert a single RAG backend citation into the frontend RAGSearchResult format.
 */
function citationToSearchResult(c: RAGCitation): RAGSearchResult {
  return {
    precedent: {
      id: `rag-${c.citation_id}`,
      caseName: c.case_title,
      citation: c.citation_id,
      court: c.court_name,
      year: c.case_year,
      legalAreas: [],
      keywords: [],
      headnotes: [],
      summary: "",
      ratio: "",
    },
    relevanceScore: 85, // RAG backend results are pre-ranked by the agent
    matchedKeywords: [],
    matchedAreas: [],
  };
}

/**
 * Normalize a citation string for deduplication.
 * Strips whitespace, lowercases, removes punctuation.
 */
function normalizeCitation(citation: string): string {
  return citation
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Merge RAG backend citations with Neon search results.
 * - RAG backend results placed first (higher quality from real corpus)
 * - Deduplicates by normalized citation string
 * - Caps at MAX_RESULTS total
 */
export function mergeRAGResults(
  ragResponse: RAGChatResponse | null,
  neonResults: RAGSearchResult[],
): RAGSearchResult[] {
  const ragItems: RAGSearchResult[] = (ragResponse?.citations ?? []).map(
    citationToSearchResult,
  );

  // Deduplicate: index Neon citations, skip RAG items that match
  const seen = new Set<string>();
  const merged: RAGSearchResult[] = [];

  for (const item of ragItems) {
    const key = normalizeCitation(item.precedent.citation);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  for (const item of neonResults) {
    const key = normalizeCitation(item.precedent.citation);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  return merged.slice(0, MAX_RESULTS);
}

/**
 * Extract synthesis text from RAG response for prompt enrichment.
 * Returns undefined if no useful synthesis is available.
 */
export function extractRAGSynthesisContext(
  ragResponse: RAGChatResponse | null,
): string | undefined {
  if (!ragResponse?.synthesis) return undefined;
  // Only include if it has meaningful content (not just boilerplate)
  if (ragResponse.synthesis.length < 50) return undefined;
  return ragResponse.synthesis;
}
