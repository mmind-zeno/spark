import { NextResponse } from "next/server";
import { db } from "@/db";
import { certificateDownloads, npsResponses, moduleViews, certificates } from "@/db/schema";
import { sql } from "drizzle-orm";
import { getAdminSecretFromRequest, verifyAdminSecret } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!verifyAdminSecret(getAdminSecretFromRequest(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [downloadRows, npsRows, viewRows, npsByModule, viewsByModule] = await Promise.all([
      db.execute<{ count: number }>(
        sql`SELECT count FROM certificate_downloads WHERE id = 1 LIMIT 1`
      ),
      db.select().from(npsResponses),
      db.select().from(moduleViews),
      db
        .select({
          moduleId: npsResponses.moduleId,
          count: sql<number>`count(*)::int`,
          avgScore: sql<number>`round(avg(${npsResponses.score})::numeric, 1)::float`,
        })
        .from(npsResponses)
        .groupBy(npsResponses.moduleId),
      db
        .select({
          moduleId: moduleViews.moduleId,
          count: sql<number>`count(*)::int`,
        })
        .from(moduleViews)
        .groupBy(moduleViews.moduleId),
    ]);

    const certCount = await db.execute<{ count: number }>(
      sql`SELECT count(*)::int as count FROM certificates`
    );

    const npsScores = npsRows.map((r) => r.score);
    const avgNps =
      npsScores.length > 0
        ? Math.round((npsScores.reduce((a, b) => a + b, 0) / npsScores.length) * 10) / 10
        : null;
    const promoters = npsScores.filter((s) => s >= 9).length;
    const detractors = npsScores.filter((s) => s <= 6).length;
    const npsIndex =
      npsScores.length > 0
        ? Math.round(((promoters - detractors) / npsScores.length) * 100)
        : null;

    return NextResponse.json({
      ok: true,
      downloads: downloadRows[0]?.count ?? 0,
      certificatesIssued: certCount[0]?.count ?? 0,
      totalNpsResponses: npsRows.length,
      totalModuleViews: viewRows.length,
      avgNps,
      npsIndex,
      npsByModule,
      viewsByModule,
      recentNps: npsRows.slice(-10).reverse().map((r) => ({
        moduleId: r.moduleId,
        score: r.score,
        comment: r.comment,
        createdAt: r.createdAt,
      })),
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
