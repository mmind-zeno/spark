import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { moduleViews } from "@/db/schema";
import { z } from "zod";
import { normalizeModuleId } from "@/lib/progress-validation";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const schema = z.object({
  moduleId: z.string().min(1).max(10),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limited = rateLimit(`module-view:${ip}`, 30, 60_000);
  if (!limited.ok) return rateLimitResponse(limited.retryAfter);

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    const moduleId = normalizeModuleId(parsed.data.moduleId);
    if (!moduleId) {
      return NextResponse.json({ ok: false, error: "Invalid module ID" }, { status: 400 });
    }

    await db.insert(moduleViews).values({ moduleId });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Module view error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
