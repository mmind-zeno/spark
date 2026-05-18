"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { MODULES } from "@/data/modules";
import { markSlideRead, markModuleComplete, getProgress } from "@/lib/progress";
import { MarkdownContent } from "@/components/MarkdownContent";

type XPToast = { id: number; xp: number };

export default function SlideViewer() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const modul = MODULES.find((m) => m.id === id);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animKey, setAnimKey] = useState(0);
  const [toasts, setToasts] = useState<XPToast[]>([]);
  const toastCounter = useRef(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (!modul) return;
    const p = getProgress();
    const readSlides = p.modules[modul.id]?.slidesRead ?? [];
    if (readSlides.length > 0) {
      const lastRead = Math.max(...readSlides);
      const next = Math.min(lastRead + 1, modul.slides.length - 1);
      setCurrentSlide(next);
    }
  }, [modul]);

  useEffect(() => {
    if (!modul) return;
    const { xpGained } = markSlideRead(modul.id, currentSlide);
    if (xpGained > 0) {
      const id = ++toastCounter.current;
      setToasts((prev) => [...prev, { id, xp: xpGained }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 1600);
    }
  }, [currentSlide, modul]);

  const goTo = useCallback(
    (index: number) => {
      if (!modul) return;
      if (index < 0 || index >= modul.slides.length) return;
      setDirection(index > currentSlide ? "forward" : "back");
      setAnimKey((k) => k + 1);
      setCurrentSlide(index);
    },
    [currentSlide, modul]
  );

  const handleFinish = useCallback(() => {
    if (!modul) return;
    markModuleComplete(modul.id);
    router.push(`/modul/${modul.id}/abschluss`);
  }, [modul, router]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(currentSlide + 1);
      else goTo(currentSlide - 1);
    }
    touchStart.current = null;
  };

  if (!modul) {
    return <div className="min-h-dvh flex items-center justify-center text-gray-400">Nicht gefunden.</div>;
  }

  const slide = modul.slides[currentSlide];
  const progress = ((currentSlide + 1) / modul.slides.length) * 100;
  const isLast = currentSlide === modul.slides.length - 1;

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col select-none">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push(`/modul/${modul.id}`)}
            className="text-gray-400 hover:text-gray-600 p-1 -ml-1"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>{modul.title}</span>
              <span>{currentSlide + 1} / {modul.slides.length}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-400"
                style={{ width: `${progress}%`, background: modul.colorHex }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slide */}
      <div
        className="flex-1 max-w-2xl mx-auto w-full px-4 pt-5 pb-32"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={animKey}
          className={direction === "forward" ? "slide-enter-right" : "slide-enter-left"}
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[60vh]">
            {/* Slide header */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: modul.colorHex }}
              >
                {currentSlide + 1}
              </div>
              <h2 className="font-bold text-gray-900 text-lg leading-tight">{slide.title}</h2>
            </div>
            <MarkdownContent content={slide.content} />
          </div>
        </div>
      </div>

      {/* XP Toasts */}
      <div className="fixed top-20 right-4 pointer-events-none z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="xp-toast bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl text-sm shadow-lg"
          >
            +{t.xp} XP ✨
          </div>
        ))}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex gap-3">
          <button
            onClick={() => goTo(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="w-12 h-12 rounded-xl bg-gray-100 text-gray-500 font-bold text-lg disabled:opacity-30 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ‹
          </button>
          {isLast ? (
            <button
              onClick={handleFinish}
              className="flex-1 h-12 rounded-xl font-bold text-white text-base transition-all active:scale-[0.98] hover:opacity-90"
              style={{ background: modul.colorHex }}
            >
              Modul abschliessen 🎉
            </button>
          ) : (
            <button
              onClick={() => goTo(currentSlide + 1)}
              className="flex-1 h-12 rounded-xl font-bold text-white text-base transition-all active:scale-[0.98] hover:opacity-90"
              style={{ background: modul.colorHex }}
            >
              Weiter →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
