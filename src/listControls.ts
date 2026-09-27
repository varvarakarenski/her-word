import type { Listing } from "./types";
import { allRatingStats, type RatingStats } from "./reviews";
import { regionOf } from "./search";

export function initListControls(onChange: () => void): { apply<T extends Listing>(items: T[]): T[] } {
  const toggle = document.querySelector<HTMLButtonElement>(".filter-toggle");
  const panel = document.querySelector<HTMLDivElement>(".filter-panel");
  const regionSelect = panel?.querySelector<HTMLSelectElement>("select[name=region]");
  const sortSelect = panel?.querySelector<HTMLSelectElement>("select[name=sort]");

  let stats = new Map<string, RatingStats>();
  allRatingStats().then((loaded) => {
    stats = loaded;
    onChange();
  });

  toggle?.addEventListener("click", () => {
    if (!panel) return;
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));
  });
  regionSelect?.addEventListener("change", onChange);
  sortSelect?.addEventListener("change", onChange);

  function apply<T extends Listing>(items: T[]): T[] {
    const region = regionSelect?.value ?? "";
    const sort = sortSelect?.value ?? "";
    const filtered = region ? items.filter((item) => regionOf(item.location) === region) : [...items];

    const rating = (item: T) => stats.get(item.id)?.averageRating ?? 0;
    const count = (item: T) => stats.get(item.id)?.reviewCount ?? 0;

    // Unrated listings always sink to the bottom, whichever direction you sort.
    if (sort === "rating-desc") filtered.sort((a, b) => rating(b) - rating(a));
    if (sort === "rating-asc") filtered.sort((a, b) => (count(a) ? rating(a) : 6) - (count(b) ? rating(b) : 6));
    if (sort === "reviews") filtered.sort((a, b) => count(b) - count(a));
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }

  return { apply };
}
