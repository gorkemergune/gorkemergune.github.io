import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS, decodeShare } from '../components/fun/FunFrame';
import Composer from '../components/fun/Composer';
import Confetti from '../components/fun/Confetti';

// Gift Box — a surprise to send. Without ?d the sender writes the message;
// with ?d the recipient sees a wrapped box: three taps on the ribbon loosen
// it, then the lid lifts and the card rises out. Button = keyboard-friendly;
// reduced motion swaps the shake/lift for a plain fade.
const ACC = '#ff9f1c';
const TAPS = 3;
const C = {
  en: { sub: 'Wrap a short message in a gift box and send the link.', ph: 'You made my week. Thank you.', for: 'A gift for', tap: ['Tap the ribbon to open', 'It’s loosening… tap again', 'One more tap!'], from: 'from', replay: 'Wrap it again', own: 'Make your own', bad: 'This gift link is incomplete. You can write a new one below.' },
  tr: { sub: 'Kısa bir mesajı hediye kutusuna sar ve linki gönder.', ph: 'Haftamı güzelleştirdin. Teşekkürler.', for: 'Bir hediye:', tap: ['Açmak için kurdeleye dokun', 'Gevşiyor… bir daha dokun', 'Son bir dokunuş!'], from: 'gönderen:', replay: 'Yeniden paketle', own: 'Kendininkini oluştur', bad: 'Bu hediye linki eksik. Aşağıdan yenisini yazabilirsin.' },
};

export default function GiftBoxPage() {
  const { lang, t } = useLang();
  const c = C[lang] || C.en;
  const [params] = useSearchParams();
  const raw = params.get('d');
  const data = raw ? decodeShare(raw) : null;
  const valid = data && typeof data.m === 'string' && data.m.trim();

  return (
    <div className="fun-page narrow" style={{ '--fun-acc': ACC }}>
      <style>{FUN_CSS}{GIFT_CSS}</style>
      <FunHeader kind="send" accent={ACC} title={t('funGiftTitle')} sub={valid ? null : c.sub} />
      {valid ? <Unwrap data={data} c={c} /> : (
        <>
          {raw && <p className="fun-msg bad" role="alert" style={{ marginBottom: 16 }}>{c.bad}</p>}
          <Composer path="/fun/gift" title={t('funGiftTitle')} placeholder={c.ph} />
        </>
      )}
    </div>
  );
}

function Unwrap({ data, c }) {
  const [taps, setTaps] = useState(0);
  const [shake, setShake] = useState(false);
  const [party, setParty] = useState(false);
  const timer = useRef(null);
  const open = taps >= TAPS;
  useEffect(() => () => clearTimeout(timer.current), []);

  const tap = () => {
    if (open) return;
    const n = taps + 1;
    setTaps(n);
    setShake(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShake(false), 420);
    if (n >= TAPS) setParty(true);
  };
  const replay = () => { setTaps(0); setParty(false); };

  return (
    <div className="gb">
      {data.to && <p className="gb-for">{c.for} <b>{data.to}</b></p>}
      <button type="button" className={`gb-box${shake ? ' shake' : ''}${open ? ' open' : ''}`} onClick={tap} disabled={open} aria-label={open ? '' : c.tap[Math.min(taps, TAPS - 1)]} style={{ '--loose': taps }}>
        <span className="gb-lid" aria-hidden="true"><span className="gb-bow" /></span>
        <span className="gb-base" aria-hidden="true" />
        <span className="gb-ribbon-v" aria-hidden="true" />
      </button>
      {!open && <p className="fun-hint" aria-live="polite">{c.tap[Math.min(taps, TAPS - 1)]} · {taps}/{TAPS}</p>}
      {open && (
        <div className="gb-card fun-panel" role="status">
          <p className="gb-text">{data.m}</p>
          {data.f && <p className="gb-sign">— {c.from} {data.f}</p>}
          <div className="fun-row" style={{ justifyContent: 'center', marginTop: 20 }}>
            <button type="button" className="fun-btn ghost small" onClick={replay}><RotateCcw size={14} strokeWidth={1.8} /> {c.replay}</button>
            <Link to="/fun/gift" className="fun-btn small">{c.own}</Link>
          </div>
        </div>
      )}
      {party && <Confetti onDone={() => setParty(false)} />}
    </div>
  );
}

