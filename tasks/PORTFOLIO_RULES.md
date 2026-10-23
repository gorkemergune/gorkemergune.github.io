# Portfolio Rules — the working manual

Private, gitignored. This file exists so that adding a project or an article
never requires re-reading the whole codebase. Keep it accurate; if you change
the architecture, update this file in the same session.

Last verified: 11 October 2026 (final release, deployed: commits 55da5f0…1d82766, gh-pages 1fd4aad) · 29 projects · 2 read articles · 2 apps · 5 research items · 7 competitions · 22 Fun experiences · GitHub 41 owned public repos (+3 forks, excluded) · Hugging Face 8 repos.
There is no Life Flow / Journey page any more; do not re-add one.

**Rules revision — 12 September 2026.** Sections 5 and 7 were rewritten around
one finding: the copy was already concrete, but the reader met it in the wrong
order, and one kind of claim had drifted away from what the repositories
actually support. Section 5 now carries the page order, not just the field
list. Section 7 gained four rules about evidence. Section 11 records exactly
what was removed and why — read it before reinstating anything that looks
missing.

---

## 1. Stack and commands

| Thing | Value |
| --- | --- |
| Framework | React 18 + Vite 6, JavaScript (no TypeScript) |
| Routing | react-router-dom v7, **HashRouter** (GitHub Pages) |
| Icons | `lucide-react` only |
| Styling | Inline style objects + one `<style>` block per page. **No CSS framework, no CSS modules.** |
| i18n | Home-grown, `src/i18n.jsx`, `useLang()` → `{ lang, t, toggleLang }` |
| Tests / lint | None configured. `npm run build` is the gate. |

```bash
npm run dev            # local dev
npm run build          # must pass before every commit
npm run deploy:full    # build + publish dist/ to the gh-pages branch
```

No new dependency unless there is no reasonable way to do it with what is
already installed.

---

## 2. File map

