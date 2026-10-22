/**
 * Form state shared by the quote form (browser) and its server action.
 * Kept free of zod so the validation library never ships to the browser.
 */

export type QuoteField =
  "name" | "company" | "email" | "phone" | "origin" | "destination" | "pickupDate" | "details" | "website";

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
