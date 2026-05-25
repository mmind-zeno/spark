"use client";

import { useRouter } from "next/navigation";

type Props = {
  title: string;
  subtitle?: string;
  step: number;
  total: number;
  colorHex: string;
  backHref: string;
  backLabel?: string;
};

export function ModuleProgressHeader({
  title,
  subtitle,
  step,
  total,
  colorHex,
  backHref,
  backLabel = "Zurück",
}: Props) {
  const router = useRouter();
  const progress = (step / total) * 100;

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.push(backHref)}
          aria-label={backLabel}
          className="text-gray-400 hover:text-gray-600 p-1 -ml-1 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1 gap-2">
            <span className="truncate">{subtitle ?? title}</span>
            <span className="shrink-0">
              {step} / {total}
            </span>
          </div>
          <div
            className="w-full bg-gray-100 rounded-full h-2 overflow-hidden"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={`Fortschritt: ${step} von ${total}`}
          >
            <div
              className="h-2 rounded-full transition-all duration-400"
              style={{ width: `${progress}%`, background: colorHex }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
