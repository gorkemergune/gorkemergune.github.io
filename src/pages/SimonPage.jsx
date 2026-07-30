import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const PADS = [
  { id: 0, base: '#0e5c4a', lit: '#2ee6b6' },
  { id: 1, base: '#5c2a12', lit: '#ff9f43' },
  { id: 2, base: '#123a5c', lit: '#4db8ff' },
  { id: 3, base: '#5c1230', lit: '#ff5c8a' },
];

export default function SimonPage() {
  const { t } = useLang();
  const [seq, setSeq] = useState([]);
  const [active, setActive] = useState(null);       // pad currently lit
  const [phase, setPhase] = useState('idle');       // idle | showing | input | over
  const [best, setBest] = useState(0);
  const inputIdx = useRef(0);
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const playSeq = useCallback((s) => {
    setPhase('showing');
    clearTimers();
    const step = Math.max(320, 620 - s.length * 20);
    s.forEach((pad, i) => {
      timers.current.push(setTimeout(() => setActive(pad), i * step + 120));
      timers.current.push(setTimeout(() => setActive(null), i * step + step * 0.6 + 120));
    });
    timers.current.push(setTimeout(() => { setPhase('input'); inputIdx.current = 0; }, s.length * step + 200));
  }, []);

  const next = useCallback((cur) => {
    const s = [...cur, Math.floor(Math.random() * 4)];
    setSeq(s);
    playSeq(s);
  }, [playSeq]);

  const startGame = () => { setSeq([]); setPhase('idle'); next([]); };

  const tap = (id) => {
    if (phase !== 'input') return;
    setActive(id);
    timers.current.push(setTimeout(() => setActive(null), 180));
    if (seq[inputIdx.current] === id) {
      inputIdx.current += 1;
      if (inputIdx.current === seq.length) {
        setBest((b) => Math.max(b, seq.length));
        setPhase('showing');
        timers.current.push(setTimeout(() => next(seq), 700));
      }
    } else {
      setBest((b) => Math.max(b, seq.length - 1));
      setPhase('over');
    }
  };

  const statusText = {
    idle: t('simonIdle'),
    showing: t('simonWatch'),
    input: t('simonRepeat'),
    over: t('simonOver'),
  }[phase];

  return (
    <div style={s.container}>
      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('funSimonTitle')}</h1>
        <p style={s.desc}>{t('simonSub')}</p>
      </div>

      <div style={s.statsRow}>
        <div style={s.stat}><span style={s.statVal}>{phase === 'over' || phase === 'idle' ? 0 : seq.length}</span><span style={s.statLabel}>{t('simonLevel')}</span></div>
        <div style={s.stat}><span style={{ ...s.statVal, color: '#2ee6b6' }}>{best}</span><span style={s.statLabel}>{t('simonBest')}</span></div>
      </div>

      <div style={{ ...s.status, color: phase === 'over' ? '#ff5c8a' : phase === 'input' ? '#2ee6b6' : '#8a8aa0' }}>{statusText}</div>

      <div style={s.padGrid}>
        {PADS.map((p) => (
          <button
            key={p.id}
            onClick={() => tap(p.id)}
            disabled={phase !== 'input'}
            style={{
              ...s.pad,
              background: active === p.id ? p.lit : p.base,
              boxShadow: active === p.id ? `0 0 40px ${p.lit}` : 'none',
              cursor: phase === 'input' ? 'pointer' : 'default',
              opacity: active === p.id ? 1 : 0.9,
            }}
            aria-label={`pad ${p.id + 1}`}
          />
        ))}
      </div>

      {(phase === 'idle' || phase === 'over') && (
        <button onClick={startGame} style={s.startBtn} className="puzzle-btn">
          <Play size={15} strokeWidth={1.6} /> {phase === 'over' ? t('simonAgain') : t('simonStart')}
        </button>
      )}
    </div>
  );
}

const s = {
  container: { maxWidth: 480, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 48, cursor: 'pointer' },
  header: { marginBottom: 28 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 56, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 18 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 440 },
  statsRow: { display: 'flex', gap: 36, marginBottom: 14 },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  statVal: { fontFamily: "'JetBrains Mono', monospace", fontSize: 26, color: '#e0e0e8', fontVariantNumeric: 'tabular-nums' },
  statLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5a70' },
  status: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 20, marginBottom: 22, minHeight: 28 },
  padGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 },
  pad: { aspectRatio: '1', border: 'none', borderRadius: 16, transition: 'background 0.12s, box-shadow 0.12s, opacity 0.12s' },
  startBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', border: '1px solid #1a1a2e', borderRadius: 6, background: '#0f0f1a', color: '#e0e0e8', fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, cursor: 'pointer', transition: 'background 0.3s, border-color 0.3s' },
};
