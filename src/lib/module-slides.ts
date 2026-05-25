import type { RichSlide } from "@/data/modules-01";

export async function loadModuleSlides(moduleId: string): Promise<RichSlide[] | null> {
  switch (moduleId) {
    case "01":
      return (await import("@/data/modules-01")).MODUL_01_SLIDES;
    case "02":
      return (await import("@/data/modules-02")).MODUL_02_SLIDES;
    case "03":
      return (await import("@/data/modules-03")).MODUL_03_SLIDES;
    case "04":
      return (await import("@/data/modules-04")).MODUL_04_SLIDES;
    case "05":
      return (await import("@/data/modules-05")).MODUL_05_SLIDES;
    default:
      return null;
  }
}
