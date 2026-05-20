"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { canAccessCertificate, getProgress } from "@/lib/progress";

export default function ZertifikatPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const access = canAccessCertificate();
    setHasAccess(access);
    const p = getProgress();
    setTotalXP(p.totalXP);
  }, []);

  const handleDownload = async () => {
    if (!name.trim()) {
      nameInputRef.current?.focus();
      return;
    }
    setGenerating(true);
    setError(null);

    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([842, 595]); // A4 landscape
      const { width, height } = page.getSize();

      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

      // Background
      page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.98, 0.98, 1) });

      // Try to embed background image
      try {
        const bgRes = await fetch("/cert-bg.jpg");
        if (bgRes.ok) {
          const bgBytes = await bgRes.arrayBuffer();
          const bgImage = await pdfDoc.embedJpg(new Uint8Array(bgBytes));
          page.drawImage(bgImage, { x: 0, y: 0, width, height, opacity: 0.12 });
        }
      } catch {
        // keep plain background
      }

      // Border frame (indigo-500 = #6366F1)
      const indigo = rgb(0.388, 0.4, 0.945);
      const indigoLight = rgb(0.79, 0.80, 0.98);

      page.drawRectangle({ x: 0, y: height - 8, width, height: 8, color: indigo });
      page.drawRectangle({ x: 0, y: 0, width, height: 8, color: indigo });
      page.drawRectangle({ x: 0, y: 0, width: 8, height, color: indigo });
      page.drawRectangle({ x: width - 8, y: 0, width: 8, height, color: indigo });

      // Inner decorative border
      page.drawRectangle({ x: 16, y: 16, width: width - 32, height: height - 32, color: rgb(1,1,1), opacity: 0 });
      page.drawLine({ start: { x: 20, y: height - 20 }, end: { x: width - 20, y: height - 20 }, thickness: 0.5, color: indigoLight, opacity: 0.5 });
      page.drawLine({ start: { x: 20, y: 20 }, end: { x: width - 20, y: 20 }, thickness: 0.5, color: indigoLight, opacity: 0.5 });

      // Header: SPARK
      page.drawText("SPARK", {
        x: 60,
        y: height - 62,
        size: 24,
        font: boldFont,
        color: indigo,
      });
      page.drawText("KI-Trainingsplattform  |  Erasmus Programm  |  MMIND GmbH", {
        x: 60,
        y: height - 82,
        size: 10,
        font: regularFont,
        color: rgb(0.55, 0.55, 0.55),
      });

      // Divider line
      page.drawLine({
        start: { x: 60, y: height - 95 },
        end: { x: width - 60, y: height - 95 },
        thickness: 1,
        color: indigoLight,
        opacity: 0.6,
      });

      // Certificate title
      page.drawText("Zertifikat", {
        x: width / 2 - boldFont.widthOfTextAtSize("Zertifikat", 48) / 2,
        y: height - 175,
        size: 48,
        font: boldFont,
        color: rgb(0.1, 0.1, 0.15),
      });

      const subtitle = "der erfolgreichen Teilnahme";
      page.drawText(subtitle, {
        x: width / 2 - italicFont.widthOfTextAtSize(subtitle, 18) / 2,
        y: height - 208,
        size: 18,
        font: italicFont,
        color: rgb(0.45, 0.45, 0.45),
      });

      // Name
      const nameWidth = boldFont.widthOfTextAtSize(name, 36);
      page.drawText(name, {
        x: width / 2 - nameWidth / 2,
        y: height - 268,
        size: 36,
        font: boldFont,
        color: indigo,
      });
      page.drawLine({
        start: { x: width / 2 - nameWidth / 2 - 15, y: height - 279 },
        end: { x: width / 2 + nameWidth / 2 + 15, y: height - 279 },
        thickness: 1.5,
        color: indigo,
        opacity: 0.35,
      });

      // Description
      const desc = "hat das SPARK KI-Training erfolgreich abgeschlossen";
      page.drawText(desc, {
        x: width / 2 - regularFont.widthOfTextAtSize(desc, 15) / 2,
        y: height - 312,
        size: 15,
        font: regularFont,
        color: rgb(0.3, 0.3, 0.3),
      });

      // Module badges (text only, no emoji)
      const moduleTitles = ["EU AI Act", "ChatGPT Deep Dive", "KI & Ernaehrung", "KI & Umwelt", "KI & Berufe"];
      const badgeW = 138;
      const badgeH = 32;
      const badgeY = height - 375;
      const totalBadgesW = moduleTitles.length * badgeW + (moduleTitles.length - 1) * 8;
      const badgeStartX = (width - totalBadgesW) / 2;

      moduleTitles.forEach((title, i) => {
        const bx = badgeStartX + i * (badgeW + 8);
        page.drawRectangle({ x: bx, y: badgeY, width: badgeW, height: badgeH, color: rgb(0.94, 0.94, 0.99), borderColor: indigoLight, borderWidth: 1 });
        const tw = boldFont.widthOfTextAtSize(title, 9);
        page.drawText(title, { x: bx + badgeW / 2 - tw / 2, y: badgeY + 11, size: 9, font: boldFont, color: indigo });
      });

      // XP row
      const xpText = `${totalXP} XP erreicht`;
      page.drawText(xpText, {
        x: width / 2 - boldFont.widthOfTextAtSize(xpText, 13) / 2,
        y: badgeY - 30,
        size: 13,
        font: boldFont,
        color: indigo,
      });

      // Footer divider
      page.drawLine({
        start: { x: 60, y: 58 },
        end: { x: width - 60, y: 58 },
        thickness: 0.5,
        color: indigoLight,
        opacity: 0.5,
      });

      // Date
      const date = new Date().toLocaleDateString("de-CH", { year: "numeric", month: "long", day: "numeric" });
      page.drawText(`Ausgestellt am ${date}`, {
        x: 60,
        y: 38,
        size: 10,
        font: regularFont,
        color: rgb(0.55, 0.55, 0.55),
      });

      // MMIND
      const sig = "MMIND GmbH  |  Schaan, Liechtenstein  |  mmind.ai";
      page.drawText(sig, {
        x: width - 60 - regularFont.widthOfTextAtSize(sig, 10),
        y: 38,
        size: 10,
        font: regularFont,
        color: rgb(0.55, 0.55, 0.55),
      });

      // Save + download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SPARK-Zertifikat-${name.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);

      await fetch("/api/zertifikat/download", { method: "POST" }).catch(() => {});
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("PDF konnte nicht erstellt werden. Bitte versuche es erneut.");
    } finally {
      setGenerating(false);
    }
  };

  if (hasAccess === null) return null;

  if (!hasAccess) {
    return (
      <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Noch nicht freigeschaltet</h1>
        <p className="text-gray-500 text-sm mb-6">Schliesse alle 5 Module inkl. Quiz ab, um dein Zertifikat zu erhalten.</p>
        <button onClick={() => router.push("/")} className="px-6 py-3 rounded-2xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-all">
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

        {/* Preview */}
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
                <span key={e} className="bg-indigo-50 rounded-lg px-2 py-1 text-sm">{e}</span>
              ))}
            </div>
            <div className="text-xs text-indigo-500 font-semibold">{totalXP} XP · MMIND GmbH</div>
          </div>
        </div>

        {/* Name Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Dein Name für das Zertifikat</label>
          <input
            ref={nameInputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Anna Muster"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            onKeyDown={(e) => e.key === "Enter" && handleDownload()}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={generating || !name.trim()}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          {generating ? "PDF wird erstellt..." : "PDF herunterladen"}
        </button>

        <button
          onClick={() => router.push("/")}
          className="w-full mt-3 py-3 rounded-2xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all text-base"
        >
          Zurück zum Dashboard
        </button>
      </div>
    </div>
  );
}
