import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const flowers = ['🌸', '🌺', '🌷', '💐', '🌹', '🌻', '💮', '🪻', '🌼'];

function FallingFlower({ delay, left, duration, flower }) {
  return (
    <div style={{
      position: 'fixed',
      top: -60,
      left: `${left}%`,
      fontSize: 28 + Math.random() * 16,
      animation: `flowerFall ${duration}s linear ${delay}s infinite`,
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.85,
    }}>
      {flower}
    </div>
  );
}

function SideFlower({ top, side, flower, animDelay }) {
  return (
    <div style={{
      position: 'fixed',
      top: `${top}%`,
      [side]: -10,
      fontSize: 36,
      animation: `sideBloom 3s ease-in-out ${animDelay}s infinite alternate`,
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.7,
    }}>
      {flower}
    </div>
  );
}

export default function MothersDay() {
  const { t } = useLang();
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      setSparkles(prev => {
        const next = [...prev, {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
        }];
        if (next.length > 12) next.shift();
        return next;
      });
    }, 800);
    return () => clearInterval(id);
  }, []);

  const fallingFlowers = Array.from({ length: 18 }, (_, i) => ({
    delay: i * 0.7,
    left: Math.random() * 100,
    duration: 6 + Math.random() * 5,
    flower: flowers[i % flowers.length],
  }));

  const sideFlowers = [
    { top: 15, side: 'left', flower: '🌸', animDelay: 0 },
    { top: 35, side: 'left', flower: '🌷', animDelay: 0.5 },
    { top: 55, side: 'left', flower: '🌺', animDelay: 1 },
    { top: 75, side: 'left', flower: '🌹', animDelay: 1.5 },
    { top: 20, side: 'right', flower: '🌻', animDelay: 0.3 },
    { top: 40, side: 'right', flower: '💐', animDelay: 0.8 },
    { top: 60, side: 'right', flower: '🪻', animDelay: 1.3 },
    { top: 80, side: 'right', flower: '🌼', animDelay: 1.8 },
  ];

  return (
    <div style={s.container}>
      <style>{`
        @keyframes flowerFall {
          0% { transform: translateY(-60px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes sideBloom {
          0% { transform: translateX(0) scale(0.8); opacity: 0.4; }
          100% { transform: translateX(20px) scale(1.2); opacity: 0.9; }
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
          50% { text-shadow: 0 0 40px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.3); }
        }
      `}</style>

      {fallingFlowers.map((f, i) => (
        <FallingFlower key={i} {...f} />
      ))}
      {sideFlowers.map((f, i) => (
        <SideFlower key={`side-${i}`} {...f} />
      ))}

      {sparkles.map(sp => (
        <div key={sp.id} style={{
          position: 'fixed',
          left: `${sp.x}%`,
          top: `${sp.y}%`,
          fontSize: 18,
          animation: 'sparkle 1.5s ease-in-out forwards',
          pointerEvents: 'none',
          zIndex: 0,
        }}>✨</div>
      ))}

      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.center}>
        <div style={s.heartWrap}>
          <span style={s.bigHeart}>❤️</span>
        </div>

        <div style={s.bouquet}>💐🌸🌷🌹🌺🌸💐</div>

        <h1 style={s.title}>{t('mothersDayTitle')}</h1>
        <p style={s.subtitle}>{t('mothersDaySub')}</p>

        <div style={s.flowerRow}>
          {['🌸', '🌷', '🌹', '🌺', '🌻'].map((f, i) => (
            <span key={i} style={{ ...s.flowerItem, animationDelay: `${i * 0.2}s` }}>{f}</span>
          ))}
        </div>

        <div style={s.messageCard}>
          <p style={s.message}>{t('mothersDayMessage')}</p>
        </div>

        <div style={s.bottomHeart}>🩷</div>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2, overflow: 'hidden' },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6b6a66', marginBottom: 60, cursor: 'pointer', position: 'relative', zIndex: 10 },
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 20, position: 'relative', zIndex: 5 },
  heartWrap: { marginBottom: 24 },
  bigHeart: { fontSize: 80, display: 'inline-block', animation: 'heartPulse 1.5s ease-in-out infinite' },
  bouquet: { fontSize: 32, letterSpacing: 8, marginBottom: 32 },
  title: {
    fontFamily: "'Instrument Serif', serif", fontSize: 52, fontWeight: 400,
    lineHeight: 1.1, letterSpacing: '-0.015em', color: '#1a1a1a',
    marginBottom: 12, animation: 'textGlow 3s ease-in-out infinite',
  },
  subtitle: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 26, color: '#ec4899',
    marginBottom: 40, fontWeight: 500, fontStyle: 'italic',
  },
  flowerRow: { display: 'flex', gap: 16, marginBottom: 40 },
  flowerItem: { fontSize: 36, display: 'inline-block', animation: 'heartPulse 2s ease-in-out infinite' },
  messageCard: {
    background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
    border: '1px solid #f9a8d4', borderRadius: 16, padding: '32px 40px',
    maxWidth: 500, boxShadow: '0 8px 32px rgba(236, 72, 153, 0.1)',
  },
  message: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 18,
    lineHeight: 1.7, color: '#831843', fontWeight: 400,
  },
  bottomHeart: { fontSize: 48, marginTop: 40 },
};
