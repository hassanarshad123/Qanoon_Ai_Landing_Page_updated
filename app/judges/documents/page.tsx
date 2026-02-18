"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Grid3X3, List, Upload, MoreHorizontal, FileText, Search as SearchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/judges/shared/page-header";
import { DocumentUploadZone } from "@/components/judges/shared/document-upload-zone";
import { getDocuments, getCases } from "@/lib/mock/api";
import type { Document as DocType, Case } from "@/lib/mock/types";

const docTypeStyles: Record<string, string> = {
  Petition: "border-purple-300 text-purple-700",
  "Written Arguments": "border-blue-300 text-blue-700",
  "Court Order": "border-amber-300 text-amber-700",
  Evidence: "border-emerald-300 text-emerald-700",
  Affidavit: "border-pink-300 text-pink-700",
  Judgment: "border-red-300 text-red-700",
  Notice: "border-indigo-300 text-indigo-700",
  "Bail Application": "border-orange-300 text-orange-700",
};

function DocTypeBadge({ type }: { type: string }) {
  return (
    <Badge variant="outline" className={docTypeStyles[type] || "border-gray-300 text-gray-700"}>
      {type}
    </Badge>
  );
}

export default function DocumentLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [caseFilter, setCaseFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [documents, setDocuments] = useState<DocType[]>([]);
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    getDocuments().then(setDocuments);
    getCases().then(setCases);
  }, []);

  const caseMap = cases.reduce<Record<string, Case>>((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {});

  const documentTypes = Array.from(new Set(documents.map((d) => d.type)));

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCase = caseFilter === "all" || doc.caseId === caseFilter;
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    return matchesSearch && matchesCase && matchesType;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        label="Documents"
        title="Document Library"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#A21CAF] hover:bg-[#A21CAF]/90 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <DocumentUploadZone />
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={caseFilter} onValueChange={setCaseFilter}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="All Cases" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cases</SelectItem>
            {cases.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {documentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => {
            if (value) setViewMode(value as "grid" | "list");
          }}
          variant="outline"
          size="sm"
        >
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid3X3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => {
            const linkedCase = caseMap[doc.caseId];
            return (
              <Link key={doc.id} href={`/judges/documents/${doc.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#A21CAF]/10 flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-[#A21CAF]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {doc.title}
                        </p>
                        {linkedCase && (
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {linkedCase.number}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <DocTypeBadge type={doc.type} />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <div>
                        <span className="font-semibold text-[#84752F]">Pages</span>
                        <p className="mt-0.5 text-gray-700">{doc.pages}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-[#84752F]">Size</span>
                        <p className="mt-0.5 text-gray-700">{doc.fileSize}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-[#84752F]">Date</span>
                        <p className="mt-0.5 text-gray-700">
                          {new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Case</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Pages</TableHead>
                <TableHead className="text-right">Size</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => {
                const linkedCase = caseMap[doc.caseId];
                return (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#A21CAF]/10 flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4 text-[#A21CAF]" />
                        </div>
                        <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                          {doc.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600 font-mono">
                        {linkedCase?.number ?? "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DocTypeBadge type={doc.type} />
                    </TableCell>
                    <TableCell className="text-right text-sm text-gray-700">
                      {doc.pages}
                    </TableCell>
                    <TableCell className="text-right text-sm text-gray-700">
                      {doc.fileSize}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/judges/documents/${doc.id}`}>
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/judges/brief">
                              Open in Brief Generator
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredDocuments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                    No documents match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Empty state for grid */}
      {viewMode === "grid" && filteredDocuments.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500">No documents match your filters.</p>
        </div>
      )}
    </div>
  );
}
