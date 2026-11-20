import type { ReadyToSend } from "./send-email";
import { COMPANY } from "./site";

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
      values: SmsConsentValues;
    };

export const INITIAL_SMS_CONSENT_STATE: SmsConsentState = { status: "idle" };

type SmsConsentValues = { phone: string; smsConsent: string };

/** What the server action returns: a finished state, or a valid opt-in for the browser to email. */
export type SmsConsentActionResult = SmsConsentState | ReadyToSend<SmsConsentValues>;

export const SMS_CONSENT_SUCCESS: SmsConsentState = {
  status: "success",
  message: "Thanks! You're signed up for text updates. Reply STOP to any message to opt out.",
};

export function smsConsentSendFailed(values: SmsConsentValues): SmsConsentState {
  return {
    status: "error",
    message: `We couldn't save that right now. Please call us at ${COMPANY.phone.display}.`,
    fieldErrors: {},
    values,
  };
}
