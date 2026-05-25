import { MODULES, XP_REWARDS, TOTAL_MAX_XP } from "@/data/modules";
import { defaultModuleProgress, type ModuleProgress, type SparkProgress } from "@/lib/progress-types";

const VALID_MODULE_IDS = new Set(MODULES.map((m) => m.id));
const VALID_BADGE_IDS = new Set([
  "ai-act-expert",
  "prompt-master",
  "nutribot",
  "eco-warrior",
  "future-ready",
  "ai-graduate",
]);

export function normalizeModuleId(id: string): string | null {
  const trimmed = id.trim();
  if (VALID_MODULE_IDS.has(trimmed)) return trimmed;
  const padded = trimmed.padStart(2, "0");
  if (VALID_MODULE_IDS.has(padded)) return padded;
  return null;
}

export function computeCompletionHash(p: SparkProgress): string {
  const parts = MODULES.map((m) => {
    const mp = p.modules[m.id];
    return `${m.id}:${mp?.quizPassed ? 1 : 0}:${mp?.quizScore ?? "-"}`;
  });
  return parts.join("|");
}

export function countCompletedModules(p: SparkProgress): number {
  return MODULES.filter((m) => p.modules[m.id]?.quizPassed === true).length;
}

export function canAccessCertificateFromProgress(p: SparkProgress): boolean {
  if (p.badges.includes("ai-graduate")) return true;
  return MODULES.every((m) => p.modules[m.id]?.quizPassed === true);
}

function sanitizeSlideIndices(indices: unknown, maxSlides: number): number[] {
  if (!Array.isArray(indices)) return [];
  const valid = indices
    .filter((i): i is number => typeof i === "number" && Number.isInteger(i) && i >= 0 && i < maxSlides)
    .filter((v, i, arr) => arr.indexOf(v) === i);
  return valid.sort((a, b) => a - b);
}

function sanitizeModuleProgress(raw: Partial<ModuleProgress> | undefined, slideCount: number): ModuleProgress {
  const base = defaultModuleProgress();
  if (!raw || typeof raw !== "object") return base;
  const slidesRead = sanitizeSlideIndices(raw.slidesRead, slideCount);
  const quizScore =
    typeof raw.quizScore === "number" && raw.quizScore >= 0 && raw.quizScore <= 5 ? raw.quizScore : null;
  return {
    started: raw.started === true || slidesRead.length > 0,
    slidesRead,
    completed: raw.completed === true,
    quizScore,
    quizPassed: raw.quizPassed === true,
    quizRetried: raw.quizRetried === true,
    badgeEarned: raw.badgeEarned === true,
  };
}

/** Strip impossible states and clamp slide indices */
export function sanitizeProgress(raw: Partial<SparkProgress>): SparkProgress {
  const modules: Record<string, ModuleProgress> = {};
  for (const m of MODULES) {
    modules[m.id] = sanitizeModuleProgress(raw.modules?.[m.id], m.slides.length);
  }

  // Enforce consistency: quizPassed requires completed
  for (const m of MODULES) {
    const mp = modules[m.id];
    if (mp.quizPassed && !mp.completed) mp.completed = true;
    if (mp.badgeEarned && !mp.quizPassed) mp.badgeEarned = false;
    if (mp.completed && mp.slidesRead.length === 0) {
      mp.completed = false;
      mp.quizPassed = false;
    }
  }

  const badges = Array.isArray(raw.badges)
    ? [...new Set(raw.badges.filter((b): b is string => typeof b === "string" && VALID_BADGE_IDS.has(b)))]
    : [];

  // Sync badges with module state
  for (const m of MODULES) {
    if (modules[m.id].badgeEarned && !badges.includes(m.badge)) {
      badges.push(m.badge);
    }
  }
  const allPassed = MODULES.every((m) => modules[m.id].quizPassed);
  if (allPassed && !badges.includes("ai-graduate")) badges.push("ai-graduate");

  const npsSubmitted = Array.isArray(raw.npsSubmitted)
    ? raw.npsSubmitted.filter((id): id is string => typeof id === "string" && VALID_MODULE_IDS.has(id))
    : [];

  return {
    totalXP: typeof raw.totalXP === "number" && raw.totalXP >= 0 ? Math.min(raw.totalXP, TOTAL_MAX_XP) : 0,
    modules,
    badges,
    allModulesBonus: allPassed && raw.allModulesBonus === true,
    certificateDownloads:
      typeof raw.certificateDownloads === "number" && raw.certificateDownloads >= 0
        ? raw.certificateDownloads
        : 0,
    lastCertId: typeof raw.lastCertId === "string" ? raw.lastCertId : null,
    npsSubmitted,
  };
}

/** Recalculate XP from module actions — prevents import cheating */
export function recalculateXP(p: SparkProgress): number {
  let xp = 0;
  for (const m of MODULES) {
    const mp = p.modules[m.id];
    if (!mp) continue;
    xp += mp.slidesRead.length * XP_REWARDS.SLIDE_READ;
    if (mp.completed) xp += XP_REWARDS.MODULE_COMPLETE;
    if (mp.quizPassed && mp.badgeEarned) {
      const perfect = mp.quizScore === 5;
      if (perfect) {
        xp += mp.quizRetried ? Math.floor(XP_REWARDS.QUIZ_PERFECT / 2) : XP_REWARDS.QUIZ_PERFECT;
      } else if (mp.quizScore !== null && mp.quizScore >= 3) {
        xp += mp.quizRetried ? XP_REWARDS.QUIZ_RETRY_PASS : XP_REWARDS.QUIZ_PASS;
      }
    }
  }
  if (p.allModulesBonus && canAccessCertificateFromProgress(p)) {
    xp += XP_REWARDS.ALL_MODULES_BONUS;
  }
  return Math.min(xp, TOTAL_MAX_XP);
}

export function validateProgressForCertificate(p: SparkProgress): { ok: true } | { ok: false; error: string } {
  if (!canAccessCertificateFromProgress(p)) {
    return { ok: false, error: "Nicht alle Module abgeschlossen" };
  }
  for (const m of MODULES) {
    const mp = p.modules[m.id];
    if (!mp?.quizPassed) return { ok: false, error: `Modul ${m.id} nicht bestanden` };
    if (mp.quizScore !== null && (mp.quizScore < 0 || mp.quizScore > 5)) {
      return { ok: false, error: "Ungültiger Quiz-Score" };
    }
  }
  const calcXp = recalculateXP(p);
  if (p.totalXP > calcXp + 50) {
    return { ok: false, error: "XP stimmt nicht mit Fortschritt überein" };
  }
  return { ok: true };
}

export const CERT_ID_REGEX = /^SPARK-[A-Z2-9]{4}-[A-Z2-9]{4}$/;
