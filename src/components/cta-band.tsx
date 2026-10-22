import Link from "next/link";
import { COMPANY } from "@/lib/site";
import { ArrowIcon, ExternalIcon, PhoneIcon } from "./icons";

interface CtaAction {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface CtaBandProps {
  title?: string;
  body?: string;
  action?: CtaAction;
}

const DEFAULT_ACTION: CtaAction = { href: "/contact", label: "Get a Quote" };

export function CtaBand({
  title = "Have a load ready to move?",
  body = "Tell us where it is and where it needs to go. We'll come back with a straight answer and a fair rate.",
  action = DEFAULT_ACTION,
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="px-4 py-20 sm:px-6">
      <div className="reveal-zoom relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--color-lapis)_0%,var(--color-brand-deep)_100%)] px-6 py-16 text-white sm:px-14 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_90%_at_100%_0%,rgb(20_179_245/0.55),transparent_70%)]"
        />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 id="cta-title" className="text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] leading-[1] font-black">
              {title}
            </h2>
            <p className="mt-4 text-lg text-white/85">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {action.isExternal ? (
              <a href={action.href} target="_blank" rel="noopener noreferrer" className="btn btn-light group">
                {action.label}
                <ExternalIcon className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <Link href={action.href} className="btn btn-light group">
                {action.label}
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <a href={COMPANY.phone.href} className="btn btn-outline-light">
              <PhoneIcon className="size-4" />
              {COMPANY.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
