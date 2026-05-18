"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MODULES, TOTAL_MAX_XP } from "@/data/modules";
import { getProgress, getModuleStatus, getCompletedModulesCount, type SparkProgress } from "@/lib/progress";

export default function Dashboard() {
  const [progress, setProgress] = useState<SparkProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const totalXP = progress?.totalXP ?? 0;
  const completedCount = progress ? getCompletedModulesCount() : 0;
  const xpPercent = Math.min(100, Math.round((totalXP / TOTAL_MAX_XP) * 100));
  const canCertificate = progress?.badges.includes("ai-graduate") ?? false;

  return (
    <div className="min-h-dvh bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-xl text-gray-900 tracking-tight">SPARK</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 rounded-xl px-3 py-1.5">
            <span className="text-indigo-500 text-sm font-semibold">✨</span>
            <span className="font-bold text-indigo-600">{totalXP}</span>
            <span className="text-indigo-400 text-sm">XP</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24 pt-6">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            KI-Training für Erasmus
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            5 Module · Quizzes · Badges · Zertifikat — in deinem eigenen Tempo.
          </p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-gray-500 mb-0.5">Dein Fortschritt</div>
              <div className="font-bold text-gray-900 text-lg">
                {completedCount} von {MODULES.length} Modulen
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{xpPercent}%</div>
              <div className="text-sm text-gray-400">{totalXP} / {TOTAL_MAX_XP} XP</div>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <div className="flex gap-2 mt-4">
            {MODULES.map((m) => {
              const status = progress ? getModuleStatus(m.id) : "not-started";
              return (
                <div
                  key={m.id}
                  className="flex-1 h-2 rounded-full transition-all duration-500"
                  style={{
                    background:
                      status === "completed"
                        ? m.colorHex
                        : status === "in-progress"
                        ? `${m.colorHex}66`
                        : "#E5E7EB",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Badges */}
        {progress && progress.badges.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
            <div className="text-sm font-semibold text-gray-500 mb-3">Gesammelte Badges</div>
            <div className="flex flex-wrap gap-2">
              {progress.badges.map((badgeId) => {
                const allBadges = [
                  ...MODULES.map((m) => ({ id: m.badge, emoji: m.badgeEmoji, name: m.badgeName })),
                  { id: "ai-graduate", emoji: "🎓", name: "AI Graduate" },
                ];
                const badge = allBadges.find((b) => b.id === badgeId);
                if (!badge) return null;
                return (
                  <div key={badgeId} className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-1.5">
                    <span className="text-lg">{badge.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Module Cards */}
        <div className="space-y-3 mb-6">
          <div className="text-sm font-semibold text-gray-500 mb-2">Module</div>
          {MODULES.map((m) => {
            const status = progress ? getModuleStatus(m.id) : "not-started";
            const slidesDone = progress?.modules[m.id]?.slidesRead.length ?? 0;
            return (
              <Link key={m.id} href={`/modul/${m.id}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99]">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${m.colorHex}18` }}
                  >
                    {m.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs text-gray-400 font-medium">Modul {m.number}</div>
                        <div className="font-semibold text-gray-900 leading-tight">{m.title}</div>
                      </div>
                      <StatusBadge status={status} color={m.colorHex} />
                    </div>
                    {status === "in-progress" && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(100, Math.round((slidesDone / m.slides.length) * 100))}%`,
                              background: m.colorHex,
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{slidesDone} / {m.slides.length} Slides</div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Certificate CTA */}
        <Link href="/zertifikat">
          <div
            className={`rounded-2xl p-5 flex items-center gap-4 transition-all ${
              canCertificate
                ? "bg-indigo-500 shadow-md cursor-pointer hover:bg-indigo-600 active:scale-[0.99]"
                : "bg-gray-100 cursor-not-allowed opacity-60"
            }`}
          >
            <span className="text-3xl">🎓</span>
            <div>
              <div className={`font-bold text-lg ${canCertificate ? "text-white" : "text-gray-500"}`}>
                Zertifikat herunterladen
              </div>
              <div className={`text-sm ${canCertificate ? "text-indigo-100" : "text-gray-400"}`}>
                {canCertificate
                  ? "Alle 5 Module abgeschlossen — jetzt Zertifikat holen!"
                  : `Noch ${5 - completedCount} Module bis zum Zertifikat`}
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-8 text-center text-xs text-gray-400">
          Powered by MMIND GmbH · mmind.ai
        </div>
      </main>
    </div>
  );
}

function StatusBadge({
  status,
  color,
}: {
  status: "not-started" | "in-progress" | "completed";
  color: string;
}) {
  if (status === "completed") {
    return (
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full text-white shrink-0"
        style={{ background: color }}
      >
        ✓ Fertig
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 shrink-0">
        Weiter
      </span>
    );
  }
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 shrink-0">
      Start
    </span>
  );
}
