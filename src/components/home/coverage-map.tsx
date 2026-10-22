import { cssVars } from "@/lib/css-vars";
import { arcPath, MAP_HEIGHT, MAP_WIDTH, outlinePath, project } from "@/lib/geo";
import { COMPANY } from "@/lib/site";
import { SectionHeading } from "../section-heading";

interface City {
  name: string;
  lat: number;
  lon: number;
  labelSide?: "left" | "right";
}

const HUB = project(COMPANY.geo.latitude, COMPANY.geo.longitude);

/** Example markets. These illustrate reach; they are not a fixed lane list. */
const CITIES: readonly City[] = [
  { name: "Chicago", lat: 41.88, lon: -87.63, labelSide: "left" },
  { name: "Detroit", lat: 42.33, lon: -83.05 },
  { name: "Pittsburgh", lat: 40.44, lon: -79.99 },
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "Charlotte", lat: 35.23, lon: -80.84 },
  { name: "Atlanta", lat: 33.75, lon: -84.39 },
  { name: "Nashville", lat: 36.16, lon: -86.78, labelSide: "left" },
  { name: "St. Louis", lat: 38.63, lon: -90.2, labelSide: "left" },
  { name: "Dallas", lat: 32.78, lon: -96.8, labelSide: "left" },
  { name: "Denver", lat: 39.74, lon: -104.99, labelSide: "left" },
  { name: "Los Angeles", lat: 34.05, lon: -118.24, labelSide: "left" },
];

const OUTLINE = outlinePath();

export function CoverageMap() {
  return (
    <section
      aria-labelledby="coverage-title"
      className="relative overflow-clip bg-ink-2 py-24 text-paper sm:py-32"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:items-center">
        <SectionHeading
          id="coverage-title"
          tone="dark"
          eyebrow="Coverage"
          title={
            <>
              Rooted in Ohio. <span className="text-gradient">Running all 48.</span>
            </>
          }
          intro={`Our home base in ${COMPANY.address.city}, ${COMPANY.address.region} puts the I-71 and I-75 corridors at our door. From there we run all 48 contiguous states, coast to coast.`}
        />

        <figure className="reveal-zoom">
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="h-auto w-full"
            role="img"
            aria-labelledby="coverage-map-title"
          >
            <title id="coverage-map-title">
              Map of the United States with sample freight lanes from Mason, Ohio
            </title>
            <defs>
              <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="1.6" fill="#0590e1" fillOpacity="0.45" />
              </pattern>
              <radialGradient id="hub-glow">
                <stop offset="0" stopColor="#14b3f5" stopOpacity="0.55" />
                <stop offset="1" stopColor="#14b3f5" stopOpacity="0" />
              </radialGradient>
            </defs>

            <path
              d={OUTLINE}
              fill="url(#dots)"
              stroke="#0590e1"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx={HUB.x} cy={HUB.y} r="120" fill="url(#hub-glow)" />

            <g fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
              {CITIES.map((city, index) => (
                <path
                  key={city.name}
                  className="lane-flow"
                  d={arcPath(HUB, project(city.lat, city.lon))}
                  strokeDasharray="6 6"
                  strokeOpacity="0.75"
                  style={cssVars({ "--d": index })}
                />
              ))}
            </g>

            {CITIES.map((city) => {
              const point = project(city.lat, city.lon);
              const isLeft = city.labelSide === "left";
              return (
                <g key={city.name}>
                  <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" />
                  <text
                    x={point.x + (isLeft ? -10 : 10)}
                    y={point.y + 4}
                    textAnchor={isLeft ? "end" : "start"}
                    className="fill-paper/70 text-[13px] font-semibold"
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}

            <g>
              <circle
                className="pulse-ring"
                cx={HUB.x}
                cy={HUB.y}
                r="12"
                fill="none"
                stroke="#0590e1"
                strokeWidth="2"
              />
              <circle cx={HUB.x} cy={HUB.y} r="9" fill="#14b3f5" stroke="#0b0f15" strokeWidth="3" />
              <text
                x={HUB.x}
                y={HUB.y - 20}
                textAnchor="middle"
                className="fill-white text-[15px] font-extrabold"
              >
                Mason, OH
              </text>
            </g>
          </svg>
          <figcaption className="mt-4 text-center text-xs text-paper/50">
            Sample lanes. We run all 48 contiguous states.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
