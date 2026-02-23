import { apiFetch } from "./client";

export interface DocumentRecord {
  id: string;
  user_id: string;
  title: string;
  file_name: string;
  file_type: string;
  file_size: number;
  page_count: number;
  document_type: string;
  blob_url: string;
  blob_pathname: string;
  brief_id: string | null;
  judgment_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export const documentsApi = {
  async upload(file: File, title?: string, documentType?: string): Promise<{ id: string; blob_url: string; file_name: string }> {
    const formData = new FormData();
    formData.append("file", file);
    if (title) formData.append("title", title);
    if (documentType) formData.append("document_type", documentType);

    const res = await fetch("/api/v1/documents/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Upload failed" }));
      throw new Error(err.error || err.detail || "Upload failed");
    }

    return res.json();
  },

  list(filters?: { document_type?: string; search?: string }): Promise<DocumentRecord[]> {
    const params = new URLSearchParams();
    if (filters?.document_type) params.set("document_type", filters.document_type);
    if (filters?.search) params.set("search", filters.search);
    const qs = params.toString();
    return apiFetch(`/documents${qs ? `?${qs}` : ""}`);
  },

  get(id: string): Promise<DocumentRecord> {
    return apiFetch(`/documents/${id}`);
  },

  delete(id: string): Promise<{ success: boolean }> {
    return apiFetch(`/documents/${id}`, { method: "DELETE" });
  },

  link(id: string, links: { brief_id?: string; judgment_id?: string }): Promise<{ success: boolean }> {
    return apiFetch(`/documents/${id}/link`, { method: "PATCH", body: links });
  },
};
