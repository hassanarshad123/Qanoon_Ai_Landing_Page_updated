import { lawyerResearchConversations } from "./research-conversations";
import { caseFinderResults } from "./case-finder";
import { lawyerCases } from "./cases";
import { lawyerDocuments } from "./documents";
import { lawyerBriefs } from "./briefs";
import { petitions } from "./petitions";
import { clients } from "./clients";
import { courts } from "./courts";
import { calendarEvents } from "./calendar-events";
import { invoices } from "./billing";
import { fileItems } from "./files";
import { trackedCases } from "./case-tracker";
import { amendments } from "./amendments";
import { lawyerActivityItems } from "./activity";
import { lawyerTools } from "./tools";
import { legalForms } from "./legal-forms";
import { statutes } from "./statutes";
import { statuteAnalyses } from "./statute-analyses";
import { contractReviews } from "./contract-reviews";
import type {
  ResearchConversation,
  CaseFinderResult,
  LawyerCase,
  LawyerDocument,
  LawyerBrief,
  Petition,
  Client,
  CourtEntry,
  CalendarEvent,
  Invoice,
  FileItem,
  TrackedCase,
  Amendment,
  ActivityItem,
  LawyerTool,
  LegalForm,
  Statute,
  StatuteAnalysis,
  ContractReview,
  DashboardStats,
} from "./types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => delay(300 + Math.random() * 200);

// Research Conversations
export async function getResearchConversations(): Promise<ResearchConversation[]> {
  await randomDelay();
  return lawyerResearchConversations;
}
export async function getResearchConversationById(
  id: string
): Promise<ResearchConversation | undefined> {
  await randomDelay();
  return lawyerResearchConversations.find((c) => c.id === id);
}

// Case Finder
export async function getCaseFinderResults(): Promise<CaseFinderResult[]> {
  await randomDelay();
  return caseFinderResults;
}
export async function getCaseFinderResultById(
  id: string
): Promise<CaseFinderResult | undefined> {
  await randomDelay();
  return caseFinderResults.find((c) => c.id === id);
}

// Cases
export async function getLawyerCases(): Promise<LawyerCase[]> {
  await randomDelay();
  return lawyerCases;
}
export async function getLawyerCaseById(
  id: string
): Promise<LawyerCase | undefined> {
  await randomDelay();
  return lawyerCases.find((c) => c.id === id);
}

// Briefs
export async function getBriefs(): Promise<LawyerBrief[]> {
  await randomDelay();
  return lawyerBriefs;
}
export async function getBriefById(
  id: string
): Promise<LawyerBrief | undefined> {
  await randomDelay();
  return lawyerBriefs.find((b) => b.id === id);
}

// Petitions
export async function getPetitions(): Promise<Petition[]> {
  await randomDelay();
  return petitions;
}
export async function getPetitionById(
  id: string
): Promise<Petition | undefined> {
  await randomDelay();
  return petitions.find((p) => p.id === id);
}

// Documents
export async function getLawyerDocuments(): Promise<LawyerDocument[]> {
  await randomDelay();
  return lawyerDocuments;
}
export async function getLawyerDocumentById(
  id: string
): Promise<LawyerDocument | undefined> {
  await randomDelay();
  return lawyerDocuments.find((d) => d.id === id);
}

// Clients
export async function getClients(): Promise<Client[]> {
  await randomDelay();
  return clients;
}
export async function getClientById(
  id: string
): Promise<Client | undefined> {
  await randomDelay();
  return clients.find((c) => c.id === id);
}

// Calendar Events
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  await randomDelay();
  return calendarEvents;
}

// Invoices / Billing
export async function getInvoices(): Promise<Invoice[]> {
  await randomDelay();
  return invoices;
}
export async function getInvoiceById(
  id: string
): Promise<Invoice | undefined> {
  await randomDelay();
  return invoices.find((i) => i.id === id);
}

// Files
export async function getFileItems(): Promise<FileItem[]> {
  await randomDelay();
  return fileItems;
}

// Tracked Cases
export async function getTrackedCases(): Promise<TrackedCase[]> {
  await randomDelay();
  return trackedCases;
}

// Courts
export async function getCourts(): Promise<CourtEntry[]> {
  await randomDelay();
  return courts;
}

// Tracked Case by ID
export async function getTrackedCaseById(
  id: string
): Promise<TrackedCase | undefined> {
  await randomDelay();
  return trackedCases.find((c) => c.id === id);
}

// Amendments
export async function getAmendments(): Promise<Amendment[]> {
  await randomDelay();
  return amendments;
}

// Activity
export async function getActivityItems(): Promise<ActivityItem[]> {
  await randomDelay();
  return lawyerActivityItems;
}

// Legal Forms
export async function getLegalForms(): Promise<LegalForm[]> {
  await randomDelay();
  return legalForms;
}
export async function getLegalFormById(
  id: string
): Promise<LegalForm | undefined> {
  await randomDelay();
  return legalForms.find((f) => f.id === id);
}

// Statutes
export async function getStatutes(): Promise<Statute[]> {
  await randomDelay();
  return statutes;
}
export async function getStatuteById(
  id: string
): Promise<Statute | undefined> {
  await randomDelay();
  return statutes.find((s) => s.id === id);
}

// Statute Analyses
export async function getStatuteAnalyses(): Promise<StatuteAnalysis[]> {
  await randomDelay();
  return statuteAnalyses;
}
export async function getStatuteAnalysisById(
  id: string
): Promise<StatuteAnalysis | undefined> {
  await randomDelay();
  return statuteAnalyses.find((s) => s.id === id);
}

// Contract Reviews
export async function getContractReviews(): Promise<ContractReview[]> {
  await randomDelay();
  return contractReviews;
}
export async function getContractReviewById(
  id: string
): Promise<ContractReview | undefined> {
  await randomDelay();
  return contractReviews.find((c) => c.id === id);
}

// Tools
export async function getTools(): Promise<LawyerTool[]> {
  await randomDelay();
  return lawyerTools;
}

// Dashboard Stats
export async function getDashboardStats(): Promise<DashboardStats> {
  await randomDelay();
  return {
    activeCases: 15,
    upcomingHearings: 8,
    pendingDrafts: 6,
    totalClients: 15,
  };
}
