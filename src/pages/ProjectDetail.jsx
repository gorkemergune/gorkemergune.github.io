import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Github, X, FileText } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { getProject } from '../data/projects';
import { getCaseStudy } from '../data/caseStudies';
import { useSeo } from '../hooks/useSeo';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState(-1);

  const seoDesc = project ? (lang === 'tr' && project.oneLinerTr ? project.oneLinerTr : project.oneLiner) : undefined;
  useSeo({
    title: project?.title,
    description: seoDesc,
    image: project ? `/og/${slug}.png` : undefined,
    type: 'article',
    jsonLd: project ? {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.title,
      description: seoDesc,
      codeRepository: project.github,
      programmingLanguage: project.language,
      keywords: project.tags.join(', '),
      author: { '@type': 'Person', name: 'Görkem Ergüne', url: 'https://github.com/gorkemergune' },
    } : undefined,
  });

  if (!project) {
    return (
      <div style={s.container}>
        <Link to="/project" className="link-hover" style={s.back}>
          <ArrowLeft size={16} strokeWidth={1.5} /> {t('projectDetailBack')}
        </Link>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <span className="chip">404</span>
          <h1 className="section-title" style={{ ...s.title, marginTop: 20 }}>{t('pdNotFoundTitle')}</h1>
          <p style={s.desc}>{t('pdNotFoundDesc')}</p>
        </div>
      </div>
    );
  }

  const { color, glow } = project;
  const loc = (enVal, trVal) => (lang === 'tr' && trVal ? trVal : enVal);
  const stackLabels = t('stackLabels') || {};
  const images = project.images.map((img) => ({ ...img, caption: loc(img.caption, img.captionTr) }));
  const overview = loc(project.overview, project.overviewTr);
  const highlights = loc(project.highlights, project.highlightsTr);
  const architecture = loc(project.architecture, project.architectureTr);
  const results = loc(project.results, project.resultsTr);
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
            {t('sysOnline')}
          </span>
        </div>

        <h1 className="section-title pd-hero-title" style={s.title}>{project.title}</h1>
        <p style={s.desc}>{loc(project.subtitle, project.subtitleTr)}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28, alignItems: 'center' }}>
          <span style={{ ...s.langBadge, borderColor: color, color, background: `${color}14` }}>
            {project.language}
          </span>
          {project.tags.map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {getCaseStudy(slug) && (
            <Link className="hero-btn hero-btn-primary" to={`/project/${slug}/case-study`} style={{ borderColor: color }}>
              <FileText size={16} strokeWidth={1.5} />
              {t('csRead')}
            </Link>
          )}
          <a className="hero-btn" href={project.github} target="_blank" rel="noreferrer">
            <Github size={16} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
            {t('pdViewGithub')}
            <ArrowUpRight size={14} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
          </a>
        </div>
      </header>

      {/* IMAGES */}
      <SectionLabel n={num()} label={t('pdVisualFeed')} color={color} />
      <div className="pd-img-grid reveal reveal-2" style={{ marginBottom: 88 }}>
        {images.map((img, i) => (
          <figure
            key={img.src}
            className={`pd-img-card${images.length % 2 === 1 && i === 0 ? ' pd-img-full' : ''}`}
            style={{ ...s.imgCard, cursor: 'zoom-in' }}
            onClick={() => setLightbox(i)}
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

      {lightbox >= 0 && (
        <Lightbox
          images={images}
          index={lightbox}
          color={color}
          onNavigate={setLightbox}
          onClose={() => setLightbox(-1)}
        />
      )}

      {/* OVERVIEW */}
      <SectionLabel n={num()} label={t('pdOverview')} color={color} />
      <p style={{ ...s.lead, marginBottom: 88 }}>{overview}</p>

      {/* HIGHLIGHTS */}
      <SectionLabel n={num()} label={t('pdHighlights')} color={color} />
      <div style={{ marginBottom: 88 }}>
        {highlights.map((h, i) => (
          <div key={i} className="pd-highlight-row" style={s.highlightRow}>
            <span style={{ ...s.highlightNum, color }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={s.highlightText}>{h}</span>
          </div>
        ))}
      </div>

      {/* TECHNICAL STACK */}
      <SectionLabel n={num()} label={t('pdStack')} color={color} />
      <div style={{ ...s.panel, marginBottom: 88 }}>
        {project.stack.map((row) => (
          <div key={row.label} style={s.stackRow}>
            <span style={s.stackLabel}>{stackLabels[row.label] ?? row.label}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
              {row.items.map((item) => (
                <span key={item} className="chip" style={{ textTransform: 'none', letterSpacing: '0.02em' }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ARCHITECTURE */}
      <SectionLabel n={num()} label={t('pdArchitecture')} color={color} />
      <div style={{ marginBottom: 88 }}>
        {architecture.map((p, i) => (
          <p key={i} style={{ ...s.body, marginBottom: i < architecture.length - 1 ? 20 : 0 }}>{p}</p>
        ))}
      </div>

      {/* RESULTS */}
      <SectionLabel n={num()} label={t('pdResults')} color={color} />
      <div className="pd-results-grid" style={{ marginBottom: 88 }}>
        {results.map((r) => (
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
      <SectionLabel n={num()} label={t('pdSource')} color={color} />
      <div style={{ ...s.panel, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, padding: 32 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#5a5a70', marginBottom: 6 }}>
            {project.github.replace('https://github.com/', '')}
          </div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18, color: '#8a8aa0' }}>
            {t('pdSourceNote')}
          </div>
        </div>
        <a className="hero-btn" href={project.github} target="_blank" rel="noreferrer">
          <Github size={16} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
          {t('pdOpenRepo')}
          <ArrowUpRight size={14} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
        </a>
      </div>
    </div>
  );
}

function Lightbox({ images, index, color, onNavigate, onClose }) {
  const count = images.length;
  const img = images[index];

  const prev = useCallback(() => onNavigate((index - 1 + count) % count), [index, count, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % count), [index, count, onNavigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [prev, next, onClose]);

  return (
    <div style={lb.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={img.caption}>
      <div style={lb.topBar}>
        <span style={{ ...lb.counter, color }}>
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
        <button className="link-hover" style={lb.iconBtn} onClick={onClose} aria-label="Close">
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {count > 1 && (
        <button
          className="link-hover"
          style={{ ...lb.iconBtn, ...lb.navBtn, left: 12 }}
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous image"
        >
          <ChevronLeft size={26} strokeWidth={1.5} />
        </button>
      )}

      <figure style={lb.figure} onClick={(e) => e.stopPropagation()}>
        <img src={img.src} alt={img.caption} style={lb.img} />
        <figcaption style={lb.caption}>
          <span style={{ color, marginRight: 8 }}>&#9656;</span>{img.caption}
        </figcaption>
      </figure>

      {count > 1 && (
        <button
          className="link-hover"
          style={{ ...lb.iconBtn, ...lb.navBtn, right: 12 }}
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next image"
        >
          <ChevronRight size={26} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}

const lb = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(6,6,12,0.94)',
    backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'zoom-out',
  },
  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0, display: 'flex',
    justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px',
  },
  counter: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.16em' },
  iconBtn: {
    background: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: 4,
    color: '#8a8aa0', padding: 8, display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer',
  },
  navBtn: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 1 },
  figure: {
    margin: 0, maxWidth: 'min(1100px, calc(100vw - 96px))', maxHeight: 'calc(100vh - 120px)',
    display: 'flex', flexDirection: 'column', cursor: 'default',
  },
  img: {
    display: 'block', maxWidth: '100%', maxHeight: 'calc(100vh - 170px)',
    objectFit: 'contain', borderRadius: 4, border: '1px solid #1a1a2e', background: '#080810',
  },
  caption: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.06em',
    color: '#8a8aa0', padding: '12px 2px 0', textAlign: 'center',
  },
};

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
