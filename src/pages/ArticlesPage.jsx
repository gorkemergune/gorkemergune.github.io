import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import { buildLibrary } from '../data/library';
import Bookcase from '../components/bookcase/Bookcase';
import BookReader from '../components/bookcase/BookReader';
import TwoTone from '../components/TwoTone';

// /articles — the knowledge library: two bookcases in one room. Left = what
// Görkem read (data/articles.js), right = what he wrote (the blog essays).
// ?book=<id> opens a book, so it can be shared, survives refresh, and closes
// with Back. Bookcase styles live here (BOOKCASE_CSS) and are shared by both.
export default function ArticlesPage() {
  const { lang, t } = useLang();
  const { read, written } = useMemo(() => buildLibrary(t, lang), [t, lang]);
  const [params, setParams] = useSearchParams();
  const id = params.get('book');
  const open = id ? [...read, ...written].find((b) => b.id === id) : null;
  const trigger = useRef(null);
  useSeo({ title: t('articlesLabel'), description: t('articlesSub'), path: '/articles' });

  const onOpen = (bookId) => { trigger.current = document.activeElement; setParams({ book: bookId }); };
  const onClose = useCallback(() => {
    setParams({});
    requestAnimationFrame(() => trigger.current?.focus?.());
  }, [setParams]);
  useEffect(() => { if (id && !open) setParams({}, { replace: true }); }, [id, open, setParams]);

  return (
    <div className="kl">
      <style>{BOOKCASE_CSS}</style>
      <div className="ds-wrap kl-wrap">
        <Link to="/" className="link-hover kl-back"><ArrowLeft size={16} strokeWidth={1.5} /> {t('articlesBack')}</Link>
        <header className="kl-head">
          <div>
            <div className="ds-kicker">{t('articlesBadge')}</div>
            <h1><TwoTone text={t('articlesLabel')} /></h1>
          </div>
          <p>{t('articlesSub')}</p>
        </header>

        <div className="kl-room">
          <Bookcase id="bk-read" side="left" kicker={t('bkReadKicker')} title={t('bkReadTitle')} sub={t('bkReadSub')}
            books={read} emptyText={t('bkReadEmpty')} onOpen={onOpen} />
          <Bookcase id="bk-write" side="right" kicker={t('bkWriteKicker')} title={t('bkWriteTitle')} sub={t('bkWriteSub')}
            books={written} emptyText={t('bkWriteEmpty')} onOpen={onOpen} />
        </div>
      </div>
      {open && <BookReader book={open} onClose={onClose} />}
    </div>
  );
}

