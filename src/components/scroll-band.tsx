interface ScrollBandProps {
  /** Words for the top row (slides left as you scroll). */
  top: readonly string[];
  /** Words for the bottom row (slides right as you scroll). */
  bottom: readonly string[];
  tone?: "light" | "dark";
}

const REPEAT = 3;

function Row({
  words,
  rowClass,
  tone,
}: {
  words: readonly string[];
  rowClass: string;
  tone: "light" | "dark";
}) {
  const solid = tone === "dark" ? "text-paper" : "text-ink";
  const outline =
    tone === "dark"
      ? "text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.35)]"
      : "text-transparent [-webkit-text-stroke:1.5px_rgb(11_15_21/0.22)]";
  const items = Array.from({ length: REPEAT }, () => words).flat();

  return (
    <div className={`${rowClass} flex w-max items-center gap-8 whitespace-nowrap will-change-transform`}>
      {items.map((word, index) => (
        <span key={`${word}-${index}`} className="flex items-center gap-8">
          <span className={index % 2 === 0 ? solid : outline}>{word}</span>
          <span className="size-3 shrink-0 rotate-45 bg-brand" />
        </span>
      ))}
    </div>
  );
}

/** Two rows of oversized words that slide in opposite directions while the band crosses the screen. */
export function ScrollBand({ top, bottom, tone = "light" }: ScrollBandProps) {
  const background = tone === "dark" ? "bg-ink" : "bg-paper";
  return (
    <section aria-hidden="true" className={`scroll-band overflow-clip py-14 sm:py-20 ${background}`}>
      <div className="font-display flex flex-col gap-4 text-[clamp(2.6rem,1rem+7vw,7.5rem)] leading-none font-black tracking-[-0.03em] uppercase">
        <Row words={top} rowClass="band-row-a" tone={tone} />
        <Row words={bottom} rowClass="band-row-b" tone={tone} />
      </div>
    </section>
  );
}
