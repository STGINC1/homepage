import { MailIcon, PhoneIcon, PinIcon, ShieldIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { QuoteForm } from "@/components/quote-form";
import { cssVars } from "@/lib/css-vars";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { COMPANY, EMAIL_CONTACTS } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact & Freight Quote",
  description:
    "Request a freight quote from Samarkand Transport Group in Mason, Ohio. Call (513) 781-2423, email admin@stgincs.com, or send pickup, delivery and load details online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s get your load <span className="text-gradient">moving.</span>
          </>
        }
        intro="The fastest way to a rate is a phone call. Prefer to write it down? Send the details below and we'll reply with a quote."
      />

      <section aria-label="Contact options" className="py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <div className="space-y-4 lg:sticky lg:top-28">
            <a
              href={COMPANY.phone.href}
              className="reveal-left group card card-dark flex items-center gap-5 p-7 text-paper"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-ink transition-transform duration-500 group-hover:-rotate-12">
                <PhoneIcon className="size-6" />
              </span>
              <span>
                <span className="block text-sm text-paper/60">Call for a quote</span>
                <span className="font-display block text-2xl font-extrabold">{COMPANY.phone.display}</span>
              </span>
            </a>

            <a
              href={COMPANY.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-left card flex items-center gap-5 p-7"
              style={cssVars({ "--d": 1 })}
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand/15 text-brand">
                <PinIcon className="size-6" />
              </span>
              <address className="not-italic">
                <span className="block text-sm text-stone">Home base</span>
                <span className="block font-bold">{COMPANY.address.street}</span>
                <span className="block font-bold">
                  {COMPANY.address.city}, {COMPANY.address.region} {COMPANY.address.postalCode}
                </span>
              </address>
            </a>

            <div className="reveal-left card flex items-center gap-5 p-7" style={cssVars({ "--d": 2 })}>
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-lapis/10 text-lapis">
                <ShieldIcon className="size-6" />
              </span>
              <p>
                <span className="block text-sm text-stone">Carrier info</span>
                <span className="block font-bold">USDOT {COMPANY.usdot}</span>
              </p>
            </div>

            <div className="reveal-left card p-7" style={cssVars({ "--d": 3 })}>
              <div className="flex items-center gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand-deep">
                  <MailIcon className="size-6" />
                </span>
                <h2 className="text-lg font-bold">Email the right desk</h2>
              </div>
              <ul className="mt-5 divide-y divide-ink/8">
                {EMAIL_CONTACTS.map((contact) => (
                  <li key={contact.email} className="py-3 first:pt-0 last:pb-0">
                    <span className="block text-xs font-semibold tracking-[0.14em] text-stone uppercase">
                      {contact.label}
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-0.5 block font-bold break-all text-brand-deep underline decoration-brand-deep/30 underline-offset-4 transition-colors hover:decoration-brand-deep"
                    >
                      {contact.email}
                    </a>
                    <span className="mt-1 block text-sm text-stone">{contact.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal-right rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-40px_rgb(11_15_21/0.45)] sm:p-10">
            <h2 className="text-3xl font-extrabold">Request a freight quote</h2>
            <p className="mt-2 mb-8 text-stone">Fields marked * are required.</p>
            <QuoteForm />
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </PageTransition>
  );
}
