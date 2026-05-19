// Generate slide images for Modul 02 (ChatGPT Deep Dive) via fal.ai
// Usage: node scripts/generate-slides-02.mjs
// Requires FAL_KEY env variable

import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("FAL_KEY environment variable is required");
  process.exit(1);
}

fal.config({ credentials: FAL_KEY });

const OUTPUT_DIR = path.join("public", "slides", "02");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const STYLE =
  "modern flat digital illustration, warm amber and golden tones, soft gradient background, clean minimal design, educational infographic style, no text, no letters, no words, professional quality";

const SLIDES = [
  {
    file: "s01.png",
    prompt: `${STYLE}. A friendly AI chatbot floating in amber light surrounded by speech bubbles, text waves, and book icons. Warm amber-white color palette.`,
  },
  {
    file: "s02.png",
    prompt: `${STYLE}. Abstract neural network with glowing token squares flowing through connected nodes, deep navy background with golden amber highlights.`,
  },
  {
    file: "s03.png",
    prompt: `${STYLE}. Person at a laptop with a bright golden lightbulb above their head, clean desk, warm amber glow from screen.`,
  },
  {
    file: "s04.png",
    prompt: `${STYLE}. Four distinct technique icons (theater mask, brain with gears, clipboard, circular arrows) in amber blue green purple, 2x2 grid layout.`,
  },
  {
    file: "s05.png",
    prompt: `${STYLE}. Busy professional with floating productivity icons: email envelope, calendar, magnifying glass, lightbulb, globe — orbiting an AI assistant, amber golden tones.`,
  },
  {
    file: "s06.png",
    prompt: `${STYLE}. Rising productivity arrow chart with small professional silhouettes in marketing, tech, education roles connected by golden lines, warm amber gradient.`,
  },
  {
    file: "s07.png",
    prompt: `${STYLE}. Customizable robot assistant with gear settings icons, personal sliders, configuration panel, amber and soft blue palette.`,
  },
  {
    file: "s08.png",
    prompt: `${STYLE}. Magnifying glass over a chat bubble revealing a red warning glitch symbol inside, fact-check checkmarks around it, amber background with red accent.`,
  },
  {
    file: "s09.png",
    prompt: `${STYLE}. Golden padlock shield protecting private documents, gentle barrier between a document stack and cloud upload icon, amber and navy tones.`,
  },
  {
    file: "s10.png",
    prompt: `${STYLE}. Three AI model trophies on a podium, each a distinct color (green, blue, orange), stars above each, comparison theme, minimal clean design.`,
  },
  {
    file: "s11.png",
    prompt: `${STYLE}. Seven-step staircase going upward with glowing achievement stars on each step, confident figure climbing, golden sunrise at the top, amber warm light.`,
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    protocol
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          file.close();
          fs.unlinkSync(dest);
          return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        }
        response.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
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
    const result = await fal.run("fal-ai/flux/schnell", {
      input: {
        prompt: slide.prompt,
        image_size: "landscape_16_9",
        num_inference_steps: 4,
        num_images: 1,
        enable_safety_checker: true,
      },
    });

    const imageUrl = result.data?.images?.[0]?.url ?? result.images?.[0]?.url;
    if (!imageUrl) throw new Error("No image URL in response");

    await downloadFile(imageUrl, dest);
    console.log(`  ✓ ${dest}`);
  } catch (err) {
    console.error(`  ✗ Failed ${slide.file}: ${err.message}`);
  }
}

(async () => {
  console.log(`Generating ${SLIDES.length} slides for Modul 02 (ChatGPT Deep Dive)...\n`);
  for (let i = 0; i < SLIDES.length; i++) {
    await generateSlide(SLIDES[i], i);
    if (i < SLIDES.length - 1) await new Promise((r) => setTimeout(r, 600));
  }
  console.log("\nDone! Check public/slides/02/");
})();
