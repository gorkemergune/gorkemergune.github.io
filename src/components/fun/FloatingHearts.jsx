import { useMemo } from 'react';
import { prefersReducedMotion } from '../../utils/prefersReducedMotion.js';

// Ambient background for the Love Meter: floating hearts, tiny sparkles and a
// couple of soft radial glows. Purely decorative (aria-hidden) and absolutely
// positioned behind the content. Under prefers-reduced-motion it renders the
// static glows only — no drifting particles.
const HEARTS = ['❤️', '💗', '💓', '💞', '💕'];

export default function FloatingHearts() {
  const reduced = prefersReducedMotion();

  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        char: HEARTS[i % HEARTS.length],
        left: Math.random() * 100,
        size: 14 + Math.random() * 20,
        delay: Math.random() * 9,
        dur: 9 + Math.random() * 8,
        drift: (Math.random() - 0.5) * 60,
        opacity: 0.25 + Math.random() * 0.35,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 4,
        dur: 2.4 + Math.random() * 2.6,
      })),
    []
  );

  return (
    <div className="fh-root" aria-hidden="true">
      <style>{css}</style>

      {/* Soft glows — always present, no motion required */}
      <span className="fh-glow fh-glow-1" />
      <span className="fh-glow fh-glow-2" />

      {!reduced && (
        <>
          {hearts.map((h) => (
            <span
              key={`h${h.id}`}
              className="fh-heart"
              style={{
                left: `${h.left}%`,
                fontSize: h.size,
                opacity: h.opacity,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.dur}s`,
                '--drift': `${h.drift}px`,
              }}
            >
              {h.char}
            </span>
          ))}
          {sparkles.map((sp) => (
            <span
              key={`s${sp.id}`}
              className="fh-spark"
              style={{
                left: `${sp.left}%`,
                top: `${sp.top}%`,
                width: sp.size,
                height: sp.size,
                animationDelay: `${sp.delay}s`,
                animationDuration: `${sp.dur}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

const css = `
  .fh-root {
    position: absolute; inset: 0; overflow: hidden;
    pointer-events: none; z-index: 0;
  }
  .fh-glow {
    position: absolute; border-radius: 50%; filter: blur(70px);
  }
  .fh-glow-1 {
    width: 420px; height: 420px; top: -120px; left: -80px;
    background: radial-gradient(circle, rgba(255,77,109,0.16), transparent 70%);
  }
  .fh-glow-2 {
    width: 480px; height: 480px; bottom: -160px; right: -120px;
    background: radial-gradient(circle, rgba(157,107,255,0.14), transparent 70%);
  }
  .fh-heart {
    position: absolute; bottom: -40px;
    animation-name: fh-rise; animation-timing-function: ease-in-out;
    animation-iteration-count: infinite; will-change: transform, opacity;
  }
  @keyframes fh-rise {
    0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    12%  { opacity: 1; }
    88%  { opacity: 1; }
    100% { transform: translate(var(--drift), -108vh) rotate(18deg); opacity: 0; }
  }
  .fh-spark {
    position: absolute; border-radius: 50%;
    background: #fff; box-shadow: 0 0 6px #fff, 0 0 10px rgba(255,77,109,0.6);
    animation-name: fh-twinkle; animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  @keyframes fh-twinkle {
    0%, 100% { opacity: 0; transform: scale(0.4); }
    50%      { opacity: 0.9; transform: scale(1); }
  }
`;
