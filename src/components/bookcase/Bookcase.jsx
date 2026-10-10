import ArticleBook from './ArticleBook';
import EmptyCollection from './EmptyCollection';

// A tall bookcase whose books lie flat in stacks (Phase 6.1). `books` arrive
// newest-first (data/library.js), so the first stack holds the newest books
// with the newest on top, and older books continue underneath and then in the
// next stack. Stacks fill shelves left to right; more books add stacks and
// shelves, never overflow. Empty stack slots and spare shelves hold dim,
// untitled, aria-hidden volumes so they never read as entries.
// One wide stack per shelf keeps every title on at most two horizontal lines
// in a ~600px case; a small dim stack fills the rest of the shelf.
const STACK_SIZE = 5;
const STACKS_PER_SHELF = 1;
const MIN_SHELVES = 3;

const chunk = (list, n) => Array.from({ length: Math.ceil(list.length / n) }, (_, i) => list.slice(i * n, (i + 1) * n));

// Decorative flat volumes: [thickness px, length %, tone].
const DECO = [[22, 84, '#1a1d23'], [18, 72, '#1d1a16'], [26, 90, '#171b20'], [20, 78, '#1c1915'], [24, 68, '#181b21'], [16, 86, '#1b1814']];

function DecoStack({ seed, count, side }) {
  return (
    <span className={`bk-stack bk-deco${side ? ' side' : ''}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const [th, len, c] = DECO[(seed * 2 + i) % DECO.length];
        return <span key={i} style={{ height: th, width: `${len}%`, background: `linear-gradient(180deg, ${c}, #0d0f12)` }} />;
      })}
    </span>
  );
}

export function Shelf({ children, label }) {
  return (
    <div className="bk-shelf">
      <div className="bk-row">{children}</div>
      <div className="bk-plank" aria-hidden="true">{label && <span>{label}</span>}</div>
    </div>
  );
}

export default function Bookcase({ id, kicker, title, sub, books, emptyText, onOpen, side }) {
  const stacks = chunk(books, STACK_SIZE);
  const shelves = chunk(stacks, STACKS_PER_SHELF);
  while (shelves.length < MIN_SHELVES) shelves.push([]);
  const seed = side === 'right' ? 3 : 0;

  return (
    <section className={`bk-case ${side}`} aria-labelledby={`${id}-title`}>
      <header className="bk-head">
        <span className="bk-kicker">{kicker} · {String(books.length).padStart(2, '0')}</span>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{sub}</p>
      </header>
      <div className="bk-frame">
        <span className="bk-crown" aria-hidden="true" />
        {shelves.map((row, si) => (
          <Shelf key={si} label={String(si + 1).padStart(2, '0')}>
            {books.length === 0 && si === 0 && <EmptyCollection text={emptyText} />}
            {row.map((stack, ki) => (
              <ol key={ki} className="bk-stack" aria-label={`${title} — ${si * STACKS_PER_SHELF + ki + 1}`}>
                {stack.map((b, bi) => <li key={b.id}><ArticleBook book={b} onOpen={onOpen} offset={(bi * 7 + ki * 3) % 13} /></li>)}
              </ol>
            ))}
            {row.length > 0
              ? <DecoStack seed={seed + si} count={3} side />
              : <DecoStack seed={seed + si} count={2 + (si % 3)} />}
          </Shelf>
        ))}
      </div>
    </section>
  );
}
