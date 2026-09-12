# OG image generator

Renders `public/og/<slug>.png` at 1200×630 to match the existing cards.
The chrome (background, grid, corner brackets, MARK row, serif title, chips,
footer) is sampled from `public/og/email-phishing-detection.png`, so new cards
sit in the same family.

```bash
npm i -D playwright && npx playwright install chromium
node tools/og/render.mjs public/og
```

Rules that matter more than the layout:

- Every string on a card comes from `src/data/projects.js` or the project's own
  README. No score, accuracy, latency or dataset size is introduced here.
- The MARK number is the project's real one. The older cards were generated from
  a template with `MARK XIV` baked in and are stale — do not copy that.
- The serif title auto-shrinks against `titleMax` until it clears the artwork,
  measured in the browser rather than guessed.

Covers the four cards added on 12 Sep 2026. Add a new entry to `cards.mjs` to
generate another.
