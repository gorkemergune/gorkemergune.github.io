import { Sparkles, RefreshCw } from 'lucide-react';
import { useLang } from '../../i18n.jsx';

// Premium glass card that presents the landed challenge, with a "Spin Again"
// action wired back to the wheel. Purely presentational.
export default function WheelResultCard({ index, challenge, onSpinAgain, disabled }) {
  const { t } = useLang();

  return (
    <div className="wr-card" role="status" aria-live="polite">
      <style>{css}</style>

      <div className="wr-badge">
        <Sparkles size={14} strokeWidth={1.7} style={{ color: '#9d6bff' }} />
        {t('wheelChallengeLabel')}
        {typeof index === 'number' && <span className="wr-num">#{index + 1}</span>}
      </div>

      <p className="wr-text">{challenge}</p>

      <button type="button" className="wr-again" onClick={onSpinAgain} disabled={disabled}>
        <RefreshCw size={16} strokeWidth={1.8} /> {t('wheelAgain')}
      </button>
    </div>
  );
}

const css = `
  .wr-card {
    position: relative; z-index: 2;
    margin-top: 32px;
    background:
      radial-gradient(120% 90% at 50% 0%, rgba(157,107,255,0.09), transparent 62%),
      linear-gradient(160deg, rgba(18,16,28,0.88), rgba(12,12,22,0.88));
    border: 1px solid #2a2340;
    border-radius: 20px;
    padding: 32px 30px;
    text-align: center;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 18px 50px rgba(0,0,0,0.35), inset 0 0 40px rgba(157,107,255,0.05);
    animation: wr-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes wr-in { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: none; } }

  .wr-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'JetBrains Mono', monospace; font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #a596c4;
    margin-bottom: 16px;
  }
  .wr-num { color: #6a6a82; }

  .wr-text {
    font-family: 'Instrument Serif', serif;
    font-size: 30px; line-height: 1.3; color: #f0f0f6;
    letter-spacing: -0.01em; max-width: 460px; margin: 0 auto;
  }
  @media (max-width: 560px) { .wr-text { font-size: 24px; } }

  .wr-again {
    margin-top: 26px;
    display: inline-flex; align-items: center; gap: 10px;
    padding: 13px 26px; border-radius: 999px; cursor: pointer;
    border: none; color: #fff;
    font-family: 'Instrument Sans', sans-serif; font-size: 15px; font-weight: 600;
    background: linear-gradient(135deg, #9d6bff, #4d96ff);
    box-shadow: 0 10px 30px rgba(157,107,255,0.34);
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s, filter 0.3s;
  }
  .wr-again:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(157,107,255,0.44); filter: brightness(1.06); }
  .wr-again:active:not(:disabled) { transform: translateY(0); }
  .wr-again:disabled { opacity: 0.55; cursor: default; }
  .wr-again svg { transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1); }
  .wr-again:hover:not(:disabled) svg { transform: rotate(180deg); }
`;
