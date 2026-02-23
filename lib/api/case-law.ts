import { apiFetch } from "./client";

export const caseLawApi = {
  search(data: {
    query: string;
    filters?: Record<string, unknown>;
    limit?: number;
    offset?: number;
  }): Promise<unknown> {
    return apiFetch("/case-law/search", { method: "POST", body: data });
  },

  browse(data: {
    filters?: Record<string, unknown>;
    sort_by?: string;
    sort_order?: string;
    limit?: number;
    offset?: number;
  }): Promise<unknown> {
    return apiFetch("/case-law/browse", { method: "POST", body: data });
  },

  get(id: string): Promise<unknown> {
    return apiFetch(`/case-law/${id}`);
  },

  batchEmbeddings(texts: string[]): Promise<{ embeddings: (number[] | null)[] }> {
    return apiFetch("/embeddings/batch", { method: "POST", body: { texts } });
  },
};