```
src/
  App.jsx                 nav links, mobile menu, routes, global CSS, footer
  i18n.jsx                en{} and tr{} objects — MUST stay key-for-key in sync
  config.js               FEATURES flags
  data/
    projects.js           the project database (Hall of Armor)
    hallOfArmor.js        Hall of Armor categories (id, label(+Tr), desc(+Tr), icon,
                          tone, floor, `bay` rect in % of the 1672×831 scene) and
                          PROJECT_CATEGORY: slug → exactly ONE category id.
                          projects.js `category` is untouched. Dev warns on a
                          missing project, unknown id or empty category.
    articles.js           read papers + my own writing
    caseStudies.js        RETIRING — see section 11. Its `challenges` and
                          `lessons` blocks move into projects.js; the rest is
                          duplicated prose. Do not add a new case study.
    competitions.js       competitions page data (Phase 8 shape): score {value, unit{en,tr}},
                          rank {value, of? | scope{en,tr} | top:true}, team, round{en,tr}
                          (taken from the public leaderboard URL — AlgoLeague = qualification
                          rounds), dateTr, summary only when it adds something the title /
                          type / score / rank / team do not already say. No `achievements`.
                          Order: contests newest-first after the IEEEXtreme flagship, then
                          hackathons newest-first. Tags: algorithm contests/camps carry
                          exactly ALGO_TAGS {en: Algorithms, Data Structures; tr:
                          Algoritmalar, Veri Yapıları}; hackathons keep their own
                          technology tags (plain arrays).
  pages/
    ProjectPage.jsx       /project — The Hall of Armor (Phase 4). URL state:
                          (none) → HallScene, ?bay=<id> → ProjectCollection,
                          ?bay=all → All projects (original search + category tabs).
                          Unknown ?bay falls back to the hall.
    ProjectDetail.jsx     /project/:slug
    CaseStudyPage.jsx     RETIRING — folds into ProjectDetail as Field Notes
    ArticlesPage.jsx      /articles — the knowledge library (Phase 6): two bookcases,
                          LEFT "My Reading Library"/"Okuduklarım" (articles.js `read`),
                          RIGHT "My Writing Library"/"Yazdıklarım" (the blog essays:
                          i18n blogItems + blogPosts, full text). data/library.js
                          normalises both into books; components/bookcase/
                          (Bookcase+Shelf, ArticleBook, BookReader, EmptyCollection).
                          ?book=<id> opens the two-page reader (modal: Esc, backdrop,
                          focus trap, focus returns, Back closes). Phase 6.1: books
                          LIE FLAT in stacks, spine + horizontal title to the
                          visitor; each collection is sorted newest-first by its
                          real "Mon YYYY" date (EN/TR months; source order if any
                          date is unreadable); stack = 5 books, newest on top,
                          1 stack per shelf (+ a dim decorative stack), more books
                          add shelves (STACK_SIZE / STACKS_PER_SHELF in Bookcase.jsx).
                          Decorative volumes are aria-hidden, untitled and dim.
                          Read books show only Görkem's notes + the source link,
                          never the paper's text.
                          Release: titles are NEVER clamped — they wrap, the book grows
                          thicker (spine.thickness is a minimum), the year sits under the
                          title, and spine.length grows with title length (library.js
                          spine(slug, tones, title)). The two cases end level (last shelf
                          flexes). Verified 390–1440 px: 0 clipped, 0 overlaps.
    AppsPage.jsx          /apps — the engineering laboratory (Phase 8). CSS-only room
                          (ceiling strips, wall seams, perspective floor grid) with one
                          workstation per i18n `appsItems` entry (id, status 'live',
                          name, platform, accent, image | icon, tagline, description,
                          stack, url, cta, optional screens[]): holographic screen on an
                          arm over a lit bench + station plate. Click / Enter opens the
                          inspection panel (?app=<id>; Esc, backdrop, close button, Back;
                          focus trap + return). A dimmed "bench reserved" station = appsMore.
                          Screens show ONLY real artwork: the app icon, or `screens`
                          (real product captures in public/apps/) when supplied. No mock UI.
                          Today neither app has a real screenshot in the repo.
    ResearchPage.jsx      /research — the research library (Phase 5/5.1): a CSS bookcase
                          (components/library/ResearchShelves.jsx), shelves of TWO
                          compartments generated from `researchItems` (odd count →
                          last compartment "reserved"; never invent an entry). The
                          image is the dominant element (16:9 frame, contain). Each entry is a <button> dossier; ?r=<n> (1-based)
                          opens components/library/ResearchDossier.jsx (modal: Esc,
                          backdrop, focus trap, focus returns). Data in i18n
                          `researchItems`. Optional
                          fields: results {columns, rows, caption}, findings,
                          images [{src, caption}], imagesNote, repo.
    LearningPathPage.jsx  /learning-path — forest trail (public/media/forest-trail-*,
                          CC0). Milestones follow `learningItems` order; the data has
                          no dates, so none are shown — never invent them.
                          Page order (release): trail → #algorithms (AlgorithmsSection),
                          and the page ends there. The "Trail notes — What each stretch
                          of the path covers" section and the four stage explanations
                          were REMOVED at release (with learningItems abstract/topics and
                          their i18n keys); stages keep title, field, status and repo.
    ExperiencePage.jsx    /experience (Phase 3) — banner (media/experience-hero*),
                          profile strip (`PROFILE_PHOTO` in config.js = Görkem's
                          own photo, original in tasks/source-assets/experience/),
                          70/30 grid: Education + Work timelines | four nav cards.
                          Data: src/data/experience.js (EDUCATION, WORK, WORK_SORTED,
                          NAV_CARDS) — the owner's supplied facts only. Confidential
                          roles: no employer name, logo or link, ever. Competitions
                          are NOT listed here (they live on /competitions).
                          NAV_CARDS[].image = public/media/experience/cards/*.webp,
                          cropped from the owner's text-free 2×2 composite
                          (tasks/source-assets/experience/4experience.png; order
                          TL competitions, TR research, BL apps, BR papers). Never
                          use the old mockup crops kept in the same folder.
                          WORK_SORTED = ongoing first, then completed, each newest
                          start first. Home's ExperienceSection reads the same
                          WORK_SORTED (single source); i18n `expItems` now only
                          feeds the feature-flagged résumé page and is outdated.

    (BlogHub.jsx / RoadmapDetail.jsx were deleted in Phase 6.1: the four essays
     live only in Articles → Writing Library. App.jsx redirects /blog → /articles
     and /blog/<slug> → /articles?book=write-<slug>; ⌘K essay results point there
     too. Keep i18n blogItems + blogPosts — they ARE the Writing Library.)
    FunHub.jsx + fun pages  /fun… — not in the nav since Phase 6.1: reached via the
                          small Sparkles "fun-spark" icon button in the nav bar
                          (all widths, aria-label funSpark) and a muted "Fun corner"
                          entry in the mobile menu; ⌘K still lists it. Every Fun
                          page is lazy; Fun data files load only with their page.
                          Timers must be stored in refs and cleared on unmount /
                          restart (Memory, GoOut, Sorry, Wheel, AlgorithmPuzzle
                          fixed in 6.1).
                          Phase 8: 22 experiences on three shelves — 8 mini-games,
                          7 "surprise me" (+ lights, stopclock, fortune, odd) and 7
                          surprises to send (+ gift, scratch, stars). Every page uses
                          components/fun/FunFrame.jsx (FunHeader / FunBack, FUN_CSS:
                          .fun-page, .fun-btn(.ghost/.small), .fun-panel, .fun-stats,
                          .fun-field, .fun-msg, share helpers). Send pages use
                          components/fun/Composer.jsx: the message travels in the URL
                          (?d= base64url UTF-8 JSON, ≤180 chars) — nothing is stored;
                          a broken ?d falls back to the composer. In-page copy of the
                          new pages lives in each page's local {en,tr} object (lazy);
                          hub titles/descs are in i18n. The old light-theme palette
                          (#1a1a1a ink on #fafaf6) was inverted to the dark tokens in
                          Hangman, Hanoi, Puzzle, Sorry, GoOut, Birthday, MothersDay,
                          TowerOfHanoi, AlgorithmPuzzle — never reintroduce it.
  components/
    (Home no longer renders a Skills section — removed in Phase 2. `stackGroups`
     stays in i18n for the résumé.)
    pages/Home.jsx        Phase 7/8: an introduction, not a directory. Order:
                          CinematicHero → home/ProfileSummary (#profile, Phase 8: "What
                          I’m Building & Exploring" — one-sentence identity (second-year
                          CE student, Yeditepe) + three THEMES from i18n `pfThemes`
                          (AI & Research · Software & Products · Algorithms & Learning),
                          each with links to real routes. Themes, never employers; no
                          live feed; compact on mobile) → home/ExploreConsole (#explore:
                          release design after tasks/anasayfa.png — 8 illuminated tiles,
                          one accent each (Projects #22d3ee, Experience #fb923c,
                          Competitions #818cf8, Research #f472b6, Articles #f59e0b,
                          Path #4ade80, Apps #60a5fa, Contact #e879f9), icon → title →
                          count (derived from data; Contact has none; unit text is
                          sr-only + tooltip). 8 in a row >1100px, 4×2 below; labels
                          never wrap mid-word (fluid size on phones)) →
                          home/ProjectShowcase (curated PICKS,
                          dependency-free right→left loop: drag/swipe, arrows,
                          focus-into-view, pauses on hover/focus/drag/off-screen/
                          hidden tab, no motion for reduced-motion; "Open the Full
                          Armory" → /project) → home/RepoShowcase
                          ("Latest on GitHub" | "Latest on Hugging Face", release design
                          after tasks/anasayfa.png: title + icon, subtitle, "View all
                          (n)" in the header — never inside the list, and no count when
                          the data is a fallback — then compact rows: icon, name,
                          description ("No description" when empty), badge, one real
                          metric, real date. EVERY repository is listed; exactly 4 rows
                          show (--rp-row × 4, equal heights) and the rest scroll natively
                          inside; overscroll NOT locked (page continues at list ends);
                          fades + a small ↓ affordance. GitHub: useGitHub follows every
                          API page (per_page 100, type=owner), excludes forks (other
                          people's code; shown as "forks excluded"), sorts by pushed_at;
                          cache gh_stats_v3. Fallback = the portfolio's own project repos,
                          labelled "Curated · not the full list", no dates/stars.
                          Hugging Face: hooks/useHuggingFace.js lists models + datasets
                          (limit 1000, follows Link rel=next), cache hf_repos_v2, curated
                          task/desc merged by id; fallback = data/huggingface.js +
                          last-known counts. Hub `downloads` = 30-day count → "/mo".
                          Narrow panels drop one column: GitHub keeps the date, HF keeps
                          downloads.) →
                          home/ClosingContact. (home/CurrentWork — the employer feed —
                          was deleted in Phase 8.) Sections carry [data-reveal]
                          (fade-in once, IntersectionObserver).
                          No longer on Home (files kept, unused): SelectedWork,
                          ProfileSections, ArmoryIndex, FeaturedMetrics,
                          AlgorithmJourney, CurrentlyBuilding, GitHubActivity,
                          LiveStatus. HuggingFaceActivity still exports
                          useLiveDownloads.
    hooks/useAlgoStats.js THE single source for algorithm numbers (Learning Path
                          section + home strip). Parses the algorithms repo README
                          (badge total, per-platform **N**, per-language Total row),
                          6 h cache, else SNAPSHOT (verified 11 Oct 2026: 173 =
                          LeetCode 111 · AlgoLeague 9 · NeetCode 7 · HackerRank 3 ·
                          contest 43; Python 166 · C++ 6 · C 1). Returns `source`
                          'live'|'cache'|'snapshot' — always show it (AlgoSource).
                          When re-verifying, update SNAPSHOT + SNAPSHOT_DATE + the
                          alSrcSnap date in i18n together. Topics, streaks and
                          rankings are NOT recorded in the repo — never show them.
    components/algorithms/ AlgorithmsSection (#algorithms on /learning-path, after
                          the trail notes; ?focus=algorithms scrolls to it) and
                          AlgoSource (source line + shared platform/lang names).
    hooks/guidedScroll.js the hero's "View Work": eased rAF glide to #profile (Phase 8;
                          focus lands on #pf-title, the doors follow below),
                          cancelled by any wheel/touch/key/pointer input, instant
                          for reduced motion, lands under --nav-h using layout
                          offsets (not transformed rects). Uses behavior:'instant'
                          because html has scroll-behavior: smooth.
    CinematicHero.jsx     home hero — workspace image from public/media/hero-workspace-*;
                          CTAs: View Work (guided glide) + GitHub + LinkedIn
                          (+ CV when FEATURES.resume)
    SelectedWork.jsx      home row of four `tier: 'featured'` projects; SHOWCASE
                          maps each slug to a real image + an honest label
                          (screenshot / model output / figure). Rows align via
                          CSS subgrid.
    ProfileSections.jsx   SkillsSection · ExperienceSection · ResearchSection
                          (stackGroups, expItems, researchItems)
    ArmoryIndex.jsx       all projects as cover tiles, MARK order, category filter
    TwoTone.jsx           splits an i18n title on "|" — the second half renders dim
    TechLogos.jsx         up to three project technology logos (data/techLogos.js)
    hall/HallScene.jsx    the interactive laboratory: image in a 1672:831 box,
                          one <button> per bay at % coordinates, HUD on hover/focus;
                          ≤900px the bays turn display-only and a touch list shows
    hall/ProjectCollection.jsx  one bay: zoomed bay header, other-bay switcher, cards
    hall/ArmorCard.jsx    the shared project card (+ ARMOR_CARD_CSS)
    hall/hallIcons.js     lucide icons named in data/hallOfArmor.js
    FeaturedMetrics, AlgorithmJourney, CurrentlyBuilding, GitHubActivity,
    HuggingFaceActivity, LiveStatus
                          render blocks (not sections) inside the two home
                          sections "By the numbers" and "Live activity"
    HallOfArmor.jsx, IronManBackdrop.jsx, GooeyNav.jsx, FeaturedProject.jsx
                          no longer rendered since the October 2026 redesign;
                          kept on disk, not imported
    CommandPalette.jsx    ⌘K — every page must be registered here
    FeaturedMetrics.jsx   counts derive from data, don't hardcode
public/
  media/                  hero-workspace, tech-stack-wallpaper, desk photo —
                          credited in i18n `photoCredit`
  tech/                   technology + algorithm-platform logos (techLogos.js)
  orgs/                   organisation / event logos (experience, competitions)
  projects/<slug>/        cover.svg + screenshots
  og/<slug>.png           social preview, 1 per project
```

