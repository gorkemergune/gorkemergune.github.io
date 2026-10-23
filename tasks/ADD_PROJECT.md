# Prompt — add a new project

Copy everything below the line, fill the two placeholders, paste it as the
message. Nothing else is needed; do not ask for a portfolio tour first.

---

Read `tasks/PORTFOLIO_RULES.md` first and follow it exactly. Do not re-scan the
rest of the portfolio; that file is the source of truth for conventions.

**Project:** <repo name or GitHub URL>
**Local path (if cloned):** <path, or "not cloned — clone it into the scratchpad">

Do this:

1. Read the repository itself — README, the actual source, tests, and any
   results or benchmark outputs. Everything you write must come from what is
   there. If the repo has no results yet, say that plainly instead of implying
   there are any.
2. Add one entry to `src/data/projects.js` using the schema in section 5 of the
   rules. Next unused MARK number, unused accent colour, exactly one category
   from section 6, 2–4 distinguishing tags, and a `metric` only if a real
   headline number exists.
3. Write both languages. English and Turkish, every field.
4. Assets: create `public/projects/<slug>/cover.svg` in the house style, copy
   real screenshots out of the repo if it has any, and add
   `public/og/<slug>.png`.
5. If the project deserves it, say so — but do not add a case study unless I ask.
6. Run `npm run build`, then run through the checklist in section 10.
7. Tell me what you could not verify, then commit and deploy.

Push back if something in the repo contradicts what I told you. I would rather
hear it than ship a wrong claim.
