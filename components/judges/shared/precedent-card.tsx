"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scale, ExternalLink, BookmarkPlus } from "lucide-react";
import type { Precedent } from "@/lib/mock/types";

interface PrecedentCardProps {
  precedent: Precedent;
  onSaveToNotes?: () => void;
}

export function PrecedentCard({ precedent, onSaveToNotes }: PrecedentCardProps) {
  const relevanceColor =
    precedent.relevanceScore >= 80
      ? "bg-emerald-100 text-emerald-700"
      : precedent.relevanceScore >= 60
        ? "bg-amber-100 text-amber-700"
        : "bg-gray-100 text-gray-700";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-[#A21CAF]/10 flex items-center justify-center shrink-0">
              <Scale className="h-4 w-4 text-[#A21CAF]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {precedent.caseName}
              </p>
              <p className="text-xs font-mono text-gray-500 mt-0.5">{precedent.citation}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {precedent.court} &middot; {precedent.year}
              </p>
            </div>
          </div>
          <Badge className={`${relevanceColor} hover:${relevanceColor} shrink-0 text-xs`}>
            {precedent.relevanceScore}%
          </Badge>
        </div>
        <p className="text-xs text-gray-600 mt-2 line-clamp-2">{precedent.summary}</p>
        <p className="text-xs text-gray-500 mt-1 italic">{precedent.relevance}</p>
        <div className="flex items-center gap-2 mt-3">
          <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
            <Link href={`/judges/research/conv-001`}>
              <ExternalLink className="h-3 w-3 mr-1" />
              View Full Case
            </Link>
          </Button>
          {onSaveToNotes && (
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onSaveToNotes}>
              <BookmarkPlus className="h-3 w-3 mr-1" />
              Save
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
