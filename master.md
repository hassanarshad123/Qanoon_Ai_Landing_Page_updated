# QanoonAI — Master Project Document

> **Definitive reference** for product vision, features, technology stack, design system, file structure, and all frontend implementation details.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Target Users](#2-target-users)
3. [Product Features (44 AI Tools)](#3-product-features-44-ai-tools)
4. [How It Works (RAG Pipeline)](#4-how-it-works-rag-pipeline)
5. [Pricing Tiers](#5-pricing-tiers)
6. [Security & Compliance](#6-security--compliance)
7. [Technology Stack](#7-technology-stack)
8. [Design System](#8-design-system)
9. [Project File Structure](#9-project-file-structure)
10. [Landing Page Architecture](#10-landing-page-architecture)
11. [Kitchen Sink Style Guide](#11-kitchen-sink-style-guide)
12. [Frontend Conventions](#12-frontend-conventions)

---

## 1. Product Overview

**QanoonAI** is Pakistan's first AI-powered legal intelligence platform — 44 tools built on 300,000+ court judgments for judges, lawyers, and citizens.

### Mission

Combine 300,000+ Pakistani court judgments with AI to give judges `neutral case briefs, lawyers instant drafting, and citizens free legal guidance — with **99.9% citation accuracy**.

### Core Value Propositions

| Proposition | Description |
|---|---|
| **Neutral Case Briefs** | Upload a 300-page case file, receive a 5-page neutral brief in minutes — no advocacy influence |
| **Instant Drafting** | Court-ready petitions, contracts, and applications with real citations from 300,000+ judgments |
| **Free Legal Guidance** | Know Your Rights portal and legal guidance chatbot in Urdu and English — completely free |
| **99.9% Citation Accuracy** | Every citation verified against a database of real judgments in real-time before display |

### Key Metrics

| Metric | Value |
|---|---|
| Court Judgments | 300,000+ |
| AI Tools | 44 |
| Citation Accuracy | 99.9% |
| High Courts Covered | 5 (Lahore, Sindh, Islamabad, Peshawar, Balochistan) |
| Legal Calculators | 17 |
| Languages | Urdu & English |

---

## 2. Target Users

### Judges (5,000+)

- Neutral AI-generated case briefs — zero advocacy influence
- Isolated workspace with separate database, encryption keys, and audit logs
- Judgment structuring assistance (format help, never decision influence)
- Mandatory 2FA with judicial identity verification
- Judicial tools operate with strictly neutral AI prompts

### Lawyers (120,000+)

- AI legal drafting: petitions in 45 minutes instead of 6 hours
- Research across 300,000+ judgments with semantic understanding (not keyword matching)
- Practice management: digital diary, file management, limitation tracking
- Case strategy advisor and notice analysis tools
- Full access to all 17 legal calculators

### Citizens (220M+)

- Free legal guidance chatbot in Urdu and English
- Know Your Rights portal (tenant, employee, consumer, family rights)
- Case law simplifier — complex court decisions in plain language
- All 17 calculators (inheritance, court fees, tax, mehr, etc.) — completely free
- 5 free tool uses per day on the Free tier

### Firms & Institutions

- Custom integrations and API access for bulk operations
- Dedicated support and institutional onboarding
- Complete data isolation for judicial institutions
- Training and change management included
- Compliance certification

---

## 3. Product Features (44 AI Tools)

### Brief

Upload a 300-page case file and receive a 5-page neutral brief in minutes. The AI reads case files like a judicial clerk — extracting facts, identifying issues, and presenting both parties' arguments neutrally. Every citation verified.

### Draft

Generate court-ready petitions, contracts, and applications. The AI identifies applicable laws, retrieves precedents from 300,000+ judgments, and formats output for Pakistani courts. Sample citations include PLDs, SCMRs, and CLCs.

### Research

Describe a legal question in plain language (Urdu or English). QanoonAI finds factually similar cases, analyzes ratio decidendi, and presents balanced authorities — with every citation verified against the database.

### Calculate — 17 Legal Calculators

All calculators are **100% deterministic** — no AI involved. Pure math based on Pakistani law. Every formula validated by legal consultants. Identical inputs always produce identical outputs.

| # | Calculator | Legal Basis |
|---|---|---|
| 1 | Inheritance Calculator (Hanafi) | Muslim Personal Law |
| 2 | Inheritance Calculator (Shia) | Shia Personal Law |
| 3 | Zakat Calculator | Zakat & Ushr Ordinance 1980 |
| 4 | Court Fee Calculator | Court Fees Act 1870 |
| 5 | Stamp Duty Calculator | Stamp Act 1899 |
| 6 | Income Tax Calculator | Income Tax Ordinance 2001 |
| 7 | Capital Gains Tax | Income Tax Ordinance 2001 |
| 8 | Property Tax Calculator | Provincial Laws |
| 9 | Limitation Period | Limitation Act 1908 |
| 10 | Gratuity Calculator | Payment of Gratuity Act |
| 11 | Maintenance Calculator | Family Courts Act 1964 |
| 12 | Legal Interest | Civil Procedure Code |
| 13 | Motor Accident Compensation | Motor Vehicles Ordinance |
| 14 | Diyat Calculator | Pakistan Penal Code |
| 15 | Arsh Calculator | Pakistan Penal Code |
| 16 | Customs Duty | Customs Act 1969 |
| 17 | Mehr Calculator | Muslim Family Laws |

---

## 4. How It Works (RAG Pipeline)

QanoonAI's Retrieval-Augmented Generation pipeline combines retrieval from 300,000+ real judgments with AI generation for accurate, citation-backed legal assistance.

### Step 1 — Retrieve from Real Judgments

Your query is converted to a semantic embedding and matched against 300,000+ Pakistani court judgments. The top relevant cases are retrieved — not generated, not guessed.

### Step 2 — AI Generates with Citations

GPT-4o synthesizes the retrieved judgments into structured, useful output — briefs, drafts, research memos — with every claim linked to a real source.

### Step 3 — Citations Verified Before Display

Every case citation is checked against the database in real-time. Non-existent citations are rejected. Only verified, accurate legal references are shown to the user.

---

## 5. Pricing Tiers

| Feature | Free | Professional | Professional Plus | Institutional |
|---|---|---|---|---|
| **Price** | PKR 0 forever | PKR 2,999/mo (PKR 2,499/mo annual) | PKR 4,999/mo (PKR 4,166/mo annual) | Custom |
| **For** | Citizens & students | Practicing lawyers | Senior lawyers & firms | Courts & judicial offices |
| AI tool uses | 5 per day | Unlimited | Unlimited | Unlimited |
| Legal guidance chatbot | Yes | Yes | Yes | Yes |
| Know Your Rights portal | Yes | Yes | Yes | Yes |
| All 17 calculators | Yes | Yes | Yes | Yes |
| Case law simplifier | Yes | Yes | Yes | Yes |
| AI legal drafting | — | Yes | Yes | Yes |
| Full research agent | — | Yes | Yes | Yes |
| 300,000+ judgment database | — | Yes | Yes | Yes |
| Notice analysis | — | Yes | Yes | Yes |
| Case strategy advisor | — | Yes | Yes | Yes |
| Practice management | — | Yes | Yes | Yes |
| API access | — | — | Yes | Yes |
| Bulk document processing | — | — | Yes | Yes |
| Advanced analytics | — | — | Yes | Yes |
| Priority AI processing | — | — | Yes | Yes |
| Isolated infrastructure | — | — | — | Yes |
| Judicial identity verification | — | — | — | Yes |
| Custom onboarding & training | — | — | — | Yes |
| Compliance certification | — | — | — | Yes |
| **CTA** | Get Started | Start 7-Day Free Trial | Start Free Trial | Contact Us |

**Annual billing saves 17%.**

### All Plans Include

- Urdu support
- Citation verification
- Legal consultant oversight
- 99.9% uptime SLA

### Payment Methods

Credit/Debit Cards, JazzCash, Easypaisa, Bank Transfer — via **PayFast**.

---

## 6. Security & Compliance

| Control | Detail |
|---|---|
| **Citation Accuracy SLA** | 99.9% — AI never invents case laws; every citation verified against the real database |
| **Judicial Isolation** | Separate database, separate encryption keys, separate audit logs. Zero access from lawyer tools. |
| **Mandatory 2FA** | Required for all judicial users; official email domain checks and admin approval |
| **Encryption** | AES-256 at rest, TLS 1.3 in transit |
| **Audit Trails** | Hash-chained, immutable records of every AI request |
| **Retention** | 7–10 year retention for legal compliance |
| **Regulatory** | Electronic Transactions Ordinance (Pakistan) compliance |
| **AI Neutrality** | Judicial tool prompts are strictly neutral — zero advocacy language |

### Courts Covered

- Supreme Court of Pakistan
- Lahore High Court
- Sindh High Court
- Islamabad High Court
- Peshawar High Court
- Balochistan High Court
- Federal Shariat Court
- Various Tribunals

Database updated daily with new judgments.

---

## 7. Technology Stack

### Core Framework

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 13.5.1 | App Router, `"use client"` pages |
| **React** | 18.2.0 | UI library |
| **TypeScript** | 5.2.2 | Type safety, strict mode enabled |
| **Tailwind CSS** | 3.3.3 | Utility-first styling |
| **tailwindcss-animate** | 1.0.7 | Animation utilities |

### UI Components

| Library | Role |
|---|---|
| **shadcn/ui** (47 components) | Pre-built accessible components in `components/ui/` |
| **Radix UI** (27 primitives) | Headless component primitives (accordion, dialog, dropdown, tabs, etc.) |
| **class-variance-authority** | Component variant API |
| **clsx + tailwind-merge** | Class name merging via `cn()` utility |
| **cmdk** | Command palette (search/command+k) |
| **vaul** | Drawer component |
| **embla-carousel-react** | Carousel component |
| **react-resizable-panels** | Resizable split panels |

### Forms & Validation

| Library | Role |
|---|---|
| **react-hook-form** | 7.53.0 — Form state management |
| **@hookform/resolvers** | Integration between react-hook-form and zod |
| **zod** | 3.23.8 — Schema validation |

### Data & Visualization

| Library | Role |
|---|---|
| **recharts** | 2.12.7 — Charts (bar charts on judges dashboard) |
| **date-fns** | 3.6.0 — Date utilities |
| **react-day-picker** | 8.10.1 — Calendar/date picker |

### Icons & Theming

| Library | Role |
|---|---|
| **lucide-react** | 0.446.0 — Icon library (Scale, ArrowRight, Gavel, etc.) |
| **next-themes** | 0.3.0 — Theme management (light/dark) |

### Toasts & Notifications

| Library | Role |
|---|---|
| **sonner** | 1.5.0 — Toast notifications |
| **@radix-ui/react-toast** | Custom toast hook (`useToast`) |

### Backend & Infrastructure

| Service | Role |
|---|---|
| **Supabase** | `@supabase/supabase-js` 2.58.0 — Backend (auth, database, storage) |
| **Netlify** | Deployment via `@netlify/plugin-nextjs` 5.15.1 |

### Build Configuration

- **ESLint**: `next/core-web-vitals` preset; errors ignored during builds
- **PostCSS**: Tailwind CSS + Autoprefixer
- **TypeScript**: Target ES5, strict mode, bundler module resolution, `@/*` path alias
- **Images**: Unoptimized (static export compatible)

---

## 8. Design System

### Colors

#### Brand Palette

| Token | Hex | Usage |
|---|---|---|
| **Primary Purple** | `#A21CAF` | Primary CTA, links, active states, brand accent |
| **Dark Purple** | `#86198F` | Hover state for primary purple |
| **Gold** | `#84752F` | Section labels, category icons |
| **Dark Plum** | `#2D1F2D` | Footer background |
| **Near Black** | `#1F1520` | Enterprise/security section background |
| **CTA Dark** | `#1f1f1f` | Header "Get Started" button |

#### CSS Custom Properties (`:root`)

```
--qanoon-magenta: #A21CAF
--qanoon-magenta-hover: #86198F
```

#### Gray Scale

| Token | Value |
|---|---|
| White | `#FFFFFF` |
| Gray 50 | `#F9FAFB` (`bg-gray-50`) |
| Gray 100 | `#F3F4F6` |
| Gray 200 | `#E5E7EB` |
| Gray 300 | `#D1D5DB` |
| Gray 400 | `#9CA3AF` |
| Gray 500 | `#6B7280` |
| Gray 600 | `#4B5563` |
| Gray 700 | `#374151` |
| Gray 900 | `#111827` |
| Gray 950 | `#030712` |

#### Semantic Colors

| Role | Color |
|---|---|
| Success / Verified | Green (`#22C55E`, `#84CC16`) |
| Error / Urgent | Red (`#EF4444`) |
| Warning | Amber (`#F59E0B`) |
| Info | Cyan (`#06B6D4`) |

#### HSL Theme Tokens (shadcn/ui)

Defined in `app/globals.css` under `@layer base :root`:

```
--background: 0 0% 100%
--foreground: 0 0% 3.9%
--card: 0 0% 100%
--card-foreground: 0 0% 3.9%
--popover: 0 0% 100%
--popover-foreground: 0 0% 3.9%
--primary: 0 0% 9%
--primary-foreground: 0 0% 98%
--secondary: 0 0% 96.1%
--secondary-foreground: 0 0% 9%
--muted: 0 0% 96.1%
--muted-foreground: 0 0% 45.1%
--accent: 0 0% 96.1%
--accent-foreground: 0 0% 9%
--destructive: 0 84.2% 60.2%
--destructive-foreground: 0 0% 98%
--border: 0 0% 89.8%
--input: 0 0% 89.8%
--ring: 0 0% 3.9%
--radius: 0.5rem
--chart-1: 12 76% 61%
--chart-2: 173 58% 39%
--chart-3: 197 37% 24%
--chart-4: 43 74% 66%
--chart-5: 27 87% 67%
```

### Typography

#### Font Families

| Font | CSS Variable | Usage |
|---|---|---|
| **Inter** | `--font-inter` | Sans-serif — body text, UI elements, buttons, navigation |
| **Playfair Display** | `--font-playfair` | Serif — headings, hero titles, section headers, stat numbers |

Both loaded via `next/font/google` in `app/layout.tsx`. Playfair Display includes normal and italic styles.

```css
font-sans: var(--font-inter), system-ui, -apple-system, sans-serif
font-serif: var(--font-playfair), Georgia, 'Times New Roman', serif
```

#### Heading Scale

| Level | Class | Style |
|---|---|---|
| **H1** | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif` | Hero — largest, serif, italic emphasis |
| **H2** | `text-3xl md:text-4xl lg:text-5xl font-serif` | Section headings |
| **H3** | `text-xl font-semibold` or `text-3xl md:text-4xl font-serif` | Sub-section headings |
| **H4** | `text-lg font-semibold` | Card titles, feature titles |
| **H5** | `text-base font-semibold` | Small headings |
| **H6** | `text-base font-semibold` | Smallest heading |

#### Body Text

| Variant | Class |
|---|---|
| Lead | `text-lg md:text-xl text-gray-500 leading-relaxed` |
| Base | `text-sm md:text-base text-gray-600` |
| Small | `text-sm text-gray-500` |
| Caption | `text-xs text-gray-400` |

#### Section Label Pattern

Used at the top of every major section on the landing page:

```
Gold uppercase label (text-[#84752F] text-sm font-medium uppercase tracking-wide)
+ Serif heading (font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900)
+ Gray description (text-gray-500 text-lg)
```

#### Special Patterns

- **Stat numbers**: `font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900`
- **Italic serif**: Used for hero emphasis (`italic font-serif`)
- **Monospace labels**: `font-mono text-xs` for step numbers and code-like labels

### Button Patterns

| Pattern | Style |
|---|---|
| **Primary Purple** | `bg-[#A21CAF] hover:bg-[#86198F] text-white rounded-xl` + magenta shadow on hover |
| **Secondary Outline** | `border border-gray-300 bg-white text-gray-900 rounded-xl hover:bg-gray-50` |
| **Dark Header CTA** | `bg-[#1f1f1f] text-white rounded-lg hover:bg-black` |
| **Ghost** | `text-gray-600 hover:text-gray-900` (nav links) |
| **Destructive** | shadcn destructive variant |
| **Loading** | Animated spinner SVG + disabled state |

### Card Patterns

| Pattern | Description |
|---|---|
| **Basic** | `bg-white rounded-2xl border border-gray-200 p-6` |
| **Branded (purple gradient)** | Purple border + shadow (`border-2 border-[#A21CAF] shadow-xl shadow-[#A21CAF]/10`) |
| **Stat cards** | Serif number + label + trend indicator |
| **Feature cards** | Icon + title + description with hover lift |
| **Pricing cards** | Highlighted "Most Popular" with scale transform |
| **Calculator cards** | `bg-gray-50 hover:bg-white` with hover border and lift |

### Animations

| Animation | Implementation |
|---|---|
| **Fade-in + slide-up** | `opacity-0 translate-y-8` → `opacity-100 translate-y-0` on mount (`useEffect + useState`) |
| **Staggered delays** | `delay-200`, `delay-300`, `delay-400` on hero elements |
| **3D transforms** | `perspective`, `rotateX`, `translateZ` on document stack and diagram visuals |
| **Pulse / glow** | `box-shadow` animation on QanoonAI logo in HeroVisual |
| **Line glow** | Opacity pulse on vertical lines in HeroVisual |
| **Particle movement** | `translateX` animation on floating dots in HeroVisual |
| **Document slide** | Complex keyframe animations moving documents across viewport |
| **Hover lift** | `hover:-translate-y-0.5` or `hover:-translate-y-1` on buttons and cards |
| **Bounce** | `animate-bounce` on scroll indicator arrow |
| **Accordion** | `accordion-down` / `accordion-up` keyframes (Radix height animation) |

### Responsive Breakpoints

Mobile-first approach using Tailwind defaults:

| Breakpoint | Prefix | Usage |
|---|---|---|
| < 768px | (default) | Single column, stacked layout, hamburger menu |
| 768px+ | `md:` | 2-4 column grids, side-by-side layouts |
| 1024px+ | `lg:` | Full desktop layout, max-width containers |

- **Mobile nav**: Sheet component (hamburger menu → slide-in panel)
- **Max content width**: `max-w-7xl` (Header), `max-w-6xl` (most sections), `max-w-5xl` (Hero), `max-w-4xl` (CTA), `max-w-3xl` (FAQ)

---

## 9. Project File Structure

```
/
├── app/
│   ├── globals.css                          # Tailwind directives, CSS variables, custom utilities
│   ├── layout.tsx                           # Root layout — "use client", Inter + Playfair fonts, <html> wrapper
│   ├── page.tsx                             # Landing page — renders all 15 sections in order
│   └── kitchen-sink/
│       ├── layout.tsx                       # Kitchen sink layout — sidebar, breadcrumbs, ThemeProvider
│       ├── page.tsx                         # Kitchen sink index — grid of 10 card links
│       ├── buttons/page.tsx                 # Button variants, sizes, states, groups
│       ├── cards/page.tsx                   # Card types: basic, branded, stat, feature, pricing
│       ├── colors/page.tsx                  # Brand colors, gray scale, semantic colors, gradients
│       ├── forms/page.tsx                   # Inputs, selects, checkboxes, radios, date picker, file upload
│       ├── judges-case-management/page.tsx  # Case list, detail card, status badges, timeline
│       ├── judges-dashboard/page.tsx        # Stats, calendar, activity feed, charts, resizable panels
│       ├── navigation/page.tsx              # Header, sidebar, breadcrumbs, tabs, pagination, sheet, drawer
│       ├── overlays/page.tsx                # Dialog, alert dialog, toasts, tooltips, popover, command, skeleton
│       ├── tables/page.tsx                  # Basic table, sortable, row actions, status badges, pagination
│       └── typography/page.tsx              # Fonts, heading scale, body text, weights, section label pattern
│
├── components/
│   ├── AnnouncementBanner.tsx               # Purple top banner — "44 Tools, 300,000+ Judgments"
│   ├── Header.tsx                           # Sticky header — logo, nav, mobile menu, scroll shadow
│   ├── HeroSection.tsx                      # Full-height hero — serif heading, animated fade-in, dual CTAs
│   ├── HeroVisual.tsx                       # Animated document flow — sliding docs, particles, data fields
│   ├── StatsSection.tsx                     # 4 stat counters — 300K+ judgments, 44 tools, 99.9%, 5 HCs
│   ├── BeforeAfterSection.tsx               # Side-by-side comparison — "Without" vs "With" QanoonAI
│   ├── ProductSection.tsx                   # 4 product tabs — Brief, Draft, Research, Calculate + previews
│   ├── UseCasesSection.tsx                  # 4 user type tabs — Judges, Lawyers, Citizens, Firms
│   ├── CalculatorShowcase.tsx               # Grid of all 17 calculators with legal basis
│   ├── HowItWorksSection.tsx                # 3-step RAG pipeline + 3D document diagram
│   ├── PricingSection.tsx                   # 4 pricing tiers + monthly/annual toggle
│   ├── EnterpriseSection.tsx                # Dark security section — 4 features + lock illustration
│   ├── FAQSection.tsx                       # 7 expandable questions with accordion animation
│   ├── CTASection.tsx                       # Final CTA — dual buttons + dot pattern background
│   ├── Footer.tsx                           # Dark plum footer — 6-column links + "qanoonai" SVG pattern
│   │
│   ├── kitchen-sink/
│   │   ├── Sidebar.tsx                      # Left navigation with active page highlighting
│   │   ├── SectionBlock.tsx                 # Section wrapper with title, description, code block
│   │   ├── ColorSwatch.tsx                  # Color display — swatch + name + hex
│   │   ├── CodeBlock.tsx                    # Dark code display with language label
│   │   └── KitchenSinkBreadcrumbs.tsx       # Dynamic breadcrumb from pathname
│   │
│   └── ui/                                  # 47 shadcn/ui components
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
│
├── hooks/
│   └── use-toast.ts                         # Custom toast hook (wraps @radix-ui/react-toast)
│
├── lib/
│   └── utils.ts                             # cn() utility — clsx + tailwind-merge
│
├── components.json                          # shadcn/ui configuration (default style, neutral base, aliases)
├── netlify.toml                             # Netlify build config — "npx next build", .next publish
├── next.config.js                           # ESLint ignored on build, unoptimized images
├── postcss.config.js                        # Tailwind CSS + Autoprefixer
├── tailwind.config.ts                       # Colors, fonts, animations, border-radius, plugins
├── tsconfig.json                            # Strict TS, ES5 target, @/* path alias, bundler resolution
├── package.json                             # Dependencies and scripts
└── package-lock.json
```

---

## 10. Landing Page Architecture

The landing page (`app/page.tsx`) renders **15 sections** in this order:

| # | Component | Description |
|---|---|---|
| 1 | `AnnouncementBanner` | Purple banner: "Pakistan's First AI-Powered Legal Intelligence Platform — 44 Tools, 300,000+ Judgments" |
| 2 | `Header` | Sticky header with QanoonAI logo (Scale icon), nav links (Platform, For Judges, For Lawyers, Pricing), Log in, Get Started button. Scroll shadow. Mobile hamburger menu. |
| 3 | `HeroSection` | Full-viewport hero. Serif heading with italic emphasis and magenta underline SVG. Subtitle with 99.9% accuracy. Dual CTAs (Explore Platform / Request Demo). Feature bullets. Bounce scroll indicator. Animated fade-in on mount. |
| 4 | `HeroVisual` | Animated infographic on grid background. Documents slide left-to-right through central QanoonAI logo. Data fields (citation, court_fee, statute, petition, precedent) emerge on the right. Particle dots. Pixel patterns. Complex CSS keyframe animations. |
| 5 | `StatsSection` | 4 key metrics in serif numerals: 300,000+ Court Judgments, 44 AI Tools, 99.9% Citation Accuracy, 5 High Courts Covered. Scattered colored pixel accents. |
| 6 | `BeforeAfterSection` | Side-by-side comparison. "Without QanoonAI" (gray, clock icon) vs "With QanoonAI" (magenta gradient, zap icon). 6 concrete before/after comparisons (300-page brief: 3-4 hrs → 5 min, etc.). |
| 7 | `ProductSection` | Interactive tabs for 4 core features: Brief, Draft, Research, Calculate. Left side: clickable feature list with descriptions. Right side: sticky animated preview showing contextual UI mockups for each feature. |
| 8 | `UseCasesSection` | Tab-based user type selector: Judges, Lawyers, Citizens, Firms & Institutions. Each tab shows gold label, serif heading, description, CTA button, and a legal data preview table with Pakistani case citations. |
| 9 | `CalculatorShowcase` | Grid of all 17 calculators. Each card shows emoji icon, name, and legal basis. Hover effect with magenta border and lift. "Try Calculators Free" CTA. |
| 10 | `HowItWorksSection` | 3-step RAG pipeline explanation with numbered steps. Left: step cards (Retrieve → Generate → Verify). Right: 3D perspective document diagram. |
| 11 | `PricingSection` | 4 pricing tiers (Free, Professional, Professional Plus, Institutional) with monthly/annual toggle (17% savings). Professional highlighted as "Most Popular" with scale transform and magenta border. Feature checklists. Payment methods footer. |
| 12 | `EnterpriseSection` | Dark background security section. Lock icon header. 4 security features (Citation Accuracy, Judicial Isolation, 2FA, Audit Trails) flanking a central security illustration. "Built for Pakistan's legal infrastructure" footer with institutional names. |
| 13 | `FAQSection` | 7 expandable FAQ items in an accordion pattern. Questions cover: legal advice disclaimer, accuracy, judicial neutrality, court coverage, Urdu support, data security, calculator methodology. |
| 14 | `CTASection` | Final conversion section. Dot pattern background. "Pakistan's legal system deserves better tools." Dual CTAs (Get Started Free / Request Institutional Demo). No credit card required note. |
| 15 | `Footer` | Dark plum (`#2D1F2D`) footer. 6-column grid: company description, Platform links, Company links, Social links, User type links, Legal links. Decorative SVG with dot-pattern mask spelling "qanoonai". Copyright 2026. |

---

## 11. Kitchen Sink Style Guide

**Route**: `/kitchen-sink`

A living reference for all UI patterns, components, and design tokens used across QanoonAI. Accessible via the kitchen-sink layout which includes a sidebar navigation and breadcrumb header.

### Pages

| # | Route | Description |
|---|---|---|
| 1 | `/kitchen-sink` | Index page — grid of 10 card links to all sub-pages with descriptions and category icons |
| 2 | `/kitchen-sink/colors` | Brand palette (#A21CAF, #86198F, #84752F, #2D1F2D), gray scale (white → 950), semantic colors, gradients (purple, gold, dark), shadow scale, CSS variables |
| 3 | `/kitchen-sink/typography` | Font families (Inter, Playfair Display), heading scale (H1-H6), body text sizes, font weights (300-800), section label pattern, italic serif, stat numbers |
| 4 | `/kitchen-sink/buttons` | shadcn variants (default, destructive, outline, secondary, ghost, link), sizes (sm, default, lg, icon), branded CTAs (purple/dark), icon buttons, loading states, button groups |
| 5 | `/kitchen-sink/forms` | Text inputs, textarea, select (courts/case types), checkboxes, radio groups, switches, OTP input (6 slots), date picker with calendar, file upload (drag & drop), complete case filing form with zod validation |
| 6 | `/kitchen-sink/cards` | Basic, branded (purple accent), stat cards (trends), feature cards, dashboard widgets (progress), case summary, pricing cards |
| 7 | `/kitchen-sink/tables` | Basic read-only, sortable headers, row actions (dropdown menus), status badges (color-coded), pagination, progress bars |
| 8 | `/kitchen-sink/navigation` | Mini header, sidebar nav, breadcrumbs (2-3 level), tabs, pagination, sheet (side panel), drawer (bottom sheet) |
| 9 | `/kitchen-sink/overlays` | Dialog (add case), alert dialog (delete confirmation), toasts (success/error/warning/info via Sonner), tooltips (all positions), popover (filter form), command palette (search), loading skeletons |
| 10 | `/kitchen-sink/judges-case-management` | Case list table with Pakistani citations (PLD references), case detail card (tabbed: details/documents/orders/timeline), legal status badges (Active, Pending, Closed, Urgent, Reserved, Adjourned, Dismissed, Decreed), case type badges (Constitutional, Civil, Criminal, Family, Tax, Corporate, Writ, Appeal), vertical timeline |
| 11 | `/kitchen-sink/judges-dashboard` | Stat cards (Active Cases, Pending Hearings, etc.), calendar widget, activity feed, Recharts bar chart (cases per month), resizable split-panel document workspace |

### Kitchen Sink Utility Components

| Component | File | Purpose |
|---|---|---|
| `Sidebar` | `components/kitchen-sink/Sidebar.tsx` | Left nav with active page highlighting and "Judges Portal" section separator |
| `SectionBlock` | `components/kitchen-sink/SectionBlock.tsx` | Section wrapper with title, description, rendered component, and code block below |
| `ColorSwatch` | `components/kitchen-sink/ColorSwatch.tsx` | Displays a color square with name and hex value |
| `CodeBlock` | `components/kitchen-sink/CodeBlock.tsx` | Dark-themed code display with language label (default "TSX") |
| `KitchenSinkBreadcrumbs` | `components/kitchen-sink/KitchenSinkBreadcrumbs.tsx` | Dynamic breadcrumbs from `usePathname()` with human-readable label mapping |

---

## 12. Frontend Conventions

### Architecture

- **All pages are `"use client"`** — the root layout (`app/layout.tsx`) is a client component
- **App Router** (Next.js 13) — file-based routing under `app/`
- **No server components** in the current codebase
- **Path alias**: `@/*` maps to the project root (e.g., `@/components/ui/button`)

### Styling

- **`cn()` utility** (`lib/utils.ts`) — combines `clsx` and `tailwind-merge` for safe class merging
- **HSL color system** via CSS variables (e.g., `hsl(var(--primary))`) — defined in `globals.css`, consumed in `tailwind.config.ts`
- **Brand colors** are hardcoded as hex values in component classes (e.g., `text-[#A21CAF]`, `bg-[#86198F]`) rather than using the CSS variable system
- **Dark mode** configured (`darkMode: ['class']` in Tailwind config) but only used in kitchen-sink layout (forced light theme via `ThemeProvider`)

### Components

- **shadcn/ui components** used as-is from `components/ui/` — not modified
- **shadcn config** (`components.json`): default style, neutral base color, RSC-compatible, CSS variables enabled
- **Landing page components** live directly in `components/` (flat structure, one component per file)
- **Kitchen sink utilities** live in `components/kitchen-sink/`

### Data & Content

- **Pakistani legal references** used throughout sample data: PLDs, SCMRs, CLCs
- **Courts referenced**: Supreme Court, Lahore HC, Sindh HC, Islamabad HC, Peshawar HC, Balochistan HC
- **Case types**: Constitutional, Civil, Criminal, Family, Tax, Corporate, Writ, Appeal
- **Status badges**: Active, Pending, Closed, Urgent, Reserved, Adjourned, Dismissed, Decreed
- **Currency**: PKR (Pakistani Rupee) throughout pricing and calculator examples

### Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build (Next.js)
npm run start      # Start production server
npm run lint       # ESLint
npm run typecheck  # TypeScript type checking (tsc --noEmit)
```

---

*QanoonAI.pk — Pakistan's First AI-Powered Legal Intelligence Platform*
