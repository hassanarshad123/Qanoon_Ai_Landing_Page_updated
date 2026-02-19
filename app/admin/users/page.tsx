"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/lib/admin/actions";
import { UserTable } from "@/components/admin/UserTable";
import type { PaginatedUsers } from "@/lib/admin/types";

export default function AdminUsersPage() {
  const [data, setData] = useState<PaginatedUsers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#A21CAF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-gray-500 text-center py-12">Failed to load users.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      <UserTable initialData={data} />
    </div>
  );
}
