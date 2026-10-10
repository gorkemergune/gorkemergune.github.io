// The Articles page as two bookcases (Phase 6). Nothing new is authored here:
// this only normalises the two real sources into "books".
//
//   READ    ← data/articles.js `read` (papers Görkem read, with his notes)
//   WRITTEN ← i18n `blogItems` + `blogPosts` (essays Görkem wrote, full text
//             stored locally in EN and TR). Since Phase 6.1 this is their only
//             home: the standalone /blog pages were removed and /blog/<slug>
//             redirects to /articles?book=write-<slug>. The `written`
//             placeholder in articles.js ("Coming soon") is skipped.
//
// A book never sits in both cases. Books lie flat in stacks (Phase 6.1), so
// each collection is sorted newest-first by its real date ("Aug 2026" /
// "Ağu 2026"); if any date in a collection cannot be read, the source order
// is kept instead of guessing. Spine looks (thickness, length, colour) are
// derived from the slug so they stay stable across renders and languages.

import ARTICLES from './articles';

// Restrained cloth/leather tones; the reading case leans cool, the writing
// case warm, so the two collections read as different at a glance.
const READ_TONES = ['#1d2a3a', '#23303f', '#1f2f2c', '#2a2438', '#1b2633'];
const WRITE_TONES = ['#3a2a1d', '#33251c', '#2f2a1f', '#3b2420', '#2b2c22'];

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

// thickness = the flat book's height in px; length = its width in % of the stack.
function spine(slug, tones) {
  const h = hash(slug);
  return { thickness: 54 + (h % 4) * 6, length: 86 + (h % 5) * 3, tone: tones[h % tones.length] };
}

const MONTHS = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  oca: 1, şub: 2, sub: 2, nis: 4, haz: 6, tem: 7, ağu: 8, agu: 8, eyl: 9, eki: 10, kas: 11, ara: 12,
};

// "Aug 2026" → 202608; null when the string is not a month + year.
export function dateKey(d) {
  const m = String(d || '').trim().toLowerCase().match(/^([a-zçğıöşü]{3})[a-zçğıöşü]*\.?\s+(\d{4})$/);
  if (!m || !MONTHS[m[1]]) return null;
  return Number(m[2]) * 100 + MONTHS[m[1]];
}

export function newestFirst(list) {
  const keyed = list.map((b, i) => ({ b, i, k: dateKey(b.date) }));
  if (keyed.some((x) => x.k === null)) return list;
  return keyed.sort((x, y) => y.k - x.k || x.i - y.i).map((x) => x.b);
}

// Spine label: text before a colon if there is one, otherwise the title cut
// at a word boundary. The full title is always available on hover/focus and
// in the reader.
export function spineTitle(title, max = 38) {
  const head = title.split(':')[0].trim();
  if (head.length <= max) return head;
  const cut = head.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

const yearOf = (d) => (String(d || '').match(/\d{4}/) || [''])[0];

export function buildLibrary(t, lang) {
  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);

  const read = newestFirst(ARTICLES.read.map((p) => ({
    id: `read-${p.slug}`,
    collection: 'read',
    slug: p.slug,
    title: p.title,
    short: spineTitle(p.title),
    authors: p.authors,
    byline: p.authors.length > 2 ? `${p.authors[0].split(' ').slice(-1)[0]} et al.` : p.authors.join(', '),
    year: yearOf(p.date),
    date: p.date,
    venue: p.venue,
    ref: p.arxiv,
    topic: loc(p.category, p.categoryTr),
    tags: loc(p.tags, p.tagsTr) || [],
    readOn: loc(p.readOn, p.readOnTr),
    summary: loc(p.summary, p.summaryTr),
    notes: p.notes || [],
    board: p.board || null,
    url: p.url,
    pdf: p.pdf,
    accent: p.accent,
    spine: spine(p.slug, READ_TONES),
  })));

  const items = t('blogItems');
  const posts = t('blogPosts') || {};
  const written = newestFirst((Array.isArray(items) ? items : []).filter((b) => b.slug && posts[b.slug]).map((b) => {
    const post = posts[b.slug];
    return {
      id: `write-${b.slug}`,
      collection: 'written',
      slug: b.slug,
      title: post.title || b.title,
      short: spineTitle(post.title || b.title, 34),
      authors: ['Görkem Ergüne'],
      byline: 'G. Ergüne',
      year: yearOf(post.date || b.date),
      date: post.date || b.date,
      topic: post.category || b.category,
      readTime: post.readTime || b.readTime,
      summary: post.description || b.excerpt,
      body: Array.isArray(post.body) ? post.body : [],
      accent: '#F59E0B',
      spine: spine(b.slug, WRITE_TONES),
    };
  }));

  return { read, written };
}
