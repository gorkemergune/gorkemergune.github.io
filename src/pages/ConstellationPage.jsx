import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS, decodeShare } from '../components/fun/FunFrame';
import Composer from '../components/fun/Composer';

// Constellation — a surprise to send. The recipient joins numbered stars in
// order; each correct star draws the next line, a wrong one just says which
// star comes next. When the shape closes it glows and the message appears.
// Stars are real buttons in order (Tab / Enter work); the faint background
// field is a fixed decorative pattern, aria-hidden.
const ACC = '#9d6bff';
const SHAPES = {
  heart: [[50, 30], [62, 18], [78, 18], [88, 32], [84, 50], [68, 66], [50, 82], [32, 66], [16, 50], [12, 32], [22, 18], [38, 18]],
  star: [[50, 10], [61, 38], [90, 38], [67, 56], [76, 86], [50, 68], [24, 86], [33, 56], [10, 38], [39, 38]],
  smile: [[22, 40], [30, 30], [40, 40], [60, 40], [70, 30], [78, 40], [80, 58], [66, 74], [50, 80], [34, 74], [20, 58]],
};
const FIELD = Array.from({ length: 70 }, (_, i) => [((i * 37) % 100) + ((i * 7) % 3) * 0.4, ((i * 53) % 100), ((i * 13) % 3) + 1]);
const C = {
  en: { sub: 'Write a message that appears when they connect the stars.', ph: 'Out of all the stars, you’re still my favourite.', shape: 'Shape', shapes: { heart: 'Heart', star: 'Star', smile: 'Smile' }, for: 'For', next: 'Next star:', wrong: 'Not that one. Look for star', done: 'The constellation is complete.', from: 'from', again: 'Draw it again', own: 'Make your own', bad: 'This sky link is incomplete. You can write a new one below.', star: 'Star' },
  tr: { sub: 'Yıldızları birleştirdiklerinde ortaya çıkacak bir mesaj yaz.', ph: 'Bütün yıldızların içinde hâlâ en sevdiğim sensin.', shape: 'Şekil', shapes: { heart: 'Kalp', star: 'Yıldız', smile: 'Gülümseme' }, for: 'Kime:', next: 'Sıradaki yıldız:', wrong: 'O değil. Şu yıldızı bul:', done: 'Takımyıldız tamamlandı.', from: 'gönderen:', again: 'Yeniden çiz', own: 'Kendininkini oluştur', bad: 'Bu gökyüzü linki eksik. Aşağıdan yenisini yazabilirsin.', star: 'Yıldız' },
};

export default function ConstellationPage() {
  const { lang, t } = useLang();
  const c = C[lang] || C.en;
  const [params] = useSearchParams();
  const raw = params.get('d');
  const data = raw ? decodeShare(raw) : null;
  const valid = data && typeof data.m === 'string' && data.m.trim();
  const [shape, setShape] = useState('heart');
  return (
    <div className="fun-page narrow" style={{ '--fun-acc': ACC }}>
      <style>{FUN_CSS}{ST_CSS}</style>
      <FunHeader kind="send" accent={ACC} title={t('funStarsTitle')} sub={valid ? null : c.sub} />
      {valid ? <Sky data={data} c={c} /> : (
        <>
          {raw && <p className="fun-msg bad" role="alert" style={{ marginBottom: 16 }}>{c.bad}</p>}
          <Composer path="/fun/stars" title={t('funStarsTitle')} placeholder={c.ph} extraData={{ s: shape }}
            extra={(
              <fieldset className="fun-field" style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a919d', marginBottom: 6 }}>{c.shape}</legend>
                <div className="fun-row" role="radiogroup" aria-label={c.shape}>
                  {Object.keys(SHAPES).map((k) => (
                    <button key={k} type="button" role="radio" aria-checked={shape === k} className={`fun-btn small${shape === k ? '' : ' ghost'}`} onClick={() => setShape(k)}>{c.shapes[k]}</button>
                  ))}
                </div>
              </fieldset>
            )} />
        </>
      )}
    </div>
  );
}

