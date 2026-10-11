import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, BookMarked, Box, Database, Github, Star } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import { useGitHub } from '../../hooks/useGitHub';
import { useHFRepos } from '../../hooks/useHuggingFace';
import { HF_PROFILE } from '../../data/huggingface';
import PROJECTS from '../../data/projects';
import TwoTone from '../TwoTone';

// "Latest on GitHub" (left) and "Latest on Hugging Face" (right), after the
// release reference (tasks/anasayfa.png): title + icon, a one-line subtitle,
// "View all (n)" outside the list, then compact rows — icon, name,
// description, a badge, one real metric and the real date.
// EVERY repository is in the list; exactly four rows show at a time and the
// rest scroll natively inside the panel (wheel, trackpad, touch, keyboard).
// Overscroll is not locked, so the page carries on at either end.
// GitHub: all owned public repos via useGitHub (paginated, forks excluded,
// sorted by last push). Without live/cached data: the portfolio's own project
// repos, labelled curated and "not the full list", with no dates or stars.
// Hugging Face: every model and dataset via useHFRepos; downloads are the
// Hub's 30-day count ("/mo"). One .rp-src line per panel: cyan = live,
// hollow = curated / last-known.
const timeAgo = (iso, lang) => {
  if (!iso) return '';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return lang === 'tr' ? 'bugün' : 'today';
  if (days === 1) return lang === 'tr' ? 'dün' : '1 day ago';
  if (days < 7) return lang === 'tr' ? `${days} gün önce` : `${days} days ago`;
  if (days < 30) { const w = Math.floor(days / 7); return lang === 'tr' ? `${w} hafta önce` : `${w} week${w > 1 ? 's' : ''} ago`; }
  if (days < 365) { const m = Math.floor(days / 30); return lang === 'tr' ? `${m} ay önce` : `${m} month${m > 1 ? 's' : ''} ago`; }
  const y = Math.floor(days / 365); return lang === 'tr' ? `${y} yıl önce` : `${y} year${y > 1 ? 's' : ''} ago`;
};
const compact = (n, lang) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.', lang === 'tr' ? ',' : '.')}K` : String(n));

