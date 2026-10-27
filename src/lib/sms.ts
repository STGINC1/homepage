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

/** Checkbox wording on every form that collects a phone number (links are added after it). */
export const SMS_CONSENT_TEXT = `By checking this box, you agree to receive ${SMS_PROGRAM.messageType} TEXT messages from ${SMS_PROGRAM.sender} at the phone number provided above. You may reply STOP to opt-out at any time. For assistance reply HELP. Messages and data rates may apply. Message frequency will vary.`;
