"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MODULES, XP_REWARDS } from "@/data/modules";

export default function AbschlussScreen() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const modul = MODULES.find((m) => m.id === id);
  const [showBadge, setShowBadge] = useState(false);
  const confettiDone = useRef(false);

  useEffect(() => {
    if (!modul || confettiDone.current) return;
    confettiDone.current = true;

    setTimeout(() => setShowBadge(true), 400);

    import("canvas-confetti").then((confettiModule) => {
      const confetti = confettiModule.default;
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: [modul.colorHex, "#6366F1", "#F59E0B", "#22C55E"],
      });
    });
  }, [modul]);

  if (!modul) return null;

  const slideXP = XP_REWARDS.SLIDE_READ * modul.slides.length;
  const totalPossible = slideXP + XP_REWARDS.QUIZ_PERFECT;

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 pb-8">
      <div className="max-w-md w-full text-center">
        {/* Badge */}
        <div
          className={`transition-all duration-700 ${showBadge ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
        >
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-4 shadow-lg"
            style={{ background: `${modul.colorHex}18`, border: `3px solid ${modul.colorHex}` }}
          >
            {modul.badgeEmoji}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Modul abgeschlossen!</h1>
        <p className="text-gray-500 mb-6">
          Du hast <strong className="text-gray-800">«{modul.title}»</strong> durchgearbeitet.
        </p>

        {/* XP Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6 text-left">
          <div className="text-sm font-semibold text-gray-500 mb-3">XP verdient</div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">📄 {modul.slides.length} Slides gelesen</span>
            <span className="font-bold text-indigo-600">+{slideXP} XP</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">🏁 Modul abgeschlossen</span>
            <span className="font-bold text-indigo-600">+{XP_REWARDS.MODULE_COMPLETE} XP</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-gray-700">🎯 Quiz noch ausstehend</span>
            <span className="font-semibold text-gray-400">bis +{XP_REWARDS.QUIZ_PERFECT} XP</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-700">Total möglich</span>
            <span className="font-bold text-lg text-indigo-600">+{totalPossible} XP</span>
          </div>
        </div>

        {/* Badge earned */}
        <div
          className="rounded-2xl p-4 mb-6 flex items-center gap-3 text-white"
          style={{ background: modul.colorHex }}
        >
          <span className="text-2xl">{modul.badgeEmoji}</span>
          <div className="text-left">
            <div className="font-bold text-sm">Badge verfügbar: «{modul.badgeName}»</div>
            <div className="text-white/80 text-xs">Bestehe das Quiz um ihn zu verdienen</div>
          </div>
        </div>

        {/* CTAs */}
        <button
          onClick={() => router.push(`/modul/${modul.id}/quiz`)}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg mb-3 transition-all active:scale-[0.98] hover:opacity-90"
          style={{ background: modul.colorHex }}
        >
          Quiz starten 🎯
        </button>
        <button
          onClick={() => router.push("/")}
          className="w-full py-3 rounded-2xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all text-base"
        >
          Zurück zum Dashboard
        </button>
      </div>
    </div>
  );
}
