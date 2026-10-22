"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, type InputHTMLAttributes } from "react";
import { submitQuote } from "@/app/contact/actions";
import { INITIAL_QUOTE_STATE, type QuoteField } from "@/lib/quote-state";
import { ArrowIcon, CheckIcon } from "./icons";

type FieldName = QuoteField;

interface FieldProps {
  name: FieldName;
  label: string;
  error?: string;
  defaultValue?: string;
  isRequired?: boolean;
  isMultiline?: boolean;
  hint?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

function Field({ name, label, error, defaultValue, isRequired, isMultiline, hint, inputProps }: FieldProps) {
  const id = `quote-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const shared = {
    id,
    name,
    defaultValue,
    required: isRequired,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {isRequired ? (
          <span className="text-red-700"> *</span>
        ) : (
          <span className="font-normal text-stone"> (optional)</span>
        )}
      </label>
      {isMultiline ? (
        <textarea {...shared} rows={5} maxLength={2000} className="field resize-y" />
      ) : (
        <input {...shared} {...inputProps} className="field" />
      )}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-xs text-stone">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function SuccessPanel({ message }: { message: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl bg-brand/10 p-8">
      <span className="grid size-12 place-items-center rounded-full bg-brand text-white">
        <CheckIcon className="size-6" />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold outline-none">
        Request received
      </h2>
      <p className="text-stone">{message}</p>
    </div>
  );
}

export function QuoteForm() {
  const [state, formAction, isPending] = useActionState(submitQuote, INITIAL_QUOTE_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  // After a failed submit, move focus to the first field that needs fixing.
  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  if (state.status === "success") return <SuccessPanel message={state.message} />;

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};

  return (
    <form ref={formRef} action={formAction} className="relative grid gap-5" aria-describedby="quote-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          isRequired
          error={errors.name}
          defaultValue={values.name}
          inputProps={{ autoComplete: "name", minLength: 2, maxLength: 80 }}
        />
        <Field
          name="company"
          label="Company"
          error={errors.company}
          defaultValue={values.company}
          inputProps={{ autoComplete: "organization", maxLength: 120 }}
        />
        <Field
          name="email"
          label="Email"
          isRequired
          error={errors.email}
          defaultValue={values.email}
          inputProps={{ type: "email", autoComplete: "email", maxLength: 160 }}
        />
        <Field
          name="phone"
          label="Phone"
          error={errors.phone}
          defaultValue={values.phone}
          inputProps={{ type: "tel", autoComplete: "tel", inputMode: "tel" }}
        />
        <Field
          name="origin"
          label="Pickup city & state"
          isRequired
          error={errors.origin}
          defaultValue={values.origin}
          inputProps={{ placeholder: "Mason, OH", maxLength: 120 }}
        />
        <Field
          name="destination"
          label="Delivery city & state"
          isRequired
          error={errors.destination}
          defaultValue={values.destination}
          inputProps={{ placeholder: "Atlanta, GA", maxLength: 120 }}
        />
        <Field
          name="pickupDate"
          label="Pickup date"
          error={errors.pickupDate}
          defaultValue={values.pickupDate}
          inputProps={{ type: "date" }}
        />
      </div>

      <Field
        name="details"
        label="Load details"
        error={errors.details}
        defaultValue={values.details}
        hint="Commodity, weight, pallet count, appointment times, anything we should know."
        isMultiline
      />

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="quote-website">Website</label>
        <input id="quote-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary group disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Sending…" : "Send quote request"}
          {!isPending && <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />}
        </button>
        <p id="quote-status" aria-live="polite" className="text-sm font-medium text-red-700">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>

      <p className="text-xs leading-relaxed text-stone">
        By sending this form you agree to our{" "}
        <Link href="/privacy" className="font-semibold text-brand-deep underline underline-offset-2">
          Privacy Policy
        </Link>
        . We only use your details to answer your request and never sell them.
      </p>
    </form>
  );
}
