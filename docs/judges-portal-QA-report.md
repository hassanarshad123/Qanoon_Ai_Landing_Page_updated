# Judges Portal — QA Audit Report

**Audit Date:** 2026-02-19
**Scope:** All pages, components, hooks, server actions, API routes, and data layers in the `/judges` portal
**Auditor:** Automated code review (Claude)

---

## Executive Summary

The Judges Portal has **two distinct data architectures running in parallel**: a real database-backed layer (Neon Postgres via server actions) for **Brief**, **Research**, and **Notes**, and a **fully mock/in-memory layer** for **Dashboard**, **Judgment**, and **Documents**. This split means roughly half the portal is production-capable while the other half is a non-functional demo. Critical issues include a security vulnerability in a debug endpoint, broken navigation links, stub handlers, fake export functionality across the entire portal, and a Documents section that is hidden from navigation but still accessible.

---

## 1. Security Issues

### 1.1 CRITICAL — Credentials Committed to Repository
- **Files:** `.env`, `.env.local`
- **Issue:** Both files contain plaintext credentials committed to the git repository:
  - `DATABASE_URL=postgresql://neondb_owner:npg_f2xJrFaqSPH4@...` (full Neon Postgres connection string with password)
  - `ANTHROPIC_API_KEY=sk-ant-api03-...` (full Anthropic API key)
- **Severity:** **Critical** — anyone with repo access has full database and API access
- **Recommendation:** Rotate both credentials immediately. Add `.env` and `.env.local` to `.gitignore`. Use environment variables from the hosting platform (Vercel, etc.) instead.

### 1.2 CRITICAL — Debug Endpoint Exposes API Key Prefix
- **File:** `app/api/debug/route.ts:10`
- **Issue:** The `GET /api/debug` endpoint returns `anthropic_key_prefix: key?.substring(0, 10)` which leaks the first 10 characters of the Anthropic API key to any unauthenticated request. It also confirms the existence of `DATABASE_URL`.
- **Severity:** **Critical** — publicly accessible, no authentication
- **Recommendation:** Delete this endpoint entirely, or protect it behind authentication and an environment check (`NODE_ENV === 'development'`).

### 1.3 HIGH — No Authentication on Any Route
- **Issue:** The entire judges portal has zero authentication. No middleware, no session checks, no role guards. Any user can access `/judges/*` endpoints including all API routes.
- **Files:** `app/judges/layout.tsx`, all `app/api/**` routes
- **Impact:** All judge data (briefs, research, notes) is accessible to anyone.

### 1.4 MEDIUM — Hardcoded Judge Identity
- **File:** `app/judges/page.tsx:75`
- **Issue:** Dashboard greets `Justice Ahmed` — hardcoded, not from a user session.

---

## 2. Mock Data vs Real Database — Architecture Split

### Pages using REAL database (Neon Postgres via `lib/db`):
| Feature | Server Actions | Status |
|---------|---------------|--------|
| **Brief** (list + detail) | `lib/brief/actions.ts` — full CRUD | Working |
| **Research** (list + conversation) | `lib/research/actions.ts` — full CRUD | Working |
| **Notes** (list + detail) | `lib/notes/actions.ts` — full CRUD | Working |

### Pages using MOCK data (in-memory arrays via `lib/mock/api.ts`):
| Feature | Data Source | Status |
|---------|-----------|--------|
| **Dashboard** | `lib/mock/api.ts` → hardcoded stats, hearings, activity | Mock only |
| **Judgment** (list + detail) | `lib/mock/api.ts` → `getJudgments()`, `getJudgmentById()` | Mock only |
| **Documents** (list + detail) | `lib/mock/api.ts` → `getDocuments()`, `getDocumentById()` | Mock only |
| **Case Selector** (shared component) | `lib/mock/cases.ts` → hardcoded array | Mock only |

### 2.1 Dashboard — Fully Mock
- **File:** `app/judges/page.tsx:21`
- **Imports:** `getDashboardStats`, `getHearings`, `getActivityItems` all from `@/lib/mock/api`
- **`getDashboardStats()`** returns hardcoded `{ activeCases: 47, todayHearings: 4, pendingJudgments: 5, documentsThisWeek: 12 }` (line 97 of `lib/mock/api.ts`)
- **Impact:** Stats never change, hearings are fake, activity feed is static

### 2.2 Judgment — Fully Mock
- **File:** `app/judges/judgment/page.tsx:20` — imports `getJudgments`, `getBriefs` from `@/lib/mock/api`
- **File:** `app/judges/judgment/[id]/page.tsx:25` — imports `getJudgmentById` from `@/lib/mock/api`
- **No server actions exist** for judgment CRUD. No `lib/judgment/actions.ts` file.
- **Impact:** Cannot create, edit, save, or delete judgments. The "Generate Judgment Skeleton" button navigates to an existing mock judgment or falls back to `jdg-001`.

