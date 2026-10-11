import { useState, useEffect, useRef } from 'react';
import { useLang } from '../i18n.jsx';
import { FunBack, FUN_CSS } from '../components/fun/FunFrame';

const sadScenes = [
  { emoji: '😢', bg: '#24161a' },
  { emoji: '😿', bg: '#231d13' },
  { emoji: '🥺', bg: '#151b2a' },
  { emoji: '😞', bg: '#25151f' },
  { emoji: '💔', bg: '#261517' },
  { emoji: '😭', bg: '#1b172a' },
];

const sadTexts = {
  en: [
    "Please don't say no...",
    "Are you sure? Really?",
    "My heart is breaking...",
    "I can't take this anymore!",
    "LAST CHANCE!",
  ],
  tr: [
    "Lütfen hayır deme...",
    "Emin misin? Cidden mi?",
    "Kalbim kırılıyor...",
    "Artık dayanamıyorum!",
    "SON ŞANS!",
  ],
};

export default function SorryPage() {
  const { t, lang } = useLang();
  const [yesSize, setYesSize] = useState(16);
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noFlying, setNoFlying] = useState(false);
  const [noGone, setNoGone] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const noRef = useRef(null);

  // Cleared on unmount so leaving mid-animation does not update a dead page.
  const goneTimer = useRef(null);
  useEffect(() => () => clearTimeout(goneTimer.current), []);

  const handleNo = () => {
    const next = noCount + 1;
    setNoCount(next);
    setYesSize(s => s + 16);

    // At 5th click, launch the parachute
    if (next >= 5) {
      setNoFlying(true);
      clearTimeout(goneTimer.current);
      goneTimer.current = setTimeout(() => setNoGone(true), 1500);
    } else {
      // Random reposition to dodge the cursor
      setNoPos({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 100,
      });
    }
  };

  const scene = sadScenes[noCount % sadScenes.length];
  const texts = sadTexts[lang] || sadTexts.en;

  if (accepted) {
    return (
      <div style={s.container}>
        <style>{FUN_CSS}</style>
        <div style={{ position: 'relative', zIndex: 10, marginBottom: 40 }}><FunBack /></div>
        <div style={s.yayWrap}>
          <div style={s.confetti}>🎉🎊✨🥳🎉🎊✨🥳</div>
          <h1 style={s.yayTitle}>{t('sorryYayTitle')}</h1>
          <p style={s.yayText}>{t('sorryYayText')}</p>
          <div style={{ fontSize: 80, marginTop: 20 }}>🤗</div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <style>{`
        @keyframes noShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px) rotate(-4deg); }
          40% { transform: translateX(8px) rotate(4deg); }
          60% { transform: translateX(-6px) rotate(-2deg); }
          80% { transform: translateX(6px) rotate(2deg); }
        }
        @keyframes parachuteFly {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          30% { transform: translateY(-80px) rotate(-10deg); opacity: 1; }
          60% { transform: translateY(-200px) rotate(15deg) translateX(60px); opacity: 0.7; }
          100% { transform: translateY(-500px) rotate(-20deg) translateX(-80px); opacity: 0; }
        }
        @keyframes noShrink {
          from { transform: scale(1); }
          to { transform: scale(0.85); }
        }
      `}</style>

      <style>{FUN_CSS}</style>
      <div style={{ position: 'relative', zIndex: 10, marginBottom: 40 }}><FunBack /></div>

      <div style={s.center}>
        {/* Sad scene card */}
        <div style={{ ...s.sceneCard, background: scene.bg }}>
          <div style={{ fontSize: 72 }}>{scene.emoji}</div>
          {noCount > 0 && noCount <= 5 && (
            <p style={s.sadText}>{texts[Math.min(noCount - 1, texts.length - 1)]}</p>
          )}
        </div>

        <h1 style={s.title}>{t('sorryPageTitle')}</h1>
        <p style={s.sub}>{t('sorryPageSub')}</p>

        <div style={s.btnRow}>
          <button
            onClick={() => setAccepted(true)}
            style={{
              ...s.yesBtn,
              fontSize: yesSize,
              padding: `${Math.max(12, yesSize * 0.7)}px ${Math.max(32, yesSize * 1.6)}px`,
            }}
          >
            {t('sorryYes')} {noCount >= 3 ? '🥺👉👈' : noCount >= 1 ? '❤️' : ''}
          </button>

          {!noGone && (
            <div
              ref={noRef}
              style={{
                position: 'relative',
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                transition: noFlying ? 'none' : 'transform 0.3s ease',
                animation: noFlying
                  ? 'parachuteFly 1.5s ease-in forwards'
                  : noCount > 0
                  ? 'noShake 0.4s ease'
                  : 'none',
              }}
            >
              {noFlying && (
                <span style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', fontSize: 24 }}>🪂</span>
              )}
              <button
                onClick={handleNo}
                style={{
                  ...s.noBtn,
                  fontSize: Math.max(14 - noCount * 1.5, 8),
                  padding: `${Math.max(10 - noCount, 4)}px ${Math.max(28 - noCount * 3, 10)}px`,
                  opacity: Math.max(1 - noCount * 0.12, 0.4),
                }}
              >
                {t('sorryNo')}
              </button>
            </div>
          )}
        </div>

        {noGone && (
          <p style={s.noGoneText}>
            {lang === 'tr' ? '"Hayır" butonu kaçtı! 🪂 Artık sadece Evet var!' : 'The "No" button flew away! 🪂 Only Yes remains!'}
          </p>
        )}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: '0.06em', color: '#8a919d', marginBottom: 60, cursor: 'pointer' },
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 20 },
  sceneCard: {
    width: 240, height: 200, borderRadius: 12, border: '1px solid #1e222b',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 12, marginBottom: 32, transition: 'background 0.4s',
  },
  sadText: { fontFamily: "var(--font-body)", fontSize: 15, color: '#b4bac5', fontStyle: 'italic', padding: '0 16px' },
  title: { fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.015em', color: '#eef0f4', marginBottom: 12 },
  sub: { fontFamily: "var(--font-body)", fontSize: 22, color: '#b4bac5', marginBottom: 40 },
  btnRow: { display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center', minHeight: 80 },
  yesBtn: {
    fontFamily: "var(--font-body)", fontWeight: 600,
    background: '#eef0f4', color: '#14171d', border: 'none', borderRadius: 6,
    cursor: 'pointer', transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
    whiteSpace: 'nowrap',
  },
  noBtn: {
    fontFamily: "var(--font-body)", fontWeight: 500,
    background: 'transparent', color: '#8a919d',
    border: '1px solid #2c313c', borderRadius: 6, cursor: 'pointer',
    transition: 'all 0.3s ease', whiteSpace: 'nowrap',
  },
  noGoneText: {
    marginTop: 20, fontFamily: "var(--font-body)",
    fontSize: 15, color: '#8a919d', fontStyle: 'italic',
  },
  yayWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 60 },
  confetti: { fontSize: 32, marginBottom: 24, letterSpacing: 8 },
  yayTitle: { fontFamily: "var(--font-display)", fontSize: 72, fontWeight: 400, color: '#eef0f4', marginBottom: 16 },
  yayText: { fontFamily: "var(--font-body)", fontSize: 22, color: '#b4bac5', lineHeight: 1.6 },
};
