import { cssVars } from "@/lib/css-vars";
import { COMPANY } from "@/lib/site";

const STORY =
  "Samarkand sat at the crossroads of the Silk Road. For centuries, caravans trusted its traders to move goods between East and West. We took the name because the job has not changed: take freight from where it is to where it needs to be, safely, on time, with your word behind it.";

const WORDS = STORY.split(" ");

interface Stat {
  target?: number;
  value?: string;
  suffix: string;
  label: string;
  srText: string;
}

const STATS: readonly Stat[] = [
  {
    target: 150,
    suffix: "K+",
    label: `Miles driven in ${COMPANY.milesYear}`,
    srText: `${COMPANY.milesLastYear.toLocaleString("en-US")} plus miles driven in ${COMPANY.milesYear}`,
  },
  {
    target: COMPANY.statesServed,
    suffix: "",
    label: "States we run, coast to coast",
    srText: "We run all 48 contiguous states",
  },
  {
    target: 99,
    suffix: ".9%",
    label: "Loads delivered right",
    srText: "99.9 percent of loads delivered correctly",
  },
];

export function Story() {
  return (
    <section aria-labelledby="story-title" className="relative overflow-clip py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
        <div className="reveal">
          <p className="eyebrow">Why Samarkand?</p>
          <h2 id="story-title" className="mt-4 text-3xl font-extrabold">
            A name with miles behind it
          </h2>
        </div>

        <p className="story font-display text-[clamp(1.6rem,1rem+2.4vw,2.9rem)] leading-[1.18] font-bold text-ink">
          {WORDS.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="story-word"
              style={cssVars({ "--i": index, "--n": WORDS.length })}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>

      <dl className="container-x mt-20 grid gap-4 sm:grid-cols-3">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className="reveal relative flex flex-col overflow-hidden rounded-3xl bg-ink p-8 text-paper"
            style={cssVars({ "--d": index })}
          >
            <div className="tile-pattern absolute inset-0 opacity-[0.06]" aria-hidden="true" />
            <dt className="relative order-2 mt-2 text-sm font-medium text-paper/70">{stat.label}</dt>
            <dd className="relative font-display text-6xl font-black text-white tabular-nums">
              <span className="sr-only">{stat.srText}</span>
              <span aria-hidden="true">
                {stat.target !== undefined ? (
                  <span className="count-num" style={cssVars({ "--target": stat.target })} />
                ) : (
                  stat.value
                )}
                <span className="text-accent">{stat.suffix}</span>
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
