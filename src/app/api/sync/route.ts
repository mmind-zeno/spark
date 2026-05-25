import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { progressSnapshots } from "@/db/schema";
import { eq, lt } from "drizzle-orm";
import { z } from "zod";
import { sanitizeProgress, recalculateXP } from "@/lib/progress-validation";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const MAX_PAYLOAD_BYTES = 50_000;

function generateSyncCode(): string {
  let code = "";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  for (let i = 0; i < 6; i++) code += CHARSET[bytes[i] % CHARSET.length];
  return code;
}

const progressSchema = z.object({
  totalXP: z.number(),
  modules: z.record(z.string(), z.unknown()),
  badges: z.array(z.string()),
  allModulesBonus: z.boolean(),
}).passthrough();

const uploadSchema = z.object({
  progress: progressSchema,
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limited = rateLimit(`sync-upload:${ip}`, 5, 60_000);
  if (!limited.ok) return rateLimitResponse(limited.retryAfter);

  try {
    const rawText = await req.text();
    if (rawText.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
    }

    const body = JSON.parse(rawText);
    const parsed = uploadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid progress data" }, { status: 400 });
    }

    const sanitized = sanitizeProgress(parsed.data.progress as Parameters<typeof sanitizeProgress>[0]);
    sanitized.totalXP = recalculateXP(sanitized);

    await db.delete(progressSnapshots).where(lt(progressSnapshots.expiresAt, new Date()));

    const syncCode = generateSyncCode();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.insert(progressSnapshots).values({
      syncCode,
      data: JSON.stringify(sanitized),
      expiresAt,
    });

    return NextResponse.json({ ok: true, syncCode, expiresAt: expiresAt.toISOString() });
  } catch (err) {
    console.error("Sync upload error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const limited = rateLimit(`sync-get:${ip}`, 20, 60_000);
  if (!limited.ok) return rateLimitResponse(limited.retryAfter);

  try {
    const code = req.nextUrl.searchParams.get("code")?.toUpperCase().trim();
    if (!code || code.length !== 6 || !/^[A-Z2-9]{6}$/.test(code)) {
      return NextResponse.json({ ok: false, error: "Invalid sync code" }, { status: 400 });
    }

    const rows = await db
      .select()
      .from(progressSnapshots)
      .where(eq(progressSnapshots.syncCode, code))
      .limit(1);

    const row = rows[0];
    if (!row) {
      return NextResponse.json({ ok: false, error: "Code not found or expired" }, { status: 404 });
    }
    if (row.expiresAt < new Date()) {
      await db.delete(progressSnapshots).where(eq(progressSnapshots.syncCode, code));
      return NextResponse.json({ ok: false, error: "Code expired" }, { status: 410 });
    }

    let progress;
    try {
      progress = JSON.parse(row.data);
    } catch {
      return NextResponse.json({ ok: false, error: "Corrupted sync data" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      progress,
      expiresAt: row.expiresAt.toISOString(),
    });
  } catch (err) {
    console.error("Sync download error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
