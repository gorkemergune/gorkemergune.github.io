import { useEffect, useRef, useState } from 'react';

// Counts up from 0 to `target` when scrolled into view. GPU-friendly (text only).
export default function AnimatedCounter({ target, suffix = '', duration = 1600 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) run(); }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  // If the target changes after the animation ran (e.g. live GitHub data lands),
  // snap to the new value so counters never show a stale number.
  useEffect(() => {
    if (started.current) setValue(target);
  }, [target]);

  return <span ref={ref}>{value.toLocaleString('en-US')}{suffix}</span>;
}
