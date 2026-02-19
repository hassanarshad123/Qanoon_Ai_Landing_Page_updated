import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { generateEmbeddings } from "@/lib/ai/embeddings";
import { requireAuth } from "@/lib/auth/api";

export async function POST() {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const rows = await sql(
      `SELECT id, case_name, citation, summary, ratio, headnotes, keywords FROM precedents WHERE embedding IS NULL`
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "All precedents already embedded", count: 0 });
    }

    const texts = rows.map((r: any) => {
      const headnotes =
        typeof r.headnotes === "string"
          ? JSON.parse(r.headnotes)
          : r.headnotes || [];
      const keywords =
        typeof r.keywords === "string"
          ? JSON.parse(r.keywords)
          : r.keywords || [];
      return [
        r.case_name,
        r.citation,
        r.summary,
        r.ratio,
        headnotes.join(". "),
        keywords.join(", "),
      ]
        .filter(Boolean)
        .join(" | ");
    });

    // Batch in groups of 10
    const BATCH = 10;
    let embedded = 0;

    for (let i = 0; i < texts.length; i += BATCH) {
      const batch = texts.slice(i, i + BATCH);
      const batchRows = rows.slice(i, i + BATCH);
      const embeddings = await generateEmbeddings(batch);

      for (let j = 0; j < batchRows.length; j++) {
        const emb = embeddings[j];
        if (emb) {
          await sql(
            `UPDATE precedents SET embedding = $1::vector WHERE id = $2`,
            [`[${emb.join(",")}]`, batchRows[j].id]
          );
          embedded++;
        }
      }
    }

    return NextResponse.json({
      message: `Embedded ${embedded} of ${rows.length} precedents`,
      count: embedded,
    });
  } catch (error: any) {
    console.error("Embed error:", error);
    return NextResponse.json(
      { error: error.message || "Embedding failed" },
      { status: 500 }
    );
  }
}
