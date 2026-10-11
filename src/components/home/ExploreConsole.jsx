import { Link } from 'react-router-dom';
import { Beaker, BookOpen, Briefcase, Mail, Map as MapIcon, Package, Smartphone, Trophy } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import PROJECTS from '../../data/projects';
import COMPETITIONS from '../../data/competitions';
import { WORK } from '../../data/experience';
import ARTICLES from '../../data/articles';
import TwoTone from '../TwoTone';

// "Explore my work": the eight doors of the portfolio as a row of illuminated
// dashboard tiles (release design, after tasks/anasayfa.png): one accent per
// room, icon over title over count. Every count is derived from the data,
// never typed in; the unit text stays available to screen readers and as a
// tooltip. Desktop: one row of eight; ≤1100px: 4 × 2; phones keep 4 × 2 with
// compact tiles so the section stays short.
export default function ExploreConsole() {
  const { t } = useLang();
  const count = (k) => { const v = t(k); return Array.isArray(v) ? v.length : 0; };

  const doors = [
    { to: '/project', icon: Package, label: t('exProjects'), n: PROJECTS.length, unit: t('exUProjects'), acc: '#22d3ee' },
    { to: '/experience', icon: Briefcase, label: t('exExperience'), n: WORK.length, unit: t('exURoles'), acc: '#fb923c' },
    { to: '/competitions', icon: Trophy, label: t('exCompetitions'), n: COMPETITIONS.length, unit: t('exUComps'), acc: '#818cf8' },
    { to: '/research', icon: Beaker, label: t('exResearch'), n: count('researchItems'), unit: t('exUResearch'), acc: '#f472b6' },
    { to: '/articles', icon: BookOpen, label: t('exArticles'), n: ARTICLES.read.length + count('blogItems'), unit: t('exUBooks'), acc: '#f59e0b' },
    { to: '/learning-path', icon: MapIcon, label: t('exPath'), n: count('learningItems'), unit: t('exUStages'), acc: '#4ade80' },
    { to: '/apps', icon: Smartphone, label: t('exApps'), n: count('appsItems'), unit: t('exUApps'), acc: '#60a5fa' },
    { to: '/contact', icon: Mail, label: t('exContact'), n: null, unit: t('exUContact'), acc: '#e879f9' },
  ];

  return (
    <section id="explore" className="ds-section ex" aria-labelledby="ex-title" data-reveal>
      <style>{`
        .ex-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px 48px; flex-wrap: wrap; margin-bottom: 28px; }
        .ex-head h2:focus { outline: none; }
        .ex-head p { font-family: var(--font-body); font-size: 15px; color: var(--c-body); max-width: 420px; }
        .ex-grid { list-style: none; display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 14px; }
        .ex-tile { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; height: 100%; min-height: 92px; padding: 14px 8px 12px; text-align: center; color: inherit; border-radius: 6px;
          background: linear-gradient(180deg, color-mix(in srgb, var(--acc) 14%, #0f1218), #0b0d11 85%);
          border: 1px solid color-mix(in srgb, var(--acc) 70%, transparent);
          box-shadow: 0 0 14px color-mix(in srgb, var(--acc) 22%, transparent), inset 0 0 18px color-mix(in srgb, var(--acc) 10%, transparent);
          transition: transform 0.25s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.25s, border-color 0.25s, background 0.25s; }
        .ex-tile:hover, .ex-tile:focus-visible { transform: translateY(-3px); border-color: var(--acc); background: linear-gradient(180deg, color-mix(in srgb, var(--acc) 22%, #10141a), #0c0e12 85%);
          box-shadow: 0 0 26px color-mix(in srgb, var(--acc) 42%, transparent), inset 0 0 22px color-mix(in srgb, var(--acc) 16%, transparent); }
        .ex-tile:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
        .ex-ic { color: var(--acc); filter: drop-shadow(0 0 6px color-mix(in srgb, var(--acc) 60%, transparent)); }
        .ex-label { font-family: var(--font-display); font-weight: 600; font-size: 16px; line-height: 1.15; color: #f3f5f8; }
        .ex-n { font-family: var(--font-mono); font-size: 12px; color: #c9cfd8; font-variant-numeric: tabular-nums; min-height: 16px; }
        @media (prefers-reduced-motion: reduce) { .ex-tile { transition: none; } .ex-tile:hover, .ex-tile:focus-visible { transform: none; } }
        @media (max-width: 1100px) { .ex-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
        @media (max-width: 600px) {
          .ex-head { margin-bottom: 20px; }
          .ex-grid { gap: 8px; }
          .ex-tile { min-height: 78px; padding: 10px 2px 8px; gap: 4px; border-radius: 5px; }
          .ex-ic { width: 18px; height: 18px; }
          .ex-label { font-size: clamp(10.5px, 3vw, 12.5px); font-weight: 600; letter-spacing: -0.015em; overflow-wrap: normal; word-break: keep-all; }
          .ex-n { font-size: 11px; min-height: 14px; }
        }
      `}</style>
      <div className="ds-wrap">
        <div className="ex-head">
          <div>
            <div className="ds-kicker">{t('exploreKicker')}</div>
            <h2 id="ex-title" className="ds-h2" tabIndex={-1}><TwoTone text={t('exploreTitle')} /></h2>
          </div>
          <p>{t('exploreSub')}</p>
        </div>
        <ul className="ex-grid">
          {doors.map(({ to, icon: Icon, label, n, unit, acc }) => (
            <li key={to}>
              <Link to={to} className="ex-tile" style={{ '--acc': acc }} title={n !== null ? `${n} ${unit}` : unit}>
                <Icon className="ex-ic" size={24} strokeWidth={1.6} aria-hidden="true" />
                <span className="ex-label">{label}</span>
                <span className="ex-n" aria-hidden={n === null}>{n !== null ? n : ''}</span>
                <span className="sr-only">{n !== null ? ` — ${n} ${unit}` : ` — ${unit}`}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
