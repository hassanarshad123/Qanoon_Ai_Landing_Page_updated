# Judges Portal — User Experience Report

**Perspective:** A judge using the QanoonAI Judicial Portal
**Audit Date:** 2026-02-19

---

## Executive Summary

As a judge, I log in (there is no login) and see a polished-looking dashboard. The portal promises five core tools: Case Brief generation, Judgment drafting, Legal Research, Document management, and Notes. **Three of these work end-to-end** (Brief, Research, Notes). **Two are non-functional demos** (Judgment, Documents). The working features are genuinely powerful — real AI analysis, document extraction, streaming responses — but the non-working features create frustration and erode trust. Below is my feature-by-feature experience.

---

## 1. Dashboard — First Impressions

### What I See
- Greeting: "Good morning, Justice Ahmed" with today's date
- Four stat cards: Active Cases (47), Today's Hearings (4), Pending Judgments (5), Documents This Week (12)
- Today's Hearings list with case names, times, and statuses
- Quick Actions panel with 5 buttons
- Recent Activity feed

### What Works
- Layout is clean, professional, and well-organized
- Stat cards are visually clear with good use of color coding
- Quick Actions provide logical shortcuts to all portal sections

### What Doesn't Work
- **Every number is fake.** The "47 Active Cases" never changes. I can't click on it to see the cases. The stats are decoration, not data.
- **My name is hardcoded** — it says "Justice Ahmed" regardless of who I am. There's no user profile or account system.
- **All hearings link to the same page.** I click on "Punjab Cooperative Societies vs FBR" and it takes me to `/judges/brief/brief-001`. I click on a different hearing — same destination. This ID may not even exist if I haven't generated briefs yet, leading to a "Brief Not Found" page.
- **Activity feed is static.** The "recent" activity never updates. It's the same items every time.

### What's Missing
- Notification center (case updates, hearing reminders)
- Calendar view for upcoming hearings
- Pending tasks or items requiring my attention
- Quick access to my most recent work

**Verdict: Visual only — no functional value**

---

## 2. Case Brief Generator — The Star Feature

### What I See
- Upload area with two options: upload documents or select an existing case
- Previous Briefs grid showing past generated briefs
- Multi-format support (PDF, DOCX, XLSX, images)

### What Works End-to-End
1. **Document Upload** — I drag PDFs into the upload zone. The system extracts text from them in real-time with progress indicators. I can see page counts, file sizes, and select document types (Petition, Affidavit, etc.). This is genuinely functional.
2. **AI Analysis** — After upload, clicking "Generate Brief" triggers a multi-phase pipeline:
   - Documents are analyzed by Claude AI to extract parties, facts, legal issues, statutes, and arguments
   - The system searches a precedent database with AI-ranked relevance
   - Brief sections are generated with streaming text output
3. **Generated Brief** — The brief opens with 10 structured sections (Case Header, Parties, Material Facts, Legal Issues, Statutes, Arguments for both sides, Precedents, Comparative Matrix, Analysis). Each section is well-formatted with appropriate icons and visual hierarchy.
4. **Section Review** — I can review each section individually:
   - Approve sections (green checkmark)
   - Flag sections with notes (amber warning)
   - Edit section content inline
   - Regenerate sections with custom instructions for the AI
5. **Progress Tracking** — A review progress bar shows how many sections I've approved/flagged
6. **Finalization** — Once all sections are approved, I can finalize the brief
7. **Follow-up Chat** — At the bottom of each brief, I can ask Claude follow-up questions about the case with streaming responses
8. **Save to Notes** — I can save the brief content to my Notes library
9. **All data persists** — Briefs are saved to a real database. Coming back later, I see my previous briefs.

### What Doesn't Work
- **"Select Existing Case" option** — The dropdown shows a list of cases, but selecting one and clicking "Generate Brief" does nothing because the button requires uploaded documents. The case selector is disconnected from brief generation.
- **Export buttons** — "Export as PDF" and "Export as Word" show a success toast but generate no files. Only "Print" works (opens browser print dialog).
- **No brief deletion from UI** — I can see old briefs but cannot delete them from the interface.

