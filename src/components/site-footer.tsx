import { cacheLife } from "next/cache";
import Link from "next/link";
import { COMPANY, EMAIL_CONTACTS, LEGAL_LINKS, NAV_LINKS } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon } from "./icons";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-clip bg-ink text-paper">
      <div className="tile-pattern pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-paper/70">{COMPANY.description}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold tracking-[0.22em] text-brand-bright uppercase">Company</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/" className="text-paper/80 transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-paper/80 transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.22em] text-brand-bright uppercase">Reach us</h2>
          <address className="mt-4 space-y-3 not-italic">
            <p className="font-semibold">{COMPANY.legalName}</p>
            <a
              href={COMPANY.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 text-paper/80 transition-colors hover:text-accent"
            >
              <PinIcon className="mt-0.5 size-4 shrink-0" />
              <span>
                {COMPANY.address.street}
                <br />
                {COMPANY.address.city}, {COMPANY.address.region} {COMPANY.address.postalCode}
              </span>
            </a>
            <a
              href={COMPANY.phone.href}
              className="flex items-center gap-2 text-paper/80 transition-colors hover:text-accent"
            >
              <PhoneIcon className="size-4 shrink-0" />
              {COMPANY.phone.display}
            </a>
            <ul className="space-y-2 pt-1">
              {EMAIL_CONTACTS.map((contact) => (
                <li key={contact.email}>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-2 text-paper/80 transition-colors hover:text-accent"
                  >
                    <MailIcon className="mt-0.5 size-4 shrink-0" />
                    <span>
                      {contact.email}
                      <span className="block text-xs text-paper/50">{contact.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>
      </div>

      <div className="relative border-t border-paper/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={COMPANY.saferHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 items-center transition-colors hover:text-brand-bright"
            >
              USDOT {COMPANY.usdot}
            </a>
            <span>Interstate · For-Hire · General Freight</span>
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-6 items-center transition-colors hover:text-brand-bright"
              >
                {link.label}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
