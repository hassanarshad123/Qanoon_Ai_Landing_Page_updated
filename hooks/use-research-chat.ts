"use client";

import { useState, useCallback } from "react";
import type { ResearchMessageDB } from "@/lib/research/types";
import type { StructuredResearchResponse } from "@/lib/research/types";
import type { Citation, RAGSearchResult } from "@/lib/mock/types";
import { getMessages } from "@/lib/research/actions";

export function useResearchChat() {
  const [messages, setMessages] = useState<ResearchMessageDB[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [parsedSections, setParsedSections] =
    useState<Partial<StructuredResearchResponse> | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationTitle, setConversationTitle] = useState("New Research");
  const [ragResults, setRagResults] = useState<RAGSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------------------------------------------------
  // Progressive XML parser
  // -------------------------------------------------------------------------
  function parseStructuredResponse(
    text: string
  ): Partial<StructuredResearchResponse> {
    const sections = [
      "summary",
      "applicable_law",
      "precedents",
      "analysis",
      "contrary_views",
    ] as const;
    const result: Partial<StructuredResearchResponse> = {};

    for (const section of sections) {
      const openTag = `<${section}>`;
      const closeTag = `</${section}>`;
      const openIdx = text.indexOf(openTag);
      if (openIdx === -1) continue;

      const contentStart = openIdx + openTag.length;
      const closeIdx = text.indexOf(closeTag, contentStart);

      if (closeIdx !== -1) {
        result[section] = text.slice(contentStart, closeIdx).trim();
      } else {
        // Still streaming — show what we have so far
        result[section] = text.slice(contentStart).trim();
      }
    }

    return result;
  }

  // -------------------------------------------------------------------------
  // Citation extractor
  // -------------------------------------------------------------------------
  function extractCitations(text: string): Citation[] {
    const citationRegex =
      /([A-Z][a-zA-Z\s.]+(?:v\.?\s+[A-Z][a-zA-Z\s.]+)?)\s*\((\d{4}\s+(?:PLD|SCMR|CLC|PCrLJ|YLR|MLD|PLJ|NLR|ALD)\s+\w+\s+\d+)\)/g;
    const citations: Citation[] = [];
    const seen = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = citationRegex.exec(text)) !== null) {
      const citation = match[2].trim();
      if (seen.has(citation)) continue;
      seen.add(citation);

      citations.push({
        id: `cit-${citations.length + 1}`,
        caseName: match[1].trim(),
        citation,
        court: citation.includes("SC")
          ? "Supreme Court of Pakistan"
          : "High Court",
        year: citation.match(/\d{4}/)?.[0] || "",
        relevance: "",
        snippet: "",
      });
    }

    return citations;
  }

  // -------------------------------------------------------------------------
  // Read SSE stream
  // -------------------------------------------------------------------------
  async function readSSEStream(
    response: Response,
    onMeta?: (meta: any) => void
  ) {
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response stream");

    const decoder = new TextDecoder();
    let fullText = "";
    let completeMeta: any = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6);
        if (payload === "[DONE]") continue;

        try {
          const parsed = JSON.parse(payload);

          if (parsed.meta) {
            onMeta?.(parsed.meta);
            continue;
          }

          if (parsed.text) {
            fullText += parsed.text;
            setStreamingText(fullText);
            setParsedSections(parseStructuredResponse(fullText));
          }

          if (parsed.complete) {
            completeMeta = parsed.complete;
          }

          if (parsed.error) {
            throw new Error(parsed.error);
          }
        } catch (e) {
          if (e instanceof Error && e.message !== "Unexpected end of JSON input") {
            if ((e as any).message && !(e as any).message.includes("JSON")) {
              throw e;
            }
          }
        }
      }
    }

    return { fullText, completeMeta };
  }

  // -------------------------------------------------------------------------
  // Send initial query
  // -------------------------------------------------------------------------
  const sendQuery = useCallback(
    async (
      question: string,
      options?: { caseId?: string; caseContext?: any }
    ) => {
      setError(null);
      setIsStreaming(true);
      setStreamingText("");
      setParsedSections(null);

      // Add optimistic user message
      const userMsg: ResearchMessageDB = {
        id: `temp-${Date.now()}`,
        conversationId: conversationId || "",
        role: "user",
        content: question,
        structuredResponse: null,
        citations: [],
        ragContext: null,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const response = await fetch("/api/research/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            conversationId,
            caseId: options?.caseId,
            caseContext: options?.caseContext,
          }),
        });

        if (!response.ok) {
          throw new Error("Research query failed");
        }

        const { fullText, completeMeta } = await readSSEStream(
          response,
          (meta) => {
            if (meta.conversationId) setConversationId(meta.conversationId);
            if (meta.ragResults) setRagResults(meta.ragResults);
          }
        );

        // Build final assistant message
        const structured = parseStructuredResponse(fullText);
        const citations = extractCitations(fullText);

        const assistantMsg: ResearchMessageDB = {
          id: completeMeta?.messageId || `msg-${Date.now()}`,
          conversationId: conversationId || "",
          role: "assistant",
          content: fullText,
          structuredResponse:
            Object.keys(structured).length > 0
              ? (structured as StructuredResearchResponse)
              : null,
          citations,
          ragContext: null,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMsg]);

        if (completeMeta?.title) {
          setConversationTitle(completeMeta.title);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Query failed");
      } finally {
        setIsStreaming(false);
        setStreamingText("");
        setParsedSections(null);
      }
    },
    [conversationId]
  );

  // -------------------------------------------------------------------------
  // Send follow-up
  // -------------------------------------------------------------------------
  const sendFollowUp = useCallback(
    async (question: string, caseContext?: any) => {
      if (!conversationId) return;

      setError(null);
      setIsStreaming(true);
      setStreamingText("");
      setParsedSections(null);

      const userMsg: ResearchMessageDB = {
        id: `temp-${Date.now()}`,
        conversationId,
        role: "user",
        content: question,
        structuredResponse: null,
        citations: [],
        ragContext: null,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const response = await fetch("/api/research/follow-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId,
            question,
            caseContext,
          }),
        });

        if (!response.ok) {
          throw new Error("Follow-up query failed");
        }

        const { fullText, completeMeta } = await readSSEStream(
          response,
          (meta) => {
            if (meta.ragResults) setRagResults(meta.ragResults);
          }
        );

        const structured = parseStructuredResponse(fullText);
        const citations = extractCitations(fullText);

        const assistantMsg: ResearchMessageDB = {
          id: completeMeta?.messageId || `msg-${Date.now()}`,
          conversationId,
          role: "assistant",
          content: fullText,
          structuredResponse:
            Object.keys(structured).length > 0
              ? (structured as StructuredResearchResponse)
              : null,
          citations,
          ragContext: null,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Follow-up failed");
      } finally {
        setIsStreaming(false);
        setStreamingText("");
        setParsedSections(null);
      }
    },
    [conversationId]
  );

  // -------------------------------------------------------------------------
  // Load existing conversation
  // -------------------------------------------------------------------------
  const loadConversation = useCallback(
    async (id: string, title?: string) => {
      setConversationId(id);
      if (title) setConversationTitle(title);

      try {
        const msgs = await getMessages(id);
        setMessages(msgs);
      } catch (err) {
        setError("Failed to load conversation");
      }
    },
    []
  );

  return {
    messages,
    isStreaming,
    streamingText,
    parsedSections,
    conversationId,
    conversationTitle,
    ragResults,
    error,
    sendQuery,
    sendFollowUp,
    loadConversation,
    setConversationId,
    setConversationTitle,
  };
}
