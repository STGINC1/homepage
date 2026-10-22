/**
 * Decides whether a third-party page (the Zeus white-label application) may be
 * shown inside our page, based on the headers that page sends.
 */

type HeaderSource = Pick<Headers, "get">;

function directiveSources(csp: string, name: string): string[] | null {
  for (const directive of csp.split(";")) {
    const [key, ...sources] = directive.trim().split(/\s+/);
    if (key?.toLowerCase() === name) return sources;
  }
  return null;
}

function sourceMatches(source: string, origin: URL): boolean {
  const cleaned = source.replace(/^'|'$/g, "").toLowerCase();
  if (cleaned === "*") return true;
  if (cleaned === "self" || cleaned === "none") return false;
  try {
    const allowed = new URL(cleaned.includes("://") ? cleaned : `${origin.protocol}//${cleaned}`);
    if (allowed.protocol !== origin.protocol) return false;
    if (allowed.hostname.startsWith("*.")) {
      return origin.hostname.endsWith(allowed.hostname.slice(1));
    }
    return allowed.host === origin.host;
  } catch {
    return false;
  }
}

/** True when `headers` allow the page to be framed by `embedderOrigin`. */
export function isFramingAllowed(headers: HeaderSource, embedderOrigin: string): boolean {
  const origin = new URL(embedderOrigin);
  const csp = headers.get("content-security-policy");
  const ancestors = csp ? directiveSources(csp, "frame-ancestors") : null;

  // When CSP frame-ancestors is present, browsers ignore X-Frame-Options.
  if (ancestors) return ancestors.some((source) => sourceMatches(source, origin));

  const xfo = headers.get("x-frame-options")?.trim().toUpperCase();
  return !xfo || (xfo !== "DENY" && xfo !== "SAMEORIGIN");
}

/**
 * The Zeus application posts its own height and scroll requests to the parent
 * page. The apex link redirects to www, so messages can come from either origin.
 */
const ZEUS_ORIGINS: ReadonlySet<string> = new Set([
  "https://zeusplatform.net",
  "https://www.zeusplatform.net",
]);

/** Upper bound for heights and offsets, so a bad message cannot blow up the layout. */
const MAX_FRAME_PX = 50_000;

export type ZeusFrameMessage =
  | { readonly type: "resize"; readonly height: number }
  | { readonly type: "scroll"; readonly top: number };

export function isZeusOrigin(origin: string): boolean {
  return ZEUS_ORIGINS.has(origin);
}

function inRange(value: unknown, min: number): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value < MAX_FRAME_PX;
}

/** Validates a postMessage payload from the Zeus frame. Returns null when it is not one we handle. */
export function parseZeusFrameMessage(data: unknown): ZeusFrameMessage | null {
  if (!data || typeof data !== "object") return null;
  const message = data as Record<string, unknown>;

  if (message.type === "zeus:apply:resize" && inRange(message.height, 1)) {
    return { type: "resize", height: Math.ceil(message.height) };
  }
  if (message.type === "zeus:apply:scroll" && inRange(message.top, 0)) {
    return { type: "scroll", top: message.top };
  }
  return null;
}
