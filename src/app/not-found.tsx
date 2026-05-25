import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Seite nicht gefunden</h1>
      <p className="text-gray-500 text-sm mb-8 max-w-sm">
        Diese Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-2xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
      >
        Zum Dashboard
      </Link>
    </div>
  );
}
