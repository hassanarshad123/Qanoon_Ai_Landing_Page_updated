"use client";

import { useState, useCallback } from "react";
import type { UploadedDocument, UploadDocumentType } from "@/lib/mock/types";
import { extractTextFromPDF } from "@/lib/brief-pipeline/pdf-extractor";

export function usePdfExtraction() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);

  const addFiles = useCallback(async (files: File[]) => {
    const newDocs: UploadedDocument[] = files.map((file) => ({
      id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      fileName: file.name,
      fileSize: file.size,
      documentType: guessDocumentType(file.name),
      status: "pending" as const,
      progress: 0,
      totalPages: 0,
      extractedText: "",
      pages: [],
    }));

    setDocuments((prev) => [...prev, ...newDocs]);

    // Extract each file
    for (const doc of newDocs) {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === doc.id ? { ...d, status: "extracting" as const, progress: 10 } : d
        )
      );

      try {
        const result = await extractTextFromPDF(doc.file);

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
    }
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

function guessDocumentType(fileName: string): UploadDocumentType {
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
