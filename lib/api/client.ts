/**
 * Base API client for communicating with the FastAPI backend.
 * All requests go through Next.js rewrites → /api/v1/* → FastAPI.
 */

const API_BASE = "/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

/**
 * Base fetch wrapper that handles JSON serialization, error extraction,
 * and passes cookies through (for NextAuth session token).
 */
export async function apiFetch<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, signal } = options;

  const fetchOptions: RequestInit = {
    method,
    credentials: "include", // send cookies (session token)
    signal,
    headers: {
      ...headers,
    },
  };

  if (body !== undefined) {
    fetchOptions.headers = {
      ...fetchOptions.headers,
      "Content-Type": "application/json",
    };
    fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, fetchOptions);

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const json = await res.json();
      message = json.error || json.detail || message;
    } catch {
      // response wasn't JSON
    }
    throw new ApiError(res.status, message);
  }

  // Handle 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json();
}

/**
 * Helper for SSE (Server-Sent Events) streaming endpoints.
 * Returns an async iterator of parsed `data:` payloads.
 */
export async function* apiStream<T = { text: string }>(
  path: string,
  body: unknown,
  signal?: AbortSignal
): AsyncGenerator<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    let message = `Stream request failed with status ${res.status}`;
    try {
      const json = await res.json();
      message = json.error || json.detail || message;
    } catch {
      // not JSON
    }
    throw new ApiError(res.status, message);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new ApiError(500, "No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const payload = trimmed.slice(6);
        if (payload === "[DONE]") return;
        try {
          yield JSON.parse(payload) as T;
        } catch {
          console.error("[apiStream] Malformed JSON in SSE payload:", payload.slice(0, 200));
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
