// Generate slide images for Modul 03 — KI & Ernährung via gpt-image-1
// Usage: node scripts/generate-slides-03.mjs

import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error("FAL_KEY required"); process.exit(1); }

fal.config({ credentials: FAL_KEY });

const OUTPUT_DIR = path.join("public", "slides", "03");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const STYLE =
  "modern flat digital illustration, fresh green and white tones, soft gradient background, clean minimal design, no text, no letters, no words, professional educational infographic style, warm natural colors";

const SLIDES = [
  {
    file: "s01.png",
    prompt: `${STYLE}. A colorful plate of food transforming into data streams and DNA helix, representing AI analyzing nutrition. Fresh green, healthy food icons surrounding a glowing brain.`,
  },
  {
    file: "s02.png",
    prompt: `${STYLE}. A human body silhouette with DNA strands, microbiome bacteria icons, and a continuous glucose monitor on wrist, all connected to a central AI chip. Green and teal tones.`,
  },
  {
    file: "s03.png",
    prompt: `${STYLE}. A smartphone scanning a product barcode in a supermarket aisle, green checkmark or red X appearing above the product, clean minimal illustration, fresh green palette.`,
  },
  {
    file: "s04.png",
    prompt: `${STYLE}. A friendly AI robot chef wearing an apron, surrounded by floating ingredient icons, recipe cards, and cooking utensils. Warm green and cream tones.`,
  },
  {
    file: "s05.png",
    prompt: `${STYLE}. A cow, chicken, and lentil bowl with CO2 cloud icons showing different sizes above each, connected by a scale showing environmental impact. Earth tones and green.`,
  },
  {
    file: "s06.png",
    prompt: `${STYLE}. Side-by-side comparison of three app interfaces on smartphones showing food scanning apps, with checkmarks and feature icons. Clean flat style, green white tones.`,
  },
  {
    file: "s07.png",
    prompt: `${STYLE}. A conveyor belt with fruits and vegetables, a camera scanning them with green checkmarks, quality control robots with magnifying glasses. Fresh clean illustration.`,
  },
  {
    file: "s08.png",
    prompt: `${STYLE}. A drone flying over green agricultural fields, scanning crops with colored overlays showing plant health data, precision farming visualization. Aerial perspective, green tones.`,
  },
  {
    file: "s09.png",
    prompt: `${STYLE}. A smartphone app interface showing a food intolerance profile with colorful badges (gluten, lactose, histamine), barcode scanner beam, green and white minimal design.`,
  },
  {
    file: "s10.png",
    prompt: `${STYLE}. Futuristic kitchen with 3D food printer, fermentation jars with glowing microbes, smart fridge with AI display showing nutritional data. Green teal futuristic style.`,
  },
  {
    file: "s11.png",
    prompt: `${STYLE}. A person holding a phone scanning food with one hand and holding a salad bowl with the other, ChatGPT-style chat bubble with recipe suggestion floating above. Fresh green tones.`,
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close(); fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function generateSlide(slide, index) {
  const dest = path.join(OUTPUT_DIR, slide.file);
  if (fs.existsSync(dest)) {
    console.log(`[${index + 1}/${SLIDES.length}] Skip ${slide.file} (exists)`);
    return;
  }
  console.log(`[${index + 1}/${SLIDES.length}] Generating ${slide.file}...`);
  try {
    const result = await fal.run("fal-ai/imagen4", {
      input: {
        prompt: slide.prompt,
        aspect_ratio: "16:9",
      },
    });
    const imageUrl = result.images?.[0]?.url ?? result.data?.images?.[0]?.url;
    if (!imageUrl) throw new Error(`No URL. Keys: ${Object.keys(result.data ?? result).join(", ")}`);
    await downloadFile(imageUrl, dest);
    console.log(`  ✓ ${dest}`);
  } catch (err) {
    console.error(`  ✗ ${slide.file}: ${err.message}`);
  }
}

(async () => {
  console.log(`Modul 03 — KI & Ernährung (gpt-image-1)\n`);
  for (let i = 0; i < SLIDES.length; i++) {
    await generateSlide(SLIDES[i], i);
    if (i < SLIDES.length - 1) await new Promise(r => setTimeout(r, 800));
  }
  console.log("\nDone!");
})();
