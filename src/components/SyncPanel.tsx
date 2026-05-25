"use client";

import { useState } from "react";
import { exportProgressJson, importProgressJson, getProgress } from "@/lib/progress";

type Props = {
  onImported?: () => void;
};

export function SyncPanel({ onImported }: Props) {
  const [syncCode, setSyncCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [importCode, setImportCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleUpload = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const progress = getProgress();
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Upload fehlgeschlagen");
      setSyncCode(data.syncCode);
      setExpiresAt(data.expiresAt ?? null);
      setMessage({ type: "ok", text: "Code erstellt — 7 Tage gültig" });
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Fehler beim Upload" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    if (!syncCode) return;
    try {
      await navigator.clipboard.writeText(syncCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setMessage({ type: "err", text: "Kopieren fehlgeschlagen" });
    }
  };

  const handleImportCode = async () => {
    const code = importCode.trim().toUpperCase();
    if (code.length !== 6) {
      setMessage({ type: "err", text: "Code muss 6 Zeichen haben" });
      return;
    }
    if (!window.confirm("Lokaler Fortschritt wird überschrieben. Fortfahren?")) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/sync?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Import fehlgeschlagen");
      const result = importProgressJson(JSON.stringify(data.progress));
      if (!result.ok) throw new Error(result.error);
      setMessage({ type: "ok", text: "Fortschritt importiert!" });
      setImportCode("");
      onImported?.();
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Fehler beim Import" });
    } finally {
      setLoading(false);
    }
  };

  const handleExportFile = () => {
    const blob = new Blob([exportProgressJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spark-fortschritt-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ type: "ok", text: "Datei heruntergeladen" });
  };

  const handleImportFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      if (!window.confirm("Lokaler Fortschritt wird überschrieben. Fortfahren?")) return;
      const text = await file.text();
      const result = importProgressJson(text);
      if (result.ok) {
        setMessage({ type: "ok", text: "Fortschritt aus Datei importiert!" });
        onImported?.();
      } else {
        setMessage({ type: "err", text: result.error });
      }
    };
    input.click();
  };

  const expiryLabel = expiresAt
    ? new Date(expiresAt).toLocaleDateString("de-CH", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="text-sm font-semibold text-gray-500 mb-1">Geräte-Sync</div>
      <p className="text-xs text-gray-400 mb-4">
        Fortschritt auf ein anderes Gerät übertragen — per Sync-Code oder JSON-Datei.
      </p>

      <div className="space-y-3">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 transition-colors"
        >
          {loading ? "Wird hochgeladen…" : "Sync-Code erstellen"}
        </button>

        {syncCode && (
          <div className="bg-indigo-500 rounded-xl p-4 text-center">
            <div className="text-indigo-100 text-xs mb-1">Dein Sync-Code</div>
            <div className="text-3xl font-bold text-white tracking-[0.3em] font-mono">{syncCode}</div>
            {expiryLabel && (
              <div className="text-indigo-200 text-xs mt-1">Gültig bis {expiryLabel}</div>
            )}
            <button
              onClick={handleCopyCode}
              className="mt-3 text-xs font-semibold text-white/90 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              {copied ? "Kopiert!" : "Code kopieren"}
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={importCode}
            onChange={(e) => setImportCode(e.target.value.toUpperCase().slice(0, 6))}
            placeholder="Sync-Code"
            aria-label="Sync-Code eingeben"
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-mono tracking-widest uppercase focus:outline-none focus:border-indigo-400"
          />
          <button
            onClick={handleImportCode}
            disabled={loading || importCode.length !== 6}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 transition-colors"
          >
            Import
          </button>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={handleExportFile}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            JSON exportieren
          </button>
          <button
            onClick={handleImportFile}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            JSON importieren
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`mt-3 text-xs rounded-lg px-3 py-2 ${
            message.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
