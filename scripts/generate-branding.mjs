// Generate logo, favicon source and dashboard header image via flux-pro/v1.1
import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error("FAL_KEY required"); process.exit(1); }
fal.config({ credentials: FAL_KEY });

const ASSETS = [
  {
    file: "public/spark-logo.png",
    prompt: "Minimalist logo icon: a single electric lightning bolt spark inside a clean circle, gradient from deep indigo to electric blue, modern flat design, professional, no text, no letters, centered composition, white background, suitable for app icon",
    size: "square_hd",
  },
  {
    file: "public/spark-header.jpg",
    prompt: "Wide panoramic hero image for an AI learning platform: abstract glowing neural network connections spreading across a dark deep blue background, small sparks and light particles, subtle gradient from dark navy to indigo, cinematic wide format, premium educational technology atmosphere, no text, no people",
    size: "landscape_16_9",
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
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

(async () => {
  console.log("Generating branding assets (flux-pro/v1.1)...\n");
  for (const asset of ASSETS) {
    console.log(`Generating ${asset.file}...`);
    try {
      const result = await fal.run("fal-ai/flux-pro/v1.1", {
        input: { prompt: asset.prompt, image_size: asset.size, num_inference_steps: 28, guidance_scale: 3.5, num_images: 1 },
      });
      const imageUrl = result.data?.images?.[0]?.url ?? result.images?.[0]?.url;
      if (!imageUrl) throw new Error("No URL");
      await downloadFile(imageUrl, asset.file);
      console.log(`  ✓ ${asset.file}`);
    } catch (err) { console.error(`  ✗ ${err.message}`); }
    await new Promise(r => setTimeout(r, 800));
  }
  console.log("\nDone! Now crop spark-logo.png to 32x32 for favicon manually or use sharp.");
})();
