"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveSmsConsent } from "@/app/apply/actions";
import { INITIAL_SMS_CONSENT_STATE } from "@/lib/sms-consent-state";
import { SMS_CONSENT_TEXT } from "@/lib/sms";

const LINK_CLASS =
  "font-semibold text-[var(--zeus-apply-link)] underline underline-offset-2";

/**
 * SMS opt-in shown right under the embedded Zeus application, styled to blend
 * with it. The application itself lives on Zeus, so the opt-in is saved here
 * and emailed to the company inbox as the consent record.
 */
export function SmsOptIn() {
  const [state, formAction, isPending] = useActionState(
    saveSmsConsent,
    INITIAL_SMS_CONSENT_STATE,
  );

  if (state.status === "success") {
    return (
      <div className="px-4">
        <p
          role="status"
          className="mx-auto mb-12 max-w-[720px] rounded-2xl border border-[var(--zeus-apply-border)] p-6 font-[system-ui,sans-serif] shadow-sm text-sm"
        >
          {state.message}
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values =
    state.status === "error" ? state.values : { phone: "", smsConsent: "" };

  return (
    <div className="px-4">
      <form
        action={formAction}
        noValidate
        className="mx-auto mb-12 max-w-[720px] rounded-2xl border border-[var(--zeus-apply-border)] p-6 font-[system-ui,sans-serif] shadow-sm flex flex-col gap-4 text-sm"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sms-phone"
            className="font-semibold text-[var(--zeus-apply-heading)]"
          >
            Mobile number for text updates{" "}
            <span className="font-normal">(optional)</span>
          </label>
          <input
            id="sms-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            defaultValue={values.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "sms-phone-error" : undefined}
            className="rounded-xl border border-[var(--zeus-apply-border)] bg-transparent px-3 py-2.5 text-base text-[var(--zeus-apply-heading)] outline-none focus:border-[var(--zeus-apply-link)]"
          />
          {errors.phone && (
            <p id="sms-phone-error" className="font-medium text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <input
            id="sms-consent"
            name="smsConsent"
            type="checkbox"
            defaultChecked={values.smsConsent === "on"}
            aria-invalid={errors.smsConsent ? true : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--zeus-apply-link)]"
          />
          <label
            htmlFor="sms-consent"
            className="cursor-pointer leading-relaxed"
          >
            {SMS_CONSENT_TEXT} Learn more on our{" "}
            <Link href="/privacy" className={LINK_CLASS}>
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className={LINK_CLASS}>
              Terms and Conditions
            </Link>
            .
          </label>
        </div>
        {errors.smsConsent && (
          <p className="font-medium text-red-600">{errors.smsConsent}</p>
        )}

        {/* Honeypot: hidden from people and assistive tech */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label htmlFor="sms-website">Website</label>
          <input
            id="sms-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[var(--zeus-apply-link)] px-5 py-2.5 font-semibold text-white disabled:cursor-wait disabled:opacity-70"
          >
            {isPending ? "Saving…" : "Save text preference"}
          </button>
          <p aria-live="polite" className="font-medium text-red-600">
            {state.status === "error" ? state.message : ""}
          </p>
        </div>

        <nav
          aria-label="Legal"
          className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--zeus-apply-border)] pt-4"
        >
          <Link href="/privacy" className={LINK_CLASS}>
            Privacy Policy
          </Link>
          <Link href="/terms" className={LINK_CLASS}>
            SMS Terms &amp; Conditions
          </Link>
        </nav>
      </form>
    </div>
  );
}
