/** Simple equirectangular projection for the contiguous US, tuned for a 940x540 SVG. */

export const MAP_WIDTH = 940;
export const MAP_HEIGHT = 540;

const WEST = -125;
const NORTH = 50;
const SCALE = 16;
const LAT_STRETCH = 1.25;

export interface Point {
  x: number;
  y: number;
}

export function project(lat: number, lon: number): Point {
  return {
    x: Math.round((lon - WEST) * SCALE * 10) / 10,
    y: Math.round((NORTH - lat) * SCALE * LAT_STRETCH * 10) / 10,
  };
}

/** Quadratic curve between two points, bowed "upward" like a flight arc. */
export function arcPath(from: Point, to: Point, bow = 0.22): string {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const controlY = midY - distance * bow;
  return `M${from.x} ${from.y} Q${midX} ${Math.round(controlY)} ${to.x} ${to.y}`;
}

/** Very coarse outline of the lower 48 states as [lat, lon] pairs. */
export const US_OUTLINE: readonly (readonly [number, number])[] = [
  [48.4, -124.7],
  [46.3, -124.0],
  [43.0, -124.4],
  [41.9, -124.2],
  [39.8, -123.8],
  [37.8, -122.5],
  [34.6, -120.6],
  [33.7, -118.3],
  [32.5, -117.1],
  [32.7, -114.7],
  [31.3, -111.1],
  [31.3, -108.2],
  [31.8, -106.5],
  [29.6, -104.5],
  [29.0, -103.0],
  [29.8, -101.4],
  [27.5, -99.5],
  [25.9, -97.2],
  [27.8, -97.4],
  [29.3, -95.0],
  [29.7, -93.8],
  [29.1, -90.0],
  [30.2, -89.4],
  [30.3, -87.5],
  [29.6, -85.0],
  [29.9, -83.6],
  [28.0, -82.7],
  [25.2, -81.2],
  [25.8, -80.1],
  [28.5, -80.6],
  [30.7, -81.4],
  [32.1, -80.9],
  [33.6, -79.0],
  [34.7, -76.5],
  [35.6, -75.5],
  [37.0, -76.0],
  [38.5, -75.2],
  [39.7, -74.1],
  [40.7, -74.0],
  [41.3, -71.9],
  [41.7, -70.0],
  [42.6, -70.6],
  [43.7, -70.2],
  [44.8, -67.0],
  [47.1, -67.8],
  [47.4, -69.2],
  [45.2, -70.9],
  [45.0, -74.7],
  [44.2, -76.5],
  [43.4, -79.2],
  [42.8, -79.0],
  [41.7, -82.7],
  [42.1, -83.1],
  [43.0, -82.5],
  [45.3, -83.4],
  [46.1, -83.5],
  [46.5, -84.5],
  [47.5, -87.6],
  [48.3, -88.0],
  [48.0, -89.6],
  [49.0, -95.2],
  [49.0, -123.0],
  [48.2, -122.8],
];

export function outlinePath(): string {
  return (
    US_OUTLINE.map(([lat, lon], index) => {
      const { x, y } = project(lat, lon);
      return `${index === 0 ? "M" : "L"}${x} ${y}`;
    }).join(" ") + " Z"
  );
}
