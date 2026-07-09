import { Terminal, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useAlgoStats } from '../hooks/useAlgoStats';
import AnimatedCounter from './AnimatedCounter';

export default function AlgorithmJourney() {
  const { t } = useLang();
  const a = useAlgoStats();

  const platforms = [
    { key: 'leetcode', label: 'LeetCode', value: a.leetcode, color: '#ffa116' },
    { key: 'algoleague', label: 'AlgoLeague', value: a.algoleague, color: '#00d4ff' },
    { key: 'competitive', label: 'Competitive', value: a.competitive, color: '#00e5a0' },
    { key: 'neetcode', label: 'NeetCode', value: a.neetcode, color: '#7c5cff' },
  ];
  const max = Math.max(1, ...platforms.map((p) => p.value || 0));

  return (
    <section className="container" style={s.section} aria-label="Algorithm journey">
      <style>{`
        .aj-panel { display: grid; grid-template-columns: 0.7fr 1.3fr; gap: 1px; background: #1a1a2e; border: 1px solid #1a1a2e; border-radius: 14px; overflow: hidden; }
        .aj-cell { background: linear-gradient(180deg,#0f0f1a,#0b0b13); }
        .aj-bar-fill { height: 100%; border-radius: 4px; transform-origin: left; animation: aj-grow 1.1s cubic-bezier(0.2,0.8,0.2,1) both; }
        @keyframes aj-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes aj-blink { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        .aj-live { animation: aj-blink 1.6s ease-in-out infinite; }
        @media (max-width: 820px) { .aj-panel { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={s.kicker}><Terminal size={13} strokeWidth={1.8} style={{ color: '#00d4ff' }} /> {t('algoKicker')}</div>
      <p style={s.sub}>{t('algoSub')}</p>

      <div className="aj-panel" style={{ marginTop: 26 }}>
        {/* Total */}
        <div className="aj-cell" style={s.totalCell}>
          <span style={s.liveTag}><span className="aj-live" style={s.liveDot} />{t('algoLive')}</span>
          <div style={s.totalNum}><AnimatedCounter target={a.total} /></div>
          <div style={s.totalLabel}>{t('algoTotalLabel')}</div>
          <a href="https://github.com/gorkemergune/algorithms" target="_blank" rel="noopener noreferrer" className="link-hover" style={s.repoLink}>
            /algorithms <ArrowUpRight size={12} strokeWidth={1.6} />
          </a>
        </div>

        {/* Platform bars */}
        <div className="aj-cell" style={s.barsCell}>
          {platforms.map((p, i) => (
            <div key={p.key} style={{ ...s.barRow, marginBottom: i < platforms.length - 1 ? 20 : 0 }}>
              <div style={s.barHead}>
                <span style={s.barLabel}><span style={{ ...s.barDot, background: p.color, boxShadow: `0 0 6px ${p.color}` }} />{p.label}</span>
                <span style={{ ...s.barValue, color: p.color }}><AnimatedCounter target={p.value} /></span>
              </div>
              <div style={s.barTrack}>
                <div className="aj-bar-fill" style={{ width: `${((p.value || 0) / max) * 100}%`, background: `linear-gradient(90deg, ${p.color}88, ${p.color})`, boxShadow: `0 0 12px ${p.color}66`, animationDelay: `${i * 0.1}s` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '40px 48px 80px', position: 'relative', zIndex: 2 },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.16em', color: '#6a6a82' },
  sub: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 16, color: '#8a8aa0', marginTop: 12, maxWidth: 620 },
  totalCell: { position: 'relative', padding: '34px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  liveTag: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', color: '#00d4ff', marginBottom: 14 },
  liveDot: { width: 5, height: 5, borderRadius: '50%', background: '#00d4ff' },
  totalNum: { fontFamily: "'Instrument Serif', serif", fontSize: 76, lineHeight: 0.95, color: '#eef0f6', fontVariantNumeric: 'tabular-nums' },
  totalLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7a7a92', marginTop: 12 },
  repoLink: { display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00d4ff' },
  barsCell: { padding: '34px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  barRow: {},
  barHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 },
  barLabel: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: '#c4c4d4' },
  barDot: { width: 7, height: 7, borderRadius: '50%' },
  barValue: { fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 600, fontVariantNumeric: 'tabular-nums' },
  barTrack: { height: 8, background: '#14141f', borderRadius: 4, overflow: 'hidden' },
};
