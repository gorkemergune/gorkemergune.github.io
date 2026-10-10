import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import PROJECTS, { CATEGORY_TR } from '../data/projects';
import TwoTone from './TwoTone';
import TechLogos from './TechLogos';

// The Hall of Armor as a visual directory: every project, MARK order, each
// with its own cover diagram. A category filter keeps 29 tiles navigable
// without hiding any of them by default.
export default function ArmoryIndex() {
  const { lang, t } = useLang();
  const [cat, setCat] = useState('all');
  const cats = useMemo(() => [...new Set(PROJECTS.map((p) => p.category))], []);
  const shown = cat === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === cat);
  const catLabel = (c) => (lang === 'tr' ? CATEGORY_TR[c] || c : c);

  return (
    <section className="ds-section ai" aria-labelledby="ai-title">
      <style>{`
        .ai-filter { display: flex; flex-wrap: wrap; gap: 4px 22px; margin-bottom: 32px; padding-bottom: 14px; border-bottom: 1px solid var(--ds-line); }
        .ai-filter button { background: none; border: none; padding: 6px 0; cursor: pointer; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ds-meta); border-bottom: 1px solid transparent; transition: color 0.3s, border-color 0.3s; }
        .ai-filter button:hover { color: #c6cdd8; }
        .ai-filter button[aria-pressed="true"] { color: var(--ds-ink); border-bottom-color: var(--ds-accent); }
        .ai-grid { list-style: none; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 40px 24px; }
        .ai-tile { display: flex; flex-direction: column; color: inherit; }
        .ai-tile .ds-media { aspect-ratio: 16 / 10; }
        .ai-tile .ds-media img { filter: saturate(0.75) brightness(0.85); }
        .ai-top { display: flex; justify-content: space-between; gap: 10px; margin-top: 14px; }
        .ai-name { margin-top: 6px; font-family: var(--font-body); font-size: 15px; line-height: 1.35; color: var(--ds-ink); transition: color 0.3s; }
        .ai-tile:hover .ai-name { color: var(--ds-accent); }
        .ai-tech { margin-top: 10px; }
        .ai-code { margin-top: 4px; font-family: var(--font-body); font-size: 13px; color: var(--ds-meta); }
        @media (max-width: 1240px) { .ai-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
        @media (max-width: 1000px) { .ai-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (max-width: 760px) { .ai-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 14px; } .ai-name { font-size: 14px; } .ai-top .ai-lang { display: none; } }
      `}</style>

      <div className="ds-wrap">
        <div className="ds-head">
          <div>
            <div className="ds-kicker">{t('armoryKicker')} · {String(PROJECTS.length).padStart(2, '0')}</div>
            <h2 id="ai-title" className="ds-h2"><TwoTone text={t('armoryTitle')} /></h2>
          </div>
          <div>
            <p className="ds-body">{t('armorySub')}</p>
            <Link to="/project" className="ds-link" style={{ marginTop: 24 }}>{t('workAll')} <ArrowRight size={13} strokeWidth={1.5} /></Link>
          </div>
        </div>

        <div className="ai-filter" role="group" aria-label={t('armoryKicker')}>
          <button type="button" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>
            {t('armoryAll')} · {PROJECTS.length}
          </button>
          {cats.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
              {catLabel(c)} · {PROJECTS.filter((p) => p.category === c).length}
            </button>
          ))}
        </div>

        <ul className="ai-grid">
          {shown.map((p) => (
            <li key={p.slug}>
              <Link to={`/project/${p.slug}`} className="ai-tile">
                <div className="ds-media"><img src={p.cover} alt="" loading="lazy" decoding="async" /></div>
                <div className="ai-top ds-meta">
                  <span style={{ color: p.color }}>{p.mark}</span>
                  <span className="ai-lang">{p.language}</span>
                </div>
                <span className="ai-name">{p.title}</span>
                <span className="ai-code">{p.codename}</span>
                <TechLogos project={p} className="ai-tech" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
