"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { canAccessCertificate, getProgress } from "@/lib/progress";

export default function ZertifikatPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const access = canAccessCertificate();
    setHasAccess(access);
    const p = getProgress();
    setTotalXP(p.totalXP);
    if (!access) {
      router.replace("/");
    }
  }, [router]);

  const handleDownload = async () => {
    if (!name.trim()) {
      nameInputRef.current?.focus();
      return;
    }
    setGenerating(true);

    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([842, 595]); // A4 landscape
      const { width, height } = page.getSize();

      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

      // Background
      page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(0.98, 0.98, 1),
      });

      // Top accent bar
      page.drawRectangle({
        x: 0,
        y: height - 8,
        width,
        height: 8,
        color: rgb(0.388, 0.4, 0.945), // indigo-500
      });

      // Bottom accent bar
      page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height: 8,
        color: rgb(0.388, 0.4, 0.945),
      });

      // Left accent
      page.drawRectangle({
        x: 0,
        y: 0,
        width: 8,
        height,
        color: rgb(0.388, 0.4, 0.945),
      });

      // Right accent
      page.drawRectangle({
        x: width - 8,
        y: 0,
        width: 8,
        height,
        color: rgb(0.388, 0.4, 0.945),
      });

      // SPARK logo text
      page.drawText("⚡ SPARK", {
        x: 60,
        y: height - 60,
        size: 22,
        font: boldFont,
        color: rgb(0.388, 0.4, 0.945),
      });

      // Subtitle
      page.drawText("KI-Trainingsplattform von MMIND GmbH · Erasmus Programm", {
        x: 60,
        y: height - 82,
        size: 11,
        font: regularFont,
        color: rgb(0.5, 0.5, 0.5),
      });

      // Main title
      page.drawText("Zertifikat", {
        x: width / 2 - 80,
        y: height - 160,
        size: 42,
        font: boldFont,
        color: rgb(0.1, 0.1, 0.15),
      });

      page.drawText("der erfolgreichen Teilnahme", {
        x: width / 2 - 130,
        y: height - 200,
        size: 20,
        font: italicFont,
        color: rgb(0.4, 0.4, 0.4),
      });

      // Name
      const nameWidth = boldFont.widthOfTextAtSize(name, 36);
      page.drawText(name, {
        x: width / 2 - nameWidth / 2,
        y: height - 270,
        size: 36,
        font: boldFont,
        color: rgb(0.388, 0.4, 0.945),
      });

      // Underline for name
      page.drawLine({
        start: { x: width / 2 - nameWidth / 2 - 10, y: height - 280 },
        end: { x: width / 2 + nameWidth / 2 + 10, y: height - 280 },
        thickness: 2,
        color: rgb(0.388, 0.4, 0.945),
        opacity: 0.4,
      });

      // Description
      const desc = "hat das SPARK KI-Training erfolgreich abgeschlossen";
      const descWidth = regularFont.widthOfTextAtSize(desc, 16);
      page.drawText(desc, {
        x: width / 2 - descWidth / 2,
        y: height - 320,
        size: 16,
        font: regularFont,
        color: rgb(0.3, 0.3, 0.3),
      });

      // Modules row
      const modules = [
        { emoji: "🏛️", title: "EU AI Act" },
        { emoji: "💬", title: "ChatGPT" },
        { emoji: "🥗", title: "Ernährung" },
        { emoji: "🌍", title: "Umwelt" },
        { emoji: "🚀", title: "Berufe" },
      ];

      const modulY = height - 385;
      modules.forEach((m, i) => {
        const x = 80 + i * 148;
        page.drawRectangle({
          x,
          y: modulY - 8,
          width: 130,
          height: 36,
          color: rgb(0.95, 0.95, 1),
          borderColor: rgb(0.388, 0.4, 0.945),
          borderWidth: 1,
          borderOpacity: 0.3,
        });
        page.drawText(`${m.emoji} ${m.title}`, {
          x: x + 10,
          y: modulY + 2,
          size: 11,
          font: boldFont,
          color: rgb(0.388, 0.4, 0.945),
        });
      });

      // XP
      page.drawText(`${totalXP} XP erreicht`, {
        x: width / 2 - 60,
        y: modulY - 40,
        size: 14,
        font: boldFont,
        color: rgb(0.388, 0.4, 0.945),
      });

      // Date
      const date = new Date().toLocaleDateString("de-CH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      page.drawText(`Ausgestellt am ${date}`, {
        x: 60,
        y: 40,
        size: 11,
        font: regularFont,
        color: rgb(0.5, 0.5, 0.5),
      });

      // MMIND signature
      page.drawText("MMIND GmbH · Schaan, Liechtenstein · mmind.ai", {
        x: width - 320,
        y: 40,
        size: 11,
        font: regularFont,
        color: rgb(0.5, 0.5, 0.5),
      });

      // Generate and download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SPARK-Zertifikat-${name.replace(/\s+/g, "-")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      // Track download in DB
      await fetch("/api/zertifikat/download", { method: "POST" }).catch(() => {});
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setGenerating(false);
    }
  };

  if (!hasAccess) return null;

  return (
    <div className="min-h-dvh bg-[#FAFAFA] flex flex-col items-center justify-center px-4 pb-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dein Zertifikat</h1>
          <p className="text-gray-500 text-sm">
            Alle 5 Module + Quizzes abgeschlossen — herzlichen Glückwunsch!
          </p>
        </div>

        {/* Preview card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="h-2 bg-indigo-500" />
          <div className="p-6 text-center">
            <div className="text-xs text-indigo-500 font-semibold uppercase tracking-widest mb-1">⚡ SPARK</div>
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

        {/* Name Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Dein Name für das Zertifikat
          </label>
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

        {/* Download Button */}
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
