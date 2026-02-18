// All types for the judicial portal mock data

export type CaseStatus = "Active" | "Pending" | "Closed" | "Urgent" | "Reserved" | "Adjourned" | "Dismissed" | "Decreed";
export type CaseType = "Constitutional" | "Civil" | "Criminal" | "Family" | "Tax" | "Corporate" | "Writ" | "Appeal";
export type DocumentType = "Petition" | "Written Arguments" | "Court Order" | "Evidence" | "Affidavit" | "Judgment" | "Notice" | "Bail Application";
export type BriefStatus = "Generating" | "Complete" | "Draft";
export type JudgmentStatus = "Draft" | "Under Review" | "Finalized";
export type NoteFolder = "General" | "Case Research" | "Brief Notes" | "Judgment Drafts" | "Hearing Prep";

export interface Case {
  id: string;
  title: string;
  number: string;
  court: string;
  citation: string;
  status: CaseStatus;
  type: CaseType;
  judge: string;
  filed: string;
  nextHearing: string;
  petitioner: string;
  respondent: string;
  petitionerCounsel: string;
  respondentCounsel: string;
  description: string;
}

export interface Document {
  id: string;
  caseId: string;
  title: string;
  type: DocumentType;
  pages: number;
  fileSize: string;
  uploadedAt: string;
  content: string;
}

export interface BriefSection {
  id: string;
  title: string;
  content: string;
}

export interface BriefConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  citations?: Citation[];
}

export interface Brief {
  id: string;
  caseId: string;
  caseTitle: string;
  status: BriefStatus;
  createdAt: string;
  sections: BriefSection[];
  conversation: BriefConversationMessage[];
}

export interface JudgmentSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Judgment {
  id: string;
  caseId: string;
  caseTitle: string;
  status: JudgmentStatus;
  createdAt: string;
  sections: JudgmentSection[];
  suggestedPrecedents: Precedent[];
}

export interface Citation {
  id: string;
  caseName: string;
  citation: string;
  court: string;
  year: string;
  relevance: string;
  snippet: string;
}

export interface Precedent {
  id: string;
  caseName: string;
  citation: string;
  court: string;
  year: string;
  relevance: string;
  summary: string;
  relevanceScore: number;
}

export interface ResearchMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  citations?: Citation[];
}

export interface ResearchConversation {
  id: string;
  title: string;
  createdAt: string;
  messages: ResearchMessage[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Folder {
  id: string;
  name: NoteFolder;
  count: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folder: NoteFolder;
  tags: string[];
  sourceId?: string;
  sourceType?: "brief" | "judgment" | "research";
  sourceLabel?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hearing {
  id: string;
  caseId: string;
  caseTitle: string;
  caseNumber: string;
  time: string;
  courtRoom: string;
  type: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Adjourned";
}

export interface ActivityItem {
  id: string;
  icon: string;
  text: string;
  timestamp: string;
  linkTo?: string;
}

export interface DashboardStats {
  activeCases: number;
  todayHearings: number;
  pendingJudgments: number;
  documentsThisWeek: number;
}

// =====================================================================
// Enhanced Brief Pipeline Types
// =====================================================================

export type UploadDocumentType =
  | "Petition"
  | "Written Arguments"
  | "Evidence"
  | "Affidavit"
  | "Court Order"
  | "Previous Judgment"
  | "FIR"
  | "Statutory Extract"
  | "Contract"
  | "Other";

export interface UploadedDocument {
  id: string;
  file: File;
  fileName: string;
  fileSize: number;
  documentType: UploadDocumentType;
  status: "pending" | "extracting" | "extracted" | "error";
  progress: number;
  totalPages: number;
  extractedText: string;
  pages: { pageNumber: number; text: string }[];
  error?: string;
}

export interface SourceReference {
  documentId: string;
  documentName: string;
  documentType: UploadDocumentType;
  pageNumber: number;
  snippet?: string;
}

export interface ExtractedParty {
  name: string;
  role: "petitioner" | "respondent" | "appellant" | "other";
  counsel?: string;
  sources: SourceReference[];
}

export interface ExtractedFact {
  content: string;
  date?: string;
  order: number;
  sources: SourceReference[];
}

export interface ExtractedLegalIssue {
  content: string;
  relatedStatutes: string[];
  sources: SourceReference[];
}

export interface ExtractedStatuteRef {
  name: string;
  provisions: string[];
  context?: string;
  sources: SourceReference[];
}

export interface ExtractedArgument {
  content: string;
  side: "petitioner" | "respondent";
  supportingCitations: string[];
  sources: SourceReference[];
}

export interface ExtractedCourtInfo {
  courtName: string;
  caseNumber: string;
  caseType: string;
  filingDate?: string;
  judge?: string;
  sources: SourceReference[];
}

export interface ExtractedCaseData {
  courtInfo: ExtractedCourtInfo | null;
  parties: ExtractedParty[];
  facts: ExtractedFact[];
  legalIssues: ExtractedLegalIssue[];
  statutes: ExtractedStatuteRef[];
  arguments: ExtractedArgument[];
  rawDocuments: { id: string; fileName: string; documentType: UploadDocumentType; totalPages: number }[];
}

export interface RAGPrecedent {
  id: string;
  caseName: string;
  citation: string;
  court: string;
  year: number;
  legalAreas: string[];
  keywords: string[];
  headnotes: string[];
  summary: string;
  ratio: string;
}

export interface RAGSearchResult {
  precedent: RAGPrecedent;
  relevanceScore: number;
  matchedKeywords: string[];
  matchedAreas: string[];
}

export type SectionReviewStatus = "pending_review" | "approved" | "flagged";

export interface EnhancedBriefSection extends BriefSection {
  sources: SourceReference[];
  reviewStatus: SectionReviewStatus;
  flagNote?: string;
  regenerationCount: number;
}

export type EnhancedBriefStatus =
  | "uploading"
  | "extracting"
  | "generating"
  | "in_review"
  | "finalized"
  | BriefStatus;

export interface EnhancedBrief extends Omit<Brief, "status" | "sections"> {
  status: EnhancedBriefStatus;
  sections: (BriefSection | EnhancedBriefSection)[];
  conversation: BriefConversationMessage[];
  extractedData?: ExtractedCaseData;
  uploadedDocuments?: { id: string; fileName: string; documentType: UploadDocumentType; totalPages: number }[];
  ragResults?: RAGSearchResult[];
  reviewProgress?: { total: number; approved: number; flagged: number };
}
