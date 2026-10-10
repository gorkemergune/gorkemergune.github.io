import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Linkedin, Lock } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import { PROFILE_PHOTO } from '../config';
import { EDUCATION, WORK_SORTED, NAV_CARDS } from '../data/experience';
import TwoTone from '../components/TwoTone';

// Experience — cinematic banner, then a 70/30 split: education and work as
// thin-line timelines on the left, four image-led navigation cards on the
// right. All content lives in data/experience.js; this file only lays it out.

const ICONS = {}; // category icons for organisations without a verified logo (none at present)

function useFmt() {
  const { lang } = useLang();
  return (ym) => {
    const [y, m] = ym.split('-').map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { month: 'short', year: 'numeric' });
  };
}

function Plate({ e, alt }) {
  if (e.confidential) {
    return <span className="xp-plate conf" aria-hidden="true"><Lock size={18} strokeWidth={1.5} /></span>;
  }
  const Icon = ICONS[e.icon];
  return (
    <span className={`xp-plate${e.logoLight ? ' light' : ''}`} title={alt}>
      {e.logo
        ? <img src={e.logo} alt={`${alt} logo`} loading="lazy" decoding="async" />
        : Icon ? <Icon size={20} strokeWidth={1.4} aria-hidden="true" /> : null}
    </span>
  );
}

function Dates({ e }) {
  const { t } = useLang();
  const fmt = useFmt();
  const single = e.end && e.end === e.start;
  return (
    <span className="xp-dates">
      {fmt(e.start)}
      {!single && <> – {e.end ? fmt(e.end) : t('xpPresent')}{e.endExpected ? ` (${t('xpExpected')})` : ''}</>}
    </span>
  );
}

function WorkItem({ e }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const L = (k) => (lang === 'tr' && e[`${k}Tr`]) || e[k];
  const points = L('points') || [];
  const tags = L('tags') || [];
  const shown = open ? points : points.slice(0, 2);
  const orgName = e.confidential ? t('xpConfidential') : L('org');
  const meta = [L('type'), L('mode')].filter(Boolean).join(' · ');
  const ongoing = !e.end;

  return (
    <li className={`xp-item${ongoing ? ' ongoing' : ''}`}>
      <span className="xp-node" aria-hidden="true" />
      <article className="xp-card">
        <Plate e={e} alt={e.orgShort || L('org')} />
        <div className="xp-main">
          <div className="xp-top">
            <div style={{ minWidth: 0 }}>
              <h3 className="xp-role">{L('role')}</h3>
              <div className="xp-org">
                {orgName}
                {e.url && !e.confidential && (
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className="xp-ext" aria-label={`${e.orgShort || e.org} — ${t('xpWebsite')}`}>
                    <ArrowUpRight size={13} strokeWidth={1.6} />
                  </a>
                )}
              </div>
            </div>
            <div className="xp-when">
              <Dates e={e} />
              {ongoing && <span className="label label-primary">{t('xpCurrent')}</span>}
            </div>
          </div>
          {meta && <div className="ds-meta xp-meta">{meta}</div>}
          <p className="xp-sum">{L('summary')}</p>
          {shown.length > 0 && <ul className="xp-points">{shown.map((pt) => <li key={pt}>{pt}</li>)}</ul>}
          {points.length > 2 && (
            <button type="button" className="xp-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? t('xpShowLess') : `${t('xpShowAll')} · ${points.length}`}
            </button>
          )}
          {e.confidential && L('note') && <p className="xp-note"><Lock size={11} strokeWidth={1.8} /> {L('note')}</p>}
          {tags.length > 0 && <div className="xp-tags">{tags.map((tg) => <span key={tg} className="label">{tg}</span>)}</div>}
        </div>
      </article>
    </li>
  );
}

function EduItem({ e }) {
  const { lang, t } = useLang();
  const L = (k) => (lang === 'tr' && e[`${k}Tr`]) || e[k];
  const done = e.status === 'completed';
  return (
    <li className={`xp-item${done ? '' : ' ongoing'}`}>
      <span className="xp-node" aria-hidden="true" />
      <article className="xp-card">
        <Plate e={e} alt={L('org')} />
        <div className="xp-main">
          <div className="xp-top">
            <div style={{ minWidth: 0 }}>
              <h3 className="xp-role">{L('title')}</h3>
              <div className="xp-org">
                {L('org')}
                {e.url && (
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className="xp-ext" aria-label={`${L('org')} — ${t('xpWebsite')}`}>
                    <ArrowUpRight size={13} strokeWidth={1.6} />
                  </a>
                )}
              </div>
            </div>
            <div className="xp-when">
              <Dates e={e} />
              <span className={`label${done ? '' : ' label-primary'}`}>{done ? t('xpCompleted') : t('xpInProgress')}</span>
            </div>
          </div>
          <p className="xp-sum">{L('detail')}</p>
        </div>
      </article>
    </li>
  );
}

