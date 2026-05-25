"use client";

import { MODULES, XP_REWARDS, TOTAL_MAX_XP } from "@/data/modules";
import {
  defaultModuleProgress,
  type ModuleProgress,
  type SparkProgress,
} from "@/lib/progress-types";
import { sanitizeProgress, recalculateXP } from "@/lib/progress-validation";

export type { ModuleProgress, SparkProgress };

const STORAGE_KEY = "spark_progress";
const NPS_STORAGE_KEY = "spark_nps_submitted";
const PROGRESS_EVENT = "spark-progress-changed";

function emptyProgress(): SparkProgress {
  const modules: Record<string, ModuleProgress> = {};
  for (const m of MODULES) {
    modules[m.id] = defaultModuleProgress();
  }
  return {
    totalXP: 0,
    modules,
    badges: [],
    allModulesBonus: false,
    certificateDownloads: 0,
    lastCertId: null,
    npsSubmitted: [],
  };
}

function normalizeProgress(raw: Partial<SparkProgress>): SparkProgress {
  const sanitized = sanitizeProgress(raw);
  // Merge legacy NPS from separate key
  if (typeof window !== "undefined") {
    try {
      const legacy = localStorage.getItem(NPS_STORAGE_KEY);
      if (legacy) {
        const ids = JSON.parse(legacy) as string[];
        if (Array.isArray(ids)) {
          sanitized.npsSubmitted = [...new Set([...(sanitized.npsSubmitted ?? []), ...ids])];
        }
      }
    } catch {
      // ignore
    }
  }
  sanitized.totalXP = recalculateXP(sanitized);
  return sanitized;
}

function notifyProgressChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function getProgress(): SparkProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    return normalizeProgress(JSON.parse(raw) as Partial<SparkProgress>);
  } catch {
    return emptyProgress();
  }
}

function saveProgress(p: SparkProgress): void {
  if (typeof window === "undefined") return;
  p.totalXP = recalculateXP(p);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  notifyProgressChange();
}


export function markSlideRead(moduleId: string, slideIndex: number): { xpGained: number } {
  const p = getProgress();
  const m = p.modules[moduleId] ?? defaultModuleProgress();
  if (m.slidesRead.includes(slideIndex)) return { xpGained: 0 };
  m.slidesRead = [...m.slidesRead, slideIndex];
  m.started = true;
  p.modules[moduleId] = m;
  p.totalXP += XP_REWARDS.SLIDE_READ;
  saveProgress(p);
  return { xpGained: XP_REWARDS.SLIDE_READ };
}

export function canFinishModule(moduleId: string, slideCount: number): boolean {
  const p = getProgress();
  const m = p.modules[moduleId];
  if (!m) return false;
  const required = Array.from({ length: slideCount }, (_, i) => i);
  return required.every((i) => m.slidesRead.includes(i));
}

export function markModuleComplete(moduleId: string, slideCount?: number): { xpGained: number; ok: boolean } {
  const p = getProgress();
  const m = p.modules[moduleId] ?? defaultModuleProgress();
  const mod = MODULES.find((x) => x.id === moduleId);
  const count = slideCount ?? mod?.slides.length ?? 11;

  if (slideCount !== undefined && !canFinishModule(moduleId, count)) {
    return { xpGained: 0, ok: false };
  }

  if (m.completed) return { xpGained: 0, ok: true };
  m.completed = true;
  p.modules[moduleId] = m;
  p.totalXP += XP_REWARDS.MODULE_COMPLETE;
  saveProgress(p);
  return { xpGained: XP_REWARDS.MODULE_COMPLETE, ok: true };
}

