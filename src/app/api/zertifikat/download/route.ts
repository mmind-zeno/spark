import { NextResponse } from "next/server";
import { db } from "@/db";
import { certificateDownloads } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST() {
  try {
    const existing = await db.select().from(certificateDownloads).limit(1);

    if (existing.length === 0) {
      await db.insert(certificateDownloads).values({ count: 1 });
    } else {
      await db
        .update(certificateDownloads)
        .set({
          count: sql`${certificateDownloads.count} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(certificateDownloads.id, existing[0].id));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Download counter error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await db.select().from(certificateDownloads).limit(1);
    const count = rows[0]?.count ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
