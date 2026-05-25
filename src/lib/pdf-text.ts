/** WinAnsi-safe text for pdf-lib StandardFonts */
export function pdfSafeText(text: string): string {
  return text
    .replace(/ä/g, "ae")
    .replace(/Ä/g, "Ae")
    .replace(/ö/g, "oe")
    .replace(/Ö/g, "Oe")
    .replace(/ü/g, "ue")
    .replace(/Ü/g, "Ue")
    .replace(/ß/g, "ss")
    .replace(/é/g, "e")
    .replace(/è/g, "e")
    .replace(/ê/g, "e")
    .replace(/à/g, "a")
    .replace(/â/g, "a")
    .replace(/[^ \w|&.,\-()/]/g, "");
}

export function sanitizeFilename(name: string): string {
  return name
    .trim()
    .replace(/[/\\?%*:|"<>]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80) || "Zertifikat";
}

export function fitPdfFontSize(
  text: string,
  maxWidth: number,
  measure: (t: string, size: number) => number,
  startSize: number,
  minSize: number
): { text: string; size: number } {
  let size = startSize;
  let safe = pdfSafeText(text);
  while (size > minSize && measure(safe, size) > maxWidth) {
    size -= 2;
  }
  if (measure(safe, size) > maxWidth && safe.length > 20) {
    safe = safe.slice(0, 20) + "...";
  }
  return { text: safe, size };
}
