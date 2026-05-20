"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MODULES } from "@/data/modules";
import { submitQuiz, markQuizRetry, getProgress } from "@/lib/progress";

type AnswerState = {
  selected: string | null;
  revealed: boolean;
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const modul = MODULES.find((m) => m.id === id);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({ selected: null, revealed: false });
  const [scores, setScores] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; xpGained: number; badge: string | null; allComplete: boolean } | null>(null);
  const [showNps, setShowNps] = useState(false);

  if (!modul) return null;

  const question = modul.quiz[questionIndex];
  const totalQ = modul.quiz.length;
  const progress = ((questionIndex + 1) / totalQ) * 100;

  const handleSelect = (label: string) => {
    if (answers.revealed) return;
    setAnswers({ selected: label, revealed: true });
  };

  const isCorrect = answers.selected === question.correct;

  const handleNext = () => {
    const newScores = [...scores, isCorrect];

    if (questionIndex + 1 >= totalQ) {
      const correctCount = newScores.filter(Boolean).length;
      const res = submitQuiz(modul.id, correctCount, totalQ);
      setResult(res);
      setScores(newScores);
      setFinished(true);
    } else {
      setScores(newScores);
      setQuestionIndex((i) => i + 1);
      setAnswers({ selected: null, revealed: false });
    }
  };

  const handleRetry = () => {
    markQuizRetry(modul.id);
    setQuestionIndex(0);
    setAnswers({ selected: null, revealed: false });
    setScores([]);
    setFinished(false);
    setResult(null);
  };

  if (finished && result) {
    const correctCount = scores.filter(Boolean).length;

    if (showNps) {
      return (
        <NpsScreen
          moduleId={modul.id}
          onDone={() => {
            const nextId = String(Number(modul.id) + 1).padStart(2, "0");
            const nextModul = MODULES.find((m) => m.id === nextId);
            if (result.allComplete) router.push("/zertifikat");
            else if (nextModul) router.push(`/modul/${nextId}`);
            else router.push("/");
          }}
          onSkip={() => {
            const nextId = String(Number(modul.id) + 1).padStart(2, "0");
            const nextModul = MODULES.find((m) => m.id === nextId);
            if (result.allComplete) router.push("/zertifikat");
            else if (nextModul) router.push(`/modul/${nextId}`);
            else router.push("/");
          }}
        />
      );
    }

    return (
      <QuizResult
        modul={modul}
        score={correctCount}
        total={totalQ}
        result={result}
        onRetry={handleRetry}
        onContinue={() => setShowNps(true)}
        onDashboard={() => router.push("/")}
        hasNextModule={!!MODULES.find((m) => m.id === String(Number(modul.id) + 1).padStart(2, "0"))}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push(`/modul/${modul.id}/abschluss`)}
            className="text-gray-400 hover:text-gray-600 p-1 -ml-1"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Quiz: {modul.title}</span>
              <span>Frage {questionIndex + 1} / {totalQ}</span>
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

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pt-6 pb-32">
        {/* Question */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: modul.colorHex }}
            >
              ?
            </div>
            <span className="text-xs text-gray-400 font-medium">Frage {questionIndex + 1}</span>
          </div>
          <p className="font-semibold text-gray-900 text-base leading-snug">{question.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = answers.selected === option.label;
            const isRight = option.label === question.correct;
            let bg = "bg-white border-gray-200 text-gray-800";
            let icon = null;

            if (answers.revealed) {
              if (isRight) {
                bg = "bg-green-50 border-green-400 text-green-900";
                icon = "✓";
              } else if (isSelected && !isRight) {
                bg = "bg-red-50 border-red-400 text-red-900";
                icon = "✗";
              } else {
                bg = "bg-gray-50 border-gray-200 text-gray-400";
              }
            } else if (isSelected) {
              bg = "bg-indigo-50 border-indigo-400 text-indigo-900";
            }

            return (
              <button
                key={option.label}
                onClick={() => handleSelect(option.label)}
                className={`w-full rounded-2xl border-2 p-4 text-left flex items-start gap-3 transition-all ${bg} ${
                  !answers.revealed ? "hover:border-indigo-300 hover:bg-indigo-50/50 active:scale-[0.99]" : ""
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: answers.revealed && isRight
                      ? "#22C55E"
                      : answers.revealed && isSelected && !isRight
                      ? "#EF4444"
                      : modul.colorHex + "22",
                    color: answers.revealed && (isRight || (isSelected && !isRight))
                      ? "white"
                      : modul.colorHex,
                  }}
                >
                  {icon ?? option.label}
                </div>
                <span className="text-sm leading-relaxed flex-1">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answers.revealed && (
          <div
            className={`mt-4 rounded-2xl p-4 ${
              isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}
          >
            <div className={`font-bold mb-1 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
              {isCorrect ? "✓ Richtig!" : "✗ Nicht ganz."}
            </div>
            <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {answers.revealed && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <button
              onClick={handleNext}
              className="w-full h-12 rounded-xl font-bold text-white text-base transition-all active:scale-[0.98] hover:opacity-90"
              style={{ background: modul.colorHex }}
            >
              {questionIndex + 1 >= totalQ ? "Ergebnis anzeigen" : "Weiter →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizResult({
  modul,
  score,
  total,
  result,
  onRetry,
  onDashboard,
  onContinue,
  hasNextModule,
}: {
  modul: (typeof MODULES)[0];
  score: number;
  total: number;
  result: { passed: boolean; xpGained: number; badge: string | null; allComplete: boolean };
  onRetry: () => void;
  onDashboard: () => void;
  onContinue: () => void;
  hasNextModule: boolean;
}) {
  const p = getProgress();
  const wasAlreadyPassed = p.modules[modul.id]?.badgeEarned && result.xpGained === 0 && result.passed;

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 pb-8">
      <div className="max-w-md w-full text-center">
        <div className="text-7xl mb-4">{result.passed ? "🎉" : "😅"}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {result.passed ? "Bestanden!" : "Knapp daneben!"}
        </h1>
        <p className="text-gray-500 mb-6">
          {score} von {total} Fragen richtig
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                style={{ background: i < score ? "#22C55E" : "#EF4444" }}
              >
                {i < score ? "✓" : "✗"}
              </div>
            ))}
          </div>
          {result.xpGained > 0 && (
            <div className="flex items-center justify-center gap-2 text-indigo-600">
              <span className="text-xl">✨</span>
              <span className="font-bold text-xl">+{result.xpGained} XP verdient</span>
            </div>
          )}
          {result.passed && result.badge && !wasAlreadyPassed && (
            <div
              className="mt-4 rounded-xl p-3 flex items-center gap-2 justify-center text-white"
              style={{ background: modul.colorHex }}
            >
              <span className="text-xl">{modul.badgeEmoji}</span>
              <span className="font-semibold">Badge «{modul.badgeName}» verdient!</span>
            </div>
          )}
          {result.allComplete && (
            <div className="mt-3 bg-indigo-50 rounded-xl p-3 flex items-center gap-2 justify-center">
              <span className="text-xl">🎓</span>
              <span className="font-semibold text-indigo-700">Alle Module abgeschlossen! +500 XP Bonus</span>
            </div>
          )}
        </div>

        {result.passed ? (
          <>
            <button
              onClick={onContinue}
              className="w-full py-4 rounded-2xl font-bold text-white text-lg mb-3 transition-all active:scale-[0.98] hover:opacity-90"
              style={{ background: result.allComplete ? "#6366F1" : modul.colorHex }}
            >
              {result.allComplete ? "Zertifikat holen 🎓" : hasNextModule ? "Nächstes Modul →" : "Weiter"}
            </button>
            <button
              onClick={onDashboard}
              className="w-full py-3 rounded-2xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all text-base"
            >
              Zum Dashboard
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onRetry}
              className="w-full py-4 rounded-2xl font-bold text-white text-lg mb-3 transition-all active:scale-[0.98] hover:opacity-90"
              style={{ background: modul.colorHex }}
            >
              Nochmals versuchen
            </button>
            <button
              onClick={onContinue}
              className="w-full py-3 rounded-2xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all text-base"
            >
              Zum Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function NpsScreen({
  moduleId,
  onDone,
  onSkip,
}: {
  moduleId: string;
  onDone: () => void;
  onSkip: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (selected === null) return;
    setSubmitting(true);
    try {
      await fetch("/api/nps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, score: selected, comment: comment.trim() || undefined }),
      });
    } catch {
      // fire and forget
    }
    setSubmitted(true);
    setTimeout(onDone, 1200);
  };

  if (submitted) {
    return (
      <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4">
        <div className="text-5xl mb-4">🙏</div>
        <p className="text-xl font-bold text-gray-900 mb-2">Danke für dein Feedback!</p>
        <p className="text-gray-500 text-sm">Du wirst weitergeleitet…</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 pb-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">💬</div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Kurze Frage</h2>
          <p className="text-gray-500 text-sm">Wie wahrscheinlich ist es, dass du SPARK einem Kollegen empfiehlst?</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-3 px-1">
            <span>Gar nicht</span>
            <span>Auf jeden Fall</span>
          </div>
          <div className="grid grid-cols-11 gap-1 mb-4">
            {Array.from({ length: 11 }, (_, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`h-10 rounded-lg text-sm font-bold transition-all ${
                  selected === i
                    ? "bg-indigo-500 text-white scale-110 shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {i}
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Optionaler Kommentar (was hat dir besonders gut gefallen oder was könnten wir verbessern?)"
            rows={3}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={selected === null || submitting}
          className="w-full py-4 rounded-2xl font-bold text-white text-base bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] mb-3"
        >
          {submitting ? "Wird gesendet…" : "Absenden & weiter"}
        </button>
        <button
          onClick={onSkip}
          className="w-full py-3 rounded-2xl text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Überspringen
        </button>
      </div>
    </div>
  );
}
