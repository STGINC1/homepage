import { REASONS } from "@/lib/content";
import { cssVars } from "@/lib/css-vars";
import { COMPANY } from "@/lib/site";
import { NamedIcon } from "../icons";
import { SectionHeading } from "../section-heading";

export function Reasons() {
  return (
    <section aria-labelledby="reasons-title" className="py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <SectionHeading
            id="reasons-title"
            eyebrow="Why ship with STG"
            title="Small enough to care. Authorized to go far."
            intro="Big carriers move a lot of freight. We focus on moving yours, and on picking up the phone when you call."
          />
          <a
            href={COMPANY.saferHref}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal mt-8 inline-flex items-center gap-2 text-sm font-semibold text-lapis underline decoration-lapis/30 underline-offset-4 transition-colors hover:decoration-lapis"
          >
            View our FMCSA record (USDOT {COMPANY.usdot})
          </a>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {REASONS.map((reason, index) => (
            <li
              key={reason.title}
              className={`reveal card p-7 ${index % 2 === 1 ? "sm:translate-y-10" : ""}`}
              style={cssVars({ "--d": index })}
            >
              <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent-deep">
                <NamedIcon name={reason.icon} className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-extrabold">{reason.title}</h3>
              <p className="mt-2 leading-relaxed text-stone">{reason.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
