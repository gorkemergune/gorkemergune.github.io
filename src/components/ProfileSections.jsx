import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import TwoTone from './TwoTone';
import { WORK_SORTED, fmtRange } from '../data/experience';

// Experience and Research on the home page. (The standalone Skills panel was
// removed in Phase 2: skills now show through projects, logos and research;
// `stackGroups` stays in i18n for the résumé.) Experience comes from
// data/experience.js, research from i18n researchItems.

const css = `
  .ps-split { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: stretch; }
  .ps-split.flip { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
  .ps-split.flip .ps-photo { order: 2; }
  .ps-photo { position: relative; min-height: 440px; display: flex; flex-direction: column; justify-content: flex-end; padding: 40px; }
  .ps-photo .ds-media { position: absolute; inset: 0; }
  .ps-photo .ds-media::after { content: ''; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(10,10,15,0.25) 0%, rgba(10,10,15,0.45) 45%, rgba(10,10,15,0.94) 100%); }
  .ps-photo > :not(.ds-media) { position: relative; z-index: 1; }
  .ps-photo .ds-h2 { max-width: 460px; }
  .ps-photo .ds-h2 .dim { display: block; }
  .ps-photo .ds-media img, .ps-photo .ds-media:hover img { filter: brightness(0.5) saturate(0.5) contrast(1.1); transform: none; }
  .ps-photo.lit .ds-media img, .ps-photo.lit .ds-media:hover img { filter: brightness(0.9) saturate(0.95); }
  .ps-photo.lit { justify-content: flex-start; }
  .ps-photo.lit .ds-media::after { background: linear-gradient(180deg, rgba(10,12,16,0.85) 0%, rgba(10,12,16,0.35) 30%, rgba(10,12,16,0) 50%, rgba(10,12,16,0) 85%, rgba(10,12,16,0.6) 100%); }
  .ps-photo .ds-media::before { content: ''; position: absolute; inset: 0; z-index: 1; background: rgba(0,90,140,0.10); mix-blend-mode: screen; }
  .ps-photo .ps-note { margin-top: 16px; max-width: 380px; }

  .ps-table { display: grid; grid-template-columns: max-content minmax(0, 1fr); align-content: center; border-top: 1px solid var(--ds-line); }
  .ps-table > div { display: contents; }
  .ps-table dt, .ps-table dd { padding: 17px 0; border-bottom: 1px solid var(--ds-line); }
  .ps-table dt { padding-right: 40px; padding-top: 19px; }
  .ps-table dd { font-family: var(--font-body); font-size: 15px; line-height: 1.55; color: #c6cdd8; }

  .ps-tl { list-style: none; border-top: 1px solid var(--ds-line); align-self: center; }
  .ps-tl a { display: grid; grid-template-columns: 120px 72px minmax(0, 1fr) 20px; gap: 24px; padding: 22px 0; border-bottom: 1px solid var(--ds-line); color: inherit; transition: background 0.35s, padding 0.35s; }
  .ps-tl a:hover { background: rgba(15,15,26,0.6); padding-left: 10px; padding-right: 10px; }
  .ps-tl a:hover .ds-h3 { color: var(--ds-accent); }
  .ps-tl .ds-meta { padding-top: 4px; }
  .ps-tl .ds-h3 { transition: color 0.3s; }
  .ps-role { font-family: var(--font-body); font-size: 14px; color: var(--ds-dim); margin-top: 3px; }
  .ps-sum { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: var(--ds-body); margin-top: 10px; max-width: 620px; }
  .ps-tl > li > a > svg { color: var(--ds-meta); margin-top: 4px; }
  .ps-plate { width: 72px; height: 44px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--ds-line); background: #0f1117; color: var(--ds-dim); }
  .ps-plate img { max-width: 56px; max-height: 26px; object-fit: contain; }
  .ps-plate.light { background: #f2f4f7; border-color: #f2f4f7; }
  .ps-clamp { display: -webkit-box !important; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .ps-tl li.current .ds-meta { color: #c6cdd8; }

  .ps-rs { list-style: none; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); border-top: 1px solid var(--ds-line); border-left: 1px solid var(--ds-line); }
  .ps-rs li { border-right: 1px solid var(--ds-line); border-bottom: 1px solid var(--ds-line); }
  .ps-rs a { display: flex; flex-direction: column; height: 100%; padding: 28px 24px 26px; color: inherit; transition: background 0.35s; }
  .ps-rs a:hover { background: rgba(15,15,26,0.7); }
  .ps-rs a:hover .ds-h3 { color: var(--ds-accent); }
  .ps-rs-img { display: block; aspect-ratio: 16 / 10; margin: -28px -24px 22px; border: none; border-bottom: 1px solid var(--ds-line); }
  .ps-rs-img img { filter: saturate(0.9) brightness(0.92); }
  .ps-rs-img.contain img { object-fit: contain; background: #fff; padding: 5%; }
  .ps-rs-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .ps-rs-n { font-family: var(--font-mono); font-size: 11px; color: var(--ds-meta); }
  .ps-rs-st { display: inline-flex; align-items: center; gap: 7px; }
  .ps-rs-dot { width: 6px; height: 6px; border-radius: 50%; }
  .ps-rs .ds-h3 { margin-top: 18px; font-size: 17px; transition: color 0.3s; }
  .ps-rs-field { margin-top: auto; padding-top: 18px; }

  @media (max-width: 1100px) {
    .ps-split, .ps-split.flip { grid-template-columns: 1fr; gap: 40px; }
    .ps-split.flip .ps-photo { order: 0; }
    .ps-photo { min-height: 320px; }
    .ps-rs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 600px) {
    .ps-photo { min-height: 280px; padding: 24px 20px; }
    .ps-table { grid-template-columns: 1fr; }
    .ps-table dt { padding: 16px 0 0; border-bottom: none; }
    .ps-table dd { padding: 6px 0 16px; }
    .ps-tl a { grid-template-columns: 72px minmax(0, 1fr) 20px; gap: 8px 16px; }
    .ps-tl a > .ds-meta { grid-column: 1 / -1; padding-top: 0; }
    .ps-rs { grid-template-columns: 1fr; }
    .ps-rs .ds-h3 { margin-top: 20px; }
  }
`;

