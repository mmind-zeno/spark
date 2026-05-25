// Generate local placeholder PNG assets (no API key required)
// Usage: npm run assets:placeholders
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

const MODULES = [
  { id: "01", color: "#EF4444", emoji: "🏛️", title: "EU AI Act" },
  { id: "02", color: "#F59E0B", emoji: "💬", title: "ChatGPT" },
  { id: "03", color: "#22C55E", emoji: "🥗", title: "Ernährung" },
  { id: "04", color: "#14B8A6", emoji: "🌍", title: "Umwelt" },
  { id: "05", color: "#A855F7", emoji: "🚀", title: "Berufe" },
];

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

async function gradientPng(w, h, colorHex, label, sublabel) {
  const { r, g, b } = hexToRgb(colorHex);
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:rgb(${Math.min(r + 40, 255)},${Math.min(g + 40, 255)},${Math.min(b + 40, 255)})"/>
        <stop offset="100%" style="stop-color:rgb(${Math.max(r - 30, 0)},${Math.max(g - 30, 0)},${Math.max(b - 30, 0)})"/>
      </linearGradient>
      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1.5" fill="white" opacity="0.12"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#dots)"/>
    <text x="50%" y="45%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(w * 0.08)}" fill="white" opacity="0.9">${label}</text>
    ${sublabel ? `<text x="50%" y="58%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(w * 0.035)}" fill="white" opacity="0.65">${sublabel}</text>` : ""}
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function write(file, buffer) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(buffer).toFile(file);
  console.log(`  ✓ ${path.relative(path.join(__dirname, ".."), file)}`);
}

(async () => {
  console.log("Generating placeholder assets...\n");

  // Branding
  await write(path.join(PUBLIC, "spark-logo.png"), await gradientPng(512, 512, "#6366F1", "⚡", "SPARK"));
  await write(path.join(PUBLIC, "spark-header.jpg"), await gradientPng(1920, 1080, "#4338CA", "SPARK", "KI-Trainingsplattform"));
  await write(path.join(PUBLIC, "cert-bg.jpg"), await gradientPng(1684, 1190, "#EEF2FF", "", ""));

  // Icons
  for (const [name, size] of [["favicon-32.png", 32], ["icon-192.png", 192], ["apple-touch-icon.png", 180]]) {
    await write(path.join(PUBLIC, name), await gradientPng(size, size, "#6366F1", "⚡", ""));
  }

  // Module headers
  for (const mod of MODULES) {
    await write(
      path.join(PUBLIC, `header-${mod.id}.jpg`),
      await gradientPng(1920, 1080, mod.color, mod.emoji, mod.title)
    );
  }

  // Slide images (11 per module)
  for (const mod of MODULES) {
    for (let i = 1; i <= 11; i++) {
      const slideNum = String(i).padStart(2, "0");
      await write(
        path.join(PUBLIC, "slides", mod.id, `s${slideNum}.png`),
        await gradientPng(800, 450, mod.color, mod.emoji, `Slide ${i}`)
      );
    }
  }

  console.log("\nDone! Replace with fal.ai assets via npm run assets:ai when FAL_KEY is set.");
})();
