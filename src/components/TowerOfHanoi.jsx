import { useState, useCallback } from 'react';
import { useLang } from '../i18n.jsx';

const DISK_COLORS = [
  '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c',
  '#3498db', '#9b59b6', '#e84393', '#fd79a8', '#6c5ce7',
];

export default function TowerOfHanoi() {
  const { t } = useLang();
  const [diskCount, setDiskCount] = useState(3);
  const [phase, setPhase] = useState('select'); // select | playing | won | lost
  const [pegs, setPegs] = useState([[], [], []]);
  const [moves, setMoves] = useState(0);
  const [maxMoves, setMaxMoves] = useState(0);
  const [selectedPeg, setSelectedPeg] = useState(null);
  const [message, setMessage] = useState({ text: '', color: '' });
  const [showEx, setShowEx] = useState(false);

  const startGame = useCallback(() => {
    const disks = Array.from({ length: diskCount }, (_, i) => diskCount - i);
    setPegs([disks, [], []]);
    setMoves(0);
    setMaxMoves(Math.pow(2, diskCount) - 1);
    setSelectedPeg(null);
    setMessage({ text: t('hanoiSelectSource'), color: '#6b6a66' });
    setPhase('playing');
  }, [diskCount, t]);

  const resetGame = useCallback(() => {
    setPhase('select');
    setPegs([[], [], []]);
    setMoves(0);
    setSelectedPeg(null);
    setMessage({ text: '', color: '' });
    setShowEx(false);
  }, []);

  const handlePegClick = useCallback((pegIndex) => {
    if (phase !== 'playing') return;

    if (selectedPeg === null) {
      if (pegs[pegIndex].length === 0) {
        setMessage({ text: t('hanoiEmptyPeg'), color: '#e74c3c' });
        return;
      }
      setSelectedPeg(pegIndex);
      setMessage({ text: t('hanoiSelectTarget'), color: '#6b6a66' });
    } else {
      if (pegIndex === selectedPeg) {
        setSelectedPeg(null);
        setMessage({ text: t('hanoiSelectSource'), color: '#6b6a66' });
        return;
      }

      const sourcePeg = pegs[selectedPeg];
      const targetPeg = pegs[pegIndex];
      const disk = sourcePeg[sourcePeg.length - 1];

      if (targetPeg.length > 0 && targetPeg[targetPeg.length - 1] < disk) {
        setMessage({ text: t('hanoiInvalidMove'), color: '#e74c3c' });
        setSelectedPeg(null);
        return;
      }

      const newPegs = pegs.map(p => [...p]);
      newPegs[selectedPeg] = sourcePeg.slice(0, -1);
      newPegs[pegIndex] = [...targetPeg, disk];
      const newMoves = moves + 1;

      setPegs(newPegs);
      setMoves(newMoves);
      setSelectedPeg(null);

      if (newPegs[2].length === diskCount) {
        setPhase('won');
        setMessage({ text: t('hanoiWon'), color: '#16a34a' });
        return;
      }

      if (newMoves >= maxMoves) {
        setPhase('lost');
        setMessage({ text: t('hanoiLost'), color: '#e74c3c' });
        return;
      }

      setMessage({ text: t('hanoiSelectSource'), color: '#6b6a66' });
    }
  }, [phase, selectedPeg, pegs, moves, maxMoves, diskCount, t]);

  const pegMaxHeight = Math.max(diskCount, 3);

  if (phase === 'select') {
    return (
      <div>
        <p style={s.intro}>{t('hanoiSelectDisks')}</p>
        <div style={s.selectRow}>
          {Array.from({ length: 8 }, (_, i) => i + 3).map(n => (
            <button
              key={n}
              onClick={() => setDiskCount(n)}
              className="puzzle-btn"
              style={{
                ...s.selectBtn,
                background: diskCount === n ? '#1a1a1a' : 'transparent',
                color: diskCount === n ? '#f4f3ef' : '#4a4a48',
                borderColor: diskCount === n ? '#1a1a1a' : '#d6d4cd',
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <div style={s.selectInfo}>
          <span style={s.selectInfoLabel}>{t('hanoiDisks')}: {diskCount}</span>
          <span style={s.selectInfoLabel}>{t('hanoiMaxMoves')}: {Math.pow(2, diskCount) - 1}</span>
        </div>
        <button onClick={startGame} className="puzzle-btn" style={s.startBtn}>
          {t('hanoiStart')}
        </button>
      </div>
    );
  }

  const isFinished = phase === 'won' || phase === 'lost';

  return (
    <div>
      {/* Stats bar */}
      <div style={s.statsBar}>
        <div style={s.stat}>
          <span style={s.statLabel}>{t('hanoiDisks')}</span>
          <span style={s.statValue}>{diskCount}</span>
        </div>
        <div style={s.stat}>
          <span style={s.statLabel}>{t('hanoiMoves')}</span>
          <span style={{ ...s.statValue, color: moves >= maxMoves ? '#e74c3c' : '#1a1a1a' }}>{moves}</span>
        </div>
        <div style={s.stat}>
          <span style={s.statLabel}>{t('hanoiMaxMoves')}</span>
          <span style={s.statValue}>{maxMoves}</span>
        </div>
      </div>

      {/* Message */}
      <div style={{ ...s.message, color: message.color }}>{message.text}</div>

      {/* Game board */}
      <div style={s.board}>
        {pegs.map((peg, pegIdx) => (
          <div
            key={pegIdx}
            onClick={() => handlePegClick(pegIdx)}
            style={{
              ...s.pegArea,
              cursor: isFinished ? 'default' : 'pointer',
              background: selectedPeg === pegIdx ? '#ecebe6' : 'transparent',
              borderColor: selectedPeg === pegIdx ? '#c9c7c0' : '#e2e0da',
            }}
          >
            <span style={s.pegLabel}>{t('hanoiPeg')} {pegIdx + 1}</span>
            <div style={{ ...s.pegVisual, height: pegMaxHeight * 32 + 20 }}>
              {/* Rod */}
              <div style={s.rod} />
              {/* Base */}
              <div style={s.base} />
              {/* Disks */}
              {peg.map((disk, diskIdx) => {
                const widthPercent = 30 + (disk / diskCount) * 65;
                return (
                  <div
                    key={diskIdx}
                    style={{
                      ...s.disk,
                      width: `${widthPercent}%`,
                      background: DISK_COLORS[(disk - 1) % DISK_COLORS.length],
                      bottom: diskIdx * 32,
                    }}
                  >
                    <span style={s.diskLabel}>{disk}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* End state */}
      {isFinished && (
        <div style={s.endCard}>
          <h3 style={{ ...s.endTitle, color: phase === 'won' ? '#16a34a' : '#e74c3c' }}>
            {phase === 'won' ? t('hanoiWon') : t('hanoiLost')}
          </h3>
          <p style={s.endDesc}>{phase === 'won' ? t('hanoiWonDesc') : t('hanoiLostDesc')}</p>
          <div style={s.endStats}>
            <span style={s.endStatItem}>{t('hanoiMovesUsed')}: {moves}</span>
            <span style={s.endStatItem}>{t('hanoiOptimal')}: {Math.pow(2, diskCount) - 1}</span>
          </div>
          <button onClick={resetGame} className="puzzle-btn" style={s.startBtn}>
            {t('hanoiPlayAgain')}
          </button>
        </div>
      )}

      {/* Actions */}
      {!isFinished && (
        <div style={s.actions}>
          <button onClick={resetGame} className="puzzle-btn" style={s.actionBtn}>
            {t('hanoiNewGame')}
          </button>
        </div>
      )}

      {/* Explanation */}
      <div style={s.exSection}>
        <button onClick={() => setShowEx(v => !v)} className="puzzle-btn" style={s.actionBtn}>
          {showEx ? t('hanoiHide') : t('hanoiReveal')}
        </button>
        {showEx && (
          <div style={s.exCard}>
            <h4 style={s.exTitle}>{t('hanoiExTitle')}</h4>
            <p style={s.exP}>{t('hanoiExP1')}</p>
            <p style={s.exP}>{t('hanoiExP2')}</p>
            <p style={s.exP}>{t('hanoiExP3')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  intro: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, color: '#4a4a48', marginBottom: 28 },
  selectRow: { display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 },
  selectBtn: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 14, width: 44, height: 44,
    border: '1px solid #d6d4cd', borderRadius: 4, cursor: 'pointer', transition: 'all 0.2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  selectInfo: {
    display: 'flex', gap: 24, marginBottom: 28,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#8a8a86',
  },
  selectInfoLabel: {},
  startBtn: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em',
    padding: '10px 28px', border: '1px solid #1a1a1a', borderRadius: 4,
    background: '#1a1a1a', color: '#f4f3ef', cursor: 'pointer', transition: 'all 0.2s',
  },
  statsBar: {
    display: 'flex', gap: 32, padding: '16px 0', marginBottom: 8,
    borderBottom: '1px solid #e2e0da',
  },
  stat: { display: 'flex', flexDirection: 'column', gap: 4 },
  statLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: '#8a8a86' },
  statValue: { fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 500, color: '#1a1a1a' },
  message: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, padding: '12px 0', minHeight: 40,
    transition: 'color 0.2s',
  },
  board: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32,
  },
  pegArea: {
    border: '1px solid #e2e0da', borderRadius: 4, padding: '16px 12px 12px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    transition: 'background 0.2s, border-color 0.2s',
  },
  pegLabel: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em',
    color: '#8a8a86', marginBottom: 12,
  },
  pegVisual: { position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' },
  rod: {
    position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
    width: 4, height: '100%', background: '#d6d4cd', borderRadius: 2,
  },
  base: {
    position: 'absolute', bottom: 0, left: '10%', right: '10%',
    height: 4, background: '#c9c7c0', borderRadius: 2,
  },
  disk: {
    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
    height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.15s ease-out',
  },
  diskLabel: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
    color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  endCard: {
    padding: 32, background: '#fafaf6', border: '1px solid #e2e0da', borderRadius: 4,
    textAlign: 'center', marginBottom: 32,
  },
  endTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 32, fontWeight: 400, marginBottom: 12 },
  endDesc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: '#4a4a48', marginBottom: 24 },
  endStats: {
    display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 24,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#6b6a66', letterSpacing: '0.06em',
  },
  endStatItem: {},
  actions: { display: 'flex', gap: 12, marginBottom: 32 },
  actionBtn: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em',
    padding: '8px 20px', border: '1px solid #d6d4cd', borderRadius: 4,
    background: 'transparent', color: '#6b6a66', cursor: 'pointer', transition: 'all 0.2s',
  },
  exSection: { marginTop: 20 },
  exCard: {
    marginTop: 16, padding: 28, background: '#fafaf6', border: '1px solid #e2e0da', borderRadius: 4,
  },
  exTitle: {
    fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400, color: '#1a1a1a', marginBottom: 16,
  },
  exP: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#4a4a48', marginBottom: 10 },
};
