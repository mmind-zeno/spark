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
  lastCertId?: string | null;
  npsSubmitted?: string[];
};

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
