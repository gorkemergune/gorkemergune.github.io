import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Github, X } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { getProject } from '../data/projects';
import { useSeo } from '../hooks/useSeo';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState(-1);
  const [showAllImages, setShowAllImages] = useState(false);

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
  const metricKind = t('pdMetricKind') || {};
  const roleLabels = t('pdRole') || {};
  const statusLabels = t('pdStatus') || {};

  // New schema only. Legacy `highlights`, `results` and `metric` are never read here.
  const images = project.images.map((img) => ({ ...img, caption: loc(img.caption, img.captionTr) }));
  const problem = loc(project.problem, project.problemTr);
  const built = loc(project.overview, project.overviewTr);
  const metrics = loc(project.metrics, project.metricsTr) || [];
  const useCases = loc(project.useCases, project.useCasesTr) || [];
  const flow = loc(project.flow, project.flowTr);
  const architecture = loc(project.architecture, project.architectureTr) || [];
  const decisions = loc(project.decisions, project.decisionsTr) || [];
  const contribution = loc(project.contribution, project.contributionTr) || [];
  const limitations = loc(project.limitations, project.limitationsTr) || [];
  const futureWork = loc(project.futureWork, project.futureWorkTr) || [];
  const challenges = loc(project.challenges, project.challengesTr) || [];
  const lessons = loc(project.lessons, project.lessonsTr) || [];
  const provenanceNote = loc(project.provenanceNote, project.provenanceNoteTr);

  const proof = metrics.slice(0, 3);
  const visibleImages = showAllImages ? images : images.slice(0, 6);

  let section = 0;
  const num = () => String(++section).padStart(2, '0');

  // `condition` is written as "<kind> — <detail>"; the kind renders as its own chip.
  const splitCondition = (condition) => {
    if (!condition) return { kind: null, detail: null };
    const i = condition.indexOf(' — ');
    if (i === -1) return { kind: metricKind[condition] || condition, detail: null };
    const kind = condition.slice(0, i);
    return { kind: metricKind[kind] || kind, detail: condition.slice(i + 3) };
  };

  const metaLine = [
    roleLabels[project.role] || project.role,
    project.period,
    statusLabels[project.status] || project.status,
  ].filter(Boolean).join(' · ');

  return (
    <div style={s.container}>
      <style>{`
        .pd-img-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .pd-img-grid .pd-img-full { grid-column: 1 / -1; }
        .pd-proof { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .pd-metric-row { display: grid; grid-template-columns: 190px 200px 1fr; gap: 20px; align-items: baseline; padding: 16px 8px; border-bottom: 1px solid #1a1a2e; }
        .pd-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
        .pd-list-row { transition: background 0.4s, padding-left 0.4s; }
        .pd-list-row:hover { background: #12121f; padding-left: 24px !important; }
        .pd-img-card img { transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .pd-img-card:hover img { transform: scale(1.02); }
        @media (max-width: 860px) {
          .pd-proof { grid-template-columns: 1fr; gap: 14px; }
        }
        @media (max-width: 700px) {
          .pd-img-grid { grid-template-columns: 1fr !important; }
          .pd-metric-row { grid-template-columns: 1fr !important; gap: 4px; padding: 14px 8px; }
          .pd-hero-title { font-size: 40px !important; }
        }
      `}</style>

      <Link to="/project" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('projectBack')}
      </Link>

      {/* HERO */}
      <header style={{ marginBottom: 44 }} className="reveal reveal-1">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <span style={{ ...s.markChip, borderColor: `${color}55`, color }}>{project.mark}</span>
          <span style={{ ...s.markChip, borderColor: '#1a1a2e', color: '#8a8aa0' }}>{project.codename.toUpperCase()}</span>
          <span style={{
            display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
            background: color, boxShadow: `0 0 8px ${glow}`,
          }} />
          <span style={s.metaLine}>{metaLine}</span>
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
          <a className="hero-btn" href={project.github} target="_blank" rel="noreferrer">
            <Github size={16} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
            {t('pdViewGithub')}
            <ArrowUpRight size={14} strokeWidth={1.5} style={{ color: '#8a8aa0' }} />
          </a>
        </div>
      </header>

      {/* PROOF STRIP — only when the project actually measured something */}
      {proof.length > 0 && (
        <div className="pd-proof reveal reveal-2" style={{ marginBottom: 80 }}>
          {proof.map((m) => {
            const { kind } = splitCondition(m.condition);
            return (
              <div key={m.label} style={{ ...s.proofCard, borderTopColor: color }}>
                <span style={s.proofValue}>{m.value}</span>
                <span style={s.proofLabel}>{m.label}</span>
                {kind && <span style={{ ...s.kindChip, color, borderColor: `${color}44` }}>{kind}</span>}
              </div>
            );
          })}
        </div>
      )}

      {/* 01 — THE PROBLEM */}
      <SectionLabel n={num()} label={t('pdProblem')} color={color} />
      <p style={{ ...s.lead, marginBottom: 80 }}>{problem}</p>

      {/* 02 — WHAT I BUILT */}
      <SectionLabel n={num()} label={t('pdBuilt')} color={color} />
      <p style={{ ...s.body, marginBottom: 80 }}>{built}</p>

      {/* 03 — RESULTS */}
      {metrics.length > 0 && (
        <>
          <SectionLabel n={num()} label={t('pdResults')} color={color} />
          <div style={{ marginBottom: 80 }}>
            {metrics.map((m) => {
              const { kind, detail } = splitCondition(m.condition);
              return (
                <div key={m.label} className="pd-metric-row">
                  <span style={s.metricLabel}>{m.label}</span>
                  <span style={s.metricValue}>{m.value}</span>
                  <span style={s.metricCondition}>
                    {kind && <span style={{ ...s.kindChip, color, borderColor: `${color}44`, marginRight: 10 }}>{kind}</span>}
                    {detail}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* 04 — WHERE IT CAN BE USED */}
      {useCases.length > 0 && (
        <>
          <SectionLabel n={num()} label={t('pdUseCases')} color={color} />
          <div style={{ marginBottom: 80 }}>
            {useCases.map((u, i) => (
              <div key={i} className="pd-list-row" style={s.listRow}>
                <span style={{ ...s.listMarker, color }}>&#9656;</span>
                <span style={s.listText}>{u}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 05 — HOW IT WORKS */}
      <SectionLabel n={num()} label={t('pdHowItWorks')} color={color} />
      <div style={{ marginBottom: 80 }}>
        {flow && (
          <div style={{ ...s.flowPanel, borderLeftColor: color }}>
            <div className="pd-flow">
              {flow.split('→').map((stage, i, all) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={s.flowNode}>{stage.trim()}</span>
                  {i < all.length - 1 && <span style={{ color, fontSize: 13 }}>&#8594;</span>}
                </span>
              ))}
            </div>
          </div>
        )}
        {architecture.map((para, i) => (
          <p key={i} style={{ ...s.body, marginBottom: i < architecture.length - 1 ? 20 : 0 }}>{para}</p>
        ))}
      </div>

      {/* 06 — ENGINEERING DECISIONS */}
      {decisions.length > 0 && (
        <>
          <SectionLabel n={num()} label={t('pdDecisions')} color={color} />
          <div style={{ marginBottom: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {decisions.map((d, i) => (
              <div key={i} style={{ ...s.decisionCard, borderLeftColor: color }}>
                <div style={s.decisionChoice}>{d.choice}</div>
                <div style={s.decisionRow}>
                  <span style={{ ...s.decisionKey, color }}>{t('pdWhy')}</span>
                  <span style={s.decisionVal}>{d.why}</span>
                </div>
                <div style={s.decisionRow}>
                  <span style={s.decisionKey}>{t('pdTradeoff')}</span>
                  <span style={s.decisionVal}>{d.tradeoff}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 07 — MY CONTRIBUTION */}
      <SectionLabel n={num()} label={t('pdContribution')} color={color} />
      <div style={{ marginBottom: 80 }}>
        {contribution.map((c, i) => (
          <div key={i} className="pd-list-row" style={s.listRow}>
            <span style={{ ...s.listNum, color }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={s.listText}>{c}</span>
          </div>
        ))}
        {project.provenance && provenanceNote && (
          <div style={s.provenancePanel}>
            <span style={s.provenanceLabel}>
              {t('pdProvenance')} · <span style={{ color: '#f5b301' }}>{project.provenance}</span>
            </span>
            <span style={s.provenanceText}>{provenanceNote}</span>
          </div>
        )}
      </div>

      {/* 08 — LIMITATIONS & NEXT */}
      {(limitations.length > 0 || futureWork.length > 0) && (
        <>
          <SectionLabel n={num()} label={t('pdLimitations')} color={color} />
          <div style={{ marginBottom: 80 }}>
            {limitations.map((l, i) => (
              <div key={i} className="pd-list-row" style={s.listRow}>
                <span style={{ ...s.listMarker, color: '#6a6a82' }}>&#9656;</span>
                <span style={s.listText}>{l}</span>
              </div>
            ))}
            {futureWork.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <span style={s.subLabel}>{t('pdNext')}</span>
                {futureWork.map((f, i) => (
                  <p key={i} style={{ ...s.body, marginTop: 8, marginBottom: 0 }}>{f}</p>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* 09 — FIELD NOTES */}
      {(challenges.length > 0 || lessons.length > 0) && (
        <>
          <SectionLabel n={num()} label={t('pdFieldNotes')} color={color} />
          <div style={{ marginBottom: 80 }}>
            {[...challenges, ...lessons].map((n, i) => (
              <p key={i} style={{ ...s.body, marginBottom: 16 }}>{n}</p>
            ))}
          </div>
        </>
      )}

      {/* 10 — SCREENSHOTS */}
      {images.length > 0 && (
        <>
          <SectionLabel n={num()} label={t('pdScreenshots')} color={color} />
          <div className="pd-img-grid" style={{ marginBottom: images.length > 6 ? 20 : 80 }}>
            {visibleImages.map((img, i) => (
              <figure
                key={img.src}
                className={`pd-img-card${visibleImages.length % 2 === 1 && i === 0 ? ' pd-img-full' : ''}`}
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
          {images.length > 6 && (
            <button
              className="hero-btn"
              style={{ marginBottom: 80 }}
              onClick={() => setShowAllImages((v) => !v)}
            >
              {showAllImages ? t('pdShowLess') : `${t('pdShowAll')} (${images.length})`}
            </button>
          )}
        </>
      )}

      {lightbox >= 0 && (
        <Lightbox
          images={visibleImages}
          index={lightbox}
          color={color}
          onNavigate={setLightbox}
          onClose={() => setLightbox(-1)}
        />
      )}

      {/* 11 — STACK & SOURCE */}
      <SectionLabel n={num()} label={t('pdStack')} color={color} />
      <div style={{ ...s.panel, marginBottom: 32 }}>
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
  metaLine: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4a4a60' },

  proofCard: {
    background: '#0f0f1a', border: '1px solid #1a1a2e', borderTop: '2px solid', borderRadius: 4,
    padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start',
  },
  proofValue: { fontFamily: "'Instrument Serif', serif", fontSize: 30, lineHeight: 1.1, color: '#e0e0e8' },
  proofLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8aa0' },
  kindChip: {
    display: 'inline-block', fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
    letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid', borderRadius: 999,
    padding: '2px 9px', whiteSpace: 'nowrap',
  },

  metricLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4a60' },
  metricValue: { fontFamily: "'Instrument Serif', serif", fontSize: 21, lineHeight: 1.25, color: '#e0e0e8', fontVariantNumeric: 'tabular-nums' },
  metricCondition: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 13.5, lineHeight: 1.5, color: '#8a8aa0' },

  listRow: { display: 'flex', alignItems: 'baseline', gap: 20, padding: '16px 8px', borderBottom: '1px solid #1a1a2e' },
  listNum: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', flexShrink: 0 },
  listMarker: { fontSize: 11, flexShrink: 0 },
  listText: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.55, color: '#c8c8d4' },

  flowPanel: {
    background: '#0c0c15', border: '1px solid #1a1a2e', borderLeft: '2px solid',
    borderRadius: 4, padding: '18px 22px', marginBottom: 28, overflowX: 'auto',
  },
  flowNode: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.6, color: '#c8c8d4',
    background: '#12121f', border: '1px solid #1a1a2e', borderRadius: 3, padding: '5px 10px',
    display: 'inline-block',
  },

  decisionCard: { background: '#0f0f1a', border: '1px solid #1a1a2e', borderLeft: '2px solid', borderRadius: 4, padding: '20px 24px' },
  decisionChoice: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, fontWeight: 600, color: '#e0e0e8', marginBottom: 12, lineHeight: 1.45 },
  decisionRow: { display: 'flex', gap: 14, alignItems: 'baseline', marginTop: 8, flexWrap: 'wrap' },
  decisionKey: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4a60', flexShrink: 0, minWidth: 68 },
  decisionVal: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5, lineHeight: 1.55, color: '#a8a8b8', flex: 1, minWidth: 200 },

  provenancePanel: {
    marginTop: 28, background: '#15120a', border: '1px solid rgba(245,179,1,0.27)', borderRadius: 4,
    padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 8,
  },
  provenanceLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8aa0' },
  provenanceText: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5, lineHeight: 1.6, color: '#c8c8d4' },

  subLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4a60' },
};
