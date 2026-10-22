import { describe, expect, it } from "vitest";
import { arcPath, MAP_HEIGHT, MAP_WIDTH, outlinePath, project, US_OUTLINE } from "./geo";

describe("project", () => {
  it("places every outline point inside the map viewBox", () => {
    for (const [lat, lon] of US_OUTLINE) {
      const { x, y } = project(lat, lon);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(MAP_WIDTH);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(MAP_HEIGHT);
    }
  });

  it("puts eastern cities to the right of western ones", () => {
    const newYork = project(40.71, -74.0);
    const losAngeles = project(34.05, -118.24);
    expect(newYork.x).toBeGreaterThan(losAngeles.x);
  });
});

describe("arcPath", () => {
  it("starts and ends at the given points with a raised control point", () => {
    const path = arcPath({ x: 0, y: 100 }, { x: 200, y: 100 });
    expect(path.startsWith("M0 100 Q100 ")).toBe(true);
    expect(path.endsWith("200 100")).toBe(true);
    const controlY = Number(path.split(" ")[3]);
    expect(controlY).toBeLessThan(100);
  });
});

describe("outlinePath", () => {
  it("is a closed path", () => {
    expect(outlinePath().endsWith("Z")).toBe(true);
  });
});
