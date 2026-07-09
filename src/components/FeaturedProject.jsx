import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { getProject } from '../data/projects';

const FEATURED_SLUG = 'yolo-custom-detector';

export default function FeaturedProject() {
  const { lang, t } = useLang();
  const p = getProject(FEATURED_SLUG);
  if (!p) return null;
  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);
  const results = loc(p.results, p.resultsTr).slice(0, 3);

  return (
    <section className="container" style={s.section} aria-label="Featured project">
      <style>{`
        .fp-card { display: grid; grid-template-columns: 1.1fr 1fr; gap: 0; border: 1px solid #1a1a2e; border-radius: 14px; overflow: hidden; background: linear-gradient(180deg,#0f0f1a,#0b0b13); transition: border-color 0.4s, box-shadow 0.4s; }
        .fp-card:hover { border-color: ${p.color}66; box-shadow: 0 0 40px ${p.glow}; }
        .fp-media { position: relative; overflow: hidden; background: #080810; min-height: 260px; }
        .fp-media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        .fp-card:hover .fp-media img { transform: scale(1.04); }
        @media (max-width: 820px) { .fp-card { grid-template-columns: 1fr !important; } .fp-media { min-height: 200px; } }
      `}</style>

      <div style={s.kicker}><span style={{ ...s.kickerDot, background: p.color, boxShadow: `0 0 8px ${p.glow}` }} />{t('featuredKicker')}</div>

      <div className="fp-card" style={{ marginTop: 24 }}>
        <div className="fp-media">
          <img src={p.cover || p.images[0].src} alt={p.title} loading="lazy" />
        </div>
        <div style={s.body}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ ...s.markChip, color: p.color, borderColor: `${p.color}55` }}>{p.mark}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em', color: '#8a8aa0' }}>{p.codename.toUpperCase()}</span>
          </div>
          <h3 style={s.title}>{p.title}</h3>
          <p style={s.desc}>{loc(p.oneLiner, p.oneLinerTr)}</p>

          <div style={s.results}>
            {results.map((r) => (
              <div key={r.label} style={s.result}>
                <span style={{ ...s.resultVal, color: p.color }}>{r.value}</span>
                <span style={s.resultLabel}>{r.label}</span>
              </div>
            ))}
          </div>

          <div style={s.ctaRow}>
            <Link to={`/project/${p.slug}/case-study`} className="hero-btn" style={{ borderColor: `${p.color}66` }}>
              <FileText size={15} strokeWidth={1.5} /> {t('featuredCta')}
            </Link>
            <Link to={`/project/${p.slug}`} className="hero-btn">
              {t('projectOpen')} <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '40px 48px 80px', position: 'relative', zIndex: 2 },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: '#6a6a82' },
  kickerDot: { width: 7, height: 7, borderRadius: '50%' },
  body: { padding: '34px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  markChip: { display: 'inline-block', padding: '3px 11px', border: '1px solid', borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em' },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 40, fontWeight: 400, lineHeight: 1.05, color: '#eef0f6', marginBottom: 14 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, lineHeight: 1.65, color: '#a8a8be', marginBottom: 26 },
  results: { display: 'flex', gap: 28, marginBottom: 30, flexWrap: 'wrap' },
  result: { display: 'flex', flexDirection: 'column', gap: 5 },
  resultVal: { fontFamily: "'Instrument Serif', serif", fontSize: 22, lineHeight: 1.1 },
  resultLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a7a92' },
  ctaRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
};
