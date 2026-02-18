"use server";

import { sql } from "@/lib/db";
import type { ResearchConversationDB, ResearchMessageDB, ResearchMode } from "./types";

function parseJson(val: unknown): any {
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return []; }
  }
  return val ?? [];
}

// ---------------------------------------------------------------------------
// Create a new conversation
// ---------------------------------------------------------------------------
export async function createConversation(data: {
  title?: string;
  caseId?: string;
  mode?: ResearchMode;
}): Promise<string> {
  const rows = await sql(
    `INSERT INTO research_conversations (title, case_id, mode)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [data.title || "New Research", data.caseId || null, data.mode || "general"]
  );
  return rows[0].id;
}

// ---------------------------------------------------------------------------
// Get a single conversation
// ---------------------------------------------------------------------------
export async function getConversation(
  id: string
): Promise<ResearchConversationDB | null> {
  const rows = await sql(
    `SELECT rc.*,
       (SELECT count(*) FROM research_messages WHERE conversation_id = rc.id) AS message_count,
       (SELECT content FROM research_messages WHERE conversation_id = rc.id ORDER BY created_at LIMIT 1) AS first_message
     FROM research_conversations rc
     WHERE rc.id = $1`,
    [id]
  );

  if (rows.length === 0) return null;

  const r = rows[0];
  return {
    id: r.id,
    title: r.title,
    caseId: r.case_id,
    legalAreas: parseJson(r.legal_areas),
    status: r.status,
    pinned: r.pinned,
    mode: r.mode as ResearchMode,
    messageCount: Number(r.message_count),
    lastMessagePreview: r.first_message || null,
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
  };
}

// ---------------------------------------------------------------------------
// List conversations
// ---------------------------------------------------------------------------
export async function listConversations(options?: {
  search?: string;
  limit?: number;
}): Promise<ResearchConversationDB[]> {
  const limit = options?.limit ?? 50;

  let query: string;
  let params: any[];

  if (options?.search?.trim()) {
    query = `SELECT rc.*,
       (SELECT count(*) FROM research_messages WHERE conversation_id = rc.id) AS message_count,
       (SELECT content FROM research_messages WHERE conversation_id = rc.id AND role = 'user' ORDER BY created_at LIMIT 1) AS first_message
     FROM research_conversations rc
     WHERE rc.title ILIKE $1 OR EXISTS (
       SELECT 1 FROM research_messages rm WHERE rm.conversation_id = rc.id AND rm.content ILIKE $1
     )
     ORDER BY rc.pinned DESC, rc.updated_at DESC
     LIMIT $2`;
    params = [`%${options.search.trim()}%`, limit];
  } else {
    query = `SELECT rc.*,
       (SELECT count(*) FROM research_messages WHERE conversation_id = rc.id) AS message_count,
       (SELECT content FROM research_messages WHERE conversation_id = rc.id AND role = 'user' ORDER BY created_at LIMIT 1) AS first_message
     FROM research_conversations rc
     ORDER BY rc.pinned DESC, rc.updated_at DESC
     LIMIT $1`;
    params = [limit];
  }

  const rows = await sql(query, params);

  return rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    caseId: r.case_id,
    legalAreas: parseJson(r.legal_areas),
    status: r.status,
    pinned: r.pinned,
    mode: r.mode as ResearchMode,
    messageCount: Number(r.message_count),
    lastMessagePreview: r.first_message || null,
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
  }));
}

// ---------------------------------------------------------------------------
// Delete a conversation
// ---------------------------------------------------------------------------
export async function deleteConversation(id: string): Promise<void> {
  await sql(`DELETE FROM research_conversations WHERE id = $1`, [id]);
}

// ---------------------------------------------------------------------------
// Toggle pin
// ---------------------------------------------------------------------------
export async function togglePin(id: string): Promise<boolean> {
  const rows = await sql(
    `UPDATE research_conversations SET pinned = NOT pinned, updated_at = now() WHERE id = $1 RETURNING pinned`,
    [id]
  );
  return rows[0]?.pinned ?? false;
}

// ---------------------------------------------------------------------------
// Update title
// ---------------------------------------------------------------------------
export async function updateTitle(id: string, title: string): Promise<void> {
  await sql(
    `UPDATE research_conversations SET title = $1, updated_at = now() WHERE id = $2`,
    [title, id]
  );
}

// ---------------------------------------------------------------------------
// Save a message
// ---------------------------------------------------------------------------
export async function saveMessage(data: {
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  structuredResponse?: any;
  citations?: any[];
  ragContext?: any;
}): Promise<string> {
  const rows = await sql(
    `INSERT INTO research_messages (conversation_id, role, content, structured_response, citations, rag_context)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [
      data.conversationId,
      data.role,
      data.content,
      data.structuredResponse ? JSON.stringify(data.structuredResponse) : null,
      JSON.stringify(data.citations || []),
      data.ragContext ? JSON.stringify(data.ragContext) : null,
    ]
  );

  // Update conversation updated_at
  await sql(
    `UPDATE research_conversations SET updated_at = now() WHERE id = $1`,
    [data.conversationId]
  );

  return rows[0].id;
}

// ---------------------------------------------------------------------------
// Get messages for a conversation
// ---------------------------------------------------------------------------
export async function getMessages(
  conversationId: string
): Promise<ResearchMessageDB[]> {
  const rows = await sql(
    `SELECT * FROM research_messages WHERE conversation_id = $1 ORDER BY created_at`,
    [conversationId]
  );

  return rows.map((r: any) => ({
    id: r.id,
    conversationId: r.conversation_id,
    role: r.role as "user" | "assistant",
    content: r.content,
    structuredResponse: parseJson(r.structured_response) || null,
    citations: parseJson(r.citations),
    ragContext: r.rag_context ? parseJson(r.rag_context) : null,
    createdAt: new Date(r.created_at).toISOString(),
  }));
}

// ---------------------------------------------------------------------------
// Update conversation metadata
// ---------------------------------------------------------------------------
export async function updateConversationMeta(
  id: string,
  meta: { legalAreas?: string[]; caseId?: string }
): Promise<void> {
  if (meta.legalAreas !== undefined) {
    await sql(
      `UPDATE research_conversations SET legal_areas = $1, updated_at = now() WHERE id = $2`,
      [JSON.stringify(meta.legalAreas), id]
    );
  }
  if (meta.caseId !== undefined) {
    await sql(
      `UPDATE research_conversations SET case_id = $1, updated_at = now() WHERE id = $2`,
      [meta.caseId, id]
    );
  }
}
