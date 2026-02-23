import { apiFetch } from "./client";

export const adminApi = {
  getStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    newThisWeek: number;
    byRole: { role: string; count: number }[];
  }> {
    return apiFetch("/admin/stats");
  },

  getUsers(params?: {
    search?: string;
    role?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{
    users: unknown[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.role) qs.set("role", params.role);
    if (params?.status) qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.pageSize) qs.set("page_size", String(params.pageSize));
    return apiFetch(`/admin/users?${qs}`);
  },

  getUserDetail(userId: string): Promise<unknown> {
    return apiFetch(`/admin/users/${userId}`);
  },

  toggleUserStatus(userId: string, isActive: boolean): Promise<{ success: boolean }> {
    return apiFetch(`/admin/users/${userId}/status`, {
      method: "PATCH",
      body: { is_active: isActive },
    });
  },

  changeUserRole(userId: string, role: string): Promise<{ success: boolean }> {
    return apiFetch(`/admin/users/${userId}/role`, {
      method: "PATCH",
      body: { role },
    });
  },

  // --- RAG management ---

  ragIngest(records: Record<string, unknown>[]): Promise<unknown> {
    return apiFetch("/admin/rag/ingest", { method: "POST", body: { records } });
  },

  ragIngestStatus(jobId: string): Promise<unknown> {
    return apiFetch(`/admin/rag/ingest?jobId=${jobId}`);
  },

  ragIngestBulk(
    records: Record<string, unknown>[],
    jurisdiction?: string
  ): Promise<{ success: boolean; jobId: string; message: string }> {
    return apiFetch("/admin/rag/ingest/bulk", {
      method: "POST",
      body: { records, jurisdiction },
    });
  },

  ragQuery(data: {
    query: string;
    filters?: Record<string, unknown>;
    limit?: number;
    includeChunks?: boolean;
  }): Promise<unknown> {
    return apiFetch("/admin/rag/query", {
      method: "POST",
      body: {
        query: data.query,
        filters: data.filters,
        limit: data.limit,
        include_chunks: data.includeChunks,
      },
    });
  },

  ragHealth(): Promise<unknown> {
    return apiFetch("/admin/rag/health");
  },

  ragInfo(): Promise<unknown> {
    return apiFetch("/admin/rag/info");
  },
};
