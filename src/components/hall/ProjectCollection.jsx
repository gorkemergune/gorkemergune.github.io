import { ArrowLeft, LayoutGrid } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import PROJECTS from '../../data/projects';
import { HALL_CATEGORIES, projectsInCategory } from '../../data/hallOfArmor';
import { HALL_ICONS } from './hallIcons';
import ArmorCard, { ARMOR_CARD_CSS } from './ArmorCard';

// One bay opened: a header that zooms into that bay of the same scene (moved
// to the right third, clear of the text), the
// factual description and count, quick links to the other bays, then the
// matching projects as ArmorCards (existing data, MARK order).
export default function ProjectCollection({ id, onSelect }) {
  const { lang, t } = useLang();
  const c = HALL_CATEGORIES.find((x) => x.id === id);
  const L = (o, k) => (lang === 'tr' && o[`${k}Tr`]) || o[k];
  const items = projectsInCategory(id);
  const Icon = HALL_ICONS[c.icon];
  const [x, y, w, h] = c.bay;
  const cx = x + w / 2;
  const cy = y + h / 2;

  return (
    <div className="pc">
      <style>{`
        ${ARMOR_CARD_CSS}
        .pc-head { position: relative; height: 360px; overflow: hidden; border-bottom: 1px solid var(--c-line); background: #05060a; isolation: isolate; }
        .pc-head img { position: absolute; left: 0; top: 50%; width: 100%; height: auto; transform-origin: var(--cx) var(--cy); transform: translate(var(--dx), calc(-1 * var(--cy))) scale(2.2); animation: pc-zoom 0.9s cubic-bezier(0.2,0.8,0.2,1); filter: brightness(0.8); }
        @keyframes pc-zoom { from { transform: translate(var(--dx), calc(-1 * var(--cy))) scale(1.2); opacity: 0.4; } to { transform: translate(var(--dx), calc(-1 * var(--cy))) scale(2.2); opacity: 1; } }
        .pc-head::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10,12,16,0.95) 0%, rgba(10,12,16,0.8) 40%, rgba(10,12,16,0.25) 75%, rgba(10,12,16,0.35) 100%), linear-gradient(180deg, rgba(10,12,16,0) 50%, rgba(10,12,16,0.85) 100%); }
        .pc-inner { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 36px; }
        .pc-nav { display: flex; flex-wrap: wrap; gap: 10px 22px; margin-bottom: 24px; }
        .pc-nav button { display: inline-flex; align-items: center; gap: 8px; background: none; border: none; padding: 0; cursor: pointer; font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.08em; color: #c6cdd8; }
        .pc-nav button:hover { color: var(--c-primary); }
        .pc-title { display: flex; align-items: center; gap: 16px; }
        .pc-ic { width: 46px; height: 46px; flex: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0,240,255,0.55); color: var(--c-primary); background: rgba(10,12,16,0.6); }
        .pc-ic.amber { border-color: rgba(245,158,11,0.6); color: var(--c-tertiary); }
        .pc-head h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(30px, 3.6vw, 52px); line-height: 1.05; letter-spacing: -0.02em; color: var(--c-ink); }
        .pc-head p { font-family: var(--font-body); font-size: 16px; line-height: 1.6; color: #c9cfd8; max-width: 600px; margin-top: 14px; }
        .pc-count { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-primary); margin-top: 14px; }
        .pc-count.amber { color: var(--c-tertiary); }
        .pc-bays { display: flex; gap: 6px; flex-wrap: wrap; padding: 22px 0; border-bottom: 1px solid var(--c-line); margin-bottom: 40px; }
        .pc-bays .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-meta); margin-right: 8px; align-self: center; }
        .pc-bays button { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; background: transparent; border: 1px solid var(--c-line); color: #aab2bf; cursor: pointer; font-family: var(--font-body); font-size: 13px; transition: border-color 0.3s, color 0.3s; }
        .pc-bays button:hover, .pc-bays button:focus-visible { border-color: var(--c-line-strong); color: var(--c-ink); }
        .pc-bays button[aria-current="true"] { border-color: var(--c-primary); color: var(--c-ink); }
        @media (prefers-reduced-motion: reduce) { .pc-head img { animation: none; } }
        @media (max-width: 700px) { .pc-head { height: 380px; } .pc-head img { transform: translate(var(--dxm), calc(-1 * var(--cy))) scale(3.2); animation: none; } .pc-bays { flex-wrap: nowrap; overflow-x: auto; } .pc-bays button { flex: none; } }
      `}</style>

      <header className="pc-head" style={{ '--cx': `${cx}%`, '--cy': `${cy}%`, '--dx': `${72 - cx}%`, '--dxm': `${50 - cx}%` }}>
        <picture aria-hidden="true">
          <source srcSet="/media/hall/armor-hall.webp" type="image/webp" />
          <img src="/media/hall/armor-hall-1000.jpg" alt="" />
        </picture>
        <div className="ds-wrap pc-inner">
          <div className="pc-nav">
            <button type="button" onClick={() => onSelect(null)}><ArrowLeft size={14} strokeWidth={1.6} /> {t('hallBack')}</button>
            <button type="button" onClick={() => onSelect('all')}><LayoutGrid size={14} strokeWidth={1.6} /> {t('hallAll')} · {PROJECTS.length}</button>
          </div>
          <div className="pc-title">
            <span className={`pc-ic ${c.tone}`} aria-hidden="true">{Icon && <Icon size={22} strokeWidth={1.5} />}</span>
            <h1>{L(c, 'label')}</h1>
          </div>
          <p>{L(c, 'desc')}</p>
          <div className={`pc-count ${c.tone}`}>{items.length} {t('hallProjects')}</div>
        </div>
      </header>

      <div className="ds-wrap" style={{ paddingBottom: 120 }}>
        <nav className="pc-bays" aria-label={t('hallOther')}>
          <span className="k">{t('hallOther')}</span>
          {HALL_CATEGORIES.map((o) => {
            const I = HALL_ICONS[o.icon];
            return (
              <button key={o.id} type="button" aria-current={o.id === id ? 'true' : undefined} onClick={() => onSelect(o.id)}>
                {I && <I size={13} strokeWidth={1.6} />} {L(o, 'label')}
              </button>
            );
          })}
        </nav>
        <div className="armory-grid">
          {items.map((p, i) => <ArmorCard key={p.slug} project={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
