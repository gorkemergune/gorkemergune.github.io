import { useEffect, useRef } from 'react';
import { ArrowUpRight, FileText, X } from 'lucide-react';
import { useLang } from '../../i18n.jsx';

// A book opened from the shelf: a two-page spread on desktop (left: title,
// authors, metadata, summary, links; right: the reading notes or the full
// essay), one column on mobile. Modal dialog: Esc, backdrop and the close
// button dismiss it; focus moves in and is trapped while open.
// Read books show Görkem's own notes and the paper's link — never the paper's
// text. Written books show the essay's full text from i18n `blogPosts`.
export default function BookReader({ book, onClose }) {
  const { t } = useLang();
  const panel = useRef(null);
  const closeBtn = useRef(null);
  const read = book.collection === 'read';

  useEffect(() => {
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab' || !panel.current) return;
      const f = panel.current.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');
      if (!f.length) return;
      const first = f[0]; const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const meta = read
    ? [book.venue, book.date, book.ref, book.readOn && `${t('articlesReadOn')} ${book.readOn}`].filter(Boolean)
    : [book.date, book.topic, book.readTime && `${book.readTime} ${t('bkReadTime')}`].filter(Boolean);

  return (
    <div className="br-back" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{`
        .br-back { position: fixed; inset: 0; z-index: 300; background: rgba(5,6,9,0.84); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 32px 24px; animation: br-fade 0.25s ease-out; }
        @keyframes br-fade { from { opacity: 0; } to { opacity: 1; } }
        .br-book { position: relative; width: 100%; max-width: 1180px; height: min(86vh, 820px); display: grid; grid-template-columns: 1fr 1fr; perspective: 1800px; animation: br-open 0.55s cubic-bezier(0.2,0.8,0.2,1); filter: drop-shadow(0 40px 60px rgba(0,0,0,0.65)); }
        @keyframes br-open { from { opacity: 0; transform: scale(0.94) translateY(14px); } to { opacity: 1; transform: none; } }
        .br-page { position: relative; overflow-y: auto; padding: 46px 44px 40px; background:
            linear-gradient(180deg, rgba(245,158,11,0.035), rgba(245,158,11,0) 30%),
            linear-gradient(180deg, #17150f 0%, #121009 100%);
          border: 1px solid #2c271c; scrollbar-width: thin; scrollbar-color: #3a3326 transparent; }
        .br-left { border-radius: 6px 0 0 6px; box-shadow: inset -26px 0 30px -18px rgba(0,0,0,0.75); border-right: none; }
        .br-right { border-radius: 0 6px 6px 0; box-shadow: inset 26px 0 30px -18px rgba(0,0,0,0.75); transform-origin: left center; animation: br-turn 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        @keyframes br-turn { from { transform: rotateY(-62deg); opacity: 0.4; } to { transform: none; opacity: 1; } }
        .br-book::after { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; transform: translateX(-1px); background: linear-gradient(180deg, transparent, rgba(0,0,0,0.9), transparent); pointer-events: none; }
        .br-close { position: absolute; right: -14px; top: -14px; z-index: 3; }
        .br-kick { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a86a; }
        .br-left h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(24px, 2.4vw, 32px); line-height: 1.18; letter-spacing: -0.015em; color: #f1ece2; margin-top: 16px; }
        .br-authors { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: #b8ad98; margin-top: 14px; }
        .br-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
        .br-meta span { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.06em; color: #d8cdb6; padding: 4px 8px; border: 1px solid #3a3326; }
        .br-rule { height: 1px; background: linear-gradient(90deg, #3a3326, transparent); margin: 24px 0; }
        .br-sum { font-family: var(--font-body); font-size: 16px; line-height: 1.7; color: #e3dccd; }
        .br-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
        .br-tags span { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #a89a7e; }
        .br-tags span + span::before { content: '·'; margin-right: 6px; color: #5a5040; }
        .br-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .br-h { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a86a; margin-bottom: 18px; }
        .br-note + .br-note { margin-top: 26px; }
        .br-note h3 { font-family: var(--font-display); font-weight: 500; font-size: 19px; color: #f1ece2; margin-bottom: 12px; }
        .br-note ul { list-style: none; display: flex; flex-direction: column; gap: 11px; }
        .br-note li { display: flex; gap: 11px; font-family: var(--font-body); font-size: 15px; line-height: 1.7; color: #d6cebd; }
        .br-note li::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--c-tertiary); margin-top: 10px; flex: none; }
        .br-body p { font-family: var(--font-body); font-size: 16px; line-height: 1.8; color: #e0d8c8; }
        .br-body p + p { margin-top: 16px; }
        .br-board { margin-top: 30px; }
        .br-board .art-row { display: grid; grid-template-columns: 130px repeat(var(--art-cols, 3), minmax(80px, 1fr)); gap: 12px; align-items: baseline; padding: 12px 0; border-top: 1px solid #2a251b; }
        .br-board .art-row-head { border-top: none; padding-bottom: 6px; }
        .br-board .art-cell-label { display: none; }
        .br-board .ch { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7d64; line-height: 1.4; }
        .br-board .mn { font-family: var(--font-mono); font-size: 12px; color: #e7c27a; }
        .br-board .sc { font-family: var(--font-mono); font-size: 12.5px; color: #e3dccd; font-variant-numeric: tabular-nums; }
        .br-board .vd { grid-column: 1 / -1; font-family: var(--font-body); font-size: 13.5px; line-height: 1.6; color: #b8ad98; }
        .br-board .cap { font-family: var(--font-body); font-size: 12.5px; line-height: 1.6; color: #8a7d64; margin-top: 12px; font-style: italic; }
        @media (prefers-reduced-motion: reduce) { .br-back, .br-book, .br-right { animation: none; } }
        @media (max-width: 860px) {
          .br-back { padding: 0; align-items: stretch; }
          .br-book { height: auto; max-height: none; grid-template-columns: 1fr; overflow-y: auto; perspective: none; filter: none; }
          .br-book::after { display: none; }
          .br-page { overflow: visible; padding: 28px 20px; border-radius: 0 !important; box-shadow: none; border-left: none; border-right: none; }
          .br-left { padding-top: 64px; }
          .br-right { animation: none; border-top: none; }
          .br-close { position: fixed; right: 12px; top: 12px; }
          .br-board .art-row-head { display: none; }
          .br-board .art-row { grid-template-columns: 1fr; gap: 6px; }
          .br-board .art-cell { display: flex; justify-content: space-between; gap: 12px; }
          .br-board .art-cell-label { display: inline; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7d64; }
        }
      `}</style>
      <div ref={panel} className="br-book" role="dialog" aria-modal="true" aria-labelledby="br-title">
        <button ref={closeBtn} type="button" className="icon-btn br-close" onClick={onClose} aria-label={t('bkClose')}>
          <X size={16} strokeWidth={1.6} />
        </button>

        <article className="br-page br-left" tabIndex={0}>
          <div className="br-kick">{read ? t('bkReadTitle') : t('bkWriteTitle')}{book.topic ? ` · ${book.topic}` : ''}</div>
          <h2 id="br-title">{book.title}</h2>
          <p className="br-authors">{book.authors.join(' · ')}</p>
          {meta.length > 0 && <div className="br-meta">{meta.map((m) => <span key={m}>{m}</span>)}</div>}
          <div className="br-rule" />
          {book.summary && <p className="br-sum">{book.summary}</p>}
          {book.tags && book.tags.length > 0 && <div className="br-tags">{book.tags.map((g) => <span key={g}>{g}</span>)}</div>}
          <div className="br-actions">
            {book.url && (
              <a className="btn btn-primary" href={book.url} target="_blank" rel="noopener noreferrer">
                {t('bkReadOriginal')} <ArrowUpRight size={14} strokeWidth={1.6} />
              </a>
            )}
            {book.pdf && (
              <a className="btn btn-secondary" href={book.pdf} download>
                {t('articlesAnnotated')} <FileText size={14} strokeWidth={1.6} />
              </a>
            )}
          </div>
        </article>

        <article className="br-page br-right" tabIndex={0} aria-label={read ? t('articlesNotesKicker') : t('bkTheText')}>
          {read ? (
            <>
              <div className="br-h">{t('articlesNotesKicker')}</div>
              {book.notes.map((n) => <NoteSection key={n.heading} note={n} />)}
              {book.board && <Board board={book.board} />}
            </>
          ) : (
            <>
              <div className="br-h">{t('bkTheText')}</div>
              <div className="br-body">{book.body.map((para, i) => <p key={i}>{para}</p>)}</div>
            </>
          )}
        </article>
      </div>
    </div>
  );
}

function NoteSection({ note }) {
  const { lang } = useLang();
  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);
  return (
    <section className="br-note">
      <h3>{loc(note.heading, note.headingTr)}</h3>
      <ul>{loc(note.points, note.pointsTr).map((p) => <li key={p}>{p}</li>)}</ul>
    </section>
  );
}

// The paper's "which model was good at what" comparison, carried over from
// the previous Articles page.
function Board({ board }) {
  const { lang, t } = useLang();
  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);
  const columns = loc(board.columns, board.columnsTr);
  return (
    <section className="br-note br-board" style={{ '--art-cols': columns.length }}>
      <h3>{t('articlesBoardTitle')}</h3>
      <div className="art-row art-row-head">
        <span className="ch">Model</span>
        {columns.map((c) => <span key={c} className="ch">{c}</span>)}
      </div>
      {board.rows.map((r) => (
        <div key={r.name} className="art-row">
          <span className="mn">{r.name}</span>
          {r.scores.map((sc, i) => (
            <span key={i} className="art-cell"><span className="art-cell-label">{columns[i]}</span><span className="sc">{sc}</span></span>
          ))}
          <p className="vd">{loc(r.verdict, r.verdictTr)}</p>
        </div>
      ))}
      <p className="cap">{loc(board.caption, board.captionTr)}</p>
    </section>
  );
}
