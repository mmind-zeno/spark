// Generate certificate background with fal-ai/imagen4
import { fal } from "@fal-ai/client";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error("FAL_KEY required"); process.exit(1); }
fal.config({ credentials: FAL_KEY });

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

console.log("Generating certificate background...");

const result = await fal.run("fal-ai/imagen4", {
  input: {
    prompt: "Elegant certificate background design. Subtle abstract geometric patterns in very light indigo and white, delicate ornamental border elements, premium paper texture feel, ultra light pastel tones #F8F9FF base, professional diploma aesthetic, landscape orientation, no text no logos",
    aspect_ratio: "4:3",
    num_images: 1,
    safety_filter_level: "block_only_high",
  },
});

const imageUrl =
  result.data?.images?.[0]?.url ??
  result.images?.[0]?.url;

if (!imageUrl) {
  console.error("No image URL:", JSON.stringify(result).slice(0, 300));
  process.exit(1);
}

const dest = path.join(__dirname, "..", "public", "cert-bg.jpg");
await downloadImage(imageUrl, dest);
console.log("✓ public/cert-bg.jpg");
