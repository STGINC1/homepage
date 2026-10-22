import { z } from "zod";
import type { FieldErrors } from "./quote-state";

const PHONE_DIGITS = /^\+?1?\d{10}$/;

const trimmed = (max: number) => z.string().trim().max(max);

export const quoteSchema = z.object({
  name: trimmed(80).min(2, "Please enter your name."),
  company: trimmed(120).optional().default(""),
  email: z.email("Please enter a valid email address.").max(160),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s().-]/g, ""))
    .refine((value) => value === "" || PHONE_DIGITS.test(value), {
      message: "Please enter a 10-digit US phone number.",
    }),
  origin: trimmed(120).min(2, "Where does the load pick up?"),
  destination: trimmed(120).min(2, "Where does the load deliver?"),
  pickupDate: z
    .string()
    .trim()
    .refine((value) => value === "" || !Number.isNaN(Date.parse(value)), {
      message: "Please pick a valid date.",
    }),
  details: trimmed(2000).optional().default(""),
  // Honeypot: real people never see or fill this field.
  website: z.string().max(0, "Spam detected.").optional().default(""),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

const FIELD_NAMES = [
  "name",
  "company",
  "email",
  "phone",
  "origin",
  "destination",
  "pickupDate",
  "details",
  "website",
] as const satisfies readonly (keyof QuoteInput)[];

export function formDataToObject(formData: FormData): Record<string, string> {
  return Object.fromEntries(
    FIELD_NAMES.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  );
}

export type ParseResult = { ok: true; data: QuoteInput } | { ok: false; fieldErrors: FieldErrors };

export function parseQuote(raw: Record<string, string>): ParseResult {
  const result = quoteSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };

  const fieldErrors = result.error.issues.reduce<FieldErrors>((acc, issue) => {
    const key = issue.path[0] as keyof QuoteInput | undefined;
    if (!key || acc[key]) return acc;
    return { ...acc, [key]: issue.message };
  }, {});
  return { ok: false, fieldErrors };
}
