"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, type PanInfo } from "framer-motion";
import { MODULES } from "@/data/modules";
import { loadModuleSlides } from "@/lib/module-slides";
import type { RichSlide } from "@/data/modules-01";
import { markSlideRead, markModuleComplete, getProgress } from "@/lib/progress";
import { normalizeModuleId } from "@/lib/progress-validation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SlideCard } from "@/components/SlideCard";
import { ModuleProgressHeader } from "@/components/ModuleProgressHeader";

type XPToast = { id: number; xp: number };

export default function SlideViewer() {
  const params = useParams();
  const router = useRouter();
  const rawId = params.id as string;
  const id = normalizeModuleId(rawId);
  const modul = id ? MODULES.find((m) => m.id === id) : undefined;
  const [finishError, setFinishError] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const [richSlides, setRichSlides] = useState<RichSlide[] | null>(null);
  const [slidesLoading, setSlidesLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<XPToast[]>([]);
  const toastCounter = useRef(0);

  const slideCount = richSlides ? richSlides.length : (modul?.slides.length ?? 0);

  useEffect(() => {
    if (id && id !== rawId) {
      router.replace(`/modul/${id}/slides`);
    }
  }, [id, rawId, router]);

  useEffect(() => {
    let cancelled = false;
    if (!id) return;
    setSlidesLoading(true);
    loadModuleSlides(id)
      .then((slides) => {
        if (!cancelled) setRichSlides(slides);
      })
      .finally(() => {
        if (!cancelled) setSlidesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!modul || slidesLoading) return;

    const count = richSlides ? richSlides.length : modul.slides.length;
    const p = getProgress();
    const readSlides = p.modules[modul.id]?.slidesRead ?? [];
    let startSlide = 0;
    if (readSlides.length > 0) {
      startSlide = Math.min(Math.max(...readSlides) + 1, count - 1);
    }
    setCurrentSlide(startSlide);
    setReady(true);

    const viewedKey = "spark_viewed_modules";
    try {
      const viewed = JSON.parse(sessionStorage.getItem(viewedKey) ?? "[]") as string[];
      if (!viewed.includes(modul.id)) {
        sessionStorage.setItem(viewedKey, JSON.stringify([...viewed, modul.id]));
        fetch("/api/module-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ moduleId: modul.id }),
        }).catch(() => {});
      }
    } catch {
      // ignore
    }
  }, [modul, slidesLoading, richSlides]);

  useEffect(() => {
    if (!modul || !ready) return;
    const { xpGained } = markSlideRead(modul.id, currentSlide);
    if (xpGained > 0) {
      const toastId = ++toastCounter.current;
      setToasts((prev) => [...prev, { id: toastId, xp: xpGained }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastId));
      }, 1600);
    }
  }, [currentSlide, modul, ready]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= slideCount) return;
      setDirection(index > currentSlide ? "forward" : "back");
      setCurrentSlide(index);
    },
    [currentSlide, slideCount]
  );

  const handleFinish = useCallback(() => {
    if (!modul) return;
    const result = markModuleComplete(modul.id, slideCount);
    if (!result.ok) {
      setFinishError("Bitte lies alle Slides, bevor du das Modul abschliessen kannst.");
      return;
    }
    setFinishError(null);
    router.push(`/modul/${modul.id}/abschluss`);
  }, [modul, router, slideCount]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentSlide < slideCount - 1) goTo(currentSlide + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentSlide - 1);
      } else if (e.key === " " && currentSlide < slideCount - 1) {
        e.preventDefault();
        goTo(currentSlide + 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSlide, slideCount, goTo]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) {
      if (currentSlide < slideCount - 1) goTo(currentSlide + 1);
      else handleFinish();
    } else if (info.offset.x > 80) {
      goTo(currentSlide - 1);
    }
  };

  if (!modul) {
    return <div className="min-h-dvh flex items-center justify-center text-gray-400">Nicht gefunden.</div>;
  }

  if (slidesLoading || !ready) {
    return (
      <div className="min-h-dvh bg-[#FAFAFA] flex flex-col">
        <ModuleProgressHeader
          title={modul.title}
          step={1}
          total={11}
          colorHex={modul.colorHex}
          backHref={`/modul/${modul.id}`}
        />
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Slides werden geladen…</div>
      </div>
    );
  }

  const isLast = currentSlide === slideCount - 1;
  const motionProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { x: direction === "forward" ? 280 : -280, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: direction === "forward" ? -280 : 280, opacity: 0 },
        transition: { type: "spring" as const, stiffness: 320, damping: 32 },
      };

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col">
      <ModuleProgressHeader
        title={modul.title}
        step={currentSlide + 1}
        total={slideCount}
        colorHex={modul.colorHex}
        backHref={`/modul/${modul.id}`}
        backLabel="Zurück zur Modulübersicht"
      />

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pt-5 pb-32 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            {...motionProps}
            drag={reducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={reducedMotion ? undefined : handleDragEnd}
            className="touch-pan-y"
          >
            {richSlides ? (
              <SlideCard
                slide={richSlides[currentSlide]}
                index={currentSlide}
                colorHex={modul.colorHex}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[60vh]">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: modul.colorHex }}
                  >
                    {currentSlide + 1}
                  </div>
                  <h2 className="font-bold text-gray-900 text-lg leading-tight">
                    {modul.slides[currentSlide].title}
                  </h2>
                </div>
                <MarkdownContent content={modul.slides[currentSlide].content} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed top-20 right-4 pointer-events-none z-50 flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="xp-toast bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl text-sm shadow-lg"
          >
            +{t.xp} XP ✨
          </div>
        ))}
      </div>

      {finishError && (
        <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-0 right-0 z-20 px-4">
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-sm text-red-700">
            {finishError}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-10 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-2xl mx-auto px-4 py-4 flex gap-3">
          <button
            onClick={() => goTo(currentSlide - 1)}
            disabled={currentSlide === 0}
            aria-label="Vorheriger Slide"
            className="w-12 h-12 rounded-xl bg-gray-100 text-gray-500 font-bold text-lg disabled:opacity-30 flex items-center justify-center hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            ‹
          </button>
          {isLast ? (
            <button
              onClick={handleFinish}
              className="flex-1 h-12 rounded-xl font-bold text-white text-base transition-all active:scale-[0.98] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              style={{ background: modul.colorHex }}
            >
              Modul abschliessen 🎉
            </button>
          ) : (
            <button
              onClick={() => goTo(currentSlide + 1)}
              className="flex-1 h-12 rounded-xl font-bold text-white text-base transition-all active:scale-[0.98] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
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
