"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CERT_ID_REGEX } from "@/lib/progress-validation";

type Certificate = {
  id: string;
  name: string;
  totalXp: number;
  modulesCompleted: number;
  issuedAt: string;
};

function maskName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return parts[0] ?? name;
  const last = parts[parts.length - 1];
  return `${parts.slice(0, -1).join(" ")} ${last.charAt(0)}.`;
}

export default function VerifyPage() {
  const params = useParams();
  const rawId = (params.id as string)?.toUpperCase() ?? "";
  const idValid = CERT_ID_REGEX.test(rawId);
  const [cert, setCert] = useState<Certificate | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idValid) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    fetch(`/api/zertifikat/register?id=${encodeURIComponent(rawId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && data.certificate) setCert(data.certificate);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [rawId, idValid]);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-gray-400 text-sm">
        Zertifikat wird geprüft…
      </div>
    );
  }

  if (notFound || !cert) {
    return (
      <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-5xl mb-4">❌</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Zertifikat nicht gefunden</h1>
        <p className="text-gray-500 text-sm mb-6">
          {!idValid ? (
            <>Die ID <span className="font-mono">{rawId || "—"}</span> hat ein ungültiges Format.</>
          ) : (
            <>Die ID <span className="font-mono">{rawId}</span> ist nicht registriert.</>
          )}
        </p>
        <Link href="/verify" className="px-6 py-3 rounded-2xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600">
          Erneut suchen
        </Link>
      </div>
    );
  }

  const issuedDate = new Date(cert.issuedAt).toLocaleDateString("de-CH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 pb-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Zertifikat verifiziert</h1>
          <p className="text-gray-500 text-sm">Dieses SPARK-Zertifikat ist gültig und registriert.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-2 bg-indigo-500" />
          <div className="p-6">
            <div className="text-xs text-indigo-500 font-semibold uppercase tracking-widest mb-1">SPARK</div>
            <div className="text-lg font-bold text-gray-900 mb-4">Zertifikat der erfolgreichen Teilnahme</div>

            <div className="space-y-3 text-sm">
              <Row label="Name" value={maskName(cert.name)} bold />
              <Row label="Zertifikat-ID" value={cert.id} mono />
              <Row label="XP erreicht" value={`${cert.totalXp} XP`} />
              <Row label="Module" value={`${cert.modulesCompleted} / 5 abgeschlossen`} />
              <Row label="Ausgestellt am" value={issuedDate} />
              <Row label="Programm" value="Erasmus · MMIND GmbH" />
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
              {["🏛️", "💬", "🥗", "🌍", "🚀"].map((e) => (
                <span key={e} className="bg-indigo-50 rounded-lg px-2 py-1 text-sm">{e}</span>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="block text-center mt-6 text-sm text-indigo-500 hover:text-indigo-700"
        >
          spark.mmind.space →
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, bold, mono }: { label: string; value: string; bold?: boolean; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-400 shrink-0">{label}</span>
      <span className={`text-right ${bold ? "font-bold text-indigo-600 text-base" : "text-gray-800"} ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </span>
    </div>
  );
}
