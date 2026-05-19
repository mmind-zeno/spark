// Generate slide images for Modul 04 — KI & Umwelt via flux-pro/v1.1
// Usage: node scripts/generate-slides-04.mjs

import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error("FAL_KEY required"); process.exit(1); }

fal.config({ credentials: FAL_KEY });

const OUTPUT_DIR = path.join("public", "slides", "04");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const STYLE =
  "modern digital illustration, deep blue and green earth tones, cinematic lighting, clean professional design, no text, no letters, no words, environmental and technology theme";

const SLIDES = [
  {
    file: "s01.png",
    prompt: `${STYLE}. A planet Earth split in half: one side lush green forest, the other side glowing data center servers. AI energy balance concept, blue and green tones.`,
  },
  {
    file: "s02.png",
    prompt: `${STYLE}. Energy consumption comparison visualization: tiny laptop, medium phone, large server rack with heat waves, water droplets showing cooling costs. Dark blue to green gradient.`,
  },
  {
    file: "s03.png",
    prompt: `${STYLE}. Satellite orbiting Earth with climate data beams, weather patterns visible below, AI brain overlaid on atmosphere, storm systems being analyzed. Deep space blue tones.`,
  },
  {
    file: "s04.png",
    prompt: `${STYLE}. Aerial view of a futuristic smart city at night, glowing traffic flow lines, intelligent street lights, green energy indicators, data network overlay. Blue green cityscape.`,
  },
  {
    file: "s05.png",
    prompt: `${STYLE}. Whale jumping from ocean with AI recognition lines around it, bird flying with sound wave visualization, rainforest with acoustic sensor nodes in trees. Rich green blue.`,
  },
  {
    file: "s06.png",
    prompt: `${STYLE}. Wind turbines and solar panels connected to an AI control center, energy flow visualization with glowing lines, battery storage units, smart grid network. Green energy theme.`,
  },
  {
    file: "s07.png",
    prompt: `${STYLE}. Robotic arm sorting recyclables on a conveyor belt, camera vision overlays identifying materials, clean facility with color-coded bins. Blue white industrial clean style.`,
  },
  {
    file: "s08.png",
    prompt: `${STYLE}. Carbon footprint comparison chart as visual icons: laptop, phone, Netflix screen, video call, ChatGPT bubble, airplane — with size proportional to CO2. Earth tones blue green.`,
  },
  {
    file: "s09.png",
    prompt: `${STYLE}. Green data center powered by solar and wind, cool nordic landscape, servers with leaf/eco icons, renewable energy certification badge. Cool blue green nordic tones.`,
  },
  {
    file: "s10.png",
    prompt: `${STYLE}. Liechtenstein and Switzerland mountain landscape with solar panels on rooftops, AI-connected smart meters, hydroelectric dam with data overlay. Alpine green blue.`,
  },
  {
    file: "s11.png",
    prompt: `${STYLE}. Five concrete action steps shown as icons in a rising arc: phone with eco app, green cloud, CO2 calculator, share/network icon, globe with data. Hopeful green blue gradient.`,
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
    const result = await fal.run("fal-ai/flux-pro/v1.1", {
      input: {
        prompt: slide.prompt,
        image_size: "landscape_16_9",
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
      },
    });
    const imageUrl = result.data?.images?.[0]?.url ?? result.images?.[0]?.url;
    if (!imageUrl) throw new Error(`No URL. Keys: ${Object.keys(result.data ?? result).join(", ")}`);
    await downloadFile(imageUrl, dest);
    console.log(`  ✓ ${dest}`);
  } catch (err) {
    console.error(`  ✗ ${slide.file}: ${err.message}`);
  }
}

(async () => {
  console.log(`Modul 04 — KI & Umwelt (flux-pro/v1.1)\n`);
  for (let i = 0; i < SLIDES.length; i++) {
    await generateSlide(SLIDES[i], i);
    if (i < SLIDES.length - 1) await new Promise(r => setTimeout(r, 800));
  }
  console.log("\nDone!");
})();
