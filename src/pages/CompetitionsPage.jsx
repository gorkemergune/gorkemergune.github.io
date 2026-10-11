import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github, ListOrdered } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import COMPETITIONS from '../data/competitions';

// The competition record (Phase 8): a quiet scoreboard, not a trophy cabinet.
// Algorithm contests and camps first (IEEEXtreme as the flagship plate), then
// hackathons. Each plate reads: name → score & rank → team → round / summary
// → links. Only verified values are printed; an entry without a public score
// or rank shows what was built instead of a placeholder.
const isHack = (c) => c.type?.en === 'Hackathon';

export default function CompetitionsPage() {
  const { lang, t } = useLang();
  const loc = (o) => (o && typeof o === 'object' ? (lang === 'tr' ? o.tr : o.en) : o);
  useSeo({ title: t('compLabel'), description: t('compSub'), path: '/competitions' });

  const contests = COMPETITIONS.filter((c) => !isHack(c));
  const hacks = COMPETITIONS.filter(isHack);
  const years = COMPETITIONS.map((c) => Number((c.date.match(/\d{4}/) || [])[0])).filter(Boolean);
  const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : '';
  const [flagship, ...camps] = contests;

  return (
    <div className="cp ds-wrap">
      <style>{`
        .cp { padding-top: 60px; padding-bottom: 120px; }
        .cp-back { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #8a919d; }
        .cp-back:hover { color: var(--c-ink); }
        .cp-head { margin-top: 44px; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 24px 48px; }
        .cp-head h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(44px, 6vw, 80px); line-height: 0.98; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
        .cp-head p { font-family: var(--font-body); font-size: 17px; line-height: 1.6; color: var(--c-body); max-width: 560px; margin-top: 16px; }
        .cp-record { display: flex; border: 1px solid var(--c-line); background: rgba(17,20,25,0.7); }
        .cp-record div { padding: 14px 20px; border-right: 1px solid var(--c-line); }
        .cp-record div:last-child { border-right: none; }
        .cp-record b { display: block; font-family: var(--font-display); font-weight: 500; font-size: 26px; color: var(--c-ink); font-variant-numeric: tabular-nums; line-height: 1; }
        .cp-record span { display: block; margin-top: 6px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-meta); white-space: nowrap; }

        .cp-group { margin-top: 72px; }
        .cp-glabel { display: flex; align-items: center; gap: 14px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #aab2bf; margin-bottom: 20px; }
        .cp-glabel::before { content: ''; width: 18px; height: 2px; background: var(--c-tertiary); }
        .cp-glabel::after { content: ''; flex: 1; height: 1px; background: var(--c-line); }
        .cp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }

        .cp-plate { position: relative; display: flex; flex-direction: column; min-width: 0; padding: 22px 22px 18px; background: linear-gradient(180deg, #12151b, #0c0e12); border: 1px solid var(--c-line); transition: border-color 0.3s; }
        .cp-plate::before { content: ''; position: absolute; left: -1px; right: -1px; top: -1px; height: 2px; background: linear-gradient(90deg, var(--acc), transparent 75%); opacity: 0.7; }
        .cp-plate::after { content: ''; position: absolute; right: 8px; bottom: 8px; width: 10px; height: 10px; border-right: 1px solid #2c313c; border-bottom: 1px solid #2c313c; }
        .cp-plate:hover, .cp-plate:focus-within { border-color: #2c313c; }
        .cp-top { display: flex; align-items: center; gap: 14px; }
        .cp-emb { width: 44px; height: 44px; flex: none; display: flex; align-items: center; justify-content: center; border: 1px solid #23262e; background: #0f1117; font-family: var(--font-mono); font-size: 13px; font-weight: 600; }
        .cp-emb img { width: 76%; height: 76%; object-fit: contain; }
        .cp-meta { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-meta); line-height: 1.6; }
        .cp-meta em { font-style: normal; color: var(--acc); }
        .cp-name { font-family: var(--font-display); font-weight: 500; font-size: 22px; line-height: 1.15; letter-spacing: -0.01em; color: var(--c-ink); margin-top: 16px; }

        .cp-board { display: grid; grid-template-columns: repeat(var(--cells, 2), minmax(0, 1fr)); margin-top: 16px; border: 1px solid #1d2028; background: rgba(0,0,0,0.25); }
        .cp-cell { padding: 12px 14px; min-width: 0; }
        .cp-cell + .cp-cell { border-left: 1px solid #1d2028; }
        .cp-cell dt { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-tertiary); opacity: 0.85; }
        .cp-cell dd { margin-top: 6px; display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
        .cp-val { font-family: var(--font-mono); font-weight: 500; font-size: 26px; line-height: 1; color: var(--c-ink); font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
        .cp-unit { font-family: var(--font-mono); font-size: 11px; color: #8a919d; }
        .cp-team { display: flex; align-items: baseline; gap: 10px; margin-top: 12px; font-family: var(--font-mono); font-size: 12px; color: #c6cdd8; }
        .cp-team span { font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-meta); }
        .cp-sum { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: #a4abb7; margin-top: 14px; }
        .cp-built { display: block; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-tertiary); opacity: 0.85; margin-bottom: 6px; }
        .cp-foot { display: flex; justify-content: space-between; align-items: center; gap: 10px 16px; flex-wrap: wrap; margin-top: auto; padding-top: 18px; }
        .cp-plate:not(.cp-flag) .cp-foot { flex-direction: column; align-items: flex-start; }
        .cp-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .cp-links { display: flex; flex-wrap: wrap; gap: 6px 16px; }
        .cp-links a { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #c6cdd8; border-bottom: 1px solid transparent; padding: 3px 0; }
        .cp-links a:hover, .cp-links a:focus-visible { color: var(--acc); border-bottom-color: var(--acc); }

        .cp-flag { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); grid-template-areas: 'head board' 'detail team' 'foot foot'; gap: 0 40px; padding: 30px 32px 24px; }
        .cp-flag > .cp-fhead { grid-area: head; }
        .cp-flag > .cp-board { grid-area: board; margin-top: 0; align-self: end; }
        .cp-flag > .cp-team { grid-area: team; align-self: start; font-size: 14px; margin-top: 14px; }
        .cp-flag > .cp-fdetail { grid-area: detail; }
        .cp-flag > .cp-foot { grid-area: foot; }
        .cp-flag .cp-name { font-size: clamp(28px, 3vw, 38px); }
        .cp-flag .cp-val { font-size: 40px; }
        .cp-flag .cp-cell { padding: 18px 20px; }
        @media (prefers-reduced-motion: reduce) { .cp-plate { transition: none; } }
        @media (max-width: 1100px) { .cp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 900px) {
          .cp-head { grid-template-columns: 1fr; }
          .cp-flag { grid-template-columns: 1fr; grid-template-areas: 'head' 'board' 'team' 'detail' 'foot'; padding: 24px 22px 18px; }
          .cp-flag > .cp-board { margin-top: 18px; }
        }
        @media (max-width: 640px) {
          .cp { padding-top: 40px; }
          .cp-grid { grid-template-columns: 1fr; }
          .cp-group { margin-top: 52px; }
          .cp-record { width: 100%; }
          .cp-record div { flex: 1; padding: 12px 12px; min-width: 0; }
          .cp-record b { font-size: 19px; }
          .cp-record span { white-space: normal; font-size: 9px; }
          .cp-flag .cp-val { font-size: 32px; }
          .cp-flag .cp-cell { padding: 14px 14px; }
        }
      `}</style>

      <Link to="/" className="cp-back"><ArrowLeft size={16} strokeWidth={1.5} /> {t('compBack')}</Link>

      <header className="cp-head">
        <div>
          <div className="ds-kicker">{t('compBadge')}</div>
          <h1>{t('compLabel')}</h1>
          <p>{t('compSub')}</p>
        </div>
        <div className="cp-record" aria-label={t('compRecord')}>
          <div><b>{String(COMPETITIONS.length).padStart(2, '0')}</b><span>{t('compEntries')}</span></div>
          <div><b>{String(contests.length).padStart(2, '0')}</b><span>{t('compContests')}</span></div>
          <div><b>{String(hacks.length).padStart(2, '0')}</b><span>{t('compHackathons')}</span></div>
          {span && <div><b>{span.replace(/^20(\d\d)–20(\d\d)$/, '’$1–’$2')}</b><span>{t('compSeasons')}</span></div>}
        </div>
      </header>

      <section className="cp-group" aria-labelledby="cp-g1">
        <h2 id="cp-g1" className="cp-glabel">{t('compGroupContests')}</h2>
        {flagship && <Plate c={flagship} loc={loc} t={t} lang={lang} flagship />}
        <div className="cp-grid" style={{ marginTop: 16 }}>
          {camps.map((c) => <Plate key={c.id} c={c} loc={loc} t={t} lang={lang} />)}
        </div>
      </section>

      <section className="cp-group" aria-labelledby="cp-g2">
        <h2 id="cp-g2" className="cp-glabel">{t('compGroupHack')}</h2>
        <div className="cp-grid">
          {hacks.map((c) => <Plate key={c.id} c={c} loc={loc} t={t} lang={lang} />)}
        </div>
      </section>
    </div>
  );
}

