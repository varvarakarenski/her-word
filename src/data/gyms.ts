import type { Gym } from "../types";

export const mockGyms: Gym[] = [
  {
    id: "g1",
    name: "Summit Bouldering Co.",
    description: "Bouldering gym with a big beginner area and weekly women's climbing nights.",
    location: "Denver, CO",
    gymType: "Climbing gym",
    tags: ["women's nights", "beginner-friendly", "welcoming staff"],
    activities:
      "Tuesday women's climb nights include a free intro session and route-reading tips from female setters. Staff check in with new climbers on the floor, and the community board lists meetups for finding climbing partners.",
  },
  {
    id: "g2",
    name: "Ironclad Strength",
    description: "Barbell-focused strength gym with coached classes and open lifting.",
    location: "Portland, OR",
    gymType: "Strength & powerlifting",
    tags: ["female coaches", "no-judgment zone"],
    activities:
      "Coached small-group classes teach the big lifts from scratch, and a monthly women's intro-to-lifting workshop covers form and programming. Open gym hours can get crowded around the squat racks in the evenings.",
  },
  {
    id: "g3",
    name: "Harbor Yoga Collective",
    description: "Community yoga studio offering sliding-scale classes.",
    location: "Seattle, WA",
    gymType: "Yoga studio",
    tags: ["sliding-scale pricing", "childcare"],
    activities:
      "Classes range from gentle flow to power vinyasa, with on-site childcare during weekday morning sessions. Teachers offer modifications for every level, and a sliding-scale option keeps memberships affordable.",
  },
  {
    id: "g4",
    name: "Campus Rec Center",
    description: "University recreation center with weights, cardio, pool, and courts.",
    location: "Madison, WI",
    gymType: "University rec center",
    tags: ["women-only hours", "crowded at peak times"],
    activities:
      "The weight room runs women-only hours three evenings a week, and free group fitness classes are included with student membership. Peak hours after 4pm get packed, especially in the free-weight area.",
  },
];
