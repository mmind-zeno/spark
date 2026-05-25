import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://spark.mmind.space";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/datenschutz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/verify`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/zertifikat`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
