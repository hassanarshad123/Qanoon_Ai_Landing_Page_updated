# QanoonAI — Technology Stack

> AI-powered legal research platform for Pakistan's legal ecosystem — serving lawyers, judges, and the public.

---

## Stack

| Layer | Technology |
|---|---|
| **Web App** | Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui |
| **API Services** | Python 3.11, FastAPI (5 microservices: Auth, RAG, Judicial, Lawyer, Tools) |
| **Database** | PostgreSQL (app data + full-text search via `tsvector`/GIN indexes) |
| **Vector Search** | Weaviate (hybrid: semantic + BM25 keyword in one query) |
| **Cache** | Redis (session cache, rate limiting, task broker) |
| **Storage** | AWS S3 (PDFs, court documents, backups — KMS encrypted, lifecycle policies) |
| **LLM** | Anthropic Claude (chat, legal analysis, agentic research via `tool_use`) |
| **Embeddings** | Voyage AI `voyage-law-2` (legal-domain-specific, 1024-dim vectors) |
| **LLM Fallback** | OpenRouter (model gateway, fallback if primary provider is down) |
| **Auth** | RS256 JWT with refresh token rotation |
| **Doc Processing** | PyMuPDF + pdfplumber (text extraction), custom legal chunker |

---

## Search Strategy

| Query Type | Engine | Why |
|---|---|---|
| Structured data (users, metadata, court/year/judge) | **PostgreSQL** | Simple SQL with indexes |
| Keyword search in documents | **PostgreSQL** | `tsvector` + GIN index |
| Semantic search ("cases about tenant rights") | **Weaviate** (vector) | Meaning-based retrieval |
| Citation search ("Section 302 PPC 2024 SCMR") | **Weaviate** (BM25) | Exact term frequency scoring |
| Combined meaning + keywords | **Weaviate** (hybrid) | Single query, automatic score fusion |

**Rule of thumb:** Structured data or simple keywords → PostgreSQL. Meaning or ranked relevance → Weaviate.

---

## AI Architecture

**Direct SDKs, no frameworks.** No LangChain, no LlamaIndex. The RAG pipeline is ~20 lines of code.

### Agentic Legal Research

```
Lawyer query
  → Agent searches case law (Weaviate hybrid search)
  → Reads relevant judgments
  → Extracts & verifies citations
  → Synthesizes answer with verified sources
```

Simple tool-use loop with the Anthropic SDK — no multi-agent orchestration.

### Document Ingestion

```
PDF → Text Extraction (PyMuPDF) → Legal Chunking → Embedding (Voyage AI) → Weaviate
```

Custom `legal_chunker.py` — Pakistani legal documents have specific structure (PLJ/PLD format, statute references) that generic chunkers break.

---

## AWS

| Category | Services |
|---|---|
| **Databases** | RDS PostgreSQL 16.6 (Multi-AZ), ElastiCache Redis |
| **Storage** | S3 (KMS encrypted, lifecycle: Standard → IA → Glacier) |
| **Networking** | VPC, ALB, Route53 |
| **Security** | IAM, KMS, Secrets Manager, WAF v2 |

Everything encrypted at rest (KMS) and in transit (TLS).

---

## Key Decisions

| Decision | Why |
|---|---|
| **Direct SDKs over frameworks** | Fewer dependencies, easier debugging, full control |
| **Weaviate over OpenSearch** | Native hybrid search in one query |
| **Voyage AI over OpenAI embeddings** | `voyage-law-2` built for legal text, better retrieval accuracy |
| **Custom legal chunker** | Pakistani legal docs have specific structure generic chunkers destroy |
| **Claude tool_use for agents** | Simple while loop, no framework needed |
| **Async-first Python** | Non-blocking I/O for DB + cache + LLM in every request |
| **RS256 JWT** | Asymmetric signing — services verify without sharing the private key |
| **Pakistani localization** | +92 phones, provinces, bar council IDs, Urdu support |
