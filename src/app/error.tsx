"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">Etwas ist schiefgelaufen</h1>
      <p className="text-gray-500 text-sm mb-6">Bitte lade die Seite neu oder kehre zum Dashboard zurück.</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600"
        >
          Erneut versuchen
        </button>
        <a
          href="/"
          className="px-5 py-2.5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
        >
          Dashboard
        </a>
      </div>
    </div>
  );
}