### 2.3 Documents — Fully Mock
- **File:** `app/judges/documents/page.tsx:17` — imports `getDocuments`, `getCases` from `@/lib/mock/api`
- **File:** `app/judges/documents/[id]/page.tsx:12` — imports `getDocumentById`, `getCaseById` from `@/lib/mock/api`
- **No server actions exist** for document management.
- **Impact:** Cannot upload real documents, delete documents, or manage them.

### 2.4 Case Selector — Mock
- **File:** `components/judges/shared/case-selector.tsx:20`
- **Imports hardcoded** `cases` array from `@/lib/mock/cases`
- **Used by:** Brief page, Judgment page, Research page
- **Impact:** Every "Select a Case" dropdown across the portal shows the same fixed list. No database-backed cases exist.

---

## 3. Broken Links & Navigation Issues

### 3.1 Broken Source Link in Notes Detail
- **File:** `app/judges/notes/[id]/page.tsx:56`
- **Code:** `return '/judges/judgments/${note.sourceId}'`
- **Bug:** Route is `/judges/judgments/` (plural) but the actual page route is `/judges/judgment/` (singular). This link will 404.

### 3.2 Documents Removed from Sidebar Navigation
- **File:** `components/judges/Sidebar.tsx:27`
- **Code:** `// { href: "/judges/documents", label: "Documents", icon: FileStack },` — commented out
- **Impact:** Documents page exists at `/judges/documents` but is not reachable from the sidebar. Dashboard Quick Actions still links to it (`href: "/judges/documents"` at line 38 of `page.tsx`), creating an inconsistency.

### 3.3 All Dashboard Hearing Links Go to Same Brief
- **File:** `app/judges/page.tsx:158`
- **Code:** `href={'/judges/brief/brief-001'}` — hardcoded for all hearings
- **Bug:** Every hearing in the "Today's Hearings" list navigates to `/judges/brief/brief-001` regardless of which hearing is clicked. This ID may not exist in the database.

### 3.4 Breadcrumbs Don't Map Dynamic IDs
- **File:** `components/judges/Breadcrumbs.tsx:14-21`
- **Issue:** `labelMap` only maps known segment names. Dynamic route segments (UUIDs from DB like `f47ac10b-...`) render as raw IDs in the breadcrumb trail.

---

## 4. Stub / Non-Functional Handlers

### 4.1 Judgment Detail — AI Follow-up is a Console Log Stub
- **File:** `app/judges/judgment/[id]/page.tsx:82-85`
- **Code:**
  ```ts
  const handleAIFollowUp = (message: string) => {
    console.log("AI follow-up:", message);
  };
  ```
- **Impact:** The entire "AI Follow-up" panel at the bottom of the judgment detail page does nothing. User types a message, clicks send, and it silently logs to console.

### 4.2 Judgment "Generate Judgment Skeleton" — No Real Generation
- **File:** `app/judges/judgment/page.tsx:48-71`
- **Issue:** `handleGenerateSkeleton()` doesn't call any AI or database. It navigates to an existing mock judgment or falls back to `jdg-001`. No new judgment is ever created.

### 4.3 Documents — Delete Button Has No Handler
- **File:** `app/judges/documents/page.tsx:282-283`
- **Code:**
  ```tsx
  <DropdownMenuItem className="text-red-600 focus:text-red-600">
    Delete
  </DropdownMenuItem>
  ```
- **Impact:** No `onClick` handler. The "Delete" option in the document actions dropdown does nothing.

### 4.4 Documents — Download Button Has No Handler
- **File:** `app/judges/documents/[id]/page.tsx:123-126`
- **Code:** `<Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Download</Button>`
- **Impact:** No `onClick` handler. Button does nothing.

### 4.5 Document Upload (Documents Page) — Completely Simulated
- **File:** `components/judges/shared/document-upload-zone.tsx:19-34`
- **Code:** `simulateUpload()` — uses `setInterval` to fake progress from 0-100%, never sends any data to a server
- **Impact:** User sees a progress bar and "Upload complete" message, but nothing is actually uploaded.

### 4.6 PrecedentCard onSaveToNotes — Empty Handler
- **File:** `app/judges/judgment/[id]/page.tsx:257-259`
- **Code:** `onSaveToNotes={() => { // Handled by SaveToNotesDialog wrapping in parent }}`
- **Impact:** Comment claims parent handles it, but no parent wrapping exists. Saving precedents to notes from judgment doesn't work.

