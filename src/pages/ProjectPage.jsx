import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import PROJECTS, { CATEGORY_TR as CAT_TR } from '../data/projects';
import { getHallCategory } from '../data/hallOfArmor';
import HallScene from '../components/hall/HallScene';
import ProjectCollection from '../components/hall/ProjectCollection';
import ArmorCard, { ARMOR_CARD_CSS } from '../components/hall/ArmorCard';

// /project — the Hall of Armor.
//   no ?bay      → the interactive laboratory (HallScene)
//   ?bay=<id>    → that bay's collection (ProjectCollection)
//   ?bay=all     → every project, with the original search + category tabs
// The selection lives in the URL so it survives refresh and can be shared.
export default function ProjectPage() {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  const bay = params.get('bay');
  const category = bay && bay !== 'all' ? getHallCategory(bay) : null;
  const view = bay === 'all' ? 'all' : category ? 'bay' : 'hall';

  useSeo({ title: t('projectLabel'), description: t('projectSub'), path: '/project' });

  const select = (id) => {
    if (id) setParams({ bay: id }); else setParams({});
    window.scrollTo(0, 0);
  };

  // An unknown ?bay value falls back to the hall instead of an empty page.
  useEffect(() => { if (bay && bay !== 'all' && !category) setParams({}, { replace: true }); }, [bay, category, setParams]);

  return (
    <div className="pp" key={view + (bay || '')} style={{ animation: 'page-fade 0.45s cubic-bezier(0.2,0.8,0.2,1)' }}>
      {view === 'hall' && <HallScene onSelect={select} />}
      {view === 'bay' && <ProjectCollection id={category.id} onSelect={select} />}
      {view === 'all' && <AllProjects onBack={() => select(null)} />}
    </div>
  );
}

// Category order drives both the filter tabs and the grouped sections below.
// Featured projects lead their category; the rest keep their MARK order.
const TIER_ORDER = { featured: 0, research: 1, supporting: 2, experimental: 3, archive: 4 };
const byTier = (a, b) => (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9);
const CAT_ORDER = ['Research & Benchmarks', 'LLM & NLP', 'AI Agents & Tooling', 'Computer Vision', 'Machine Learning', 'Systems & Graphics', 'Apps & Tools'];

function AllProjects({ onBack }) {
  const { lang, t } = useLang();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const cats = useMemo(() => ['All', ...CAT_ORDER.filter((c) => PROJECTS.some((p) => p.category === c))], []);
  const catLabel = (c) => (c === 'All' ? (lang === 'tr' ? 'Tümü' : 'All') : (lang === 'tr' ? CAT_TR[c] || c : c));

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (cat !== 'All' && p.category !== cat) return false;
      if (!s) return true;
      return (p.title + ' ' + p.codename + ' ' + p.language + ' ' + p.tags.join(' ') + ' ' + (p.oneLiner || '')).toLowerCase().includes(s);
    });
  }, [q, cat]);

  // Unfiltered browsing reads better as titled sections; searching or picking a
  // single category collapses back to one flat grid.
  const grouped = cat === 'All' && !q.trim();
  const groups = useMemo(
    () => (grouped ? CAT_ORDER.map((c) => [c, filtered.filter((p) => p.category === c).sort(byTier)]).filter(([, items]) => items.length) : []),
    [grouped, filtered],
  );

  return (
    <div className="ds-wrap" style={{ paddingTop: 48, paddingBottom: 120 }}>
      <style>{`
        ${ARMOR_CARD_CSS}
        .pa-back { display: inline-flex; align-items: center; gap: 8px; background: none; border: none; padding: 0; cursor: pointer; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #aab2bf; }
        .pa-back:hover { color: var(--c-primary); }
        .pa-head h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(36px, 4.4vw, 60px); letter-spacing: -0.025em; color: var(--c-ink); margin-top: 18px; }
        .pa-head p { font-family: var(--font-body); font-size: 16px; line-height: 1.6; color: var(--c-body); max-width: 620px; margin-top: 12px; }
        .pp-tools { display: grid; grid-template-columns: minmax(0, 360px) minmax(0, 1fr); gap: 20px 40px; align-items: center; padding: 32px 0 28px; border-bottom: 1px solid var(--c-line); margin-bottom: 48px; }
        .cat-tabs { display: flex; flex-wrap: wrap; gap: 4px 22px; }
        .cat-tab { background: none; border: none; padding: 6px 0; cursor: pointer; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-meta); border-bottom: 1px solid transparent; transition: color 0.3s, border-color 0.3s; white-space: nowrap; }
        .cat-tab:hover { color: #c6cdd8; }
        .cat-tab.active { color: var(--c-ink); border-bottom-color: var(--c-primary); }
        .pp-group { margin-bottom: 72px; }
        .pp-group-head { display: flex; align-items: baseline; gap: 14px; padding-bottom: 14px; margin-bottom: 28px; border-bottom: 1px solid var(--c-line); }
        .pp-group-head h2 { font-family: var(--font-display); font-weight: 400; font-size: 26px; letter-spacing: -0.015em; color: var(--c-ink); }
        @media (max-width: 760px) { .pp-tools { grid-template-columns: 1fr; } }
      `}</style>

      <div className="pa-head">
        <button type="button" className="pa-back" onClick={onBack}><ArrowLeft size={15} strokeWidth={1.5} /> {t('hallBack')}</button>
        <div className="ds-kicker" style={{ marginTop: 28, display: 'flex' }}>{t('projectLabel')}</div>
        <h1>{t('hallAll')} · {PROJECTS.length}</h1>
        <p>{t('hallAllSub')}</p>
      </div>

      <div className="pp-tools">
        <div className="proj-search field">
          <Search size={16} strokeWidth={1.6} style={{ color: 'var(--c-meta)', flexShrink: 0 }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === 'tr' ? 'Proje ara — isim, teknoloji, dil…' : 'Search projects — name, tech, language…'}
            aria-label={lang === 'tr' ? 'Projelerde ara' : 'Search projects'}
          />
          {(q || cat !== 'All') && <span style={s.count}>{filtered.length}</span>}
        </div>
        <div className="cat-tabs" role="tablist">
          {cats.map((c) => (
            <button key={c} className={`cat-tab${cat === c ? ' active' : ''}`} onClick={() => setCat(c)} role="tab" aria-selected={cat === c}>
              {catLabel(c)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={s.empty}>{lang === 'tr' ? 'Eşleşen proje yok.' : 'No matching projects.'}</p>
      ) : grouped ? (
        groups.map(([groupCat, items]) => (
          <section key={groupCat} className="pp-group">
            <div className="pp-group-head">
              <h2>{catLabel(groupCat)}</h2>
              <span className="ds-meta">{String(items.length).padStart(2, '0')}</span>
            </div>
            <div className="armory-grid">
              {items.map((p, i) => <ArmorCard key={p.slug} project={p} index={i} />)}
            </div>
          </section>
        ))
      ) : (
        <div className="armory-grid" key={cat}>
          {filtered.map((p, i) => <ArmorCard key={p.slug} project={p} index={i} />)}
        </div>
      )}
    </div>
  );
}

const s = {
  count: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-primary)', flexShrink: 0 },
  empty: { fontFamily: 'var(--font-body)', fontSize: 18, color: '#7b8290', padding: '40px 0' },
};
