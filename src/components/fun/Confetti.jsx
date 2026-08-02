import { useMemo, useEffect } from 'react';
import { prefersReducedMotion } from '../../utils/prefersReducedMotion.js';

// A lightweight, dependency-free confetti burst. Renders a fixed, full-screen,
// pointer-events-none overlay of falling pieces that animate once via CSS, then
// calls onDone so the parent can unmount it. Honors prefers-reduced-motion by
// rendering nothing.
//
// Reused by the Love Meter (soulmate scores) and the Spin the Wheel result.
const PALETTE = ['#ff4d6d', '#f472b6', '#00d4ff', '#9d6bff', '#ffd166', '#00e5a0', '#4d96ff', '#ff9f1c'];

export default function Confetti({ count = 140, duration = 4200, onDone }) {
  const reduced = prefersReducedMotion();

  const pieces = useMemo(() => {
    if (reduced) return [];
    return Array.from({ length: count }, (_, i) => {
      const round = Math.random() > 0.5;
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        fall: 2.4 + Math.random() * 1.6,
        drift: (Math.random() - 0.5) * 240,
        spin: 360 + Math.random() * 720,
        w: 6 + Math.random() * 6,
        h: round ? undefined : 10 + Math.random() * 10,
        round,
        color: PALETTE[i % PALETTE.length],
      };
    });
  }, [count, reduced]);

  useEffect(() => {
    if (reduced) {
      onDone?.();
      return;
    }
    const id = setTimeout(() => onDone?.(), duration);
    return () => clearTimeout(id);
  }, [reduced, duration, onDone]);

  if (reduced || pieces.length === 0) return null;

  return (
    <div className="cf-root" aria-hidden="true">
      <style>{css}</style>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="cf-piece"
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.round ? p.w : p.h,
            background: p.color,
            borderRadius: p.round ? '50%' : 2,
            boxShadow: `0 0 8px ${p.color}66`,
            animationDelay: `${p.delay}s`,
            '--fall': `${p.fall}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}

const css = `
  .cf-root {
    position: fixed; inset: 0; overflow: hidden;
    pointer-events: none; z-index: 300;
  }
  .cf-piece {
    position: absolute; top: -24px;
    opacity: 0;
    animation: cf-fall var(--fall) cubic-bezier(0.3, 0.5, 0.5, 1) forwards;
    will-change: transform, opacity;
  }
  @keyframes cf-fall {
    0%   { opacity: 0; transform: translate(0, -10vh) rotate(0deg); }
    10%  { opacity: 1; }
    100% { opacity: 0; transform: translate(var(--drift), 105vh) rotate(var(--spin)); }
  }
`;
