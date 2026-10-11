import { useRef, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS } from '../components/fun/FunFrame';
import Wheel from '../components/fun/Wheel.jsx';
import WheelResultCard from '../components/fun/WheelResultCard.jsx';
import { wheelChallenges } from '../data/wheelChallenges.js';

// FEATURE 2 — Spin the Wheel 🎡 page. Owns the spin/result state and composes
// the reusable Wheel + WheelResultCard. Before the first spin a primary button
// starts the wheel; afterward the result card's "Spin Again" drives it.
export default function SpinWheelPage() {
  const { lang, t } = useLang();
  const wheelRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null); // landed slice index or null

  const challenges = wheelChallenges[lang] || wheelChallenges.en;

  const handleSpinStart = useCallback(() => setSpinning(true), []);
  const handleLanded = useCallback((index) => {
    setSpinning(false);
    setResult(index);
  }, []);
  const doSpin = useCallback(() => wheelRef.current?.spin(), []);

  return (
    <div className="fun-page" style={{ maxWidth: s.container.maxWidth, '--fun-acc': '#9d6bff' }}>
      <style>{FUN_CSS}</style>
      <FunHeader kind="me" accent="#9d6bff" title={t('funWheelTitle')} sub={t('wheelSub')}></FunHeader>

      <Wheel ref={wheelRef} onSpinStart={handleSpinStart} onLanded={handleLanded} />

      {result === null ? (
        <div style={s.spinRow}>
          <button type="button" className="sw-spin" onClick={doSpin} disabled={spinning}>
            <Sparkles size={18} strokeWidth={1.8} />
            {spinning ? t('wheelSpinning') : t('wheelSpin')}
          </button>
          <p style={s.hint}>{t('wheelHint')}</p>
        </div>
      ) : (
        <WheelResultCard
          index={result}
          challenge={challenges[result]}
          onSpinAgain={doSpin}
          disabled={spinning}
        />
      )}

      <style>{`
        .sw-spin {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 40px; border: none; border-radius: 14px; cursor: pointer;
          font-family: var(--font-body); font-size: 17px; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, #9d6bff, #4d96ff);
          box-shadow: 0 12px 34px rgba(157,107,255,0.36);
          transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s, filter 0.3s;
        }
        .sw-spin:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 42px rgba(157,107,255,0.46); filter: brightness(1.06); }
        .sw-spin:active:not(:disabled) { transform: translateY(0); }
        .sw-spin:disabled { opacity: 0.6; cursor: default; }
      `}</style>
    </div>
  );
}

const s = {
  container: { maxWidth: 620, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: '0.06em', color: '#5c6370', marginBottom: 48, cursor: 'pointer' },
  header: { marginBottom: 40, textAlign: 'center' },
  title: { fontFamily: "var(--font-display)", fontSize: 60, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 16 },
  desc: { fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, color: '#8b929e', maxWidth: 460, margin: '0 auto' },
  spinRow: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 36 },
  hint: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.06em', color: '#6b7280' },
};
