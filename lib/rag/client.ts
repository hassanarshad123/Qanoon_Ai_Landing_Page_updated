// Typed HTTP client for the QanoonAI RAG FastAPI backend

// --- Types matching the FastAPI backend response schema ---

export interface RAGCitation {
  citation_id: string;
  case_title: string;
  court_name: string;
  court_tier: string;
  case_year: number;
  judgment_url: string;
}

export interface RAGChatResponse {
  query: string;
  role: string;
  synthesis: string;
  citations: RAGCitation[];
  bilingual_note: string | null;
  request_id: string | null;
  total_citations: number;
}

export interface RAGChatRequest {
  query: string;
  role?: "judge" | "lawyer" | "public";
  filters?: {
    court_tiers?: string[];
    year_from?: number;
    year_to?: number;
  };
}

export interface RAGHealthResponse {
  status: "ok" | "degraded";
  services: {
    openai: string;
    qdrant: string;
  };
  environment: string;
}

// --- Custom error class ---

export class RAGBackendError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorType?: string,
    public requestId?: string,
  ) {
    super(message);
    this.name = "RAGBackendError";
  }
}

// --- Config ---

const RAG_BACKEND_URL = process.env.RAG_BACKEND_URL;
const RAG_BACKEND_TIMEOUT = parseInt(
  process.env.RAG_BACKEND_TIMEOUT || "55000",
  10,
);

// --- Client functions ---

/**
 * Query the RAG backend for case law results.
 * Returns null if RAG_BACKEND_URL is not configured (graceful skip).
 * Returns null on any failure (timeout, network error, etc.) so callers
 * can fall back to Neon-only results.
 */
export async function queryRAGBackend(
  request: RAGChatRequest,
): Promise<RAGChatResponse | null> {
  if (!RAG_BACKEND_URL) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RAG_BACKEND_TIMEOUT);

  try {
    const res = await fetch(`${RAG_BACKEND_URL}/api/v1/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: request.query,
        role: request.role ?? "judge",
        filters: request.filters ?? {},
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new RAGBackendError(
        body.error || `RAG backend returned ${res.status}`,
        res.status,
        body.error_type,
        body.request_id,
      );
    }

    return (await res.json()) as RAGChatResponse;
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.warn(
        `[RAG] Backend timed out after ${RAG_BACKEND_TIMEOUT}ms`,
      );
    } else if (err instanceof RAGBackendError) {
      console.warn(
        `[RAG] Backend error (${err.statusCode}): ${err.message}`,
      );
    } else {
      console.warn(`[RAG] Backend unreachable: ${err.message}`);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Check if the RAG backend is healthy.
 * Returns null if not configured or unreachable.
 */
export async function checkRAGHealth(): Promise<RAGHealthResponse | null> {
  if (!RAG_BACKEND_URL) return null;

  try {
    const res = await fetch(`${RAG_BACKEND_URL}/api/v1/health`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return (await res.json()) as RAGHealthResponse;
  } catch {
    return null;
  }
}
