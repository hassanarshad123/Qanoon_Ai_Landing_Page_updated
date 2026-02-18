"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DocumentUploadZoneProps {
  onUploadComplete?: (filename: string) => void;
  compact?: boolean;
}

export function DocumentUploadZone({ onUploadComplete, compact }: DocumentUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const simulateUpload = useCallback((filename: string) => {
    setUploading(true);
    setUploadProgress(0);
    setUploadedFile(filename);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onUploadComplete?.(filename);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  }, [onUploadComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) simulateUpload(file.name);
  }, [simulateUpload]);

  const handleFileSelect = useCallback(() => {
    // Simulate file selection
    simulateUpload("Case_Documents.pdf");
  }, [simulateUpload]);

  const clearUpload = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  if (uploading || (uploadedFile && uploadProgress >= 100)) {
    return (
      <div className={cn("rounded-xl border border-gray-200 bg-white p-4", compact && "p-3")}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#A21CAF]/10 flex items-center justify-center shrink-0">
            <FileText className="h-5 w-5 text-[#A21CAF]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile}</p>
            {uploading ? (
              <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#A21CAF] rounded-full transition-all duration-200"
                  style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                />
              </div>
            ) : (
              <p className="text-xs text-emerald-600 mt-1">Upload complete</p>
            )}
          </div>
          {!uploading && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearUpload}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={handleFileSelect}
      className={cn(
        "rounded-xl border-2 border-dashed transition-colors cursor-pointer",
        isDragging ? "border-[#A21CAF] bg-[#A21CAF]/5" : "border-gray-200 hover:border-gray-300 bg-gray-50/50",
        compact ? "p-4" : "p-8"
      )}
    >
      <div className="flex flex-col items-center text-center">
        <Upload className={cn("text-gray-400 mb-2", compact ? "h-6 w-6" : "h-8 w-8")} />
        <p className={cn("font-medium text-gray-700", compact ? "text-xs" : "text-sm")}>
          {isDragging ? "Drop your file here" : "Drag & drop documents here"}
        </p>
        <p className="text-xs text-gray-400 mt-1">or click to browse</p>
      </div>
    </div>
  );
}
