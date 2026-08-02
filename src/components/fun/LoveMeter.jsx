import { useState, useRef, useCallback, useEffect } from 'react';
import { Heart, RefreshCw } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import { compatibilityScore } from '../../utils/hashCompatibility.js';
import { loadingMessages, tierFor, CONFETTI_THRESHOLD } from '../../data/loveMessages.js';
import { prefersReducedMotion } from '../../utils/prefersReducedMotion.js';
import ProgressAnimation from './ProgressAnimation.jsx';
import Confetti from './Confetti.jsx';

// FEATURE 1 — Love Meter ❤️  (entertainment only, never a real test)
//
// The score is fully deterministic: the same two names always yield the same
// percentage (see utils/hashCompatibility.js). Flow: idle → calculating (~3s of
// playful loading lines + progress bar) → result (percentage counts up, a tier
// message appears, confetti fires for soulmate-level scores).

const CALC_DURATION = 3000;

// Smoothly counts a number up to `target` over `duration` ms, easing out.
function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced) { setValue(target); return; }

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const frac = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - frac, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (frac < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);

  return value;
}

function ResultCard({ score, lang, onReset, t }) {
  const shown = useCountUp(score, true);
  const tier = tierFor(score);
  const celebrate = score >= CONFETTI_THRESHOLD;
  const [confettiOn, setConfettiOn] = useState(celebrate);

  return (
    <div className="lm-result" role="status" aria-live="polite">
      {confettiOn && <Confetti onDone={() => setConfettiOn(false)} />}

      <div className="lm-result-badge">
        <Heart size={15} strokeWidth={1.8} fill="#ff4d6d" style={{ color: '#ff4d6d' }} />
        {t('loveCompatibility')}
      </div>

      <div className="lm-score" aria-label={`${score}%`}>
        {shown}<span className="lm-score-pct">%</span>
      </div>

      <div className="lm-heart-row" aria-hidden="true">
        <Heart className="lm-big-heart" size={44} strokeWidth={1.4} fill="#ff4d6d" style={{ color: '#ff4d6d' }} />
      </div>

      <p className="lm-message">{tier[lang] || tier.en}</p>

      <button type="button" className="lm-again" onClick={onReset}>
        <RefreshCw size={15} strokeWidth={1.8} /> {t('loveAgain')}
      </button>
    </div>
  );
}

export default function LoveMeter() {
  const { lang, t } = useLang();
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | calculating | result
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);
  const scoreRef = useRef(0);

  const messages = loadingMessages[lang] || loadingMessages.en;

  const handleCalculate = useCallback(() => {
    if (!name1.trim() || !name2.trim()) {
      setError(true);
      return;
    }
    setError(false);
    scoreRef.current = compatibilityScore(name1, name2);
    setPhase('calculating');
  }, [name1, name2]);

  const handleComplete = useCallback(() => {
    setScore(scoreRef.current);
    setPhase('result');
  }, []);

  const handleReset = useCallback(() => {
    setPhase('idle');
    setScore(0);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') handleCalculate();
  };

  return (
    <div className="lm-card">
      <style>{css}</style>

      {phase === 'idle' && (
        <div className="lm-form">
          <label className="lm-field">
            <span className="lm-label">{t('loveName1Label')}</span>
            <input
              type="text"
              className="lm-input"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t('loveName1Placeholder')}
              aria-label={t('loveName1Label')}
              autoComplete="off"
              maxLength={40}
            />
          </label>

          <div className="lm-amp" aria-hidden="true">
            <Heart size={22} strokeWidth={1.6} fill="#ff4d6d" style={{ color: '#ff4d6d' }} />
          </div>

          <label className="lm-field">
            <span className="lm-label">{t('loveName2Label')}</span>
            <input
              type="text"
              className="lm-input"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t('loveName2Placeholder')}
              aria-label={t('loveName2Label')}
              autoComplete="off"
              maxLength={40}
            />
          </label>

          <button type="button" className="lm-calc" onClick={handleCalculate}>
            <Heart size={18} strokeWidth={1.8} fill="currentColor" />
            {t('loveCalculate')}
          </button>

          <p className="lm-error" role="alert" style={{ visibility: error ? 'visible' : 'hidden' }}>
            {t('loveEmptyError')}
          </p>
        </div>
      )}

      {phase === 'calculating' && (
        <ProgressAnimation messages={messages} duration={CALC_DURATION} onComplete={handleComplete} />
      )}

      {phase === 'result' && (
        <ResultCard score={score} lang={lang} onReset={handleReset} t={t} />
      )}
    </div>
  );
}

