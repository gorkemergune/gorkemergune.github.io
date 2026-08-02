import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../utils/prefersReducedMotion.js';

// Playful ~3s "calculating" sequence: an animated progress bar that fills 0→100
// while a set of loading messages cycle one by one. Calls onComplete when the
// bar is full. Under prefers-reduced-motion it collapses to a brief pause on the
// final message so the flow still reads, without the long animation.
//
// Props:
//   messages    string[] — shown in order across the duration
//   duration    ms for the whole sequence (default 3000)
//   onComplete  called once when finished
export default function ProgressAnimation({ messages = [], duration = 3000, onComplete }) {
  const reduced = prefersReducedMotion();
  const effectiveDuration = reduced ? 600 : duration;

  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let raf;
    const start = performance.now();
    const total = Math.max(1, messages.length);

    const tick = (now) => {
      const elapsed = now - start;
      const frac = Math.min(1, elapsed / effectiveDuration);
      setProgress(frac * 100);
      setMsgIndex(Math.min(total - 1, Math.floor(frac * total)));

      if (frac < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        onCompleteRef.current?.();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [effectiveDuration, messages.length]);

  return (
    <div className="pa-root" role="status" aria-live="polite">
      <style>{css}</style>
      <div className="pa-msg" key={msgIndex}>
        {messages[msgIndex] || ''}
      </div>
      <div className="pa-track">
        <div className="pa-fill" style={{ width: `${progress}%` }}>
          <span className="pa-shine" />
        </div>
      </div>
      <div className="pa-pct">{Math.round(progress)}%</div>
    </div>
  );
}

const css = `
  .pa-root {
    display: flex; flex-direction: column; align-items: center; gap: 20px;
    padding: 20px 0;
  }
  .pa-msg {
    font-family: 'Instrument Serif', serif;
    font-size: 26px; line-height: 1.3; color: #f0e0e6; text-align: center;
    min-height: 34px;
    animation: pa-msg-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes pa-msg-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pa-track {
    width: 100%; max-width: 380px; height: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid #1f1f34; border-radius: 999px; overflow: hidden;
  }
  .pa-fill {
    height: 100%; border-radius: 999px; position: relative; overflow: hidden;
    background: linear-gradient(90deg, #ff4d6d, #f472b6, #9d6bff);
    box-shadow: 0 0 16px rgba(255,77,109,0.5);
    transition: width 0.12s linear;
  }
  .pa-shine {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
    animation: pa-shine 1.1s ease-in-out infinite;
  }
  @keyframes pa-shine {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .pa-pct {
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
    letter-spacing: 0.12em; color: #8a8aa0; font-variant-numeric: tabular-nums;
  }
`;
