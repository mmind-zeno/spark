import { MODULES } from "@/data/modules";
import { fitPdfFontSize, pdfSafeText } from "@/lib/pdf-text";

export type CertificatePdfInput = {
  name: string;
  totalXP: number;
  certId: string;
  verifyUrl: string;
};

export async function generateCertificatePdf(input: CertificatePdfInput): Promise<Uint8Array> {
  const { name, totalXP, certId, verifyUrl } = input;
  const trimmedName = name.trim();

  const QRCode = (await import("qrcode")).default;
  const qrPngDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 120,
    margin: 1,
    color: { dark: "#6366F1" },
  });
  const qrBytes = Uint8Array.from(atob(qrPngDataUrl.split(",")[1]), (c) => c.charCodeAt(0));

  const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();

  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.98, 0.98, 1) });

  try {
    const bgRes = await fetch("/cert-bg.jpg");
    if (bgRes.ok) {
      const bgBytes = new Uint8Array(await bgRes.arrayBuffer());
      const isPng = bgBytes[0] === 0x89 && bgBytes[1] === 0x50;
      const bgImage = isPng ? await pdfDoc.embedPng(bgBytes) : await pdfDoc.embedJpg(bgBytes);
      page.drawImage(bgImage, { x: 0, y: 0, width, height, opacity: 0.12 });
    }
  } catch {
    // optional background
  }

  const indigo = rgb(0.388, 0.4, 0.945);
  const indigoLight = rgb(0.79, 0.8, 0.98);

  page.drawRectangle({ x: 0, y: height - 8, width, height: 8, color: indigo });
  page.drawRectangle({ x: 0, y: 0, width, height: 8, color: indigo });
  page.drawRectangle({ x: 0, y: 0, width: 8, height, color: indigo });
  page.drawRectangle({ x: width - 8, y: 0, width: 8, height, color: indigo });

  page.drawText("SPARK", { x: 60, y: height - 62, size: 24, font: boldFont, color: indigo });
  page.drawText("KI-Trainingsplattform  |  Erasmus Programm  |  MMIND GmbH", {
    x: 60,
    y: height - 82,
    size: 10,
    font: regularFont,
    color: rgb(0.55, 0.55, 0.55),
  });

  page.drawLine({
    start: { x: 60, y: height - 95 },
    end: { x: width - 60, y: height - 95 },
    thickness: 1,
    color: indigoLight,
    opacity: 0.6,
  });

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

  const nameFit = fitPdfFontSize(
    trimmedName,
    width - 120,
    (t, s) => boldFont.widthOfTextAtSize(t, s),
    36,
    18
  );
  const nameWidth = boldFont.widthOfTextAtSize(nameFit.text, nameFit.size);
  page.drawText(nameFit.text, {
    x: width / 2 - nameWidth / 2,
    y: height - 268,
    size: nameFit.size,
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

  const desc = "hat das SPARK KI-Training erfolgreich abgeschlossen";
  page.drawText(desc, {
    x: width / 2 - regularFont.widthOfTextAtSize(desc, 15) / 2,
    y: height - 312,
    size: 15,
    font: regularFont,
    color: rgb(0.3, 0.3, 0.3),
  });

  const moduleTitles = MODULES.map((m) => pdfSafeText(m.title));
  const badgeW = 138;
  const badgeH = 32;
  const badgeY = height - 375;
  const totalBadgesW = moduleTitles.length * badgeW + (moduleTitles.length - 1) * 8;
  const badgeStartX = (width - totalBadgesW) / 2;

  moduleTitles.forEach((title, i) => {
    const bx = badgeStartX + i * (badgeW + 8);
    page.drawRectangle({
      x: bx,
      y: badgeY,
      width: badgeW,
      height: badgeH,
      color: rgb(0.94, 0.94, 0.99),
      borderColor: indigoLight,
      borderWidth: 1,
    });
    const tw = boldFont.widthOfTextAtSize(title, 9);
    page.drawText(title, {
      x: bx + badgeW / 2 - tw / 2,
      y: badgeY + 11,
      size: 9,
      font: boldFont,
      color: indigo,
    });
  });

  const xpText = `${totalXP} XP erreicht`;
  page.drawText(xpText, {
    x: width / 2 - boldFont.widthOfTextAtSize(xpText, 13) / 2,
    y: badgeY - 30,
    size: 13,
    font: boldFont,
    color: indigo,
  });

  const qrImage = await pdfDoc.embedPng(qrBytes);
  const qrSize = 56;
  const qrX = width - 60 - qrSize;
  page.drawImage(qrImage, { x: qrX, y: 22, width: qrSize, height: qrSize });
  page.drawText(certId, {
    x: qrX + qrSize / 2 - boldFont.widthOfTextAtSize(certId, 7) / 2,
    y: 12,
    size: 7,
    font: boldFont,
    color: indigo,
  });

  page.drawLine({
    start: { x: 60, y: 58 },
    end: { x: width - 60, y: 58 },
    thickness: 0.5,
    color: indigoLight,
    opacity: 0.5,
  });

  const date = new Date().toLocaleDateString("de-CH", { year: "numeric", month: "long", day: "numeric" });
  page.drawText(`Ausgestellt am ${date}`, {
    x: 60,
    y: 38,
    size: 10,
    font: regularFont,
    color: rgb(0.55, 0.55, 0.55),
  });

  const sig = "MMIND GmbH  |  Schaan, Liechtenstein  |  mmind.ai";
  page.drawText(sig, {
    x: width - 60 - regularFont.widthOfTextAtSize(sig, 10),
    y: 38,
    size: 10,
    font: regularFont,
    color: rgb(0.55, 0.55, 0.55),
  });

  return pdfDoc.save();
}
