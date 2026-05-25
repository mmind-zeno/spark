"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Stats = {
  downloads: number;
  certificatesIssued: number;
  totalNpsResponses: number;
  totalModuleViews: number;
  avgNps: number | null;
  npsIndex: number | null;
  npsByModule: { moduleId: string; count: number; avgScore: number }[];
  viewsByModule: { moduleId: string; count: number }[];
  recentNps: { moduleId: string; score: number; comment: string | null; createdAt: string }[];
};

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadStats = useCallback(async (authSecret?: string) => {
    const s = authSecret ?? secret;
    if (!s) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { "X-Admin-Secret": s },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unauthorized");
      setStats(data);
      sessionStorage.setItem("spark_admin_secret", s);
      if (authSecret) setSecret(authSecret);
    } catch (err) {
      setStats(null);
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setLoading(false);
    }
  }, [secret]);

  useEffect(() => {
    const saved = sessionStorage.getItem("spark_admin_secret");
    if (saved) loadStats(saved);
  }, [loadStats]);

  if (!stats) {
    return (
      <div className="min-h-dvh bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">📊</div>
            <h1 className="text-xl font-bold text-white mb-1">SPARK Admin</h1>
            <p className="text-gray-500 text-sm">Erasmus KPI Dashboard</p>
          </div>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin Secret"
            className="w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-3 text-white text-sm mb-3 focus:outline-none focus:border-indigo-500"
            onKeyDown={(e) => e.key === "Enter" && loadStats()}
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            onClick={() => loadStats()}
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 transition-colors"
          >
            {loading ? "Laden…" : "Anmelden"}
          </button>
          <Link href="/" className="block text-center text-gray-600 text-sm mt-4 hover:text-gray-400">
            ← Zurück
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">SPARK KPI Dashboard</h1>
            <p className="text-gray-500 text-sm">Erasmus Reporting</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => downloadCsv(stats, secret)}
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              CSV Export
            </button>
            <button
              onClick={() => loadStats()}
              disabled={loading}
              className="text-sm text-indigo-400 hover:text-indigo-300 disabled:opacity-40"
            >
              {loading ? "…" : "↻ Aktualisieren"}
            </button>
            <button
              onClick={() => {
                setStats(null);
                sessionStorage.removeItem("spark_admin_secret");
              }}
              className="text-sm text-gray-500 hover:text-gray-300"
            >
              Abmelden
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <KpiCard label="Zertifikat-Downloads" value={stats.downloads} emoji="🎓" />
          <KpiCard label="Zertifikate registriert" value={stats.certificatesIssued} emoji="✅" />
          <KpiCard label="Modul-Aufrufe" value={stats.totalModuleViews} emoji="👁️" />
          <KpiCard label="NPS Antworten" value={stats.totalNpsResponses} emoji="💬" />
        </div>

        {(stats.npsIndex !== null || stats.avgNps !== null) && (
          <div className="bg-gray-900 rounded-2xl p-5 mb-6 border border-gray-800">
            <h2 className="font-semibold text-gray-300 mb-3">NPS Übersicht</h2>
            <div className="flex gap-6">
              {stats.npsIndex !== null && (
                <div>
                  <div className="text-3xl font-bold text-indigo-400">{stats.npsIndex}</div>
                  <div className="text-xs text-gray-500">NPS Index</div>
                </div>
              )}
              {stats.avgNps !== null && (
                <div>
                  <div className="text-3xl font-bold text-white">{stats.avgNps}</div>
                  <div className="text-xs text-gray-500">Ø Score (0–10)</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <ModuleTable title="NPS pro Modul" rows={stats.npsByModule.map((r) => ({
            id: r.moduleId,
            value: `${r.count}× · Ø ${r.avgScore}`,
          }))} />
          <ModuleTable title="Views pro Modul" rows={stats.viewsByModule.map((r) => ({
            id: r.moduleId,
            value: String(r.count),
          }))} />
        </div>

        {stats.recentNps.length > 0 && (
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
            <h2 className="font-semibold text-gray-300 mb-3">Letzte NPS-Kommentare</h2>
            <div className="space-y-3">
              {stats.recentNps.map((r) => (
                <div key={`${r.moduleId}-${r.createdAt}`} className="border-b border-gray-800 pb-3 last:border-0">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-indigo-400">Modul {r.moduleId}</span>
                    <span className="text-gray-500">·</span>
                    <span className="font-bold">{r.score}/10</span>
                  </div>
                  {r.comment && <p className="text-gray-400 text-sm mt-1">{r.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <Link href="/" className="block text-center text-gray-600 text-sm mt-8 hover:text-gray-400">
          ← Zurück zur App
        </Link>
      </div>
    </div>
  );
}

function downloadCsv(stats: Stats, secret: string) {
  fetch("/api/admin/export", { headers: { "X-Admin-Secret": secret } })
    .then(async (res) => {
      if (!res.ok) throw new Error("Export fehlgeschlagen");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `spark-kpi-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(() => alert("CSV-Export fehlgeschlagen"));
}

function KpiCard({ label, value, emoji }: { label: string; value: number; emoji: string }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="text-2xl font-bold">{value.toLocaleString("de-CH")}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function ModuleTable({ title, rows }: { title: string; rows: { id: string; value: string }[] }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-gray-600 text-sm">Noch keine Daten</p>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="flex justify-between text-sm">
              <span className="text-gray-400">Modul {r.id}</span>
              <span className="font-semibold">{r.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