---

## 3. Design system — do not invent a new one

| Token | Value |
| --- | --- |
| Page background | `#0A0C10` (`--c-bg`) |
| Card background | `linear-gradient(180deg,#111419,#0d0f14)` (`--c-surface`) |
| Border | `#1e222b` (hover `#2c313c`) |
| Accent | `#00F0FF` (`--c-primary`); secondary `#38BDF8`, tertiary `#F59E0B` |
| Text | `#e0e0e8` / `--c-ink` primary · `#9aa1ad` body · `#5c6370` meta |
| Display font | `var(--font-display)` Space Grotesk — every heading (was Instrument Serif until Oct 2026) |
| Body font | `var(--font-body)` Hanken Grotesk |
| Mono font | `var(--font-mono)` JetBrains Mono — labels, metrics, kickers, chips |
| Page width | `maxWidth: 1400` for grids, `900–960` for reading pages |
| Page padding | `'60px 48px 120px'` |

**Art direction (October 2026 redesign, second pass).** Photography carries the
mood, not decoration: a dark engineering workspace with a sunset skyline in the
home hero, the same image as a faint `.page-horizon` strip behind every inner
page header, and two more photographs (motherboard behind Skills, desk behind
Experience), graded dark by CSS.

**Home design system** — defined once in `App.jsx`, used by every home section:
`.ds-wrap` (max 1400, gutter `--ds-gutter` 48/28/16), `.ds-section` (vertical
`--ds-section` 96/80/64, 1px top hairline), `.ds-kicker` (mono 11px, cyan tick),
`.ds-h2` (Instrument **Sans** 400, 32–44px, two-tone via `TwoTone`), `.ds-h3`,
`.ds-body`, `.ds-meta`, `.ds-link` (mono caps, cyan underline), `.ds-media`
(1px border, no radius, dimmed image, `.ds-contain` for figures), `.ds-head`
(5/6 title-and-lede grid), `.ds-cells` + `.ds-cell` (hairline grid tiles),
`.ds-subhead`, `.ds-block`. On the home page: no rounded corners, no card
gradients, no glows; cyan only for ticks, link underlines and live dots; the
project colour only on MARK labels. Inner pages still use the older serif
titles and rounded cards — bringing them onto `.ds-*` is the next pass.

**Hero image.** `public/media/hero-workspace.webp` (1976×796) and
`hero-workspace-1280.webp/.jpg`, encoded from the owner-supplied
`tasks/source-assets/hero-workspace.png`. Because the image is ≈2.5:1 the hero
height follows the width (`clamp(600px, 50vw, 100svh)`) and the image is
anchored right so the helmet, energy core and monitors stay whole. The
decorative `tech-stack-wallpaper.webp` (from `tasks/source-assets/`) sits
behind the Skills panel only — never crop logos out of it.

