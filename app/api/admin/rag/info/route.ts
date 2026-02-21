import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/api";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const rawUrl = process.env.RAG_BACKEND_URL || "";
  const timeout = parseInt(process.env.RAG_BACKEND_TIMEOUT || "55000", 10);

  // Mask URL: show protocol + first 8 chars of host + "***"
  let maskedUrl = "Not set";
  if (rawUrl) {
    try {
      const url = new URL(rawUrl);
      const hostPrefix = url.hostname.slice(0, 8);
      maskedUrl = `${url.protocol}//${hostPrefix}***`;
    } catch {
      maskedUrl = rawUrl.slice(0, 12) + "***";
    }
  }

  return NextResponse.json({
    configured: !!process.env.RAG_BACKEND_URL,
    backendUrl: maskedUrl,
    timeoutMs: timeout,
    timeoutSeconds: Math.round(timeout / 1000),
    healthEndpoint: "/api/v1/health",
    chatEndpoint: "/api/v1/chat",
  });
}
