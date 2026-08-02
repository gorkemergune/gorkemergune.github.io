import { forwardRef, useImperativeHandle, useRef, useState, useMemo, useCallback } from 'react';
import { WHEEL_SLICES } from '../../data/wheelChallenges.js';
import { prefersReducedMotion } from '../../utils/prefersReducedMotion.js';
import Confetti from './Confetti.jsx';

// FEATURE 2 — Spin the Wheel 🎡
//
// A 30-slice SVG wheel. Calling spin() (exposed via ref) rotates it 5–8s with a
// decelerating ease, lands on a random slice, highlights it under the top
// pointer and fires confetti. The parent owns the result card; this component
// just drives the wheel and reports the landed index through onLanded.

const SIZE = 400;
const C = SIZE / 2;
const R = 192;
const LABEL_R = 148;
const SLICE_DEG = 360 / WHEEL_SLICES; // 12°
const PALETTE = ['#ff4d6d', '#f472b6', '#00d4ff', '#9d6bff', '#ffd166', '#00e5a0', '#4d96ff', '#ff9f1c'];

// Point on the rim at `deg` measured clockwise from the top (12 o'clock).
function rim(deg, r = R) {
  const rad = (deg * Math.PI) / 180;
  return [C + r * Math.sin(rad), C - r * Math.cos(rad)];
}

function slicePath(i) {
  const [x1, y1] = rim(i * SLICE_DEG);
  const [x2, y2] = rim((i + 1) * SLICE_DEG);
  return `M ${C} ${C} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

const Wheel = forwardRef(function Wheel({ onSpinStart, onLanded }, ref) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState(null);
  const [confettiOn, setConfettiOn] = useState(false);
  const [duration, setDuration] = useState(0);

  const rotationRef = useRef(0);
  const spinningRef = useRef(false);

  const slices = useMemo(
    () =>
      Array.from({ length: WHEEL_SLICES }, (_, i) => ({
        i,
        d: slicePath(i),
        color: PALETTE[i % PALETTE.length],
        mid: i * SLICE_DEG + SLICE_DEG / 2,
        label: rim(i * SLICE_DEG + SLICE_DEG / 2, LABEL_R),
      })),
    []
  );

  const spin = useCallback(() => {
    if (spinningRef.current) return;
    const reduced = prefersReducedMotion();

    const target = Math.floor(Math.random() * WHEEL_SLICES);
    const mid = target * SLICE_DEG + SLICE_DEG / 2;
    const jitter = (Math.random() - 0.5) * (SLICE_DEG - 4); // stay well inside the slice

    const fullSpins = 5 + Math.floor(Math.random() * 4); // 5–8 turns
    const base = rotationRef.current - (rotationRef.current % 360);
    const finalMod = (((360 - mid - jitter) % 360) + 360) % 360;
    const next = base + fullSpins * 360 + finalMod;

    spinningRef.current = true;
    setSpinning(true);
    setLanded(null);
    setConfettiOn(false);
    setDuration(reduced ? 0.35 : 5 + Math.random() * 3); // 5–8s
    rotationRef.current = next;
    setRotation(next);
    onSpinStart?.();

    if (reduced) {
      // No transitionend reliably fires for ~instant changes; settle manually.
      window.setTimeout(() => finish(target), 380);
    }
  }, [onSpinStart]);

  const finish = useCallback(
    (target) => {
      if (!spinningRef.current) return; // idempotent: ignore duplicate settles
      spinningRef.current = false;
      setSpinning(false);
      setLanded(target);
      setConfettiOn(true);
      onLanded?.(target);
    },
    [onLanded]
  );

  useImperativeHandle(ref, () => ({ spin, spinning: () => spinningRef.current }), [spin]);

  // Which slice we're heading toward — recomputed from the final rotation so the
  // transitionend handler knows what to highlight.
  const handleTransitionEnd = useCallback((e) => {
    // Only the wheel's own transform settles the spin — ignore the fill-opacity
    // transitions that bubble up from the slice paths.
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (!spinningRef.current) return;
    const mod = ((rotationRef.current % 360) + 360) % 360;
    const topAngle = (360 - mod) % 360; // slice angle now under the pointer
    const idx = Math.floor(topAngle / SLICE_DEG) % WHEEL_SLICES;
    finish(idx);
  }, [finish]);

  return (
    <div className="wh-wrap">
      <style>{css}</style>
      {confettiOn && <Confetti count={120} onDone={() => setConfettiOn(false)} />}

      <div className="wh-stage">
        <div className="wh-pointer" aria-hidden="true" />
        <div className="wh-glow" aria-hidden="true" />
        <svg
          className="wh-svg"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label="Spin the wheel"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? `transform ${duration}s cubic-bezier(0.16, 0.84, 0.24, 1)`
              : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          <circle cx={C} cy={C} r={R + 4} fill="#0b0b14" stroke="#241c30" strokeWidth="4" />
          {slices.map((s) => {
            const isLanded = landed === s.i;
            return (
              <g key={s.i}>
                <path
                  d={s.d}
                  fill={s.color}
                  fillOpacity={isLanded ? 0.95 : 0.32}
                  stroke={isLanded ? '#ffffff' : '#0b0b14'}
                  strokeWidth={isLanded ? 2 : 1}
                  style={{ transition: 'fill-opacity 0.4s, stroke 0.4s' }}
                />
                <text
                  x={s.label[0]}
                  y={s.label[1]}
                  fill={isLanded ? '#0b0b14' : '#e8e8f0'}
                  fontSize="13"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight={isLanded ? 700 : 500}
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={`rotate(${s.mid} ${s.label[0]} ${s.label[1]})`}
                >
                  {s.i + 1}
                </text>
              </g>
            );
          })}
          <circle cx={C} cy={C} r={26} fill="#12121f" stroke="#2a2238" strokeWidth="2" />
          <circle cx={C} cy={C} r={7} fill="#ff4d6d" />
        </svg>
      </div>
    </div>
  );
});

export default Wheel;

const css = `
  .wh-wrap { position: relative; z-index: 2; display: flex; justify-content: center; }
  .wh-stage {
    position: relative;
    width: min(78vw, 420px); height: min(78vw, 420px);
  }
  .wh-glow {
    position: absolute; inset: -8%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(157,107,255,0.18), transparent 68%);
    filter: blur(24px); pointer-events: none; z-index: 0;
  }
  .wh-svg {
    position: relative; z-index: 1;
    width: 100%; height: 100%;
    filter: drop-shadow(0 20px 50px rgba(0,0,0,0.45));
    transform-origin: 50% 50%;
  }
  .wh-pointer {
    position: absolute; top: -4px; left: 50%;
    transform: translateX(-50%);
    width: 0; height: 0; z-index: 3;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 26px solid #ff4d6d;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.5));
  }
`;
