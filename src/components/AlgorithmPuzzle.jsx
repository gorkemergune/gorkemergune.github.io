import { useState, useCallback, useMemo } from 'react';
import { useLang } from '../i18n.jsx';

const BALL_COLORS = [
  { id: 0, color: '#ef4444', label: 'A' },
  { id: 1, color: '#3b82f6', label: 'B' },
  { id: 2, color: '#22c55e', label: 'C' },
  { id: 3, color: '#f59e0b', label: 'D' },
  { id: 4, color: '#8b5cf6', label: 'E' },
  { id: 5, color: '#06b6d4', label: 'F' },
  { id: 6, color: '#ec4899', label: 'G' },
  { id: 7, color: '#0ea5e9', label: 'H' },
  { id: 8, color: '#84cc16', label: 'I' },
  { id: 9, color: '#f97316', label: 'J' },
];

function shuffle() {
  const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let i = vals.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [vals[i], vals[j]] = [vals[j], vals[i]];
  }
  return BALL_COLORS.map((b, i) => ({ ...b, value: vals[i] }));
}

export default function AlgorithmPuzzle() {
  const { t } = useLang();
  const [balls, setBalls] = useState(() => shuffle());
  const [remaining, setRemaining] = useState(() => new Set(balls.map(b => b.id)));
  const [sorted, setSorted] = useState([]);
  const [mode, setMode] = useState('claim'); // 'compare' | 'claim'
  const [selected, setSelected] = useState(null);
  const [comparisons, setComparisons] = useState(0);
  const [lives, setLives] = useState(3);
  const [compLog, setCompLog] = useState([]);
  const [message, setMessage] = useState(null);
  const [gameOver, setGameOver] = useState(null); // 'won' | 'lost' | null
  const [showExplanation, setShowExplanation] = useState(false);
  const [animId, setAnimId] = useState(null);

  const remainingBalls = useMemo(() =>
    balls.filter(b => remaining.has(b.id)),
    [balls, remaining]
  );

  const round = sorted.length + 1;

  const currentMin = useMemo(() => {
    let min = null;
    for (const b of remainingBalls) {
      if (!min || b.value < min.value) min = b;
    }
    return min;
  }, [remainingBalls]);

  const handleBallClick = useCallback((ball) => {
    if (gameOver) return;
    if (!remaining.has(ball.id)) return;

    setAnimId(ball.id);
    setTimeout(() => setAnimId(null), 300);

    if (mode === 'compare') {
      if (selected === null) {
        setSelected(ball.id);
        setMessage({ text: t('puzzleSelectSecond'), type: 'info' });
      } else if (selected === ball.id) {
        setSelected(null);
        setMessage(null);
      } else {
        const a = balls.find(b => b.id === selected);
        const b = ball;
        const aSmaller = a.value < b.value;
        setCompLog(prev => [{ a, b, aSmaller }, ...prev]);
        setComparisons(prev => prev + 1);
        setSelected(null);
        setMessage({
          text: `${a.label} ${aSmaller ? '<' : '>'} ${b.label}`,
          type: 'compare',
        });
      }
    } else {
      // Claim minimum
      if (ball.id === currentMin.id) {
        // Correct
        const newRemaining = new Set(remaining);
        newRemaining.delete(ball.id);
        setRemaining(newRemaining);
        setSorted(prev => [...prev, ball]);
        setMessage({
          text: `${t('puzzleCorrect')} ${ball.label} ${t('puzzleHadValue')} ${ball.value}`,
          type: 'correct',
        });
        setSelected(null);
        if (newRemaining.size === 0) {
          const score = Math.max(0, 100 - comparisons * 3 + lives * 15);
          setGameOver('won');
          setMessage({
            text: `${t('puzzleWon')} ${t('puzzleScore')}: ${score}`,
            type: 'won',
          });
        }
      } else {
        // Wrong
        const newLives = lives - 1;
        setLives(newLives);
        const hint = currentMin;
        setMessage({
          text: `${t('puzzleWrong')} ${hint.label} ${t('puzzleHasSmaller')}. ${t('puzzleLifeLost')}`,
          type: 'wrong',
        });
        if (newLives <= 0) {
          setGameOver('lost');
          setMessage({
            text: t('puzzleLost'),
            type: 'lost',
          });
        }
      }
    }
  }, [mode, selected, remaining, balls, currentMin, gameOver, lives, comparisons, t]);

  const reset = useCallback(() => {
    const newBalls = shuffle();
    setBalls(newBalls);
    setRemaining(new Set(newBalls.map(b => b.id)));
    setSorted([]);
    setMode('claim');
    setSelected(null);
    setComparisons(0);
    setLives(3);
    setCompLog([]);
    setMessage(null);
    setGameOver(null);
    setShowExplanation(false);
  }, []);

  return (
    <div style={p.wrap}>
      <p style={p.intro}>{t('puzzleIntro')}</p>

      {/* Stats */}
      <div style={p.stats}>
        <div style={p.statBox}>
          <span style={p.statLabel}>{t('puzzleRound')}</span>
          <span style={p.statValue}>{gameOver === 'won' ? '10/10' : `${round}/10`}</span>
        </div>
        <div style={p.statBox}>
          <span style={p.statLabel}>{t('puzzleComparisons')}</span>
          <span style={p.statValue}>{comparisons}</span>
        </div>
        <div style={p.statBox}>
          <span style={p.statLabel}>{t('puzzleLives')}</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: 12, height: 12, borderRadius: 2,
                background: i < lives ? '#ef4444' : '#e2e0da',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Mode toggle */}
      {!gameOver && (
        <div style={p.modeRow}>
          <button
            onClick={() => { setMode('compare'); setSelected(null); setMessage({ text: t('puzzleSelectTwo'), type: 'info' }); }}
            className="puzzle-btn"
            style={{ ...p.modeBtn, ...(mode === 'compare' ? p.modeBtnActive : {}) }}
          >
            {t('puzzleCompare')}
          </button>
          <button
            onClick={() => { setMode('claim'); setSelected(null); setMessage({ text: t('puzzleSelectMin'), type: 'info' }); }}
            className="puzzle-btn"
            style={{ ...p.modeBtn, ...(mode === 'claim' ? p.modeBtnActive : {}) }}
          >
            {t('puzzleClaim')}
          </button>
        </div>
      )}

      {/* Remaining balls */}
      {remainingBalls.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <span style={p.sectionLabel}>{t('puzzleRemaining')}</span>
          <div style={p.ballRow}>
            {remainingBalls.map((ball) => (
              <button
                key={ball.id}
                className="ball-btn"
                onClick={() => handleBallClick(ball)}
                disabled={!!gameOver}
                style={{
                  ...p.ball,
                  background: `radial-gradient(circle at 30% 30%, ${ball.color}aa, ${ball.color})`,
                  transform: animId === ball.id ? 'scale(0.8)' : 'scale(1)',
                  boxShadow: selected === ball.id
                    ? `0 0 0 3px #f4f3ef, 0 0 0 5px ${ball.color}, 0 6px 20px ${ball.color}40`
                    : `0 3px 12px ${ball.color}30`,
                  opacity: gameOver ? 0.5 : 1,
                  cursor: gameOver ? 'default' : 'pointer',
                }}
              >
                <span style={p.ballLabel}>{ball.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sorted balls */}
      {sorted.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <span style={p.sectionLabel}>{t('puzzleSorted')}</span>
          <div style={p.sortedRow}>
            {sorted.map((ball, i) => (
              <div key={ball.id} style={p.sortedItem}>
                <span style={p.sortedNum}>{i + 1}</span>
                <div style={{
                  ...p.sortedBall,
                  background: `radial-gradient(circle at 30% 30%, ${ball.color}aa, ${ball.color})`,
                }}>
                  <span style={p.ballLabel}>{ball.label}</span>
                </div>
                <span style={p.sortedVal}>{ball.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message */}
      {message && (
        <div style={{
          ...p.message,
          borderLeftColor:
            message.type === 'correct' || message.type === 'won' ? '#22c55e' :
            message.type === 'wrong' || message.type === 'lost' ? '#ef4444' :
            message.type === 'compare' ? '#3b82f6' : '#8a8a86',
        }}>
          <span style={{
            ...p.messageText,
            color:
              message.type === 'correct' || message.type === 'won' ? '#16a34a' :
              message.type === 'wrong' || message.type === 'lost' ? '#dc2626' :
              message.type === 'compare' ? '#2563eb' : '#4a4a48',
          }}>{message.text}</span>
        </div>
      )}

      {/* Comparison log */}
      {compLog.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <span style={p.sectionLabel}>{t('puzzleCompLog')}</span>
          <div style={p.compLogRow}>
            {compLog.map((c, i) => (
              <span key={i} style={p.compChip}>
                <span style={{ ...p.compDot, background: c.a.color }} />
                {c.a.label} {c.aSmaller ? '<' : '>'} {c.b.label}
                <span style={{ ...p.compDot, background: c.b.color }} />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={p.actions}>
        <button onClick={reset} className="puzzle-btn" style={p.actionBtn}>
          {gameOver ? t('puzzlePlayAgain') : t('puzzleReset')}
        </button>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="puzzle-btn"
          style={p.actionBtn}
        >
          {showExplanation ? t('puzzleHide') : t('puzzleReveal')}
        </button>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div style={p.explain}>
          <p style={p.explainTitle}>{t('puzzleExTitle')}</p>
          <p style={p.explainText}>{t('puzzleExP1')}</p>
          <p style={p.explainText}>{t('puzzleExP2')}</p>
          <p style={{ ...p.explainText, fontStyle: 'italic', color: '#8a8a86', marginTop: 12 }}>
            {t('puzzleExP3')}
          </p>
        </div>
      )}
    </div>
  );
}

const p = {
  wrap: { marginTop: 8 },
  intro: {
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 16, lineHeight: 1.7, color: '#4a4a48',
    maxWidth: 600, marginBottom: 40,
  },
  stats: {
    display: 'flex', gap: 40, marginBottom: 32, flexWrap: 'wrap',
  },
  statBox: {
    display: 'flex', flexDirection: 'column', gap: 6,
  },
  statLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10, letterSpacing: '0.12em', color: '#8a8a86',
  },
  statValue: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: 28, fontWeight: 400, lineHeight: 1, color: '#1a1a1a',
  },
  modeRow: {
    display: 'flex', gap: 8, marginBottom: 32,
  },
  modeBtn: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12, letterSpacing: '0.06em',
    padding: '8px 18px',
    border: '1px solid #d6d4cd', borderRadius: 4,
    background: '#fafaf6', color: '#4a4a48',
    cursor: 'pointer', transition: 'all 0.2s',
  },
  modeBtnActive: {
    background: '#1a1a1a', color: '#f4f3ef',
    borderColor: '#1a1a1a',
  },
  sectionLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10, letterSpacing: '0.12em', color: '#8a8a86',
    textTransform: 'uppercase', display: 'block', marginBottom: 12,
  },
  ballRow: {
    display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28,
  },
  ball: {
    width: 56, height: 56, borderRadius: '50%',
    border: 'none', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s',
  },
  ballLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 15, fontWeight: 600, color: '#fff',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  sortedRow: {
    display: 'flex', flexWrap: 'wrap', gap: 8,
  },
  sortedItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
  },
  sortedNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9, color: '#8a8a86', letterSpacing: '0.08em',
  },
  sortedBall: {
    width: 40, height: 40, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  sortedVal: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11, color: '#4a4a48', fontWeight: 600,
  },
  message: {
    padding: '14px 18px', borderLeft: '3px solid',
    background: '#fafaf6', marginBottom: 28,
  },
  messageText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 14, fontWeight: 500,
  },
  compLogRow: {
    display: 'flex', flexWrap: 'wrap', gap: 8,
  },
  compChip: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12, padding: '4px 10px',
    background: '#fafaf6', border: '1px solid #e2e0da',
    borderRadius: 4, color: '#4a4a48',
  },
  compDot: {
    width: 10, height: 10, borderRadius: '50%', display: 'inline-block',
  },
  actions: {
    display: 'flex', gap: 12, marginTop: 8,
  },
  actionBtn: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12, letterSpacing: '0.06em',
    padding: '10px 20px',
    border: '1px solid #d6d4cd', borderRadius: 4,
    background: '#fafaf6', color: '#4a4a48',
    cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
  },
  explain: {
    marginTop: 32, padding: 28,
    background: '#fafaf6', border: '1px solid #e2e0da', borderRadius: 4,
  },
  explainTitle: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: 20, color: '#1a1a1a', marginBottom: 16,
  },
  explainText: {
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 14, lineHeight: 1.7, color: '#4a4a48', marginBottom: 8,
  },
};
