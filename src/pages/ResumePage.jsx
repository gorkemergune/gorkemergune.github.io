import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, Github, Linkedin, Mail } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import PROJECTS from '../data/projects';

const FEATURED = ['yolo-custom-detector', 'email-phishing-detection', 'face-detection-pipeline', 'turkish-english-nmt', 'gorkem-os'];

export default function ResumePage() {
  const { lang, t } = useLang();
  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);
  const exp = t('expItems');
  const stack = t('stackGroups');
  const research = t('researchItems');
  const projects = FEATURED.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <div style={s.container}>
      <style>{`
        @media print {
          @page { margin: 14mm; }
          body { background: #fff !important; }
          body * { visibility: hidden !important; }
          .resume-sheet, .resume-sheet * { visibility: visible !important; }
          .resume-sheet { position: absolute; left: 0; top: 0; width: 100%; background: #fff !important; color: #111 !important; box-shadow: none !important; border: none !important; padding: 0 !important; }
          .resume-sheet h1, .resume-sheet h2, .resume-sheet h3, .resume-sheet strong { color: #000 !important; }
          .resume-sheet p, .resume-sheet li, .resume-sheet span { color: #222 !important; }
          .resume-sec-label { color: #000 !important; border-color: #999 !important; }
          .no-print { display: none !important; }
          .r-chip { border-color: #bbb !important; color: #333 !important; background: #fff !important; }
        }
      `}</style>

      <div className="no-print" style={s.toolbar}>
        <Link to="/" className="link-hover" style={s.back}>
          <ArrowLeft size={16} strokeWidth={1.5} /> {t('resumeBack')}
        </Link>
        <button className="hero-btn hero-btn-primary" onClick={() => window.print()} style={{ cursor: 'pointer' }}>
          <Printer size={15} strokeWidth={1.5} /> {t('resumePrint')}
        </button>
      </div>

      <div className="resume-sheet" style={s.sheet}>
        {/* Header */}
        <header style={s.rHeader}>
          <h1 style={s.name}>{t('resumeTitle')}</h1>
          <div style={s.roleLine}>{t('resumeRole')}</div>
          <div style={s.contacts}>
            <a href="mailto:gorkemergune2@gmail.com" style={s.contact}><Mail size={13} strokeWidth={1.5} /> gorkemergune2@gmail.com</a>
            <a href="https://github.com/gorkemergune" style={s.contact}><Github size={13} strokeWidth={1.5} /> github.com/gorkemergune</a>
            <a href="https://www.linkedin.com/in/gorkemergune/" style={s.contact}><Linkedin size={13} strokeWidth={1.5} /> linkedin.com/in/gorkemergune</a>
          </div>
          <p style={s.summary}>{t('resumeSummary')}</p>
        </header>

        {/* Education */}
        <Section label={t('resumeSecEducation')}>
          <div style={s.row}>
            <strong style={s.rowTitle}>{t('resumeEduSchool')}</strong>
            <span style={s.rowMeta}>{t('resumeEduDetail')}</span>
          </div>
        </Section>

        {/* Experience */}
        <Section label={t('resumeSecExperience')}>
          {Array.isArray(exp) && exp.map((it, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={s.row}>
                <strong style={s.rowTitle}>{it.org} — <span style={{ fontWeight: 400 }}>{it.role}</span></strong>
                <span style={s.rowMeta}>{it.period}</span>
              </div>
              <ul style={s.ul}>
                {it.points.slice(0, 3).map((p, j) => <li key={j} style={s.li}>{p}</li>)}
              </ul>
            </div>
          ))}
        </Section>

        {/* Selected Projects */}
        <Section label={t('resumeSecProjects')}>
          {projects.map((p) => (
            <div key={p.slug} style={{ marginBottom: 11 }}>
              <div style={s.row}>
                <strong style={s.rowTitle}>{p.title}</strong>
                <span style={s.rowMeta}>{p.tags.slice(0, 3).join(' · ')}</span>
              </div>
              <p style={s.projLine}>{loc(p.oneLiner, p.oneLinerTr)}</p>
            </div>
          ))}
        </Section>

        {/* Research */}
        <Section label={t('resumeSecResearch')}>
          <ul style={s.ul}>
            {Array.isArray(research) && research.map((r, i) => <li key={i} style={s.li}>{r.title} — <em>{r.field}</em></li>)}
          </ul>
        </Section>

        {/* Skills */}
        <Section label={t('resumeSecSkills')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {Array.isArray(stack) && stack.map((g) => (
              <div key={g.category} style={s.skillRow}>
                <span style={s.skillCat}>{g.category}</span>
                <span style={s.skillItems}>{g.items.map((it) => it.name).join(' · ')}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <section style={{ marginBottom: 26 }}>
      <h2 className="resume-sec-label" style={s.secLabel}>{label}</h2>
      {children}
    </section>
  );
}

const s = {
  container: { maxWidth: 820, margin: '0 auto', padding: '40px 48px 120px', position: 'relative', zIndex: 2 },
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', cursor: 'pointer' },
  sheet: { background: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: 12, padding: '48px 52px' },
  rHeader: { borderBottom: '1px solid #26263a', paddingBottom: 22, marginBottom: 26 },
  name: { fontFamily: "'Instrument Serif', serif", fontSize: 42, fontWeight: 400, color: '#eef0f6', lineHeight: 1 },
  roleLine: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.1em', color: '#00d4ff', marginTop: 10 },
  contacts: { display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 16 },
  contact: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#a2a2b8', textDecoration: 'none' },
  summary: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5, lineHeight: 1.6, color: '#b4b4c6', marginTop: 18 },
  secLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00d4ff', borderBottom: '1px solid #26263a', paddingBottom: 8, marginBottom: 16 },
  row: { display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'baseline', flexWrap: 'wrap' },
  rowTitle: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: '#e6e6f0', fontWeight: 600 },
  rowMeta: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8a8aa0' },
  ul: { margin: '8px 0 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 5 },
  li: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 13.5, lineHeight: 1.55, color: '#a8a8be' },
  projLine: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 13.5, lineHeight: 1.5, color: '#9a9ab0', marginTop: 3 },
  skillRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  skillCat: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#c0c0d4', minWidth: 130, fontWeight: 500 },
  skillItems: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 13.5, color: '#9a9ab0', flex: 1 },
};