### What's Missing
- Ability to generate a brief from an existing case without re-uploading documents
- Version history for edited sections
- Collaborative review (another judge or clerk reviewing)
- Side-by-side comparison of original document and generated brief

**Verdict: 85% functional — the core workflow works, export and case-linking are broken**

---

## 3. Judgment Drafting — Non-Functional Demo

### What I See
- "Create New Judgment Draft" card with two tabs: "Select a Case" and "Start from Existing Brief"
- Previous Judgment Drafts grid
- A judgment detail page with resizable panels

### What Works
- The UI layout is well-designed with a left panel showing the judgment skeleton (7 sections) and a right panel showing suggested precedents
- Sections are collapsible
- Previous judgment drafts display with metadata (date, section count, precedent count)

### What Doesn't Work
- **"Generate Judgment Skeleton" creates nothing.** Clicking this button navigates me to an existing mock judgment (or `jdg-001`). No new judgment is ever generated. No AI is involved.
- **AI Follow-up does nothing.** At the bottom of the judgment detail, there's a text input for "Ask the AI to refine any section." I type a message, click send, and nothing happens. The message disappears (it's logged to the browser console).
- **Cannot edit any section.** The judgment content is read-only. There's no edit button, no inline editing, no way to modify the draft.
- **Cannot save changes.** Even if I could edit, there's no save mechanism. No server actions, no database tables for judgments.
- **Precedent "Save to Notes" doesn't work.** Each precedent card has a save button with an empty handler.
- **Export is fake.** Same toast-only export as Brief.
- **All data is fake.** The judgment list and content come from a static JavaScript array that resets on page reload.

### What's Missing (compared to Brief)
- Actual AI judgment generation
- Section-by-section editing and review workflow
- AI-assisted expansion/refinement of sections
- Integration with the Brief (judge should be able to carry over analysis)
- Status management (Draft → Under Review → Finalized)
- Database persistence

**Verdict: 0% functional — this is a UI mockup, not a feature**

---

## 4. Legal Research — Fully Functional

### What I See
- A search interface with "General Research" and "Case Research" modes
- Suggested legal queries relevant to Pakistani law
- Previous conversation list with pin/search/filter support

### What Works End-to-End
1. **Query Input** — I type a legal question (e.g., "What is the test for granting bail in non-bailable offences?") and click "Start Research"
2. **AI-Powered Response** — Claude processes my query with a RAG (Retrieval-Augmented Generation) pipeline that:
   - Searches a Pakistani case law database
   - Returns a structured response with: Summary, Applicable Law, Precedents, Analysis, and Contrary Views
   - Responses stream in real-time with section-by-section rendering
3. **Citation Extraction** — The AI response automatically extracts and displays cited cases as interactive badges
4. **Follow-up Questions** — I can ask follow-up questions in the same conversation thread, maintaining context
5. **Case-Linked Research** — In "Case Research" mode, I select a specific case and my research is contextualized to it
6. **Conversation Management** — I can:
   - Pin important conversations
   - Search/filter past conversations
   - Delete conversations
   - See message counts and previews
7. **Save to Notes** — I can save research findings to my Notes library
8. **All data persists** — Conversations and messages are stored in a real database

### What Doesn't Work
- **Case selector uses mock data** — The case dropdown in "Case Research" mode shows hardcoded cases, not real ones from a database
- **Export is fake** — Same issue as everywhere else
- **No way to link research to a specific brief or judgment** — Research exists in its own silo

### What's Missing
- Ability to cite specific passages from research in a brief or judgment
- Advanced search filters (date range, court, legal area)
- Source document links (link to actual judgment text)
- Collaborative sharing of research with colleagues

**Verdict: 90% functional — the core AI research workflow is excellent**

---

## 5. Notes — Fully Functional

