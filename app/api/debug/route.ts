import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY;
  const dbUrl = process.env.DATABASE_URL;

  return NextResponse.json({
    anthropic_key_exists: !!key,
    anthropic_key_length: key?.length ?? 0,
    anthropic_key_prefix: key?.substring(0, 10) ?? "NOT SET",
    database_url_exists: !!dbUrl,
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV ?? "not on vercel",
  });
}
