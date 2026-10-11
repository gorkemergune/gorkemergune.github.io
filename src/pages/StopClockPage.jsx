import { useEffect, useRef, useState } from 'react';
import { Timer } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS } from '../components/fun/FunFrame';

// Stop the Clock — a timing challenge. Start, then stop as close to 5.000 s
// as you can; the readout hides after the first second, so it is your inner
// clock against the target. Space / Enter or the big button; one rAF loop,
// cancelled on stop and on unmount.
const TARGET = 5000;
const SHOW_FOR = 1000;
const ACC = '#00e5a0';
const C = {
  en: { sub: 'Start the timer and stop it at exactly 5.000 seconds. The display goes dark after the first second.', start: 'Start', stop: 'Stop', again: 'Try again', hidden: 'Counting in the dark…', off: 'off by', early: 'early', late: 'late', best: 'Best', tries: 'Tries', last: 'Last', key: 'Space or Enter works too', r: [[30, 'Perfect timing!'], [100, 'Excellent!'], [250, 'Very close.'], [600, 'Not bad.'], [Infinity, 'Keep practising.']] },
  tr: { sub: 'Sayacı başlat ve tam 5,000 saniyede durdur. Ekran ilk saniyeden sonra kararıyor.', start: 'Başlat', stop: 'Durdur', again: 'Tekrar dene', hidden: 'Karanlıkta sayıyor…', off: 'fark:', early: 'erken', late: 'geç', best: 'En iyi', tries: 'Deneme', last: 'Son', key: 'Boşluk veya Enter da çalışır', r: [[30, 'Kusursuz zamanlama!'], [100, 'Harika!'], [250, 'Çok yakın.'], [600, 'Fena değil.'], [Infinity, 'Pratik yapmaya devam.']] },
};
const fmt = (ms, lang) => (ms / 1000).toFixed(3).replace('.', lang === 'tr' ? ',' : '.');

export default function StopClockPage() {
  const { lang, t } = useLang();
  const c = C[lang] || C.en;
  const [phase, setPhase] = useState('idle'); // idle | running | done
  const [shown, setShown] = useState(0);
  const [result, setResult] = useState(null);
  const [best, setBest] = useState(null);
  const [tries, setTries] = useState(0);
  const t0 = useRef(0);
  const raf = useRef(0);
  const btn = useRef(null);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  // Space / Enter anywhere on the page (except inside another control).
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key !== ' ' && e.key !== 'Enter') || e.repeat) return;
      if (e.target.closest?.('button, a, input, textarea, select')) return;
      e.preventDefault(); btn.current?.click();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const tick = () => {
    const el = performance.now() - t0.current;
    setShown(el);
    if (el < SHOW_FOR) raf.current = requestAnimationFrame(tick);
  };
  const toggle = () => {
    if (phase === 'running') {
      cancelAnimationFrame(raf.current);
      const el = performance.now() - t0.current;
      const diff = Math.round(el - TARGET);
      setResult({ el, diff });
      setBest((b) => (b == null ? Math.abs(diff) : Math.min(b, Math.abs(diff))));
      setTries((n) => n + 1);
      setPhase('done');
      return;
    }
    t0.current = performance.now();
    setShown(0); setResult(null); setPhase('running');
    raf.current = requestAnimationFrame(tick);
  };
  const rating = result && c.r.find(([lim]) => Math.abs(result.diff) <= lim)[1];
  const dark = phase === 'running' && shown >= SHOW_FOR;

  return (
    <div className="fun-page narrow" style={{ '--fun-acc': ACC }}>
      <style>{FUN_CSS}{CL_CSS}</style>
      <FunHeader kind="me" accent={ACC} title={t('funStopTitle')} sub={c.sub} />
      <div className={`cl-face${dark ? ' dark' : ''}${phase === 'done' ? ' done' : ''}`}>
        <span className="cl-target">TARGET 5{lang === 'tr' ? ',' : '.'}000 s</span>
        <span className="cl-read" aria-hidden={dark}>{phase === 'done' ? fmt(result.el, lang) : dark ? '•.•••' : fmt(shown, lang)}</span>
        <span className="cl-state" role="status">
          {phase === 'running' && dark ? c.hidden : ''}
          {phase === 'done' && `${rating} ${c.off} ${fmt(Math.abs(result.diff), lang)} s ${result.diff < 0 ? c.early : c.late}`}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }}>
        <button ref={btn} type="button" className="fun-btn cl-btn" onClick={toggle}>
          <Timer size={18} strokeWidth={1.8} /> {phase === 'running' ? c.stop : phase === 'done' ? c.again : c.start}
        </button>
      </div>
      <p className="fun-hint" style={{ marginTop: 10 }}>{c.key}</p>
      <div className="fun-stats" style={{ marginTop: 26 }}>
        <div className="fun-stat"><b>{result ? `${result.diff > 0 ? '+' : ''}${result.diff}` : '—'}</b><span>{c.last} (ms)</span></div>
        <div className="fun-stat"><b>{best ?? '—'}</b><span>{c.best} (ms)</span></div>
        <div className="fun-stat"><b>{tries}</b><span>{c.tries}</span></div>
      </div>
    </div>
  );
}

const CL_CSS = `
  .cl-face { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 34px 20px 28px; border-radius: 22px; background: radial-gradient(70% 80% at 50% 30%, rgba(0,229,160,0.12), transparent 70%), #0c0e12; border: 1px solid #22262e; transition: background 0.4s, border-color 0.4s; }
  .cl-face.dark { background: #07080b; border-color: #1a1d24; }
  .cl-face.done { border-color: color-mix(in srgb, var(--fun-acc) 45%, #22262e); }
  .cl-target { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.2em; color: #7b8290; }
  .cl-read { font-family: var(--font-mono); font-weight: 500; font-size: clamp(56px, 14vw, 88px); line-height: 1; color: var(--c-ink); font-variant-numeric: tabular-nums; letter-spacing: -0.03em; }
  .cl-face.dark .cl-read { color: #262b34; }
  .cl-state { min-height: 22px; font-family: var(--font-body); font-size: 15px; color: #c6cdd8; text-align: center; }
  .cl-btn { min-width: 180px; min-height: 52px; font-size: 16px; }
  @media (prefers-reduced-motion: reduce) { .cl-face { transition: none; } }
`;
