# QanoonAI - Project Documentation

> Pakistan's AI-Powered Legal Intelligence Platform

QanoonAI combines **300,000+ Pakistani court judgments** with AI to provide judges with neutral case briefs, lawyers with instant drafting tools, law students with study resources, and citizens with free legal guidance.

**Live URL:** https://www.zensbots.site

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Application Architecture](#application-architecture)
4. [Authentication & Authorization](#authentication--authorization)
5. [User Roles & Onboarding](#user-roles--onboarding)
6. [Portal Breakdown](#portal-breakdown)
   - [Lawyers Portal](#1-lawyers-portal-lawyers)
   - [Judges Portal](#2-judges-portal-judges)
   - [Citizens Portal](#3-citizens-portal-citizens)
   - [Students Portal](#4-students-portal-students)
   - [Admin Portal](#5-admin-portal-admin)
7. [Landing Page](#landing-page)
8. [Legal Calculators](#legal-calculators)
9. [AI System](#ai-system)
10. [RAG (Retrieval-Augmented Generation)](#rag-retrieval-augmented-generation)
11. [Brief Generation Pipeline](#brief-generation-pipeline)
12. [Database Schema](#database-schema)
13. [API Routes](#api-routes)
14. [UI Component Library](#ui-component-library)
15. [Custom React Hooks](#custom-react-hooks)
16. [Type System](#type-system)
17. [Mock Data Layer](#mock-data-layer)
18. [Guided Tour System](#guided-tour-system)
19. [Scripts & Migrations](#scripts--migrations)
20. [Environment Variables](#environment-variables)
21. [Getting Started](#getting-started)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.1.6 |
| **Language** | TypeScript | 5.2.2 |
| **UI Library** | React | 19.2.4 |
| **Styling** | Tailwind CSS + tailwindcss-animate | 3.3.3 |
| **Component Library** | Shadcn/UI (Radix UI primitives) | Latest |
| **Authentication** | NextAuth.js v5 (Auth.js) | 5.0.0-beta.30 |
| **Database** | Neon Serverless PostgreSQL | — |
| **AI Provider** | Anthropic Claude (Sonnet 4 + Haiku 4.5) | SDK 0.77.0 |
| **Embeddings** | VoyageAI | 0.1.0 |
| **Caching** | Upstash Redis | 1.36.2 |
| **File Storage** | Vercel Blob | 2.3.0 |
| **PDF Processing** | pdfjs-dist | 5.4.624 |
| **OCR** | Tesseract.js | 7.0.0 |
| **Word Parsing** | Mammoth | 1.11.0 |
| **Excel Parsing** | xlsx (SheetJS) | 0.18.5 |
| **Email** | Nodemailer | 8.0.1 |
| **Animations** | Motion (Framer Motion) | 12.34.2 |
| **Charts** | Recharts | 2.12.7 |
| **Guided Tours** | driver.js + custom system | 1.4.0 |
| **Form Handling** | React Hook Form + Zod | 7.53.0 / 3.23.8 |
| **Hosting** | Netlify | — |

---

## Project Structure

```
Qanoon_Ai_Landing_Page_updated/
├── app/                          # Next.js App Router pages & API routes
│   ├── (auth)/                   # Auth route group (login, forgot/reset password)
│   ├── (dev)/                    # Dev-only kitchen sink component showcase
│   ├── admin/                    # Admin portal pages
│   ├── api/                      # API route handlers
│   ├── calculators/              # Public legal calculators (13 calculators)
│   ├── citizens/                 # Citizens portal
│   ├── judges/                   # Judges portal
│   ├── lawyers/                  # Lawyers portal (largest portal)
│   ├── onboarding/               # Multi-step onboarding flow
│   ├── signup/                   # Signup page
│   ├── students/                 # Students portal
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout (fonts, providers)
│   └── page.tsx                  # Landing page (home)
│
├── components/                   # React components
│   ├── ui/                       # 47 Shadcn/Radix UI base components
│   ├── landing/                  # Landing page sections (16 components)
│   ├── auth/                     # Authentication forms (6 components)
│   ├── judges/                   # Judges portal components (30+ components)
│   ├── lawyers/                  # Lawyers portal components (20+ components)
│   ├── admin/                    # Admin panel components (10 components)
│   ├── calculators/              # Calculator UI components (10 components)
│   ├── onboarding/               # Onboarding flow components (18 components)
│   ├── kitchen-sink/             # Dev showcase components (5 components)
│   ├── shared/                   # Cross-portal shared components
│   └── providers/                # React context providers
│
├── lib/                          # Business logic, utilities, and services
│   ├── actions/                  # Server Actions (11 action files)
│   ├── admin/                    # Admin module (actions + types)
│   ├── ai/                       # AI client, models, and prompts
│   ├── auth/                     # Auth actions, schemas, session, password reset
│   ├── brief-pipeline/           # Document processing pipeline (9 modules)
│   ├── calculators/              # Calculator logic + rate data (23 files)
│   ├── constants/                # App constants
│   ├── db/                       # Database connection, migrations, seeds
│   ├── email.ts                  # Email sending (Nodemailer)
│   ├── mock/                     # Mock data for development (13 files)
│   ├── onboarding/               # Onboarding types, schemas, constants, storage
│   ├── rag/                      # RAG system (8 modules)
│   ├── research/                 # Research types and actions
│   ├── types/                    # Shared TypeScript types
│   └── utils/                    # Utility functions (cn, concurrency, strip-markdown)
│
├── hooks/                        # Custom React hooks (9 hooks)
├── types/                        # Global TypeScript declarations (next-auth.d.ts)
├── migrations/                   # SQL migration files (11 migrations)
├── scripts/                      # CLI scripts (bulk-ingest, run-migrations)
├── public/                       # Static assets (PDF worker)
├── docs/                         # Documentation
│
├── auth.ts                       # NextAuth configuration
├── middleware.ts                  # Route protection middleware
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── .env.example                  # Environment variable template
```

---

## Application Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────┐
│                     Next.js App                       │
│                                                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐  │
│  │ Lawyers │ │ Judges  │ │Citizens │ │ Students  │  │
│  │ Portal  │ │ Portal  │ │ Portal  │ │  Portal   │  │
│  └────┬────┘ └────┬────┘ └────┬────┘ └─────┬─────┘  │
│       │           │           │             │         │
│  ┌────┴───────────┴───────────┴─────────────┴─────┐  │
│  │              Middleware (Role-Based Auth)        │  │
│  └────┬───────────┬───────────┬─────────────┬─────┘  │
│       │           │           │             │         │
│  ┌────┴────┐ ┌────┴────┐ ┌───┴───┐  ┌──────┴──────┐ │
│  │  API    │ │ Server  │ │  AI   │  │     RAG     │ │
│  │ Routes  │ │Actions  │ │System │  │   System    │ │
│  └────┬────┘ └────┬────┘ └───┬───┘  └──────┬──────┘ │
│       │           │          │              │         │
│  ┌────┴───────────┴──────────┴──────────────┴─────┐  │
│  │                  Neon PostgreSQL                 │  │
│  └─────────────────────────────────────────────────┘  │
│                                                       │
│  External Services: Anthropic Claude, VoyageAI,       │
│                     Upstash Redis, Vercel Blob         │
└──────────────────────────────────────────────────────┘
```

### Key Architectural Patterns

- **App Router**: File-system based routing using Next.js App Router with route groups
- **Server Actions**: Data mutations handled via `"use server"` functions in `lib/actions/`
- **Lazy Initialization**: Both the database (`lib/db/index.ts`) and AI client (`lib/ai/client.ts`) use proxy-based lazy initialization to avoid connecting at build time
- **Mock Layer**: A complete mock data layer (`lib/mock/`) allows development without backend dependencies
- **Role Isolation**: Each portal has its own layout, sidebar, breadcrumbs, and component directory

---

## Authentication & Authorization

### Auth Configuration (`auth.ts`)

- **Provider**: Credentials-based (email + password)
- **Password Hashing**: bcrypt via `bcryptjs`
- **Session Strategy**: JWT (stateless)
- **Custom Fields**: `role`, `onboardingCompleted` stored in JWT token and session

### Middleware (`middleware.ts`)

The middleware enforces a strict role-based access model:

| Route Pattern | Access Rule |
|---|---|
| `/`, `/login`, `/signup` | Public (logged-in users redirected to their portal) |
| `/calculators/*` | Public (no auth required) |
| `/onboarding` | Authenticated users who haven't completed onboarding |
| `/judges/*` | Only `judge` role |
| `/lawyers/*` | Only `lawyer` role |
| `/students/*` | Only `law_student` role |
| `/citizens/*` | Only `common_person` role |
| `/admin/*` | Only `admin` role |
| `/api/brief/*`, `/api/research/*` | Authenticated users |
| Everything else | Requires authentication |

### Auth Flow

1. User signs up → account created with `onboarding_completed = false`
2. User logs in → JWT issued with `role` and `onboardingCompleted`
3. Middleware checks `onboardingCompleted` → redirects to `/onboarding` if false
4. After onboarding → session updated, user redirected to role-specific portal
5. Password reset → token-based flow via email (Nodemailer)

---

## User Roles & Onboarding

### Roles

| Role | Internal Value | Portal | Color |
|---|---|---|---|
| Lawyer | `lawyer` | `/lawyers` | Blue (#2563EB) |
| Judge | `judge` | `/judges` | Purple (#A21CAF) |
| Law Student | `law_student` | `/students` | Emerald (#059669) |
| Common Person | `common_person` | `/citizens` | Amber (#D97706) |
| Admin | `admin` | `/admin` | — |

### Onboarding Steps by Role

**Lawyer** (5 steps):
1. Personal Info (name, email, phone)
2. Practice Details (bar council number, experience, practice areas)
3. Location (province, city, primary court)
4. Firm Info (firm type, firm name)
5. Referral Source

**Judge** (3 steps):
1. Personal Info
2. Judicial Info (court level, designation)
3. Location (province, city, court name)

**Law Student** (3 steps):
1. Personal Info
2. Education (university, year of study, program)
3. Interests (areas of interest, career goal)

**Common Person** (3 steps):
1. Personal Info
2. Legal Concern (area, description)
3. Location (province, city)

### Pakistan-Specific Data

The onboarding system includes comprehensive Pakistani data:
- **7 provinces/territories** with cities (Punjab, Sindh, KPK, Balochistan, ICT, AJK, GB)
- **14 practice areas** (Criminal, Civil, Corporate, Family, Constitutional, Tax, etc.)
- **4 court levels** (District, High Court, Supreme Court, Tribunal)
- **5 firm types** (Solo, Small, Medium, Large, In-House)
- **6 experience ranges** (< 1 year to 20+ years)
- **6 law programs** (LL.B 5-Year, LL.B 3-Year, LL.M, Bar-at-Law, PhD)

---

## Portal Breakdown

### 1. Lawyers Portal (`/lawyers`)

The most feature-rich portal with **17 tools** across 3 categories and **24+ pages**.

#### AI Tools (6)

| Tool | Route | Description |
|---|---|---|
| **Case Brief** | `/lawyers/brief` | Generate case briefs with AI — facts, issues, arguments, precedents |
| **Petition Drafter** | `/lawyers/petition` | Draft petitions, plaints, written statements with auto-citations |
| **Legal Research** | `/lawyers/research` | Plain-language legal research with cited answers from case law |
| **Case Law Finder** | `/lawyers/case-finder` | Search case law with AI-powered relevance ranking |
| **Statute Analyzer** | `/lawyers/statute-analyzer` | Plain-language explanations, judicial interpretations, amendment history |
| **Contract Review** | `/lawyers/contract-review` | Upload contracts for risk analysis, red flags, and suggestions |

#### Database & Research (6)

| Tool | Route | Description |
|---|---|---|
| **Case Law Repository** | `/lawyers/case-law` | Browse full database of Pakistani court judgments |
| **Statute Library** | `/lawyers/statutes` | Complete library of Pakistani statutes and ordinances |
| **Legal Forms** | `/lawyers/legal-forms` | Downloadable court forms, agreements, notices, affidavits |
| **Court Directory** | `/lawyers/court-directory` | Directory of courts with contacts, jurisdiction, judges |
| **Case Tracker** | `/lawyers/case-tracker` | Track active cases with timelines, hearing dates, linked docs |
| **Amendment Alerts** | `/lawyers/amendments` | Legislative amendment notifications with impact analysis |

#### Practice Management (5)

| Tool | Route | Description |
|---|---|---|
| **Clients** | `/lawyers/clients` | Client database with CNIC, contact, case associations |
| **Calendar** | `/lawyers/calendar` | Hearings, deadlines, meetings, reminders |
| **Documents** | `/lawyers/documents` | Centralized document management linked to cases |
| **Billing** | `/lawyers/billing` | Invoice creation, time tracking, payment status |
| **File Manager** | `/lawyers/files` | Folder hierarchy for all files and documents |

#### Additional Pages

- **Dashboard** (`/lawyers`) — Active cases, upcoming hearings, pending drafts, total clients
- **All Tools** (`/lawyers/all-tools`) — Grid overview of all 17 tools
- **Profile** (`/lawyers/profile`) — Lawyer profile management

#### Layout Features
- Collapsible sidebar (state persisted in localStorage)
- Responsive with mobile sheet sidebar
- Breadcrumb navigation
- Multi-chapter guided tour system

---

### 2. Judges Portal (`/judges`)

A focused workspace for the judiciary with **6 main sections**.

| Section | Route | Description |
|---|---|---|
| **Dashboard** | `/judges` | Case overview, recent activity, quick actions |
| **Case Briefs** | `/judges/brief` | Generate neutral case briefs from uploaded documents |
| **Judgments** | `/judges/judgment` | AI-assisted judgment drafting with chat refinement |
| **Research** | `/judges/research` | Legal research with follow-up conversations |
| **Documents** | `/judges/documents` | Document upload, extraction (PDF, OCR, Word) |
| **Notes** | `/judges/notes` | Note-taking with folder organization and tagging |
| **Profile** | `/judges/profile` | Judge profile management |

#### Shared Judge Components (25+)
- AI progress steps, streaming message display
- Case selector, document type selector
- Upload zones (single and multi-document)
- Conversation input/thread (chat interface)
- Section editor with review controls
- Precedent cards, citation badges
- Export menu, regenerate dialog
- Product tour, welcome modal

---

### 3. Citizens Portal (`/citizens`)

Provides free legal guidance:
- Know your rights (plain language explanations)
- Find legal help (verified lawyers)
- Track your case (case progress updates)

---

### 4. Students Portal (`/students`)

Educational resources:
- AI case summaries for study
- Exam preparation tools
- Exposure to professional legal AI tools

---

### 5. Admin Portal (`/admin`)

| Page | Route | Description |
|---|---|---|
| **Dashboard** | `/admin` | User statistics, role distribution chart |
| **User Management** | `/admin/users` | User table with detail dialogs, activation controls |
| **RAG Testing** | `/admin/rag-test` | RAG health check, connection info, query testing |

#### Admin Components
- `AdminSidebar` — Navigation
- `StatsCards` — User/role statistics
- `RecentUsersTable` / `UserTable` — User management tables
- `UserDetailDialog` — User detail modal
- `RoleChart` — Role distribution chart (Recharts)
- `RAGHealthCheck` / `RAGConnectionInfo` — RAG system monitoring
- `RAGTestPanel` / `RAGTestQuery` — RAG testing interface

---

## Landing Page

The root page (`/`) is a full marketing landing page with **14 sections**:

| Order | Component | Description |
|---|---|---|
| 1 | `AnnouncementBanner` | Top banner for announcements |
| 2 | `Header` | Navigation with auth links |
| 3 | `HeroSection` | Main value proposition |
| 4 | `HeroVisual` | Visual demo/illustration |
| 5 | `StatsSection` | Key statistics (300K+ judgments, etc.) |
| 6 | `BeforeAfterSection` | Before/after comparison of legal work |
| 7 | `ProductSection` | Product features overview |
| 8 | `UseCasesSection` | Use cases for each role |
| 9 | `CalculatorShowcase` | Legal calculator feature highlight |
| 10 | `HowItWorksSection` | Step-by-step explanation |
| 11 | `PricingSection` | Pricing plans |
| 12 | `EnterpriseSection` | Enterprise features |
| 13 | `FAQSection` | Frequently asked questions |
| 14 | `CTASection` | Call-to-action |
| 15 | `Footer` | Site footer |

---

## Legal Calculators

**13 specialized calculators** accessible publicly at `/calculators/*`:

| Calculator | Route | Description |
|---|---|---|
| **Income Tax** | `/calculators/income-tax` | Pakistan income tax with current slabs |
| **Capital Gains Tax** | `/calculators/capital-gains-tax` | Capital gains on securities and property |
| **Sales Tax** | `/calculators/sales-tax` | GST/Sales tax calculations |
| **Customs Duty** | `/calculators/customs-duty` | Import customs duty with tariff rates |
| **Withholding Tax** | `/calculators/withholding-tax` | WHT on various income types |
| **Tax Penalties** | `/calculators/tax-penalties` | Penalty calculations for tax violations |
| **Zakat** | `/calculators/zakat` | Islamic Zakat with gold/silver rates |
| **Inheritance** | `/calculators/inheritance` | Islamic inheritance distribution (36KB of rules) |
| **Damages** | `/calculators/damages` | Legal damages award calculations |
| **Iddat** | `/calculators/iddat` | Iddat period calculations (Islamic family law) |
| **Limitation** | `/calculators/limitation` | Limitation periods for legal actions |
| **Calculator Index** | `/calculators` | Grid of all calculators |

### Calculator Architecture

Each calculator has:
- **Logic file** in `lib/calculators/` (calculation engine)
- **Rate data** in `lib/calculators/data/` (tax slabs, rates, rules)
- **Page component** in `app/calculators/*/page.tsx`
- **Shared UI components** in `components/calculators/shared/`:
  - `calculator-card.tsx` — Card layout wrapper
  - `calculator-wizard.tsx` — Multi-step input wizard
  - `calculator-result.tsx` — Result display
  - `calculator-breakdown.tsx` — Detailed calculation breakdown
  - `currency-input.tsx` / `number-input.tsx` — Specialized inputs
  - `learn-more-section.tsx` — Educational context
  - `printable-report.tsx` — Print-friendly output

---

## AI System

### Model Configuration (`lib/ai/models.ts`)

| Task | Model | Use Case |
|---|---|---|
| `analyze` | Claude Sonnet 4 | Document analysis |
| `generate` | Claude Sonnet 4 | Brief/judgment generation |
| `regenerate` | Claude Sonnet 4 | Content regeneration |
| `chat` | Claude Sonnet 4 | Conversational refinement |
| `research` | Claude Sonnet 4 | Legal research queries |
| `rank_precedents` | Claude Haiku 4.5 | Lightweight precedent ranking |
| `title_generation` | Claude Haiku 4.5 | Title/summary generation |

### AI Client (`lib/ai/client.ts`)

- Uses Anthropic SDK with proxy-based lazy initialization
- **Max retries**: 4
- **Timeout**: 120 seconds
- Only connects when first AI call is made (not at build time)

### AI Prompts (`lib/ai/prompts/`)

Centralized prompt templates for:
- **Brief generation** — Case brief synthesis from documents
- **Judgment generation** — Structured judgment drafting
- **Precedent ranking** — Relevance scoring of case law
- **Research** — Legal research query handling

---

## RAG (Retrieval-Augmented Generation)

### Overview

The RAG system (`lib/rag/`) enables semantic search across the case law database:

```
User Query → Embedding (VoyageAI) → Vector Search (pgvector) → Reranking → AI Response
```

### RAG Modules

| Module | File | Description |
|---|---|---|
| **Service** | `lib/rag/service.ts` (17KB) | Core RAG orchestration — search, browse, retrieve |
| **Ingestion** | `lib/rag/ingest.ts` (14KB) | Document ingestion pipeline |
| **Chunking** | `lib/rag/chunking.ts` (8KB) | Text splitting strategies |
| **Cache** | `lib/rag/cache.ts` (3KB) | Upstash Redis caching layer |
| **Citations** | `lib/rag/citation-extractor.ts` (4KB) | Legal citation parsing |
| **Merge** | `lib/rag/merge.ts` | Result merging operations |
| **Monitoring** | `lib/rag/monitoring.ts` (4KB) | Health checks and metrics |

### Search Architecture

- **Hybrid search** with configurable weights:
  - Vector similarity: 60% (default)
  - Full-text search: 25% (default)
  - Metadata matching: 15% (default)
- **HNSW indexes** for vector similarity (m=16, ef_construction=200)
- **Chunk-level search**: Judgments split into summary/section/paragraph chunks
- **Citation graph**: Inter-judgment citation tracking

### Key Types

```typescript
interface SearchOptions {
  query: string;
  filters?: SearchFilters;  // jurisdiction, court, year range, legal areas, judge
  limit?: number;
  offset?: number;
  weights?: { vector, fullText, metadata };
  includeChunks?: boolean;
  groupByJudgment?: boolean;
}
```

---

## Brief Generation Pipeline

The brief pipeline (`lib/brief-pipeline/`) is a multi-stage document processing system:

```
Upload → Extract → Chunk → Analyze → Match Precedents → Merge → Render
```

| Stage | Module | Description |
|---|---|---|
| **Extract** | `file-extractor.ts` | Route to correct extractor based on file type |
| **PDF Extract** | `pdf-extractor.ts` | Extract text from PDFs using pdfjs-dist |
| **OCR Extract** | `ocr-extractor.ts` | OCR scanned documents using Tesseract.js |
| **Chunk** | `chunker.ts` | Split text into processable chunks |
| **Analyze** | `document-analyzer.ts` (12KB) | AI-powered document analysis |
| **Precedents** | `precedent-matcher.ts` | Find related case law via RAG |
| **Merge** | `merge-analysis.ts` | Combine multi-document analyses |
| **Render** | `section-renderers.ts` (9KB) | Format sections for display |

### Supported File Formats
- **PDF** — Direct text extraction + OCR fallback
- **Word** (.docx) — Via Mammoth
- **Excel** (.xlsx) — Via SheetJS
- **Images** — OCR via Tesseract.js

---

## Database Schema

### Database Connection

Uses **Neon Serverless PostgreSQL** with lazy proxy initialization:
- Connection only created on first query (not at import time)
- Uses `@neondatabase/serverless` driver

### Migration Files

| Migration | Purpose |
|---|---|
| `001_auth_tables.sql` | Users table (UUID PK, email, password_hash, role, onboarding_completed, is_active) + password reset tokens |
| `002_expand_roles.sql` | Add `law_student` and `common_person` roles |
| `005_research.sql` | Research data tables |
| `006_data_isolation.sql` | Multi-tenancy / data isolation |
| `007_judgments.sql` | Judgment drafting storage |
| `008_documents.sql` | Document management schema |
| `009_rag_schema.sql` | Full RAG schema — precedents extensions, case_law_chunks, citation_graph, statutes, ingestion_jobs, HNSW indexes |
| `010_lawyer_profiles.sql` | Lawyer profile details |
| `011_lawyer_tour_state.sql` | Tour state tracking |

### Core Tables

```sql
users (id UUID, email, password_hash, name, role, onboarding_completed, is_active, created_at, updated_at)
password_reset_tokens (id UUID, user_id FK, token, expires_at, used)
precedents (id, case_name, citation, court, year, legal_areas[], keywords[], headnotes[], summary, ratio, embedding vector(1024), jurisdiction, court_tier, judge_name, judgment_date, parties, full_text, statutes_cited JSONB, source_url, metadata JSONB, token_count)
case_law_chunks (id UUID, case_law_id, chunk_type, section_label, content, embedding vector(1024), chunk_index, token_count)
citation_graph (id UUID, citing_case_law_id, cited_case_law_id, cited_citation, citation_context)
statutes (id UUID, name, short_name, year, jurisdiction, description)
ingestion_jobs (id UUID, job_type, status, jurisdiction, total_records, processed, embedded, failed, last_processed_id, error_log JSONB)
```

### Indexes

- **HNSW** vector indexes on `precedents.embedding` and `case_law_chunks.embedding`
- **GIN** indexes on `legal_areas[]`, `keywords[]`, `statutes_cited` JSONB
- **B-tree** indexes on `jurisdiction`, `court_tier`, `year`, `judgment_date`
- Standard indexes on foreign keys and common query patterns

---

## API Routes

### Authentication

| Method | Route | Description |
|---|---|---|
| `*` | `/api/auth/[...nextauth]` | NextAuth.js handler (login, session, callbacks) |

### Brief Generation

| Method | Route | Description |
|---|---|---|
| POST | `/api/brief/generate` | Generate a new case brief |
| POST | `/api/brief/analyze` | Analyze uploaded documents |
| POST | `/api/brief/analyze-chunk` | Analyze a single document chunk |
| POST | `/api/brief/chat` | Chat with brief for refinement |
| POST | `/api/brief/precedents` | Find relevant precedents |
| POST | `/api/brief/regenerate` | Regenerate brief sections |

### Judgment

| Method | Route | Description |
|---|---|---|
| POST | `/api/judgment/generate` | Generate judgment draft |
| POST | `/api/judgment/chat` | Chat to refine judgment |
| POST | `/api/judgment/regenerate` | Regenerate judgment sections |

### Case Law

| Method | Route | Description |
|---|---|---|
| GET | `/api/case-law/search` | Search case law database |
| GET | `/api/case-law/browse` | Browse case law with filters |
| GET | `/api/case-law/[id]` | Get specific case details |

### Documents

| Method | Route | Description |
|---|---|---|
| POST | `/api/documents/upload` | Upload document |
| GET/PUT/DELETE | `/api/documents/[id]` | CRUD for individual documents |

### Research

| Method | Route | Description |
|---|---|---|
| POST | `/api/research/query` | Submit research query |
| POST | `/api/research/embed` | Generate embeddings |
| POST | `/api/research/follow-up` | Follow-up research questions |

### Admin RAG

| Method | Route | Description |
|---|---|---|
| GET | `/api/admin/rag/health` | RAG system health check |
| GET | `/api/admin/rag/info` | RAG connection info |
| POST | `/api/admin/rag/query` | Test RAG queries |
| POST | `/api/admin/rag/ingest` | Ingest documents |
| POST | `/api/admin/rag/ingest/bulk` | Bulk document ingestion |

### Debug

| Method | Route | Description |
|---|---|---|
| GET | `/api/debug` | Debug endpoint |

---

## UI Component Library

### Base Components (`components/ui/`) — 47 Shadcn/UI Components

All based on Radix UI primitives with Tailwind CSS styling:

**Layout**: Accordion, AspectRatio, Card, Carousel, Collapsible, ResizablePanels, ScrollArea, Separator, Tabs

**Forms**: Button, Checkbox, Form, Input, InputOTP, Label, RadioGroup, Select, Slider, Switch, Textarea, Toggle, ToggleGroup

**Feedback**: Alert, AlertDialog, Badge, Progress, Skeleton, Toast, Toaster, Sonner, Tooltip

**Overlays**: Dialog, Drawer, DropdownMenu, ContextMenu, HoverCard, Menubar, NavigationMenu, Popover, Sheet

**Data Display**: Avatar, Breadcrumb, Calendar, Chart, Command, Pagination, Table

### Design System

- **Fonts**: Inter (sans) + Playfair Display (serif)
- **Color System**: CSS variables with HSL values (`--primary`, `--secondary`, `--accent`, etc.)
- **Dark Mode**: Supported via `next-themes` (currently forced light in portals)
- **Border Radius**: CSS variable based (`--radius`)
- **Custom Animations**: `accordion-down/up`, `blink`, `tour-pulse`, `tour-deplete`

---

## Custom React Hooks

| Hook | File | Description |
|---|---|---|
| `useAIResponse` | `hooks/use-ai-response.ts` | Manage AI response state (loading, error, data) |
| `useAISimulation` | `hooks/use-ai-simulation.ts` | Mock AI responses for development |
| `useAutoSave` | `hooks/use-auto-save.ts` | Auto-save content with debouncing |
| `useBriefPipeline` | `hooks/use-brief-pipeline.ts` (9KB) | Full brief generation pipeline state management |
| `useOnboarding` | `hooks/use-onboarding.ts` (7KB) | Onboarding flow state and step management |
| `usePdfExtraction` | `hooks/use-pdf-extraction.ts` (5KB) | PDF text extraction with progress tracking |
| `useResearchChat` | `hooks/use-research-chat.ts` (10KB) | Research conversation state with message history |
| `useStreamingText` | `hooks/use-streaming-text.ts` | Typewriter-style text streaming display |
| `useToast` | `hooks/use-toast.ts` | Toast notification management |

---

## Type System

### Global Types (`types/next-auth.d.ts`)

Extends NextAuth types with custom fields:

```typescript
interface User {
  id: string;
  role: string;
  onboardingCompleted: boolean;
}
```

### Portal Types (`lib/types/portal.ts`)

Shared types used across judge and lawyer portals:
- `Citation`, `Precedent` — Case law references
- `CaseStatus` — Active, Pending, Closed, Urgent, Reserved, Adjourned, Dismissed, Decreed
- `CaseType` — Constitutional, Civil, Criminal, Family, Tax, Corporate, Writ, Appeal
- `BriefStatus`, `JudgmentStatus`, `NoteFolder`, `Tag`, `Folder`, `Note`

### Lawyer Portal Types (`lib/types/lawyer-portal.ts`)

Comprehensive types for the lawyers portal (317 lines):
- `LawyerCase`, `Client`, `LawyerDocument`
- `LawyerBrief`, `Petition`, `Citation`, `ResearchConversation`
- `ContractReview`, `ContractClause` (with risk levels)
- `Statute`, `StatuteAnalysis`, `StatuteSection`
- `LegalForm`, `CourtEntry`, `Amendment`
- `TrackedCase`, `TrackedCaseEvent`
- `CalendarEvent`, `Invoice`, `InvoiceLineItem`
- `FileItem`, `ActivityItem`, `LawyerTool`, `DashboardStats`

### RAG Types (`lib/rag/types.ts`)

Core RAG entities:
- `Judgment` — Full case law record with 20+ fields
- `JudgmentChunk` — Section-level embedding chunks
- `CitationLink` — Inter-judgment citation graph
- `Statute` — Statute reference library
- `IngestionJob` — Bulk/incremental ingestion tracking
- `SearchOptions`, `SearchResult`, `SearchFilters`, `SearchWeights`
- `BrowseOptions`, `BrowseResult`

### Onboarding Types (`lib/onboarding/types.ts`)

Role-specific onboarding data shapes:
- `LawyerData` (PersonalInfo + PracticeDetails + Location + FirmInfo + Referral)
- `JudgeData` (PersonalInfo + JudicialInfo + Location)
- `LawStudentData` (PersonalInfo + Education + Interests)
- `CommonPersonData` (PersonalInfo + LegalConcern + Location)
- `OnboardingState` — Combined state with role and current step

---

## Mock Data Layer

A complete development mock layer (`lib/mock/`) with **13 data files**:

| File | Description |
|---|---|
| `types.ts` | Mock type definitions |
| `api.ts` | Mock API responses |
| `rag-api.ts` | Mock RAG search responses |
| `rag-precedents.ts` | Mock precedent data |
| `briefs.ts` | Mock brief documents |
| `judgments.ts` | Mock judgment documents |
| `documents.ts` | Mock uploaded documents |
| `cases.ts` | Mock case records |
| `notes.ts` | Mock notes data |
| `activity.ts` | Mock activity log entries |
| `research-conversations.ts` | Mock research chat history |
| `folders.ts` | Mock folder structures |
| `hearings.ts` | Mock hearing data |

---

## Guided Tour System

### Judges Tour

Uses `driver.js` via `ProductTour` component (`components/judges/shared/product-tour.tsx`):
- Tour state persisted to database (`lib/actions/judge-tour.ts`)
- Welcome modal on first visit

### Lawyers Tour

A custom multi-chapter tour system (`components/lawyers/tour/`):

| File | Purpose |
|---|---|
| `chapters.ts` | Tour chapter definitions and step sequences |
| `constants.ts` | Tour configuration constants |
| `chapter-prompt-toast.tsx` | Instruction toast shown at each step |
| `spotlight-overlay.tsx` | Spotlight effect highlighting current element |
| `tour-chapter-panel.tsx` | Side panel showing chapter progress |
| `tour-help-button.tsx` | Help button to trigger tour |
| `tour-progress-dots.tsx` | Progress indicator dots |

Tour state persisted to database (`lib/actions/lawyer-tour.ts`).

---

## Scripts & Migrations

### NPM Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "postinstall": "cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.mjs"
}
```

### CLI Scripts (`scripts/`)

| Script | Description |
|---|---|
| `bulk-ingest.ts` | Bulk document ingestion into RAG database |
| `run-migrations.ts` | Execute SQL migrations against the database |

### Database Migrations (`migrations/`)

Run in order (001 → 011). See [Database Schema](#database-schema) section for details.

---

## Environment Variables

### Required

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key |
| `AUTH_SECRET` | NextAuth.js secret for JWT signing |
| `NEXTAUTH_URL` | Application base URL |

### Optional

| Variable | Description |
|---|---|
| `ADMIN_EMAIL` | Admin seed account email |
| `ADMIN_PASSWORD` | Admin seed account password |
| `SMTP_HOST` | SMTP server for password reset emails |
| `SMTP_PORT` | SMTP port (typically 587) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | Sender email address |
| `RAG_BACKEND_URL` | External RAG backend URL (optional, falls back to Neon-only) |
| `RAG_BACKEND_TIMEOUT` | RAG backend timeout in ms |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Neon PostgreSQL database
- Anthropic API key

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd Qanoon_Ai_Landing_Page_updated

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# 4. Run database migrations
npx tsx scripts/run-migrations.ts

# 5. (Optional) Seed admin user
npx tsx lib/db/seed-admin.ts

# 6. Start development server
npm run dev
```

### Available Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

---

## Summary Statistics

| Metric | Count |
|---|---|
| **Total Pages** | 70+ |
| **Components** | 150+ |
| **API Routes** | 20+ |
| **Custom Hooks** | 9 |
| **Legal Calculators** | 13 |
| **Lawyer Tools** | 17 |
| **DB Migrations** | 11 |
| **User Roles** | 5 |
| **Portals** | 5 |
| **Onboarding Steps** | 3-5 per role |
| **Mock Data Files** | 13 |
| **UI Components** | 47 (Shadcn/UI) |
| **AI Models Used** | 2 (Sonnet 4 + Haiku 4.5) |
