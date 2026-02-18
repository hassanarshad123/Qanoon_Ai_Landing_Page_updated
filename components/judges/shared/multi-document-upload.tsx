"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, FileText, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentTypeSelector } from "./document-type-selector";
import { usePdfExtraction } from "@/hooks/use-pdf-extraction";
import { cn } from "@/lib/utils";
import type { UploadedDocument } from "@/lib/mock/types";

interface MultiDocumentUploadProps {
  onDocumentsReady: (docs: UploadedDocument[]) => void;
}

export function MultiDocumentUpload({ onDocumentsReady }: MultiDocumentUploadProps) {
  const { documents, addFiles, removeFile, updateDocumentType } = usePdfExtraction();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files).filter(
        (f) => f.type === "application/pdf"
      );
      if (files.length > 0) addFiles(files);
    },
    [addFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) addFiles(files);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [addFiles]
  );

  const allExtracted = documents.length > 0 && documents.every((d) => d.status === "extracted");
  const hasErrors = documents.some((d) => d.status === "error");
  const isProcessing = documents.some((d) => d.status === "extracting" || d.status === "pending");

  const statusIcon = (status: UploadedDocument["status"]) => {
    switch (status) {
      case "extracted":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "extracting":
      case "pending":
        return <Loader2 className="h-4 w-4 text-[#A21CAF] animate-spin" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "rounded-xl border-2 border-dashed transition-colors cursor-pointer p-6",
          isDragging
            ? "border-[#A21CAF] bg-[#A21CAF]/5"
            : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
        )}
      >
        <div className="flex flex-col items-center text-center">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-700">
            {isDragging ? "Drop your PDFs here" : "Drag & drop PDF documents here"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Upload multiple files — petitions, FIRs, evidence, arguments
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* File list */}
      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
            >
              <div className="h-9 w-9 rounded-lg bg-[#A21CAF]/10 flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-[#A21CAF]" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.fileName}
                  </p>
                  {statusIcon(doc.status)}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{formatSize(doc.fileSize)}</span>
                  {doc.totalPages > 0 && <span>{doc.totalPages} pages</span>}
                  {doc.status === "extracting" && <span>Extracting text...</span>}
                  {doc.status === "error" && (
                    <span className="text-red-500">{doc.error}</span>
                  )}
                </div>
                {doc.status === "extracting" && (
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#A21CAF] rounded-full transition-all duration-300"
                      style={{ width: `${doc.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <DocumentTypeSelector
                value={doc.documentType}
                onChange={(type) => updateDocumentType(doc.id, type)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => removeFile(doc.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {/* Summary */}
          <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
            <span>
              {documents.length} document{documents.length !== 1 ? "s" : ""} —{" "}
              {documents.filter((d) => d.status === "extracted").length} extracted
              {hasErrors && `, ${documents.filter((d) => d.status === "error").length} failed`}
            </span>
            {allExtracted && (
              <Button
                size="sm"
                className="bg-[#A21CAF] hover:bg-[#86198F] text-xs h-7"
                onClick={() => onDocumentsReady(documents)}
              >
                Documents Ready
              </Button>
            )}
            {isProcessing && (
              <span className="text-[#A21CAF] font-medium">Processing...</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
