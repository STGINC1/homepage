/**
 * SMS program facts used by the quote form, Privacy Policy and SMS Terms.
 * Carrier (TCR) review compares these pages to each other, so keep the
 * wording in one place and change it here only.
 */
import { COMPANY } from "./site";

export const SMS_PROGRAM = {
  sender: COMPANY.legalName,
  messageType: "Conversational",
  maxMessagesPerWeek: 10,
  topics: [
    "Replies to your quote requests and questions",
    "Pickup, delivery and load status updates",
    "Dispatch, scheduling and appointment coordination",
    "Driver recruiting and employment follow-ups",
  ],
} as const;

/** Required by TCR, word for word, in the Privacy Policy. */
export const SMS_NO_SHARING_STATEMENT =
  "SMS opt-in and phone numbers collected for SMS communication purposes will not be shared with any third party and affiliates for marketing purposes.";

/**
 * Checkbox wording on every form that collects a phone number, in three parts:
 * the intro, the example topics (one per line on screen), then the closing.
 * Policy links are added after it by each form.
 */
export const SMS_CONSENT_PARTS = {
  intro: `By checking this box, you agree to receive ${SMS_PROGRAM.messageType} TEXT messages. Example:`,
  examples: SMS_PROGRAM.topics,
  closing: `from ${SMS_PROGRAM.sender} at the phone number provided above. You may reply STOP to opt-out at any time. For assistance reply HELP. Messages and data rates may apply. Message frequency will vary. For example, you may receive up to ${SMS_PROGRAM.maxMessagesPerWeek} SMS messages per week related to your quote requests, shipments, and dispatch updates.`,
} as const;

/** The same wording as one plain string, for the emailed consent record. */
export const SMS_CONSENT_TEXT = [
  SMS_CONSENT_PARTS.intro,
  SMS_CONSENT_PARTS.examples.join("; "),
  SMS_CONSENT_PARTS.closing,
].join(" ");
