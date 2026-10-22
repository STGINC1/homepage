"use server";

import { headers } from "next/headers";
import { formDataToObject, parseQuote } from "@/lib/quote-schema";
import type { QuoteFormState } from "@/lib/quote-state";
import { createRateLimiter } from "@/lib/rate-limit";
import { sendQuote } from "@/lib/send-quote";
import { COMPANY } from "@/lib/site";

const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const limiter = createRateLimiter(MAX_REQUESTS_PER_WINDOW, WINDOW_MS);

const SUCCESS: QuoteFormState = {
  status: "success",
  message: "Thanks! Your request is in. We'll get back to you shortly, usually the same business day.",
};

/**
 * Client IP for rate limiting. Hosts like Vercel set x-real-ip themselves;
 * otherwise use the last x-forwarded-for hop (added by our own proxy), since
 * the first hop is whatever the client claims.
 */
async function clientKey(): Promise<string | null> {
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

function failure(message: string, values: Record<string, string>): QuoteFormState {
  return { status: "error", message, fieldErrors: {}, values };
}

export async function submitQuote(_previous: QuoteFormState, formData: FormData): Promise<QuoteFormState> {
  const raw = formDataToObject(formData);
  const values = { ...raw, website: "" };

  // Bots fill the hidden field. Pretend it worked so they move on.
  if (raw.website) return SUCCESS;

  const key = await clientKey();
  // Without a known client IP, skip limiting rather than lump every visitor together.
  if (key && !limiter.check(key)) {
    return failure(
      `Too many requests in a short time. Please call ${COMPANY.phone.display} or try again in a few minutes.`,
      values,
    );
  }

  const parsed = parseQuote(raw);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.fieldErrors,
      values,
    };
  }

  const result = await sendQuote(parsed.data);
  if (!result.ok) {
    return failure(
      `We couldn't send your request right now. Please call us at ${COMPANY.phone.display}. Sorry for the trouble.`,
      values,
    );
  }

  return SUCCESS;
}
