# QanoonAI — Technology Stack

> AI-powered legal research platform for Pakistan's legal ecosystem — serving lawyers, judges, and the public.

---

## Architecture Overview

```
                    ┌────────────────────┐
                    │     Frontend       │
                    │  Next.js (Vercel)  │
                    └────────┬───────────┘
                             │
                     rewrites /api/v1/*
                             │
                    ┌────────┴───────────┐
                    │      Backend       │
                    │ FastAPI (Railway)  │
                    └────────┬───────────┘
                             │
           ┌─────────┬───────┼────────┬──────────┐
           │         │       │        │          │
      ┌────┴───┐ ┌───┴──┐ ┌─┴──┐ ┌───┴───┐ ┌───┴───┐
      │  Neon  │ │Redis │ │ S3 │ │Claude │ │Voyage │
      │  (DB)  │ │Cache │ │    │ │  (AI) │ │(Embed)│
      └────────┘ └──────┘ └────┘ └───────┘ └───────┘
```

---

## Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript | App Router, Vercel deployment, Tailwind CSS + shadcn/ui |
| **Backend** | Python 3.12, FastAPI | Single service, 13 routers, Railway deployment |
| **Database** | Neon PostgreSQL + pgvector | Serverless Postgres, 1024-dim vector embeddings, full-text search via `tsvector`/GIN |
| **Cache** | Upstash Redis | Embedding cache (24h TTL), RAG search cache (15min TTL) |
| **File Storage** | AWS S3 | Document uploads (PDFs, DOCX) — replaces Vercel Blob |
| **LLM** | Anthropic Claude (Sonnet 4 + Haiku 4.5) | Brief generation, judgment drafting, research, chat, analysis |
| **Embeddings** | Voyage AI `voyage-law-2` | Legal-domain-specific, 1024-dim vectors, Redis-cached |
| **Auth** | NextAuth v5 | JWT/JWE session cookies, Credentials provider, FastAPI decrypts same token |
| **Email** | aiosmtplib | Password reset emails |
| **Doc Processing** | pdfjs-dist, tesseract.js (OCR), mammoth (DOCX) | Client-side extraction in browser |
| **Icons** | lucide-react | Only icon library used |
| **Animations** | motion (Framer Motion) | Landing page only, no portal animations |
| **Tours** | driver.js | Judge and lawyer onboarding tours |

---

## Database — Neon PostgreSQL

**Single database** with pgvector extension for vector search.

| Table Group | Purpose |
|---|---|
| `users`, `onboarding_submissions` | Auth, user profiles, onboarding |
| `judge_profiles`, `lawyer_profiles` | Role-specific profile data |
| `briefs`, `brief_sections`, `brief_conversations` | Brief generation pipeline |
| `judgments`, `judgment_sections`, `judgment_conversations` | Judgment drafting pipeline |
| `research_conversations`, `research_messages` | Legal research conversations |
| `notes`, `note_tags` | Judge notes system |
| `documents` | Uploaded document metadata |
| `precedents` | 300K+ case law corpus (RAG) with 1024-dim `embedding` column |
| `case_law_chunks` | Chunked content with embeddings for section-level search |
| `citation_graph` | Inter-judgment citation relationships |
| `ingestion_jobs` | Bulk ingestion tracking |

**Key PostgreSQL features used:**
- `pgvector` — `<=>` cosine distance for vector search
- `tsvector` + GIN indexes — full-text keyword search
- `text[]` columns — legal areas, keywords, headnotes
- `JSONB` — flexible metadata, case data, structured responses

---

## Search Strategy

All search runs through **PostgreSQL** — no separate search engine.

| Query Type | How | Example |
|---|---|---|
| Semantic search | pgvector `<=>` cosine distance on `embedding` column | "cases about tenant eviction rights" |
| Keyword search | `tsvector` + `ts_rank` with GIN index | "Section 302 PPC" |
| Hybrid search | Weighted combination: vector (0.60) + text (0.25) + metadata (0.15) | Combined meaning + keywords |
| Metadata filtering | SQL `WHERE` clauses | Filter by court, year, jurisdiction, court tier |
| Court tier boost | Score multiplier: SC (1.0) > HC (0.7) > Appellate (0.5) > District (0.3) | Higher courts ranked higher |

**Why not Weaviate?** pgvector handles hybrid search for 300K judgments with good performance. Weaviate adds operational complexity (separate service, hosting, syncing). pgvector runs inside the same Neon database — zero extra cost, zero extra infrastructure.

---

## AI Architecture

**Direct SDKs, no frameworks.** No LangChain, no LlamaIndex. All prompts are plain strings, all streaming is raw SSE.

