"use server";

import { clientIp } from "@/lib/client-ip";
import { formDataToObject, parseQuote } from "@/lib/quote-schema";
import { quoteEmail } from "@/lib/quote-email";
import { QUOTE_SUCCESS, type QuoteActionResult, type QuoteFormState } from "@/lib/quote-state";
import { createRateLimiter } from "@/lib/rate-limit";
import { COMPANY } from "@/lib/site";

const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const limiter = createRateLimiter(MAX_REQUESTS_PER_WINDOW, WINDOW_MS);

function failure(message: string, values: Record<string, string>): QuoteFormState {
  return { status: "error", message, fieldErrors: {}, values };
}

/** Checks the quote request. The browser then emails it (see withBrowserDelivery). */
export async function submitQuote(_previous: QuoteFormState, formData: FormData): Promise<QuoteActionResult> {
  const raw = formDataToObject(formData);
  const values = { ...raw, website: "" };

  // Bots fill the hidden field. Pretend it worked so they move on.
  if (raw.website) return QUOTE_SUCCESS;

  const key = await clientIp();
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

  return { status: "send", email: quoteEmail(parsed.data), values };
}
