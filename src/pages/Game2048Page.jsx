import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const N = 4;
const empty = () => Array.from({ length: N }, () => Array(N).fill(0));

function addRandom(g) {
  const cells = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!g[r][c]) cells.push([r, c]);
  if (!cells.length) return g;
  const [r, c] = cells[Math.floor(Math.random() * cells.length)];
  g[r][c] = Math.random() < 0.9 ? 2 : 4;
  return g;
}

function start() {
  return addRandom(addRandom(empty()));
}

// Slide + merge a single row to the left; returns [newRow, gained].
function slide(row) {
  const xs = row.filter((v) => v);
  let gained = 0;
  for (let i = 0; i < xs.length - 1; i++) {
    if (xs[i] === xs[i + 1]) { xs[i] *= 2; gained += xs[i]; xs.splice(i + 1, 1); }
  }
  while (xs.length < N) xs.push(0);
  return [xs, gained];
}

const rotateCW = (g) => g[0].map((_, c) => g.map((row) => row[c]).reverse());
const rotateCCW = (g) => g[0].map((_, c) => g.map((row) => row[N - 1 - c]));

function move(grid, dir) {
  let g = grid.map((r) => r.slice());
  const rot = { left: 0, up: 1, right: 2, down: 3 }[dir];
  for (let i = 0; i < rot; i++) g = rotateCW(g);
  let gained = 0;
  g = g.map((row) => { const [nr, ga] = slide(row); gained += ga; return nr; });
  for (let i = 0; i < (4 - rot) % 4; i++) g = rotateCW(g);
  return [g, gained];
}

const same = (a, b) => a.every((row, r) => row.every((v, c) => v === b[r][c]));
const full = (g) => g.every((row) => row.every((v) => v));
function canMove(g) {
  if (!full(g)) return true;
  for (const d of ['left', 'up', 'right', 'down']) { const [ng] = move(g, d); if (!same(g, ng)) return true; }
  return false;
}

const COLORS = {
  0: { bg: '#0f0f1a', fg: 'transparent' },
  2: { bg: '#16233a', fg: '#9fd0ff' },
  4: { bg: '#1b2f4d', fg: '#bfe0ff' },
  8: { bg: '#243b6b', fg: '#dcecff' },
  16: { bg: '#2b4d3a', fg: '#b9f5d4' },
  32: { bg: '#356b47', fg: '#d6ffe8' },
  64: { bg: '#4a5c1f', fg: '#eaffb0' },
  128: { bg: '#6b5a1f', fg: '#ffe9a8' },
  256: { bg: '#7a4a1f', fg: '#ffd6a8' },
  512: { bg: '#7a2f3a', fg: '#ffc2cf' },
  1024: { bg: '#5c1f6b', fg: '#f0c2ff' },
  2048: { bg: '#00d4ff', fg: '#0a0a0f' },
};

export default function Game2048Page() {
  const { t } = useLang();
  const [grid, setGrid] = useState(start);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);
  const touch = useRef(null);

  const reset = useCallback(() => { setGrid(start()); setScore(0); setOver(false); setWon(false); }, []);

  const apply = useCallback((dir) => {
    setGrid((g) => {
      if (over) return g;
      const [ng, gained] = move(g, dir);
      if (same(g, ng)) return g;
      addRandom(ng);
      setScore((s) => { const ns = s + gained; setBest((b) => Math.max(b, ns)); return ns; });
      if (ng.some((row) => row.includes(2048))) setWon(true);
      if (!canMove(ng)) setOver(true);
      return ng;
    });
  }, [over]);

  useEffect(() => {
    const onKey = (e) => {
      const dir = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' }[e.key];
      if (dir) { e.preventDefault(); apply(dir); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [apply]);

  const onTouchStart = (e) => { const tp = e.touches[0]; touch.current = { x: tp.clientX, y: tp.clientY }; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const tp = e.changedTouches[0];
    const dx = tp.clientX - touch.current.x, dy = tp.clientY - touch.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    apply(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
    touch.current = null;
  };

  return (
    <div style={s.container}>
      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('funGame2048Title')}</h1>
        <p style={s.desc}>{t('g2048Sub')}</p>
      </div>

      <div style={s.bar}>
        <div style={s.score}><span style={s.scoreLabel}>{t('g2048Score')}</span><span style={s.scoreVal}>{score}</span></div>
        <div style={s.score}><span style={s.scoreLabel}>{t('g2048Best')}</span><span style={{ ...s.scoreVal, color: '#00d4ff' }}>{best}</span></div>
        <button onClick={reset} style={s.resetBtn} className="puzzle-btn"><RotateCcw size={13} strokeWidth={1.6} /> {t('g2048New')}</button>
      </div>

      <div style={s.boardWrap} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div style={s.board}>
          {grid.flatMap((row, r) => row.map((v, c) => {
            const col = COLORS[v] || { bg: '#00d4ff', fg: '#0a0a0f' };
            return (
              <div key={`${r}-${c}`} style={{ ...s.tile, background: col.bg, color: col.fg, fontSize: v >= 1024 ? 22 : v >= 128 ? 26 : 30 }}>
                {v || ''}
              </div>
            );
          }))}
        </div>
        {(over || won) && (
          <div style={s.overlay}>
            <span style={s.overlayTitle}>{won ? t('g2048Won') : t('g2048Over')}</span>
            <button onClick={reset} style={s.overlayBtn} className="puzzle-btn">{t('g2048New')}</button>
          </div>
        )}
      </div>

      <p style={s.hint}>{t('g2048Hint')}</p>
    </div>
  );
}

const s = {
  container: { maxWidth: 480, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 48, cursor: 'pointer' },
  header: { marginBottom: 28 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 56, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 18 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 440 },
  bar: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 },
  score: { display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 16px', border: '1px solid #1a1a2e', borderRadius: 8, background: '#0f0f1a', minWidth: 78 },
  scoreLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5a70' },
  scoreVal: { fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: '#e0e0e8', fontVariantNumeric: 'tabular-nums' },
  resetBtn: { marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', border: '1px solid #1a1a2e', borderRadius: 6, background: '#0f0f1a', color: '#c4c4d4', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, cursor: 'pointer', transition: 'background 0.3s, border-color 0.3s' },
  boardWrap: { position: 'relative' },
  board: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, padding: 10, background: '#0b0b13', border: '1px solid #1a1a2e', borderRadius: 12, touchAction: 'none' },
  tile: { aspectRatio: '1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontVariantNumeric: 'tabular-nums', transition: 'background 0.15s' },
  overlay: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'rgba(10,10,15,0.82)', borderRadius: 12, backdropFilter: 'blur(2px)' },
  overlayTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 34, color: '#eef0f6' },
  overlayBtn: { padding: '10px 22px', border: '1px solid #00d4ff66', borderRadius: 6, background: 'rgba(0,212,255,0.1)', color: '#e0e0e8', fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, cursor: 'pointer' },
  hint: { marginTop: 18, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#5a5a70', textAlign: 'center' },
};
