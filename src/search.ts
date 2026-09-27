import type { Listing } from "./types";

export function filterListings<T extends Listing>(items: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}

// US Census regions, keyed by the state code at the end of a location like "Austin, TX".
const REGION_STATES: Record<string, string[]> = {
  Northeast: ["CT", "ME", "MA", "NH", "RI", "VT", "NJ", "NY", "PA"],
  Midwest: ["IL", "IN", "MI", "OH", "WI", "IA", "KS", "MN", "MO", "NE", "ND", "SD"],
  South: ["DE", "FL", "GA", "MD", "NC", "SC", "VA", "DC", "WV", "AL", "KY", "MS", "TN", "AR", "LA", "OK", "TX"],
  West: ["AZ", "CO", "ID", "MT", "NV", "NM", "UT", "WY", "AK", "CA", "HI", "OR", "WA"],
};

export function regionOf(location: string): string {
  if (/remote/i.test(location)) return "Remote";
  const state = location.match(/,\s*([A-Za-z]{2})\s*$/)?.[1]?.toUpperCase();
  const region = Object.keys(REGION_STATES).find((name) => state && REGION_STATES[name].includes(state));
  return region ?? "Other";
}

// Self-check: `npx tsx src/search.ts` (skipped when bundled for the browser).
if (typeof window === "undefined") {
  const assert = (ok: boolean, msg: string) => {
    if (!ok) throw new Error(msg);
  };
  assert(regionOf("Austin, TX") === "South", "TX is South");
  assert(regionOf("Cambridge, MA") === "Northeast", "MA is Northeast");
  assert(regionOf("Ann Arbor, MI") === "Midwest", "MI is Midwest");
  assert(regionOf("Seattle, wa") === "West", "lowercase state");
  assert(regionOf("Remote") === "Remote", "Remote");
  assert(regionOf("Purdue University") === "Other", "no state");
  console.log("regionOf ok");
}
