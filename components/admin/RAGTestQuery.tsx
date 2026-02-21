"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import type { RAGCitation } from "@/lib/rag/client";

interface QueryResult {
  query: string;
  role: string;
  synthesis: string;
  citations: RAGCitation[];
  bilingual_note: string | null;
  request_id: string | null;
  total_citations: number;
  responseTimeMs: number;
}

export function RAGTestQuery() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string>("judge");
  const [courtTiers, setCourtTiers] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [showRaw, setShowRaw] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (query.trim().length < 10) {
      toast.error("Query must be at least 10 characters");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const filters: Record<string, unknown> = {};
      if (courtTiers.trim()) {
        filters.court_tiers = courtTiers.split(",").map((s) => s.trim()).filter(Boolean);
      }
      if (yearFrom) filters.year_from = parseInt(yearFrom, 10);
      if (yearTo) filters.year_to = parseInt(yearTo, 10);

      const res = await fetch("/api/admin/rag/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), role, filters }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      setResult(await res.json());
      toast.success("Query completed");
    } catch (err: any) {
      toast.error("Query failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Test Query</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Query
              </label>
              <Textarea
                placeholder="e.g. What is the law on child custody in Pakistan?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-gray-400 mt-1">Minimum 10 characters</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Role
                </label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="judge">Judge</SelectItem>
                    <SelectItem value="lawyer">Lawyer</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Court Tiers
                </label>
                <Input
                  placeholder="e.g. supreme,high"
                  value={courtTiers}
                  onChange={(e) => setCourtTiers(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Year From
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 2000"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Year To
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 2024"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#A21CAF] hover:bg-[#86198f] text-white"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Querying...
                </>
              ) : (
                "Send Test Query"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3 text-sm">
              {result.request_id && (
                <Badge variant="outline">ID: {result.request_id}</Badge>
              )}
              <Badge variant="outline">{result.responseTimeMs}ms</Badge>
              <Badge variant="outline">
                {result.total_citations} citation{result.total_citations !== 1 ? "s" : ""}
              </Badge>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Synthesis</p>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto text-sm whitespace-pre-wrap">
                {result.synthesis}
              </div>
            </div>

            {result.citations.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Citations</p>
                <div className="border rounded-lg overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Citation ID</TableHead>
                        <TableHead>Case Title</TableHead>
                        <TableHead>Court</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Year</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.citations.map((c) => (
                        <TableRow key={c.citation_id}>
                          <TableCell className="font-mono text-xs">
                            {c.citation_id}
                          </TableCell>
                          <TableCell>{c.case_title}</TableCell>
                          <TableCell>{c.court_name}</TableCell>
                          <TableCell>{c.court_tier}</TableCell>
                          <TableCell>{c.case_year}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRaw(!showRaw)}
              >
                {showRaw ? "Hide" : "Show"} Raw JSON
              </Button>
              {showRaw && (
                <pre className="mt-2 bg-gray-50 rounded-lg p-4 text-xs overflow-auto max-h-64">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
