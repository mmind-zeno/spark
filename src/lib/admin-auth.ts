import { timingSafeEqual } from "crypto";

export function verifyAdminSecret(provided: string | null | undefined): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !provided) return false;
  if (secret === "spark-admin-change-me") {
    console.warn("[SPARK] ADMIN_SECRET uses default value — change before production.");
  }
  if (secret.length !== provided.length) return false;
  try {
    return timingSafeEqual(Buffer.from(secret), Buffer.from(provided));
  } catch {
    return false;
  }
}

export function getAdminSecretFromRequest(req: Request): string | null {
  const header = req.headers.get("x-admin-secret");
  if (header) return header;
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}
