import type { ReactNode } from "react";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { SectionTocChips, SectionTocSidebar } from "@/components/section-toc";
import { cssVars } from "@/lib/css-vars";
import { breadcrumbJsonLd } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export interface PolicySection {
  id: string;
  title: string;
  content: ReactNode;
}

interface PolicyPageProps {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  effectiveDate: string;
  path: string;
  /** Opening paragraphs shown above the numbered sections. */
  lead: ReactNode;
  sections: readonly PolicySection[];
  contactHeading: string;
}

const CONTACT_EMAIL = COMPANY.emails.admin;

export function BulletList({ items }: { items: readonly string[] }) {
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

export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="font-semibold text-brand-deep underline decoration-brand-deep/30 underline-offset-4 hover:decoration-brand-deep"
    >
      {children}
    </a>
  );
}

/** Callout used for statements carriers look for word for word. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 rounded-xl border-l-4 border-brand bg-brand/5 px-4 py-3 font-semibold text-ink">
      {children}
    </p>
  );
}

function ContactAside({ heading }: { heading: string }) {
  return (
    <aside
      aria-labelledby="policy-questions"
      className="reveal relative mt-10 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--color-lapis)_0%,var(--color-brand-deep)_100%)] p-8 text-white sm:p-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_90%_at_100%_0%,rgb(20_179_245/0.5),transparent_70%)]"
      />
      <div className="relative">
        <h2 id="policy-questions" className="text-2xl font-extrabold sm:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 text-white/85">If you have any questions or concerns, please contact us:</p>
        <address className="mt-6 grid gap-4 not-italic sm:grid-cols-3">
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-2 hover:underline">
            <MailIcon className="mt-0.5 size-5 shrink-0" />
            <span className="break-all">{CONTACT_EMAIL}</span>
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
  );
}

/** Shared layout for the Privacy Policy and SMS Terms pages. */
export function PolicyPage({
  eyebrow,
  title,
  intro,
  effectiveDate,
  path,
  lead,
  sections,
  contactHeading,
}: PolicyPageProps) {
  const tocItems = sections.map(({ id, title: sectionTitle }) => ({ id, title: sectionTitle }));

  return (
    <PageTransition>
      <PageHero eyebrow={eyebrow} title={title} intro={intro}>
        <p className="text-sm font-semibold tracking-[0.18em] text-paper/60 uppercase">
          Effective date: {effectiveDate}
        </p>
      </PageHero>

      <section aria-label={eyebrow} className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-14">
          <nav aria-label="On this page" className="hidden lg:block">
            <SectionTocSidebar items={tocItems} />
          </nav>

          <div className="min-w-0 max-w-3xl">
            <SectionTocChips items={tocItems} />
            <div className="reveal text-lg leading-relaxed text-stone">{lead}</div>

            <div className="mt-14 space-y-6">
              {sections.map((section, index) => (
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

            <ContactAside heading={contactHeading} />
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: eyebrow, path },
        ])}
      />
    </PageTransition>
  );
}
