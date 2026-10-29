/**
 * Form state for the SMS opt-in on the apply page.
 * Kept free of zod so the validation library never ships to the browser.
 */

export type SmsConsentField = "phone" | "smsConsent";

export type SmsConsentState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<SmsConsentField, string>>;
      /** What the visitor typed, so a failed submit never wipes the form. */
      values: { phone: string; smsConsent: string };
    };

export const INITIAL_SMS_CONSENT_STATE: SmsConsentState = { status: "idle" };