| Provider | Model | Used For |
|---|---|---|
| **Anthropic** | Claude Sonnet 4 | Brief generation, judgment drafting, research, analysis, chat, section regeneration |
| **Anthropic** | Claude Haiku 4.5 | Title generation, precedent ranking (cheap, fast) |
| **Voyage AI** | `voyage-law-2` | Document + chunk embeddings (1024-dim, legal-domain-specific) |

### Streaming Pattern

All AI generation endpoints use Server-Sent Events (SSE):

```
Client ←── SSE ←── FastAPI ←── Anthropic SDK stream

data: {"meta": {"ragResults": [...]}}     ← pre-event (RAG results)
data: {"text": "The court held..."}        ← streaming tokens
data: {"text": " that the petitioner..."}  ← streaming tokens
data: {"complete": {"judgmentId": "..."}}  ← post-event (DB save result)
data: [DONE]                               ← end signal
```

### Document Ingestion Pipeline

```
Judgment Record → Upsert to `precedents` → Chunk (custom legal chunker) → Extract citations → Embed (Voyage AI) → Store vectors
```

**Custom legal chunker** — Pakistani/UK court judgments have specific structure (FACTS, ISSUES, ARGUMENTS, HOLDING, ORDER). The chunker detects section headings via regex and splits accordingly. Generic chunkers break mid-section and destroy citation context.

---

## Auth Flow

```
Browser → NextAuth (login) → JWE session cookie
Browser → /api/v1/* → Vercel rewrites → FastAPI
FastAPI → Decrypt JWE with AUTH_SECRET (HKDF + A256CBC-HS512) → SessionUser
```

- NextAuth handles login UI + session management (stays in Next.js)
- FastAPI decrypts the same JWE token — both share `AUTH_SECRET`
- Role-based access: `judge`, `lawyer`, `law_student`, `common_person`, `admin`
- Middleware in Next.js protects frontend routes
- `get_current_user` dependency in FastAPI protects API endpoints

---

## Deployment

| Component | Platform | Cost |
|---|---|---|
| **Frontend** | Vercel | Free tier (upgrade to $20/mo Pro for teams) |
| **Backend** | Railway | $5/mo Hobby (always-on, no cold starts) |
| **Database** | Neon PostgreSQL | $19/mo Launch (10 GB, always-on compute) |
| **Cache** | Upstash Redis | Free tier → $10/mo Pro when needed |
| **Storage** | AWS S3 | ~$1-5/mo (document uploads) |
| **AI** | Anthropic + Voyage | $50-400/mo depending on usage |
| **Email** | SMTP provider | Free tier or ~$5/mo |

### Environment Variables (shared across services)

| Variable | Shared By | Purpose |
|---|---|---|
| `DATABASE_URL` | Both | Same Neon database |
| `AUTH_SECRET` | Both | **Must match** — used to encrypt/decrypt session tokens |
| `ANTHROPIC_API_KEY` | Backend | Claude AI |
| `VOYAGE_API_KEY` | Backend | Embeddings |
| `UPSTASH_REDIS_*` | Backend | Embedding + search cache |
| `AWS_*` | Backend | S3 file storage |
| `SMTP_*` | Backend | Password reset emails |
| `CORS_ORIGINS` | Backend | Vercel domain |
| `FASTAPI_URL` | Frontend | Railway URL (for rewrites) |

---

## Backend Structure

```
backend/
├── app/
│   ├── main.py                    # FastAPI app, CORS, lifespan, 13 routers
│   ├── config.py                  # Pydantic Settings (all env vars)
│   │
│   ├── core/                      # Infrastructure
│   │   ├── auth.py                # JWE decrypt, get_current_user, require_admin
│   │   ├── database.py            # asyncpg pool (Neon)
│   │   ├── redis.py               # Async Redis (Upstash)
│   │   ├── streaming.py           # Shared SSE streaming helper
│   │   ├── exceptions.py          # Custom errors + handlers
│   │   └── middleware.py          # Request timing
│   │
│   ├── routers/                   # 13 API routers (75+ endpoints)
│   │   ├── health.py              # GET /health
│   │   ├── auth.py                # signup, forgot-password, reset-password
│   │   ├── profiles.py            # judge + lawyer profiles, tours
│   │   ├── onboarding.py          # submit, coming-soon
│   │   ├── activity.py            # recent activity
│   │   ├── notes.py               # CRUD + folders + tags
│   │   ├── documents.py           # upload (S3), CRUD
│   │   ├── briefs.py              # CRUD + generate, chat, regenerate, analyze, precedents
│   │   ├── judgments.py           # CRUD + generate, chat, regenerate
│   │   ├── research.py            # conversations CRUD + query, follow-up (SSE)
│   │   ├── dashboard.py           # judge + lawyer dashboards
│   │   ├── case_law.py            # search, browse, get, batch embeddings
│   │   └── admin.py               # stats, users, RAG ingest/bulk/query/health/info
│   │
│   ├── repositories/              # Data access (raw asyncpg SQL)
│   ├── models/                    # Pydantic request/response schemas
│   ├── services/                  # External clients (Anthropic, Voyage, S3, Email)
│   ├── prompts/                   # AI prompts (brief, judgment, research, ranking)
│   └── rag/                       # RAG subsystem (search, cache, ingest, chunking, citations)
```