---

## 5. Export Functionality — Completely Fake

### 5.1 Export Menu — Toast Only
- **File:** `components/judges/shared/export-menu.tsx:27-34`
- **Code:**
  ```tsx
  <DropdownMenuItem onClick={() => toast.success(`${title} exported as PDF`)}>
    Export as PDF
  </DropdownMenuItem>
  <DropdownMenuItem onClick={() => toast.success(`${title} exported as Word`)}>
    Export as Word
  </DropdownMenuItem>
  ```
- **Impact:** Used on Brief detail, Judgment detail, and Research detail pages. Clicking "Export as PDF" or "Export as Word" shows a success toast but generates no file. Only "Print" (which calls `window.print()`) does something real.
- **Affected pages:** Brief detail, Judgment detail, Research conversation

---

## 6. Missing Error / Loading / Empty States

### 6.1 Dashboard — No Loading State
- **File:** `app/judges/page.tsx:49-58`
- **Issue:** Stats, hearings, and activity all fetch in `useEffect` but there's no loading skeleton or spinner. Values show `"—"` until data arrives, but hearings and activity lists are simply empty until loaded.

### 6.2 Dashboard — No Error Handling
- **File:** `app/judges/page.tsx:54-58`
- **Issue:** `getDashboardStats().then(setStats)` — no `.catch()`. If mock API fails, the component silently fails.

### 6.3 Documents Page — No Loading Indicator
- **File:** `app/judges/documents/page.tsx:47-50`
- **Issue:** No loading state variable or skeleton. Page renders empty until mock data resolves.

### 6.4 Document Detail — Ambiguous Loading vs Not Found
- **File:** `app/judges/documents/[id]/page.tsx:85-95`
- **Issue:** The same loading spinner is shown whether the document is loading or doesn't exist. After loading completes, if `document` is null, the loading UI persists forever because there's no separate "not found" state.

---

## 7. CSS / UI Issues

### 7.1 `animate-blink` — Defined in Tailwind Config (NOT a bug)
- **Files:** `components/judges/shared/structured-response.tsx:25`, `components/judges/shared/ai-streaming-message.tsx:21`
- **Status:** `animate-blink` IS defined in `tailwind.config.ts` lines 85 and 93. This is **not a bug**.

### 7.2 Tailwind Dynamic Class Interpolation Bug
- **File:** `components/judges/shared/precedent-card.tsx:42`
- **Code:** `` hover:${relevanceColor} `` — uses string interpolation for a Tailwind hover class
- **Bug:** Tailwind's JIT compiler cannot detect dynamically constructed class names. This hover style will never be applied.

### 7.3 Citation Badge Hardcoded Fallback ConversationId
- **File:** `components/judges/shared/citation-badge.tsx:33`
- **Issue:** When `linkToResearch` is true but no `conversationId` is provided, the link defaults to `conv-001` — a mock ID that won't exist in the database.

### 7.4 No Print Styles
- **Files:** `app/judges/notes/[id]/page.tsx`, `app/judges/documents/[id]/page.tsx`
- **Issue:** Print buttons call `window.print()` but no `@media print` CSS exists anywhere. All UI chrome (sidebar, buttons, scrollbars, navigation) will be included in the printout.

### 7.5 Hardcoded Color Values
- **Scope:** Entire portal
- **Issue:** The brand color `#A21CAF` and gold color `#84752F` are hardcoded as string literals in ~100+ locations across all components instead of being defined as CSS variables or Tailwind theme tokens.
- **Impact:** Changing the brand color requires find-and-replace across every file. Some instances use `bg-[#A21CAF]/10`, others `text-[#A21CAF]`, making a theme system impossible.

### 7.6 Forced Light Theme
- **File:** `app/judges/layout.tsx:44`
- **Code:** `<ThemeProvider attribute="class" forcedTheme="light">`
- **Impact:** Dark mode is explicitly disabled. `next-themes` is loaded but forced to light. Unnecessary dependency load.

---

## 8. Type Safety Issues

### 8.1 `any` Type Assertions in Brief Actions
- **File:** `lib/brief/actions.ts:147`
- **Code:** `status: (statusMap[brief.status] || brief.status) as any`
- **Impact:** Type safety bypassed for status mapping.

### 8.2 Mock API Type Casting
- **File:** `lib/mock/api.ts:35-36`
- **Code:** `(briefs as any[]).push(brief)` — mutates a `const` array by casting to `any`
- **Impact:** In-memory mock data is mutated at runtime, causing inconsistencies between requests.

