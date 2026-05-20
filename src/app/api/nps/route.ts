import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { npsResponses } from "@/db/schema";
import { z } from "zod";

const schema = z.object({
  moduleId: z.string().min(1).max(10),
  score: z.number().int().min(0).max(10),
  comment: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const { moduleId, score, comment } = parsed.data;
    await db.insert(npsResponses).values({ moduleId, score, comment: comment ?? null });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("NPS error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