**Design system (Phase 1, 10 October 2026).** Tokens live in the `:root` block
at the top of App.jsx's `<style>`: `--font-display` Space Grotesk (all
headings), `--font-body` Hanken Grotesk, `--font-mono` JetBrains Mono;
`--c-primary #00F0FF` (links, active states, selected accents only),
`--c-secondary #38BDF8`, `--c-tertiary #F59E0B` (sparingly), `--c-bg #0A0C10`,
graphite surfaces `--c-surface/-2`, neutral lines `--c-line/-strong`,
`--radius 2px`. Inline styles reference the variables — never write a font
name or the accent hex literally again. Shared components: `.btn` +
`.btn-primary/-secondary/-inverted/-outline`, `.icon-btn`, `.field` (search),
`.label` (+ `-primary/-secondary/-tertiary`), `.progress`, `.nav-links a.active`.
The old `.hero-btn` and `.chip` are restyled onto the same tokens.

**The Hall of Armor (Phase 4, 10 Oct 2026).** Scene = `tasks/armor.png` with the
top 110 px cropped (it had a baked avatar + menu icon) → `public/media/hall/
armor-hall.webp` (1672×831) + `-1000.webp/.jpg`. The image shows **12 bays**
(6 per floor), not 10; bay rectangles were measured on the image, not spaced
evenly. Never scale/translate the scene image itself: hotspots are % of the
image box and would drift.

Taxonomy (final, approved 11 Oct 2026): every project in EXACTLY ONE category —
no secondary memberships, no project in two bays. Nine categories, counts
always derived from PROJECT_CATEGORY:

| Bay (image) | Category | n | Projects (MARK) |
|---|---|---|---|
| Brain, upper 1 | Machine Learning | 1 | XVIII |
| Eye, upper 3 | Computer Vision | 4 | VII, X, XI, XII |
| Heart, upper 4 | Medical AI | 2 | V, XVII |
| Planet, upper 5 | Systems & Graphics | 3 | XIX, XXIV, XXVI |
| Trophy, upper 6 | Benchmarks & Evaluation | 3 | I, VI, XXVIII |
| Robot arm, lower 2 | AI Agents & Tools | 5 | III, IV, XXV, XXVII, XXIX |
| Network, lower 3 | Hugging Face | 2 | XIV, XV |
| Globe, lower 5 | Applications | 4 | XX, XXI, XXII, XXIII |
| Book, lower 6 | LLMs & NLP | 5 | II, VIII, IX, XIII, XVI |

Inert (dimmed, not clickable): robot (upper 2), drone (lower 1), leaf (lower 4).
Never invent a category to fill them. Definitions: Benchmarks = the main
deliverable is evaluation/comparison; Hugging Face = the main deliverable is
published on the Hub (not "uses Transformers"); Medical AI = healthcare is the
primary purpose; Applications = products people use. Python, an LLM call or a
web UI alone is never a reason for a category. Adding a project = one
PROJECT_CATEGORY line.

**Mobile navbar (Phase 7).** In hamburger mode (≤1280px) the bar always has a
surface — rgba(10,12,16,0.72) + 12px blur + hairline — even over the home hero;
the hamburger is a 40×40 bordered button with aria-expanded/aria-controls.

**Nav identity.** The top-left brand is the illustrated avatar
(`public/media/avatar-64/128/256.webp`, `avatar-128.jpg`; original
`tasks/source-assets/gorkem-pp-illustrated.png`), round, cyan ring. The
Experience page keeps the real photo. `<html lang>` follows the language toggle.

**Article dates.** `articles.js` `date` is the paper's publication date as the
publisher's registry gives it. The VSR review's "Dec 2026" is its journal ISSUE
date (Crossref: ISWA vol. 32, published-print 2026-12; DOI registered
2026-07-11) — intentional, and later than the date it was read (Oct 2026). Never
replace a date with a guess; if only an issue date is verifiable, use it.

**The `removeChild` error — cause found (Phase 8).** `Failed to execute
'removeChild' on 'Node'` reappeared on the dev server right after React warned
"createRoot() on a container that has already been passed to createRoot()":
Vite's HMR had re-run src/main.jsx (log: "page reload src/main.jsx") and a
second React root was mounted over the same #root. Reproduced on demand by
editing main.jsx with a page open. Fix: main.jsx keeps one root per container
(`container.__reactRoot`). After the fix: no warning across repeated HMR edits
of main.jsx / i18n.jsx, and 1,600 fuzz steps (dev + prod, incl. Phase 8 routes)
with 0 errors. The production build never runs HMR, so it was not exposed.

**Carousel keyboard focus (Phase 8 fix).** Focusing an off-screen card made
the browser natively scroll `.sc-vp` (scrollLeft up to ~2,300 px) — the track
moves by transform only, so the loop's wrap maths drifted and keyboard focus
could land a card off-screen (intermittent p7 failure). `.sc-vp` now pins
scrollLeft to 0 (onScroll).

**Covers carry the MARK.** Every `cover.svg` prints its MARK number; it must
equal `mark` in projects.js. 19 stale labels were corrected on 10 Oct 2026.
20 covers also carry a faint "STARK INDUSTRIES" watermark (Marvel trademark) —
flagged to the owner, not yet removed.

**Research visuals.** `researchItems[].cover` + `coverKind`
(`illustration | screenshot | diagram | figure`, labelled via
`researchCoverKinds`) and an optional `project` slug. Never present generated
imagery as a real result; label diagrams as drawn for the site.

**Research images.** `researchItems[].cover` → `public/media/research/`
face-recognition, property-search, neuron-ai, email-phishing (.webp) and
**phq9.webp** (release: the owner-supplied 1600×900 artwork, lossless WebP
38.6 KB; original PNG kept in tasks/source-assets/phq9.png; it is 16:9 like the
frame, so `contain` shows it whole). The first four were cropped from the owner's generated composite
(`tasks/source-assets/research-composite.png`) below each panel's baked-in
title so no text is duplicated; the PHQ-9 crop also drops the composite's
"100+ participants" label (the data says ~100). They are conceptual art:
`coverKind: 'concept'` / `'concept-mock'` (Property Search, mock listings)
captions say so in EN/TR. Never present them as results. No bookshelf design
image exists — the bookcase is pure CSS. The older research covers
(`public/research/*/cover.webp`, `poc.webp`, `study.svg`) are no longer used.

**Footer.** Avatar (same files as the nav) + name + `heroTagline` + social
links + copyright. No credits paragraph: every photo is CC0 and Simple Icons is
CC0, so nothing on the page is legally required; the one licence that requires
a notice (Devicon, MIT) ships as `public/tech/LICENSES.txt` next to the icons.

