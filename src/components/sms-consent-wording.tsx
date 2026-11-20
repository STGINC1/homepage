import { SMS_CONSENT_PARTS } from "@/lib/sms";

/**
 * SMS consent wording for a checkbox label. Uses block spans, not a list,
 * because a <label> may only hold inline content.
 */
export function SmsConsentWording() {
  return (
    <>
      <span className="block">{SMS_CONSENT_PARTS.intro}</span>
      {SMS_CONSENT_PARTS.examples.map((example) => (
        <span key={example} className="block pl-3">
          • {example}
        </span>
      ))}
      <span className="block">{SMS_CONSENT_PARTS.closing}</span>
    </>
  );
}