const BOOKCASE_CSS = `
  .kl-wrap { padding-top: 48px; padding-bottom: 120px; }
  .kl-back { display: flex; width: fit-content; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #aab2bf; }
  .kl-head { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 24px 56px; align-items: end; margin: 32px 0 44px; }
  .kl-head h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(42px, 5vw, 76px); line-height: 1; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
  .kl-head p { font-family: var(--font-body); font-size: 16px; line-height: 1.65; color: #c3c9d4; }

  /* The room: one warm floor glow under both cases so they share a space. */
  .kl-room { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding-bottom: 30px; }
  .kl-room::after { content: ''; position: absolute; left: -2%; right: -2%; bottom: 0; height: 60px; background: radial-gradient(60% 100% at 50% 0%, rgba(245,158,11,0.16), transparent 70%); pointer-events: none; }

  .bk-case { display: flex; flex-direction: column; min-width: 0; }
  .bk-head { margin-bottom: 18px; }
  .bk-kicker { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-primary); }
  .bk-case.right .bk-kicker { color: var(--c-tertiary); }
  .bk-head h2 { font-family: var(--font-display); font-weight: 500; font-size: 28px; letter-spacing: -0.015em; color: var(--c-ink); margin-top: 8px; }
  .bk-head p { font-family: var(--font-body); font-size: 14.5px; line-height: 1.55; color: var(--c-body); margin-top: 6px; }

  .bk-frame { position: relative; padding: 26px 26px 18px; background:
      radial-gradient(90% 40% at 50% 0%, rgba(245,158,11,0.10), transparent 70%),
      linear-gradient(180deg, #1a1612 0%, #110f0c 100%);
    border: 1px solid #2d261d; border-left-width: 12px; border-right-width: 12px;
    border-left-color: #241e17; border-right-color: #241e17;
    box-shadow: 0 40px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.5); }
  .bk-case.left .bk-frame { background:
      radial-gradient(90% 40% at 50% 0%, rgba(56,189,248,0.07), transparent 70%),
      linear-gradient(180deg, #14171c 0%, #0e1013 100%);
    border-color: #262b33; border-left-color: #1c2026; border-right-color: #1c2026; }
  .bk-crown { position: absolute; left: -12px; right: -12px; top: -12px; height: 12px; background: linear-gradient(180deg, #3a322a, #1b1712); border-bottom: 1px solid #0b0a08; }
  .bk-case.left .bk-crown { background: linear-gradient(180deg, #2f343d, #161a1f); }
  .bk-crown::after { content: ''; position: absolute; left: 8%; right: 8%; bottom: -3px; height: 2px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.7), transparent); }

  .bk-shelf + .bk-shelf { margin-top: 22px; }
  .bk-row { position: relative; min-height: 236px; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 14px 22px; padding: 18px 14px 0; background: radial-gradient(80% 70% at 50% 0%, rgba(245,158,11,0.09), transparent 75%); box-shadow: inset 0 16px 24px rgba(0,0,0,0.55); }
  .bk-plank { position: relative; height: 14px; margin: 0 -26px; background: linear-gradient(180deg, #4a3f33 0%, #2b241c 45%, #18140f 100%); border-top: 1px solid #5c4e3e; box-shadow: 0 12px 22px rgba(245,158,11,0.10), 0 6px 10px rgba(0,0,0,0.6); }
  .bk-case.left .bk-plank { background: linear-gradient(180deg, #3d434d 0%, #23272e 45%, #14171b 100%); border-top-color: #4d535e; }
  .bk-plank span { position: absolute; right: 34px; top: 50%; transform: translateY(-50%); font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.2em; color: #7d6e58; }

  /* A stack: books lie flat, first (newest) on top, sitting on the shelf. */
  .bk-stack { list-style: none; flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; position: relative; }
  .bk-stack > li { display: flex; position: relative; }
  .bk-stack > li:hover, .bk-stack > li:focus-within { z-index: 4; }
  .bk-deco { pointer-events: none; opacity: 0.6; align-items: flex-start; }
  .bk-deco.side { flex: 0 0 22%; }
  .bk-deco span { display: block; border-radius: 2px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 3px rgba(0,0,0,0.5); }
  .bk-deco span:nth-child(even) { margin-left: 8px; }

  .bk-book { position: relative; width: var(--bk-len); max-width: calc(100% - var(--bk-off)); min-height: var(--bk-th); height: auto; padding-top: 8px !important; padding-bottom: 8px !important; margin-left: var(--bk-off); display: grid; grid-template-columns: 16px minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 0 14px 0 0; cursor: pointer; text-align: left; color: #f1ece2; font: inherit; border: none; border-radius: 3px 2px 2px 3px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.13) 0, rgba(255,255,255,0.03) 18%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.38) 100%),
      linear-gradient(90deg, transparent 0 calc(100% - 26px), rgba(231,194,122,0.28) calc(100% - 26px) calc(100% - 24px), transparent calc(100% - 24px) calc(100% - 20px), rgba(231,194,122,0.18) calc(100% - 20px) calc(100% - 19px), transparent calc(100% - 19px)),
      var(--bk-tone);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -2px 0 rgba(0,0,0,0.45), 0 3px 5px rgba(0,0,0,0.55);
    transition: transform 0.35s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.35s; }
  .bk-edge { align-self: stretch; border-radius: 3px 0 0 3px; background: linear-gradient(180deg, color-mix(in srgb, var(--bk-acc) 75%, #fff 5%), color-mix(in srgb, var(--bk-acc) 40%, #000)); box-shadow: inset -1px 0 0 rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25); }
  .bk-title { font-family: var(--font-display); font-weight: 500; font-size: 14.5px; line-height: 1.25; color: #f1ece2; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .bk-year { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; color: #d8b877; white-space: nowrap; padding-right: 22px; }
  .bk-book:hover, .bk-book:focus-visible { transform: translateX(14px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 1px color-mix(in srgb, var(--bk-acc) 75%, transparent), 0 6px 14px rgba(0,0,0,0.6), 0 0 18px color-mix(in srgb, var(--bk-acc) 30%, transparent); }
  .bk-book:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 3px; }
  .bk-tip { position: absolute; left: 16px; bottom: calc(100% + 8px); z-index: 6; width: min(320px, 92%); padding: 10px 12px; text-align: left; background: #0b0d11; border: 1px solid rgba(245,158,11,0.45); box-shadow: 0 10px 24px rgba(0,0,0,0.55); opacity: 0; transform: translateY(4px); pointer-events: none; transition: opacity 0.2s, transform 0.2s; display: flex; flex-direction: column; gap: 4px; }
  .bk-case.left .bk-tip { border-color: rgba(0,240,255,0.45); }
  .bk-book:hover .bk-tip, .bk-book:focus-visible .bk-tip { opacity: 1; transform: none; }
  .bk-tip-t { font-family: var(--font-display); font-size: 14px; line-height: 1.3; color: var(--c-ink); }
  .bk-tip-m { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.06em; color: #aab2bf; }

  .bk-empty { align-self: center; display: inline-flex; align-items: center; gap: 10px; margin: auto; padding: 12px 16px; border: 1px dashed rgba(245,158,11,0.35); background: rgba(20,18,15,0.7); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; color: #d8c9a8; }

  @media (prefers-reduced-motion: reduce) { .bk-book, .bk-tip { transition: none; } }
  @media (max-width: 1100px) { .kl-room { gap: 24px; } .bk-frame { padding: 22px 18px 16px; } .bk-plank { margin: 0 -18px; } }
  @media (max-width: 900px) { .kl-head { grid-template-columns: 1fr; } .kl-room { grid-template-columns: 1fr; gap: 56px; } }
  /* Phones: one stack per row, books nearly full width, titles still horizontal. */
  @media (max-width: 640px) {
    .bk-frame { padding: 18px 10px 12px; border-left-width: 8px; border-right-width: 8px; }
    .bk-crown { left: -8px; right: -8px; }
    .bk-plank { margin: 0 -10px; }
    .bk-row { min-height: 0; padding: 14px 6px 0; }
    .bk-stack { flex-basis: 100%; }
    .bk-deco { display: none; }
    .bk-row:not(:has(.bk-book)) .bk-deco { display: flex; }
    .bk-book { width: calc(var(--bk-len) + 6%); max-width: 100%; margin-left: calc(var(--bk-off) / 2); min-height: 56px; height: auto; padding-top: 8px; padding-bottom: 8px; }
    .bk-book:hover, .bk-book:focus-visible { transform: translateX(6px); }
    .bk-tip { display: none; }
    .bk-title { -webkit-line-clamp: 3; font-size: 15px; }
  }
`;
