# HerWord

> Imagine if Elle Woods could see metrics about women at Harvard Law before she applied.

HerWord is like Rate My Professor, but for women in STEM. It collects real reviews of companies, research labs, clubs and teams, and gyms, written by women who've been there. You find out whether a place is somewhere you'll thrive *before* you sign the offer letter, not after.

Built for Hack Club Sunbeam. Live at **https://varvarakarenski.github.io/her-word/**.

## Features

- **Four directories:** companies, research labs, clubs & teams, and gyms
- **Search, filter and sort** by tag, or by rating from highest or lowest
- **Detail pages** for every listing, with its average rating, a description and all of its reviews
- **Reviews** with a 1–5 star rating and written text
- **Add a listing** if the place you're looking for isn't there yet
- **Sign in** with email and password or with Google (Firebase Auth); you need an account to add a listing

## Stack

- [Vite](https://vitejs.dev/) + TypeScript, plain HTML/CSS, no framework
- [Firebase](https://firebase.google.com/): Auth for accounts, Firestore for user-submitted listings and reviews
- GitHub Pages for hosting, deployed by GitHub Actions

## Running it locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with your Firebase web app config:

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_FIREBASE_MEASUREMENT_ID=...
   ```

3. Start the dev server and open the URL Vite prints:

   ```bash
   npm run dev
   ```

### Firestore

The app reads and writes five collections: `companies`, `labs`, `teams`, `gyms` and `reviews`. Each directory shows the seed data in `src/data/` together with whatever is in its collection.

Your Firestore security rules need to allow reads on **all five** collections. If one of them can't be read, that directory's detail pages come up blank.

## Deployment

Every push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages. The workflow reads the same `VITE_FIREBASE_*` values from the repo's Actions secrets, so add them under **Settings → Secrets and variables → Actions**.

## Project structure

```
├── index.html                 # Landing page
├── companies.html             # Directory pages
├── labs.html
├── clubs-and-teams.html
├── gyms.html
├── detail.html                # Shared detail + reviews page (?type=…&id=…)
├── login.html                 # Sign in / sign up
├── privacy.html
└── src/
    ├── data/                  # Seed listings and reviews
    ├── companies.ts, labs.ts, teams.ts, gyms.ts   # Directory page logic
    ├── detail.ts              # Detail page logic
    ├── firebase.ts, auth.ts, storage.ts           # Firebase setup, auth, Firestore reads/writes
    ├── reviews.ts, reviewPanel.ts, starRating.ts  # Showing and submitting reviews
    ├── search.ts, listControls.ts, tagPicker.ts   # Search, filters, sort
    └── renderList.ts, logo.ts, menubar.ts, overlay.ts, sparkle.ts  # Shared UI
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