function Sky({ data, c }) {
  const pts = SHAPES[data.s] || SHAPES.heart;
  const [n, setN] = useState(0); // stars joined so far
  const [miss, setMiss] = useState(false);
  const done = n >= pts.length;
  const path = useMemo(() => {
    const seq = pts.slice(0, n).map(([x, y]) => `${x},${y}`);
    if (done) seq.push(`${pts[0][0]},${pts[0][1]}`);
    return seq.join(' ');
  }, [n, pts, done]);

  const hit = (i) => {
    if (done) return;
    if (i === n) { setN(n + 1); setMiss(false); } else setMiss(true);
  };

  return (
    <div className="sk">
      {data.to && <p className="sk-for">{c.for} <b>{data.to}</b></p>}
      <div className={`sk-sky${done ? ' done' : ''}`}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="sk-svg">
          {FIELD.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r * 0.18} className="sk-dust" style={{ animationDelay: `${(i % 7) * 0.6}s` }} />)}
          {n > 1 || done ? <polyline points={path} className="sk-line" /> : null}
        </svg>
        {pts.map(([x, y], i) => (
          <button key={i} type="button" className={`sk-star${i < n ? ' on' : ''}${i === n && !done ? ' next' : ''}`} style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => hit(i)} aria-label={`${c.star} ${i + 1}`} disabled={done}>
            <span>{i + 1}</span>
          </button>
        ))}
      </div>
      <p className={`fun-msg${miss ? ' bad' : ''}`} role="status">{done ? c.done : miss ? `${c.wrong} ${n + 1}.` : `${c.next} ${n + 1} / ${pts.length}`}</p>
      {done && (
        <div className="fun-panel sk-card">
          <p className="sk-text">{data.m}</p>
          {data.f && <p className="sk-sign">— {c.from} {data.f}</p>}
          <div className="fun-row" style={{ justifyContent: 'center', marginTop: 18 }}>
            <button type="button" className="fun-btn ghost small" onClick={() => { setN(0); setMiss(false); }}><RotateCcw size={14} strokeWidth={1.8} /> {c.again}</button>
            <Link to="/fun/stars" className="fun-btn small">{c.own}</Link>
          </div>
        </div>
      )}
    </div>
  );
}

const ST_CSS = `
  .sk { display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .sk-for { font-family: var(--font-body); font-size: 18px; color: #c6cdd8; }
  .sk-for b { color: var(--fun-acc); }
  .sk-sky { position: relative; width: 100%; max-width: 460px; aspect-ratio: 1; border-radius: 20px; overflow: hidden; background: radial-gradient(90% 70% at 50% 100%, rgba(157,107,255,0.18), transparent 70%), radial-gradient(60% 50% at 20% 10%, rgba(0,240,255,0.08), transparent 70%), linear-gradient(180deg, #05060c, #0c0b1a); border: 1px solid #262340; }
  .sk-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .sk-dust { fill: #cfd6ff; opacity: 0.5; animation: sk-tw 4s ease-in-out infinite; }
  @keyframes sk-tw { 50% { opacity: 0.15; } }
  .sk-line { fill: none; stroke: #c4b5fd; stroke-width: 0.6; stroke-linejoin: round; stroke-linecap: round; vector-effect: non-scaling-stroke; stroke-width: 2px; filter: drop-shadow(0 0 3px rgba(196,181,253,0.8)); }
  .sk-sky.done .sk-line { stroke: #ffd166; filter: drop-shadow(0 0 6px rgba(255,209,102,0.9)); }
  .sk-star { position: absolute; width: 34px; height: 34px; margin: -17px 0 0 -17px; border-radius: 50%; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  .sk-star::before { content: ''; position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #e9e6ff; box-shadow: 0 0 10px rgba(233,230,255,0.9); transition: transform 0.25s; }
  .sk-star span { position: absolute; top: -6px; right: -4px; font-family: var(--font-mono); font-size: 10px; color: #9b95c9; }
  .sk-star.next::before { transform: scale(1.5); background: #fff; box-shadow: 0 0 16px #fff, 0 0 30px rgba(157,107,255,0.9); }
  .sk-star.on::before { background: #c4b5fd; }
  .sk-sky.done .sk-star::before { background: #ffd166; box-shadow: 0 0 14px rgba(255,209,102,0.9); }
  .sk-star:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  .sk-star:disabled { cursor: default; }
  .sk-card { width: 100%; text-align: center; animation: sk-rise 0.6s cubic-bezier(0.2,0.8,0.2,1); }
  @keyframes sk-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
  .sk-text { font-family: var(--font-display); font-weight: 500; font-size: clamp(20px, 4vw, 26px); line-height: 1.35; color: var(--c-ink); overflow-wrap: anywhere; }
  .sk-sign { margin-top: 10px; font-family: var(--font-mono); font-size: 12.5px; color: #aab2bf; }
  @media (prefers-reduced-motion: reduce) { .sk-dust, .sk-card { animation: none; } .sk-star::before { transition: none; } }
`;
