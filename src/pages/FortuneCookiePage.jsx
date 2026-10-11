import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS } from '../components/fun/FunFrame';

// Fortune Cookie — a randomised little ritual. Three taps crack the cookie;
// the paper slides out with a fortune (no repeats until the deck runs out)
// and six lucky numbers from 1–49. "Another cookie" starts over.
const ACC = '#ff9f1c';
const CRACKS = 3;
const C = {
  en: {
    sub: 'Tap the cookie three times to crack it open.', tap: ['Tap to crack', 'A crack! Again', 'Almost…'], lucky: 'Lucky numbers', another: 'Another cookie', cookie: 'Fortune cookie',
    f: ['A bug you fixed today will save someone an hour next month.', 'The answer is simpler than the question looks.', 'Take the walk. The idea follows you.', 'Someone is proud of you and hasn’t said it yet.', 'Your next draft will be better than this one, and that’s the point.', 'Good things compile on the first try at least once a year. Today might be the day.', 'Ask the question you think is obvious.', 'A small habit, repeated, beats a big plan, postponed.', 'Coffee with an old friend is closer than you think.', 'You are allowed to rest before you are tired.', 'The detour is part of the route.', 'Something you started months ago is about to pay off.'],
  },
  tr: {
    sub: 'Kırmak için kurabiyeye üç kez dokun.', tap: ['Kırmak için dokun', 'Çatladı! Bir daha', 'Neredeyse…'], lucky: 'Şanslı sayılar', another: 'Başka bir kurabiye', cookie: 'Şans kurabiyesi',
    f: ['Bugün düzelttiğin bir hata, gelecek ay birine bir saat kazandıracak.', 'Cevap, sorunun göründüğünden daha basit.', 'Yürüyüşe çık. Fikir arkandan gelir.', 'Biri seninle gurur duyuyor ve henüz söylemedi.', 'Bir sonraki taslağın bundan daha iyi olacak; mesele de bu.', 'Güzel şeyler yılda en az bir kez ilk denemede derlenir. Bugün o gün olabilir.', 'Bariz olduğunu düşündüğün soruyu sor.', 'Tekrarlanan küçük bir alışkanlık, ertelenen büyük bir planı yener.', 'Eski bir dostla bir kahve, sandığından daha yakın.', 'Yorulmadan önce dinlenmene izin var.', 'Sapak da yolun bir parçası.', 'Aylar önce başladığın bir şey karşılığını vermek üzere.'],
  },
};
const lucky = () => {
  const s = new Set(); while (s.size < 6) s.add(1 + Math.floor(Math.random() * 49));
  return [...s].sort((a, b) => a - b);
};

export default function FortuneCookiePage() {
  const { lang, t } = useLang();
  const c = C[lang] || C.en;
  const [cracks, setCracks] = useState(0);
  const [pick, setPick] = useState(null);
  const [nums, setNums] = useState([]);
  const [wobble, setWobble] = useState(false);
  const deck = useRef([]);
  const timer = useRef(null);
  const open = cracks >= CRACKS;
  useEffect(() => () => clearTimeout(timer.current), []);

  const draw = () => {
    if (!deck.current.length) deck.current = [...c.f.keys()].sort(() => Math.random() - 0.5);
    return deck.current.pop();
  };
  const tap = () => {
    if (open) return;
    const n = cracks + 1;
    setCracks(n); setWobble(true);
    clearTimeout(timer.current); timer.current = setTimeout(() => setWobble(false), 380);
    if (n >= CRACKS) { setPick(draw()); setNums(lucky()); }
  };
  const again = () => { setCracks(0); setPick(null); };

  return (
    <div className="fun-page narrow" style={{ '--fun-acc': ACC }}>
      <style>{FUN_CSS}{FC_CSS}</style>
      <FunHeader kind="me" accent={ACC} title={t('funFortuneTitle')} sub={c.sub} />
      <div className="fc">
        <button type="button" className={`fc-cookie${wobble ? ' wob' : ''}${open ? ' open' : ''}`} onClick={tap} disabled={open} aria-label={`${c.cookie}: ${c.tap[Math.min(cracks, CRACKS - 1)]}`} style={{ '--cr': cracks }}>
          <span className="fc-half l" aria-hidden="true" />
          <span className="fc-half r" aria-hidden="true" />
          <span className="fc-crack" aria-hidden="true" />
        </button>
        {!open && <p className="fun-hint" aria-live="polite">{c.tap[Math.min(cracks, CRACKS - 1)]} · {cracks}/{CRACKS}</p>}
        {open && pick != null && (
          <div className="fc-paper" role="status">
            <p className="fc-text">“{c.f[pick]}”</p>
            <p className="fc-lucky"><span>{c.lucky}</span> {nums.join(' · ')}</p>
          </div>
        )}
        {open && <button type="button" className="fun-btn" onClick={again}><RotateCcw size={15} strokeWidth={1.8} /> {c.another}</button>}
      </div>
    </div>
  );
}

