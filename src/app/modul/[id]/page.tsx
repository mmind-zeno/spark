"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MODULES } from "@/data/modules";
import { getProgress, getModuleStatus, type SparkProgress } from "@/lib/progress";

export default function ModulIntro() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const modul = MODULES.find((m) => m.id === id);

  const [progress, setProgress] = useState<SparkProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!modul) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-gray-400">Modul nicht gefunden.</div>
      </div>
    );
  }

  const status = progress ? getModuleStatus(modul.id) : "not-started";
  const isCompleted = status === "completed";
  const isInProgress = status === "in-progress";

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col">
      {/* Cover */}
      <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
        <img
          src={`/header-${modul.id}.jpg`}
          alt={modul.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)" }} />
        <Link href="/" className="absolute top-4 left-4 flex items-center gap-1 text-white/80 hover:text-white text-sm z-10">
          ← Dashboard
        </Link>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-6 text-white">
          <div className="text-4xl mb-2">{modul.emoji}</div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">
            Modul {modul.number}
          </div>
          <h1 className="text-2xl font-bold text-center leading-tight mb-1">{modul.title}</h1>
          <p className="text-white/80 text-center text-sm">{modul.subtitle}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="max-w-2xl mx-auto w-full px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <span>🕐</span>
            <span>{modul.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>📄</span>
            <span>{modul.slides.length} Slides</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{modul.badgeEmoji}</span>
            <span>{modul.badgeName}</span>
          </div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="max-w-2xl mx-auto w-full px-4 mt-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-3">Lernziele</h2>
          <div className="space-y-2">
            {modul.learningGoals.map((goal, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5"
                  style={{ background: modul.colorHex }}
                >
                  ✓
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* XP Info */}
      <div className="max-w-2xl mx-auto w-full px-4 mt-4">
        <div className="bg-indigo-50 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <div>
            <div className="font-semibold text-indigo-800 text-sm">Bis zu 155 XP in diesem Modul</div>
            <div className="text-indigo-500 text-xs">55 XP für Slides · 100–150 XP für Quiz</div>
          </div>
        </div>
      </div>

      {/* Status info */}
      {isCompleted && (
        <div className="max-w-2xl mx-auto w-full px-4 mt-4">
          <div
            className="rounded-2xl p-4 flex items-center gap-3 text-white"
            style={{ background: modul.colorHex }}
          >
            <span className="text-2xl">{modul.badgeEmoji}</span>
            <div>
              <div className="font-bold text-sm">Modul abgeschlossen!</div>
              <div className="text-white/80 text-xs">Badge «{modul.badgeName}» verdient</div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="max-w-2xl mx-auto w-full px-4 mt-6 pb-8">
        <button
          onClick={() => router.push(`/modul/${modul.id}/slides`)}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all active:scale-[0.98] hover:opacity-90"
          style={{ background: modul.colorHex }}
        >
          {isCompleted ? "Nochmals ansehen" : isInProgress ? "Weitermachen" : "Starten"}
        </button>
        {isCompleted && (
          <button
            onClick={() => router.push(`/modul/${modul.id}/quiz`)}
            className="w-full mt-3 py-3 rounded-2xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all text-base"
          >
            Quiz nochmals machen
          </button>
        )}
      </div>
    </div>
  );
}
