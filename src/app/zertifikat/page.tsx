"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  canAccessCertificate,
  getProgress,
  setLastCertId,
  getLastCertId,
  incrementLocalDownloadCount,
} from "@/lib/progress";
import { generateCertificatePdf } from "@/lib/certificate-pdf";
import { sanitizeFilename } from "@/lib/pdf-text";

export default function ZertifikatPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [lastCertId, setLastCertIdState] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasAccess(canAccessCertificate());
    const p = getProgress();
    setTotalXP(p.totalXP);
    setLastCertIdState(getLastCertId());
    setOffline(typeof navigator !== "undefined" && !navigator.onLine);
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const handleDownload = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      nameInputRef.current?.focus();
      return;
    }
    if (offline) {
      setError("PDF-Erstellung benötigt eine Internetverbindung (Zertifikat-Registrierung).");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const progress = getProgress();
      const regRes = await fetch("/api/zertifikat/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          progress,
          existingCertId: getLastCertId() ?? undefined,
        }),
      });
      const regData = await regRes.json();
      if (!regRes.ok || !regData.ok) {
        throw new Error(regData.error ?? "Zertifikat konnte nicht registriert werden");
      }

      const certId: string = regData.id;
      const verifyUrl: string = regData.verifyUrl;

      const pdfBytes = await generateCertificatePdf({
        name: trimmedName,
        totalXP: progress.totalXP,
        certId,
        verifyUrl,
      });

      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SPARK-Zertifikat-${sanitizeFilename(trimmedName)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);

      setLastCertId(certId);
      setLastCertIdState(certId);
      incrementLocalDownloadCount();

      // Re-download KPI sync (idempotent per certId)
      await fetch("/api/zertifikat/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certId }),
      }).catch(() => {});
    } catch (err) {
      console.error("PDF generation error:", err);
      setError(
        err instanceof Error ? err.message : "PDF konnte nicht erstellt werden. Bitte versuche es erneut."
      );
    } finally {
      setGenerating(false);
    }
  };

  if (hasAccess === null) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-gray-400 text-sm">
        Wird geladen…
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Noch nicht freigeschaltet</h1>
        <p className="text-gray-500 text-sm mb-6">
          Schliesse alle 5 Module inkl. Quiz ab, um dein Zertifikat zu erhalten.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-2xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-all"
        >
          Zum Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 pb-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dein Zertifikat</h1>
          <p className="text-gray-500 text-sm">Alle 5 Module + Quizzes abgeschlossen — herzlichen Glückwunsch!</p>
        </div>

        {offline && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 mb-4">
            Du bist offline. Verbinde dich mit dem Internet, um das Zertifikat zu registrieren und herunterzuladen.
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="h-2 bg-indigo-500" />
          <div className="p-6 text-center">
            <div className="text-xs text-indigo-500 font-semibold uppercase tracking-widest mb-1">SPARK</div>
            <div className="text-lg font-bold text-gray-900 mb-1">Zertifikat</div>
            <div className="text-sm text-gray-400 mb-3">der erfolgreichen Teilnahme</div>
            <div className="text-xl font-bold text-indigo-600 mb-1 min-h-[1.75rem]">
              {name || <span className="text-gray-300">Dein Name</span>}
            </div>
            <div className="text-xs text-gray-400 mb-4">hat das SPARK KI-Training abgeschlossen</div>
            <div className="flex justify-center gap-2 flex-wrap mb-3">
              {["🏛️", "💬", "🥗", "🌍", "🚀"].map((e) => (
                <span key={e} className="bg-indigo-50 rounded-lg px-2 py-1 text-sm">
                  {e}
                </span>
              ))}
            </div>
            <div className="text-xs text-indigo-500 font-semibold">{totalXP} XP · MMIND GmbH</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <label htmlFor="cert-name" className="block text-sm font-semibold text-gray-700 mb-2">
            Dein Name für das Zertifikat
          </label>
          <input
            id="cert-name"
            ref={nameInputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Anna Muster"
            maxLength={100}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            onKeyDown={(e) => e.key === "Enter" && handleDownload()}
          />
        </div>

        {lastCertId && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-800 mb-4">
            <div className="font-semibold mb-1">Letztes Zertifikat</div>
            <div className="text-xs text-green-700 font-mono">{lastCertId}</div>
            <Link href={`/verify/${lastCertId}`} className="text-xs text-indigo-600 underline mt-1 inline-block">
              Online verifizieren →
            </Link>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={generating || !name.trim() || offline}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          {generating ? "PDF wird erstellt…" : lastCertId ? "PDF erneut herunterladen" : "PDF herunterladen"}
        </button>

        <button
          onClick={() => router.push("/")}
          className="w-full mt-3 py-3 rounded-2xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all text-base"
        >
          Zurück zum Dashboard
        </button>

        <Link
          href="/verify"
          className="block text-center mt-4 text-sm text-indigo-500 hover:text-indigo-700"
        >
          Zertifikat verifizieren →
        </Link>
      </div>
    </div>
  );
}
