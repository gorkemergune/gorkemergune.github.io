import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import { useLang } from '../i18n.jsx';

// States: idle -> waiting (red, don't click) -> go (green, click!) -> result
export default function ReactionPage() {
  const { t } = useLang();
  const [state, setState] = useState('idle');
  const [ms, setMs] = useState(null);
  const [best, setBest] = useState(null);
  const startRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const arm = useCallback(() => {
    setState('waiting');
    setMs(null);
    const delay = 1200 + Math.random() * 2600;
    timerRef.current = setTimeout(() => {
      startRef.current = performance.now();
      setState('go');
    }, delay);
  }, []);

  const onClick = useCallback(() => {
    if (state === 'idle' || state === 'result') { arm(); return; }
    if (state === 'waiting') {
      clearTimeout(timerRef.current);
      setState('tooearly');
      return;
    }
    if (state === 'go') {
      const took = Math.round(performance.now() - startRef.current);
      setMs(took);
      setBest((b) => (b == null ? took : Math.min(b, took)));
      setState('result');
      return;
    }
    if (state === 'tooearly') { arm(); }
  }, [state, arm]);

  const cfg = {
    idle: { bg: '#0f0f1a', border: '#1a1a2e', title: t('reactionIdle'), sub: t('reactionIdleSub') },
    waiting: { bg: '#2a0e14', border: '#ff4d6d55', title: t('reactionWait'), sub: t('reactionWaitSub') },
    go: { bg: '#0b2a1c', border: '#00e5a0', title: t('reactionGo'), sub: '' },
    result: { bg: '#0f0f1a', border: '#00d4ff55', title: `${ms} ms`, sub: t('reactionAgain') },
    tooearly: { bg: '#2a0e14', border: '#ff4d6d', title: t('reactionEarly'), sub: t('reactionEarlySub') },
  }[state];

  return (
    <div style={s.container}>
      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('funReactionTitle')}</h1>
        <p style={s.desc}>{t('reactionSub')}</p>
      </div>

      <button
        onClick={onClick}
        style={{ ...s.pad, background: cfg.bg, borderColor: cfg.border, boxShadow: state === 'go' ? '0 0 60px rgba(0,229,160,0.35)' : 'none' }}
      >
        <Zap size={30} strokeWidth={1.4} style={{ color: state === 'go' ? '#00e5a0' : '#5a5a70', marginBottom: 14 }} />
        <span style={s.padTitle}>{cfg.title}</span>
        {cfg.sub && <span style={s.padSub}>{cfg.sub}</span>}
      </button>

      <div style={s.stats}>
        <div style={s.stat}><span style={s.statVal}>{ms == null ? '—' : `${ms}`}</span><span style={s.statLabel}>{t('reactionLast')}</span></div>
        <div style={s.stat}><span style={{ ...s.statVal, color: '#00e5a0' }}>{best == null ? '—' : `${best}`}</span><span style={s.statLabel}>{t('reactionBest')}</span></div>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 640, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 48, cursor: 'pointer' },
  header: { marginBottom: 40 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 60, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 18 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 520 },
  pad: { width: '100%', minHeight: 280, border: '1px solid', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s, box-shadow 0.3s', textAlign: 'center', padding: 24 },
  padTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 34, color: '#eef0f6', lineHeight: 1.1 },
  padSub: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: '#9a9ab0', marginTop: 10 },
  stats: { display: 'flex', gap: 40, marginTop: 32, justifyContent: 'center' },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
  statVal: { fontFamily: "'JetBrains Mono', monospace", fontSize: 28, color: '#e0e0e8', fontVariantNumeric: 'tabular-nums' },
  statLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a5a70' },
};
