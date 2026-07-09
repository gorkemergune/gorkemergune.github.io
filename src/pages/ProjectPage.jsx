import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Search } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import PROJECTS from '../data/projects';

const CAT_ORDER = ['Computer Vision', 'Machine Learning', 'Deep Learning', 'Large Language Models', 'Research', 'Software Engineering', 'Web', 'Mobile', 'C', 'C++', 'Java', 'Open Source', 'Utilities'];
const CAT_TR = {
  'Computer Vision': 'Bilgisayarlı Görü', 'Machine Learning': 'Makine Öğrenmesi', 'Deep Learning': 'Derin Öğrenme',
  'Large Language Models': 'Büyük Dil Modelleri', 'Research': 'Araştırma', 'Software Engineering': 'Yazılım Mühendisliği',
  'Web': 'Web', 'Mobile': 'Mobil', 'C': 'C', 'C++': 'C++', 'Java': 'Java',
  'Open Source': 'Açık Kaynak', 'Utilities': 'Araçlar',
};

export default function ProjectPage() {
  const { lang, t } = useLang();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  useSeo({ title: t('projectLabel'), description: t('projectSub'), path: '/project' });

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

  return (
    <div style={s.container}>
      <style>{`
        .armory-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 1100px) { .armory-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 680px) { .armory-grid { grid-template-columns: 1fr; } }

        .armor-card { transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s cubic-bezier(0.2,0.8,0.2,1); }
        .armor-card:hover { transform: translateY(-4px); }
        .armor-card .armor-preview img { transition: transform 0.6s cubic-bezier(0.2,0.8,0.2,1); }
        .armor-card:hover .armor-preview img { transform: scale(1.05); }
        .armor-card .armor-open { transition: background 0.3s, color 0.3s; }
        .proj-search:focus-within { border-color: #00d4ff !important; }
        .cat-tab { padding: 8px 16px; border: 1px solid #1a1a2e; border-radius: 999px; background: rgba(15,15,26,0.5); font-family: 'Instrument Sans', sans-serif; font-size: 13px; color: #9a9ab0; cursor: pointer; transition: all 0.3s cubic-bezier(0.2,0.8,0.2,1); white-space: nowrap; }
        .cat-tab:hover { color: #e0e0e8; border-color: #2a2a45; }
        .cat-tab.active { background: #00d4ff; color: #0a0a0f; border-color: #00d4ff; font-weight: 500; }
        .cat-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('projectBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('projectBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('projectLabel')}</h1>
        <p style={s.desc}>{t('projectSub')}</p>

        <div className="proj-search" style={s.search}>
          <Search size={16} strokeWidth={1.6} style={{ color: '#6a6a82', flexShrink: 0 }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === 'tr' ? 'Proje ara — isim, teknoloji, dil…' : 'Search projects — name, tech, language…'}
            style={s.searchInput}
            aria-label={lang === 'tr' ? 'Projelerde ara' : 'Search projects'}
          />
          {(q || cat !== 'All') && <span style={s.count}>{filtered.length}</span>}
        </div>

        <div className="cat-tabs" style={{ marginTop: 18 }} role="tablist">
          {cats.map((c) => (
            <button
              key={c}
              className={`cat-tab${cat === c ? ' active' : ''}`}
              onClick={() => setCat(c)}
              role="tab"
              aria-selected={cat === c}
            >
              {catLabel(c)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={s.empty}>{lang === 'tr' ? 'Eşleşen proje yok.' : 'No matching projects.'}</p>
      ) : (
        <div className="armory-grid" key={cat}>
          {filtered.map((p, i) => (
            <ArmorCard key={p.slug} project={p} index={i} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

function ArmorCard({ project, index, lang }) {
  const { t } = useLang();
  const { color, glow } = project;
  const oneLiner = lang === 'tr' && project.oneLinerTr ? project.oneLinerTr : project.oneLiner;

  return (
    <Link
      to={`/project/${project.slug}`}
      className="armor-card reveal"
      style={{
        ...s.card,
        animationDelay: `${Math.min(index * 0.06, 0.6)}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 0 24px ${glow}, inset 0 0 20px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1a1a2e';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* LED strip */}
      <div style={{
        height: 2, width: '100%',
        background: `linear-gradient(90deg, transparent 0%, ${color} 30%, ${color} 70%, transparent 100%)`,
        boxShadow: `0 0 8px ${glow}`,
      }} />

      {/* Preview */}
      <div className="armor-preview" style={s.preview}>
        <img src={project.cover || project.images[0].src} alt={project.title} loading="lazy" style={{ ...s.previewImg, objectPosition: project.cover ? 'center' : 'top' }} />
        <span style={{ ...s.markTag, color, borderColor: `${color}55`, background: 'rgba(8,8,16,0.85)' }}>
          {project.mark}
        </span>
      </div>

      {/* Body */}
      <div style={s.cardBody}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.18em', color, marginBottom: 8 }}>
          {project.codename.toUpperCase()}
        </div>
        <h3 style={s.cardTitle}>{project.title}</h3>
        <p style={s.cardDesc}>{oneLiner}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          <span style={{ ...s.cardLang, borderColor: color, color, background: `${color}14` }}>
            {project.language}
          </span>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        <span
          className="armor-open"
          style={{ ...s.openBtn, borderColor: `${color}44`, color }}
        >
          {t('projectOpen')} <ArrowUpRight size={12} strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}

const s = {
  container: { maxWidth: 1400, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 48 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0', maxWidth: 560 },
  search: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 28, maxWidth: 440, padding: '11px 16px', border: '1px solid #1a1a2e', borderRadius: 8, background: 'rgba(15,15,26,0.6)', transition: 'border-color 0.3s' },
  searchInput: { flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#e6e6f0', fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5 },
  count: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00d4ff', flexShrink: 0 },
  empty: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 20, color: '#7a7a92', padding: '40px 0' },
  card: {
    display: 'flex', flexDirection: 'column',
    background: 'linear-gradient(180deg, #0f0f1a 0%, #080810 100%)',
    border: '1px solid #1a1a2e', borderRadius: 4,
    overflow: 'hidden', cursor: 'pointer', textDecoration: 'none',
  },
  preview: {
    position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden',
    background: '#080810', borderBottom: '1px solid #1a1a2e',
  },
  previewImg: { display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' },
  markTag: {
    position: 'absolute', top: 10, left: 10,
    padding: '3px 9px', border: '1px solid', borderRadius: 999,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.16em',
    backdropFilter: 'blur(4px)',
  },
  cardBody: { display: 'flex', flexDirection: 'column', flex: 1, padding: '18px 18px 20px' },
  cardTitle: {
    fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400,
    lineHeight: 1.1, color: '#e0e0e8', marginBottom: 10,
  },
  cardDesc: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 13.5, lineHeight: 1.55,
    color: '#8a8aa0', marginBottom: 16, flex: 1,
  },
  cardLang: {
    display: 'inline-block', padding: '4px 10px', border: '1px solid', borderRadius: 999,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.08em', fontWeight: 500,
  },
  openBtn: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    padding: '9px 0', border: '1px solid', borderRadius: 3,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
};
