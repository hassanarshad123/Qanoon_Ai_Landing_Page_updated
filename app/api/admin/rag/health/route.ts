import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/api";
import { checkRAGHealth } from "@/lib/rag/client";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const start = Date.now();
  const health = await checkRAGHealth();
  const responseTimeMs = Date.now() - start;

  if (!health) {
    return NextResponse.json({
      configured: !!process.env.RAG_BACKEND_URL,
      status: "unreachable",
      services: { openai: "unknown", qdrant: "unknown" },
      environment: "unknown",
      responseTimeMs,
    });
  }

  return NextResponse.json({
    configured: true,
    ...health,
    responseTimeMs,
  });
}