**Iceberg naming (Phase 8, owner-confirmed).** The employer is always
**Iceberg Digital**. Its research context is written "Iceberg Digital — R&D"
(TR "Iceberg Digital — Ar-Ge") — never "Iceberg X R&D" or "Iceberg R&D" as if
it were another company. Roles stay as recorded (experience.js: AI Product
Developer Intern; the résumé-only expItems entry: AI Research Intern). The
GitHub repo description of property-search-map still says "Iceberg X R&D" and
shows live in the home panel — only the owner can change it on GitHub.

**Logos.** Technology logos: one map, `src/data/techLogos.js` (`TECH`,
`PLATFORM_LOGOS`, `projectTech(p)`), files in `public/tech/` (Devicon MIT,
Simple Icons CC0, platform marks from their own sites). `<TechLogos>` shows the name beside each logo by default. `projectTech` only
returns technologies the project lists in `language` / `stack` / `tags`, max 3,
never padded; render with `<TechLogos project={p} />`. Organisation logos live
in `public/orgs/`; `expItems[].logo` / `logoAlt` (or `icon: lab|code|research`
when no verified logo exists) and `competitions[].logo`. Med-Health = MEDAIGENCY
AI4PURPOSE Hackathon 2026 (per its repo README) → `/orgs/ai4purpose.png` from
ai4purpose.com. Iceberg Digital (iceberg-digital.co.uk), Intertech (intertech.com.tr) and Yeditepe
University (yeditepe.edu.tr, 30th-year mark cropped off) logos come from their own
sites; NEXA's is the owner-supplied file; Spotbox uses its App Store icon. The
Yeditepe Automotive Team logo is the owner-supplied file (orgs/yeditepe-automotive.png,
light plate; original in tasks/source-assets/experience/). No drifting
helmets, cursor glows, HUD brackets or particle effects — they were removed.
Kickers and nav are uppercase JetBrains Mono with wide tracking; section
titles are Instrument Serif; cyan is used for hairlines and labels only.
The nav is `position: fixed`, transparent over the home photograph
(`.site-nav.over-photo`) and solid elsewhere; `main` is offset by
`--nav-h` (67px, 59px ≤600px) on every page except home.

Any new photograph: CC0 or own work only, never film stills or anything with a
visible brand; grade it dark and desaturated; ship WebP (≤ ~100 KB for 1280px)
plus a JPG fallback; add the credit to `photoCredit` in both languages.

Shared global classes defined in `App.jsx`: `.chip`, `.hero-btn`,
`.hero-btn-primary`, `.link-hover`, `.reveal`, `.section-title`, `.container`,
`.grain`, `.metallic`.

Breakpoints already handled globally: **1560px** (nav clock hides), **1280px**
(the desktop nav collapses into the hamburger — eight links since Phase 6.1
removed Blog and Fun from it; adding one means re-checking Turkish at 1300px), **1100px**, **900px**, **680px**, **600px**. Any new
grid needs its own collapse rule in the page's `<style>` block. Every page must
survive a 400px viewport with no horizontal scroll.

The concept is Iron Man / Hall of Armor: projects are "armors" with a MARK
number and a codename. Keep it.

---

## 4. Bilingual rule — non-negotiable

Everything the visitor can read exists in English and Turkish.

- **Data files:** English in `field`, Turkish in `fieldTr`. The UI falls back to
  English when `fieldTr` is missing, so a missing translation fails silently —
  never rely on that.
- **i18n:** add the key to the `en` object *and* the `tr` object, in the same
  place, in the same order.
- Turkish uses Turkish typography: `’` for apostrophes, `%90,3` not `90.3%`,
  `1.037` not `1,037` for thousands.
- Never machine-paste a translation that reads like one. Turkish text should
  read as if written first in Turkish.

### Terms that stay in English inside Turkish copy

Translating a term the field itself never translates makes the page read as
machine output. These stay English, and take Turkish suffixes after an
apostrophe: `fine-tune’um`, `embedding’leri`, `prompt’u`, `pipeline’ı`.

| Keep | Never write |
| --- | --- |
| LLM, VLM, RAG, CV, ML, NLP, MCP | Büyük Dil Modelleri, Görsel Dil Modelleri |
| fine-tune, fine-tune’lu | ince ayar, ince ayarlı |
| embedding | gömme |
| prompt | istem |
| pipeline | işlem hattı, hat |
| benchmark | kıyaslama ölçütü |
| tokenizer, token | belirteç, simge |
| inference | çıkarım |
| decoder, encoder, attention | kod çözücü, kodlayıcı, dikkat |
| tool calling, tool call, function calling | araç çağırma, fonksiyon çağırma |
| backend, endpoint | arka uç, uç nokta |
| baseline, base model | taban, taban çizgisi |
| retrieval | getirme |
| byte-level | bayt seviyesi |
| grounding, probing, chain-of-thought | temellendirme, problama |

What **does** get translated, because Turkish has a settled word people
actually use: veri kümesi, eğitim, katman, eşik, sorgu, doğrulama, veritabanı,
kod tabanı, ajan, model, sürüm.

**Never do this sweep with a blind find-and-replace.** Turkish stems hide
inside other words — replacing `istem` corrupts `sistem` and `istemci`,
replacing `hat` corrupts `hata` and `hatta`. Match whole words with their
suffixes, then grep the result for damage before building.

---

## 5. `src/data/projects.js` schema

