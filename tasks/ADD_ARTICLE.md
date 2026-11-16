
# Prompt — Add an Article

Use one of the two variants below. Fill in the fields and send the completed
variant as the message.

---

## A. A paper I read ("What I Read")

Before making changes, read `tasks/PORTFOLIO_RULES.md` and follow it exactly,
especially section 8. Do not re-scan unrelated parts of the portfolio.

**Paper:**
**Link:** <arXiv or publisher URL>
**Read on:** <month/year, or "unknown">

### Instructions

1. Add one entry to the `read` array in `src/data/articles.js`.
   No component changes should be necessary.
2. The entry lists only the paper itself — **no reading notes, summary or
   `board`** (owner decision, 16 Nov 2026). Fields: slug, accent, title,
   authors, affiliations, venue, arxiv (ref), url, pdf, date, optional
   readOn/readOnTr, category(+Tr), tags(+Tr).
3. Take title, authors, venue and publication date from a real source
   (Crossref / DOI record, arXiv, or the publisher page). Do not guess.
   Leave `readOn` empty if I did not give it.
4. Both Turkish and English versions must be added for every translated field.
5. Leave `pdf: null` unless the paper's licence clearly allows
   redistribution. Do not upload or redistribute a PDF automatically.
6. Run `npm run build` and follow the checklist in section 10 of
   `tasks/PORTFOLIO_RULES.md`.
7. Commit and deploy only if that is part of the existing portfolio workflow.

---

## B. Something I wrote ("What I Write")

Before making changes, read `tasks/PORTFOLIO_RULES.md`, especially section 8.

**Title:**
**Where it lives:** <URL, or "on the site">
**Draft / notes:** <paste the text or provide the path></paste>

### Instructions

1. Add the article to the `written` array in `src/data/articles.js`.
2. If this is the first real written article, replace the existing
   `coming-soon` placeholder instead of leaving it above the real article.
3. Both Turkish and English versions must be added for every field.
4. Keep the writing presentation clean and focused on the actual article.
   Do not invent metadata, publication information, statistics, or claims
   that are not provided.
5. Run `npm run build`.
6. Follow the checklist in section 10 of `tasks/PORTFOLIO_RULES.md`.
7. Commit and deploy only if that is part of the existing portfolio workflow.