function NavCard({ c }) {
  const { lang } = useLang();
  const L = (k) => (lang === 'tr' && c[`${k}Tr`]) || c[k];
  return (
    <Link to={c.to} className={`xp-nav${c.image ? '' : ' placeholder'}`}>
      {c.image && <img src={c.image} alt="" loading="lazy" decoding="async" />}
      <span className="xp-nav-shade" aria-hidden="true" />
      <span className="xp-nav-body">
        <span className="xp-nav-label">{L('label')}</span>
        <span className="xp-nav-title">{L('title')}</span>
        <span className="xp-nav-text">{L('text')}</span>
      </span>
      <span className="xp-nav-arrow" aria-hidden="true"><ArrowRight size={18} strokeWidth={1.5} /></span>
    </Link>
  );
}

export default function ExperiencePage() {
  const { t } = useLang();
  useSeo({ title: t('xpKicker'), description: t('xpSub'), path: '/experience' });

  return (
    <div className="xp">
      <style>{`
        .xp-banner { position: relative; margin-top: calc(-1 * var(--nav-h)); height: clamp(420px, 36vw, 560px); overflow: hidden; background: #07080b; isolation: isolate; border-bottom: 1px solid var(--c-line); }
        .xp-banner picture, .xp-banner picture img { position: absolute; inset: 0; width: 100%; height: 100%; }
        .xp-banner picture img { object-fit: cover; object-position: 62% 40%; }
        .xp-banner::after { content: ''; position: absolute; inset: 0; background:
          linear-gradient(90deg, rgba(10,12,16,0.94) 0%, rgba(10,12,16,0.78) 30%, rgba(10,12,16,0.2) 56%, rgba(10,12,16,0) 75%),
          linear-gradient(180deg, rgba(10,12,16,0.5) 0%, rgba(10,12,16,0) 26%, rgba(10,12,16,0) 70%, rgba(10,12,16,0.85) 100%); }
        .xp-banner-inner { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 104px; padding-top: calc(var(--nav-h) + 24px); }
        .xp-banner h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(44px, 5.4vw, 80px); line-height: 0.98; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
        .xp-banner h1 .dim { color: var(--c-secondary); }
        .xp-banner p { font-family: var(--font-body); font-size: 17px; line-height: 1.6; color: #c9cfd8; max-width: 520px; margin-top: 18px; }

        .xp-profile { position: relative; z-index: 3; display: flex; align-items: flex-end; gap: 28px; margin-top: -72px; padding-bottom: 40px; border-bottom: 1px solid var(--c-line); }
        .xp-photo { width: 152px; flex: none; aspect-ratio: 4 / 5; border: 1px solid rgba(255,255,255,0.12); background: #111419; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.45); }
        .xp-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; display: block; }
        .xp-photo .mono { display: flex; align-items: center; justify-content: center; height: 100%; font-family: var(--font-display); font-size: 44px; color: #3a414e; }
        .xp-who { padding-bottom: 6px; }
        .xp-who .name { font-family: var(--font-display); font-weight: 500; font-size: 26px; letter-spacing: -0.01em; color: var(--c-ink); }
        .xp-who .role { font-family: var(--font-body); font-size: 15.5px; color: #d3d8e0; margin-top: 4px; }
        .xp-who .student { font-size: 14px; color: var(--c-meta); }
        .xp-who .sep { margin: 0 4px; }
        .xp-who .ds-link { margin-top: 14px; }

        .xp-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 3fr); gap: 56px; padding-top: 56px; padding-bottom: 120px; align-items: start; }
        .xp-sec + .xp-sec { margin-top: 64px; }
        .xp-sec-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 26px; }
        .xp-sec-head h2 { font-family: var(--font-display); font-weight: 400; font-size: 28px; letter-spacing: -0.015em; color: var(--c-ink); }

        .xp-tl { list-style: none; position: relative; padding-left: 30px; }
        .xp-tl::before { content: ''; position: absolute; left: 6px; top: 10px; bottom: 10px; width: 1px; background: linear-gradient(180deg, rgba(0,240,255,0.55), rgba(0,240,255,0.12)); }
        .xp-item { position: relative; }
        .xp-item + .xp-item { margin-top: 16px; }
        .xp-node { position: absolute; left: -30px; top: 26px; width: 13px; height: 13px; border-radius: 50%; border: 1px solid #5c6370; background: var(--c-bg); }
        .xp-item.ongoing .xp-node { border-color: var(--c-primary); background: var(--c-primary); box-shadow: 0 0 0 4px rgba(0,240,255,0.12); }
        .xp-card { display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: 20px; padding: 20px 22px; border: 1px solid var(--c-line); background: rgba(17,20,25,0.7); transition: border-color 0.3s; }
        .xp-card:hover { border-color: var(--c-line-strong); }
        .xp-item.ongoing .xp-card { border-left: 2px solid rgba(0,240,255,0.55); }
        .xp-item:not(.ongoing) .xp-role { color: #d3d8e0; }
        .xp-plate { width: 88px; height: 56px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--c-line); background: #0f1117; color: #8a919d; overflow: hidden; }
        .xp-plate img { max-width: 76px; max-height: 38px; object-fit: contain; }
        .xp-plate.light { background: #f2f4f7; border-color: #f2f4f7; }
        .xp-plate.conf { color: var(--c-tertiary); border-style: dashed; }
        .xp-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
        .xp-role { font-family: var(--font-display); font-weight: 500; font-size: 19px; line-height: 1.25; color: var(--c-ink); }
        .xp-org { display: flex; align-items: center; gap: 6px; font-family: var(--font-body); font-size: 14.5px; color: #c3c9d4; margin-top: 3px; }
        .xp-ext { display: inline-flex; color: var(--c-meta); transition: color 0.3s; }
        .xp-ext:hover { color: var(--c-primary); }
        .xp-when { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex: none; }
        .xp-dates { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: #aab2bf; white-space: nowrap; }
        .xp-meta { margin-top: 8px; }
        .xp-sum { font-family: var(--font-body); font-size: 14.5px; line-height: 1.6; color: var(--c-body); margin-top: 10px; }
        .xp-points { margin: 10px 0 0 16px; }
        .xp-points li { font-family: var(--font-body); font-size: 13.5px; line-height: 1.55; color: #9aa1ad; margin-top: 5px; }
        .xp-more { margin-top: 10px; background: none; border: none; padding: 0; cursor: pointer; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #c6cdd8; border-bottom: 1px solid rgba(0,240,255,0.4); }
        .xp-more:hover { color: var(--c-primary); }
        .xp-note { display: flex; gap: 8px; align-items: baseline; margin-top: 12px; padding: 8px 12px; border-left: 2px solid var(--c-tertiary); background: rgba(245,158,11,0.06); font-family: var(--font-body); font-size: 13px; line-height: 1.5; color: #d8c9a8; }
        .xp-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }

        .xp-aside { display: flex; flex-direction: column; gap: 16px; }
        .xp-aside .ds-meta { margin-bottom: 4px; }
        .xp-nav { position: relative; display: block; aspect-ratio: 16 / 9; overflow: hidden; border: 1px solid var(--c-line); color: inherit; isolation: isolate; }
        .xp-nav img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.2,0.8,0.2,1); }
        .xp-nav.placeholder { background:
          radial-gradient(120% 90% at 85% 10%, rgba(56,189,248,0.10), rgba(56,189,248,0) 60%),
          repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 14px),
          linear-gradient(160deg, #181c24, #0d0f14); }
        .xp-nav-shade { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(10,12,16,0.05) 0%, rgba(10,12,16,0.35) 45%, rgba(10,12,16,0.92) 100%); }
        .xp-nav-body { position: absolute; z-index: 2; left: 20px; right: 72px; bottom: 18px; display: flex; flex-direction: column; gap: 6px; }
        .xp-nav-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-primary); }
        .xp-nav-title { font-family: var(--font-display); font-weight: 500; font-size: 21px; line-height: 1.15; color: var(--c-ink); }
        .xp-nav-text { font-family: var(--font-body); font-size: 13px; line-height: 1.45; color: #c3c9d4; }
        .xp-nav-arrow { position: absolute; z-index: 2; right: 18px; bottom: 18px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(0,240,255,0.6); display: flex; align-items: center; justify-content: center; color: var(--c-primary); transition: background 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.2,0.8,0.2,1); }
        .xp-nav:hover img { transform: scale(1.04); }
        .xp-nav:hover .xp-nav-arrow, .xp-nav:focus-visible .xp-nav-arrow { background: var(--c-primary); color: var(--c-on-primary); transform: translateX(3px); }
        .xp-nav:hover { border-color: var(--c-line-strong); }

        @media (prefers-reduced-motion: reduce) { .xp-nav img, .xp-nav-arrow { transition: none; } }
        @media (max-width: 1100px) {
          .xp-grid { grid-template-columns: 1fr; gap: 64px; }
          .xp-aside { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .xp-aside .ds-meta { grid-column: 1 / -1; }
        }
        @media (max-width: 700px) {
          .xp-banner { height: auto; min-height: 460px; }
          .xp-banner picture img { object-position: 58% 40%; }
          .xp-banner::after { background: linear-gradient(180deg, rgba(10,12,16,0.55) 0%, rgba(10,12,16,0.35) 35%, rgba(10,12,16,0.92) 75%, rgba(10,12,16,0.97) 100%); }
          .xp-banner-inner { padding-top: calc(var(--nav-h) + 150px); padding-bottom: 96px; }
          .xp-profile { gap: 18px; margin-top: -64px; }
          .xp-photo { width: 112px; }
          .xp-who .name { font-size: 22px; }
          .xp-who .student { display: block; margin-top: 4px; }
          .xp-who .sep { display: none; }
          .xp-aside { grid-template-columns: 1fr; }
          .xp-tl { padding-left: 22px; }
          .xp-tl::before { left: 4px; }
          .xp-node { left: -22px; width: 11px; height: 11px; }
          .xp-card { grid-template-columns: 1fr; gap: 14px; padding: 18px 16px; }
          .xp-plate { width: 88px; height: 52px; }
          .xp-top { flex-direction: column; gap: 8px; }
          .xp-when { align-items: flex-start; flex-direction: row; flex-wrap: wrap; align-items: center; }
        }
      `}</style>

      <section className="xp-banner" aria-labelledby="xp-title">
        <picture aria-hidden="true">
          <source srcSet="/media/experience-hero-1280.webp 1280w, /media/experience-hero.webp 2125w" sizes="(max-width: 700px) 250vw, 100vw" type="image/webp" />
          <img src="/media/experience-hero-1280.jpg" alt="" />
        </picture>
        <div className="ds-wrap xp-banner-inner">
          <Link to="/" className="link-hover" style={s.back}><ArrowLeft size={16} strokeWidth={1.5} /> {t('learningBack')}</Link>
          <div className="ds-kicker" style={{ marginTop: 24 }}>{t('xpKicker')}</div>
          <h1 id="xp-title"><TwoTone text={t('xpTitle')} /></h1>
          <p>{t('xpSub')}</p>
        </div>
      </section>

      <div className="ds-wrap">
        <div className="xp-profile">
          <div className="xp-photo">
            {PROFILE_PHOTO
              ? (
                <picture>
                  <source srcSet={PROFILE_PHOTO.webp} type="image/webp" />
                  <img src={PROFILE_PHOTO.jpg} alt={t('xpPhotoAlt')} width={PROFILE_PHOTO.width} height={PROFILE_PHOTO.height} />
                </picture>
              )
              : <span className="mono" aria-hidden="true">GE</span>}
          </div>
          <div className="xp-who">
            <div className="name">Görkem Ergüne</div>
            <div className="role">{t('xpRole')} <span className="student"><span className="sep" aria-hidden="true">·</span> {t('xpStudent')}</span></div>
            <a href="https://www.linkedin.com/in/gorkemergune/" target="_blank" rel="noopener noreferrer" className="ds-link">
              <Linkedin size={13} strokeWidth={1.5} /> {t('xpLinkedIn')} <ArrowUpRight size={12} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="xp-grid">
          <div>
            <section className="xp-sec" aria-labelledby="xp-edu">
              <div className="xp-sec-head"><span className="ds-meta">01</span><h2 id="xp-edu">{t('xpEducation')}</h2></div>
              <ol className="xp-tl">
                {EDUCATION.map((e) => <EduItem key={e.id} e={e} />)}
              </ol>
            </section>
            <section className="xp-sec" aria-labelledby="xp-work">
              <div className="xp-sec-head"><span className="ds-meta">02</span><h2 id="xp-work">{t('xpWork')}</h2></div>
              <ol className="xp-tl">
                {WORK_SORTED.map((e) => <WorkItem key={e.id} e={e} />)}
              </ol>
            </section>
          </div>

          <aside className="xp-aside" aria-label={t('xpExplore')}>
            <div className="ds-meta">{t('xpExplore')}</div>
            {NAV_CARDS.map((c) => <NavCard key={c.id} c={c} />)}
          </aside>
        </div>
      </div>
    </div>
  );
}

const s = {
  back: { display: 'flex', width: 'fit-content', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: '#aab2bf', cursor: 'pointer' },
};
