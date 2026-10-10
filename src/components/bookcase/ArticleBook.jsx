import { useLang } from '../../i18n.jsx';

// One real article as a hardcover lying flat in a stack, spine to the
// visitor: a coloured cover edge, head and tail bands, the title written
// horizontally (two lines at most, full title in the hover/focus panel and
// the reader) and the year. It is a <button>; hover/focus slides it out of
// the stack and lights its edge.
export default function ArticleBook({ book, onOpen, offset = 0 }) {
  const { t } = useLang();
  const { thickness, length, tone } = book.spine;
  return (
    <button
      type="button"
      className={`bk-book ${book.collection}`}
      style={{ '--bk-th': `${thickness}px`, '--bk-len': `${length}%`, '--bk-tone': tone, '--bk-acc': book.accent, '--bk-off': `${offset}px` }}
      onClick={() => onOpen(book.id)}
      aria-label={`${book.title} — ${book.byline}${book.date ? `, ${book.date}` : ''}. ${t('bkOpen')}`}
    >
      <span className="bk-edge" aria-hidden="true" />
      <span className="bk-title" aria-hidden="true">{book.title}</span>
      <span className="bk-year" aria-hidden="true">{book.date || book.year}</span>
      <span className="bk-tip" aria-hidden="true">
        <span className="bk-tip-t">{book.title}</span>
        <span className="bk-tip-m">{book.byline}{book.date ? ` · ${book.date}` : ''}{book.topic ? ` · ${book.topic}` : ''}</span>
      </span>
    </button>
  );
}
