import { z } from "zod";
import { optionalUsPhone } from "./quote-schema";
import type { SmsConsentState } from "./sms-consent-state";
import { SMS_CONSENT_TEXT } from "./sms";

/** SMS opt-in sent from the apply page, next to the embedded driver application. */
const smsConsentSchema = z.object({
  phone: optionalUsPhone.refine((value) => value !== "", {
    message: "Please enter the mobile number you want texts on.",
  }),
  // Unchecked boxes are not sent, so this only passes when the visitor checks it.
  smsConsent: z.literal("on", "Check the box to agree to text messages."),
  // Honeypot: real people never see or fill this field.
  website: z.string().max(0, "Spam detected.").optional().default(""),
});

export type SmsConsentInput = z.infer<typeof smsConsentSchema>;

type FieldErrors = Extract<SmsConsentState, { status: "error" }>["fieldErrors"];

export type SmsConsentParseResult =
  { ok: true; data: SmsConsentInput } | { ok: false; fieldErrors: FieldErrors };

export function parseSmsConsent(
  raw: Record<string, string>,
): SmsConsentParseResult {
  const result = smsConsentSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };

  const fieldErrors = result.error.issues.reduce<FieldErrors>((acc, issue) => {
    const key = issue.path[0];
    if ((key !== "phone" && key !== "smsConsent") || acc[key]) return acc;
    return { ...acc, [key]: issue.message };
  }, {});
  return { ok: false, fieldErrors };
}

export interface SmsConsentRecord {
  phone: string;
  receivedAt: Date;
  ip: string | null;
  userAgent: string | null;
}

/** Email body kept as the opt-in record: who, when, from where, and the exact wording they agreed to. */
export function formatSmsConsentText(record: SmsConsentRecord): string {
  const lines: [string, string][] = [
    ["Mobile number", record.phone],
    ["Opted in at", record.receivedAt.toISOString()],
    ["Page", "/apply (driver application)"],
    ["IP address", record.ip ?? "unknown"],
    ["Browser", record.userAgent ?? "unknown"],
  ];
  const body = lines.map(([label, value]) => `${label}: ${value}`).join("\n");
  return `New SMS opt-in from the website\n\n${body}\n\nThey checked the box next to this text:\n"${SMS_CONSENT_TEXT}"\n`;
}
