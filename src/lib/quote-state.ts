import type { ReadyToSend } from "./send-email";
import { COMPANY } from "./site";

/**
 * Form state shared by the quote form (browser) and its server action.
 * Kept free of zod so the validation library never ships to the browser.
 */

export type QuoteField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "origin"
  | "destination"
  | "pickupDate"
  | "details"
  | "smsConsent"
  | "website";

export type FieldErrors = Partial<Record<QuoteField, string>>;

export type QuoteFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors: FieldErrors;
      /** What the visitor typed, so a failed submit never wipes the form. */
      values: Record<string, string>;
    };

export const INITIAL_QUOTE_STATE: QuoteFormState = { status: "idle" };

/** What the server action returns: a finished state, or a valid request for the browser to email. */
export type QuoteActionResult = QuoteFormState | ReadyToSend<Record<string, string>>;

export const QUOTE_SUCCESS: QuoteFormState = {
  status: "success",
  message: "Thanks! Your request is in. We'll get back to you shortly, usually the same business day.",
};

export function quoteSendFailed(values: Record<string, string>): QuoteFormState {
  return {
    status: "error",
    message: `We couldn't send your request right now. Please call us at ${COMPANY.phone.display}. Sorry for the trouble.`,
    fieldErrors: {},
    values,
  };
}
