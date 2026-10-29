"use server";

import { headers } from "next/headers";
import { clientIp } from "@/lib/client-ip";
import { createRateLimiter } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/send-email";
import { COMPANY } from "@/lib/site";
import { formatSmsConsentText, parseSmsConsent } from "@/lib/sms-consent";
import type { SmsConsentState } from "@/lib/sms-consent-state";

const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const limiter = createRateLimiter(MAX_REQUESTS_PER_WINDOW, WINDOW_MS);
const MAX_USER_AGENT_LENGTH = 300;

const SUCCESS: SmsConsentState = {
  status: "success",
  message:
    "Thanks! You're signed up for text updates. Reply STOP to any message to opt out.",
};

function text(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

export async function saveSmsConsent(
  _previous: SmsConsentState,
  formData: FormData,
): Promise<SmsConsentState> {
  const raw = {
    phone: text(formData, "phone"),
    smsConsent: text(formData, "smsConsent"),
    website: text(formData, "website"),
  };
  const values = { phone: raw.phone, smsConsent: raw.smsConsent };

  // Bots fill the hidden field. Pretend it worked so they move on.
  if (raw.website) return SUCCESS;

  const ip = await clientIp();
  if (ip && !limiter.check(ip)) {
    return {
      status: "error",
      message: `Too many tries in a short time. Please call ${COMPANY.phone.display} or try again in a few minutes.`,
      fieldErrors: {},
      values,
    };
  }

  const parsed = parseSmsConsent(raw);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Please check the fields below.",
      fieldErrors: parsed.fieldErrors,
      values,
    };
  }

  const userAgent =
    (await headers()).get("user-agent")?.slice(0, MAX_USER_AGENT_LENGTH) ??
    null;
  const result = await sendEmail(
    {
      subject: `SMS opt-in: ${parsed.data.phone}`,
      text: formatSmsConsentText({
        phone: parsed.data.phone,
        receivedAt: new Date(),
        ip,
        userAgent,
      }),
    },
    "sms-consent",
  );
  if (!result.ok) {
    return {
      status: "error",
      message: `We couldn't save that right now. Please call us at ${COMPANY.phone.display}.`,
      fieldErrors: {},
      values,
    };
  }

  return SUCCESS;
}
