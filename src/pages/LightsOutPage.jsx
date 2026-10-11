import { useCallback, useRef, useState } from 'react';
import { RotateCcw, Shuffle } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS } from '../components/fun/FunFrame';

// Lights Out — a logic puzzle. Pressing a light toggles it and its four
// neighbours; the goal is a dark board. Every puzzle is built by pressing
// random cells on a solved board, so it is always solvable. The grid is one
// tab stop (roving tabindex): arrows move, Enter/Space presses.
const N = 5;
const ACC = '#ffd166';
const C = {
  en: { sub: 'Each press flips a light and its four neighbours. Switch every light off in as few moves as you can.', moves: 'Moves', lit: 'Lit', best: 'Best', win: 'All dark! Solved in', winU: 'moves.', reset: 'Restart this board', next: 'New puzzle', grid: 'Lights Out board', on: 'on', off: 'off', cell: 'Light' },
  tr: { sub: 'Her dokunuş bir ışığı ve dört komşusunu çevirir. Tüm ışıkları olabildiğince az hamlede söndür.', moves: 'Hamle', lit: 'Yanan', best: 'En iyi', win: 'Hepsi söndü! Çözüm:', winU: 'hamle.', reset: 'Bu tahtayı baştan başlat', next: 'Yeni bulmaca', grid: 'Işıkları Söndür tahtası', on: 'açık', off: 'kapalı', cell: 'Işık' },
};

const press = (b, i) => {
  const next = b.slice(); const r = Math.floor(i / N); const col = i % N;
  [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
    const rr = r + dr; const cc = col + dc;
    if (rr >= 0 && rr < N && cc >= 0 && cc < N) next[rr * N + cc] = !next[rr * N + cc];
  });
  return next;
};
const makePuzzle = () => {
  let b = Array(N * N).fill(false);
  const k = 6 + Math.floor(Math.random() * 5);
  for (let j = 0; j < k; j += 1) b = press(b, Math.floor(Math.random() * N * N));
  return b.some(Boolean) ? b : press(b, 12);
};

export default function LightsOutPage() {
  const { lang, t } = useLang();
  const c = C[lang] || C.en;
  const [start, setStart] = useState(makePuzzle);
  const [board, setBoard] = useState(start);
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState(null);
  const [focus, setFocus] = useState(12);
  const cells = useRef([]);
  const lit = board.filter(Boolean).length;
  const won = lit === 0;

  const hit = (i) => {
    if (won) return;
    const next = press(board, i);
    const m = moves + 1;
    setBoard(next); setMoves(m);
    if (!next.some(Boolean)) setBest((b) => (b == null ? m : Math.min(b, m)));
  };
  const restart = () => { setBoard(start); setMoves(0); };
  const fresh = () => { const p = makePuzzle(); setStart(p); setBoard(p); setMoves(0); };
  const onKey = useCallback((e) => {
    const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: N, ArrowUp: -N }[e.key];
    if (d === undefined) return;
    e.preventDefault();
    const col = focus % N;
    if ((d === 1 && col === N - 1) || (d === -1 && col === 0)) return;
    const j = focus + d; if (j < 0 || j >= N * N) return;
    setFocus(j); cells.current[j]?.focus();
  }, [focus]);

  return (
    <div className="fun-page narrow" style={{ '--fun-acc': ACC }}>
      <style>{FUN_CSS}{LO_CSS}</style>
      <FunHeader kind="me" accent={ACC} title={t('funLightsTitle')} sub={c.sub} />
      <div className="fun-stats" style={{ marginBottom: 22 }}>
        <div className="fun-stat"><b>{moves}</b><span>{c.moves}</span></div>
        <div className="fun-stat"><b>{lit}</b><span>{c.lit}</span></div>
        <div className="fun-stat"><b>{best ?? '—'}</b><span>{c.best}</span></div>
      </div>
      <div className={`lo-grid${won ? ' won' : ''}`} role="grid" aria-label={c.grid} onKeyDown={onKey}>
        {Array.from({ length: N }, (_, r) => (
          <div role="row" key={r} className="lo-row">
            {Array.from({ length: N }, (_, col) => {
              const i = r * N + col;
              return (
                <span role="gridcell" key={i}>
                  <button ref={(el) => { cells.current[i] = el; }} type="button" tabIndex={i === focus ? 0 : -1} className={`lo-cell${board[i] ? ' on' : ''}`}
                    aria-pressed={board[i]} aria-label={`${c.cell} ${r + 1}-${col + 1}, ${board[i] ? c.on : c.off}`} onClick={() => { setFocus(i); hit(i); }} />
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <p className={`fun-msg${won ? ' ok' : ''}`} role="status" style={{ marginTop: 20 }}>{won ? `${c.win} ${moves} ${c.winU}` : ''}</p>
      <div className="fun-row" style={{ justifyContent: 'center', marginTop: 8 }}>
        <button type="button" className="fun-btn ghost small" onClick={restart}><RotateCcw size={14} strokeWidth={1.8} /> {c.reset}</button>
        <button type="button" className="fun-btn small" onClick={fresh}><Shuffle size={14} strokeWidth={1.8} /> {c.next}</button>
      </div>
    </div>
  );
}

const LO_CSS = `
  .lo-grid { display: grid; gap: 8px; width: 100%; max-width: 380px; margin: 0 auto; padding: 14px; border-radius: 20px; background: #0c0e12; border: 1px solid #22262e; }
  .lo-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
  .lo-row > span { display: block; }
  .lo-cell { display: block; width: 100%; aspect-ratio: 1; border-radius: 12px; border: 1px solid #262b34; background: #14171d; cursor: pointer; transition: background 0.18s, box-shadow 0.18s, transform 0.12s; }
  .lo-cell.on { background: radial-gradient(circle at 50% 40%, #fff3c4, #ffd166 55%, #e9a400); border-color: #ffe08a; box-shadow: 0 0 18px rgba(255,209,102,0.55); }
  .lo-cell:active { transform: scale(0.94); }
  .lo-cell:focus-visible { outline: 2px solid var(--c-ink); outline-offset: 2px; }
  .lo-grid.won { border-color: rgba(0,229,160,0.5); box-shadow: 0 0 40px rgba(0,229,160,0.15); }
  @media (prefers-reduced-motion: reduce) { .lo-cell { transition: none; } .lo-cell:active { transform: none; } }
`;
