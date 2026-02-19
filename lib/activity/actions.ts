"use server";

import { sql } from "@/lib/db";

export type EntityType = "brief" | "judgment" | "research" | "note" | "document";
export type ActionType = "created" | "updated" | "deleted" | "finalized" | "viewed";

export async function logActivity(
  userId: string,
  action: ActionType,
  entityType: EntityType,
  entityId?: string,
  entityTitle?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    await sql(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, entity_title, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userId,
        action,
        entityType,
        entityId || null,
        entityTitle || null,
        JSON.stringify(metadata || {}),
      ]
    );
  } catch (err) {
    // Non-critical — don't break the main operation
    console.error("Failed to log activity:", err);
  }
}

export interface ActivityEntry {
  id: string;
  action: ActionType;
  entityType: EntityType;
  entityId: string | null;
  entityTitle: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export async function getRecentActivity(
  userId: string,
  limit: number = 20
): Promise<ActivityEntry[]> {
  const rows = await sql(
    `SELECT * FROM activity_log WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2`,
    [userId, limit]
  );

  return rows.map((row: any) => ({
    id: row.id,
    action: row.action as ActionType,
    entityType: row.entity_type as EntityType,
    entityId: row.entity_id,
    entityTitle: row.entity_title,
    metadata: typeof row.metadata === "string" ? JSON.parse(row.metadata) : (row.metadata || {}),
    createdAt: new Date(row.created_at).toISOString(),
  }));
}
