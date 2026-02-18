"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Printer, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { getDocumentById, getCaseById } from "@/lib/mock/api";
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

function parseSections(content: string): { heading: string; body: string }[] {
  const lines = content.split("\n");
  const sections: { heading: string; body: string }[] = [];
  let currentHeading = "Introduction";
  let currentBody: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Detect section headings: lines that are all-caps or start with a number followed by a period and uppercase text
    const isHeading =
      (trimmed.length > 3 &&
        trimmed.length < 120 &&
        trimmed === trimmed.toUpperCase() &&
        /[A-Z]/.test(trimmed)) ||
      /^\d+\.\s+[A-Z]/.test(trimmed);

    if (isHeading && currentBody.length > 0) {
      sections.push({ heading: currentHeading, body: currentBody.join("\n") });
      currentHeading = trimmed;
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  if (currentBody.length > 0) {
    sections.push({ heading: currentHeading, body: currentBody.join("\n") });
  }

  return sections;
}

export default function DocumentViewerPage() {
  const params = useParams();
  const id = params.id as string;

  const [document, setDocument] = useState<DocType | null>(null);
  const [linkedCase, setLinkedCase] = useState<Case | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    getDocumentById(id).then((doc) => {
      if (doc) {
        setDocument(doc);
        getCaseById(doc.caseId).then((c) => {
          if (c) setLinkedCase(c);
        });
      }
    });
  }, [id]);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4 animate-pulse">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500">Loading document...</p>
        </div>
      </div>
    );
  }

  const sections = parseSections(document.content);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/judges/documents">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <h2 className="text-sm font-semibold text-gray-900 truncate max-w-[400px]">
            {document.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/judges/brief">
              <BookOpen className="h-4 w-4 mr-1" />
              Generate Brief
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>

      {/* Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel: Metadata */}
        <ResizablePanel defaultSize={30} minSize={20} maxSize={45}>
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* Document Title */}
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#A21CAF]/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-[#A21CAF]" />
                </div>
                <h1 className="text-lg font-bold font-serif text-gray-900">
                  {document.title}
                </h1>
              </div>

              <Separator />

              {/* Metadata */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#84752F]">
                    Case
                  </span>
                  {linkedCase ? (
                    <div className="mt-1">
                      <p className="text-sm font-medium text-gray-900">{linkedCase.title}</p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{linkedCase.number}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">--</p>
                  )}
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#84752F]">
                    Document Type
                  </span>
                  <div className="mt-1.5">
                    <DocTypeBadge type={document.type} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#84752F]">
                      Pages
                    </span>
                    <p className="text-sm text-gray-900 mt-1">{document.pages}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#84752F]">
                      File Size
                    </span>
                    <p className="text-sm text-gray-900 mt-1">{document.fileSize}</p>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#84752F]">
                    Uploaded
                  </span>
                  <p className="text-sm text-gray-900 mt-1">
                    {new Date(document.uploadedAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Sections List */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#84752F]">
                  Sections
                </span>
                <div className="mt-3 space-y-1">
                  {sections.map((section, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSection(idx)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === idx
                          ? "bg-[#A21CAF]/10 text-[#A21CAF] font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {section.heading.length > 50
                        ? section.heading.substring(0, 50) + "..."
                        : section.heading}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel: Document Content */}
        <ResizablePanel defaultSize={70}>
          <ScrollArea className="h-full">
            <div className="p-8 max-w-3xl mx-auto">
              <article className="prose prose-gray max-w-none">
                <div className="font-serif text-gray-800 leading-relaxed whitespace-pre-wrap text-[15px]">
                  {document.content}
                </div>
              </article>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