const GIFT_CSS = `
  .gb { display: flex; flex-direction: column; align-items: center; gap: 18px; }
  .gb-for { font-family: var(--font-body); font-size: 18px; color: #c6cdd8; }
  .gb-for b { color: var(--fun-acc); font-weight: 600; }
  .gb-box { position: relative; width: 220px; height: 210px; border: none; background: none; cursor: pointer; padding: 0; }
  .gb-box:focus-visible { outline: 2px solid var(--c-ink); outline-offset: 8px; border-radius: 12px; }
  .gb-box:disabled { cursor: default; }
  .gb-base { position: absolute; left: 14px; right: 14px; bottom: 0; height: 130px; border-radius: 10px; background: linear-gradient(180deg, #ff6b6b, #d6455a); box-shadow: inset 0 -12px 0 rgba(0,0,0,0.15), 0 24px 40px rgba(0,0,0,0.45); }
  .gb-ribbon-v { position: absolute; left: 50%; bottom: 0; width: 26px; height: 130px; transform: translateX(-50%); background: linear-gradient(90deg, #ffd166, #ffb703); opacity: calc(1 - var(--loose) * 0.22); transition: opacity 0.3s; }
  .gb-lid { position: absolute; left: 0; right: 0; top: 44px; height: 44px; border-radius: 10px; background: linear-gradient(180deg, #ff8080, #ff5e6c); box-shadow: 0 6px 0 rgba(0,0,0,0.12); transition: transform 0.7s cubic-bezier(0.2,0.8,0.2,1), opacity 0.7s; z-index: 2; }
  .gb-lid::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 26px; transform: translateX(-50%); background: linear-gradient(90deg, #ffd166, #ffb703); }
  .gb-bow { position: absolute; left: 50%; top: -34px; width: 80px; height: 40px; transform: translateX(-50%) rotate(calc(var(--loose) * 9deg)); transition: transform 0.3s; }
  .gb-bow::before, .gb-bow::after { content: ''; position: absolute; top: 4px; width: 38px; height: 30px; border: 8px solid #ffd166; border-radius: 50% 50% 10% 50%; }
  .gb-bow::before { left: 0; transform: rotate(-20deg); }
  .gb-bow::after { right: 0; transform: rotate(20deg) scaleX(-1); }
  .gb-box.shake { animation: gb-shake 0.42s; }
  @keyframes gb-shake { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-5deg); } 50% { transform: rotate(4deg); } 75% { transform: rotate(-2deg); } }
  .gb-box.open .gb-lid { transform: translate(40px, -90px) rotate(24deg); opacity: 0; }
  .gb-box.open .gb-ribbon-v { opacity: 0; }
  .gb-card { width: 100%; text-align: center; animation: gb-rise 0.6s cubic-bezier(0.2,0.8,0.2,1); border-color: color-mix(in srgb, var(--fun-acc) 40%, #22262e); }
  @keyframes gb-rise { from { opacity: 0; transform: translateY(30px) scale(0.96); } to { opacity: 1; transform: none; } }
  .gb-text { font-family: var(--font-display); font-weight: 500; font-size: clamp(22px, 4vw, 28px); line-height: 1.35; color: var(--c-ink); overflow-wrap: anywhere; }
  .gb-sign { margin-top: 12px; font-family: var(--font-mono); font-size: 13px; color: #aab2bf; }
  @media (prefers-reduced-motion: reduce) {
    .gb-box.shake, .gb-card { animation: none; }
    .gb-lid, .gb-bow, .gb-ribbon-v { transition: opacity 0.2s; }
    .gb-box.open .gb-lid { transform: none; }
  }
`;
