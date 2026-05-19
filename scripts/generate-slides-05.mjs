// Generate slide images for Modul 05 — KI & Berufe der Zukunft via flux-pro/v1.1
import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error("FAL_KEY required"); process.exit(1); }
fal.config({ credentials: FAL_KEY });

const OUTPUT_DIR = path.join("public", "slides", "05");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const STYLE = "cinematic digital illustration, deep purple and violet tones, futuristic professional atmosphere, soft glowing light, clean modern design, no text, no letters, no words";

const SLIDES = [
  { file: "s01.png", prompt: `${STYLE}. A human and a robot shaking hands in a modern office, balanced partnership, purple blue glow, professional atmosphere.` },
  { file: "s02.png", prompt: `${STYLE}. Rows of office desks transforming into automated workflows, some desks empty with robots, others occupied by humans doing creative work, purple violet gradient.` },
  { file: "s03.png", prompt: `${STYLE}. New profession icons floating: prompt engineer, AI trainer, ethics officer, integration specialist — connected by glowing lines, futuristic purple background.` },
  { file: "s04.png", prompt: `${STYLE}. A human conductor leading an orchestra of AI robots and machines, baton in hand, dramatic lighting, purple stage lights, empowerment theme.` },
  { file: "s05.png", prompt: `${STYLE}. A carpenter and electrician using AR glasses and tablet apps showing AI overlays on walls and wood, craftsman with technology, warm purple blue tones.` },
  { file: "s06.png", prompt: `${STYLE}. Creative studio with AI-generated art on screens, human artist reviewing and curating, Midjourney-style colorful outputs, purple creative atmosphere.` },
  { file: "s07.png", prompt: `${STYLE}. Medical scene: AI brain scan analysis on screen alongside doctor reviewing results, robot arm assisting surgery, glowing blue purple medical environment.` },
  { file: "s08.png", prompt: `${STYLE}. Personalized learning: student with adaptive AI tutor on holographic screen, different difficulty levels shown, glowing educational purple blue environment.` },
  { file: "s09.png", prompt: `${STYLE}. Aerial view of Liechtenstein Alps with digital data network overlay, mountain peaks with glowing connection lines, futuristic yet natural, purple blue twilight.` },
  { file: "s10.png", prompt: `${STYLE}. Person at laptop with free online course certificates floating around them, learning path visualized as glowing staircase, purple achievement glow.` },
  { file: "s11.png", prompt: `${STYLE}. Person standing at a crossroads with three glowing paths forward, each path labeled with question marks transforming into bright futures, purple hopeful light.` },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function generateSlide(slide, index) {
  const dest = path.join(OUTPUT_DIR, slide.file);
  if (fs.existsSync(dest)) { console.log(`[${index+1}/${SLIDES.length}] Skip ${slide.file}`); return; }
  console.log(`[${index+1}/${SLIDES.length}] Generating ${slide.file}...`);
  try {
    const result = await fal.run("fal-ai/flux-pro/v1.1", {
      input: { prompt: slide.prompt, image_size: "landscape_16_9", num_inference_steps: 28, guidance_scale: 3.5, num_images: 1, enable_safety_checker: true },
    });
    const imageUrl = result.data?.images?.[0]?.url ?? result.images?.[0]?.url;
    if (!imageUrl) throw new Error("No URL");
    await downloadFile(imageUrl, dest);
    console.log(`  ✓ ${dest}`);
  } catch (err) { console.error(`  ✗ ${slide.file}: ${err.message}`); }
}

(async () => {
  console.log("Modul 05 — KI & Berufe der Zukunft (flux-pro/v1.1)\n");
  for (let i = 0; i < SLIDES.length; i++) {
    await generateSlide(SLIDES[i], i);
    if (i < SLIDES.length - 1) await new Promise(r => setTimeout(r, 600));
  }
  console.log("\nDone!");
})();