### 8.3 `useState` Misused as Ref for Timeout
- **File:** `app/judges/notes/[id]/page.tsx:156`
- **Code:** `const titleTimeoutRef = useState<NodeJS.Timeout | null>(null)`
- **Issue:** Uses `useState` to store a timeout ID. This causes unnecessary re-renders. Should use `useRef`.

---

## 9. Missing CRUD Operations

| Feature | Create | Read | Update | Delete |
|---------|--------|------|--------|--------|
| **Briefs** | DB | DB | DB (sections, status, chat) | DB (`deleteBrief` exists but no UI) |
| **Research** | DB | DB | DB (pin, title, messages) | DB |
| **Notes** | DB | DB | DB (content, title, metadata, tags) | DB |
| **Judgments** | None | Mock | None | None |
| **Documents** | None | Mock | None | None |
| **Cases** | None | Mock | None | None |
| **Hearings** | None | Mock | None | None |
| **Dashboard Stats** | None | Mock | None | None |

### Key Gaps:
- **No brief deletion UI** — `deleteBrief()` server action exists but is never called from any component
- **Judgment CRUD entirely missing** — no server actions, no DB tables, no API routes
- **Document management entirely missing** — no server actions, no DB tables
- **Case management entirely missing** — hardcoded mock array

---

## 10. API Routes Inventory

| Route | Method | Status | Notes |
|-------|--------|--------|-------|
| `/api/brief/analyze` | POST | Real (Claude AI) | Analyzes uploaded documents |
| `/api/brief/generate` | POST | Real (Claude AI, SSE) | Generates brief sections |
| `/api/brief/regenerate` | POST | Real (Claude AI, SSE) | Regenerates a single section |
| `/api/brief/chat` | POST | Real (Claude AI, SSE) | Brief follow-up chat |
| `/api/brief/precedents` | POST | Real (AI-ranked RAG) | Searches precedent database |
| `/api/research/query` | POST | Real (Claude AI, SSE) | Initial research query |
| `/api/research/follow-up` | POST | Real (Claude AI, SSE) | Follow-up research |
| `/api/research/embed` | POST | Real | Embeds research data |
| `/api/debug` | GET | **Security risk** | Exposes API key prefix |

**Missing API routes:**
- No `/api/judgment/*` routes exist
- No `/api/documents/*` routes exist
- No `/api/cases/*` routes exist

---

## 11. Accessibility Gaps

### 11.1 Missing ARIA Labels
- Dashboard stat cards have no `aria-label` or role attributes
- Activity items have no semantic structure
- Quick action buttons lack `aria-label` descriptions

### 11.2 Keyboard Navigation
- Document list dropdown menus may not be fully keyboard-accessible
- Case selector popover relies on mouse interaction patterns
- Sidebar collapse toggle has no accessible description of current state

### 11.3 Missing Focus Management
- Modal dialogs (Save to Notes, Regenerate) don't trap focus
- After brief generation completes and auto-navigates, focus is not managed

### 11.4 Color Contrast
- Several text elements use `text-gray-400` on white backgrounds which may not meet WCAG AA contrast requirements
- Badge colors (especially light variants like `bg-amber-100 text-amber-700`) should be verified

### 11.5 Screen Reader Support
- Streaming text updates have no `aria-live` regions
- Progress indicators (extraction, generation) have no `aria-valuenow`/`aria-valuemax`
- "Saving..." and "Saved" auto-save indicators in Notes are not announced

---

## 12. Performance Concerns

### 12.1 useEffect Dependencies Missing or Overly Broad
- **File:** `app/judges/brief/page.tsx:68` — dependency array omits `pipeline.extractedData` and other values referenced in the effect
- **File:** `app/judges/research/[id]/page.tsx:208` — eslint-disable for exhaustive deps

### 12.2 Mock API Random Delay
- **File:** `lib/mock/api.ts:13-14`
- **Code:** `const randomDelay = () => delay(300 + Math.random() * 200)`
- **Issue:** Every mock API call has a 300-500ms artificial delay, making mock-backed pages feel slow for no reason.

### 12.3 No Data Caching
- All pages re-fetch all data on every mount. No SWR, React Query, or any caching strategy.

---

## 13. Summary of Issues by Severity

| Severity | Count | Description |
|----------|-------|-------------|
| **Critical** | 2 | Credentials in repo, debug endpoint exposes API key prefix |
| **High** | 3 | No auth, judgment CRUD missing, documents CRUD missing |
| **Medium** | 8 | Broken links, stub handlers, fake export, fake upload |
| **Low** | 10+ | Mock data, hardcoded colors, accessibility gaps, type issues |

---

*Report generated by automated code analysis. All file paths and line numbers are accurate as of audit date.*
