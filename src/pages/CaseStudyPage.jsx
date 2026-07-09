import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Github, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import { getProject } from '../data/projects';
import { getCaseStudy } from '../data/caseStudies';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const project = getProject(slug);
  const cs = getCaseStudy(slug);
  const data = cs ? (lang === 'tr' ? cs.tr : cs.en) : null;

  useSeo({
    title: project ? `${project.title} — ${t('csBadge')}` : undefined,
    description: data ? data.problem[0] : undefined,
    image: project ? `/og/${slug}.png` : undefined,
    type: 'article',
    path: `/project/${slug}/case-study`,
    jsonLd: project && data ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${project.title} — Case Study`,
      about: data.problem[0],
      author: { '@type': 'Person', name: 'Görkem Ergüne', url: 'https://github.com/gorkemergune' },
    } : undefined,
  });

  if (!project || !data) {
    return (
      <div style={s.container}>
        <Link to="/project" className="link-hover" style={s.back}><ArrowLeft size={16} strokeWidth={1.5} /> {t('projectDetailBack')}</Link>
        <p style={{ ...s.para, marginTop: 40 }}>{t('csNone')}</p>
      </div>
    );
  }

  const { color, glow } = project;
  const sections = [
    { key: 'problem', label: t('csProblem'), num: '01' },
    { key: 'solution', label: t('csSolution'), num: '02' },
    { key: 'architecture', label: t('csArchitecture'), num: '03' },
    { key: 'challenges', label: t('csChallenges'), num: '04' },
    { key: 'results', label: t('csResults'), num: '05' },
    { key: 'lessons', label: t('csLessons'), num: '06' },
  ];

  return (
    <div style={s.container}>
      <Link to={`/project/${slug}`} className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {project.title}
      </Link>

      <header style={{ marginBottom: 64 }} className="reveal reveal-1">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
          <span style={{ ...s.chip, borderColor: `${color}55`, color }}>{t('csBadge')}</span>
          <span style={{ ...s.chip, borderColor: '#1a1a2e', color: '#8a8aa0' }}>{project.mark} · {project.codename.toUpperCase()}</span>
        </div>
        <h1 style={s.title}>{project.title}</h1>
        <p style={s.subtitle}>{lang === 'tr' && project.subtitleTr ? project.subtitleTr : project.subtitle}</p>
        <div style={{ marginTop: 26 }}>
          <a className="hero-btn" href={project.github} target="_blank" rel="noreferrer">
            <Github size={16} strokeWidth={1.5} /> {t('pdViewGithub')} <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
        </div>
      </header>

      <div style={s.timeline}>
        {sections.map((sec, i) => (
          <section key={sec.key} className="reveal" style={{ ...s.block, animationDelay: `${0.1 + i * 0.05}s` }}>
            <div style={s.blockHead}>
              <span style={{ ...s.blockNum, color }}>{sec.num}</span>
              <h2 style={s.blockLabel}>{sec.label}</h2>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}44, transparent)` }} />
            </div>
            <div style={s.blockBody}>
              {data[sec.key].map((p, j) => (
                sec.key === 'results' || sec.key === 'lessons' ? (
                  <div key={j} style={s.bulletRow}>
                    <span style={{ ...s.bulletDot, background: color, boxShadow: `0 0 8px ${glow}` }} />
                    <span style={s.bulletText}>{p}</span>
                  </div>
                ) : (
                  <p key={j} style={s.para}>{p}</p>
                )
              ))}
            </div>
          </section>
        ))}
      </div>

      <div style={s.footerCta}>
        <Link to={`/project/${slug}`} className="hero-btn">{t('pdVisualFeed')} · {project.title} <ArrowUpRight size={13} strokeWidth={1.5} /></Link>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 780, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', marginBottom: 56, cursor: 'pointer' },
  chip: { display: 'inline-block', padding: '4px 12px', border: '1px solid', borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em' },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 60, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.015em', color: '#eef0f6', marginBottom: 18 },
  subtitle: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 21, lineHeight: 1.5, color: '#9a9ab0', maxWidth: 620 },
  timeline: { display: 'flex', flexDirection: 'column', gap: 52 },
  block: {},
  blockHead: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 },
  blockNum: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.1em' },
  blockLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d0d0dc', margin: 0 },
  blockBody: { display: 'flex', flexDirection: 'column', gap: 16 },
  para: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.72, color: '#c0c0ce' },
  bulletRow: { display: 'flex', alignItems: 'flex-start', gap: 14 },
  bulletDot: { width: 7, height: 7, borderRadius: '50%', marginTop: 9, flexShrink: 0 },
  bulletText: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 16.5, lineHeight: 1.65, color: '#c0c0ce' },
  footerCta: { marginTop: 64, paddingTop: 40, borderTop: '1px solid #1a1a2e' },
};
