// Small shared helper: true when the user has asked the OS to reduce motion.
// The global stylesheet already neutralizes CSS animations under this setting;
// this lets JS-driven effects (confetti, count-ups, long spins) opt out too.
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