// Fades at the top/bottom edge show that there is more to scroll that way.
function ScrollList({ label, children, count }) {
  const ref = useRef(null);
  const [edge, setEdge] = useState({ top: true, bottom: true });
  useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const update = () => setEdge({ top: el.scrollTop <= 2, bottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 2 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [count]);
  return (
    <div className={`rp-scrollwrap${edge.top ? '' : ' more-up'}${edge.bottom ? '' : ' more-down'}`}>
      <ul ref={ref} className="rp-list" tabIndex={0} aria-label={label}>{children}</ul>
      {!edge.bottom && <span className="rp-more" aria-hidden="true"><ArrowDown size={11} strokeWidth={2} /></span>}
    </div>
  );
}

export default function RepoShowcase() {
  const { lang, t } = useLang();
  const gh = useGitHub();
  const hf = useHFRepos();
  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);
  const fetchedAt = gh._ts ? new Date(gh._ts).toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-GB', { hour: '2-digit', minute: '2-digit' }) : '';

  const live = gh.repos || [];
  const seen = new Set();
  const curated = [...PROJECTS.filter((p) => p.tier === 'featured'), ...PROJECTS.filter((p) => p.tier !== 'featured')]
    .filter((p) => p.github && !seen.has(p.github) && seen.add(p.github))
    .map((p) => ({ name: p.github.split('/').pop(), description: loc(p.oneLiner, p.oneLinerTr), url: p.github, language: p.language }));
  const isLive = live.length > 0;
  const repos = isLive ? live : curated;
  const hfLive = hf.source === 'live' || hf.source === 'cache';

  return (
    <section className="ds-section rp" aria-labelledby="rp-title" data-reveal>
      <style>{`
        .rp { --rp-row: 62px; }
        .rp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        .rp-panel { display: flex; flex-direction: column; min-width: 0; border-radius: 8px; overflow: hidden; background: linear-gradient(180deg, #10141b, #0b0e13); border: 1px solid rgba(0,240,255,0.22); box-shadow: 0 0 0 1px rgba(0,0,0,0.4), 0 0 24px rgba(0,240,255,0.05); }
        .rp-top { display: flex; align-items: center; gap: 8px 14px; flex-wrap: nowrap; padding: 16px 20px 12px; min-height: 56px; }
        .rp-brand { display: inline-flex; align-items: center; gap: 10px; flex: none; font-family: var(--font-display); font-weight: 600; font-size: 18px; color: var(--c-ink); white-space: nowrap; }
        .rp-brand img, .rp-brand svg { flex: none; }
        .rp-sub { flex: 1; min-width: 0; font-family: var(--font-body); font-size: 13px; color: #9aa1ad; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rp-all { flex: none; margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-body); font-size: 13px; font-weight: 500; color: #67e8f9; white-space: nowrap; padding: 4px 0; border-bottom: 1px solid transparent; }
        .rp-all:hover, .rp-all:focus-visible { border-bottom-color: #67e8f9; }
        .rp-all:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 3px; }
        .rp-src { display: flex; align-items: center; gap: 8px; padding: 7px 20px; border-top: 1px solid #1a1f27; border-bottom: 1px solid #1a1f27; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-meta); background: rgba(0,0,0,0.18); }
        .rp-src i { width: 6px; height: 6px; border-radius: 50%; border: 1px solid #5c6370; flex: none; }
        .rp-src.live { color: #9fdbe6; }
        .rp-src.live i { background: var(--c-primary); border-color: var(--c-primary); box-shadow: 0 0 6px rgba(0,240,255,0.7); }
        .rp-src b { margin-left: auto; font-weight: 400; color: var(--c-meta); white-space: nowrap; }
        .rp-scrollwrap { position: relative; }
        .rp-scrollwrap::before, .rp-scrollwrap::after { content: ''; position: absolute; left: 0; right: 8px; height: 22px; pointer-events: none; opacity: 0; transition: opacity 0.25s; z-index: 1; }
        .rp-scrollwrap::before { top: 0; background: linear-gradient(180deg, #0f1319, transparent); }
        .rp-scrollwrap::after { bottom: 0; background: linear-gradient(0deg, #0b0e13, transparent); }
        .rp-scrollwrap.more-up::before, .rp-scrollwrap.more-down::after { opacity: 1; }
        .rp-more { position: absolute; left: 50%; bottom: 4px; z-index: 2; transform: translateX(-50%); display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; color: #67e8f9; background: rgba(11,14,19,0.9); border: 1px solid rgba(0,240,255,0.3); pointer-events: none; }
        .rp-list { list-style: none; height: calc(var(--rp-row) * 4); overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; scrollbar-color: #2c3440 transparent; }
        .rp-list:focus-visible { outline: 2px solid var(--c-primary); outline-offset: -2px; }
        .rp-list::-webkit-scrollbar { width: 6px; }
        .rp-list::-webkit-scrollbar-thumb { background: #2c3440; border-radius: 3px; }
        .rp-list li { height: var(--rp-row); }
        .rp-list li + li { border-top: 1px solid #171c23; }
        .rp-item { display: grid; grid-template-columns: 26px minmax(0, 1fr) auto 64px 92px; align-items: center; gap: 0 14px; height: 100%; padding: 0 20px; color: inherit; transition: background 0.2s; }
        .rp-item:hover, .rp-item:focus-visible { background: rgba(103,232,249,0.04); }
        .rp-item:focus-visible { outline: 2px solid var(--c-primary); outline-offset: -2px; }
        .rp-ic { color: #8a919d; display: flex; }
        .rp-main { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .rp-name { font-family: var(--font-mono); font-size: 13px; color: #7dd3fc; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .rp-name span { color: #5f8fae; }
        .rp-item:hover .rp-name { color: #a5f3fc; text-decoration: underline; text-underline-offset: 3px; }
        .rp-desc { font-family: var(--font-body); font-size: 12.5px; color: #a4abb7; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .rp-desc.none { color: #5c6370; font-style: italic; }
        .rp-badge { justify-self: start; font-family: var(--font-body); font-size: 11.5px; color: #d6dbe3; background: #1a1f28; border: 1px solid #262c36; border-radius: 5px; padding: 3px 8px; white-space: nowrap; }
        .rp-metric { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-body); font-size: 12.5px; color: #d6dbe3; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .rp-when { font-family: var(--font-body); font-size: 12px; color: #8a919d; text-align: right; white-space: nowrap; }
        @media (prefers-reduced-motion: reduce) { .rp-item, .rp-scrollwrap::before, .rp-scrollwrap::after { transition: none; } }
        /* Narrower panels drop one column each: GitHub keeps the date, Hugging Face keeps downloads. */
        @media (max-width: 1240px) and (min-width: 901px) { .rp-item { grid-template-columns: 22px minmax(0, 1fr) auto 84px; } .rp-gh .rp-metric, .rp-hf .rp-when { display: none; } .rp-hf .rp-metric { justify-self: end; } }
        @media (max-width: 1240px) and (min-width: 901px) { .rp-sub { display: none; } }
        @media (max-width: 900px) { .rp-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) {
          .rp { --rp-row: 66px; }
          .rp-top { flex-wrap: wrap; padding: 14px 14px 10px; }
          .rp-sub { order: 3; flex-basis: 100%; font-size: 12.5px; white-space: normal; }
          .rp-src .fk { display: none; }
          .rp-src { padding-left: 14px; padding-right: 14px; }
          .rp-item { grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: auto auto; gap: 3px 10px; padding: 0 14px; }
          .rp-ic { display: none; }
          .rp-main { grid-row: 1 / span 2; }
          .rp-badge { justify-self: end; font-size: 10.5px; padding: 2px 6px; }
          .rp-gh .rp-metric, .rp-hf .rp-when { display: none; }
          .rp-when, .rp-metric { justify-self: end; font-size: 11px; }
        }
      `}</style>
      <div className="ds-wrap">
        <div className="ds-head">
          <div>
            <div className="ds-kicker">{t('repoKicker')}</div>
            <h2 id="rp-title" className="ds-h2"><TwoTone text={t('repoTitle')} /></h2>
          </div>
        </div>
        <div className="rp-grid">
          <article className="rp-panel rp-gh" aria-labelledby="rp-gh">
            <header className="rp-top">
              <h3 id="rp-gh" className="rp-brand"><Github size={20} strokeWidth={1.6} aria-hidden="true" /> {t('ghLatest')}</h3>
              <span className="rp-sub">{isLive ? t('ghSubLive') : t('ghSubCurated')}</span>
              <a className="rp-all" href="https://github.com/gorkemergune?tab=repositories" target="_blank" rel="noopener noreferrer">
                {t('viewAll')}{isLive ? ` (${repos.length})` : ''} <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </header>
            <p className={`rp-src${isLive ? ' live' : ''}`} title={isLive && fetchedAt ? `${t('srcFetched')} ${fetchedAt}` : undefined}>
              <i aria-hidden="true" />{isLive ? t('srcGhLive') : t('srcGhCurated')}
              <b>{repos.length} {t('repoCount')}{isLive && gh.forks ? <span className="fk"> · {t('ghForks')}</span> : null}</b>
            </p>
            <ScrollList label={t('ghListLabel')} count={repos.length}>
              {repos.map((r) => (
                <li key={r.name}>
                  <a className="rp-item" href={r.url} target="_blank" rel="noopener noreferrer">
                    <span className="rp-ic" aria-hidden="true"><BookMarked size={17} strokeWidth={1.5} /></span>
                    <span className="rp-main">
                      <span className="rp-name">{r.name}</span>
                      {r.description ? <span className="rp-desc">{r.description}</span> : <span className="rp-desc none">{t('noDesc')}</span>}
                    </span>
                    {r.language ? <span className="rp-badge">{r.language}</span> : <span />}
                    <span className="rp-metric">{r.stars > 0 && <><Star size={12} strokeWidth={1.8} aria-hidden="true" /> {r.stars}</>}</span>
                    <span className="rp-when">{timeAgo(r.updated, lang)}</span>
                  </a>
                </li>
              ))}
            </ScrollList>
          </article>

          <article className="rp-panel rp-hf" aria-labelledby="rp-hf">
            <header className="rp-top">
              <h3 id="rp-hf" className="rp-brand"><img src="/tech/huggingface.svg" alt="" width="20" height="20" /> {t('hfLatestTitle')}</h3>
              <span className="rp-sub">{hfLive ? t('hfSubLive') : t('hfSubCurated')}</span>
              <a className="rp-all" href={HF_PROFILE} target="_blank" rel="noopener noreferrer">
                {t('viewAll')}{hfLive ? ` (${hf.items.length})` : ''} <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </header>
            <p className={`rp-src${hfLive ? ' live' : ''}`}>
              <i aria-hidden="true" />{hfLive ? t('srcHfLive') : t('srcHfLast')}
              <b>{hf.items.length} {t('repoCount')}</b>
            </p>
            <ScrollList label={t('hfListLabel')} count={hf.items.length}>
              {hf.items.map((a) => {
                const Icon = a.kind === 'dataset' ? Database : Box;
                const desc = loc(a.descEn, a.descTr) || a.task;
                return (
                  <li key={a.id}>
                    <a className="rp-item" href={a.url} target="_blank" rel="noopener noreferrer">
                      <span className="rp-ic" aria-hidden="true"><Icon size={17} strokeWidth={1.5} /></span>
                      <span className="rp-main">
                        <span className="rp-name"><span>gorkemergune/</span>{a.name}</span>
                        {desc ? <span className="rp-desc">{desc}</span> : <span className="rp-desc none">{t('noDesc')}</span>}
                      </span>
                      <span className="rp-badge">{a.kind === 'dataset' ? t('hfDatasetShort') : t('hfModelShort')}</span>
                      <span className="rp-metric" title={t('hfDownloads')}><ArrowDown size={12} strokeWidth={1.8} aria-hidden="true" /> {compact(a.downloads, lang)}/{lang === 'tr' ? 'ay' : 'mo'}</span>
                      <span className="rp-when">{timeAgo(a.updated, lang)}</span>
                    </a>
                  </li>
                );
              })}
            </ScrollList>
          </article>
        </div>
      </div>
    </section>
  );
}
