import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Code2, Route } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import TwoTone from '../TwoTone';

// "What I'm building & exploring" — the first section after the hero and the
// landing point of its "View Work" glide (#profile). Who I am in one sentence,
// then three themes, each with links to the real pages that back it up. These
// are themes, not roles: employment lives on /experience. No live feed.
const ICONS = { ai: BrainCircuit, product: Code2, algo: Route };

export default function ProfileSummary() {
  const { t } = useLang();
  const themes = Array.isArray(t('pfThemes')) ? t('pfThemes') : [];

  return (
    <section id="profile" className="ds-section pf" aria-labelledby="pf-title" data-reveal>
      <style>{`
        .pf { border-top: none; }
        .pf-head { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 16px 64px; align-items: end; }
        .pf-head h2:focus { outline: none; }
        .pf-lede { font-family: var(--font-body); font-size: 17px; line-height: 1.65; color: #c3c9d4; max-width: 620px; }
        .pf-grid { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; margin-top: 36px; border-top: 1px solid var(--c-line); }
        .pf-theme { position: relative; display: flex; flex-direction: column; gap: 12px; padding: 26px 28px 24px; border-right: 1px solid var(--c-line); }
        .pf-theme:last-child { border-right: none; }
        .pf-theme::before { content: ''; position: absolute; left: 28px; top: -1px; width: 36px; height: 2px; background: var(--pf-acc); }
        .pf-t { display: flex; align-items: center; gap: 12px; }
        .pf-ic { width: 34px; height: 34px; flex: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--pf-acc); border: 1px solid color-mix(in srgb, var(--pf-acc) 45%, transparent); }
        .pf-theme h3 { font-family: var(--font-display); font-weight: 500; font-size: 20px; letter-spacing: -0.01em; color: var(--c-ink); }
        .pf-theme p { font-family: var(--font-body); font-size: 14.5px; line-height: 1.6; color: var(--c-body); }
        .pf-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .pf-links { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: auto; padding-top: 6px; }
        .pf-links a { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #c6cdd8; padding: 4px 0; border-bottom: 1px solid transparent; transition: color 0.25s, border-color 0.25s; }
        .pf-links a:hover, .pf-links a:focus-visible { color: var(--pf-acc); border-bottom-color: var(--pf-acc); }
        .pf-links a:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 3px; }
        .pf-links svg { transition: transform 0.25s; }
        .pf-links a:hover svg { transform: translateX(2px); }
        @media (prefers-reduced-motion: reduce) { .pf-links a, .pf-links svg { transition: none; } }
        @media (max-width: 1000px) {
          .pf-head { grid-template-columns: 1fr; }
          .pf-grid { grid-template-columns: 1fr; }
          .pf-theme { border-right: none; border-bottom: 1px solid var(--c-line); padding: 22px 0; }
          .pf-theme::before { left: 0; }
        }
        @media (max-width: 600px) {
          .pf { padding-bottom: 40px; }
          .pf-lede { font-size: 15.5px; }
          .pf-grid { margin-top: 24px; }
          .pf-theme { display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 6px 12px; padding: 16px 0; }
          .pf-t { display: contents; }
          .pf-ic { grid-row: 1; }
          .pf-theme h3 { grid-column: 2; align-self: center; }
          .pf-theme p, .pf-links { grid-column: 2; }
          .pf-links { padding-top: 2px; gap: 4px 16px; }
          .pf-tags { display: none; }
          .pf-theme h3 { font-size: 18px; }
          .pf-ic { width: 30px; height: 30px; }
          .pf-theme p { font-size: 14px; }
        }
      `}</style>
      <div className="ds-wrap">
        <div className="pf-head">
          <div>
            <div className="ds-kicker">{t('pfKicker')}</div>
            <h2 id="pf-title" className="ds-h2" tabIndex={-1}><TwoTone text={t('pfTitle')} /></h2>
          </div>
          <p className="pf-lede">{t('pfLede')}</p>
        </div>
        <ul className="pf-grid">
          {themes.map((th) => {
            const Icon = ICONS[th.id] || Code2;
            const acc = th.id === 'algo' ? 'var(--c-tertiary)' : th.id === 'product' ? 'var(--c-secondary)' : 'var(--c-primary)';
            return (
              <li key={th.id} className="pf-theme" style={{ '--pf-acc': acc }}>
                <div className="pf-t">
                  <span className="pf-ic" aria-hidden="true"><Icon size={16} strokeWidth={1.5} /></span>
                  <h3>{th.title}</h3>
                </div>
                <p>{th.text}</p>
                {Array.isArray(th.tags) && <div className="pf-tags">{th.tags.map((x) => <span key={x} className="label">{x}</span>)}</div>}
                <nav className="pf-links" aria-label={th.title}>
                  {th.links.map((l) => (
                    <Link key={l.to} to={l.to}>{l.label} <ArrowRight size={12} strokeWidth={1.6} aria-hidden="true" /></Link>
                  ))}
                </nav>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
