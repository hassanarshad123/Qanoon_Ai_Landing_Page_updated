#!/usr/bin/env npx tsx
/**
 * Bulk ingestion script for QanoonAI RAG system.
 *
 * Reads structured JSON/JSONL from a data file and ingests into the database.
 *
 * Usage:
 *   npx tsx scripts/bulk-ingest.ts --input ./data/pk-judgments.jsonl --jurisdiction PK
 *   npx tsx scripts/bulk-ingest.ts --input ./data/uk-judgments.json --jurisdiction UK --resume
 *
 * Flags:
 *   --input <path>         Path to JSON or JSONL file
 *   --jurisdiction PK|UK   Jurisdiction filter
 *   --resume               Resume from last processed record
 *   --batch-size <n>       Records per batch (default: 50)
 */

import { createRequire } from "module";
import * as fs from "fs";
import * as path from "path";

// Load .env for local development
try {
  const dotenvPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(dotenvPath)) {
    const content = fs.readFileSync(dotenvPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
} catch {}

// Dynamic imports after env is loaded
async function main() {
  const { sql } = await import("../lib/db/index.js");
  const { ingestJudgments, createIngestionJob, getIngestionJobStatus } = await import("../lib/rag/ingest.js");
  const type = await import("../lib/rag/types.js");

  // Parse CLI args
  const args = process.argv.slice(2);
  let inputPath = "";
  let jurisdiction = "";
  let resume = false;
  let batchSize = 50;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--input":
        inputPath = args[++i];
        break;
      case "--jurisdiction":
        jurisdiction = args[++i];
        break;
      case "--resume":
        resume = true;
        break;
      case "--batch-size":
        batchSize = parseInt(args[++i], 10);
        break;
    }
  }

  if (!inputPath) {
    console.error("Usage: npx tsx scripts/bulk-ingest.ts --input <path> [--jurisdiction PK|UK] [--resume] [--batch-size 50]");
    process.exit(1);
  }

  // Read input file
  const absPath = path.resolve(process.cwd(), inputPath);
  if (!fs.existsSync(absPath)) {
    console.error(`File not found: ${absPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(absPath, "utf-8");
  let records: any[];

  if (absPath.endsWith(".jsonl")) {
    records = raw
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line));
  } else {
    const parsed = JSON.parse(raw);
    records = Array.isArray(parsed) ? parsed : [parsed];
  }

  // Apply jurisdiction filter
  if (jurisdiction) {
    records = records.map((r) => ({ ...r, jurisdiction: jurisdiction || r.jurisdiction }));
  }

  console.log(`\n📚 QanoonAI Bulk Ingestion`);
  console.log(`   Input: ${absPath}`);
  console.log(`   Records: ${records.length}`);
  console.log(`   Jurisdiction: ${jurisdiction || "mixed"}`);
  console.log(`   Batch size: ${batchSize}\n`);

  // Handle resume
  let startFrom = 0;
  let jobId: string;

  if (resume) {
    // Find latest running job
    const latestJobs = await sql(
      `SELECT id, last_processed_id, processed FROM ingestion_jobs
       WHERE job_type = 'bulk' AND status IN ('running', 'failed')
       ORDER BY created_at DESC LIMIT 1`
    );

    if (latestJobs.length > 0) {
      jobId = latestJobs[0].id;
      startFrom = latestJobs[0].processed || 0;
      console.log(`🔄 Resuming job ${jobId} from record ${startFrom}\n`);
      await sql(`UPDATE ingestion_jobs SET status = 'running' WHERE id = $1`, [jobId]);
    } else {
      console.log("No previous job found, starting fresh.\n");
      jobId = await createIngestionJob("bulk", records.length, jurisdiction || undefined);
    }
  } else {
    jobId = await createIngestionJob("bulk", records.length, jurisdiction || undefined);
  }

  // Process in batches
  const remaining = records.slice(startFrom);
  let totalProcessed = startFrom;
  let totalEmbedded = 0;
  let totalFailed = 0;
  let totalChunks = 0;
  let totalCitations = 0;

  for (let i = 0; i < remaining.length; i += batchSize) {
    const batch = remaining.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(remaining.length / batchSize);

    console.log(`Batch ${batchNum}/${totalBatches} (${batch.length} records)...`);

    const result = await ingestJudgments(batch, jobId, (progress) => {
      if (progress.phase === "embed_doc") {
        process.stdout.write(`  Embedding documents...`);
      } else if (progress.phase === "embed_chunk") {
        process.stdout.write(` done. Embedding chunks...`);
      } else if (progress.phase === "done") {
        process.stdout.write(` done.\n`);
      }
    });

    totalProcessed += result.processed;
    totalEmbedded += result.embedded;
    totalFailed += result.failed;
    totalChunks += result.chunksCreated;
    totalCitations += result.citationsFound;

    if (result.errors.length > 0) {
      for (const err of result.errors) {
        console.error(`  ❌ ${err.citation}: ${err.error}`);
      }
    }

    console.log(
      `  ✅ Processed: ${result.processed}, Embedded: ${result.embedded}, ` +
      `Chunks: ${result.chunksCreated}, Citations: ${result.citationsFound}, Failed: ${result.failed}`
    );
  }

  // Final summary
  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ Ingestion complete!`);
  console.log(`   Total processed: ${totalProcessed}`);
  console.log(`   Total embedded:  ${totalEmbedded}`);
  console.log(`   Total chunks:    ${totalChunks}`);
  console.log(`   Total citations: ${totalCitations}`);
  console.log(`   Total failed:    ${totalFailed}`);
  console.log(`   Job ID:          ${jobId}`);
  console.log(`${"=".repeat(60)}\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
