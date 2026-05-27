"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MODULES, TOTAL_MAX_XP, BADGES } from "@/data/modules";
import { getProgress, getModuleStatus, getCompletedModulesCount, canAccessCertificate, resetProgress, PROGRESS_EVENT, type SparkProgress } from "@/lib/progress";
import { SyncPanel } from "@/components/SyncPanel";

export default function Dashboard() {
  const [progress, setProgress] = useState<SparkProgress>(() => getProgress());

  useEffect(() => {
    const refresh = () => setProgress(getProgress());
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    window.addEventListener(PROGRESS_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
      window.removeEventListener(PROGRESS_EVENT, refresh);
    };
  }, []);

  const totalXP = progress.totalXP;
  const completedCount = getCompletedModulesCount();
  const xpPercent = Math.min(100, Math.round((totalXP / TOTAL_MAX_XP) * 100));
  const canCertificate = canAccessCertificate();

  const handleReset = () => {
    if (!window.confirm("Fortschritt wirklich zurücksetzen? Alle XP, Badges und Quiz-Ergebnisse gehen verloren.")) return;
    resetProgress();
    setProgress(getProgress());
  };

  return (
    <div className="min-h-dvh bg-[#FAFAFA]">
      {/* Hero Header — full width */}
      <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
        <img
          src="/spark-header.jpg"
          alt="SPARK KI-Trainingsplattform"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-between px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/spark-logo.png" alt="SPARK" className="w-8 h-8 rounded-xl" />
              <span className="font-bold text-xl text-white tracking-tight">SPARK</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl px-3 py-1.5" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
              <span className="text-white text-sm font-semibold">✨</span>
              <span className="font-bold text-white">{totalXP}</span>
              <span className="text-white/70 text-sm">XP</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight mb-1">Dein KI-Training mit Zertifikat</h1>
            <p className="text-white/75 text-sm">5 Module · Quizzes · Badges · Zertifikat</p>
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 pb-24 pt-6">

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
              const status = getModuleStatus(m.id);
              return (
                <div
                  key={m.id}
                  className="flex-1 h-2 rounded-full transition-all duration-500"
                  style={{
                    background:
                      status === "completed"
                        ? m.colorHex
                        : status === "in-progress" || status === "quiz-pending"
                        ? `${m.colorHex}66`
                        : "#E5E7EB",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Badges */}
        {progress.badges.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
            <div className="text-sm font-semibold text-gray-500 mb-3">Gesammelte Badges</div>
            <div className="flex flex-wrap gap-2">
              {progress.badges.map((badgeId) => {
                const badge = BADGES.find((b) => b.id === badgeId);
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
            const status = getModuleStatus(m.id);
            const slidesDone = progress.modules[m.id]?.slidesRead.length ?? 0;
            const moduleHref =
              status === "quiz-pending"
                ? `/modul/${m.id}/quiz`
                : status === "completed"
                ? `/modul/${m.id}`
                : `/modul/${m.id}`;
            return (
              <Link
                key={m.id}
                href={moduleHref}
                className="flex bg-white rounded-2xl shadow-sm border border-gray-100 p-4 items-center gap-4 hover:shadow-md transition-shadow active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
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
                        <div className="text-xs text-gray-400 mt-0.5">von {m.author}</div>
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
                    {status === "quiz-pending" && (
                      <div className="text-xs text-amber-600 mt-1 font-medium">Quiz ausstehend →</div>
                    )}
                  </div>
              </Link>
            );
          })}
        </div>

        <SyncPanel onImported={() => setProgress(getProgress())} />

        {/* Certificate CTA */}
        {canCertificate ? (
          <Link href="/zertifikat">
            <div className="rounded-2xl p-5 flex items-center gap-4 transition-all bg-indigo-500 shadow-md cursor-pointer hover:bg-indigo-600 active:scale-[0.99]">
              <span className="text-3xl">🎓</span>
              <div>
                <div className="font-bold text-lg text-white">Zertifikat herunterladen</div>
                <div className="text-sm text-indigo-100">
                  Alle 5 Module abgeschlossen — jetzt Zertifikat holen!
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div
            className="rounded-2xl p-5 flex items-center gap-4 bg-gray-100 opacity-60 cursor-not-allowed"
            aria-disabled="true"
          >
            <span className="text-3xl">🎓</span>
            <div>
              <div className="font-bold text-lg text-gray-500">Zertifikat herunterladen</div>
              <div className="text-sm text-gray-400">
                Noch {5 - completedCount} Module bis zum Zertifikat
              </div>
            </div>
          </div>
        )}

        {progress.totalXP > 0 && (
          <button
            onClick={handleReset}
            className="mt-6 w-full py-2 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Fortschritt zurücksetzen
          </button>
        )}

        <div className="mt-8 text-center text-xs text-gray-400 space-y-1">
          <div>Powered by MMIND GmbH · mmind.ai</div>
          <div className="flex items-center justify-center gap-3">
            <Link href="/datenschutz" className="hover:text-gray-600 underline underline-offset-2">
              Datenschutz
            </Link>
            <span>·</span>
            <Link href="/impressum" className="hover:text-gray-600 underline underline-offset-2">
              Impressum
            </Link>
            <span>·</span>
            <a href="mailto:info@mmind.ai" className="hover:text-gray-600">
              Kontakt
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({
  status,
  color,
}: {
  status: "not-started" | "in-progress" | "quiz-pending" | "completed";
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
  if (status === "quiz-pending") {
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 shrink-0">
        Quiz
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
