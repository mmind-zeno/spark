import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "spark", timestamp: new Date().toISOString() });
}
