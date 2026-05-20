"use client";

import { MODULES, XP_REWARDS, BADGES } from "@/data/modules";

export type ModuleProgress = {
  started: boolean;
  slidesRead: number[];
  completed: boolean;
  quizScore: number | null;
  quizPassed: boolean;
  quizRetried: boolean;
  badgeEarned: boolean;
};

export type SparkProgress = {
  totalXP: number;
  modules: Record<string, ModuleProgress>;
  badges: string[];
  allModulesBonus: boolean;
  certificateDownloads: number;
};

const STORAGE_KEY = "spark_progress";

export function defaultModuleProgress(): ModuleProgress {
  return {
    started: false,
    slidesRead: [],
    completed: false,
    quizScore: null,
    quizPassed: false,
    quizRetried: false,
    badgeEarned: false,
  };
}

export function getProgress(): SparkProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    return JSON.parse(raw) as SparkProgress;
  } catch {
    return emptyProgress();
  }
}

function emptyProgress(): SparkProgress {
  const modules: Record<string, ModuleProgress> = {};
  for (const m of MODULES) {
    modules[m.id] = defaultModuleProgress();
  }
  return { totalXP: 0, modules, badges: [], allModulesBonus: false, certificateDownloads: 0 };
}

function saveProgress(p: SparkProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
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

export function markModuleComplete(moduleId: string): { xpGained: number } {
  const p = getProgress();
  const m = p.modules[moduleId] ?? defaultModuleProgress();
  if (m.completed) return { xpGained: 0 };
  m.completed = true;
  p.modules[moduleId] = m;
  p.totalXP += XP_REWARDS.MODULE_COMPLETE;
  saveProgress(p);
  return { xpGained: XP_REWARDS.MODULE_COMPLETE };
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
  m.quizPassed = passed;

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
    if (!p.badges.includes(badge)) {
      p.badges.push(badge);
    }
  }

  p.modules[moduleId] = m;

  const allModulesDone = MODULES.every(
    (mod) => p.modules[mod.id]?.quizPassed
  );
  let allComplete = false;
  if (allModulesDone && !p.allModulesBonus) {
    p.allModulesBonus = true;
    p.totalXP += XP_REWARDS.ALL_MODULES_BONUS;
    if (!p.badges.includes("ai-graduate")) {
      p.badges.push("ai-graduate");
    }
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
): "not-started" | "in-progress" | "completed" {
  const p = getProgress();
  const m = p.modules[moduleId];
  if (!m || !m.started) return "not-started";
  if (m.quizPassed) return "completed";
  return "in-progress";
}

export function getCompletedModulesCount(): number {
  const p = getProgress();
  return MODULES.filter((m) => p.modules[m.id]?.quizPassed).length;
}

export function canAccessCertificate(): boolean {
  const p = getProgress();
  // Primary: badge set — Secondary: all quizzes passed (badge may be missing from older sessions)
  if (p.badges.includes("ai-graduate")) return true;
  return MODULES.every((m) => p.modules[m.id]?.quizPassed === true);
}

export function incrementLocalDownloadCount(): void {
  const p = getProgress();
  p.certificateDownloads = (p.certificateDownloads ?? 0) + 1;
  saveProgress(p);
}
