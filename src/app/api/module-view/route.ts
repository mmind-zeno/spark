import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { moduleViews } from "@/db/schema";
import { z } from "zod";

const schema = z.object({
  moduleId: z.string().min(1).max(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    await db.insert(moduleViews).values({ moduleId: parsed.data.moduleId });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Module view error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
