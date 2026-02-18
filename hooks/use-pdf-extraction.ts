"use client";

import { useState, useCallback } from "react";
import type { UploadedDocument, UploadDocumentType, FileFormat } from "@/lib/mock/types";
import { detectFileFormat, extractTextFromFile } from "@/lib/brief-pipeline/file-extractor";

export function useDocumentExtraction() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);

  const addFiles = useCallback(async (files: File[]) => {
    const newDocs: UploadedDocument[] = files.map((file) => {
      const format = detectFileFormat(file);
      return {
        id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        fileName: file.name,
        fileSize: file.size,
        fileFormat: format,
        documentType: guessDocumentType(file.name, format),
        status: "pending" as const,
        progress: 0,
        totalPages: 0,
        extractedText: "",
        pages: [],
      };
    });

    setDocuments((prev) => [...prev, ...newDocs]);

    // Mark all as extracting
    setDocuments((prev) =>
      prev.map((d) => {
        const isNew = newDocs.some((nd) => nd.id === d.id);
        if (!isNew) return d;
        if (d.fileFormat === "image") return { ...d, status: "skipped" as const, progress: 100 };
        return { ...d, status: "extracting" as const, progress: 10 };
      })
    );

    // Extract all files in parallel
    const extractions = newDocs.map(async (doc) => {
      if (doc.fileFormat === "image") return; // already marked skipped

      try {
        const result = await extractTextFromFile(doc.file, doc.fileFormat);

        setDocuments((prev) =>
          prev.map((d) =>
            d.id === doc.id
              ? {
                  ...d,
                  status: "extracted" as const,
                  progress: 100,
                  totalPages: result.totalPages,
                  extractedText: result.fullText,
                  pages: result.pages,
                }
              : d
          )
        );
      } catch (err) {
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === doc.id
              ? {
                  ...d,
                  status: "error" as const,
                  progress: 0,
                  error: err instanceof Error ? err.message : "Extraction failed",
                }
              : d
          )
        );
      }
    });

    await Promise.allSettled(extractions);
  }, []);

  const removeFile = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const updateDocumentType = useCallback((id: string, type: UploadDocumentType) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, documentType: type } : d))
    );
  }, []);

  const reset = useCallback(() => {
    setDocuments([]);
  }, []);

  return { documents, addFiles, removeFile, updateDocumentType, reset };
}

// Backward-compatible alias
export const usePdfExtraction = useDocumentExtraction;

function guessDocumentType(fileName: string, format: FileFormat): UploadDocumentType {
  // Spreadsheet formats
  if (format === "xlsx" || format === "xls" || format === "csv") return "Spreadsheet";

  const lower = fileName.toLowerCase();
  if (lower.includes("petition")) return "Petition";
  if (lower.includes("argument")) return "Written Arguments";
  if (lower.includes("evidence") || lower.includes("exhibit")) return "Evidence";
  if (lower.includes("affidavit")) return "Affidavit";
  if (lower.includes("order")) return "Court Order";
  if (lower.includes("judgment") || lower.includes("judgement")) return "Previous Judgment";
  if (lower.includes("fir")) return "FIR";
  if (lower.includes("statute") || lower.includes("act") || lower.includes("ordinance")) return "Statutory Extract";
  if (lower.includes("contract") || lower.includes("agreement")) return "Contract";
  return "Other";
}