```js
{
  // --- identity: unchanged ---
  slug: 'kebab-case',              // = /project/<slug> and public/projects/<slug>/
  category: '<one of section 6>',
  cover: '/projects/<slug>/cover.svg',
  mark: 'MARK XXX',                // next roman numeral, never reuse
  codename: 'The Something',       // two or three words, in the Iron Man register
  title, subtitle, subtitleTr,     // subtitle answers "what is it?" in one line
  oneLiner, oneLinerTr,            // the card description — see section 7
  language: 'Python',              // shown as its own pill; never repeat it in tags
  color: '#rrggbb',                // unique per project
  glow: 'rgba(r,g,b,0.5)',         // same colour, 0.5 alpha
  tags: ['2', 'to', '4'],          // see section 7
  github: gh('repo-name'),

  // --- framing ---
  role: 'Solo' | 'Contributor',    // Contributor means other people committed too
  period: '2026',
  status: 'shipped' | 'research' | 'archived',
  tier: 'featured' | 'supporting' | 'research' | 'experimental',
                                   // orders the grid; never rendered as a label

  // --- the argument, in page order ---
  problem, problemTr,              // REQUIRED · 2–3 sentences — see section 7
  overview, overviewTr,            // REQUIRED · one paragraph, renders as "What I Built"
  metrics: [{ label, value, condition }],   // 2–6 rows, or omitted entirely when
  metricsTr: [...],                         // nothing was measured — see section 7.
                                            // If omitted, `decisions` becomes required.
  useCases: [...], useCasesTr: [...],       // optional · 2–4
  flow, flowTr,                             // REQUIRED · one line: "Input → … → Output"
  architecture: [...], architectureTr: [...],   // 1–3 paragraphs
  decisions: [{ choice, why, tradeoff }],   // optional · 2–4
  decisionsTr: [...],
  contribution: [...], contributionTr: [...],   // REQUIRED · 2–4 — see section 7
  limitations: [...], limitationsTr: [...],     // optional
  futureWork: [...], futureWorkTr: [...],       // optional
  challenges: [...], challengesTr: [...],       // optional · Field Notes
  lessons: [...], lessonsTr: [...],             // optional · Field Notes

  // --- honesty about origin ---
  provenance: 'authored' | 'generated' | 'mixed' | null,
  provenanceNote, provenanceNoteTr,   // REQUIRED whenever the project ships
                                      // data, questions, samples or corpora

  // --- supporting material ---
  images: [{ src, caption, captionTr }],
  stack: [{ label: 'Languages', items: [...] }],
}
```

There is no `metric` field any more. The card chip is derived from
`metrics[0]`, so the number on the card and the number on the page cannot drift
apart. A project with no measurable result carries no `metrics` row it cannot
defend — see section 7, **Results**.

`stack` labels are translated through the `stackLabels` map in `i18n.jsx` —
reuse existing labels (`Languages`, `Frameworks`, `Libraries`, `Tools`,
`Testing`, `Storage`, `Structure`, `Domain`, `AI Models`) rather than inventing
new ones.

### 5a. Page order

The reader gets three depths: what it is in ten seconds, whether there is real
work in sixty, and how it was done if they keep going. The order below is what
delivers that. **Optional sections are not rendered when empty** — a typical
project shows seven or eight of these, only the deepest show all eleven.

| § | Section | Fields | Required |
| --- | --- | --- | --- |
| — | Cover | `cover` — first element on the page, large | yes |
| — | Header | `mark` · category · `codename` · `role` · `period` · `status` · `title` · `subtitle` · `oneLiner` | yes |
| — | Key results | first 3 rows of `metrics` | only if measured |
| 01 | Technical Stack | up to 6 logos (`projectTech`) + `stack` rows | yes |
| 02 | Problem & solution | `problem` · `overview` · `useCases` | yes |
| 03 | Technical implementation | `flow` + `architecture` · `decisions` · `contribution` · provenance | yes |
| 04 | Results & limitations | `metrics` · `limitations` · `futureWork` · `challenges` · `lessons` | if any exist |
| 05 | Screenshots | `images` — first 6, rest collapsed | yes |
| 06 | Source | `github` | yes |

(Phase 2, October 2026: regrouped into these blocks at the owner's request —
cover first, results before the narrative. Applies to every project; never
reorder per project.)

Two things this order fixes. **Results moved from sixth to third**, because
burying `90.3% mAP@50` under eleven screenshots and seven hundred words is what
made a specific page read as a vague one. **Screenshots moved from first to
tenth**, because a gallery before any explanation gives the reader pictures
they have no frame for.

Never reorder these per project. If a project seems to need a different order,
the content is in the wrong field.

---

## 6. Categories

Defined in `CAT_ORDER` / `CAT_TR` at the top of `src/pages/ProjectPage.jsx`.
The array order is also the display order of the grouped sections.

```
Research & Benchmarks   Araştırma & Benchmark
LLM & NLP               Dil Modelleri & NLP
AI Agents & Tooling     Yapay Zekâ Ajanları
Computer Vision         Bilgisayarlı Görü
Machine Learning        Makine Öğrenmesi
Systems & Graphics      Sistem & Grafik
Apps & Tools            Uygulamalar & Araçlar
```

A project belongs to exactly one category. Only add a category when three or
more projects would sit in it.

---

## 7. Content rules

**One-liners.** Lead with what the thing does or why it is interesting. Never
open with "A Python-based…", "A machine-learning project that…", "An AI-powered…".
Two clauses maximum. Do not repeat the tags or the metric inside it.

**Tags.** Two to four, and they must *distinguish* the project. Never include
the `language` value — it already renders as its own pill next to them. Never
include generic filler: `AI`, `Machine Learning`, `Deep Learning`, `Open Source`,
`Neural Networks`.

**One bucket per kind of claim.** There is no `highlights` array any more. It
was a single numbered list that rendered a result, an engineering decision, a
UI feature and a limitation at identical weight, so nothing in it could carry
emphasis. `90.3% mAP@50` and *"used YOLO11"* are not the same kind of
statement: one is an outcome, the other an implementation detail. Each sentence
now goes to the field that matches what it is:

| If the sentence is… | It goes in |
| --- | --- |
| a measured outcome | `metrics` |
| a choice with a reason and a cost | `decisions` |
| where the technique applies | `useCases` |
| what you personally did | `contribution` |
| where it falls short | `limitations` |
| a research finding | `overview` or `limitations`, whichever it argues |
| the shape of the system | `architecture` |
| UI chrome — themes, buttons, shortcuts | nowhere |

That last row is not a joke. *"Dark-themed UI with instant green/red feedback"*,
*"shuffle and restart at any point"*, *"all settings live at the top of one
file"* — roughly fifteen bullets like these were carrying the same visual
weight as a benchmark result. They are deleted, not relocated.

For most projects this is re-filing, not rewriting. The sentences already
exist; they were just in one undifferentiated bucket.

**The Problem.** Two to three sentences on what was broken and where existing
approaches fell short. It comes before the project, not inside it. Do not open
with the solution, and do not write a problem statement that would fit any
other project in the grid — if it fits `turkish-medical-rag` and
`re-mind` equally, it is not a problem statement.

**Use cases are omitted, never invented.** `useCases` is left out entirely when
a project has no honest real-world application. `gorkem-os` and
`miniature-transformers-from-scratch` are learning projects and say so; giving
them an invented domain is exactly the padding this manual exists to prevent.

**Flow.** One line, mechanism only, arrows between real stages:

> `Question → e5-large embed → Chroma top-5 → gate 0.575 → Claude, context-only`

It answers "how does it work" in three seconds, before the architecture
paragraphs. Every project can have one.

