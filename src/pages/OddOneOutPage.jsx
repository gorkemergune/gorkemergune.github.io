import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS } from '../components/fun/FunFrame';

// Odd One Out — a visual puzzle. One tile is a slightly different shade; the
// grid grows (2×2 → 7×7) and the difference shrinks every level. A wrong pick
// costs a life and briefly marks the right tile; three lives per run.
const ACC = '#4d96ff';
const LIVES = 3;
const C = {
  en: { sub: 'One tile is a slightly different shade. Find it. The grid grows and the difference shrinks every level.', level: 'Level', lives: 'Lives', best: 'Best', tile: 'Tile', right: 'Nice eye!', wrong: 'Not that one — the odd tile is outlined.', over: 'Game over. You reached level', again: 'Play again', grid: 'Tiles' },
  tr: { sub: 'Karelerden birinin tonu biraz farklı. Onu bul. Her seviyede ızgara büyüyor, fark küçülüyor.', level: 'Seviye', lives: 'Can', best: 'En iyi', tile: 'Kare', right: 'İyi göz!', wrong: 'O değil — farklı kare işaretlendi.', over: 'Oyun bitti. Ulaştığın seviye:', again: 'Yeniden oyna', grid: 'Kareler' },
};
const makeRound = (level) => {
  const size = Math.min(7, 2 + Math.floor((level - 1) / 2));
  const delta = Math.max(3, 22 - level * 1.5);
  const h = Math.floor(Math.random() * 360);
  const s = 55 + Math.floor(Math.random() * 25);
  const l = 42 + Math.floor(Math.random() * 14);
  const sign = Math.random() > 0.5 ? 1 : -1;
  return { size, odd: Math.floor(Math.random() * size * size), base: `hsl(${h} ${s}% ${l}%)`, diff: `hsl(${h} ${s}% ${l + sign * delta}%)` };
};

export default function OddOneOutPage() {
  const { lang, t } = useLang();
  const c = C[lang] || C.en;
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(LIVES);
  const [round, setRound] = useState(() => makeRound(1));
  const [best, setBest] = useState(0);
  const [flash, setFlash] = useState(null); // 'ok' | 'bad'
  const timer = useRef(null);
  const over = lives <= 0;
  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (i) => {
    if (over || flash === 'bad') return;
    clearTimeout(timer.current);
    if (i === round.odd) {
      const next = level + 1;
      setBest((b) => Math.max(b, level));
      setLevel(next); setRound(makeRound(next)); setFlash('ok');
      timer.current = setTimeout(() => setFlash(null), 700);
    } else {
      setLives((n) => n - 1); setFlash('bad');
      timer.current = setTimeout(() => { setFlash(null); setRound(makeRound(level)); }, 900);
    }
  };
  const restart = () => { clearTimeout(timer.current); setLevel(1); setLives(LIVES); setRound(makeRound(1)); setFlash(null); };

  return (
    <div className="fun-page narrow" style={{ '--fun-acc': ACC }}>
      <style>{FUN_CSS}{OO_CSS}</style>
      <FunHeader kind="me" accent={ACC} title={t('funOddTitle')} sub={c.sub} />
      <div className="fun-stats" style={{ marginBottom: 20 }}>
        <div className="fun-stat"><b>{level}</b><span>{c.level}</span></div>
        <div className="fun-stat"><b aria-label={`${lives}`}>{'●'.repeat(Math.max(lives, 0))}{'○'.repeat(LIVES - Math.max(lives, 0))}</b><span>{c.lives}</span></div>
        <div className="fun-stat"><b>{best || '—'}</b><span>{c.best}</span></div>
      </div>
      <div className={`oo-grid${flash === 'bad' ? ' reveal' : ''}`} role="group" aria-label={c.grid} style={{ gridTemplateColumns: `repeat(${round.size}, 1fr)` }}>
        {Array.from({ length: round.size * round.size }, (_, i) => (
          <button key={`${level}-${i}`} type="button" className={`oo-tile${i === round.odd ? ' odd' : ''}`} style={{ background: i === round.odd ? round.diff : round.base }}
            onClick={() => pick(i)} disabled={over} aria-label={`${c.tile} ${i + 1}`} />
        ))}
      </div>
      <p className={`fun-msg${flash === 'ok' ? ' ok' : flash === 'bad' || over ? ' bad' : ''}`} role="status" style={{ marginTop: 18 }}>
        {over ? `${c.over} ${level}.` : flash === 'ok' ? c.right : flash === 'bad' ? c.wrong : ''}
      </p>
      {over && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}><button type="button" className="fun-btn" onClick={restart}><RotateCcw size={15} strokeWidth={1.8} /> {c.again}</button></div>}
    </div>
  );
}

const OO_CSS = `
  .oo-grid { display: grid; gap: 6px; width: 100%; max-width: 400px; aspect-ratio: 1; margin: 0 auto; padding: 10px; border-radius: 18px; background: #0c0e12; border: 1px solid #22262e; }
  .oo-tile { border: none; border-radius: 10px; cursor: pointer; transition: transform 0.12s, outline-color 0.2s; outline: 3px solid transparent; outline-offset: -3px; }
  .oo-tile:hover { transform: scale(0.97); }
  .oo-tile:focus-visible { outline-color: var(--c-ink); }
  .oo-grid.reveal .oo-tile.odd { outline-color: #fff; }
  .oo-tile:disabled { cursor: default; }
  @media (prefers-reduced-motion: reduce) { .oo-tile { transition: none; } .oo-tile:hover { transform: none; } }
`;
