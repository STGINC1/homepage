import { PROCESS_STEPS } from "@/lib/content";
import { cssVars } from "@/lib/css-vars";
import { SectionHeading } from "../section-heading";

export function Process() {
  return (
    <section
      aria-labelledby="process-title"
      className="route-section relative overflow-clip bg-ink py-24 text-paper sm:py-32"
    >
      <div className="tile-pattern pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="process-title"
            tone="dark"
            eyebrow="How it works"
            title={
              <>
                From quote to <span className="text-gradient">signed delivery.</span>
              </>
            }
            intro="Four steps, no runaround. Scroll the route."
          />
        </div>

        <div className="relative pl-14 sm:pl-20">
          {/* The road: a dim track plus a bright line that grows while you scroll */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.05rem] w-1 overflow-hidden rounded-full bg-paper/12 sm:left-[1.65rem]"
          >
            <div className="route-line h-full w-full origin-top bg-gradient-to-b from-brand-bright to-lapis" />
          </div>

          <ol>
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.title} className="relative pb-16 last:pb-0">
                <span
                  className="reveal-zoom font-display absolute top-0 -left-14 grid size-10 place-items-center rounded-full bg-accent text-sm font-black text-ink shadow-[0_0_0_6px_var(--color-ink)] sm:-left-20 sm:size-14 sm:text-lg"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="reveal" style={cssVars({ "--d": 1 })}>
                  <h3 className="text-2xl font-extrabold sm:text-3xl">
                    <span className="sr-only">Step {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-paper/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
