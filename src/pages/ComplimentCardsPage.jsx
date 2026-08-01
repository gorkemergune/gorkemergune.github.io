import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Shuffle } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { compliments, CARD_COUNT } from '../data/compliments.js';

// Accent palette reused from the portfolio — cycles across the 16 cards so each
// revealed compliment carries a subtly different glow.
const ACCENTS = ['#ff4d6d', '#f472b6', '#00d4ff', '#9d6bff', '#ffd166', '#00e5a0', '#4d96ff', '#ff9f1c'];

// Fisher–Yates shuffle of [0..n-1]. We shuffle *indices*, not the strings, so
// the reveal order is randomized while the visible text still follows the
// current language (compliments[lang][order[i]]).
function shuffleIndices(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A short-lived sparkle burst rendered once, when a card first opens.
function SparkleBurst({ accent }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.6;
        const dist = 28 + Math.random() * 26;
        return {
          id: i,
          x: `${Math.cos(angle) * dist}px`,
          y: `${Math.sin(angle) * dist}px`,
          delay: `${Math.random() * 0.08}s`,
          size: 4 + Math.random() * 4,
        };
      }),
    []
  );
  return (
    <span className="cc-burst" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="cc-spark"
          style={{
            '--dx': p.x,
            '--dy': p.y,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
            background: accent,
            boxShadow: `0 0 6px ${accent}`,
          }}
        />
      ))}
    </span>
  );
}

function ComplimentCard({ index, text, accent, open, allOpened, reduced, onOpen, t }) {
  const FrontIcon = index % 2 === 0 ? Heart : Sparkles;
  // Once every card is open the deck is "spent" — locked until a reshuffle.
  const locked = open || allOpened;

  return (
    <button
      type="button"
      className={`cc-card${open ? ' cc-open' : ''}${locked ? ' cc-locked' : ''}`}
      style={{ '--accent': accent }}
      onClick={() => onOpen(index)}
      disabled={locked}
      aria-pressed={open}
      aria-label={open ? text : t('complimentsCardLabel')}
    >
      <span className="cc-inner">
        {/* Face-down front — minimal icon */}
        <span className="cc-face cc-front" aria-hidden={open}>
          <span className="cc-front-glow" />
          <FrontIcon size={26} strokeWidth={1.4} className="cc-front-icon" />
          <span className="cc-front-index">{String(index + 1).padStart(2, '0')}</span>
        </span>

        {/* Revealed back — the compliment */}
        <span className="cc-face cc-back" aria-hidden={!open}>
          <Sparkles size={16} strokeWidth={1.5} className="cc-back-icon" />
          <span className="cc-text">{text}</span>
          {open && !reduced && <SparkleBurst accent={accent} />}
        </span>
      </span>
    </button>
  );
}

export default function ComplimentCardsPage() {
  const { lang, t } = useLang();
  const list = compliments[lang] || compliments.en;

  const [order, setOrder] = useState(() => shuffleIndices(CARD_COUNT));
  const [opened, setOpened] = useState(() => new Set());
  const reduced = prefersReducedMotion();

  const allOpened = opened.size === CARD_COUNT;

  const openCard = useCallback(
    (i) => {
      setOpened((prev) => {
        if (prev.has(i) || prev.size === CARD_COUNT) return prev;
        const next = new Set(prev);
        next.add(i);
        return next;
      });
    },
    []
  );

  const reshuffle = useCallback(() => {
    setOrder(shuffleIndices(CARD_COUNT));
    setOpened(new Set());
  }, []);

  return (
    <div style={s.container}>
      <style>{css}</style>

      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('funComplimentsTitle')}</h1>
        <p style={s.desc}>{t('complimentsSub')}</p>
      </div>

      <div style={s.bar}>
        <span style={s.stat}>
          {t('complimentsProgress')}:{' '}
          <b style={{ color: '#00d4ff' }}>{opened.size}</b> / {CARD_COUNT}
        </span>
        {allOpened && (
          <button onClick={reshuffle} className="cc-shuffle" type="button">
            <Shuffle size={14} strokeWidth={1.7} /> {t('complimentsShuffle')}
          </button>
        )}
      </div>

      <div className="cc-grid" role="group" aria-label={t('funComplimentsTitle')}>
        {order.map((complimentIdx, position) => (
          <ComplimentCard
            key={position}
            index={position}
            text={list[complimentIdx]}
            accent={ACCENTS[position % ACCENTS.length]}
            open={opened.has(position)}
            allOpened={allOpened}
            reduced={reduced}
            onOpen={openCard}
            t={t}
          />
        ))}
      </div>

      {allOpened && (
        <div className="cc-done" role="status">
          <Heart size={15} strokeWidth={1.6} style={{ color: '#ff4d6d' }} />
          {t('complimentsAllOpened')}
        </div>
      )}
    </div>
  );
}

