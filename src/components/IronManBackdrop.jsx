// Ambient Iron Man / Tony Stark helmet that drifts slowly in the background at
// very low opacity. Purely decorative: fixed, non-interactive, behind all
// content, and disabled for users who prefer reduced motion.
export default function IronManBackdrop() {
  return (
    <div aria-hidden="true" style={styles.layer}>
      <style>{`
        @keyframes im-drift {
          0%   { transform: translate(-52%, -50%) rotate(-3deg) scale(1); }
          25%  { transform: translate(-48%, -54%) rotate(1deg)  scale(1.02); }
          50%  { transform: translate(-50%, -47%) rotate(3deg)  scale(1.01); }
          75%  { transform: translate(-53%, -52%) rotate(0deg)  scale(1.03); }
          100% { transform: translate(-52%, -50%) rotate(-3deg) scale(1); }
        }
        @keyframes im-eyes {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 1; }
        }
        @keyframes im-scan {
          0%   { transform: translateY(-40px); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateY(240px); opacity: 0; }
        }
        .im-helmet { animation: im-drift 26s ease-in-out infinite; transform-origin: center; }
        .im-eye   { animation: im-eyes 4s ease-in-out infinite; }
        .im-scan  { animation: im-scan 6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .im-helmet, .im-eye, .im-scan { animation: none !important; }
        }
        @media (max-width: 600px) {
          .im-helmet { width: 320px !important; }
        }
      `}</style>

      <svg className="im-helmet" viewBox="0 0 200 250" width="560" style={styles.helmet}>
        <defs>
          <linearGradient id="im-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00d4ff" />
            <stop offset="1" stopColor="#ff6b35" />
          </linearGradient>
          <filter id="im-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="im-face">
            <path d="M100 6 C64 6 44 34 44 92 C44 140 60 182 100 244 C140 182 156 140 156 92 C156 34 136 6 100 6 Z" />
          </clipPath>
        </defs>

        {/* Helmet silhouette */}
        <path
          d="M100 6 C64 6 44 34 44 92 C44 140 60 182 100 244 C140 182 156 140 156 92 C156 34 136 6 100 6 Z"
          fill="none" stroke="url(#im-metal)" strokeWidth="1.6" opacity="0.55"
        />

        {/* Faceplate paneling */}
        <g stroke="#00d4ff" strokeWidth="1" fill="none" opacity="0.32" strokeLinecap="round">
          <path d="M100 6 V244" />
          <path d="M62 70 H138" />
          <path d="M70 150 C85 160 115 160 130 150" />
          <path d="M84 150 V196" />
          <path d="M116 150 V196" />
          <path d="M90 200 H110 M88 210 H112 M90 220 H110" />
          <path d="M52 96 C64 108 68 120 66 138" />
          <path d="M148 96 C136 108 132 120 134 138" />
        </g>

        {/* Scan line sweeping the faceplate */}
        <g clipPath="url(#im-face)">
          <rect className="im-scan" x="40" y="0" width="120" height="24" fill="#00d4ff" opacity="0.12" />
        </g>

        {/* Glowing eyes */}
        <g className="im-eye" filter="url(#im-glow)">
          <path d="M60 118 L92 108 L92 124 L60 130 Z" fill="#bfefff" />
          <path d="M140 118 L108 108 L108 124 L140 130 Z" fill="#bfefff" />
        </g>
      </svg>
    </div>
  );
}

const styles = {
  layer: {
    position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
    opacity: 0.12,
  },
  helmet: {
    position: 'absolute', left: '50%', top: '50%',
    filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.25))',
  },
};
