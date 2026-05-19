// Generate per-module header images with fal-ai/imagen4
import { fal } from "@fal-ai/client";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error("FAL_KEY required"); process.exit(1); }
fal.config({ credentials: FAL_KEY });

const modules = [
  {
    id: "01",
    prompt: "Panoramic header image for EU AI Act course. Abstract European parliament architecture with glowing digital circuits overlay, indigo and blue tones, clean and professional, wide banner format, no text",
    filename: "header-01.jpg",
  },
  {
    id: "02",
    prompt: "Panoramic header image for ChatGPT deep dive course. Warm amber glowing AI chat interface, conversational bubbles floating in digital space, abstract neural network background, wide banner format, no text",
    filename: "header-02.jpg",
  },
  {
    id: "03",
    prompt: "Panoramic header image for AI and nutrition course. Vibrant green fresh vegetables and fruits with digital scan overlays and health data visualization, fresh and modern, wide banner format, no text",
    filename: "header-03.jpg",
  },
  {
    id: "04",
    prompt: "Panoramic header image for AI and environment course. Aerial view of green forest merging with clean energy technology — solar panels and wind turbines, teal and green tones, wide banner format, no text",
    filename: "header-04.jpg",
  },
  {
    id: "05",
    prompt: "Panoramic header image for AI and jobs of the future course. Futuristic office where humans and AI collaborate, purple and violet accent lighting, modern workspace, wide banner format, no text",
    filename: "header-05.jpg",
  },
];

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

const outDir = path.join(__dirname, "..", "public");

for (const mod of modules) {
  console.log(`[${mod.id}] Generating ${mod.filename}...`);
  try {
    const result = await fal.run("fal-ai/imagen4", {
      input: {
        prompt: mod.prompt,
        aspect_ratio: "16:9",
        num_images: 1,
        safety_filter_level: "block_only_high",
      },
    });

    const imageUrl =
      result.data?.images?.[0]?.url ??
      result.images?.[0]?.url;

    if (!imageUrl) {
      console.error(`  No image URL in response:`, JSON.stringify(result).slice(0, 300));
      continue;
    }

    const dest = path.join(outDir, mod.filename);
    await downloadImage(imageUrl, dest);
    console.log(`  ✓ public/${mod.filename}`);
  } catch (err) {
    console.error(`  Error: ${err.message}`);
  }
}

console.log("\nDone!");