function Photo({ webp, jpg, pos, kicker, title, note, lit, link }) {
  return (
    <div className={`ps-photo${lit ? ' lit' : ''}`}>
      <picture className="ds-media" aria-hidden="true">
        <source srcSet={webp} type="image/webp" />
        <img src={jpg || webp} alt="" loading="lazy" decoding="async" style={{ objectPosition: pos }} />
      </picture>
      <div className="ds-kicker">{kicker}</div>
      <h2 className="ds-h2"><TwoTone text={title} /></h2>
      {note && <p className="ds-body ps-note">{note}</p>}
      {link}
    </div>
  );
}

// Home preview of the Experience page: the same WORK_SORTED list from
// data/experience.js (current roles first), compact rows, every row opening
// /experience. No competitions here; they live on /competitions.
export function ExperienceSection() {
  const { lang, t } = useLang();
  const L = (e, k) => (lang === 'tr' && e[`${k}Tr`]) || e[k];
  return (
    <section className="ds-section" aria-label={t('expKicker')}>
      <style>{css}</style>
      <div className="ds-wrap ps-split flip">
        <Photo webp="/media/workspace-desk.webp" jpg="/media/workspace-desk.jpg" pos="70% 50%"
          kicker={t('expKicker')} title={t('expTitle')} note={t('expSub')}
          link={<Link to="/experience" className="ds-link" style={{ marginTop: 22 }}>{t('xpViewAll')} <ArrowRight size={13} strokeWidth={1.5} /></Link>} />
        <ul className="ps-tl">
          {WORK_SORTED.map((e) => (
            <li key={e.id} className={e.end ? undefined : 'current'}>
              <Link to="/experience">
                <span className="ds-meta">{fmtRange(e, lang, t('xpPresent'), t('xpExpected'))}</span>
                <span className={`ps-plate${e.logoLight ? ' light' : ''}`} title={e.confidential ? t('xpConfidential') : (e.orgShort || L(e, 'org'))}>
                  {e.confidential
                    ? <Lock size={16} strokeWidth={1.5} aria-hidden="true" />
                    : e.logo ? <img src={e.logo} alt={`${e.orgShort || L(e, 'org')} logo`} loading="lazy" /> : null}
                </span>
                <span>
                  <span className="ds-h3" style={{ display: 'block' }}>{L(e, 'role')}</span>
                  <span className="ps-role" style={{ display: 'block' }}>
                    {e.confidential ? t('xpConfidential') : (e.orgShort || L(e, 'org'))}
                    {!e.end && <span className="label label-primary" style={{ marginLeft: 10, verticalAlign: 1 }}>{t('xpCurrent')}</span>}
                  </span>
                  <span className="ps-sum ps-clamp" style={{ display: 'block' }}>{L(e, 'summary')}</span>
                </span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ResearchSection() {
  const { t } = useLang();
  const research = t('researchItems');
  return (
    <section className="ds-section" aria-labelledby="ps-rs-title">
      <style>{css}</style>
      <div className="ds-wrap">
        <div className="ds-head">
          <div>
            <div className="ds-kicker">{t('researchKicker')}</div>
            <h2 id="ps-rs-title" className="ds-h2"><TwoTone text={t('researchTitle')} /></h2>
          </div>
          <div>
            <p className="ds-body">{t('researchSub')}</p>
            <Link to="/research" className="ds-link" style={{ marginTop: 24 }}>{t('researchAll')} <ArrowRight size={13} strokeWidth={1.5} /></Link>
          </div>
        </div>
        <ol className="ps-rs">
          {Array.isArray(research) && research.map((r, i) => (
            <li key={r.title}>
              <Link to="/research">
                {r.cover && (
                  <span className={`ds-media ps-rs-img${r.coverKind === 'figure' ? ' contain' : ''}`}>
                    <img src={r.cover} alt="" loading="lazy" decoding="async" />
                  </span>
                )}
                <span className="ps-rs-top">
                  <span className="ps-rs-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ps-rs-st ds-meta">
                    <span className="ps-rs-dot" style={{ background: r.status === 'completed' ? '#8a93a3' : 'var(--ds-accent)' }} />
                    {r.status === 'completed' ? t('researchCompleted') : t('researchStatus')}
                  </span>
                </span>
                <span className="ds-h3">{r.title}</span>
                <span className="ds-meta ps-rs-field">{r.field}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
