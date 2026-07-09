import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';

// level: 1 = Advanced (3 bars), 2 = Proficient (2 bars), 3 = Familiar (1 bar)
const BARS = { 1: 3, 2: 2, 3: 1 };

export default function StackPage() {
  const { t } = useLang();
  const groups = t('stackGroups');
  const levels = t('stackLevels');
  useSeo({ title: t('stackLabel'), description: t('stackSub'), path: '/stack' });

  return (
    <div style={s.container}>
      <style>{`
        .stack-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .stack-tech { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 12px 0; border-bottom: 1px solid #15151f; }
        .stack-tech:last-child { border-bottom: none; }
        .stack-card { transition: border-color 0.4s, transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .stack-card:hover { transform: translateY(-3px); }
        @media (max-width: 760px) { .stack-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('stackBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('stackBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('stackLabel')}</h1>
        <p style={s.desc}>{t('stackSub')}</p>
        <div style={s.legend}>
          <span style={s.legendLabel}>{t('stackLegend')}:</span>
          {Array.isArray(levels) && levels.map((lv, i) => (
            <span key={lv} style={s.legendItem}>
              <span style={s.legendBars}>
                {[0, 1, 2].map((b) => (
                  <span key={b} style={{ ...s.legendBar, background: b < BARS[i + 1] ? '#00d4ff' : '#26263a' }} />
                ))}
              </span>
              {lv}
            </span>
          ))}
        </div>
      </div>

      <div className="stack-grid">
        {Array.isArray(groups) && groups.map((g, i) => (
          <div
            key={g.category}
            className="stack-card reveal"
            style={{ ...s.card, animationDelay: `${i * 0.06}s` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${g.accent}66`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a2e'; }}
          >
            <div style={s.catHead}>
              <span style={{ ...s.catDot, background: g.accent, boxShadow: `0 0 8px ${g.accent}` }} />
              <span style={s.catName}>{g.category}</span>
              <span style={s.catCount}>{g.items.length}</span>
            </div>
            <div>
              {g.items.map((it) => (
                <div key={it.name} className="stack-tech">
                  <span style={s.techName}>{it.name}</span>
                  <span style={s.techBars} title={levels?.[it.level - 1]}>
                    {[0, 1, 2].map((b) => (
                      <span key={b} style={{ ...s.techBar, background: b < BARS[it.level] ? g.accent : '#22222f' }} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 980, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 56 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f6', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0', maxWidth: 620 },
  legend: { display: 'flex', alignItems: 'center', gap: 20, marginTop: 28, flexWrap: 'wrap' },
  legendLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: '#6a6a82', textTransform: 'uppercase' },
  legendItem: { display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#a2a2b8' },
  legendBars: { display: 'inline-flex', gap: 2 },
  legendBar: { width: 4, height: 12, borderRadius: 1 },
  card: { padding: '24px 26px', border: '1px solid #1a1a2e', borderRadius: 12, background: 'linear-gradient(180deg,#0f0f1a,#0b0b13)' },
  catHead: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingBottom: 14, borderBottom: '1px solid #1a1a2e' },
  catDot: { width: 8, height: 8, borderRadius: '50%' },
  catName: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#e0e0ec' },
  catCount: { marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#5a5a70' },
  techName: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: '#c4c4d4' },
  techBars: { display: 'inline-flex', gap: 3, flexShrink: 0 },
  techBar: { width: 6, height: 14, borderRadius: 1 },
};