**Mechanism, not category.** Not *"a RAG system"* — *"a 0.575 cosine gate that
runs before the model."* Describe what a project does, not what kind of thing
it is. If the sentence you wrote would also be true of another project, it is
the wrong sentence.

**Limitations are a section, not an apology.** Plain statements under their own
heading, never the seventh bullet of a list of seven. `turkish-medical-rag`
saying its threshold was calibrated on the evaluation set, so the perfect
scores reflect calibration rather than generalisation, is the strongest
sentence on the site. It should read as judgement, which means it needs its own
heading.

**Results.** `metrics` holds quantities that carry the project's claim. Two to
six rows, and no padding to reach a count — the old "exactly 5 rows" rule is
gone and is not coming back, because it was what produced `License =
Apache-2.0` and `Platforms = Linux · macOS · Windows` sitting next to
`mAP@50 = 0.903`.

Two kinds of row qualify. A **measurement** says how well the thing works —
`0.903 mAP@50`, `< 100 ms per frame`, `17% → 92%`. A **scope count** says how
much was built or processed — `800 items`, `140,000 images`, `535 tests`. Both
take a `condition`: a measurement states what it was measured on, a scope count
states what was counted. What does not qualify is configuration — licence,
supported platforms, operating-system list. Those go in `stack` or nowhere.

If a project has one real number, it gets one row. If it has none, `metrics` is
omitted entirely, the Results section does not render, and `decisions` becomes
required in its place — the engineering choice carries the page instead.
`vlm-groundbench` does this correctly with "no model runs yet, by design,"
which is a more interesting claim than an invented score. Nine projects are in
this position today; none of them should gain a number to fill the gap.

**Numbers carry their condition.** Every figure comes from the repository, the
README, or a real run. Never estimate, never round a number you have not seen,
never write a placeholder score. On top of that, every number states what it
was measured on:

| Not this | This |
| --- | --- |
| `0.99 F1` | `0.99 F1` · *held-out CEAS_08 test set* |
| `90.3% mAP@50` | `90.3% mAP@50` · *validation set, 117-photo dataset* |
| `~100 participants` | only if the study record supports it |

That is what the `condition` key is for. **If you cannot write the condition,
you do not write the number.** A number without its condition is a claim; with
it, it is a result.

**Provenance.** Any project that ships data, questions, samples or a corpus
declares where that content came from, in `provenance` and one plain sentence
in `provenanceNote`. Generated content is never described with a verb that
implies hand authorship.

This rule exists because MIHENK's copy said *"Wrote 800 original reasoning
items"* while all 800 records in its own data files carry
`"source": "orijinal-AI-üretim"`. The repository was honest — it declares
provenance on every record — and the portfolio layer was the one that drifted.
Say **designed and generated**, not **wrote**. The real contribution there is
the benchmark design, the schema, the scorer, the LCI metric, the contamination
policy and running eleven models, and none of that needs an overstated verb.

`tr-sts-dataset` is the model to copy: its README states that the sentences are
template-generated and the scores are model outputs rather than human
judgements, and it loses nothing by saying so.

**Claims never outrun evidence.** A capability is only presented as an
achievement when there is a validation set and a measurement behind it. Where
there is not, describe the mechanism instead of the outcome.

- `writing-analyzer` has 28 test files and 12,391 lines of real engineering,
  but its benchmark folder holds four sample texts and no measured result, and
  its own `docs/diagnostics.md` works out that the scorer structurally cannot
  exceed ~24.5 on AI text against a MODERATE threshold of 30. So it does not
  claim to score how human a text reads. It extracts six stylometric signals
  and produces a weighted risk profile. The diagnostics finding belongs in
  `limitations`, where it reads as self-assessment rather than a weakness.
- Where a project touches people — health data, human subjects, anything about
  a named individual — `limitations` states the consent position, the
  anonymisation position, and what the tool is not. `depression-phq9-analysis`
  needs all three, and its participant count stays out of `metrics` until the
  study record supports it.

Never write these lines to look responsible. Write them because an unbacked
claim costs more credibility than the claim was worth.

**My Contribution is evidence, not assumption.** `contribution` is filled from
the repository — the code, the tests, the commits, the README — and never from
what the project sounds like it must have involved. Two to four lines. Name the
off-the-shelf component first, by name, then what you added:

> Pretrained ArcFace, used off the shelf, with no training at all. The
> contribution is the identity-disjoint protocol and the measurement.

Claiming less is what makes the rest believable. And the separation matters in
both directions: `pose-invariant-face-id` trained no model and that is the
design, not a gap; `yolo-custom-detector`'s real work was shooting and
labelling 117 photos and catching the scene-memorisation failure, not calling
Ultralytics.

Note the limit of the evidence. Most repositories here have between two and
nine commits, usually pushed in bulk on one day, so **commit history does not
separate hand-written code from generated code.** Only `mihenk-benchmark`
carries explicit Claude co-authorship, on 33 of 44 commits. Where you cannot
tell, describe what the code does and leave authorship alone.

**Information hierarchy on a card:** codename → title → one-liner → metric →
role → language pill + up to 3 tags → open button. Do not say the same thing
twice across those layers.

---

## 8. `src/data/articles.js` schema

```js
{
  read: [{
    slug, accent: '#rrggbb',
    title, authors: [...], affiliations, venue, arxiv, url,
    pdf: null,                     // only fill when redistribution is licensed
    date, readOn, readOnTr,
    category, categoryTr, tags, tagsTr,
    summary, summaryTr,            // 1–2 sentences, plain language
    notes: [{ heading, headingTr, points: [...], pointsTr: [...] }],
    board: {                       // optional comparison block
      caption, captionTr, columns, columnsTr,
      rows: [{ name, scores: [...], verdict, verdictTr }],
    },
  }],
  written: [{ slug, status: 'coming-soon', title, titleTr, summary, summaryTr }],
}
```

**Reading notes are written in my voice, not as an abstract.** What caught my
attention, what surprised me, what I would actually use. A note that reads like
a generated summary has failed.

**Keep them short: three to six bullets in total, across at most four
sections.** Not a walk through every experiment, figure and appendix. Numbers
appear only where they carry a point I actually cared about, and they are quoted
exactly from the paper's own tables.

A `board` block is for answering "which model is good at what", not for listing
every model the paper touched. One short line per model.

Adding a paper is a data edit only — `ArticlesPage.jsx` needs no change.

---

## 9. Assets

- `public/projects/<slug>/cover.svg` — 800×500, dark background, the project's
  accent colour, a diagram of the actual mechanism. Copy the structure of an
  existing cover.
