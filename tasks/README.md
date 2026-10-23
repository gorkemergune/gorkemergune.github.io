# tasks/

Private working notes. Gitignored — nothing here is published.

| File | What it is for |
| --- | --- |
| `PORTFOLIO_RULES.md` | The manual. Conventions, schemas, design tokens, checklist. Read it before touching the portfolio; keep it updated when the architecture changes. |
| `ADD_PROJECT.md` | Ready-to-paste prompt for adding a project. |
| `ADD_ARTICLE.md` | Ready-to-paste prompt for adding a paper I read, or a piece I wrote. |

## How to use these

Open the prompt file, copy the block under the line, fill the placeholders,
paste it. The prompt tells Claude to read `PORTFOLIO_RULES.md` instead of
re-reading the whole repository, so each addition starts from the same
conventions and stays cheap.

If a request does not fit either prompt, describe it normally — but still say
"follow `tasks/PORTFOLIO_RULES.md`" so the design language and the bilingual
rule hold.

## Keeping it honest

The one rule that matters more than the rest: **every number on the site comes
from a real source.** A repository with no results yet gets a card that says so.
An estimated score is worse than no score.