const FC_CSS = `
  .fc { display: flex; flex-direction: column; align-items: center; gap: 18px; }
  .fc-cookie { position: relative; width: 220px; height: 150px; border: none; background: none; cursor: pointer; padding: 0; }
  .fc-cookie:focus-visible { outline: 2px solid var(--c-ink); outline-offset: 8px; border-radius: 16px; }
  .fc-cookie:disabled { cursor: default; }
  .fc-half { position: absolute; top: 20px; width: 112px; height: 110px; background: radial-gradient(circle at 60% 35%, #ffd89a, #e9a64b 60%, #b9772a); box-shadow: inset -8px -10px 0 rgba(0,0,0,0.12), 0 18px 30px rgba(0,0,0,0.45); transition: transform 0.6s cubic-bezier(0.2,0.8,0.2,1); }
  .fc-half.l { left: 0; border-radius: 80% 10% 30% 90% / 90% 20% 30% 80%; transform-origin: 100% 60%; }
  .fc-half.r { right: 0; border-radius: 10% 80% 90% 30% / 20% 90% 80% 30%; transform-origin: 0% 60%; }
  .fc-crack { position: absolute; left: 50%; top: 34px; width: 3px; height: calc(var(--cr) * 26px); background: #6d3f10; transform: translateX(-50%) rotate(8deg); border-radius: 2px; transition: height 0.25s; }
  .fc-cookie.wob { animation: fc-wob 0.38s; }
  @keyframes fc-wob { 25% { transform: rotate(-6deg) scale(1.02); } 60% { transform: rotate(5deg); } }
  .fc-cookie.open .fc-half.l { transform: translateX(-40px) rotate(-28deg); }
  .fc-cookie.open .fc-half.r { transform: translateX(40px) rotate(28deg); }
  .fc-cookie.open .fc-crack { opacity: 0; }
  .fc-paper { width: 100%; max-width: 440px; padding: 22px 26px; background: linear-gradient(180deg, #fbf6e9, #efe5cc); color: #2a2418; border-radius: 4px; box-shadow: 0 20px 40px rgba(0,0,0,0.45); text-align: center; animation: fc-slide 0.6s cubic-bezier(0.2,0.8,0.2,1); }
  @keyframes fc-slide { from { opacity: 0; transform: translateY(-24px) scaleX(0.6); } to { opacity: 1; transform: none; } }
  .fc-text { font-family: var(--font-display); font-weight: 500; font-size: 20px; line-height: 1.45; }
  .fc-lucky { margin-top: 14px; font-family: var(--font-mono); font-size: 13px; color: #8a5a12; }
  .fc-lucky span { display: block; font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: #9b8a66; margin-bottom: 4px; }
  @media (prefers-reduced-motion: reduce) { .fc-cookie.wob, .fc-paper { animation: none; } .fc-half, .fc-crack { transition: none; } }
`;
