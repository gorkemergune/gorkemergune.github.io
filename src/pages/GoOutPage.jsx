import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const scenes = [
  { emoji: '🥺', bg: '#f0f4ff' },
  { emoji: '😢', bg: '#fef3f2' },
  { emoji: '😿', bg: '#fef9ee' },
  { emoji: '😞', bg: '#fdf2f8' },
  { emoji: '💔', bg: '#fef2f2' },
  { emoji: '😭', bg: '#f5f3ff' },
];

const rejectTexts = {
  en: [
    "Come on, please?",
    "Are you really saying no?",
    "But the weather is so nice!",
    "I won't take no for an answer!",
    "LAST CHANCE!",
  ],
  tr: [
    "Hadi ama, lütfen?",
    "Gerçekten hayır mı diyorsun?",
    "Ama hava çok güzel!",
    "Hayır kabul etmiyorum!",
    "SON ŞANS!",
  ],
};

export default function GoOutPage() {
  const { t, lang } = useLang();
  const [yesSize, setYesSize] = useState(16);
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noFlying, setNoFlying] = useState(false);
  const [noGone, setNoGone] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const handleNo = () => {
    const next = noCount + 1;
    setNoCount(next);
    setYesSize(s => s + 16);

    if (next >= 5) {
      setNoFlying(true);
      setTimeout(() => setNoGone(true), 1500);
    } else {
      setNoPos({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 100,
      });
    }
  };

  const scene = scenes[noCount % scenes.length];
  const texts = rejectTexts[lang] || rejectTexts.en;

  if (accepted) {
    return (
      <div style={s.container}>
        <Link to="/fun" className="link-hover" style={s.back}>
          <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
        </Link>
        <div style={s.yayWrap}>
          <div style={s.confetti}>🎉🥳☀️🌤️🎊✨🎉🥳</div>
          <h1 style={s.yayTitle}>{t('goOutYayTitle')}</h1>
          <p style={s.yayText}>{t('goOutYayText')}</p>
          <div style={{ fontSize: 80, marginTop: 20 }}>🚶‍♂️🚶‍♀️</div>
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
      `}</style>

      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.center}>
        <div style={{ ...s.sceneCard, background: scene.bg }}>
          <div style={{ fontSize: 72 }}>{scene.emoji}</div>
          {noCount > 0 && noCount <= 5 && (
            <p style={s.sadText}>{texts[Math.min(noCount - 1, texts.length - 1)]}</p>
          )}
        </div>

        <h1 style={s.title}>{t('goOutPageTitle')}</h1>
        <p style={s.sub}>{t('goOutPageSub')}</p>

        <div style={s.btnRow}>
          <button
            onClick={() => setAccepted(true)}
            style={{
              ...s.yesBtn,
              fontSize: yesSize,
              padding: `${Math.max(12, yesSize * 0.7)}px ${Math.max(32, yesSize * 1.6)}px`,
            }}
          >
            {t('goOutYes')} {noCount >= 3 ? '🥺👉👈' : noCount >= 1 ? '☀️' : ''}
          </button>

          {!noGone && (
            <div
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
                {t('goOutNo')}
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
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6b6a66', marginBottom: 60, cursor: 'pointer' },
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 20 },
  sceneCard: {
    width: 240, height: 200, borderRadius: 12, border: '1px solid #e2e0da',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 12, marginBottom: 32, transition: 'background 0.4s',
  },
  sadText: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: '#4a4a48', fontStyle: 'italic', padding: '0 16px' },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.015em', color: '#1a1a1a', marginBottom: 12 },
  sub: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 22, color: '#4a4a48', marginBottom: 40 },
  btnRow: { display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center', minHeight: 80 },
  yesBtn: {
    fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600,
    background: '#1a1a1a', color: '#f4f3ef', border: 'none', borderRadius: 6,
    cursor: 'pointer', transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
    whiteSpace: 'nowrap',
  },
  noBtn: {
    fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500,
    background: 'transparent', color: '#6b6a66',
    border: '1px solid #d6d4cd', borderRadius: 6, cursor: 'pointer',
    transition: 'all 0.3s ease', whiteSpace: 'nowrap',
  },
  noGoneText: {
    marginTop: 20, fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 15, color: '#6b6a66', fontStyle: 'italic',
  },
  yayWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 60 },
  confetti: { fontSize: 32, marginBottom: 24, letterSpacing: 8 },
  yayTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, color: '#1a1a1a', marginBottom: 16 },
  yayText: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 22, color: '#4a4a48', lineHeight: 1.6 },
};
