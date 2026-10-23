
# Prompt — Add an Article

Use one of the two variants below. Fill in the fields and send the completed
variant as the message.

---

## A. A paper I read ("What I Read")

Before making changes, read `tasks/PORTFOLIO_RULES.md` and follow it exactly,
especially section 8. Do not re-scan unrelated parts of the portfolio.

**Paper:**
**Link:** <arXiv or publisher URL></arxiv>
**My annotated copy:** <path to the PDF, or "none">

### Instructions

1. If I provide a PDF, use my highlights as the primary outline of what I
   cared about. Read enough surrounding context to understand those
   highlights correctly. Check tables and appendix figures only when they
   are directly relevant to my highlighted points.
2. Add one entry to the `read` array in `src/data/articles.js`.
   No component changes should be necessary unless the existing data model
   genuinely requires them.
3. Write the reading notes in **my voice**.

   These are personal research notes, NOT:

   * a paper review
   * an abstract
   * a section-by-section summary
   * a literature review
   * a technical report

   The purpose is to record what I actually want to remember after reading
   the paper.

   Focus on:

   * what caught my attention
   * what surprised me
   * the one or two ideas I want to remember
   * what I would use, test, or do differently in my own work
4. Keep the notes short and easy to scan.

   A normal article should have roughly **3–6 short paragraphs or bullets**.
   Do not try to cover the entire paper.

   Do NOT summarize every experiment, figure, appendix, or result.
5. Use exact numbers when they genuinely matter, especially when they support
   a point I highlighted. Do not add numbers just to make the notes look
   technical.
6. Avoid generic academic filler such as:

   * "This paper presents..."
   * "The authors propose..."
   * "The results demonstrate..."
   * "Overall, this is an interesting paper..."
   * "This study provides valuable insights..."

   Write like I am leaving notes for myself after reading the paper.

   Natural phrasing is encouraged, for example:

   * "The part that surprised me was..."
   * "I didn't expect..."
   * "The thing I want to remember is..."
   * "For my own work, I'd..."
   * "This makes me think..."
   * "I'm not fully convinced by..."
7. Do not force a conclusion or opinion if the paper did not give me one.
   It is better to leave a specific observation than to invent a strong
   "takeaway."
8. If the paper contains a genuinely useful model comparison, add a `board`
   block.

   Do NOT create a board simply because the paper contains multiple models.

   The board should answer:
   **"Which model is good at what, and what should I take away from this?"**

   Keep it compact and use real numbers from the paper.
9. Both Turkish and English versions must be added for every field.
10. Leave `pdf: null` unless the paper's licence clearly allows
    redistribution of my annotated copy.

    If I provided an annotated PDF, tell me what its licence allows before
    deciding whether it can be included in the portfolio. Do not upload or
    redistribute it automatically.
11. Run `npm run build` and follow the checklist in section 10 of
    `tasks/PORTFOLIO_RULES.md`.
12. Commit and deploy only if that is part of the existing portfolio workflow.

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
