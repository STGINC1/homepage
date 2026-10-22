import { COMPANY } from "@/lib/site";

const ITEMS = [
  "All 48 States",
  "99.9% Delivered Right",
  "Full Truckload",
  "Shippers · Receivers · Brokers",
  `USDOT ${COMPANY.usdot}`,
  "Mason, Ohio",
] as const;

function Row({ isDuplicate }: { isDuplicate?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={isDuplicate || undefined}>
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center">
          <span className="font-display px-6 text-2xl font-extrabold whitespace-nowrap text-ink sm:text-3xl">
            {item}
          </span>
          <svg viewBox="0 0 20 20" className="size-5 text-ink/70" aria-hidden="true">
            <path d="M10 0l2.6 7.4L20 10l-7.4 2.6L10 20l-2.6-7.4L0 10l7.4-2.6z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <div className="marquee relative -mt-px overflow-hidden bg-accent py-4">
      <div className="marquee-track flex w-max">
        <Row />
        <Row isDuplicate />
      </div>
    </div>
  );
}