### What I See
- A two-panel layout: folders/tags on the left, notes grid on the right
- "New Note" button, search, sort, and filter controls

### What Works End-to-End
1. **Create Notes** — Click "New Note" creates a note and navigates to the editor immediately
2. **Rich Editing** — Title editing, folder assignment, tag management, and a large text editing area
3. **Auto-Save** — Content saves automatically with debounced writes. I see "Saving..." and "Saved" indicators.
4. **Folder Management** — I can create new folders (inline input), delete folders (notes move to General), and filter by folder
5. **Tag System** — Click tags to filter, add/remove tags from notes with a visual picker
6. **Source Tracking** — Notes saved from Brief or Research pages show their source with a clickable link
7. **Search & Sort** — Full-text search across titles and content, sort by newest/oldest/A-Z
8. **Delete with Confirmation** — Delete button shows a confirmation dialog before removing
9. **Print** — Print button opens browser print dialog
10. **All data persists** — Notes, folders, and tags are stored in a real database

### What Doesn't Work
- **Source link to judgment is broken** — When a note has `sourceType: "judgment"`, the link points to `/judges/judgments/{id}` (plural) which doesn't exist. The correct route is `/judges/judgment/{id}` (singular). This results in a 404.
- **No rich text editor** — The editor is a plain `<textarea>`. No bold, italic, lists, headings, or any formatting.
- **Tag creation** — Users can add existing tags to notes but cannot create new custom tags.

### What's Missing
- Rich text / Markdown editor
- Custom tag creation
- Ability to share notes
- Template system for common note types
- Version history

**Verdict: 90% functional — all core CRUD works with one broken link**

---

## 6. Documents — Hidden and Non-Functional

### What I See
- Document library with grid/list toggle, search, and filters
- Upload dialog
- Document detail viewer with resizable metadata/content panels

### What Works
- The UI renders correctly with document cards showing type badges, page counts, and file sizes
- Filtering by case and document type works (on mock data)
- Grid/list view toggle works
- Document detail page shows metadata on the left and document content on the right with section navigation

### What Doesn't Work
- **The page is hidden** — Documents was removed from the sidebar navigation (the link is commented out). Users can only access it via the Dashboard "View Documents" quick action.
- **Upload is fake** — The upload dialog simulates a progress bar but sends nothing to a server
- **Download does nothing** — The download button has no click handler
- **Delete does nothing** — The delete dropdown item has no click handler
- **All data is fake** — Documents come from a hardcoded array and disappear on refresh
- **No actual file viewing** — The "content" shown is just a text field from mock data, not an actual PDF/document viewer

### What's Missing
- Real file upload to cloud storage
- PDF viewer (even just an iframe embed)
- OCR for scanned documents
- Document categorization and tagging
- Integration with the Brief pipeline (select existing documents to brief)

**Verdict: 0% functional — UI demo only, intentionally hidden from navigation**

---

## 7. Cross-Feature Workflow Assessment

### What a Judge Actually Needs (and what's delivered)

| Workflow | Expected | Delivered |
|----------|----------|-----------|
| Receive case documents → Generate brief | Upload docs → AI generates brief → Review sections → Finalize | **Works** (except for "select existing case" path) |
| Review brief → Draft judgment | Brief sections carry over → AI assists judgment writing | **Broken** — Judgment drafting is not functional |
| Research law during case review | Ask legal questions → Get cited answers → Save findings | **Works** |
| Take notes during hearings | Quick note creation → Organize → Tag | **Works** |
| Export work product for court | Export brief/judgment as PDF or Word | **Broken** — Export is fake everywhere |
| Manage case documents | Upload, organize, search documents | **Broken** — Documents page is mock |
| Track hearing schedule | View upcoming hearings, link to cases | **Broken** — Static mock data |
| Review case statistics | Active cases, pending judgments | **Broken** — Hardcoded numbers |

---

## 8. UX Friction Points