const css = `
  .cc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    perspective: 1400px;
  }
  @media (max-width: 820px) { .cc-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 560px) { .cc-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }

  .cc-card {
    position: relative;
    aspect-ratio: 3 / 4;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 16px;
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .cc-card:not(.cc-locked):hover { transform: translateY(-6px); }
  .cc-card.cc-locked:not(.cc-open) { cursor: default; }
  .cc-card.cc-open { animation: cc-pop 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }

  @keyframes cc-pop {
    0% { transform: scale(1); }
    45% { transform: scale(1.045); }
    100% { transform: scale(1); }
  }

  .cc-inner {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.2, 0.85, 0.25, 1);
  }
  .cc-card.cc-open .cc-inner { transform: rotateY(180deg); }

  .cc-face {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px;
    border-radius: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    overflow: hidden;
  }

  /* ---- Face-down front ---- */
  .cc-front {
    background:
      radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.04), transparent 60%),
      linear-gradient(160deg, #12121f 0%, #0c0c16 100%);
    border: 1px solid #1c1c30;
    transition: border-color 0.35s, box-shadow 0.35s;
  }
  .cc-card:not(.cc-locked):hover .cc-front {
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 22%, transparent);
  }
  .cc-front-glow {
    position: absolute;
    width: 60px; height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%);
    filter: blur(6px);
    opacity: 0.55;
    transition: opacity 0.35s, transform 0.5s cubic-bezier(0.2,0.8,0.2,1);
  }
  .cc-card:not(.cc-locked):hover .cc-front-glow { opacity: 1; transform: scale(1.25); }
  .cc-front-icon {
    position: relative;
    color: color-mix(in srgb, var(--accent) 82%, #ffffff);
    transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1);
  }
  .cc-card:not(.cc-locked):hover .cc-front-icon { transform: scale(1.12) rotate(-6deg); }
  .cc-front-index {
    position: absolute;
    bottom: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: #3a3a52;
  }

  /* ---- Revealed back ---- */
  .cc-back {
    transform: rotateY(180deg);
    background:
      radial-gradient(130% 100% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 62%),
      linear-gradient(160deg, #14141f 0%, #0e0e18 100%);
    border: 1px solid color-mix(in srgb, var(--accent) 42%, #1a1a2e);
    box-shadow: inset 0 0 30px color-mix(in srgb, var(--accent) 10%, transparent);
  }
  .cc-back-icon { color: color-mix(in srgb, var(--accent) 85%, #ffffff); flex-shrink: 0; }
  .cc-text {
    font-family: 'Instrument Serif', serif;
    font-size: 16px;
    line-height: 1.32;
    color: #e6e6ee;
    text-align: center;
    letter-spacing: 0.005em;
  }
  @media (max-width: 560px) { .cc-text { font-size: 14.5px; } }

  /* ---- Sparkle burst ---- */
  .cc-burst {
    position: absolute;
    top: 22px; left: 50%;
    width: 0; height: 0;
    pointer-events: none;
  }
  .cc-spark {
    position: absolute;
    top: 0; left: 0;
    border-radius: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    animation: cc-spark 0.75s ease-out forwards;
  }
  @keyframes cc-spark {
    0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
    30%  { opacity: 1; }
    100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.7); }
  }

  .cc-shuffle {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border: 1px solid #ff4d6d55;
    border-radius: 999px;
    background: linear-gradient(160deg, rgba(255,77,109,0.12), rgba(244,114,182,0.08));
    color: #f0dfe4;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), border-color 0.3s, box-shadow 0.3s;
    animation: cc-fade-up 0.5s cubic-bezier(0.2,0.8,0.2,1);
  }
  .cc-shuffle:hover {
    transform: translateY(-2px);
    border-color: #ff4d6daa;
    box-shadow: 0 0 26px rgba(255,77,109,0.22);
  }
  .cc-shuffle svg { transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1); }
  .cc-shuffle:hover svg { transform: rotate(180deg); }

  .cc-done {
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 14px 20px;
    border: 1px solid #ff4d6d33;
    border-radius: 12px;
    background: rgba(255,77,109,0.06);
    font-family: 'Instrument Sans', sans-serif;
    font-size: 15px;
    color: #d8d8e2;
    text-align: center;
    animation: cc-fade-up 0.5s cubic-bezier(0.2,0.8,0.2,1);
  }
  @keyframes cc-fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const s = {
  container: { maxWidth: 760, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 48, cursor: 'pointer' },
  header: { marginBottom: 32 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 60, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 18 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 520 },
  bar: { display: 'flex', alignItems: 'center', gap: 20, marginBottom: 22, minHeight: 40, flexWrap: 'wrap' },
  stat: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8a8aa0' },
};
