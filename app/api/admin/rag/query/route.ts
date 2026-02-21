import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/api";
import { queryRAGBackend } from "@/lib/rag/client";
import type { RAGChatRequest } from "@/lib/rag/client";

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  let body: RAGChatRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.query || body.query.trim().length < 10) {
    return NextResponse.json(
      { error: "Query must be at least 10 characters" },
      { status: 400 },
    );
  }

  const start = Date.now();
  const result = await queryRAGBackend(body);
  const responseTimeMs = Date.now() - start;

  if (!result) {
    return NextResponse.json(
      { error: "RAG backend returned no result (not configured or unreachable)" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ...result, responseTimeMs });
}
