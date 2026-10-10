import { useState } from 'react';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import PROJECTS from '../../data/projects';
import { HALL_CATEGORIES, INERT_BAYS, projectsInCategory } from '../../data/hallOfArmor';
import { HALL_ICONS } from './hallIcons';
import TwoTone from '../TwoTone';

// The interactive laboratory. The image sits in a box with the image's own
// aspect ratio (1672:831), so percentage hotspots stay locked to their bays at
// every width. Each bay is a real <button>: visible icon marker, hover/focus
// HUD panel, Enter/Space via the native button. Below 900px the bays become
// display-only and the same categories are offered as a touch list.
export default function HallScene({ onSelect }) {
  const { lang, t } = useLang();
  const [active, setActive] = useState(null);
  const L = (c, k) => (lang === 'tr' && c[`${k}Tr`]) || c[k];
  const count = (id) => projectsInCategory(id).length;

  return (
    <section className={`hall${active ? ' has-active' : ''}`} aria-labelledby="hall-title">
      <style>{`
        .hall { position: relative; }
        .hall-stage { position: relative; width: 100%; aspect-ratio: 1672 / 831; max-height: calc(100svh - var(--nav-h)); margin: 0 auto; overflow: hidden; background: #05060a; isolation: isolate; }
        @supports (aspect-ratio: 1) { .hall-stage { max-width: calc((100svh - var(--nav-h)) * 1672 / 831); } }
        .hall-stage > picture img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: filter 0.5s; }
        .hall.has-active .hall-stage > picture img { filter: brightness(0.8); }
        /* No zoom on the image itself: scaling it would slide the bays out from under their hotspots. */
        .hall-shade { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(10,12,16,0) 62%, rgba(10,12,16,0.55) 80%, rgba(10,12,16,0.92) 100%); z-index: 1; }

        .bay { position: absolute; z-index: 2; padding: 0; margin: 0; border: 1px solid transparent; background: transparent; cursor: pointer; color: inherit; transition: border-color 0.3s, background 0.3s, box-shadow 0.3s, opacity 0.3s; }
        .bay::before, .bay::after { content: ''; position: absolute; width: 14px; height: 14px; border-color: rgba(0,240,255,0.55); border-style: solid; opacity: 0.55; transition: opacity 0.3s; }
        .bay::before { left: -1px; top: -1px; border-width: 1px 0 0 1px; }
        .bay::after { right: -1px; bottom: -1px; border-width: 0 1px 1px 0; }
        .bay.amber::before, .bay.amber::after { border-color: rgba(245,158,11,0.6); }
        .bay-marker { position: absolute; left: 50%; bottom: 8%; transform: translateX(-50%); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(10,12,16,0.72); border: 1px solid rgba(0,240,255,0.55); color: var(--c-primary); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); transition: transform 0.3s, background 0.3s; }
        .bay.amber .bay-marker { border-color: rgba(245,158,11,0.65); color: var(--c-tertiary); }
        .bay.on { border-color: rgba(0,240,255,0.75); background: rgba(0,240,255,0.07); box-shadow: 0 0 0 1px rgba(0,240,255,0.25), 0 0 28px rgba(0,240,255,0.22) inset; animation: bay-pulse 2.4s ease-in-out infinite; }
        .bay.amber.on { border-color: rgba(245,158,11,0.8); background: rgba(245,158,11,0.07); box-shadow: 0 0 0 1px rgba(245,158,11,0.25), 0 0 28px rgba(245,158,11,0.2) inset; }
        .bay.on::before, .bay.on::after { opacity: 1; }
        .bay.on .bay-marker { transform: translateX(-50%) scale(1.12); background: rgba(10,12,16,0.9); }
        .hall.has-active .bay:not(.on) { background: rgba(5,6,10,0.35); }
        .bay:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 2px; }
        @keyframes bay-pulse { 0%, 100% { box-shadow: 0 0 0 1px rgba(0,240,255,0.2), 0 0 22px rgba(0,240,255,0.16) inset; } 50% { box-shadow: 0 0 0 1px rgba(0,240,255,0.4), 0 0 34px rgba(0,240,255,0.3) inset; } }
        .bay-inert { position: absolute; z-index: 1; background: rgba(5,6,10,0.45); pointer-events: none; }

        .hud { position: absolute; z-index: 4; width: 250px; padding: 14px 16px; background: rgba(8,10,14,0.88); border: 1px solid rgba(0,240,255,0.35); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); pointer-events: none; animation: hud-in 0.22s ease-out; }
        .hud.amber { border-color: rgba(245,158,11,0.45); }
        .hud .k { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-meta); }
        .hud .n { font-family: var(--font-display); font-weight: 500; font-size: 17px; line-height: 1.2; color: var(--c-ink); margin-top: 6px; }
        .hud .c { font-family: var(--font-mono); font-size: 11px; color: var(--c-primary); margin-top: 6px; }
        .hud.amber .c { color: var(--c-tertiary); }
        .hud .go { display: flex; align-items: center; gap: 8px; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #dfe5ee; }
        @keyframes hud-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

        .hall-bar { position: absolute; z-index: 3; left: 0; right: 0; bottom: 0; padding: 0 var(--ds-gutter) 28px; display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; pointer-events: none; }
        .hall-bar > * { pointer-events: auto; }
        .hall-bar h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(34px, 3.6vw, 56px); line-height: 1; letter-spacing: -0.025em; color: var(--c-ink); margin-top: 10px; }
        .hall-bar p { font-family: var(--font-body); font-size: 15px; line-height: 1.55; color: #c9cfd8; max-width: 460px; margin-top: 10px; }
        .hall-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
        .hall-hint { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #9aa1ad; }

        .hall-list { display: none; }
        @media (prefers-reduced-motion: reduce) { .bay.on { animation: none; } .hud { animation: none; } .hall-stage > picture img { transition: none; } }
        @media (max-width: 900px) {
          .hall-stage { max-height: none; max-width: none; }
          .bay { pointer-events: none; border-color: transparent !important; background: transparent !important; box-shadow: none !important; animation: none !important; }
          .bay::before, .bay::after { display: none; }
          .bay-marker { width: 20px; height: 20px; }
          .bay-marker svg { width: 11px; height: 11px; }
          .hall-bar { position: static; padding: 24px var(--ds-gutter) 0; flex-direction: column; align-items: stretch; }
          .hall-actions { align-items: stretch; }
          .hall-actions .btn { justify-content: space-between; }
          .hall-hint.desk { display: none; }
          .hall-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; list-style: none; padding: 20px var(--ds-gutter) 0; }
          .hall-list button { width: 100%; min-height: 64px; display: grid; grid-template-columns: 36px minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 12px 14px; text-align: left; background: var(--c-surface); border: 1px solid var(--c-line); color: var(--c-ink); cursor: pointer; transition: border-color 0.3s; }
          .hall-list button:active, .hall-list button:focus-visible { border-color: var(--c-primary); }
          .hall-list .ic { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0,240,255,0.45); color: var(--c-primary); }
          .hall-list .amber .ic { border-color: rgba(245,158,11,0.5); color: var(--c-tertiary); }
          .hall-list .nm { font-family: var(--font-display); font-weight: 500; font-size: 15px; line-height: 1.25; }
          .hall-list .ct { font-family: var(--font-mono); font-size: 11px; color: var(--c-meta); }
        }
        @media (max-width: 560px) { .hall-list { grid-template-columns: 1fr; } }
      `}</style>

        <div className="hall-stage" onMouseLeave={() => setActive(null)}>
          <picture>
            <source media="(max-width: 1000px)" srcSet="/media/hall/armor-hall-1000.webp" type="image/webp" />
            <source srcSet="/media/hall/armor-hall.webp" type="image/webp" />
            <img src="/media/hall/armor-hall-1000.jpg" alt={t('hallSceneAlt')} fetchpriority="high" decoding="async" />
          </picture>
          <div className="hall-shade" />

          {INERT_BAYS.map((b) => (
            <span key={b.id} className="bay-inert" aria-hidden="true"
              style={{ left: `${b.bay[0]}%`, top: `${b.bay[1]}%`, width: `${b.bay[2]}%`, height: `${b.bay[3]}%` }} />
          ))}

          {HALL_CATEGORIES.map((c) => {
            const Icon = HALL_ICONS[c.icon];
            const n = count(c.id);
            const on = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                className={`bay ${c.tone}${on ? ' on' : ''}`}
                style={{ left: `${c.bay[0]}%`, top: `${c.bay[1]}%`, width: `${c.bay[2]}%`, height: `${c.bay[3]}%` }}
                aria-label={`${L(c, 'label')} — ${n} ${t('hallProjects')}. ${t('hallExplore')}`}
                onMouseEnter={() => setActive(c.id)}
                onFocus={() => setActive(c.id)}
                onBlur={() => setActive((a) => (a === c.id ? null : a))}
                onClick={() => onSelect(c.id)}
              >
                <span className="bay-marker" aria-hidden="true">{Icon && <Icon size={15} strokeWidth={1.6} />}</span>
              </button>
            );
          })}

          {active && (() => {
            const c = HALL_CATEGORIES.find((x) => x.id === active);
            const [x, y, w, h] = c.bay;
            const right = x + w / 2 > 50;
            const pos = {
              top: `calc(${y + h}% + 10px)`,
              ...(right ? { right: `${100 - (x + w)}%` } : { left: `${x}%` }),
            };
            if (c.floor === 'lower') { delete pos.top; pos.bottom = `calc(${100 - y}% + 10px)`; }
            return (
              <div className={`hud ${c.tone}`} style={pos} aria-hidden="true">
                <div className="k">{t('hallBay')} {String(HALL_CATEGORIES.indexOf(c) + 1).padStart(2, '0')}</div>
                <div className="n">{L(c, 'label')}</div>
                <div className="c">{count(c.id)} {t('hallProjects')}</div>
                <div className="go">{t('hallExplore')} <ArrowRight size={12} strokeWidth={1.6} /></div>
              </div>
            );
          })()}

        </div>

        <div className="hall-bar">
          <div>
            <div className="ds-kicker">{t('hallKicker')}</div>
            <h1 id="hall-title"><TwoTone text={t('projectLabel')} /></h1>
            <p>{t('hallSub')}</p>
          </div>
          <div className="hall-actions">
            <span className="hall-hint desk">{t('hallHint')}</span>
            <button type="button" className="btn btn-outline" onClick={() => onSelect('all')}>
              <LayoutGrid size={15} strokeWidth={1.5} /> {t('hallAll')} · {PROJECTS.length} <ArrowRight size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <ul className="hall-list" aria-label={t('hallMobileHint')}>
          {HALL_CATEGORIES.map((c) => {
            const Icon = HALL_ICONS[c.icon];
            return (
              <li key={c.id} className={c.tone}>
                <button type="button" onClick={() => onSelect(c.id)} aria-label={`${L(c, 'label')} — ${count(c.id)} ${t('hallProjects')}`}>
                  <span className="ic" aria-hidden="true">{Icon && <Icon size={17} strokeWidth={1.6} />}</span>
                  <span className="nm">{L(c, 'label')}</span>
                  <span className="ct">{count(c.id)}</span>
                </button>
              </li>
            );
          })}
        </ul>
    </section>
  );
}
