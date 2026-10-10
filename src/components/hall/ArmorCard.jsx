import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import { CATEGORY_TR } from '../../data/projects';
import TechLogos from '../TechLogos';

// One project in a Hall of Armor collection: cover, MARK, category, title,
// codename, one-liner, up to three technologies with names, the first real
// metric (never invented) and the way in. Render ARMOR_CARD_CSS once per page.
export const ARMOR_CARD_CSS = `
  .armory-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px 28px; }
  .armor-card { display: flex; flex-direction: column; color: inherit; }
  .armor-card .ds-media { aspect-ratio: 16 / 10; }
  .armor-card .ds-media img { filter: saturate(0.85) brightness(0.9); }
  .armor-card .mark { position: absolute; left: 12px; top: 12px; z-index: 1; background: rgba(10,12,16,0.78); }
  .armor-card h3 { font-family: var(--font-display); font-weight: 500; font-size: 21px; letter-spacing: -0.01em; color: var(--c-ink); margin-top: 8px; transition: color 0.3s; }
  .armor-card:hover h3, .armor-card:focus-visible h3 { color: var(--c-primary); }
  .armor-card .code { font-family: var(--font-body); font-size: 13px; color: var(--c-meta); margin-top: 2px; }
  .armor-card .line { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: var(--c-body); margin-top: 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .armor-card .tech-logos { margin-top: 16px; }
  .armor-card .result { margin-top: auto; padding-top: 16px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: #c6cdd8; }
  .armor-card .result span { color: var(--c-meta); }
  .armor-card .foot { display: flex; justify-content: space-between; gap: 12px; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--c-line); }
  @media (max-width: 1100px) { .armory-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 640px) { .armory-grid { grid-template-columns: 1fr; } }
`;

export default function ArmorCard({ project, index = 0 }) {
  const { lang, t } = useLang();
  const oneLiner = lang === 'tr' && project.oneLinerTr ? project.oneLinerTr : project.oneLiner;
  // The result line derives from metrics[0], so the card and the page cannot disagree.
  const metricRows = (lang === 'tr' && project.metricsTr ? project.metricsTr : project.metrics) || [];
  const metric = metricRows.length ? metricRows[0] : null;
  const roleLabels = t('pdRole') || {};
  const statusLabels = t('pdStatus') || {};
  const metaLine = [roleLabels[project.role] || project.role, project.period, statusLabels[project.status] || project.status].filter(Boolean).join(' · ');
  const category = lang === 'tr' ? CATEGORY_TR[project.category] || project.category : project.category;

  return (
    <Link to={`/project/${project.slug}`} className="armor-card reveal" style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}>
      <div className="ds-media">
        <span className="label mark" style={{ color: project.color, borderColor: `${project.color}88` }}>{project.mark}</span>
        <img src={project.cover || project.images[0].src} alt={`${project.title} — ${t('pdCoverAlt')}`} loading="lazy" decoding="async" />
      </div>
      <div className="ds-meta" style={{ marginTop: 16 }}>{category}</div>
      <h3>{project.title}</h3>
      <div className="code">{project.codename}</div>
      <p className="line">{oneLiner}</p>
      <TechLogos project={project} />
      {metric && <div className="result">{metric.value} <span>· {metric.label}</span></div>}
      <div className="foot" style={metric ? undefined : { marginTop: 'auto' }}>
        <span className="ds-meta">{metaLine}</span>
        <span className="ds-meta" style={{ color: '#c6cdd8', display: 'inline-flex', alignItems: 'center', gap: 4 }}>{t('projectOpen')} <ArrowUpRight size={12} strokeWidth={1.5} /></span>
      </div>
    </Link>
  );
}
