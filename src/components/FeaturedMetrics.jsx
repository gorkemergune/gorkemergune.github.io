import { useLang } from '../i18n.jsx';
import PROJECTS from '../data/projects';
import { useGitHub } from '../hooks/useGitHub';
import AnimatedCounter from './AnimatedCounter';

export default function FeaturedMetrics() {
  const { t } = useLang();
  const gh = useGitHub();

  const metrics = [
    { n: PROJECTS.length, suffix: '', label: t('mProjects') },
    { n: gh.publicRepos, suffix: '', label: t('mRepos'), live: true },
    { n: gh.commits, suffix: '', label: t('mCommits'), live: true },
    { n: 2, suffix: '', label: t('mResearch') },
    { n: 2, suffix: '', label: t('mModels') },
    { n: 140, suffix: 'K+', label: t('mImages') },
    { n: 117, suffix: '', label: t('mDataset') },
    { n: 99, suffix: '%', label: t('mF1') },
  ];

  return (
    <section className="container" style={s.section} aria-label="Featured metrics">
      <style>{`
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #1a1a2e; border: 1px solid #1a1a2e; border-radius: 12px; overflow: hidden; }
        .metric-cell { background: linear-gradient(180deg, #0f0f1a, #0b0b13); padding: 30px 24px; position: relative; transition: background 0.4s; }
        .metric-cell:hover { background: linear-gradient(180deg, #12121f, #0d0d16); }
        @keyframes live-pulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.35); } }
        .live-dot { animation: live-pulse 1.8s ease-in-out infinite; }
        @media (max-width: 900px) { .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 460px) { .metric-num { font-size: 40px !important; } }
      `}</style>

      <div style={s.kicker}><span style={s.kickerDot} />{t('metricsKicker')}</div>

      <div className="metrics-grid" style={{ marginTop: 28 }}>
        {metrics.map((m, i) => (
          <div key={i} className="metric-cell">
            {m.live && (
              <span style={s.liveTag}>
                <span className="live-dot" style={s.liveDot} />{t('metricLive')}
              </span>
            )}
            <div className="metric-num" style={s.num}>
              <AnimatedCounter target={m.n} suffix={m.suffix} />
            </div>
            <div style={s.label}>{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '80px 48px', position: 'relative', zIndex: 2 },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: '#6a6a82' },
  kickerDot: { width: 7, height: 7, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' },
  num: { fontFamily: "'Instrument Serif', serif", fontSize: 52, lineHeight: 1, color: '#eef0f6', marginBottom: 10, fontVariantNumeric: 'tabular-nums' },
  label: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a7a92', lineHeight: 1.5 },
  liveTag: { position: 'absolute', top: 14, right: 14, display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.14em', color: '#00d4ff' },
  liveDot: { width: 5, height: 5, borderRadius: '50%', background: '#00d4ff', display: 'inline-block' },
};
