import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, X, Circle } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(b) {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return b.every((x) => x) ? 'draw' : null;
}

// Minimax — 'O' (AI) maximizes, 'X' (human) minimizes. Unbeatable.
function minimax(b, isAI) {
  const w = winner(b);
  if (w === 'O') return { score: 1 };
  if (w === 'X') return { score: -1 };
  if (w === 'draw') return { score: 0 };

  let best = { score: isAI ? -Infinity : Infinity, move: -1 };
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    b[i] = isAI ? 'O' : 'X';
    const { score } = minimax(b, !isAI);
    b[i] = null;
    if (isAI ? score > best.score : score < best.score) best = { score, move: i };
  }
  return best;
}

export default function TicTacToePage() {
  const { t } = useLang();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [tally, setTally] = useState({ w: 0, l: 0, d: 0 });
  const result = winner(board);

  const finish = useCallback((b) => {
    const w = winner(b);
    if (w === 'X') setTally((s) => ({ ...s, w: s.w + 1 }));
    else if (w === 'O') setTally((s) => ({ ...s, l: s.l + 1 }));
    else if (w === 'draw') setTally((s) => ({ ...s, d: s.d + 1 }));
  }, []);

  const play = (i) => {
    if (board[i] || result) return;
    const b = board.slice();
    b[i] = 'X';
    if (winner(b)) { setBoard(b); finish(b); return; }
    const { move } = minimax(b, true);
    if (move >= 0) b[move] = 'O';
    setBoard(b);
    if (winner(b)) finish(b);
  };

  const reset = () => setBoard(Array(9).fill(null));

  const msg = result === 'X' ? t('tttWin') : result === 'O' ? t('tttLose') : result === 'draw' ? t('tttDraw') : t('tttYourTurn');
  const msgColor = result === 'X' ? '#00e5a0' : result === 'O' ? '#ff4d6d' : result === 'draw' ? '#ffd166' : '#8a8aa0';

  return (
    <div style={s.container}>
      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('funTttTitle')}</h1>
        <p style={s.desc}>{t('tttSub')}</p>
      </div>

      <div style={s.scoreRow}>
        <div style={s.score}><span style={{ ...s.scoreVal, color: '#00e5a0' }}>{tally.w}</span><span style={s.scoreLabel}>{t('tttW')}</span></div>
        <div style={s.score}><span style={{ ...s.scoreVal, color: '#ffd166' }}>{tally.d}</span><span style={s.scoreLabel}>{t('tttD')}</span></div>
        <div style={s.score}><span style={{ ...s.scoreVal, color: '#ff4d6d' }}>{tally.l}</span><span style={s.scoreLabel}>{t('tttL')}</span></div>
      </div>

      <div style={{ ...s.status, color: msgColor }}>{msg}</div>

      <div style={s.grid}>
        {board.map((cell, i) => (
          <button key={i} onClick={() => play(i)} style={{ ...s.cell, cursor: cell || result ? 'default' : 'pointer' }} className="puzzle-btn" aria-label={`cell ${i + 1}`}>
            {cell === 'X' && <X size={44} strokeWidth={2} style={{ color: '#00d4ff' }} />}
            {cell === 'O' && <Circle size={38} strokeWidth={2} style={{ color: '#ff6b35' }} />}
          </button>
        ))}
      </div>

      <button onClick={reset} style={s.resetBtn} className="puzzle-btn"><RotateCcw size={14} strokeWidth={1.6} /> {t('tttNewGame')}</button>
    </div>
  );
}

const s = {
  container: { maxWidth: 520, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 48, cursor: 'pointer' },
  header: { marginBottom: 32 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 56, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 18 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 480 },
  scoreRow: { display: 'flex', gap: 28, marginBottom: 20 },
  score: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  scoreVal: { fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontVariantNumeric: 'tabular-nums' },
  scoreLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5a70' },
  status: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 22, marginBottom: 20, minHeight: 30 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 },
  cell: { aspectRatio: '1', border: '1px solid #1a1a2e', borderRadius: 12, background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s, border-color 0.3s' },
  resetBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', border: '1px solid #1a1a2e', borderRadius: 6, background: '#0f0f1a', color: '#e0e0e8', fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, cursor: 'pointer', transition: 'background 0.3s, border-color 0.3s' },
};