---

## Frontend API Layer

```
lib/api/
├── client.ts          # apiFetch() + apiStream() — base helpers
├── auth.ts            # signup, forgot-password, reset-password
├── profiles.ts        # judge + lawyer profiles, tours
├── onboarding.ts      # submit, coming-soon
├── activity.ts        # recent activity
├── notes.ts           # notes CRUD + folders + tags
├── documents.ts       # upload, CRUD
├── briefs.ts          # CRUD + generate, chat, regenerate, analyze, precedents
├── judgments.ts        # CRUD + generate, chat, regenerate
├── research.ts         # conversations + query, follow-up (SSE streaming)
├── dashboard.ts        # judge + lawyer dashboards
├── case-law.ts         # search, browse, get
├── admin.ts            # stats, users, RAG management
└── index.ts            # barrel export
```

All API calls go through `apiFetch()` (JSON) or `apiStream()` (SSE) — both include credentials for cookie-based auth.

---

## Key Decisions

| Decision | Why |
|---|---|
| **Monolith over microservices** | 1 developer, 1 backend. Split when a specific part needs independent scaling |
| **pgvector over Weaviate** | Runs inside Neon — zero extra cost or infrastructure. Handles 300K judgments fine |
| **Railway over AWS EKS** | $5/mo vs $150+/mo. No K8s expertise needed. Deploy by pushing to GitHub |
| **Upstash over ElastiCache** | Free tier, REST-based, zero ops. No Celery = no need for native Redis protocol |
| **BackgroundTasks over Celery** | FastAPI built-in. Good enough for bulk ingestion. No extra workers to manage |
| **NextAuth JWE over RS256 JWT** | Already in place, works for single backend. Switch to RS256 only if adding more services |
| **Direct SDKs over LangChain** | Anthropic SDK + Voyage SDK directly. ~20 lines for RAG. Fewer deps, easier debugging |
| **Voyage AI over OpenAI embeddings** | `voyage-law-2` is purpose-built for legal text with better retrieval accuracy |
| **Custom legal chunker** | Pakistani legal docs (PLD/SCMR/CLC format) break with generic chunkers |
| **Client-side doc processing** | pdfjs + tesseract.js in browser. No server cost for PDF extraction |
| **Async-first Python** | asyncpg, aioredis, httpx — non-blocking I/O for DB + cache + LLM in every request |

---

## What to Add When Scaling

These are **not needed now** but worth adding as you grow:

| Trigger | Add | Why |
|---|---|---|
| First real users | **Sentry** (error tracking) | Know when things break before users tell you. Free tier: 5K events/mo |
| First real users | **Rate limiting** (`slowapi`) | Protect your Claude API budget from heavy users |
| Users upload scanned Urdu PDFs | **Google Document AI** | Server-side OCR, far better than client-side tesseract.js for Urdu |
| Anthropic has an outage | **OpenRouter fallback** | Routes to backup LLM providers automatically |
| 500+ active users | **Weaviate** | Dedicated vector search engine for better hybrid search at scale |
| Background jobs failing | **Celery + Redis broker** | Persistent async tasks that survive container restarts |
| Multiple developers | **Terraform** | Reproducible infrastructure, staging environments |
| 1M+ judgments | **Dedicated vector DB** | pgvector gets slow, move to Weaviate or Qdrant |

---

## Monthly Cost Estimate

### Launch (10-50 users): ~$75-120/mo

| Service | Cost |
|---|---|
| Vercel | $0 |
| Railway | $5 |
| Neon PostgreSQL | $19 |
| Upstash Redis | $0 |
| AWS S3 | $0 |
| Anthropic Claude | $30-80 |
| Voyage AI | $5-10 |
| SMTP | $0 |

### Growth (100-500 users): ~$280-675/mo

| Service | Cost |
|---|---|
| Vercel Pro | $20 |
| Railway Pro | $20 |
| Neon Scale | $19-69 |
| Upstash Pro | $10 |
| AWS S3 | $1-5 |
| Anthropic Claude | $200-500 |
| Voyage AI | $10-30 |
| Sentry | $0-26 |
