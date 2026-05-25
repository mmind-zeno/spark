import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { certificates } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { CERT_ID_REGEX } from "@/lib/progress-validation";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const schema = z.object({ certId: z.string() });

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limited = rateLimit(`cert-download:${ip}`, 20, 60_000);
  if (!limited.ok) return rateLimitResponse(limited.retryAfter);

  try {
    const body = await req.json().catch(() => ({}));
    const parsed = schema.safeParse(body);
    const certId = parsed.success ? parsed.data.certId.toUpperCase().trim() : null;

    if (!certId || !CERT_ID_REGEX.test(certId)) {
      return NextResponse.json({ ok: false, error: "Invalid certificate ID" }, { status: 400 });
    }

    const rows = await db.select().from(certificates).where(eq(certificates.id, certId)).limit(1);
    if (!rows[0]) {
      return NextResponse.json({ ok: false, error: "Certificate not found" }, { status: 404 });
    }

    // Only count first download per certificate for KPI integrity
    if (rows[0].downloadCounted === 0) {
      await db
        .update(certificates)
        .set({ downloadCounted: 1 })
        .where(eq(certificates.id, certId));

      await db.execute(sql`
        INSERT INTO certificate_downloads (id, count, updated_at)
        VALUES (1, 1, NOW())
        ON CONFLICT (id) DO UPDATE
        SET count = certificate_downloads.count + 1, updated_at = NOW()
      `);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Download counter error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await db.execute<{ count: number }>(
      sql`SELECT count FROM certificate_downloads WHERE id = 1 LIMIT 1`
    );
    const count = rows[0]?.count ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
