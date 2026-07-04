import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { getProject } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useLang();
  const project = getProject(slug);

  if (!project) {
    return (
      <div style={s.container}>
        <Link to="/project" className="link-hover" style={s.back}>
          <ArrowLeft size={16} strokeWidth={1.5} /> {t('projectDetailBack')}
        </Link>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <span className="chip">404</span>
          <h1 className="section-title" style={{ ...s.title, marginTop: 20 }}>Armor not found</h1>
          <p style={s.desc}>This armor is not in the vault. Return to the Hall of Armor.</p>
        </div>
      </div>
    );
  }

  const { color, glow } = project;
  let section = 0;
  const num = () => String(++section).padStart(2, '0');

  return (
    <div style={s.container}>
      <style>{`
        .pd-img-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .pd-img-grid .pd-img-full { grid-column: 1 / -1; }
        .pd-results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .pd-highlight-row { transition: background 0.4s, padding-left 0.4s; }
        .pd-highlight-row:hover { background: #12121f; padding-left: 24px !important; }
        .pd-img-card img { transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .pd-img-card:hover img { transform: scale(1.02); }
        @media (max-width: 700px) {
          .pd-img-grid { grid-template-columns: 1fr !important; }
          .pd-results-grid { grid-template-columns: 1fr !important; }
          .pd-hero-title { font-size: 44px !important; }
        }
      `}</style>

      <Link to="/project" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('projectBack')}
      </Link>

      {/* HERO */}
      <header style={{ marginBottom: 72 }} className="reveal reveal-1">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <span style={{ ...s.markChip, borderColor: `${color}55`, color }}>{project.mark}</span>
          <span style={{ ...s.markChip, borderColor: '#1a1a2e', color: '#8a8aa0' }}>{project.codename.toUpperCase()}</span>
          <span style={{
            display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
            background: color, boxShadow: `0 0 8px ${glow}`,
          }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', color: '#4a4a60' }}>
            SYSTEM ONLINE
          </span>
        </div>

        <h1 className="section-title pd-hero-title" style={s.title}>{project.title}</h1>
        <p style={s.desc}>{project.subtitle}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28, alignItems: 'center' }}>
          <span style={{ ...s.langBadge, borderColor: color, color, background: `${color}14` }}>
            {project.language}
          </span>
          {project.tags.map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <a className="hero-btn" href={project.github} target="_blank" rel="noreferrer">
            <Github size={16} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
            View on GitHub
            <ArrowUpRight size={14} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
          </a>
        </div>
      </header>

      {/* IMAGES */}
      <SectionLabel n={num()} label="Visual Feed" color={color} />
      <div className="pd-img-grid reveal reveal-2" style={{ marginBottom: 88 }}>
        {project.images.map((img, i) => (
          <figure
            key={img.src}
            className={`pd-img-card${project.images.length % 2 === 1 && i === 0 ? ' pd-img-full' : ''}`}
            style={s.imgCard}
          >
            <div style={{ overflow: 'hidden', borderRadius: 3 }}>
              <img src={img.src} alt={img.caption} loading="lazy" style={s.img} />
            </div>
            <figcaption style={s.imgCaption}>
              <span style={{ color, marginRight: 8 }}>&#9656;</span>{img.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* OVERVIEW */}
      <SectionLabel n={num()} label="Overview" color={color} />
      <p style={{ ...s.lead, marginBottom: 88 }}>{project.overview}</p>

      {/* HIGHLIGHTS */}
      <SectionLabel n={num()} label="Project Highlights" color={color} />
      <div style={{ marginBottom: 88 }}>
        {project.highlights.map((h, i) => (
          <div key={i} className="pd-highlight-row" style={s.highlightRow}>
            <span style={{ ...s.highlightNum, color }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={s.highlightText}>{h}</span>
          </div>
        ))}
      </div>

      {/* TECHNICAL STACK */}
      <SectionLabel n={num()} label="Technical Stack" color={color} />
      <div style={{ ...s.panel, marginBottom: 88 }}>
        {project.stack.map((row) => (
          <div key={row.label} style={s.stackRow}>
            <span style={s.stackLabel}>{row.label}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
              {row.items.map((item) => (
                <span key={item} className="chip" style={{ textTransform: 'none', letterSpacing: '0.02em' }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ARCHITECTURE */}
      <SectionLabel n={num()} label="Architecture" color={color} />
      <div style={{ marginBottom: 88 }}>
        {project.architecture.map((p, i) => (
          <p key={i} style={{ ...s.body, marginBottom: i < project.architecture.length - 1 ? 20 : 0 }}>{p}</p>
        ))}
      </div>

      {/* RESULTS */}
      <SectionLabel n={num()} label="Results" color={color} />
      <div className="pd-results-grid" style={{ marginBottom: 88 }}>
        {project.results.map((r) => (
          <div key={r.label} style={s.resultCard}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4a60' }}>
              {r.label}
            </span>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, lineHeight: 1.25, color: '#e0e0e8' }}>
              {r.value}
            </span>
          </div>
        ))}
      </div>

      {/* GITHUB */}
      <SectionLabel n={num()} label="Source" color={color} />
      <div style={{ ...s.panel, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, padding: 32 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#5a5a70', marginBottom: 6 }}>
            gorkemergune/{project.slug}
          </div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18, color: '#8a8aa0' }}>
            Full source, README, and build instructions.
          </div>
        </div>
        <a className="hero-btn" href={project.github} target="_blank" rel="noreferrer">
          <Github size={16} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
          Open Repository
          <ArrowUpRight size={14} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
        </a>
      </div>
    </div>
  );
}

function SectionLabel({ n, label, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
      <span className="n-large" style={{ fontSize: 11 }}>&sect; {n}</span>
      <h2 style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c0c0d0', margin: 0,
      }}>{label}</h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}44, transparent)` }} />
    </div>
  );
}

const s = {
  container: { maxWidth: 980, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 60, cursor: 'pointer' },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 64, fontWeight: 400, lineHeight: 0.98, letterSpacing: '-0.015em', color: '#e0e0e8', marginBottom: 18 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 620 },
  markChip: {
    display: 'inline-block', padding: '4px 12px', border: '1px solid', borderRadius: 999,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em',
  },
  langBadge: {
    display: 'inline-block', padding: '5px 14px', border: '1px solid', borderRadius: 999,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', fontWeight: 500,
  },
  imgCard: { margin: 0, background: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: 4, padding: 10 },
  img: { display: 'block', width: '100%', height: 'auto', borderRadius: 3, background: '#080810' },
  imgCaption: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.06em', color: '#5a5a70', padding: '10px 4px 2px' },
  lead: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 20, lineHeight: 1.55, color: '#c8c8d4', maxWidth: 780 },
  body: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15.5, lineHeight: 1.7, color: '#a8a8b8', maxWidth: 780 },
  highlightRow: {
    display: 'flex', alignItems: 'baseline', gap: 20,
    padding: '16px 8px', borderBottom: '1px solid #1a1a2e',
  },
  highlightNum: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', flexShrink: 0 },
  highlightText: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.55, color: '#c8c8d4' },
  panel: { background: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: 4, padding: '8px 24px' },
  stackRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    gap: 24, padding: '16px 0', borderBottom: '1px solid #1a1a2e', flexWrap: 'wrap',
  },
  stackLabel: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: '#4a4a60', flexShrink: 0,
  },
  resultCard: {
    padding: 24, background: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: 4,
    display: 'flex', flexDirection: 'column', gap: 12, minHeight: 110, justifyContent: 'space-between',
  },
};