- Real screenshots beat illustrations. Copy them from the project repo.
- `public/og/<slug>.png` — **PNG, 1200×630, filename identical to the slug.**
  Required, otherwise the social preview 404s: `ProjectDetail.jsx` always sends
  `/og/<slug>.png`, and `useSeo.js` only falls back to `/og/default.png` when
  no image is passed at all. `twitter:card` is `summary_large_image`, which is
  what fixes the ratio. A screenshot is fine.
- Currently missing, so their previews 404 today: `llm-lora-finetuning`,
  `wiki2bpe`, `automotive-racing-assistant`, `vlm-groundbench`.
- `public/projects/find-the-best/` and `public/og/find-the-best.png` belong to
  no project any more and can be deleted.
- Keep single files under ~400 KB. Never commit a PDF to the repo without
  checking the licence.

---

## 9b. Release & deploy (11 October 2026)

- Deploy = `npm run deploy:full` (build, then gh-pages publishes dist/ as a new
  commit on the `gh-pages` branch — no force). GitHub Pages serves gh-pages;
  check the live `assets/index-*.js` name against dist/index.html. No GitHub
  Actions workflow exists (.github is gitignored).
- dist/ is built from the LOCAL public/ folder, so anything left in public/
  ships even if it is untracked. Unreferenced assets were moved to
  tasks/source-assets/unused-public/ (armor-stant.png 2.7 MB,
  tech-stack-wallpaper.webp, research/* old covers).
- Social preview (d7b208c): public/og-portfolio.jpg, 1200×630 JPEG q90 (~291 KB),
  cropped from tasks/source-assets/url.png (1672×941; rows 20–898, i.e. only
  empty frame removed). Full static OG/Twitter set lives in index.html (all
  HashRouter routes share it); useSeo falls back to the same file. Project
  pages still send /og/<slug>.png. If the banner changes, use a NEW filename
  (e.g. og-portfolio-2.jpg) so platform caches pick it up. Keep it < ~300 KB
  (a full-colour PNG was 1.07 MB; 256-colour PNG dithered visibly).
- Favicon (fixed d7b208c): favicon.ico (16/32/48) + favicon-32.png +
  apple-touch-icon.png (180), made from the round avatar. /favicon.svg is
  no longer referenced.
- The GitHub API rate-limits by IP (60/h unauthenticated); when exhausted the
  panel shows the labelled curated fallback. That is expected, not a bug.

## 10. Checklist before committing

- [ ] `npm run build` passes
- [ ] Every new string exists in both `en` and `tr`
- [ ] New page registered in: `App.jsx` routes, desktop nav, mobile menu, `CommandPalette.jsx`
- [ ] New project: cover.svg + og png exist, MARK number is unused, colour is unused
- [ ] Tags 2–4, no language duplication, no filler tags
- [ ] Every number traced to a real source
- [ ] Every number in `metrics` carries its `condition`
- [ ] `problem`, `flow` and `contribution` are filled — none of the three is optional
- [ ] `contribution` names the off-the-shelf component, and every line is
      backed by something in the repository
- [ ] If the project ships data or generated content, `provenance` and
      `provenanceNote` are set, and no verb implies hand authorship
- [ ] No claim in the copy outruns a measurement that exists
- [ ] Checked at 400px width
- [ ] Counts in `introStats` (`i18n.jsx`) still match reality
- [ ] Commit, then `npm run deploy:full`

---

## 11. What changed on 12 September 2026, and why

This file is gitignored, so `git diff` will not show its history. Removed rules
are recorded here rather than deleted, so that nothing looks like an oversight
later.

### Removed

| Removed | Why |
| --- | --- |
| `highlights` / `highlightsTr`, 5–7 bullets | One list rendering results, decisions, features and limitations at identical weight. Split across `metrics`, `decisions`, `contribution`, `limitations` — see section 7. |
| `results: [...]` with **exactly 5 rows** | The count forced padding. Replaced by `metrics`, 2–6 rows, measurements only. |
| `metric` / `metricTr` | Derived from `metrics[0]` instead, so the card and the page cannot disagree. |
| `architecture: [para1, para2]` fixed at two | Now 1–3 paragraphs, preceded by `flow`. |

### The contradiction this resolves

Section 7 said *"never write a placeholder score"* while section 5 mandated
five `results` rows. A project with two real numbers could not satisfy both.
The padding rows — `License = Apache-2.0`, `Platforms = Linux · macOS ·
Windows`, `Assets required = 0` — were the output of that contradiction, not a
failure to follow the rules. Removing the fixed count is what makes the
"never manufacture" rule enforceable.

### Added

`role`, `period`, `status`, `tier`, `problem`, `metrics` (with `condition`),
`useCases`, `flow`, `decisions`, `contribution`, `limitations`, `futureWork`,
`challenges`, `lessons`, `provenance`, `provenanceNote`; section 5a page order;
and in section 7 the rules on claim bucketing, problem statements, use-case
omission, flow lines, mechanism over category, limitations as a section,
results, conditions on numbers, provenance, claims versus evidence, and
contribution as evidence.

### Evidence behind the new rules

All 29 repositories were cloned and read on 12 September 2026.

- **MIHENK.** All 800 records carry `"source": "orijinal-AI-üretim"`; 33 of 44
  commits are Claude co-authored. The repository declares provenance honestly;
  the portfolio copy said "wrote". This produced the **Provenance** rule.
- **writing-analyzer.** 65 source files, 28 test files, 12,391 lines — but four
  benchmark samples, no measured result, and a `docs/diagnostics.md` showing
  the scorer cannot reach MODERATE on AI text. This produced the **Claims never
  outrun evidence** rule.
- **depression-phq9-analysis.** No consent or ethics statement; participant name
  used directly as participant id (`response_fetcher.py:86`); README describes
  pilot scale as "10–50+" with no record of ~100 participants. No personal data
  is committed to the repository. This produced the second half of the same rule.
- **Verified as correct:** 90.3% mAP@50 and 117 photos; the 0.575 threshold,
  2,072 chunks and 24,612 → 22,162 corpus; 535 tests; 800 items at 400 TR /
  400 EN; 41 of 51 NEXA commits.
- **Method limit:** most repositories have 2–9 commits pushed in bulk, so
  commit history cannot separate authored from generated code. Recorded in the
  **My Contribution** rule.

### Not done in this pass

`projects.js` still uses the old schema, `caseStudies.js` and
`CaseStudyPage.jsx` still exist, the render order is unchanged, and the four OG
images are still missing. This revision changed the manual only.