const css = `
  .lm-card {
    position: relative; z-index: 2;
    background:
      radial-gradient(120% 90% at 50% 0%, rgba(255,77,109,0.07), transparent 60%),
      linear-gradient(160deg, rgba(20,16,26,0.86), rgba(12,12,22,0.86));
    border: 1px solid #241c30;
    border-radius: 22px;
    padding: 40px;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.35), inset 0 0 40px rgba(255,77,109,0.04);
    min-height: 320px;
    display: flex; flex-direction: column; justify-content: center;
  }
  @media (max-width: 560px) { .lm-card { padding: 28px 22px; border-radius: 18px; } }

  /* ---- Form ---- */
  .lm-form { display: flex; flex-direction: column; gap: 18px; }
  .lm-field { display: flex; flex-direction: column; gap: 8px; }
  .lm-label {
    font-family: 'JetBrains Mono', monospace; font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #8a7a86;
  }
  .lm-input {
    width: 100%; padding: 14px 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid #2a2238; border-radius: 12px;
    font-family: 'Instrument Sans', sans-serif; font-size: 16px; color: #ececf4;
    transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
  }
  .lm-input::placeholder { color: #5a5a70; }
  .lm-input:focus {
    outline: none; border-color: #ff4d6d88;
    box-shadow: 0 0 0 3px rgba(255,77,109,0.14);
    background: rgba(255,255,255,0.05);
  }
  .lm-amp { display: flex; justify-content: center; margin: -4px 0; }

  .lm-calc {
    margin-top: 8px;
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 16px 24px; width: 100%;
    border: none; border-radius: 14px; cursor: pointer;
    font-family: 'Instrument Sans', sans-serif; font-size: 17px; font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #ff4d6d, #f472b6);
    box-shadow: 0 10px 30px rgba(255,77,109,0.32);
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s, filter 0.3s;
  }
  .lm-calc:hover { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(255,77,109,0.42); filter: brightness(1.06); }
  .lm-calc:active { transform: translateY(0); }

  .lm-error {
    font-family: 'Instrument Sans', sans-serif; font-size: 13px;
    color: #ff8095; text-align: center; margin-top: 2px; min-height: 18px;
  }

  /* ---- Result ---- */
  .lm-result {
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px;
    animation: lm-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes lm-in { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: none; } }

  .lm-result-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #d8b8c2;
  }
  .lm-score {
    font-family: 'Instrument Serif', serif; font-weight: 400;
    font-size: 104px; line-height: 1; letter-spacing: -0.02em;
    background: linear-gradient(135deg, #ff4d6d 0%, #f472b6 50%, #9d6bff 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    font-variant-numeric: tabular-nums;
  }
  @media (max-width: 560px) { .lm-score { font-size: 76px; } }
  .lm-score-pct { font-size: 0.5em; -webkit-text-fill-color: #f472b6; }

  .lm-heart-row { margin: -2px 0 2px; }
  .lm-big-heart { animation: lm-beat 1.1s ease-in-out infinite; }
  @keyframes lm-beat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.18); }
    30% { transform: scale(1); }
    45% { transform: scale(1.1); }
  }

  .lm-message {
    font-family: 'Instrument Serif', serif; font-size: 24px; line-height: 1.35;
    color: #ececf4; max-width: 420px;
  }
  @media (max-width: 560px) { .lm-message { font-size: 20px; } }

  .lm-again {
    margin-top: 10px;
    display: inline-flex; align-items: center; gap: 9px;
    padding: 11px 20px; border-radius: 999px; cursor: pointer;
    border: 1px solid #ff4d6d44;
    background: linear-gradient(160deg, rgba(255,77,109,0.12), rgba(157,107,255,0.08));
    color: #f0dfe4; font-family: 'Instrument Sans', sans-serif; font-size: 14px; font-weight: 500;
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), border-color 0.3s, box-shadow 0.3s;
  }
  .lm-again:hover { transform: translateY(-2px); border-color: #ff4d6daa; box-shadow: 0 0 26px rgba(255,77,109,0.22); }
  .lm-again svg { transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1); }
  .lm-again:hover svg { transform: rotate(-180deg); }
`;
