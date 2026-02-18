"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/judges/shared/page-header";
import { ToolCard } from "@/components/lawyers/shared/tool-card";
import { getTools } from "@/lib/mock-lawyer/api";
import type { LawyerTool } from "@/lib/mock-lawyer/types";

const groups = ["AI Tools", "Database & Research", "Practice Management"] as const;

export default function AllToolsPage() {
  const [tools, setTools] = useState<LawyerTool[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTools().then(setTools);
  }, []);

  const filtered = search
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase())
      )
    : tools;

  return (
    <div className="space-y-8">
      <PageHeader
        label="Discovery"
        title="All Tools"
        description="Explore all 17 AI-powered tools available in the Lawyer Portal"
      />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {groups.map((group) => {
        const groupTools = filtered.filter((t) => t.group === group);
        if (groupTools.length === 0) return null;
        return (
          <div key={group}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#84752F] mb-4">
              {group}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  name={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                  href={tool.href}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
