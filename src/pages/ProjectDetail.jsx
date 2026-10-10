import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Github, X } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { getProject, CATEGORY_TR } from '../data/projects';
import TechLogos from '../components/TechLogos';
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

  const { color } = project;
  const loc = (enVal, trVal) => (lang === 'tr' && trVal ? trVal : enVal);
  const stackLabels = t('stackLabels') || {};
  const metricKind = t('pdMetricKind') || {};
  const roleLabels = t('pdRole') || {};
  const statusLabels = t('pdStatus') || {};

  // New schema only. The legacy highlights / results / metric fields were removed
  // from projects.js on 12 Sep 2026; nothing below ever read them.
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

  const category = lang === 'tr' ? CATEGORY_TR[project.category] || project.category : project.category;

  return (
    <div className="pd">
      <style>{`
        .pd-cover-wrap { max-width: 1240px; margin: 0 auto; padding: 0 var(--ds-gutter); position: relative; z-index: 2; }
        .pd-cover { position: relative; aspect-ratio: 16 / 10; max-height: 640px; width: 100%; overflow: hidden; border: 1px solid var(--c-line); background: #08090c; }
        .pd-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pd-cover::after { content: ''; position: absolute; inset: auto 0 0 0; height: 30%; background: linear-gradient(180deg, transparent, rgba(10,12,16,0.55)); pointer-events: none; }
        .pd-body { max-width: 980px; margin: 0 auto; padding: 48px var(--ds-gutter) 120px; position: relative; z-index: 2; }
        .pd-group { margin-top: 88px; }
        .pd-group-head { display: flex; align-items: baseline; gap: 16px; padding-bottom: 16px; margin-bottom: 36px; border-bottom: 1px solid var(--c-line); }
        .pd-group-head .n { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--c-meta); }
        .pd-group-head h2 { font-family: var(--font-display); font-weight: 400; font-size: clamp(26px, 2.6vw, 34px); letter-spacing: -0.015em; color: var(--c-ink); }
        .pd-block + .pd-block { margin-top: 44px; }
        .pd-img-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .pd-img-grid .pd-img-full { grid-column: 1 / -1; }
        .pd-proof { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--c-line); border-left: 1px solid var(--c-line); }
        .pd-proof > div { border-right: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); }
        .pd-metric-row { display: grid; grid-template-columns: 190px 200px 1fr; gap: 20px; align-items: baseline; padding: 16px 8px; border-bottom: 1px solid var(--c-line); }
        .pd-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
        .pd-img-card img { transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .pd-img-card:hover img { transform: scale(1.02); }
        .pd-stack-row { display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 20px; padding: 14px 0; border-bottom: 1px solid var(--c-line); }
        .pd-tech .tech-logos img { width: 20px; height: 20px; }
        .pd-tech .tech-logos span { font-size: 12px; color: var(--c-ink); }
        @media (max-width: 860px) { .pd-proof { grid-template-columns: 1fr; } }
        @media (max-width: 700px) {
          .pd-img-grid { grid-template-columns: 1fr !important; }
          .pd-metric-row { grid-template-columns: 1fr !important; gap: 4px; padding: 14px 8px; }
          .pd-stack-row { grid-template-columns: 1fr; gap: 6px; }
          .pd-hero-title { font-size: 40px !important; }
          .pd-group { margin-top: 64px; }
        }
      `}</style>

      {/* 1 — COVER, first thing on the page */}
      <div className="pd-cover-wrap">
        <Link to="/project" className="link-hover" style={{ ...s.back, marginBottom: 24 }}>
          <ArrowLeft size={16} strokeWidth={1.5} /> {t('projectDetailBack')}
        </Link>
        <div className="pd-cover reveal reveal-1">
          <img src={project.cover} alt={`${project.title} — ${t('pdCoverAlt')}`} />
        </div>
      </div>

      <div className="pd-body">
        {/* 2–3 — MARK, CATEGORY, TITLE, SUMMARY */}
        <header className="reveal reveal-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <span className="label" style={{ color, borderColor: `${color}66` }}>{project.mark}</span>
            <span className="label">{category}</span>
            <span style={s.metaLine}>{project.codename} · {metaLine}</span>
          </div>
          <h1 className="pd-hero-title" style={s.title}>{project.title}</h1>
          <p style={s.desc}>{loc(project.subtitle, project.subtitleTr)}</p>
          <p style={{ ...s.body, marginTop: 14 }}>{loc(project.oneLiner, project.oneLinerTr)}</p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn btn-outline" href={project.github} target="_blank" rel="noreferrer">
              <Github size={15} strokeWidth={1.5} /> {t('pdViewGithub')} <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>
        </header>

        {/* 4 — KEY RESULTS, only when something was measured */}
        {proof.length > 0 && (
          <div className="pd-proof reveal reveal-3" style={{ marginTop: 48 }}>
            {proof.map((m) => {
              const { kind } = splitCondition(m.condition);
              return (
                <div key={m.label} style={s.proofCard}>
                  <span style={s.proofValue}>{m.value}</span>
                  <span style={s.proofLabel}>{m.label}</span>
                  {kind && <span className="label">{kind}</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* 5 — TECHNOLOGY */}
        <section className="pd-group">
          <GroupHead n={num()} label={t('pdStack')} />
          <div className="pd-tech" style={{ marginBottom: 24 }}><TechLogos project={project} limit={6} /></div>
          <div style={{ borderTop: '1px solid var(--c-line)' }}>
            {project.stack.map((row) => (
              <div key={row.label} className="pd-stack-row">
                <span style={s.subLabel}>{stackLabels[row.label] ?? row.label}</span>
                <span style={s.stackItems}>{row.items.join(' · ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6 — PROBLEM & SOLUTION */}
        <section className="pd-group">
          <GroupHead n={num()} label={t('pdGroupProblem')} />
          <div className="pd-block">
            <SubLabel label={t('pdProblem')} color={color} />
            <p style={s.lead}>{problem}</p>
          </div>
          <div className="pd-block">
            <SubLabel label={t('pdBuilt')} color={color} />
            <p style={s.body}>{built}</p>
          </div>
          {useCases.length > 0 && (
            <div className="pd-block">
              <SubLabel label={t('pdUseCases')} color={color} />
              {useCases.map((u, i) => (
                <div key={i} style={s.listRow}><span style={{ ...s.listMarker, color }}>&#9656;</span><span style={s.listText}>{u}</span></div>
              ))}
            </div>
          )}
        </section>

        {/* 7 — TECHNICAL IMPLEMENTATION */}
        <section className="pd-group">
          <GroupHead n={num()} label={t('pdGroupBuild')} />
          <div className="pd-block">
            <SubLabel label={t('pdHowItWorks')} color={color} />
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
          {decisions.length > 0 && (
            <div className="pd-block">
              <SubLabel label={t('pdDecisions')} color={color} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {decisions.map((d, i) => (
                  <div key={i} style={{ ...s.decisionCard, borderLeftColor: color }}>
                    <div style={s.decisionChoice}>{d.choice}</div>
                    <div style={s.decisionRow}><span style={{ ...s.decisionKey, color }}>{t('pdWhy')}</span><span style={s.decisionVal}>{d.why}</span></div>
                    <div style={s.decisionRow}><span style={s.decisionKey}>{t('pdTradeoff')}</span><span style={s.decisionVal}>{d.tradeoff}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pd-block">
            <SubLabel label={t('pdContribution')} color={color} />
            {contribution.map((c, i) => (
              <div key={i} style={s.listRow}>
                <span style={{ ...s.listNum, color }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={s.listText}>{c}</span>
              </div>
            ))}
            {project.provenance && provenanceNote && (
              <div style={s.provenancePanel}>
                <span style={s.provenanceLabel}>
                  {t('pdProvenance')} · <span style={{ color: 'var(--c-tertiary)' }}>{project.provenance}</span>
                </span>
                <span style={s.provenanceText}>{provenanceNote}</span>
              </div>
            )}
          </div>
        </section>

        {/* 8 — RESULTS & LIMITATIONS */}
        {(metrics.length > 0 || limitations.length > 0 || futureWork.length > 0 || challenges.length > 0 || lessons.length > 0) && (
          <section className="pd-group">
            <GroupHead n={num()} label={t('pdGroupResults')} />
            {metrics.length > 0 && (
              <div className="pd-block">
                <SubLabel label={t('pdResults')} color={color} />
                {metrics.map((m) => {
                  const { kind, detail } = splitCondition(m.condition);
                  return (
                    <div key={m.label} className="pd-metric-row">
                      <span style={s.metricLabel}>{m.label}</span>
                      <span style={s.metricValue}>{m.value}</span>
                      <span style={s.metricCondition}>
                        {kind && <span className="label" style={{ marginRight: 10 }}>{kind}</span>}
                        {detail}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            {(limitations.length > 0 || futureWork.length > 0) && (
              <div className="pd-block">
                <SubLabel label={t('pdLimitations')} color={color} />
                {limitations.map((l, i) => (
                  <div key={i} style={s.listRow}><span style={{ ...s.listMarker, color: '#6b7280' }}>&#9656;</span><span style={s.listText}>{l}</span></div>
                ))}
                {futureWork.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <span style={s.subLabel}>{t('pdNext')}</span>
                    {futureWork.map((f, i) => (<p key={i} style={{ ...s.body, marginTop: 8, marginBottom: 0 }}>{f}</p>))}
                  </div>
                )}
              </div>
            )}
            {(challenges.length > 0 || lessons.length > 0) && (
              <div className="pd-block">
                <SubLabel label={t('pdFieldNotes')} color={color} />
                {[...challenges, ...lessons].map((n, i) => (<p key={i} style={{ ...s.body, marginBottom: 16 }}>{n}</p>))}
              </div>
            )}
          </section>
        )}

        {/* SCREENSHOTS */}
        {images.length > 0 && (
          <section className="pd-group">
            <GroupHead n={num()} label={t('pdScreenshots')} />
            <div className="pd-img-grid" style={{ marginBottom: images.length > 6 ? 20 : 0 }}>
              {visibleImages.map((img, i) => (
                <figure
                  key={img.src}
                  className={`pd-img-card${visibleImages.length % 2 === 1 && i === 0 ? ' pd-img-full' : ''}`}
                  style={{ ...s.imgCard, cursor: 'zoom-in' }}
                  onClick={() => setLightbox(i)}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <img src={img.src} alt={img.caption} loading="lazy" style={s.img} />
                  </div>
                  <figcaption style={s.imgCaption}>
                    <span style={{ color, marginRight: 8 }}>&#9656;</span>{img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            {images.length > 6 && (
              <button className="btn btn-secondary" onClick={() => setShowAllImages((v) => !v)}>
                {showAllImages ? t('pdShowLess') : `${t('pdShowAll')} (${images.length})`}
              </button>
            )}
          </section>
        )}

        {lightbox >= 0 && (
          <Lightbox images={visibleImages} index={lightbox} color={color} onNavigate={setLightbox} onClose={() => setLightbox(-1)} />
        )}

        {/* 9 — SOURCE */}
        <section className="pd-group">
          <GroupHead n={num()} label={t('pdGroupSource')} />
          <div style={{ ...s.panel, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, padding: 28 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--c-meta)', marginBottom: 6 }}>
                {project.github.replace('https://github.com/', '')}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--c-body)' }}>{t('pdSourceNote')}</div>
            </div>
            <a className="btn btn-primary" href={project.github} target="_blank" rel="noreferrer">
              <Github size={15} strokeWidth={1.5} /> {t('pdOpenRepo')} <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>
        </section>
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
  counter: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.16em' },
  iconBtn: {
    background: '#111419', border: '1px solid #1e222b', borderRadius: 4,
    color: '#8b929e', padding: 8, display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer',
  },
  navBtn: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 1 },
  figure: {
    margin: 0, maxWidth: 'min(1100px, calc(100vw - 96px))', maxHeight: 'calc(100vh - 120px)',
    display: 'flex', flexDirection: 'column', cursor: 'default',
  },
  img: {
    display: 'block', maxWidth: '100%', maxHeight: 'calc(100vh - 170px)',
    objectFit: 'contain', borderRadius: 4, border: '1px solid #1e222b', background: '#08090c',
  },
  caption: {
    fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.06em',
    color: '#8b929e', padding: '12px 2px 0', textAlign: 'center',
  },
};

function GroupHead({ n, label }) {
  return (
    <div className="pd-group-head">
      <span className="n">{n}</span>
      <h2>{label}</h2>
    </div>
  );
}

function SubLabel({ label, color }) {
  return (
    <h3 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c6cdd8', margin: '0 0 18px' }}>
      <span style={{ width: 1, height: 12, background: color }} />{label}
    </h3>
  );
}

const s = {
  container: { maxWidth: 980, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: '0.06em', color: '#5c6370', marginBottom: 60, cursor: 'pointer' },
  title: { fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 400, lineHeight: 0.98, letterSpacing: '-0.015em', color: '#e0e0e8', marginBottom: 18 },
  desc: { fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6, color: '#8b929e', maxWidth: 620 },
  markChip: {
    display: 'inline-block', padding: '4px 12px', border: '1px solid', borderRadius: 999,
    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.16em',
  },
  langBadge: {
    display: 'inline-block', padding: '5px 14px', border: '1px solid', borderRadius: 999,
    fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.1em', fontWeight: 500,
  },
  imgCard: { margin: 0, background: '#111419', border: '1px solid #1e222b', borderRadius: 4, padding: 10 },
  img: { display: 'block', width: '100%', height: 'auto', borderRadius: 3, background: '#08090c' },
  imgCaption: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.06em', color: '#5c6370', padding: '10px 4px 2px' },
  lead: { fontFamily: "var(--font-body)", fontSize: 20, lineHeight: 1.55, color: '#c8c8d4', maxWidth: 780 },
  body: { fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.7, color: '#a8a8b8', maxWidth: 780 },
  metaLine: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4b515c' },

  proofCard: { padding: '24px 24px 22px', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' },
  stackItems: { fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.6, color: '#c8ccd4' },
  panel: { background: 'var(--c-surface)', border: '1px solid var(--c-line)' },
  proofValue: { fontFamily: "var(--font-display)", fontSize: 30, lineHeight: 1.1, color: '#e0e0e8' },
  proofLabel: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b929e' },
  kindChip: {
    display: 'inline-block', fontFamily: "var(--font-mono)", fontSize: 9,
    letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid', borderRadius: 999,
    padding: '2px 9px', whiteSpace: 'nowrap',
  },

  metricLabel: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4b515c' },
  metricValue: { fontFamily: "var(--font-display)", fontSize: 21, lineHeight: 1.25, color: '#e0e0e8', fontVariantNumeric: 'tabular-nums' },
  metricCondition: { fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.5, color: '#8b929e' },

  listRow: { display: 'flex', alignItems: 'baseline', gap: 20, padding: '16px 8px', borderBottom: '1px solid #1e222b' },
  listNum: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.1em', flexShrink: 0 },
  listMarker: { fontSize: 11, flexShrink: 0 },
  listText: { fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.55, color: '#c8c8d4' },

  flowPanel: {
    background: '#0c0c15', border: '1px solid #1e222b', borderLeft: '2px solid',
    borderRadius: 4, padding: '18px 22px', marginBottom: 28, overflowX: 'auto',
  },
  flowNode: {
    fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.6, color: '#c8c8d4',
    background: '#13161c', border: '1px solid #1e222b', borderRadius: 3, padding: '5px 10px',
    display: 'inline-block',
  },

  decisionCard: { background: '#111419', border: '1px solid #1e222b', borderLeft: '2px solid', borderRadius: 4, padding: '20px 24px' },
  decisionChoice: { fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: '#e0e0e8', marginBottom: 12, lineHeight: 1.45 },
  decisionRow: { display: 'flex', gap: 14, alignItems: 'baseline', marginTop: 8, flexWrap: 'wrap' },
  decisionKey: { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4b515c', flexShrink: 0, minWidth: 68 },
  decisionVal: { fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.55, color: '#a8a8b8', flex: 1, minWidth: 200 },

  provenancePanel: {
    marginTop: 28, background: '#15120a', border: '1px solid rgba(245,179,1,0.27)', borderRadius: 4,
    padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 8,
  },
  provenanceLabel: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b929e' },
  provenanceText: { fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6, color: '#c8c8d4' },

  subLabel: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4b515c' },
};
