"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CERT_ID_REGEX } from "@/lib/progress-validation";

export default function VerifyLookupPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const normalized = id.trim().toUpperCase();
  const isValid = CERT_ID_REGEX.test(normalized);

  const handleVerify = () => {
    if (!normalized) return;
    if (!isValid) {
      setError("Format: SPARK-XXXX-XXXX (Buchstaben A–Z und Ziffern 2–9)");
      return;
    }
    setError(null);
    router.push(`/verify/${normalized}`);
  };

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <div className="text-4xl mb-4">🔍</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Zertifikat verifizieren</h1>
        <p className="text-gray-500 text-sm mb-6">
          Gib die Zertifikat-ID ein (z.B. SPARK-ABCD-EFGH).
        </p>
        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value.toUpperCase());
            setError(null);
          }}
          placeholder="SPARK-XXXX-XXXX"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-mono mb-2 focus:outline-none focus:border-indigo-400"
          onKeyDown={(e) => e.key === "Enter" && handleVerify()}
        />
        {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
        <button
          onClick={handleVerify}
          disabled={!normalized}
          className="w-full py-3 rounded-xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 transition-colors"
        >
          Prüfen
        </button>
        <Link href="/" className="block text-center text-sm text-indigo-500 mt-4 hover:text-indigo-700">
          ← Zur Startseite
        </Link>
      </div>
    </div>
  );
}
