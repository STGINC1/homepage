import { headers } from "next/headers";

/**
 * Client IP for rate limiting. Hosts like Vercel set x-real-ip themselves;
 * otherwise use the last x-forwarded-for hop (added by our own proxy), since
 * the first hop is whatever the client claims.
 */
export async function clientIp(): Promise<string | null> {
  const requestHeaders = await headers();
  const realIp = requestHeaders.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const hops = requestHeaders
    .get("x-forwarded-for")
    ?.split(",")
    .map((hop) => hop.trim())
    .filter(Boolean);
  return hops?.at(-1) ?? null;
}