export function submitQuiz(
  moduleId: string,
  score: number,
  total: number
): { passed: boolean; xpGained: number; badge: string | null; allComplete: boolean } {
  const p = getProgress();
  const m = p.modules[moduleId] ?? defaultModuleProgress();
  const passed = score >= 3;
  const perfect = score === total;
  const wasRetried = m.quizRetried;

  m.quizScore = score;
  if (!m.badgeEarned) {
    m.quizPassed = passed;
  } else if (passed) {
    m.quizPassed = true;
  }

  let xpGained = 0;
  if (passed && !m.badgeEarned) {
    if (perfect) {
      xpGained = wasRetried ? Math.floor(XP_REWARDS.QUIZ_PERFECT / 2) : XP_REWARDS.QUIZ_PERFECT;
    } else {
      xpGained = wasRetried ? XP_REWARDS.QUIZ_RETRY_PASS : XP_REWARDS.QUIZ_PASS;
    }
    p.totalXP += xpGained;
  }

  let badge: string | null = null;
  const mod = MODULES.find((m) => m.id === moduleId);
  if (passed && mod && !m.badgeEarned) {
    m.badgeEarned = true;
    badge = mod.badge;
    if (!p.badges.includes(badge)) p.badges.push(badge);
  }

  p.modules[moduleId] = m;

  const allModulesDone = MODULES.every((mod) => p.modules[mod.id]?.quizPassed);
  let allComplete = false;
  if (allModulesDone && !p.allModulesBonus) {
    p.allModulesBonus = true;
    p.totalXP += XP_REWARDS.ALL_MODULES_BONUS;
    if (!p.badges.includes("ai-graduate")) p.badges.push("ai-graduate");
    allComplete = true;
  }

  saveProgress(p);
  return { passed, xpGained, badge, allComplete };
}

export function markQuizRetry(moduleId: string): void {
  const p = getProgress();
  const m = p.modules[moduleId] ?? defaultModuleProgress();
  m.quizRetried = true;
  m.quizScore = null;
  p.modules[moduleId] = m;
  saveProgress(p);
}

export function getModuleStatus(
  moduleId: string
): "not-started" | "in-progress" | "quiz-pending" | "completed" {
  const p = getProgress();
  const m = p.modules[moduleId];
  if (!m || !m.started) return "not-started";
  if (m.quizPassed) return "completed";
  if (m.completed) return "quiz-pending";
  return "in-progress";
}

export function getCompletedModulesCount(): number {
  const p = getProgress();
  return MODULES.filter((m) => p.modules[m.id]?.quizPassed).length;
}

export function canAccessCertificate(): boolean {
  const p = getProgress();
  if (p.badges.includes("ai-graduate")) return true;
  return MODULES.every((m) => p.modules[m.id]?.quizPassed === true);
}

export function canStartQuiz(moduleId: string): boolean {
  const p = getProgress();
  return p.modules[moduleId]?.completed === true;
}

export function setLastCertId(certId: string): void {
  const p = getProgress();
  p.lastCertId = certId;
  saveProgress(p);
}

export function getLastCertId(): string | null {
  return getProgress().lastCertId ?? null;
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(NPS_STORAGE_KEY);
  try {
    sessionStorage.removeItem("spark_viewed_modules");
    sessionStorage.removeItem("spark_nps_dismissed");
  } catch {
    // ignore
  }
  notifyProgressChange();
}

export function hasSubmittedNps(moduleId: string): boolean {
  const p = getProgress();
  return (p.npsSubmitted ?? []).includes(moduleId);
}

export function markNpsSubmitted(moduleId: string): void {
  const p = getProgress();
  const ids = new Set(p.npsSubmitted ?? []);
  ids.add(moduleId);
  p.npsSubmitted = [...ids];
  saveProgress(p);
  localStorage.setItem(NPS_STORAGE_KEY, JSON.stringify(p.npsSubmitted));
}

export function incrementLocalDownloadCount(): void {
  const p = getProgress();
  p.certificateDownloads = (p.certificateDownloads ?? 0) + 1;
  saveProgress(p);
}

export function exportProgressJson(): string {
  return JSON.stringify(getProgress(), null, 2);
}

export function importProgressJson(json: string): { ok: true } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(json) as Partial<SparkProgress>;
    if (typeof parsed !== "object" || parsed === null) {
      return { ok: false, error: "Ungültiges Format" };
    }
    const normalized = normalizeProgress(parsed);
    if (normalized.totalXP > TOTAL_MAX_XP) {
      return { ok: false, error: "XP-Wert ungültig" };
    }
    saveProgress(normalized);
    return { ok: true };
  } catch {
    return { ok: false, error: "JSON konnte nicht gelesen werden" };
  }
}

export { PROGRESS_EVENT };
