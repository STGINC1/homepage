import type { ReactNode } from "react";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { SectionTocChips, SectionTocSidebar } from "@/components/section-toc";
import { cssVars } from "@/lib/css-vars";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${COMPANY.legalName} collects, uses and protects your personal information, including SMS messaging.`,
  path: "/privacy",
});

const EFFECTIVE_DATE = "October 21, 2026";
const PRIVACY_EMAIL = COMPANY.emails.admin;

const COLLECTED = [
  "Full name",
  "Email address",
  "Phone number (including mobile)",
  "Physical address",
  "Employment details",
  "Form submissions & documents",
] as const;

const USES = [
  "To provide transportation and dispatch services",
  "To communicate regarding your account, services, or employment status",
  "To send SMS messages related to safety, load updates, and dispatch notifications",
  "To respond to inquiries and provide customer support",
  "To comply with legal obligations",
] as const;

const SHARING = [
  "With service providers who assist in operating our business (e.g., payroll processors, insurance providers, and the email service that delivers messages sent through our website), under strict confidentiality",
  "As required by law or court order",
  "During a business transfer (e.g., merger or acquisition), with appropriate safeguards",
] as const;

const SMS_POINTS = [
  "We will use your number only for purposes related to your service, employment, or account status",
  "We will not share your phone number or SMS consent data with third parties for marketing",
  "You may receive reminders, updates, or alerts via SMS (frequency varies)",
  "You can opt out anytime by replying STOP or ask for help by replying HELP",
] as const;

const RIGHTS = [
  { title: "Access", body: "View or update your personal information" },
  { title: "Withdraw", body: "Revoke your consent at any time" },
  { title: "Delete", body: "Request deletion of your data" },
] as const;

interface PolicySection {
  id: string;
  title: string;
  content: ReactNode;
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const SECTIONS: readonly PolicySection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>We may collect the following types of personal information:</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {COLLECTED.map((item) => (
            <li key={item} className="rounded-xl bg-paper-2 px-4 py-3 font-medium text-ink">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5">
          We do not collect data from third-party sources. All information is provided directly by you.
        </p>
        <p className="mt-3">
          When you use the quote form on our website, we collect the details you enter so we can respond to
          your request. Our website does not use advertising or tracking cookies.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect for the following purposes:</p>
        <BulletList items={USES} />
      </>
    ),
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    content: (
      <>
        <p className="font-semibold text-ink">
          We do not sell, rent, or share your personal information for marketing purposes.
        </p>
        <p className="mt-3">We may share your information only in the following limited situations:</p>
        <BulletList items={SHARING} />
      </>
    ),
  },
  {
    id: "sms-privacy",
    title: "SMS & Mobile Messaging Privacy",
    content: (
      <>
        <p>If you provide your mobile number and opt in to receive SMS messages:</p>
        <BulletList items={SMS_POINTS} />
        <p className="mt-5 rounded-xl border-l-4 border-brand bg-brand/5 px-4 py-3 text-ink">
          Standard messaging rates may apply. Consent is not a condition of employment or service.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <p>
        We maintain appropriate administrative, technical, and physical safeguards to protect your personal
        information. However, no method of transmission over the internet is 100% secure, and we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {RIGHTS.map((right) => (
            <li key={right.title} className="reveal-zoom rounded-2xl bg-ink p-5 text-paper">
              <span className="font-display text-lg font-extrabold text-brand-bright">{right.title}</span>
              <span className="mt-1 block text-sm text-paper/75">{right.body}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5">
          To exercise these rights, please contact us at{" "}
          <a
            href={`mailto:${PRIVACY_EMAIL}`}
            className="font-semibold text-brand-deep underline decoration-brand-deep/30 underline-offset-4 hover:decoration-brand-deep"
          >
            {PRIVACY_EMAIL}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy occasionally. The revised version will be posted on our website with
        the updated effective date.
      </p>
    ),
  },
];

const TOC_ITEMS = SECTIONS.map(({ id, title }) => ({ id, title }));

export default function PrivacyPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Privacy Policy"
        title={
          <>
            Your privacy <span className="text-gradient">matters to us.</span>
          </>
        }
        intro="Learn how we protect and manage your information."
      >
        <p className="text-sm font-semibold tracking-[0.18em] text-paper/60 uppercase">
          Effective date: {EFFECTIVE_DATE}
        </p>
      </PageHero>

      <section aria-label="Privacy policy" className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-14">
          <nav aria-label="On this page" className="hidden lg:block">
            <SectionTocSidebar items={TOC_ITEMS} />
          </nav>

          <div className="min-w-0 max-w-3xl">
            <SectionTocChips items={TOC_ITEMS} />
            <div className="reveal text-lg leading-relaxed text-stone">
              <p>
                <strong className="text-ink">
                  {COMPANY.legalName} (&quot;{COMPANY.shortName},&quot; &quot;we,&quot; &quot;us,&quot; or
                  &quot;our&quot;)
                </strong>{" "}
                respects your privacy and is committed to protecting your personal information.
              </p>
              <p className="mt-4">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you use our website, services, or communicate with us, including via SMS text messages.
                By using our services or providing your information, you agree to the practices described in
                this policy.
              </p>
            </div>

            <div className="mt-14 space-y-6">
              {SECTIONS.map((section, index) => (
                <article
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-title`}
                  className={`${index % 2 === 0 ? "reveal-left" : "reveal-right"} card scroll-mt-36 p-7 hover:translate-y-0 sm:p-10 lg:scroll-mt-28`}
                  style={cssVars({ "--d": 0 })}
                >
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden="true" className="font-display text-4xl font-black text-brand/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 id={`${section.id}-title`} className="text-2xl font-extrabold sm:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-5 leading-relaxed text-stone">{section.content}</div>
                </article>
              ))}
            </div>

            <aside
              aria-labelledby="privacy-questions"
              className="reveal relative mt-10 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--color-lapis)_0%,var(--color-brand-deep)_100%)] p-8 text-white sm:p-10"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(60%_90%_at_100%_0%,rgb(20_179_245/0.5),transparent_70%)]"
              />
              <div className="relative">
                <h2 id="privacy-questions" className="text-2xl font-extrabold sm:text-3xl">
                  Questions About This Policy?
                </h2>
                <p className="mt-3 text-white/85">
                  If you have any questions or concerns about this Privacy Policy, please contact us:
                </p>
                <address className="mt-6 grid gap-4 not-italic sm:grid-cols-3">
                  <a href={`mailto:${PRIVACY_EMAIL}`} className="flex items-start gap-2 hover:underline">
                    <MailIcon className="mt-0.5 size-5 shrink-0" />
                    <span className="break-all">{PRIVACY_EMAIL}</span>
                  </a>
                  <a href={COMPANY.phone.href} className="flex items-start gap-2 hover:underline">
                    <PhoneIcon className="mt-0.5 size-5 shrink-0" />
                    {COMPANY.phone.display}
                  </a>
                  <span className="flex items-start gap-2">
                    <PinIcon className="mt-0.5 size-5 shrink-0" />
                    <span>
                      {COMPANY.legalName}
                      <br />
                      {COMPANY.address.oneLine}
                    </span>
                  </span>
                </address>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
    </PageTransition>
  );
}
