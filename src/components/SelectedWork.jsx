import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import PROJECTS, { getProject, CATEGORY_TR } from '../data/projects';
import TwoTone from './TwoTone';
import TechLogos from './TechLogos';

// A curated showcase, not a grid: one lead project with a large cover and its
// headline result, three supporting projects beside it. All four are
// `tier: 'featured'`; the order is deliberate (flagship benchmark first, then
// a measured CV model, a gated RAG system and the most-tested tool).
const LEAD = 'mihenk-benchmark';
const SUPPORT = ['yolo-custom-detector', 'turkish-medical-rag', 'algorithm-mentor-mcp'];

function useProjectView() {
  const { lang } = useLang();
  return (slug) => {
    const p = getProject(slug);
    if (!p) return null;
    const rows = lang === 'tr' && p.metricsTr ? p.metricsTr : p.metrics;
    return {
      p,
      m: rows && rows[0],
      cat: lang === 'tr' ? CATEGORY_TR[p.category] || p.category : p.category,
      line: lang === 'tr' && p.oneLinerTr ? p.oneLinerTr : p.oneLiner,
    };
  };
}

export default function SelectedWork() {
  const { t } = useLang();
  const view = useProjectView();
  const lead = view(LEAD);
  const rest = SUPPORT.map(view).filter(Boolean);

  return (
    <section className="ds-section sw" aria-labelledby="sw-title">
      <style>{`
        .sw { border-top: none; padding-top: 80px; }
        .sw-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 48px; align-items: stretch; }
        .sw-lead { display: flex; flex-direction: column; color: inherit; }
        .sw-lead .ds-media { aspect-ratio: 16 / 10; }
        .sw-lead .ds-media img, .sw-row .ds-media img { filter: none; }
        .sw-badge { position: absolute; left: 16px; top: 16px; z-index: 1; }
        .sw-lead-body { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px 40px; padding-top: 26px; }
        .sw-lead h3 { font-family: var(--font-display); font-weight: 400; font-size: clamp(28px, 2.6vw, 38px); letter-spacing: -0.02em; color: var(--c-ink); margin-top: 10px; transition: color 0.3s; }
        .sw-lead:hover h3, .sw-row:hover h3 { color: var(--c-primary); }
        .sw-line { font-family: var(--font-body); font-size: 15.5px; line-height: 1.6; color: var(--c-body); margin-top: 12px; max-width: 560px; }
        .sw-result { text-align: right; align-self: start; padding-top: 6px; max-width: 220px; }
        .sw-result-v { font-family: var(--font-display); font-size: 30px; line-height: 1.1; color: var(--c-ink); }
        .sw-result-l { margin-top: 6px; }
        .sw-result-c { font-family: var(--font-body); font-size: 12px; line-height: 1.45; color: var(--c-meta); margin-top: 6px; }
        .sw-lead .tech-logos, .sw-row .tech-logos { margin-top: 18px; }
        .sw-side { display: flex; flex-direction: column; border-top: 1px solid var(--c-line); }
        .sw-row { display: grid; grid-template-columns: 168px minmax(0, 1fr); gap: 22px; padding: 22px 0; border-bottom: 1px solid var(--c-line); color: inherit; flex: 1; }
        .sw-row .ds-media { aspect-ratio: 16 / 10; align-self: start; }
        .sw-row h3 { font-family: var(--font-display); font-weight: 500; font-size: 19px; color: var(--c-ink); margin-top: 6px; transition: color 0.3s; }
        .sw-row .sw-line { font-size: 14px; margin-top: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .sw-row-m { margin-top: 10px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: #c6cdd8; }
        .sw-row-m span { color: var(--c-meta); }
        @media (max-width: 1100px) { .sw-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) {
          .sw-lead-body { grid-template-columns: 1fr; }
          .sw-result { text-align: left; }
          .sw-row { grid-template-columns: 1fr; gap: 14px; }
        }
      `}</style>

      <div className="ds-wrap">
        <div className="ds-head">
          <div>
            <div className="ds-kicker">{t('workKicker')}</div>
            <h2 id="sw-title" className="ds-h2"><TwoTone text={t('workTitle')} /></h2>
          </div>
          <div>
            <p className="ds-body">{t('workSub')}</p>
            <Link to="/project" className="ds-link" style={{ marginTop: 24 }}>
              {t('workAll')} · {String(PROJECTS.length).padStart(2, '0')} <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <div className="sw-grid">
          {lead && (
            <Link to={`/project/${lead.p.slug}`} className="sw-lead">
              <div className="ds-media">
                <span className="label sw-badge" style={{ color: lead.p.color, borderColor: `${lead.p.color}88`, background: 'rgba(10,12,16,0.75)' }}>{lead.p.mark}</span>
                <img src={lead.p.cover} alt={`${lead.p.title} — ${t('pdCoverAlt')}`} loading="lazy" decoding="async" />
              </div>
              <div className="sw-lead-body">
                <div>
                  <div className="ds-meta">{lead.cat}</div>
                  <h3>{lead.p.title}</h3>
                  <p className="sw-line">{lead.line}</p>
                  <TechLogos project={lead.p} />
                </div>
                {lead.m && (
                  <div className="sw-result">
                    <div className="sw-result-v">{lead.m.value}</div>
                    <div className="ds-meta sw-result-l">{lead.m.label}</div>
                    <div className="sw-result-c">{lead.m.condition}</div>
                  </div>
                )}
              </div>
            </Link>
          )}

          <div className="sw-side">
            {rest.map(({ p, m, cat, line }) => (
              <Link key={p.slug} to={`/project/${p.slug}`} className="sw-row">
                <div className="ds-media"><img src={p.cover} alt={`${p.title} — ${t('pdCoverAlt')}`} loading="lazy" decoding="async" /></div>
                <div style={{ minWidth: 0 }}>
                  <div className="ds-meta"><span style={{ color: p.color }}>{p.mark}</span> · {cat}</div>
                  <h3>{p.title} <ArrowUpRight size={14} strokeWidth={1.5} style={{ verticalAlign: -1, color: 'var(--c-meta)' }} /></h3>
                  <p className="sw-line">{line}</p>
                  {m && <div className="sw-row-m">{m.value} <span>· {m.label}</span></div>}
                  <TechLogos project={p} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
