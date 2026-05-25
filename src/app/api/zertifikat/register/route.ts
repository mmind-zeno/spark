import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { certificates } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import {
  sanitizeProgress,
  validateProgressForCertificate,
  computeCompletionHash,
  countCompletedModules,
  recalculateXP,
  CERT_ID_REGEX,
} from "@/lib/progress-validation";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCertificateId(): string {
  const part = () => {
    let s = "";
    const bytes = crypto.getRandomValues(new Uint8Array(4));
    for (let i = 0; i < 4; i++) s += CHARSET[bytes[i] % CHARSET.length];
    return s;
  };
  return `SPARK-${part()}-${part()}`;
}

const moduleProgressSchema = z.object({
  started: z.boolean(),
  slidesRead: z.array(z.number().int().min(0).max(20)),
  completed: z.boolean(),
  quizScore: z.number().int().min(0).max(5).nullable(),
  quizPassed: z.boolean(),
  quizRetried: z.boolean(),
  badgeEarned: z.boolean(),
});

const progressSchema = z.object({
  totalXP: z.number().int().min(0).max(5000),
  modules: z.record(z.string(), moduleProgressSchema),
  badges: z.array(z.string()),
  allModulesBonus: z.boolean(),
  certificateDownloads: z.number().int().min(0).optional(),
  lastCertId: z.string().nullable().optional(),
  npsSubmitted: z.array(z.string()).optional(),
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  progress: progressSchema,
  existingCertId: z.string().optional(),
});

async function incrementDownloadCounter(): Promise<void> {
  await db.execute(sql`
    INSERT INTO certificate_downloads (id, count, updated_at)
    VALUES (1, 1, NOW())
    ON CONFLICT (id) DO UPDATE
    SET count = certificate_downloads.count + 1, updated_at = NOW()
  `);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limited = rateLimit(`cert-register:${ip}`, 10, 60_000);
  if (!limited.ok) return rateLimitResponse(limited.retryAfter);

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    const { name, progress: rawProgress, existingCertId } = parsed.data;
    const progress = sanitizeProgress(rawProgress);
    progress.totalXP = recalculateXP(progress);

    const validation = validateProgressForCertificate(progress);
    if (!validation.ok) {
      return NextResponse.json({ ok: false, error: validation.error }, { status: 403 });
    }

    const completionHash = computeCompletionHash(progress);
    const modulesCompleted = countCompletedModules(progress);
    const totalXp = progress.totalXP;

    // Re-use existing cert from client or DB hash match
    if (existingCertId && CERT_ID_REGEX.test(existingCertId)) {
      const existing = await db
        .select()
        .from(certificates)
        .where(eq(certificates.id, existingCertId))
        .limit(1);
      if (existing[0]) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://spark.mmind.space";
        return NextResponse.json({
          ok: true,
          id: existing[0].id,
          verifyUrl: `${baseUrl}/verify/${existing[0].id}`,
          reused: true,
        });
      }
    }

    const hashMatch = await db
      .select()
      .from(certificates)
      .where(eq(certificates.completionHash, completionHash))
      .limit(1);

    if (hashMatch[0]) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://spark.mmind.space";
      return NextResponse.json({
        ok: true,
        id: hashMatch[0].id,
        verifyUrl: `${baseUrl}/verify/${hashMatch[0].id}`,
        reused: true,
      });
    }

    const id = generateCertificateId();
    await db.insert(certificates).values({
      id,
      name,
      totalXp,
      modulesCompleted,
      completionHash,
      downloadCounted: 1,
    });

    await incrementDownloadCounter();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://spark.mmind.space";
    return NextResponse.json({ ok: true, id, verifyUrl: `${baseUrl}/verify/${id}`, reused: false });
  } catch (err) {
    console.error("Certificate register error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id")?.toUpperCase().trim();
    if (!id || !CERT_ID_REGEX.test(id)) {
      return NextResponse.json({ ok: false, error: "Invalid certificate ID format" }, { status: 400 });
    }

    const rows = await db.select().from(certificates).where(eq(certificates.id, id)).limit(1);
    const cert = rows[0];
    if (!cert) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      certificate: {
        id: cert.id,
        name: cert.name,
        totalXp: cert.totalXp,
        modulesCompleted: cert.modulesCompleted,
        issuedAt: cert.issuedAt,
      },
    });
  } catch (err) {
    console.error("Certificate lookup error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