### 8.1 No Connection Between Features
- A brief can't automatically feed into a judgment draft
- Research findings can't be inserted into a brief or judgment
- Documents can't be selected for brief generation from the documents page
- Notes saved from a source can't navigate back reliably (judgment link is broken)

### 8.2 No User Identity
- No login, no profile, no personalization
- "Justice Ahmed" is everyone's name
- No way to know whose briefs/research/notes I'm seeing

### 8.3 Inconsistent Feature Maturity
- Brief and Research feel production-ready with AI streaming, database persistence, and review workflows
- Judgment and Documents feel like wireframe mockups
- This inconsistency is confusing — a judge might start trusting the platform based on Brief, then lose confidence when Judgment doesn't work

### 8.4 Export Everywhere, Works Nowhere
- Every detail page has an Export button with PDF/Word options
- None of them generate actual files
- This is the most common "broken promise" in the portal

### 8.5 Mobile Experience
- The sidebar is responsive with a mobile sheet/drawer
- However, resizable panels (Judgment, Notes, Documents) don't work well on mobile
- No explicit mobile optimization for touch interactions

---

## 9. Priority Recommendations

### P0 — Critical (Security)
1. **Rotate credentials immediately** — `.env` and `.env.local` contain plaintext database passwords and Anthropic API keys committed to the repository. Rotate both, add to `.gitignore`, and use platform environment variables.
2. **Delete or protect the `/api/debug` endpoint** — it exposes API key information to anyone

### P1 — High (Core Functionality)
2. **Build real Judgment CRUD** — This is a judge's primary output. Without functional judgment drafting, the portal is incomplete for its core purpose.
3. **Implement authentication** — Add NextAuth/Clerk/Auth0 with role-based access. Every judge needs their own workspace.
4. **Fix export functionality** — Use a library like `jspdf` + `html2canvas` or `docx` to generate real PDF/Word files. This is essential for court use.

### P2 — Medium (Functionality Gaps)
5. **Replace mock data with real database** for Dashboard stats, Cases, Hearings, and Documents
6. **Fix the broken judgment source link** in Notes (`/judges/judgments/` → `/judges/judgment/`)
7. **Fix the hardcoded hearing links** on the Dashboard
8. **Connect the "Select Existing Case" path** in Brief to actually generate briefs from case data
9. **Build real document upload** — S3/Cloudflare R2 storage + real document management
10. **Add brief deletion UI** — The backend supports it, just needs a button

### P3 — Low (Polish)
11. **Add rich text editing** for Notes
12. **Add custom tag creation** in Notes
13. **Centralize brand colors** as CSS variables or Tailwind theme tokens
14. **Un-hide the Documents page** from navigation or remove it entirely to avoid confusion
15. **Replace hardcoded "Justice Ahmed"** with user session data (after auth is added)
16. **Add proper loading states** to Dashboard and Documents pages

---

## 10. Overall Assessment

| Dimension | Score | Notes |
|-----------|-------|-------|
| **Visual Design** | 9/10 | Polished, consistent, professional appearance |
| **Brief Generation** | 8.5/10 | Best feature — real AI pipeline, review workflow, persistence |
| **Legal Research** | 9/10 | Excellent AI research with structured responses and citations |
| **Notes** | 8/10 | Solid CRUD, auto-save, folders/tags — lacks rich text |
| **Judgment Drafting** | 1/10 | UI exists but nothing works — critical gap |
| **Document Management** | 1/10 | Hidden, mock data, fake upload — unusable |
| **Dashboard** | 3/10 | Looks great, all data is fake |
| **Security** | 2/10 | No auth, debug endpoint leaks secrets |
| **Export** | 0/10 | Fake everywhere |
| **Overall Readiness** | 4/10 | Half the portal is production-quality, half is a mockup |

The portal has a strong foundation in its Brief and Research features. With authentication, real Judgment CRUD, and actual export functionality, it could be a genuinely useful tool for judges. In its current state, it's approximately **50% demo / 50% functional product**.

---

*Report generated from a judge's perspective based on comprehensive code and feature analysis.*