function Plate({ c, loc, t, lang, flagship = false }) {
  const date = lang === 'tr' && c.dateTr ? c.dateTr : c.date;
  const r = c.rank;
  const cells = [
    c.score && { k: t('compScore'), v: c.score.value, u: loc(c.score.unit) },
    r && (r.top
      ? { k: t('compRank'), v: `${t('compTop')} ${r.value}`, u: '' }
      : { k: t('compRank'), v: r.of ? r.value : `#${r.value}`, u: r.of ? `/ ${r.of}` : loc(r.scope) }),
  ].filter(Boolean);

  const head = (
    <>
      <div className="cp-top">
        <div className="cp-emb" style={c.logo ? undefined : { color: c.accent, borderColor: `${c.accent}66` }}>
          {c.logo ? <img src={c.logo} alt={`${c.org} logo`} loading="lazy" /> : c.initials}
        </div>
        <div className="cp-meta">
          <em>{loc(c.type)}</em><br />
          {date}{c.duration ? ` · ${loc(c.duration)}` : ''}
        </div>
      </div>
      <h3 className="cp-name">{c.name}</h3>
    </>
  );
  const board = cells.length > 0 && (
    <dl className="cp-board" style={{ '--cells': cells.length }}>
      {cells.map((x) => (
        <div className="cp-cell" key={x.k}>
          <dt>{x.k}</dt>
          <dd><span className="cp-val">{x.v}</span>{x.u && <span className="cp-unit">{x.u}</span>}</dd>
        </div>
      ))}
    </dl>
  );
  const team = c.team && <div className="cp-team"><span>{t('compTeam')}</span>@{c.team}</div>;
  const detail = (
    <>
      {c.round && <div className="cp-team"><span>{t('compRound')}</span>{loc(c.round)}</div>}
      {c.summary && (
        <p className="cp-sum">{cells.length === 0 && <span className="cp-built">{t('compBuilt')}</span>}{loc(c.summary)}</p>
      )}
    </>
  );
  const foot = (
    <div className="cp-foot">
      <div className="cp-tags">{(Array.isArray(c.tags) ? c.tags : loc(c.tags)).map((tag) => <span key={tag} className="label">{tag}</span>)}</div>
      <div className="cp-links">
        {c.leaderboard && <a href={c.leaderboard} target="_blank" rel="noopener noreferrer"><ListOrdered size={12} strokeWidth={1.5} /> {t('compLeaderboard')}</a>}
        {c.repo && <a href={c.repo} target="_blank" rel="noopener noreferrer"><Github size={12} strokeWidth={1.5} /> GitHub</a>}
        {c.website && <a href={c.website} target="_blank" rel="noopener noreferrer">{t('compVisit')} <ArrowUpRight size={12} strokeWidth={1.5} /></a>}
      </div>
    </div>
  );

  if (flagship) {
    return (
      <article className="cp-plate cp-flag" style={{ '--acc': c.accent }}>
        <div className="cp-fhead">{head}</div>{board}{team}<div className="cp-fdetail">{detail}</div>{foot}
      </article>
    );
  }
  return (
    <article className="cp-plate" style={{ '--acc': c.accent }}>
      {head}{board}{team}{detail}{foot}
    </article>
  );
}
