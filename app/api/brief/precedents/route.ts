import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { anthropic } from "@/lib/ai/client";
import { AI_MODELS } from "@/lib/ai/models";
import { buildPrecedentRankingPrompt } from "@/lib/ai/prompts";
import { requireAuth } from "@/lib/auth/api";
import { queryRAGBackend } from "@/lib/rag/client";

export const maxDuration = 120;

export async function POST(request: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { extractedData } = await request.json();

    if (!extractedData) {
      return NextResponse.json(
        { error: "Missing extractedData" },
        { status: 400 }
      );
    }

    // Build search terms from extracted data
    const searchTerms: string[] = [];

    if (extractedData.legalIssues) {
      for (const issue of extractedData.legalIssues) {
        searchTerms.push(issue.content);
      }
    }
    if (extractedData.statutes) {
      for (const statute of extractedData.statutes) {
        searchTerms.push(statute.name);
        if (statute.provisions) searchTerms.push(...statute.provisions);
      }
    }
    if (extractedData.arguments) {
      for (const arg of extractedData.arguments) {
        if (arg.supportingCitations) searchTerms.push(...arg.supportingCitations);
      }
    }
    if (extractedData.courtInfo?.caseType) {
      searchTerms.push(extractedData.courtInfo.caseType);
    }

    // Build ts_query from search terms — combine with OR for broad matching
    const cleanTerms = searchTerms
      .join(" ")
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2)
      .slice(0, 30); // Limit terms

    const tsQuery = cleanTerms.join(" | ");

    // Full-text search in Neon + RAG backend in parallel
    const ragQuery = searchTerms.slice(0, 10).join(" ");

    const neonSearchPromise = (async () => {
      let results: any[];
      if (tsQuery.trim()) {
        results = await sql(
          `SELECT id, case_name, citation, court, year, legal_areas, keywords, headnotes, summary, ratio,
                  ts_rank(search_vector, to_tsquery('english', $1)) as rank
           FROM precedents
           WHERE search_vector @@ to_tsquery('english', $1)
           ORDER BY rank DESC
           LIMIT 15`,
          [tsQuery]
        );
      } else {
        results = await sql(
          `SELECT id, case_name, citation, court, year, legal_areas, keywords, headnotes, summary, ratio
           FROM precedents
           LIMIT 15`
        );
      }
      if (results.length === 0) {
        results = await sql(
          `SELECT id, case_name, citation, court, year, legal_areas, keywords, headnotes, summary, ratio
           FROM precedents
           LIMIT 10`
        );
      }
      return results;
    })();

    const ragBackendPromise = ragQuery.length >= 10
      ? queryRAGBackend({ query: ragQuery, role: "judge" })
      : Promise.resolve(null);

    const [neonSettled, ragSettled] = await Promise.allSettled([
      neonSearchPromise,
      ragBackendPromise,
    ]);

    let searchResults: any[] =
      neonSettled.status === "fulfilled" ? neonSettled.value : [];
    const ragBackendResponse =
      ragSettled.status === "fulfilled" ? ragSettled.value : null;

    // Append RAG backend citations as rows in the same format for re-ranking
    if (ragBackendResponse?.citations?.length) {
      const existingCitations = new Set(
        searchResults.map((r: any) =>
          (r.citation || "").toLowerCase().replace(/[^a-z0-9]/g, "")
        )
      );
      for (const c of ragBackendResponse.citations) {
        const normCit = c.citation_id.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (existingCitations.has(normCit)) continue;
        existingCitations.add(normCit);
        searchResults.push({
          id: `rag-${c.citation_id}`,
          case_name: c.case_title,
          citation: c.citation_id,
          court: c.court_name,
          year: c.case_year,
          legal_areas: "[]",
          keywords: "[]",
          headnotes: "[]",
          summary: "",
          ratio: "",
        });
      }
    }

    // Use Claude to re-rank the results
    const legalIssues = (extractedData.legalIssues || []).map(
      (i: any) => i.content
    );
    const statutes = (extractedData.statutes || []).map(
      (s: any) => `${s.name} ${(s.provisions || []).join(", ")}`
    );
    const caseType = extractedData.courtInfo?.caseType || "General";

    const rankingPrompt = buildPrecedentRankingPrompt(
      { legalIssues, statutes, caseType },
      searchResults.map((r: any) => ({
        id: r.id,
        caseName: r.case_name,
        citation: r.citation,
        summary: r.summary,
        ratio: r.ratio,
        legalAreas:
          typeof r.legal_areas === "string"
            ? JSON.parse(r.legal_areas)
            : r.legal_areas || [],
      }))
    );

    const message = await anthropic.messages.create({
      model: AI_MODELS.rank_precedents,
      max_tokens: 4096,
      messages: [{ role: "user", content: rankingPrompt }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    let rankings: any[] = [];

    if (textBlock && textBlock.type === "text") {
      let jsonText = textBlock.text.trim();
      if (jsonText.startsWith("```")) {
        jsonText = jsonText
          .replace(/^```(?:json)?\n?/, "")
          .replace(/\n?```$/, "");
      }
      try {
        rankings = JSON.parse(jsonText);
      } catch {
        // Fallback: use search order with default scores
        rankings = searchResults.map((r: any, i: number) => ({
          id: r.id,
          relevanceScore: Math.max(90 - i * 5, 40),
          matchedKeywords: [],
          matchedAreas: typeof r.legal_areas === "string" ? JSON.parse(r.legal_areas) : r.legal_areas || [],
          explanation: "Matched via full-text search",
        }));
      }
    }

    // Build final RAGSearchResult array
    const results = rankings
      .filter((rank: any) => rank.relevanceScore > 30)
      .slice(0, 10)
      .map((rank: any) => {
        const dbRow = searchResults.find((r: any) => r.id === rank.id);
        if (!dbRow) return null;

        const legalAreas =
          typeof dbRow.legal_areas === "string"
            ? JSON.parse(dbRow.legal_areas)
            : dbRow.legal_areas || [];
        const keywords =
          typeof dbRow.keywords === "string"
            ? JSON.parse(dbRow.keywords)
            : dbRow.keywords || [];
        const headnotes =
          typeof dbRow.headnotes === "string"
            ? JSON.parse(dbRow.headnotes)
            : dbRow.headnotes || [];

        return {
          precedent: {
            id: dbRow.id,
            caseName: dbRow.case_name,
            citation: dbRow.citation,
            court: dbRow.court,
            year: dbRow.year,
            legalAreas,
            keywords,
            headnotes,
            summary: dbRow.summary,
            ratio: dbRow.ratio,
          },
          relevanceScore: rank.relevanceScore,
          matchedKeywords: rank.matchedKeywords || [],
          matchedAreas: rank.matchedAreas || [],
        };
      })
      .filter(Boolean);

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Precedent search error:", error);
    return NextResponse.json(
      { error: error.message || "Precedent search failed" },
      { status: 500 }
    );
  }
}
