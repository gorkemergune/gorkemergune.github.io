import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const SYMBOLS = ['🧠', '⚡', '🚀', '🤖', '🔬', '🎯', '💾', '🛰️'];

function shuffled() {
  const deck = [...SYMBOLS, ...SYMBOLS].map((sym, i) => ({ id: i, sym }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function MemoryPage() {
  const { t } = useLang();
  const [deck, setDeck] = useState(shuffled);
  const [flipped, setFlipped] = useState([]);   // indices currently face-up (unmatched)
  const [matched, setMatched] = useState([]);   // matched indices
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  const reset = useCallback(() => {
    setDeck(shuffled());
    setFlipped([]); setMatched([]); setMoves(0); setLock(false);
  }, []);

  const flip = (i) => {
    if (lock || flipped.includes(i) || matched.includes(i)) return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = next;
      if (deck[a].sym === deck[b].sym) {
        setTimeout(() => { setMatched((m) => [...m, a, b]); setFlipped([]); setLock(false); }, 420);
      } else {
        setTimeout(() => { setFlipped([]); setLock(false); }, 780);
      }
    }
  };

  const won = matched.length === deck.length;

  return (
    <div style={s.container}>
      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('funMemoryTitle')}</h1>
        <p style={s.desc}>{t('memorySub')}</p>
      </div>

      <div style={s.bar}>
        <span style={s.stat}>{t('memoryMoves')}: <b style={{ color: '#e0e0e8' }}>{moves}</b></span>
        <span style={s.stat}>{t('memoryPairs')}: <b style={{ color: '#00d4ff' }}>{matched.length / 2}</b> / {SYMBOLS.length}</span>
        <button onClick={reset} style={s.resetBtn} className="puzzle-btn"><RotateCcw size={13} strokeWidth={1.6} /> {t('memoryReset')}</button>
      </div>

      <div style={s.grid}>
        {deck.map((card, i) => {
          const up = flipped.includes(i) || matched.includes(i);
          const isMatched = matched.includes(i);
          return (
            <button
              key={card.id}
              onClick={() => flip(i)}
              style={{
                ...s.card,
                background: up ? (isMatched ? 'rgba(0,212,255,0.10)' : '#12121f') : '#0f0f1a',
                borderColor: isMatched ? '#00d4ff66' : up ? '#2a2a44' : '#1a1a2e',
                cursor: up || lock ? 'default' : 'pointer',
                transform: up ? 'rotateY(0deg)' : 'none',
              }}
            >
              <span style={{ opacity: up ? 1 : 0, transition: 'opacity 0.2s', fontSize: 30 }}>{up ? card.sym : ''}</span>
              {!up && <span style={s.cardBack}>?</span>}
            </button>
          );
        })}
      </div>

      {won && (
        <div style={s.win}>
          {t('memoryWon')} <b style={{ color: '#00d4ff' }}>{moves}</b> {t('memoryWonMoves')}
        </div>
      )}
    </div>
  );
}

const s = {
  container: { maxWidth: 560, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 48, cursor: 'pointer' },
  header: { marginBottom: 36 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 60, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 18 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 500 },
  bar: { display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, flexWrap: 'wrap' },
  stat: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8a8aa0' },
  resetBtn: { marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 13px', border: '1px solid #1a1a2e', borderRadius: 6, background: '#0f0f1a', color: '#c4c4d4', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, cursor: 'pointer', transition: 'background 0.3s, border-color 0.3s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 },
  card: { aspectRatio: '1', border: '1px solid', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.25s, border-color 0.25s', position: 'relative' },
  cardBack: { fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#3a3a50' },
  win: { marginTop: 28, padding: '16px 20px', border: '1px solid #00d4ff44', borderRadius: 10, background: 'rgba(0,212,255,0.06)', fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, color: '#c4c4d4', textAlign: 'center' },
};
