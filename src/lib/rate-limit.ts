/**
 * Small in-memory sliding-window limiter for the quote form.
 * It is per server instance, so it slows down spam bursts but is not a
 * global guarantee. Swap for a shared store (e.g. Redis) if traffic grows.
 */

export interface RateLimiter {
  /** Returns true when the key may proceed, false when it is over the limit. */
  check: (key: string, now?: number) => boolean;
}

const MAX_TRACKED_KEYS = 5_000;

export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  // Private to this closure; entries are replaced, never edited in place.
  const hits = new Map<string, readonly number[]>();

  function prune(now: number): void {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(key);
    }
    // Still too many live keys: drop the oldest (Map keeps insertion order).
    for (const key of hits.keys()) {
      if (hits.size <= MAX_TRACKED_KEYS / 2) break;
      hits.delete(key);
    }
  }

  return {
    check(key, now = Date.now()) {
      if (hits.size > MAX_TRACKED_KEYS) prune(now);
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      const allowed = recent.length < limit;
      hits.delete(key); // re-insert so recently active keys are pruned last
      hits.set(key, allowed ? [...recent, now] : recent);
      return allowed;
    },
  };
}
