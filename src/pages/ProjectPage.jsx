import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import PROJECTS from '../data/projects';

export default function ProjectPage() {
  const { lang, t } = useLang();

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
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('projectBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('projectBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('projectLabel')}</h1>
        <p style={s.desc}>{t('projectSub')}</p>
      </div>

      <div className="armory-grid">
        {PROJECTS.map((p, i) => (
          <ArmorCard key={p.slug} project={p} index={i} lang={lang} />
        ))}
      </div>
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
        <img src={project.images[0].src} alt={project.title} loading="lazy" style={s.previewImg} />
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
  header: { marginBottom: 64 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 560 },
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
