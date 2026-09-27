import type { Review } from "./types";
import { mockReviews } from "./data/reviews";
import { loadAdditions } from "./storage";

export async function reviewsFor(listingId: string): Promise<Review[]> {
  const persisted = await loadAdditions<Review>("reviews");
  return [...mockReviews, ...persisted].filter((review) => review.listingId === listingId);
}

export async function ratingStats(listingId: string): Promise<{ averageRating: number; reviewCount: number }> {
  const reviews = await reviewsFor(listingId);
  if (reviews.length === 0) return { averageRating: 0, reviewCount: 0 };
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return { averageRating: sum / reviews.length, reviewCount: reviews.length };
}

export function renderReviewList(container: HTMLElement, reviews: Review[]): void {
  container.innerHTML = "";

  if (reviews.length === 0) {
    const empty = document.createElement("p");
    empty.className = "review-panel-empty";
    empty.textContent = "No reviews yet — be the first!";
    container.appendChild(empty);
    return;
  }

  for (const review of reviews) {
    const item = document.createElement("div");
    item.className = "review-panel-review";

    const rating = document.createElement("p");
    rating.className = "review-panel-review-rating";
    rating.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    const author = document.createElement("p");
    author.className = "review-panel-review-author";
    author.textContent = review.reviewerName;

    const text = document.createElement("p");
    text.className = "review-panel-review-text";
    text.textContent = review.text;

    item.append(rating, author, text);
    container.appendChild(item);
  }
}

export type RatingStats = { averageRating: number; reviewCount: number };

// One Firestore read for every listing's stats, so sorting doesn't fetch reviews per card.
export async function allRatingStats(): Promise<Map<string, RatingStats>> {
  const persisted = await loadAdditions<Review>("reviews");
  const stats = new Map<string, RatingStats>();
  for (const review of [...mockReviews, ...persisted]) {
    const current = stats.get(review.listingId) ?? { averageRating: 0, reviewCount: 0 };
    const reviewCount = current.reviewCount + 1;
    const averageRating = current.averageRating + (review.rating - current.averageRating) / reviewCount;
    stats.set(review.listingId, { averageRating, reviewCount });
  }
  return stats;
}
