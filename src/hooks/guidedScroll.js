// A gentle, interruptible glide to an element — used by the hero's "View
// Work". Native scrolling stays in charge: any wheel, touch, key or pointer
// input from the visitor cancels the glide immediately, and visitors who
// prefer reduced motion are moved there instantly. The fixed nav's height is
// accounted for so the target is not hidden under it.
const CANCEL = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export function guidedScrollTo(el, { duration = 1100, onDone } = {}) {
  if (!el) return () => {};
  const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  // Layout position (offsetTop chain) ignores CSS transforms such as the
  // section's fade-in offset, so the glide lands exactly under the nav.
  let top = 0; for (let n = el; n; n = n.offsetParent) top += n.offsetTop;
  const target = Math.max(0, top - nav);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || Math.abs(target - window.scrollY) < 4) {
    window.scrollTo({ top: target, behavior: 'instant' });
    onDone?.();
    return () => {};
  }

  const start = window.scrollY;
  const t0 = performance.now();
  let raf = 0;
  let stopped = false;

  const stop = () => {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(raf);
    CANCEL.forEach((ev) => window.removeEventListener(ev, stop));
  };
  CANCEL.forEach((ev) => window.addEventListener(ev, stop, { passive: true, once: true }));

  const tick = (now) => {
    if (stopped) return;
    const k = Math.min(1, (now - t0) / duration);
    // 'instant': the site sets scroll-behavior: smooth globally, which would
    // otherwise turn every frame into its own competing smooth scroll.
    window.scrollTo({ top: start + (target - start) * ease(k), behavior: 'instant' });
    if (k < 1) raf = requestAnimationFrame(tick);
    else { stop(); onDone?.(); }
  };
  raf = requestAnimationFrame(tick);
  return stop;
}
