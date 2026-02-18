import { sql } from "@/lib/db";
import { generateEmbedding } from "@/lib/ai/embeddings";
import type { RAGSearchResult } from "@/lib/mock/types";

function parseJsonField(val: unknown): any {
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return []; }
  }
  return val ?? [];
}

export async function hybridSearch(
  query: string,
  options?: { legalAreas?: string[]; limit?: number }
): Promise<RAGSearchResult[]> {
  const limit = options?.limit ?? 10;
  const embedding = await generateEmbedding(query);

  // Build ts_query from query text
  const cleanTerms = query
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2)
    .slice(0, 30);
  const tsQuery = cleanTerms.join(" | ");

  let rows: any[];

  if (embedding && tsQuery.trim()) {
    // Full hybrid: vector + text
    rows = await sql(
      `SELECT id, case_name, citation, court, year, legal_areas, keywords, headnotes, summary, ratio,
              (1 - (embedding <=> $1::vector)) * 0.7
                + COALESCE(ts_rank(search_vector, to_tsquery('english', $2)), 0) * 0.3
              AS score
       FROM precedents
       WHERE embedding IS NOT NULL
         AND search_vector @@ to_tsquery('english', $2)
       ORDER BY score DESC
       LIMIT $3`,
      [`[${embedding.join(",")}]`, tsQuery, limit]
    );

    // If hybrid returned too few, supplement with vector-only
    if (rows.length < 3) {
      const vectorRows = await sql(
        `SELECT id, case_name, citation, court, year, legal_areas, keywords, headnotes, summary, ratio,
                (1 - (embedding <=> $1::vector)) AS score
         FROM precedents
         WHERE embedding IS NOT NULL
         ORDER BY embedding <=> $1::vector
         LIMIT $2`,
        [`[${embedding.join(",")}]`, limit]
      );
      // Merge, dedup by id
      const seen = new Set(rows.map((r: any) => r.id));
      for (const r of vectorRows) {
        if (!seen.has(r.id)) rows.push(r);
      }
      rows = rows.slice(0, limit);
    }
  } else if (embedding) {
    // Vector only
    rows = await sql(
      `SELECT id, case_name, citation, court, year, legal_areas, keywords, headnotes, summary, ratio,
              (1 - (embedding <=> $1::vector)) AS score
       FROM precedents
       WHERE embedding IS NOT NULL
       ORDER BY embedding <=> $1::vector
       LIMIT $2`,
      [`[${embedding.join(",")}]`, limit]
    );
  } else if (tsQuery.trim()) {
    // Text only (fallback when no VOYAGE_API_KEY)
    rows = await sql(
      `SELECT id, case_name, citation, court, year, legal_areas, keywords, headnotes, summary, ratio,
              ts_rank(search_vector, to_tsquery('english', $1)) AS score
       FROM precedents
       WHERE search_vector @@ to_tsquery('english', $1)
       ORDER BY score DESC
       LIMIT $2`,
      [tsQuery, limit]
    );
  } else {
    // Nothing usable — return top precedents
    rows = await sql(
      `SELECT id, case_name, citation, court, year, legal_areas, keywords, headnotes, summary, ratio, 0.5 AS score
       FROM precedents
       LIMIT $1`,
      [limit]
    );
  }

  // Optional legal area filter
  if (options?.legalAreas && options.legalAreas.length > 0) {
    rows = rows.filter((r: any) => {
      const areas = parseJsonField(r.legal_areas);
      return options.legalAreas!.some((a) =>
        areas.some((la: string) => la.toLowerCase().includes(a.toLowerCase()))
      );
    });
  }

  return rows.map((r: any) => {
    const legalAreas = parseJsonField(r.legal_areas);
    const keywords = parseJsonField(r.keywords);
    const headnotes = parseJsonField(r.headnotes);

    return {
      precedent: {
        id: r.id,
        caseName: r.case_name,
        citation: r.citation,
        court: r.court,
        year: r.year,
        legalAreas,
        keywords,
        headnotes,
        summary: r.summary,
        ratio: r.ratio,
      },
      relevanceScore: Math.round((r.score ?? 0.5) * 100),
      matchedKeywords: keywords.slice(0, 5),
      matchedAreas: legalAreas,
    };
  });
}
