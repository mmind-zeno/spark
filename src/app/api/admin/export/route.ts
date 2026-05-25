import { NextResponse } from "next/server";
import { db } from "@/db";
import { npsResponses, moduleViews, certificateDownloads, certificates } from "@/db/schema";
import { sql } from "drizzle-orm";
import { getAdminSecretFromRequest, verifyAdminSecret } from "@/lib/admin-auth";

function csvEscape(value: string | number | null | undefined): string {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(req: Request) {
  if (!verifyAdminSecret(getAdminSecretFromRequest(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [downloadRows, npsRows, viewRows, certCount] = await Promise.all([
      db.execute<{ count: number }>(sql`SELECT count FROM certificate_downloads WHERE id = 1 LIMIT 1`),
      db.select().from(npsResponses).orderBy(npsResponses.createdAt),
      db.select().from(moduleViews).orderBy(moduleViews.createdAt),
      db.execute<{ count: number }>(sql`SELECT count(*)::int as count FROM certificates`),
    ]);

    const lines: string[] = [];
    lines.push("section,key,value");
    lines.push(`kpi,downloads,${downloadRows[0]?.count ?? 0}`);
    lines.push(`kpi,certificatesIssued,${certCount[0]?.count ?? 0}`);
    lines.push(`kpi,npsResponses,${npsRows.length}`);
    lines.push(`kpi,moduleViews,${viewRows.length}`);
    lines.push("");
    lines.push("nps_moduleId,score,comment,createdAt");
    for (const r of npsRows) {
      lines.push(
        [csvEscape(r.moduleId), r.score, csvEscape(r.comment), csvEscape(r.createdAt?.toISOString())].join(",")
      );
    }
    lines.push("");
    lines.push("view_moduleId,createdAt");
    for (const r of viewRows) {
      lines.push([csvEscape(r.moduleId), csvEscape(r.createdAt?.toISOString())].join(","));
    }

    const csv = lines.join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="spark-kpi-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    console.error("Admin export error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
